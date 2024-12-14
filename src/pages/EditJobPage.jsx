import { useEffect, useState } from "react";
import { editJob, getJobById } from "../services";
import { useParams } from "react-router-dom";

const EditJobPage = () => {
    const {id} = useParams();           // get the id from the header parameter
//          states to manage the job form details
    const [jobDetails, setJobDetails] = useState({
        companyName: '',
        addLogoUrl: '',
        jobPosition: '',
        monthlySalary: '',
        jobType: '',
        jobNature: '',
        location: '',
        jobDescription: '',
        aboutCompany: '',
        skillsRequired: '',
        information: ''
    });

    useEffect(() => {
        if(id) {
            const fetchJobById = async () => {
                const res = await getJobById(id);
                if(res.status === 200) {
                    const data = await res.json();
                    setJobDetails(data);
                } else {
                    console.log(data);
                }
            }
            fetchJobById();
        }
    }, [id]);

    //                      function for update the job
    const handleUpdateJob = async (e) => {
        e.preventDefault()
            const res = await editJob(id, jobDetails)
            if (res.status === 200) {
                const data = await res.json()
                console.log(data)
                setJobDetails({
                    companyName: '',
                    addLogoUrl: '',
                    jobPosition: '',
                    monthlySalary: '',
                    jobType: '',
                    jobNature: '',
                    location: '',
                    jobDescription: '',
                    aboutCompany: '',
                    skillsRequired: '',
                    information: ''
                });
                alert("Job Updated successfully");
            } else if (res.status === 401) {
                alert('login to update this job')
            } else {
                console.log(res)
                alert('error')
            }
    }

    //              function for reset the job form
    const handleReset = () => {
        setJobDetails({
            companyName: '',
            addLogoUrl: '',
            jobPosition: '',
            monthlySalary: '',
            jobType: '',
            jobNature: '',
            location: '',
            jobDescription: '',
            aboutCompany: '',
            skillsRequired: '',
            information: ''
        });                                         // Reset the state to initial values
    };

    return (
        <div className="flex dir-row">
            <div>
            <h1>Add Job Description</h1>
            {/* Form for job creation */}
            <form onSubmit={handleUpdateJob}>
                <div>
                    <label>Company Name</label>
                    <input type="text" name="companyName" value={jobDetails.companyName} onChange={(e) => setJobDetails({...jobDetails, [e.target.name]: e.target.value})} placeholder="Enter your company name here" />
                </div>
                <div>
                    <label>Add logo URL</label>
                    <input type="text" name="addLogoUrl" value={jobDetails.addLogoUrl} onChange={(e) => setJobDetails({...jobDetails, [e.target.name]: e.target.value})} placeholder="Enter the link" />
                </div>
                <div>
                    <label>Job position</label>
                    <input type="text" name="jobPosition" value={jobDetails.jobPosition} onChange={(e) => setJobDetails({...jobDetails, [e.target.name]: e.target.value})} placeholder="Enter job position" />
                </div>
                <div>
                    <label>Monthly Salary</label>
                    <input type="text" name="monthlySalary" value={jobDetails.monthlySalary} onChange={(e) => setJobDetails({...jobDetails, [e.target.name]: e.target.value})} placeholder="Enter amount in rupees" />
                </div>
                <div>
                    <label>Job Type</label>
                    <select name="jobType" value={jobDetails.jobType} onChange={(e) => setJobDetails({...jobDetails, [e.target.name]: e.target.value})} >
                        <option value="">Select</option>
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                        <option value="Freelance">Freelance</option>
                    </select>
                </div>
                <div>
                    <label>Remote/Office</label>
                    <select name="jobNature" value={jobDetails.jobNature} onChange={(e) => setJobDetails({...jobDetails, [e.target.name]: e.target.value})} >
                        <option value="">Select</option>
                        <option value="Remote">Remote</option>
                        <option value="Office">Office</option>
                    </select>
                </div>
                <div>
                    <label>Location</label>
                    <input type="text" name="location" value={jobDetails.location} onChange={(e) => setJobDetails({...jobDetails, [e.target.name]: e.target.value})} placeholder="Enter location" />
                </div>
                <div>
                    <label>Job Description</label>
                    <textarea name="jobDescription" value={jobDetails.jobDescription} onChange={(e) => setJobDetails({...jobDetails, [e.target.name]: e.target.value})} placeholder="Type the Job Description"></textarea>
                </div>
                <div>
                    <label>About Company</label>
                    <textarea name="aboutCompany" value={jobDetails.aboutCompany} onChange={(e) => setJobDetails({...jobDetails, [e.target.name]: e.target.value})} placeholder="Type about your company"></textarea>
                </div>
                <div>
                    <label>Skills Required</label>
                    <input type="text" name="skillsRequired" value={jobDetails.skillsRequired} onChange={(e) => setJobDetails({...jobDetails, [e.target.name]: e.target.value.split(',').map(skill => skill.trim())})} placeholder="Enter your skills here" />
                </div>
                <div>
                    <label>Information</label>
                    <input type="text" name="information" value={jobDetails.information} onChange={(e) => setJobDetails({...jobDetails, [e.target.name]: e.target.value})} placeholder="Enter the additional information" />
                </div>
                <div>
                    <button type="button" onClick={handleReset}>Cancel</button>
                    <button type="submit">Update</button>
                </div>
            </form>
            </div>
            <div>
                {/* <img src="/assets/addjob.png" alt="add job png"/> */}
            </div>
        </div>
    );
};

export default EditJobPage;
