import Tender from "../models/tenderModel.js";
import Project from "../models/project.js";
import ErrorResponse from "../utils/errorResponse.js";

class TenderService {

  static async createTenderService(data, userId) {
    const tender = await Tender.create({ ...data, createdBy: userId });
    return tender;
  }

  // 
  static async getAllTendersService(query, userId) {
    const { status, isPinned, interested } = query;

    const filter = {};
    if (status) filter.status = status;
    if (isPinned) filter.pinnedBy = userId;
    if (interested) filter.interestedBy = userId;

    const tenders = await Tender.find(filter).sort({ createdAt: -1 });
    return tenders;
  }

  static async updateTenderService(tenderId, body, user) {
    const tender = await Tender.findById(tenderId);
    if (!tender) throw new ErrorResponse("Tender not found",404);

    // interest toggle — both roles
    if (body.toggleInterest) {
      const alreadyInterested = tender.interestedBy.includes(user._id);
      if (alreadyInterested) {
        tender.interestedBy.pull(user._id);
      } else {
        tender.interestedBy.push(user._id);
      }
      await tender.save();
      return tender;
    }

    if(body.togglePin){
      const alreadyPinned = tender.pinnedBy.includes(user._id);
      if(alreadyPinned){
        tender.pinnedBy.pull(user._id);
      }
      else{
        tender.pinnedBy.push(user._id);
      }
      await tender.save()
      return tender;
    }

    // edit/pin — contractor only
    if (user.role !== "Contractor") throw new ErrorResponse("Not authorized",403);

    const updated = await Tender.findByIdAndUpdate(tenderId, body, { new: true });
    return updated;
  }

  //when a tender is delted there sbould be two options, one to remove it permanently and the other to make it a project and assign it proper contractor , supervisor and all.
  static async deleteTenderService(tenderId, user, action, extraData = {}) {
    if (user.role !== "Contractor") {
      throw new ErrorResponse("Not authorised to delete tenders",403);
    }

    const tender = await Tender.findById(tenderId);
    if (!tender) throw new ErrorResponse("Tender not found",404);

    // OPTION 1: Permanent delete
    if (action === "delete") {
      await tender.deleteOne();
      return { message: "Tender deleted permanently" };
    }

    // OPTION 2: Convert to project
    if (action === "convert") {
      const { assignedContractor, assignedSupervisor, ...rest } = extraData;

      if (!assignedContractor || !assignedSupervisor) {
        throw new ErrorResponse("Contractor and Supervisor must be assigned",400);
      }

      const projectData = {
        ...tender.toObject(),
        ...rest,
        assignedContractor,
        assignedSupervisor,
      };

      delete projectData._id; // remove old id

      const project = await Project.create(projectData);

      await tender.deleteOne();

      return {
        message: "Tender converted to project",
        project
      };
    }

    throw new ErrorResponse("Invalid action",400);
  } 
  //get tender by id
  static async getTenderbyId(tenderId){
    const tender = await Tender.findById(tenderId);
    if(!tender) throw new ErrorResponse("Tender with the given ID not found", 404);

    return tender;
  }
  
}

export default TenderService;