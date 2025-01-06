import {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./viewdetails.module.css";
import Navbar from "../../components/navbar/Navbar";
import { getJobById } from "../../services/index";
import workIcon from "../../assets/workIcon.svg";
import salaryIcon from "../../assets/salaryIcon.svg";

const ViewDetailPage = () => {
    const {id} = useParams();                       // Extract the `id` parameter from the route using `useParams` hook
    const navigate = useNavigate();                 // Initialize `navigate` for programmatic navigation
    const [job, setJob] = useState(null);           // State to store the job details
    const [loading, setLoading] = useState(true);   // State to handle the loading status
    const [userStatus, setUserStatus] = useState(false);
    
    useEffect(() => {
        const isUserLoggedIn = localStorage.getItem('token');
        if (isUserLoggedIn) {
            setUserStatus(true);
        };

        // Function to fetch job details by ID from the API
        const fetchJobDetails = async () => {
            const res = await getJobById(id);       // Call the service function with job ID
            if(res.status === 200) {
                const data = await res.json();      // Parse the response JSON
                setJob(data);                       // Store job data in state
                setLoading(false);                  // Set loading to false once the job data is loaded
            } else {
                console.log("failed to fetch the job", res);        // Log an error if the request fails
            }
        }
    fetchJobDetails();                              // Trigger the fetch function on component mount
    }, [id]);                                       // Dependency array ensures fetch is triggered when `id` changes
    
    // Handle the case where no job is found or `job` is null
    if (!job) {
        return (
            <div className="flex dir-row justify-center align-center">
                <h1>Loading....</h1>
            </div>
        );
    }

    // Destructure the job properties for easier access
    const { addLogoUrl, jobPosition, aboutCompany, jobDescription, companyName, monthlySalary, location, jobType, jobNature, skillsRequired, information } = job;
    
    // Function to navigate to the Edit Job page with the job's ID
    const handleEditJob = (id) => {
        navigate(`/home/editjob/${id}`);
    };

    return (
        <div className={styles.detailsPageContainer}>
            <Navbar />
            <div className={styles.detailsContainer}>
                <div className={styles.jobHeading}>{`${jobPosition} ${jobNature} Job/Internship at ${companyName} `}</div>
                { 
                    loading ? <h1>Loading....</h1> :
                    (
                        <div className={`${styles.jobDetails} flex dir-col`}>
                            <div className="flex dir-row align-center m-b-5">
                                <p className={`${styles.jobNature} dm-sans font-wt-500 text-14 m-r-20`}>{jobNature}</p>
                                <div className="flex dir-row justify-center align-center">
                                    <div className="flex dir-row justify-center align-center m-r-5">
                                        <img className={styles.img} src={addLogoUrl} alt="company logo" />
                                    </div>
                                    <p className={`${styles.companyName} dm-sans font-wt-500 text-14`}>{companyName}</p>
                                </div>
                            </div>
                            <div className="flex dir-row justify-space-btwn">
                                <p className="dm-sans text-35 font-wt-700">{jobPosition}</p>     
                                {
                                    userStatus && <button className={`${styles.editBtn} font-wt-700 roboto text-18 cursor-pointer outline-none border-none`} onClick={() => {handleEditJob(id)}}>Edit job</button>
                                }                       
                            </div>
                            <div className="m-b-20">
                                <span className={`${styles.location} dm-sans font-wt-500`}>{location}</span>
                            </div>
                            <div className="flex dir-row m-b-20">
                                <div className="flex dir-col m-r-20">
                                    <div className="flex dir-row justify-center m-b-5">
                                        <img className={styles.imgIcons} src={salaryIcon} alt="salary icon" />
                                        <p className={`${styles.stipend} dm-sans font-wt-400 text-14`}>Stipend</p>
                                    </div>
                                    <div>
                                        <span className={`${styles.monthlySalary} dm-sans font-wt-500 text-14`}>{monthlySalary}</span>
                                    </div>
                                </div>
                                <div className="flex dir-col">
                                    <div className="flex dir-row justify-center m-b-5">
                                        <img className={styles.imgIcons} src={workIcon} alt="work icon" />
                                        <span className={`${styles.workMode} dm-sans font-wt-400 text-14`}>Work Mode</span>
                                    </div>
                                    <div>
                                        <span className={`${styles.jobType} dm-sans font-wt-500 text-14`}>{jobType}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="m-b-20">
                                <p className="dm-sans font-wt-700 text-18 m-b-5">About company</p>
                                <div className={`${styles.aboutCompany} dm-sans font-wt-400`}>
                                    {aboutCompany}
                                </div>
                            </div>
                            <div className="m-b-20">
                                <p className="dm-sans font-wt-700 text-18 m-b-5">About the job/internship</p>
                                <div className={`${styles.jobDesc} dm-sans font-wt-400`}>
                                    {jobDescription}
                                </div>
                            </div>
                            <div className="flex dir-col m-b-20">
                                <p className="dm-sans font-wt-700 text-18 m-b-5">Skill's required</p>
                                <div className="flex dir-row">
                                    {Array.isArray(skillsRequired) ?
                                    skillsRequired.map((skill, index) => <button className={`${styles.skillsBtns} font-wt-400 dm-sans outline-none border-none m-r-5`} key={index}>{skill}</button>) :
                                    skillsRequired}
                                </div>
                            </div>
                            <div className="flex dir-col m-b-20">
                                <p className="dm-sans font-wt-700 text-18 m-b-5">Additional Information</p>
                                <div className={`${styles.info} dm-sans font-wt-400`}>
                                    {information}
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ViewDetailPage;
