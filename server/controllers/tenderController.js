import asyncHandler from "../utils/asyncHandler.js";
import TenderService from "../services/tenderService.js";

class TenderController{
    //createTender
    static createTender = asyncHandler(async(req,res)=>{
        const data = req.body;
        const userId = req.user._id;
        const tender = await TenderService.createTenderService(data,userId);

        res.status(201).json({
            success:true,
            message:"tender created successfully",
            tender
        });
    });
    //getAlltenders
    static getAllTenders = asyncHandler(async(req,res)=>{
        const query = req.query;
        const userId = req.user._id;
        const tenders = await TenderService.getAllTendersService(query,userId);

        res.status(200).json({
            success:true,
            message:"All tenders fetched successfully",
            tenders
        });
    });
    // update tender
    static updateTender = asyncHandler(async(req,res)=>{
        const user = req.user;
        const body = req.body;
        const tenderId = req.params.id;

        const tender = await TenderService.updateTenderService(tenderId,body,user);

        res.status(200).json({
            success : true,
            message:"tender updated successfully",
            tender
        });
    });
    //delete tender
    static deleteTender = asyncHandler(async(req,res)=>{
        const tenderId = req.params.id;
        const user = req.user;
        const action = req.body.action;
        const extraData = req.body.extraData;

        const msg = await TenderService.deleteTenderService(tenderId,user,action,extraData);
        res.status(200).json({
            success:true,
            message :msg,
        })
    })
    //get tender by id
    static getTenderById = asyncHandler(async(req,res)=>{
        const tenderId = req.params.id;
        const tender = await TenderService.getTenderbyId(tenderId);

        res.status(200).json({
            success:true,
            message:"tender fetched successfully",
            tender
        });
    });
}

export default TenderController;