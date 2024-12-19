import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jobList } from "../services";
import { deleteJob } from "../services";
import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";

const debounceDelayTime = 1000;              // defining the wait time
//                      Debounce function to delay execution of a function until a specified time has passed    
const debouncing = (fn, waitTIme) => {
    let timerID;        // Stores the timer ID for the debounce, ensuring only the latest call gets executed after the wait time
    // Returns a new function with debouncing behavior applied
    return function() {
        const context = this;           // Captures the current execution context to preserve `this` binding for `fn`
        const args = arguments;         // Captures the arguments passed to the debounced function
        // Clears the existing timer (if any), ensuring that the function execution is delayed until no more calls are made during the wait time
        clearTimeout(timerID);
        // Starts a new timer. If no further calls are made during `waitTime`, `fn` will be executed with the correct context and arguments
        timerID = setTimeout(() => fn.apply(context, args), waitTIme)       // Set a new timer for executing the function
    }
};

const MainPage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0);
    const [count, setCount] = useState(0);
    const [nameSearch, setNameSearch] = useState('');
    const [skillsSearch, setSkillsSearch] = useState('');

    const navigate = useNavigate();

    //              Function to fetch jobs with debouncing
    const fetchJobs = useCallback(                              // Memoized Debouncing Function
        debouncing(async ({limit, offset, nameSearch, skillsSearch}) => {         //Defining the debounced function outside of the `useEffect` scope
            const res = await jobList({limit, offset: offset * limit, name: nameSearch, skillsRequired: skillsSearch});
            if(res.status === 200) {
                setLoading(false);
                const data = await res.json();
                setJobs(data.jobs);
                setCount(data.count);
            } else {
                console.log(res);
            }
        }, debounceDelayTime),          // Use debounce delay time
    []);                                // Dependencies for useCallback
    
    //              Effect to fetch jobs whenever limit, offset, or search changes
    useEffect(()=> {
        fetchJobs({limit, offset, nameSearch, skillsSearch});
    }, [limit, offset, nameSearch, skillsSearch]);
    
    //              Navigate to add job page
    const handleAddJob = () => {
        navigate('/home/addjob');
    };

    //              Navigate to edit job page for a specific job
    const handleEditJob = (id) => {
        navigate(`/home/editjob/${id}`);
    };

    //              Navigate to view details page for a specific job
    const handleViewDetails = (id) => {
        navigate(`/home/viewdetails/${id}`);
    };

    //              Handle job deletion with appropriate feedback and refreshing the list
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
                    <input type="text" onChange={(e) => setNameSearch(e.target.value)} value={nameSearch} placeholder="Search" />
                </div>                
                <div>
                    <div>
                        <select>
                            <option>Skills</option>
                            <option value="All">All</option>
                            <option value="HTML">HTML</option>
                            <option value="CSS">CSS</option>
                            <option value="JavaScript">JavaScript</option>
                            <option value="React">React</option>
                            <option value="Node">Node</option>
                        </select>
                        <button>Apply Filter</button>
                    </div>
                    <div>
                        <button onClick={handleAddJob}>+ Add Job</button>
                    </div>
                </div>
                <div>
                    <button>Clear</button>
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
                    )))
                }
            </div>
            <div>
                <select value={limit} onChange={(e) => setLimit(e.target.value)}>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                </select>
                <button disabled={offset === 0} onClick={() => setOffset((offset) => offset - 1)}>Prev</button>
                <button disabled={offset*limit + limit >= count} onClick={() => setOffset((offset) => offset + 1)}>Next</button>
            </div>
        </div>
    )
};

export default MainPage;
