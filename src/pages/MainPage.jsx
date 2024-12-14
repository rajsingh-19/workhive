import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jobList } from "../services";
import { deleteJob } from "../services";
import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";

const MainPage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=> {
        const fetchJobs = async () => {
            const res = await jobList();
            if(res.status === 200) {
                setLoading(false);
                const data = await res.json();
                setJobs(data);
            } else {
                console.log(res);
            }
        };
        fetchJobs();
    }, []);

    const handleEditJob = (id) => {
        navigate(`/home/editjob/${id}`);
    };

    const handleViewDetails = (id) => {
        navigate(`/home/viewdetails/${id}`);
    };

    const handleDeleteJob = async (id) => {
        const res = await deleteJob(id)
        if(res.status === 200) {
            const data = await res.json()
            alert("Job Deleted Successfully");
            jobList();
            console.log(data);
        } else if (res.status === 401) {
            alert("You are not authorized to delete this job");
        } else {
            console.log(res);
            alert('error');
        }
    };

    return (
        <div>
            <Navbar />
            <div>
                <div>
                    <input type="text" />
                </div>                
                <div>
                    <div>
                        <select>
                            <option>Skills</option>
                            <option value=""></option>
                        </select>
                        <button></button>
                    </div>
                    <div>
                        <button>+ Add Job</button>
                    </div>
                </div>
                <div>
                    <span>clear</span>
                </div>
            </div>
            <div>
                {loading ? (<h1>Loading.....</h1>) : 
                    (jobs.map((job) => (
                        <JobCard
                        key={job._id}
                        addLogoUrl={job.addLogoUrl}
                        jobPosition={job.jobPosition}
                        monthlySalary={job.monthlySalary}
                        jobType={job.jobType}
                        jobNature={job.jobNature}
                        jobLocation={job.jobLocation}
                        skillsRequired={job.skillsRequired}
                        id={job._id}
                        handleEditJob={handleEditJob}
                        handleViewDetails={handleViewDetails}
                        handleDeleteJob={handleDeleteJob} />
                    ))
                )}
            </div>
        </div>
    )
};

export default MainPage;
