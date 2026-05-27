//for any controller -> 3 things to be done :- extract what the service needs,pass it to the service, send the response,
// the error is handled by the asyncHnadler and the service.

import asyncHandler from "../utils/asyncHandler.js";
import ProjectService from "../services/projectService.js";

class ProjectController{

    //createProject
    static createProject = asyncHandler(async(req,res)=>{
        const data = req.body;
        const userId = req.user.id;
        const project = await ProjectService.createProject(data,userId);

        res.status(201).json({
            success:true,
            message: "Project created Successfully",
            project
        });
    });

    //deleteProject
    static deleteProject = asyncHandler(async(req,res)=>{
        const projectId = req.params.id;
        const user = req.user;
        const status = await ProjectService.deleteProject(projectId,user);
        res.status(200).json({
            success:true,
            message : "project deleted Successfully"
        });
    });
    //updateProject
    static updateProject = asyncHandler(async(req,res)=>{
        const projectId = req.params.id;
        const body = req.body;
        const user = req.user;
        
        const updated = await ProjectService.updateProject(projectId,body,user);

        res.status(200).json({
            success:true,
            message:"Update successful",
            updated
        });
    });


    //show filtered
    static showFiltered = asyncHandler(async(req,res)=>{
        const query = req.query;
        const projects = await ProjectService.showFiltered(query);

        res.status(200).json({
            success:true,
            projects
        });

    });
    //getProjectById
    static getProjectById = asyncHandler(async(req,res)=>{
        const projectId = req.params.id;
        const project = await ProjectService.getProjectById(projectId);

        res.status(200).json({
            success : true,
            project
        });
    });
    //changeSupervisor
    static changeSupervisor= asyncHandler(async(req,res)=>{
        const projectId = req.params.id;
        const newSup = req.body.supervisorId;
        const user = req.user;
        console.log(newSup);
        const msg = await ProjectService.changeSupervisor(projectId,newSup,user);

        res.status(200).json({
            success:true,
            message:msg.message
            
        });
    });

    //update Attendance Logs
    static updateAttendance = asyncHandler(async(req,res)=>{
        const projectId = req.params.id;
        const body = req.body;
        const user = req.user;
        const msg = await ProjectService.updateAttendance(projectId,body,user);

        res.status(200).json({
            success:true,
            message : msg.message
        });
    });

    static assignSupervisor = asyncHandler(async(req, res) => {
    const projectId = req.params.id;
    const { supervisorId } = req.body;
    const user = req.user;

    const msg = await ProjectService.assignSupervisor(projectId, supervisorId, user);

    res.status(200).json({
        success: true,
        message: msg.message
    });
});

}
export default ProjectController;
