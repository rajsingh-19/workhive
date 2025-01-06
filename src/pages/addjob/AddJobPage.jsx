import React, { useState } from "react";
import { addJob } from "../../services/index";
import addJobPng from "../../assets/addJob.png";
import styles from './addjob.module.css';
import { toast } from 'react-toastify';

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
            toast.success("Job created successfully");      // Notify user
        } else if (res.status === 401) {            // If the user is not authenticated
            toast.info("Login to create a job");
        } else {                                    // Handle other errors
            console.log(res);                       // Log the error response
            toast.error("error");
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

    // Handles changes in input fields and updates the form data state
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Update form data, splitting and trimming skills if the field is "skillsRequired"
        setJobFormData({...jobFormData,
            [name]: name === "skillsRequired" ? value.split(",").map(skill => skill.trim()) : value,
        });
    };
          
    return (
        <div className={`${styles.container} flex dir-row`}>
            <div className={styles.formContainer}>
                <div className="text-30 font-wt-700 dm-sans m-b-10">Add Job Description</div>
                {/* Form for job creation */}
                <form onSubmit={handleAddjob}>
                    <div className="flex dir-row justify-space-btwn align-center">
                        <label>Company Name</label>
                        <input className={styles.formInput} type="text" name="companyName" value={jobFormData.companyName} onChange={(e) => setJobFormData({...jobFormData, [e.target.name] : e.target.value})} placeholder="Enter your company name here" />
                    </div>
                    <div className="flex dir-row justify-space-btwn">
                        <label>Add logo URL</label>
                        <input className={styles.formInput} type="text" name="addLogoUrl" value={jobFormData.addLogoUrl} onChange={(e) => setJobFormData({...jobFormData, [e.target.name] : e.target.value})} placeholder="Enter the link" />
                    </div>
                    <div className="flex dir-row justify-space-btwn">
                        <label>Job position</label>
                        <input className={styles.formInput} type="text" name="jobPosition" value={jobFormData.jobPosition} onChange={(e) => setJobFormData({...jobFormData, [e.target.name] : e.target.value})} placeholder="Enter job position" />
                    </div>
                    <div className="flex dir-row justify-space-btwn">
                        <label>Monthly Salary</label>
                        <input className={styles.formInput} type="number" name="monthlySalary" value={jobFormData.monthlySalary} onChange={(e) => setJobFormData({...jobFormData, [e.target.name] : e.target.value})} placeholder="Enter amount in rupees" />
                    </div>
                    <div className="flex dir-row justify-space-btwn">
                        <label>Job Type</label>
                        <select name="jobType" value={jobFormData.jobType} onChange={(e) => setJobFormData({...jobFormData, [e.target.name] : e.target.value})} >
                            <option className={styles.optionsContainer} value="">Select</option>
                            <option className={styles.optionsContainer} value="Full-Time">Full-Time</option>
                            <option className={styles.optionsContainer} value="Part-Time">Part-Time</option>
                            <option className={styles.optionsContainer} value="Contract">Contract</option>
                            <option className={styles.optionsContainer} value="Internship">Internship</option>
                            <option className={styles.optionsContainer} value="Freelance">Freelance</option>
                        </select>
                    </div>
                    <div className="flex dir-row justify-space-btwn">
                        <label>Remote/Office</label>
                        <select name="jobNature" value={jobFormData.jobNature} onChange={(e) => setJobFormData({...jobFormData, [e.target.name] : e.target.value})} >
                            <option className={styles.optionsContainer} value="">Select</option>
                            <option className={styles.optionsContainer} value="Remote">Remote</option>
                            <option className={styles.optionsContainer} value="Office">Office</option>
                        </select>
                    </div>
                    <div className="flex dir-row justify-space-btwn">
                        <label>Location</label>
                        <input className={styles.formInput} type="text" name="location" value={jobFormData.location} onChange={(e) => setJobFormData({...jobFormData, [e.target.name] : e.target.value})} placeholder="Enter location" />
                    </div>
                    <div className="flex dir-row justify-space-btwn">
                        <label>Job Description</label>
                        <textarea className={styles.formInput} name="jobDescription" value={jobFormData.jobDescription} onChange={(e) => setJobFormData({...jobFormData, [e.target.name] : e.target.value})} placeholder="Type the Job Description"></textarea>
                    </div>
                    <div className="flex dir-row justify-space-btwn">
                        <label>About Company</label>
                        <textarea className={styles.formInput} name="aboutCompany" value={jobFormData.aboutCompany} onChange={(e) => setJobFormData({...jobFormData, [e.target.name] : e.target.value})} placeholder="Type about your company"></textarea>
                    </div>
                    <div className="flex dir-row justify-space-btwn">
                        <label>Skills Required</label>
                        <input className={styles.formInput} type="text" name="skillsRequired" value={jobFormData.skillsRequired} onChange={handleInputChange} placeholder="Enter your skills here" />
                    </div>
                    <div className="flex dir-row justify-space-btwn">
                        <label>Information</label>
                        <input className={styles.formInput} type="text" name="information" value={jobFormData.information} onChange={(e) => setJobFormData({...jobFormData, [e.target.name] : e.target.value})} placeholder="Enter the additional information" />
                    </div>
                    <div className={styles.btnContainer}>
                        <button className={`${styles.cancelBtn} font-wt-500 roboto text-18 bg-transparent cursor-pointer`} type="button" onClick={handleReset}>Cancel</button>
                        <button className={`${styles.addBtn} font-wt-500 roboto text-18 cursor-pointer outline-none border-none`} type="submit">+ AddJob</button>
                    </div>
                </form>
            </div>
            {/*             image container      */}
            <div className={`${styles.imageContainer} flex justify-center position-relative`}>
                <p className="dm-sans text-30 font-wt-500 text-white position-absolute">Recruiter add job details here</p>
                <img className={styles.image} src={addJobPng} alt="add job png"/>
            </div>
        </div>
    );
};

export default AddJobPage;
