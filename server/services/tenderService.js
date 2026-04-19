import Tender from "../models/tenderModel.js";
import project from "../models/project.js";

export const createTenderService = async (data, userId) => {
  const tender = await Tender.create({ ...data, createdBy: userId });
  return tender;
};

// 
export const getAllTendersService = async (query, userId) => {
  const { status, isPinned, interested } = query;

  const filter = {};
  if (status) filter.status = status;
  if (isPinned) filter.isPinned = isPinned === "true";
  if (interested) filter.interestedBy = userId;

  const tenders = await Tender.find(filter).sort({ createdAt: -1 });
  return tenders;
};



export const updateTenderService = async (tenderId, body, user) => {
  const tender = await Tender.findById(tenderId);
  if (!tender) throw new Error("Tender not found");

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

  // edit/pin — contractor only
  if (user.role !== "contractor") throw new Error("Not authorized");

  const updated = await Tender.findByIdAndUpdate(tenderId, body, { new: true });
  return updated;
};

//when a  tender is delted there sbould be two options, one to remove it permanently and the other to make it a project and assign it proper contractor , supervisor and all.
export const deleteTenderService = async (tenderId, user, action, extraData = {}) => {
  if (user.role !== "contractor") {
    throw new Error("Not authorised to delete tenders");
  }

  const tender = await Tender.findById(tenderId);
  if (!tender) throw new Error("Tender not found");

  // OPTION 1: Permanent delete
  if (action === "delete") {
    await tender.deleteOne();
    return { message: "Tender deleted permanently" };
  }

  // OPTION 2: Convert to project
  if (action === "convert") {
    const { assignedContractor, assignedSupervisor, ...rest } = extraData;

    if (!assignedContractor || !assignedSupervisor) {
      throw new Error("Contractor and Supervisor must be assigned");
    }

    const projectData = {
      ...tender.toObject(),
      ...rest,
      assignedContractor,
      assignedSupervisor,
      createdBy: user._id
    };

    delete projectData._id; // remove old id

    const project = await Project.create(projectData);

    await tender.deleteOne();

    return {
      message: "Tender converted to project",
      project
    };
  }

  throw new Error("Invalid action");
};