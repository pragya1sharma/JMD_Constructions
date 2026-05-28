import InventoryItem from '../models/inventoryItem.js';
import ErrorResponse from '../utils/errorResponse.js';

class InventoryService {
  /**
   * Create a new inventory item
   */
  static async createItem({ name, unit, projectId, userId }) {
    const item = await InventoryItem.create({
      name,
      unit,
      quantity: 0,
      project: projectId,
      createdBy: userId,
    });
    return item;
  }

  /**
   * Add stock (IN) to a specific item
   */
  static async addStock(itemId, qty) {
    if (qty <= 0) {
      throw new ErrorResponse('Quantity must be greater than 0', 400);
    }

    const item = await InventoryItem.findById(itemId);
    if (!item) throw new ErrorResponse('Item not found', 404);

    item.quantity += qty;
    item.usageLogs.push({
      type: 'IN',
      quantity: qty,
    });

    await item.save();
    return item;
  }

  /**
   * Use stock (OUT) from a specific item
   */
  static async useStock(itemId, qty) {
    if (qty <= 0) {
      throw new ErrorResponse('Quantity must be greater than 0', 400);
    }

    const item = await InventoryItem.findById(itemId);
    if (!item) throw new ErrorResponse('Item not found', 404);

    if (item.quantity < qty) {
      throw new ErrorResponse('Not enough stock', 400);
    }

    item.quantity -= qty;
    item.usageLogs.push({
      type: 'OUT',
      quantity: qty,
    });

    await item.save();
    return item;
  }

  /**
   * Get all items for a project
   */
  static async getProjectInventory(projectId) {
    return await InventoryItem.find({ project: projectId }).sort({ createdAt: -1 });
  }

  /**
   * Get a single item by ID
   */
  static async getItemById(itemId) {
    const item = await InventoryItem.findById(itemId);
    if (!item) throw new ErrorResponse('Item not found', 404);
    return item;
  }

  /**
   * Get usage logs for a specific item
   */
  static async getUsageLogs(itemId) {
    const item = await InventoryItem.findById(itemId);
    if (!item) throw new ErrorResponse('Item not found', 404);
    return item.usageLogs;
  }

  /**
   * Get total used quantity for an item
   */
  static async getTotalUsed(itemId) {
    const item = await InventoryItem.findById(itemId);
    if (!item) throw new ErrorResponse('Item not found', 404);

    return item.usageLogs
      .filter(log => log.type === 'OUT')
      .reduce((sum, log) => sum + log.quantity, 0);
  }

  /**
   * Delete an item
   */
  static async deleteItem(itemId) {
    const item = await InventoryItem.findByIdAndDelete(itemId);
    if (!item) throw new ErrorResponse('Item not found', 404);
    return item;
  }

  /**
   * Get all items with stock below a threshold
   */
    static async getLowStockItems(projectId) {
      return await InventoryItem.find({
          project: projectId,
          $expr: { $lte: ['$quantity', '$restockThreshold'] }
      });
  }
  /*
  update an item
  */

  static async updateItem(itemId,data){
    const item =await InventoryItem.findByIdAndUpdate(itemId,{$set:data},{new:true});
    if(!item) throw new ErrorResponse('Item not found', 404); // ← add this
    return item;
  }
}

export default  InventoryService;