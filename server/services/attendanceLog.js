//attendance log service -> as such in the project service,I have added the methods to update AND add attendance, I need to make separate methods for attendance loga and then that can be imported in the projects section, instead of writing it twice.
//attendance for supervisor,mistri,majdoor,(let it be these names for the sake of acccessibility.)and special fields only if needed like electrician, tractor driver,jcb,carpenter,plumber etc. -> the supervisor shopuld be able to create tehse new categories and update attandance forthese if needed.

//to add/update attendace -> for each project, attendance will be per rpoject and not per person -> as mentioned above.
/*
//to view attendance for each project for each category,and a specific, also attendance is to be saved strictly corresponding to teh schema. and 
*/
import Attendance from "../models/Attendance.js";

class AttendanceService {

  /**
   * Initialize attendance for a project (only once)
   */
  static async initProjectAttendance(projectId, userId) {
    let attendance = await Attendance.findOne({ project: projectId });

    if (attendance) return attendance;

    attendance = await Attendance.create({
      project: projectId,
      categories: [
        { name: 'supervisor' },
        { name: 'mistri' },
        { name: 'mazdoor' },
      ],
      logs: [],
    });

    return attendance;
  }

  /**
   * Add a new category (custom role)
   */
  static async addCategory(projectId, categoryName) {
    const attendance = await Attendance.findOne({ project: projectId });
    if (!attendance) throw new Error('Attendance not initialized');

    const normalized = categoryName.trim().toLowerCase();

    const exists = attendance.categories.some(
      c => c.name.toLowerCase() === normalized
    );

    if (exists) throw new Error('Category already exists');

    attendance.categories.push({
      name: normalized,
      isCustom: true,
    });

    await attendance.save();
    return attendance.categories;
  }

  /**
   * Get all categories
   */
  static async getCategories(projectId) {
    const attendance = await Attendance.findOne({ project: projectId });
    if (!attendance) throw new Error('Attendance not found');

    return attendance.categories;
  }

  /**
   * Mark or update attendance for a date
   * entries = [{ category, count }]
   */
  static async markAttendance(projectId, date, entries, userId) {
    const attendance = await Attendance.findOne({ project: projectId });
    if (!attendance) throw new Error('Attendance not initialized');

    // Normalize date (ignore time)
    const targetDate = new Date(date).toDateString();

    // Validate categories
    const validCategories = attendance.categories.map(c => c.name);

    entries.forEach(e => {
      const cat = e.category.trim().toLowerCase();

      if (!validCategories.includes(cat)) {
        throw new Error(`Invalid category: ${e.category}`);
      }

      if (e.count < 0) {
        throw new Error('Count cannot be negative');
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
    if (!attendance) throw new Error('Attendance not found');

    return attendance;
  }

  /**
   * Get attendance for a specific date
   */
  static async getAttendanceByDate(projectId, date) {
    const attendance = await Attendance.findOne({ project: projectId });
    if (!attendance) throw new Error('Attendance not found');

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
    if (!attendance) throw new Error('Attendance not found');

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

module.exports = AttendanceService;