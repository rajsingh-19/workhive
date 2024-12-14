import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jobList } from "../services";
import { deleteJob } from "../services";

const HomePage = () => {
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

    console.log(jobs);

    const handleEditJob = (id) => {
        navigate(`/home/editjob/${id}`);
    };

    const handleViewDetails = () => {
        navigate('/home/viewdetails')
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
            <h1>Home Page</h1>
            {loading ? <h1>Loading.....</h1> : 
                jobs.map((jobs) => (
                    <div key={jobs._id}>
                        <p>{jobs.companyName}</p>
                        <p>{jobs.addLogoUrl}</p>
                        <p>{jobs.jobPosition}</p>
                        <p>{jobs.monthlySalary}</p>
                        <p>{jobs.jobType}</p>
                        <p>{jobs.jobNature}</p>
                        <p>{jobs.location}</p>
                        <p>{jobs.jobDescription}</p>
                        <p>{jobs.aboutCompany}</p>
                        <p>{jobs.skillsRequired}</p>
                        <p>{jobs.information}</p>
                        <button onClick={() => handleEditJob(jobs._id)}>Edit job</button>
                        <button onClick={handleViewDetails}>View details</button>
                        <button onClick={() => handleDeleteJob(jobs._id)}>Delete</button>
                    </div>
                ))
            }
        </div>
    )
};

export default HomePage;
