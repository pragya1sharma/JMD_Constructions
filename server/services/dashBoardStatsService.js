import Project from "../models/project.js";
import Tender from "../models/tender.js";
import Worker from "../models/worker.js";
import Inventory from "../models/inventoryItem.js";
import Attendance from "../models/attendance.js";
import ErrorResponse from "../utils/errorResponse.js";

class DashboardService {

    /*
     * Stats for contractor dashboard
     * @param {String} contractorId
     */
    static async getContractorStats(contractorId) {
        // Project counts by status
        const [running, completed, future] = await Promise.all([
            Project.countDocuments({ assignedContractor: contractorId, status: 'Running' }),
            Project.countDocuments({ assignedContractor: contractorId, status: 'Completed' }),
            Project.countDocuments({ assignedContractor: contractorId, status: 'Future' }),
        ]);

        // Open tenders
        const openTenders = await Tender.countDocuments({ status: 'Open' });

        // Active workers across all contractor's projects
        const contractorProjects = await Project.find(
            { assignedContractor: contractorId },
            '_id'
        );
        const projectIds = contractorProjects.map(p => p._id);
        const activeWorkers = await Worker.countDocuments({
            project: { $in: projectIds },
            isActive: true,
        });

        // Low stock alerts across all projects
        const lowStockItems = await Inventory.countDocuments({
            project: { $in: projectIds },
            $expr: { $lte: ['$quantity', '$restockThreshold'] }
        });

        return {
            projects: { running, completed, future },
            openTenders,
            activeWorkers,
            lowStockAlerts: lowStockItems,
        };
    }

    /*
     * Stats for supervisor dashboard
     * @param {String} projectId
     * @param {String} supervisorId
     */
    static async getSupervisorStats(projectId, supervisorId) {
        // Security fix: Verify that this supervisor is assigned to the project
        const project = await Project.findOne({ 
            _id: projectId, 
            assignedSupervisor: supervisorId 
        });

        if (!project) {
            throw new ErrorResponse('Forbidden', 403);
        }

        // Active workers on this project
        const activeWorkers = await Worker.countDocuments({
            project: projectId,
            isActive: true,
        });

        // Low stock items for this project
        const lowStockItems = await Inventory.countDocuments({
            project: projectId,
            $expr: { $lte: ['$quantity', '$restockThreshold'] }
        });

        // Today's attendance total
        const attendance = await Attendance.findOne({ project: projectId });
        let todayTotal = 0;

        if (attendance) {
            const today = new Date().toDateString();
            const todayLog = attendance.logs.find(
                l => new Date(l.date).toDateString() === today
            );
            if (todayLog) {
                todayTotal = todayLog.entries.reduce((sum, e) => sum + e.count, 0);
            }
        }

        return {
            activeWorkers,
            lowStockAlerts: lowStockItems,
            todayAttendance: todayTotal,
        };
    }

    /*
     * Open tender count — for badge on UI
     */
    static async getOpenTenderCount() {
        const count = await Tender.countDocuments({ status: 'Open' });
        return { openTenders: count };
    }
}

export default DashboardService;