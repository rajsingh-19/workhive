import {useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobById } from "../../services/index";

const ViewDetailPage = () => {
    const {id} = useParams();                       // Extract the `id` parameter from the route using `useParams` hook
    const navigate = useNavigate();                 // Initialize `navigate` for programmatic navigation
    const [job, setJob] = useState(null);           // State to store the job details
    const [loading, setLoading] = useState(true);   // State to handle the loading status

    useEffect(() => {
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
        return <h1>No Job Found</h1>;
    }
    // Destructure the job properties for easier access
    const { jobPosition, jobDescription, companyName, monthlySalary, jobLocation, jobType, jobNature, skillsRequired} = job;
    // Function to navigate to the Edit Job page with the job's ID
    const handleEditJob = (id) => {
        navigate(`/home/editjob/${id}`);
    };

    return (
        <div>
            <div>header</div>
            {       // Show a loading message while data is being fetched
                loading ? <h1>Loading....</h1> :
                (
                    <div>
                        <h1>{jobPosition}</h1>
                        <p>{jobDescription}</p>
                        <p>{companyName}</p>
                        <p>{monthlySalary}</p>
                        <p>{jobLocation}</p>
                        <p>{jobType}</p>
                        <p>{jobNature}</p>
                        <div>
                        <h3>Skills Required</h3>
                        {Array.isArray(skillsRequired)
                            ? skillsRequired.map((skill, index) => <span key={index}>{skill}</span>)
                            : skillsRequired}
                        </div>
                        <button onClick={() => {handleEditJob(id)}}>Edit job</button>
                    </div>
                )
            }
        </div>
    );
};

export default ViewDetailPage;
