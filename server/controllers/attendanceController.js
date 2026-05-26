import asyncHandler from "../utils/asyncHandler.js";
import AttendanceService from "../services/attendanceService.js";

class AttendanceController {

  // @route   POST /api/projects/:projectId/attendance/init
  static initAttendance = asyncHandler(async (req, res) => {
    const attendance = await AttendanceService.initProjectAttendance(
      req.params.projectId,
      req.user._id
    );
    res.status(201).json({ success: true, data: attendance });
  });

  // @route   POST /api/projects/:projectId/attendance/categories
  // @body    { categoryName }
  static addCategory = asyncHandler(async (req, res) => {
    const { categoryName } = req.body;
    const categories = await AttendanceService.addCategory(req.params.projectId, categoryName);
    res.status(200).json({ success: true, data: categories });
  });

  // @route   GET /api/projects/:projectId/attendance/categories
  static getCategories = asyncHandler(async (req, res) => {
    const categories = await AttendanceService.getCategories(req.params.projectId);
    res.status(200).json({ success: true, data: categories });
  });

  // @route   POST /api/projects/:projectId/attendance
  // @body    { date, entries: [{ category, count }] }
  static markAttendance = asyncHandler(async (req, res) => {
    const { date, entries } = req.body;
    const attendance = await AttendanceService.markAttendance(
      req.params.projectId,
      date,
      entries,
      req.user._id
    );
    res.status(200).json({ success: true, data: attendance });
  });

  // @route   GET /api/projects/:projectId/attendance
  static getProjectAttendance = asyncHandler(async (req, res) => {
    const attendance = await AttendanceService.getProjectAttendance(req.params.projectId);
    res.status(200).json({ success: true, data: attendance });
  });

  // @route   GET /api/projects/:projectId/attendance/date?date=2025-05-26
  static getAttendanceByDate = asyncHandler(async (req, res) => {
    const log = await AttendanceService.getAttendanceByDate(
      req.params.projectId,
      req.query.date
    );
    res.status(200).json({ success: true, data: log });
  });

  // @route   GET /api/projects/:projectId/attendance/category?name=mistri
  static getCategoryAttendance = asyncHandler(async (req, res) => {
    const data = await AttendanceService.getCategoryAttendance(
      req.params.projectId,
      req.query.name
    );
    res.status(200).json({ success: true, data });
  });
}

export default AttendanceController;