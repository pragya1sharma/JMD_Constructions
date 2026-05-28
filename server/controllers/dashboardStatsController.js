import asyncHandler from "../utils/asyncHandler.js";
import DashboardService from "../services/dashBoardStatsService.js";

class DashboardController {

    static getContractorStats = asyncHandler(async (req, res) => {
        const contractorId = req.user.id;
        const stats = await DashboardService.getContractorStats(contractorId);
        res.status(200).json({ success: true, data: stats });
    });

    static getSupervisorStats = asyncHandler(async (req, res) => {
        const projectId = req.params.projectId;
        const supervisorId = req.user.id;
        const stats = await DashboardService.getSupervisorStats(projectId, supervisorId);
        res.status(200).json({ success: true, data: stats });
    });

    static getOpenTenderCount = asyncHandler(async (req, res) => {
        const count = await DashboardService.getOpenTenderCount();
        res.status(200).json({ success: true, data: count });
    });
}

export default DashboardController;