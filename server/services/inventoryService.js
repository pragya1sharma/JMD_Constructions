const Inventory = require('../models/Inventory');

class InventoryService {
  /**
   * Create a new inventory item
   */
  static async createItem({ name, unit, projectId, userId }) {
    const item = await Inventory.create({
      name,
      unit,
      quantity: 0,
      project: projectId,
      createdBy: userId,
    });

    return item;
  }

  /**
   * Add stock (IN)
   */
  static async addStock(inventoryId, qty) {
    if (qty <= 0) {
      throw new Error('Quantity must be greater than 0');
    }

    const inventory = await Inventory.findById(inventoryId);
    if (!inventory) throw new Error('Item not found');

    inventory.quantity += qty;

    inventory.usageLogs.push({
      type: 'IN',
      quantity: qty,
    });

    await inventory.save();
    return inventory;
  }

  /**
   * Use stock (OUT)
   */
  static async useStock(inventoryId, qty) {
    if (qty <= 0) {
      throw new Error('Quantity must be greater than 0');
    }

    const inventory = await Inventory.findById(inventoryId);
    if (!inventory) throw new Error('Item not found');

    if (inventory.quantity < qty) {
      throw new Error('Not enough stock');
    }

    inventory.quantity -= qty;

    inventory.usageLogs.push({
      type: 'OUT',
      quantity: qty,
    });

    await inventory.save();
    return inventory;
  }

  /**
   * Get all inventory for a project
   */
  static async getProjectInventory(projectId) {
    return await Inventory.find({ project: projectId }).sort({ createdAt: -1 });
  }

  /**
   * Get inventory by ID
   */
  static async getInventoryById(inventoryId) {
    const inventory = await Inventory.findById(inventoryId);
    if (!inventory) throw new Error('Item not found');
    return inventory;
  }

  /**
   * Get usage logs
   */
  static async getUsageLogs(inventoryId) {
    const inventory = await Inventory.findById(inventoryId);
    if (!inventory) throw new Error('Item not found');
    return inventory.usageLogs;
  }

  /**
   * Get total used quantity
   */
  static async getTotalUsed(inventoryId) {
    const inventory = await Inventory.findById(inventoryId);
    if (!inventory) throw new Error('Item not found');

    return inventory.usageLogs
      .filter(log => log.type === 'OUT')
      .reduce((sum, log) => sum + log.quantity, 0);
  }
}

module.exports = InventoryService;