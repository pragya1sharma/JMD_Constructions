//the vendor details will only be visible to the contracotrs for now.
//Baaki will ask the stake holders for any updates if they will be needed along the way.
import Vendor from "../models/vendor.js";

class VendorService{
    static async createVendor(data,user){
        // const {name,category,phone,email,address,gstNumber,notes,rating,isActive,createdBy} = userData;
        if(user.role!=="contractor") throw new error("Not authorised tp create new vendor!");
        const vendor = await Vendor.create({...data,createdBy : user._id});
        return vendor;
    }

    //update the vendor detials.
    static async updateVendor(vendorId,data,user){
        const vendor = await findById(vendorId);
        if(!vendor) throw new error("Vendor not found!");
        if(user.role!=="contractor") throw new error("Not authorised to update a vendor");

        const updated = await Vendor.findByIdAndUpdate(vendorId,data,user,{new : true});
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
    filter.rating = { $gte: Number(query.rating) };
  }

  const vendors = await Vendor.find(filter);
  return vendors;
    }
}

module.exports = VendorService;

