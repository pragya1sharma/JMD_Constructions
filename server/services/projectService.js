import Project from "../models/project.js";

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
//assign/change contractor
//assign/change supervisor
//updation of associated attendance logs.