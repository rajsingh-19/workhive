import { useState } from "react";
import { addJob } from "../services";

const AddJobPage = () => {
//              state to manage form data for adding a job
    const [jobFormData, setJobFormData] = useState({
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
//              function for creating a job
    const handleAddjob = async (e) => {
        e.preventDefault();                     // Prevent default form submission
        const res = await addJob(jobFormData);  // API call to add a job
        if(res.status === 200) {                 // If the request is successful
            const data = await res.json();
            console.log(data);                   // Log the response data for debugging
            setJobFormData({
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
            });                                 // Reset form fields after successful submission
            alert("Job created successfully");      // Notify user
        } else if (res.status === 401) {            // If the user is not authenticated
            alert("Login to create a job");
        } else {                                    // Handle other errors
            console.log(res);                       // Log the error response
            alert("error");
        }
    };
//              function for reset the job form
    const handleReset = () => {
        setJobFormData({
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
        <div>
            <h1>Add Job Description</h1>
            {/* Form for job creation */}
            <form onSubmit={handleAddjob}>
                <div>
                    <label>Company Name</label>
                    <input type="text" name="companyName" value={jobFormData.companyName} onChange={(e) => setJobFormData({...jobFormData, [e.target.name]: e.target.value})} placeholder="Enter your company name here" />
                </div>
                <div>
                    <label>Add logo URL</label>
                    <input type="text" name="addLogoUrl" value={jobFormData.addLogoUrl} onChange={(e) => setJobFormData({...jobFormData, [e.target.name]: e.target.value})} placeholder="Enter the link" />
                </div>
                <div>
                    <label>Job position</label>
                    <input type="text" name="jobPosition" value={jobFormData.jobPosition} onChange={(e) => setJobFormData({...jobFormData, [e.target.name]: e.target.value})} placeholder="Enter job position" />
                </div>
                <div>
                    <label>Monthly Salary</label>
                    <input type="text" name="monthlySalary" value={jobFormData.monthlySalary} onChange={(e) => setJobFormData({...jobFormData, [e.target.name]: e.target.value})} placeholder="Enter amount in rupees" />
                </div>
                <div>
                    <label>Job Type</label>
                    <select name="jobType" value={jobFormData.jobType} onChange={(e) => setJobFormData({...jobFormData, [e.target.name]: e.target.value})} >
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
                    <select name="jobNature" value={jobFormData.jobNature} onChange={(e) => setJobFormData({...jobFormData, [e.target.name]: e.target.value})} >
                        <option value="">Select</option>
                        <option value="Remote">Remote</option>
                        <option value="Office">Office</option>
                    </select>
                </div>
                <div>
                    <label>Location</label>
                    <input type="text" name="location" value={jobFormData.location} onChange={(e) => setJobFormData({...jobFormData, [e.target.name]: e.target.value})} placeholder="Enter location" />
                </div>
                <div>
                    <label>Job Description</label>
                    <textarea name="jobDescription" value={jobFormData.jobDescription} onChange={(e) => setJobFormData({...jobFormData, [e.target.name]: e.target.value})} placeholder="Type the Job Description"></textarea>
                </div>
                <div>
                    <label>About Company</label>
                    <textarea name="aboutCompany" value={jobFormData.aboutCompany} onChange={(e) => setJobFormData({...jobFormData, [e.target.name]: e.target.value})} placeholder="Type about your company"></textarea>
                </div>
                <div>
                    <label>Skills Required</label>
                    <input type="text" name="skillsRequired" value={jobFormData.skillsRequired} onChange={(e) => setJobFormData({...jobFormData, [e.target.name]: e.target.value.split(',').map(skill => skill.trim())})} placeholder="Enter your skills here" />
                </div>
                <div>
                    <label>Information</label>
                    <input type="text" name="information" value={jobFormData.information} onChange={(e) => setJobFormData({...jobFormData, [e.target.name]: e.target.value})} placeholder="Enter the additional information" />
                </div>
                <div>
                    <button type="button" onClick={handleReset}>Cancel</button>
                    <button type="submit">+ Add Job</button>
                </div>
            </form>
        </div>
    )
};

export default AddJobPage;
