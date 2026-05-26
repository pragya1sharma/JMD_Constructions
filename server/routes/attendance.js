import express from "express";
import AttendanceController from "../controllers/attendanceController.js";
import {validateRequest} from "../middleware/validation.js"
import {markAttendanceSchema,addCategorySchema} from "../validations/attendanceValidation.js";
import {protect} from "../middleware/auth.js";

const router = express.Router();


router.post('/:projectId/init', protect, AttendanceController.initAttendance);
router.post('/:projectId/mark', protect, validateRequest(markAttendanceSchema), AttendanceController.markAttendance);
router.post('/:projectId/categories', protect, validateRequest(addCategorySchema), AttendanceController.addCategory);
router.get('/:projectId/categories', protect, AttendanceController.getCategories);
router.get('/:projectId/date', protect, AttendanceController.getAttendanceByDate);
router.get('/:projectId/category', protect, AttendanceController.getCategoryAttendance);
router.get('/:projectId', protect, AttendanceController.getProjectAttendance);

export default router;



