//understand the functions carefully - a little nested.
import Attendance from "../models/Attendance.js";
import ErrorResponse from "../utils/errorResponse.js";

const DEFAULT_CATEGORIES = ['supervisor', 'mistri', 'mazdoor'];

const PREDEFINED_EXTRA_CATEGORIES = [
  'plumber', 'electrician', 'carpenter', 'painter', 'driver'
];

class AttendanceService {

  /**
   * Initialize attendance for a project (only once)
   */
  //good functions not very straight as done till NOW, so pay close attention.
  static async initProjectAttendance(projectId, userId) {
    let attendance = await Attendance.findOne({ project: projectId });

    if (attendance) return attendance;

    attendance = await Attendance.create({
      project: projectId,
      logs: [],
    });

    return attendance;
  }

  /**
   * Add a new category (custom role or predefined extra)
   */
  static async addCategory(projectId, categoryName) {
    const attendance = await Attendance.findOne({ project: projectId });
    if (!attendance) throw new ErrorResponse('Attendance not initialized',404);

    const normalized = categoryName.trim().toLowerCase();

    // cannot re-add a default category
    if (DEFAULT_CATEGORIES.includes(normalized)) {
      throw new ErrorResponse('Category already exists as a default',403);
    }

    const exists = attendance.categories.some(
      c => c.name.toLowerCase() === normalized
    );

    if (exists) throw new ErrorResponse('Category already exists',403);

    attendance.categories.push({
      name: normalized,
      isCustom: !PREDEFINED_EXTRA_CATEGORIES.includes(normalized),
    });

    await attendance.save();
    return attendance.categories;
  }

  /**
   * Get all categories (defaults + project-level added ones)
   */
  static async getCategories(projectId) {
    const attendance = await Attendance.findOne({ project: projectId });
    if (!attendance) throw new ErrorResponse('Attendance not found',404);

    const defaults = DEFAULT_CATEGORIES.map(name => ({ name, isCustom: false }));

    return [...defaults, ...attendance.categories];
  }

  /**
   * Mark or update attendance for a date
   * entries = [{ category, count }]
   */
  static async markAttendance(projectId, date, entries, userId) {
    const attendance = await Attendance.findOne({ project: projectId });
    if (!attendance) throw new ErrorResponse('Attendance not initialized',404);

    // Normalize date (ignore time)
    const targetDate = new Date(date).toDateString();

    // defaults + whatever extra categories are stored for this project
    const validCategories = [
      ...DEFAULT_CATEGORIES,
      ...attendance.categories.map(c => c.name),
    ];

    entries.forEach(e => {
      const cat = e.category.trim().toLowerCase();

      if (!validCategories.includes(cat)) {
        throw new ErrorResponse(`Invalid category: ${e.category}`,404);
      }

      if (e.count < 0) {
        throw new ErrorResponse('Count cannot be negative',400);
      }

      // normalize entry category
      e.category = cat;
    });

    // Find existing log
    let log = attendance.logs.find(
      l => new Date(l.date).toDateString() === targetDate
    );

    if (log) {
      // Update existing
      log.entries = entries;
      log.recordedBy = userId;
    } else {
      // Create new
      attendance.logs.push({
        date,
        entries,
        recordedBy: userId,
      });
    }

    await attendance.save();
    return attendance;
  }

  /**
   * Get full attendance (project level)
   */
  static async getProjectAttendance(projectId) {
    const attendance = await Attendance.findOne({ project: projectId });
    if (!attendance) throw new ErrorResponse('Attendance not found',404);

    return attendance;
  }

  /**
   * Get attendance for a specific date
   */
  static async getAttendanceByDate(projectId, date) {
    const attendance = await Attendance.findOne({ project: projectId });
    if (!attendance) throw new ErrorResponse('Attendance not found',404);

    const targetDate = new Date(date).toDateString();

    const log = attendance.logs.find(
      l => new Date(l.date).toDateString() === targetDate
    );

    return log || null;
  }

  /**
   * Get attendance for a specific category (optional helper)
   */
  static async getCategoryAttendance(projectId, categoryName) {
    const attendance = await Attendance.findOne({ project: projectId });
    if (!attendance) throw new ErrorResponse('Attendance not found',404);

    const category = categoryName.trim().toLowerCase();

    return attendance.logs.map(log => {
      const entry = log.entries.find(e => e.category === category);

      return {
        date: log.date,
        count: entry ? entry.count : 0,
      };
    });
  }
}

export default AttendanceService;