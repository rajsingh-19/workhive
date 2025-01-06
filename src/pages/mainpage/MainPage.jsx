import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import JobCard from "../../components/jobCard/JobCard";
import styles from "./mainpage.module.css";
import { jobList, deleteJob } from "../../services/index";
import searchIcon from "../../assets/searchIcon.svg";
import downArrow from "../../assets/downArrow.svg";
import { toast } from 'react-toastify';

//          --Debouncing Implementation--
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
    const [userStatus, setUserStatus] = useState(false);
    const [skillsOpen, setSkillsOpen] = useState(false);
    const [selectedSkills, setSelectedSkills] = useState([]); // Selected skills

    const navigate = useNavigate();

    // Check if the user is logged in
    useEffect(() => {
        const isUserLoggedIn = localStorage.getItem('token');
        if (isUserLoggedIn) {
          setUserStatus(true);
        }
    }, []);
      
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
                console.log(res.status);
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
        try {
            const res = await deleteJob(id);
            if(res.status === 200) {
                // alert("Job Deleted Successfully");
                toast.info("Job Deleted Successfully");
                jobList({limit, offset, nameSearch, skillsSearch});                  // Refresh the job list
            } else {
                const errorData = await res.json();
                const errorMessage = errorData.message || "An error occurred";
                toast.error(errorMessage);
            }   
        } catch (error) {
            console.log(error);
            alert("An unexpected error occurred:", error);
        }
    };

    //    Function to toggle skills and skills options container
    const handleskillsOptions = () => {
        setSkillsOpen((prev) => !prev);
    };

    const skillsArray= ["All", "React", "JavaScript", "Node", "Express"]; // Skills options

    //    Function to add the skills into the selected skills array 
    const handleSkillClick = (skill) => {
        if (!selectedSkills.includes(skill)) {
            setSelectedSkills((prev) => [...prev, skill]);
        }
    };

    //    Function to remove the specific chosen skill
    const handleRemoveSkill = (skill) => {
        setSelectedSkills((prev) => prev.filter((s) => s !== skill));
    };

    //    Function to apply filters according to the chosen skills
    const handleApplyFilter = () => {
        setSkillsSearch(selectedSkills.join(","));
        fetchJobs({ limit, offset, nameSearch, skillsSearch: selectedSkills.join(",") });
    };

    //    Function to clear the rendered chosen skills
    const handleClearSkills = () => {
        setSelectedSkills([]);
    };

    return (
        <div className="flex dir-col align-center">
            <Navbar />
            {/*             Search container     */}
            <div className={`${styles.searchContainer} flex dir-col align-center m-t-30 m-b-25`}>
                {/*         input Container     */}
                <div className={`${styles.searchBoxContainer} flex dir-row align-center`}>
                    <img src={searchIcon} alt="search icon" />
                    <input className={`${styles.searchInput} text-20 font-wt-500 dm-sans border-none outline-none`} type="text" onChange={(e) => setNameSearch(e.target.value)} value={nameSearch} placeholder="Type any company name" />
                </div>                
                {/*         skills & add job container */}
                <div className={`${styles.filterSkillsSection} flex dir-row`}>
                    {/*         right section     */}
                    <div className={`${styles.skillsBtnContainer} flex dir-col`}>
                        {
                            skillsOpen ? (
                                <div className={`${styles.allSkillsContainer} flex dir-col`}>
                                    <button onClick={handleskillsOptions} className={`${styles.firstBtn} flex align-center cursor-pointer border-none outline-none bg-transparent`}>
                                        <span className="roboto font-wt-500">Skills</span>
                                        <img src={downArrow} alt="downArrow Icon" />
                                    </button>
                                    {skillsArray.map((skill) => (
                                        <button key={skill} onClick={() => handleSkillClick(skill)} className="roboto font-wt-500 cursor-pointer border-none outline-none bg-transparent" >
                                            {skill}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <button onClick={handleskillsOptions} className={`${styles.skillsBox} flex align-center position-absolute cursor-pointer border-none outline-none`}>
                                    <span className="roboto font-wt-500">Skills</span>
                                    <img src={downArrow} alt="downArrow Icon" />
                                </button>
                            )
                        }
                    </div>
                    {/*                 rendered choosen skills      */}
                    <div className={styles.chosenSkillsContainer}>
                        <ul className="flex dir-row">
                            {selectedSkills.map((skill) => (
                                <li key={skill} className={`${styles.chosenSkill} flex dir-row align-center`}>
                                    <p className="dm-sans font-wt-500">{skill}</p>
                                    <button onClick={() => handleRemoveSkill(skill)} className={`${styles.crossBtn} text-white outline-none border-none cursor-pointer`} >X</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/*         left section     */}
                    <div>
                        {userStatus ? 
                            (<div className="flex dir-col">
                                <div className="flex dir-row">
                                    <button onClick={handleApplyFilter} className={`${styles.applyFilter} text-14 text-white dm-sans font-wt-500 border-none outline-none cursor-pointer`}>Apply Filter</button>
                                    <button onClick={handleAddJob} className={`${styles.addJob} text-14 roboto font-wt-500 border-none outline-none cursor-pointer`}>+ Add Job</button>
                                </div>
                                <div className="flex row-rev m-t-15">
                                    <button onClick={handleClearSkills} className={`${styles.clear} text-16 dm-sans font-wt-500 bg-transparent outline-none border-none cursor-pointer`}>Clear</button>
                                </div>
                            </div>) : 
                            (<>
                                <button onClick={handleApplyFilter} className={`${styles.applyFilter} text-14 text-white dm-sans font-wt-500 border-none outline-none cursor-pointer`}>Apply Filter</button>
                                <button onClick={handleClearSkills} className={`${styles.clear} text-16 dm-sans font-wt-500 bg-transparent outline-none border-none cursor-pointer`}>Clear</button>
                            </>)
                        }
                    </div>
                </div>
            </div>
            {/*         Job Card Container       */}
            <div className="flex dir-col align-center">
                {loading ? (<h1>Loading.....</h1>) :
                    (jobs.map((job) => (
                        <JobCard
                        key={job._id}
                        addLogoUrl={job.addLogoUrl}
                        jobPosition={job.jobPosition}
                        monthlySalary={job.monthlySalary}
                        jobType={job.jobType}
                        jobNature={job.jobNature}
                        jobLocation={job.location}
                        skillsRequired={job.skillsRequired}
                        id={job._id}
                        handleEditJob={handleEditJob}
                        handleViewDetails={handleViewDetails}
                        handleDeleteJob={handleDeleteJob} />
                    )))
                }
            </div>
            {/*         Pagination and offset Container          */}
            <div className={styles.paginationContainer}>
                <select value={limit} onChange={(e) => setLimit(e.target.value)}>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                </select>
                <button className={styles.prevBtn} disabled={offset === 0} onClick={() => setOffset((offset) => offset - 1)}>Prev</button>
                <button className={styles.nextBtn} disabled={offset*limit + limit >= count} onClick={() => setOffset((offset) => offset + 1)}>Next</button>
            </div>
        </div>
    )
};

export default MainPage;
