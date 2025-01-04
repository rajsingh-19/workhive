import { useState } from "react";
import JobForm from "../components/jobform/JobForm";
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
        <div className="flex dir-row">
            <div>
            <h1>Add Job Description</h1>
            {/* Form for job creation */}
            <JobForm formData={jobFormData} setFormData={setJobFormData} onSubmit={handleAddjob} onReset={handleReset} buttonLabel={"+ Add Job"} />
            </div>
            <div>
                <img src="/assets/addjob.png" alt="add job png"/>
            </div>
        </div>
    );
};

export default AddJobPage;
