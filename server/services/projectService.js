import Project from "../models/project.js";
import AttendanceLog from "../models/attendanceLog.js";

//create a new project
export const createProjectService = async (data, userId) => {
  const project = await Project.create({ ...data, createdBy: userId });
  return project;
};

//update an exisiting project
export const updateProjectService = async (projectId, body, user) => {
  const project = await Project.findById(projectId);
  if (!project) throw new Error("Project not found");

  // already have assignedContractor and assignedSupervisor from fetched project
  if (user.role !== "contractor" || project.assignedContractor.toString() !== user._id.toString()) {
    throw new Error("Not authorized");
  }

  const updated = await Project.findByIdAndUpdate(projectId, body, { new: true });
  return updated;
};
//delete
export const deleteProjectService = async (projectId,user) =>{
     const project = await Project.findById(projectId);
     if(!project) throw new Error("Proejct not found!");

     if (user.role !== "contractor" || project.assignedContractor.toString() !== user._id.toString()) {
        throw new Error("Not authorized");
    }
    await project.deleteOne(); //delteOne has to be on the instance and not the model.
    return true;

}

//display/show according to pinned and status as with tenders.
export const showFiltered = async (query) => {
  const filters = {};
  if(query.status) filters.status = query.status;
  if(query.pinned !== undefined) filters.pinned = query.pinned;

  const projects = await Project.find(filters);
  return projects;
}

//assign/change contractor


//assign/change supervisor


//updation of associated attendance logs.
// update associated attendance logs
export const updateAttendanceService = async (projectId, body, user) => {
  const project = await Project.findById(projectId);
  if (!project) throw new Error("Project not found");

  const isContractor = user.role === "contractor" && project.assignedContractor.toString() === user._id.toString();
  const isSupervisor = user.role === "supervisor" && project.assignedSupervisor.toString() === user._id.toString();

  if (!isContractor && !isSupervisor) throw new Error("Not authorized");

  const updated = await AttendanceLog.updateMany(
    { project: projectId },
    body,
    { new: true }
  );
  return updated;
};

