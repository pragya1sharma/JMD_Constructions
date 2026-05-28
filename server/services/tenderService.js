import Tender from "../models/tender.js";
import Project from "../models/project.js";
import ErrorResponse from "../utils/errorResponse.js";
import User from "../models/user.js";
class TenderService {

  static async createTenderService(data, userId) {
      const tender = await Tender.create({ ...data, createdBy: userId });
      return tender;
    }

    // 
    static async updateTenderService(tenderId, body, user) {
      const tender = await Tender.findById(tenderId);
      if (!tender) throw new ErrorResponse("Tender not found", 404);

      // interest toggle — both roles
      if (body.toggleInterest) {
          const alreadyInterested = tender.interestedBy.includes(user._id);
          alreadyInterested
              ? tender.interestedBy.pull(user.id)
              : tender.interestedBy.push(user.id);
          await tender.save();
          return tender;
      }

      if (body.togglePin) {
          const alreadyPinned = tender.pinnedBy.includes(user.id);
          alreadyPinned
              ? tender.pinnedBy.pull(user.id)
              : tender.pinnedBy.push(user.id);
          await tender.save();
          return tender;
      }

      // contractor-only field edit
      if (user.role !== "Contractor") throw new ErrorResponse("Not authorized", 403);

      //Never allow direct overwrite of these array fields
      const { pinnedBy, interestedBy, createdBy, ...safeBody } = body;

      const updated = await Tender.findByIdAndUpdate(tenderId, safeBody, { new: true });
      return updated;
  }

    //when a tender is delted there sbould be two options, one to remove it permanently and the other to make it a project and assign it proper contractor , supervisor and all.
    static async deleteTenderService(tenderId, user) {
    if (user.role !== "Contractor") {
      throw new ErrorResponse("Not authorised to delete tenders", 403);
    }

    const tender = await Tender.findById(tenderId);
    if (!tender) throw new ErrorResponse("Tender not found", 404);

    await tender.deleteOne();
    return { message: "Tender deleted permanently" };
  }

  static async convertTenderToProjectService(tenderId, user, projectData) {
      if (user.role !== "Contractor") {
        throw new ErrorResponse("Not authorised to convert tenders", 403);
      }

      const tender = await Tender.findById(tenderId);
      if (!tender) throw new ErrorResponse("Tender not found", 404);

      // Validate required project fields
      const {
        assignedContractor,
        assignedSupervisor,
        siteLocation,
        startDate,
        status,
        pinned,
        name
      } = projectData;

      if (!assignedContractor || !assignedSupervisor) {
        throw new ErrorResponse("Contractor and Supervisor must be assigned", 400);
      }

      if (!siteLocation?.address) {
        throw new ErrorResponse("Site address is required", 400);
      }

      if (!startDate) {
        throw new ErrorResponse("Start date is required", 400);
      }

      if (pinned === undefined) {
        throw new ErrorResponse("Pinned status is required", 400);
      }

      if (!status || !['Running', 'Completed', 'Future'].includes(status)) {
        throw new ErrorResponse("Valid status (Running, Completed, Future) is required", 400);
      }

      if (!name) {
        throw new ErrorResponse("Project name is required", 400);
      }

      // Validate users exist
      const [contractor, supervisor] = await Promise.all([
        User.findById(assignedContractor),
        User.findById(assignedSupervisor)
      ]);

      if (!contractor) throw new ErrorResponse("Contractor not found", 404);
      if (!supervisor) throw new ErrorResponse("Supervisor not found", 404);

      // Prepare project data
      const { _id, __v, ...tenderData } = tender.toObject();

      const newProject = await Project.create({
        name: name,
        status: status,
        pinned: pinned,
        startDate: startDate,
        assignedContractor: assignedContractor,
        assignedSupervisor: assignedSupervisor,
        siteLocation: {
          address: siteLocation.address,
          googleMapsLink: siteLocation.googleMapsLink || ""
        },
        expectedBudget: tenderData.budget || projectData.expectedBudget,
        notes: tenderData.description || projectData.notes,
        ...(projectData.endDate && { endDate: projectData.endDate }),
        ...(projectData.expectedEndDate && { expectedEndDate: projectData.expectedEndDate })
      });

      
      await tender.deleteOne(); 

      return {
        message: "Tender successfully converted to project",
        project: newProject
      };
    }
  //get tender by id
  static async getTenderbyId(tenderId){
    const tender = await Tender.findById(tenderId);
    if(!tender) throw new ErrorResponse("Tender with the given ID not found", 404);

    return tender;
  }
  
}

export default TenderService;