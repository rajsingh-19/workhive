import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getJobById } from "../services";

const ViewDetailPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobDetails = async () => {
            const res = await getJobById(id);
            if(res.status === 200) {
                const data = await res.json();
                console.log(data);
                setJob(data);
                setLoading(false);
            } else {
                console.log("failed to fetch the job", res);
            }
        }
    fetchJobDetails();
    }, [id]);

    if (!job) {
        return <h1>No Job Found</h1>;
    }

    const { jobPosition, jobDescription, companyName, monthlySalary, jobLocation, jobType, jobNature, skillsRequired} = job;
    const handleEditJob = (id) => {
        navigate(`/home/editjob/${id}`);
    };

    return (
        <div>
            <div>header</div>
            {
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
