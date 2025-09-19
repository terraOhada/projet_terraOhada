import { Router } from 'express';
import { applyJob, getJobById, getJobs } from '../controllers/job.controller.js';



const jobRouter = Router();

jobRouter.get('/all-jobs', getJobs);
jobRouter.get('/single-job/:id', getJobById);
jobRouter.post('/apply-job/:id', applyJob);
// jobRouter.post('/', createJob);
// jobRouter.put('/:id', updateJob);
// jobRouter.delete('/:id', deleteJob);

export default jobRouter;