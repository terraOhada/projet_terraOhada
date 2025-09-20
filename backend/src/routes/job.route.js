import { Router } from 'express';
import { applyJob, candidatsOffre, createJob, getJobById, getJobs, mettreAJourStatutCandidature, offresRecruteur, statsRecruiter } from '../controllers/job.controller.js';



const jobRouter = Router();
jobRouter.post('/create-job', createJob)
jobRouter.get('/all-jobs', getJobs);
jobRouter.get('/single-job/:id', getJobById);
jobRouter.post('/apply-job/:id', applyJob);
jobRouter.get('/recruiter/stats', statsRecruiter);
jobRouter.get('/recruiter/jobs', offresRecruteur);
jobRouter.get('/:jobId/applicants', candidatsOffre);
jobRouter.put('/applications/:appId/status', mettreAJourStatutCandidature);

export default jobRouter;