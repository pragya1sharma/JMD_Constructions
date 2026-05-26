import asyncHandler from "../utils/asyncHandler.js";
import WorkerService from "../services/workerService.js";

class WorkerController {

  // @route   POST /api/projects/:projectId/workers
  static addWorker = asyncHandler(async (req, res) => {
    const worker = await WorkerService.addWorker({
      ...req.body,
      project: req.params.projectId,
    });
    res.status(201).json({ success: true, data: worker });
  });

  // @route   GET /api/projects/:projectId/workers
  static getProjectWorkers = asyncHandler(async (req, res) => {
    const workers = await WorkerService.getProjectWorkers(req.params.projectId);
    res.status(200).json({ success: true, count: workers.length, data: workers });
  });

  // @route   GET /api/workers/:id
  static getWorkerById = asyncHandler(async (req, res) => {
    const worker = await WorkerService.getWorkerById(req.params.id);
    res.status(200).json({ success: true, data: worker });
  });

  // @route   PUT /api/workers/:id
  static updateWorker = asyncHandler(async (req, res) => {
    const worker = await WorkerService.updateWorker(req.params.id, req.body);
    res.status(200).json({ success: true, data: worker });
  });

  // @route   DELETE /api/workers/:id
  static deactivateWorker = asyncHandler(async (req, res) => {
    const worker = await WorkerService.deactivateWorker(req.params.id);
    res.status(200).json({ success: true, data: worker });
  });
}

export default WorkerController;