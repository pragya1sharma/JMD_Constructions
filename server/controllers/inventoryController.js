// inventoryController.js
import asyncHandler from "../utils/asyncHandler.js";
import InventoryService from "../services/inventoryService.js";

class InventoryController {

    static createItem = asyncHandler(async (req, res) => {
        const { name, unit } = req.body;
        const projectId = req.params.projectId;
        const userId = req.user._id;
        const item = await InventoryService.createItem({ name, unit, projectId, userId });
        res.status(201).json({ success: true, message: "Item created successfully", data: item });
    });

    static addStock = asyncHandler(async (req, res) => {
        const itemId = req.params.id;
        const qty = req.body.quantity;
        const item = await InventoryService.addStock(itemId, qty);
        res.status(200).json({ success: true, message: "Stock added", data: item });
    });

    static useStock = asyncHandler(async (req, res) => {
        const itemId = req.params.id;
        const qty = req.body.quantity;
        const item = await InventoryService.useStock(itemId, qty);
        res.status(200).json({ success: true, message: "Stock used", data: item });
    });

    static getProjectInventory = asyncHandler(async (req, res) => {
        const projectId = req.params.projectId;
        const items = await InventoryService.getProjectInventory(projectId);
        res.status(200).json({ success: true, data: items });
    });

    static getItemById = asyncHandler(async (req, res) => {
        const itemId = req.params.id;
        const item = await InventoryService.getItemById(itemId);
        res.status(200).json({ success: true, data: item });
    });

    static getUsageLogs = asyncHandler(async (req, res) => {
        const itemId = req.params.id;
        const logs = await InventoryService.getUsageLogs(itemId);
        res.status(200).json({ success: true, data: logs });
    });

    static getLowStockItems = asyncHandler(async (req, res) => {
        const projectId = req.params.projectId;
        const items = await InventoryService.getLowStockItems(projectId);
        res.status(200).json({ success: true, data: items });
    });

    static updateItem = asyncHandler(async (req, res) => {
        const itemId = req.params.id;
        const data = req.body;
        const item = await InventoryService.updateItem(itemId, data);
        res.status(200).json({ success: true, message: "Item updated", data: item });
    });

    static deleteItem = asyncHandler(async (req, res) => {
        const itemId = req.params.id;
        await InventoryService.deleteItem(itemId);
        res.status(200).json({ success: true, message: "Item deleted" });
    });
}

export default InventoryController;