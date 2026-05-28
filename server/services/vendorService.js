//the vendor details will only be visible to the contracotrs for now.
//Baaki will ask the stake holders for any updates if they will be needed along the way.
import Vendor from "../models/vendor.js";
import ErrorResponse from "../utils/errorResponse.js";

class VendorService{


    static async createVendor(data,user){
        // const {name,category,phone,email,address,gstNumber,notes,rating,isActive,createdBy} = userData;
        if(user.role!=="Contractor") throw new ErrorResponse("Not authorised to create new vendor!",403);
        const vendor = await Vendor.create({...data,createdBy : user._id,isActive:true});
        return vendor;
    }

    //ON DELETE :- the status is set to in

    //update vendor details, only the contractor who created the vendor can update it.
    static async updateVendor(vendorId, data, user) {
      const vendor = await Vendor.findById(vendorId);
      if (!vendor) throw new ErrorResponse("Vendor not found!", 404);
      if (user.role !== "Contractor") throw new ErrorResponse("Not authorised to update a vendor", 403);

      const updated = await Vendor.findOneAndUpdate(
        { _id: vendorId },
        { $set: data },
        { 
          new: true, 
          runValidators: true,
          overwrite: false // This ensures false values are set
        }
      );
      
      return updated;
    }

    static async filterVendors(query) {
      const filter = {};

      // filter by category
      if (query.category) {
        filter.category = query.category;
      }

      // filter by status (isActive)
      if (query.status !== undefined) {
        filter.isActive = query.status === "true";
      }

      // filter by rating (minimum rating)
      if (query.rating) {
        filter.rating = { $gte: Number(query.rating) };  //gte is a mongoDB comparison operator => greater than or equal to.
      }

      const vendors = await Vendor.find(filter);
      return vendors;
      }

      //get vendor by id
      static async getVendorById(vendorId){
        const vendor = await Vendor.findById(vendorId);
        if(!vendor) throw new ErrorResponse("Vendor not found",404);
        return vendor;
      }
      // get all vendors
      static async getAllVendors(){
        const vendors = await Vendor.find({isActive:true});
        if(vendors.length === 0) return {message : "no vendor found"};

        return vendors;
      }
      // delete vendor

      static async softDeleteVendor(vendorId){
        const vendor = await Vendor.findById(vendorId);
        if(!vendor) throw new ErrorResponse("Vendor to be deleted not found", 404);
        
        vendor.isActive = false;
        await vendor.save();
        return { message: `Vendor ${vendor.name} has been deactivated` };
      }


  }

export default VendorService;

