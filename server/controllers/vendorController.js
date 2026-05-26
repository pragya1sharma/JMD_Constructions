import asyncHandler from "../utils/asyncHandler.js";
import VendorService from "../services/vendorService.js";

class VendorController {

  // @route   POST /api/vendors
  static createVendor = asyncHandler(async (req, res) => {
    const vendor = await VendorService.createVendor(req.body, req.user);
    res.status(201).json({ success: true, data: vendor });
  });

  // @route   PUT /api/vendors/:id
  static updateVendor = asyncHandler(async (req, res) => {
    const vendor = await VendorService.updateVendor(req.params.id, req.body, req.user);
    res.status(200).json({ success: true, data: vendor });
  });

  static getAllVendors = asyncHandler(async (req, res) => {
    const vendors = await VendorService.getAllVendors();
    res.status(200).json({ success: true, data: vendors });
  });
 
  // @route   GET /api/vendors/filter?category=&status=&rating=
  static filterVendors = asyncHandler(async (req, res) => {
    const vendors = await VendorService.filterVendors(req.query);
    res.status(200).json({ success: true, data: vendors });
  });

  // @route   GET /api/vendors/:id
  static getVendorById = asyncHandler(async (req, res) => {
    const vendor = await VendorService.getVendorById(req.params.id);
    res.status(200).json({ success: true, data: vendor });
  });

  // @route   DELETE /api/vendors/:id
  static deleteVendor = asyncHandler(async (req, res) => {
    const result = await VendorService.softDeleteVendor(req.params.id);
    res.status(200).json({ success: true, data: result });
  });
}

export default VendorController;