import Project from "../models/project.js";
import AttendanceLog from "../models/Attendance.js"; // 
import ErrorResponse from "../utils/errorResponse.js";

class ProjectService {

  static async createProject(data, userId) {
    // const user = await findById(userId);
    // if(!user) throw new ErrorResponse("The contractor does not exist", 404);
    // checking for the user is redundant at this stage, as agr project create krr raha hai to login/sign up already hua hai and the user indeed exists, and 
    // ye saare middlewares se already pass hua hai -> so this is redundant.

    const project = await Project.create({ ...data, assignedContractor: userId });
    return project;
  }

  //update an exisiting project 
  static async updateProject(projectId, body, user) {
    const project = await Project.findById(projectId);
    if (!project) throw new ErrorResponse("Project not found", 404);

    if (user.role !== "Contractor" || project.assignedContractor.toString() !== user._id.toString()) {
      throw new ErrorResponse("Not authorized", 403);
    }

    Object.assign(project, body);  // merge body fields onto the project document and overwrite the existing fields to the new body.
    const updated = await project.save();

    return updated;
  }

  //delete 
  static async deleteProject(projectId, user) {
    const project = await Project.findById(projectId);
    if (!project) throw new ErrorResponse("Project not found!", 404);

    if (user.role !== "Contractor" || project.assignedContractor.toString() !== user._id.toString()) {
      throw new ErrorResponse("Not authorized", 403);
    }
    await project.deleteOne(); //delteOne has to be on the instance and not the model.
    return true;
  }

  //display/show according to pinned and status as with tenders. -------BUGGGYYYYY---------------
  static async showFiltered(query) {
    const filters = {};
    if (query.status) filters.status = query.status;
    if (query.pinned !== undefined) filters.pinned = query.pinned;

    const projects = await Project.find(filters);
    return projects;
  }

  //GETPROJECT BY ID
  static async getProjectById(projectId) {
    const project = await Project.findById(projectId);
    if (!project) throw new ErrorResponse('Project Not found', 404);
    return project;
  }

  //CHANGE THE SUPERVISOR
  static async changeSupervisor(projectId, newSup, user) {

    if (user.role !== 'Contractor') throw new ErrorResponse('No supervisor can change the current project supervisors.',403);

    const project = await Project.findById(projectId);
    if (!project) throw new ErrorResponse('Project with the mentioend ID Not found', 404);

    if (user._id.toString() !== project.assignedContractor.toString()) throw new ErrorResponse("This project is not managed by you, only assigend contractors can change the supervisors.",403);
    if (project.assignedSupervisor.toString() != newSup._id.toString()) {
      project.assignedSupervisor = newSup._id;
      await project.save();
    }
    return { message: `Supervisor for the project ${projectId} changed to ${project.assignedSupervisor}` };
  }

  
  // update associated attendance logs
  static async updateAttendance(projectId, body, user) {
    const project = await Project.findById(projectId);
    if (!project) throw new ErrorResponse("Project not found",404);

    const isContractor = user.role === "Contractor" && project.assignedContractor.toString() === user._id.toString();
    const isSupervisor = user.role === "Supervisor" && project.assignedSupervisor.toString() === user._id.toString();

    if (!isContractor && !isSupervisor) throw new ErrorResponse("Not authorized",403);

    await AttendanceLog.updateMany({ project: projectId }, { $set: body });
    return { message: 'Attendance logs updated successfully' };
  }

  //assign a  supervisor to a project with no supervisor
  static async assignSupervisor(projectId, supervisorId, user) {
    const project = await Project.findById(projectId);
    if (!project) throw new ErrorResponse('Project not found', 404);

    if (project.assignedSupervisor) {
        throw new ErrorResponse('Project already has a supervisor. Use change supervisor instead.', 400);
    }

    const supervisor = await User.findOne({ _id: supervisorId, role: 'Supervisor' });
    if (!supervisor) throw new ErrorResponse('Supervisor not found', 404);

    project.assignedSupervisor = supervisorId;
    await project.save();

    return `Supervisor ${supervisor.name} has been assigned to the project`;
}

}

export default ProjectService;