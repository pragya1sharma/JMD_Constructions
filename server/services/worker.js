
import Worker from "../models/Worker.js";
import ErrorResponse from "../utils/errorResponse.js";


//workers arethe on-site labourers, using this we can track them individually.
class WorkerService{
    //add worker
    static async addWorker(data) {
        const worker = await Worker.create(data);
        return worker;
    }
    //get workers for a particular project
    static async getProjectWorkers(projectId) {
        const workers = await Worker.find({ project: projectId, isActive: true });
        if(workers.length === 0) throw new ErrorResponse("No workers found for this project", 404);
        return workers;
    }

    //get worker by id
    static async getWorkerById(workerID){
        const worker = await Worker.findById(workerID);
        if(!worker) throw new ErrorResponse("No worker exists with the given ID", 404);
        if(!worker.isActive) throw new ErrorResponse("Worker no longer active", 400);
        return worker;
    }
    //deactivate worker --soft delete
    static async deactivateWorker(workerID){
        const worker = await Worker.findByIdAndUpdate(workerID,{isActive:false},{new:true});
        if(!worker) throw new ErrorResponse("No such worker exists ", 404);
        return worker;

    }

    //update worker
    static async updateWorker(workerId, data){
        const worker = await Worker.findByIdAndUpdate(workerId, {$set:data}, {new:true});
        if(!worker) throw new ErrorResponse("No such worker found", 404);
        return worker;
    }
}
export default WorkerService;