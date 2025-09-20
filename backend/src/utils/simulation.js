import { jobsData } from "../data/data.js";

export const getCompanyJobs = (companyName) => {
    return jobsData.filter(job => job.company === companyName);
};