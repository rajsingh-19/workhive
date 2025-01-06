import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../addjob/addjob.module.css";
import { editJob, getJobById } from "../../services/index";
import addJobPng from "../../assets/addJob.png";
import { toast } from 'react-toastify';

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

    //    UseEffect for fetching the job byt its id 
    useEffect(() => {
        if(id) {
            const fetchJobById = async () => {
                try {
                    const res = await getJobById(id);
                    if(res.status === 200) {
                        const data = await res.json();
                        setJobDetails(data);
                    } else {
                        const errorData = await res.json();
                        const errorMessage = errorData.message || "An error occurred";
                        toast.error(errorMessage);  // Show the error message from the backend
                    }
                } catch (error) {
                    console.log(error);
                    toast.error("An unexpected error occurred:", error);
                }
            }
            fetchJobById();
        }
    }, [id]);

    //                      function for update the job
    const handleUpdateJob = async (e) => {
        e.preventDefault()
        try {
            const res = await editJob(id, jobDetails)
            if (res.status === 200) {
                const data = await res.json()
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
                toast.success("Job Updated successfully");
            } else {
                const errorData = await res.json();
                const errorMessage = errorData.message || "An error occurred";
                toast.error(errorMessage);  // Show the error message from the backend
            }
        } catch (error) {
            console.log(error);
            toast.error("An unexpected error occurred:", error);
        }
    };

    // Handles changes in input fields and updates the form data state
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Update form data, splitting and trimming skills if the field is "skillsRequired"
        setJobFormData({...jobFormData,
            [name]: name === "skillsRequired" ? value.split(",").map(skill => skill.trim()) : value,
        });
    };

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
        <div className={`${styles.container} flex dir-row`}>
            <div className={styles.formContainer}>
                <div className="text-30 font-wt-700 dm-sans m-b-10">Edit Job Details</div>
                {/*         Form for job update         */}
                <form onSubmit={handleUpdateJob}>
                    <div className="flex dir-row justify-space-btwn align-center">
                        <label>Company Name</label>
                        <input className={styles.formInput} type="text" name="companyName" value={jobDetails.companyName} onChange={(e) => setJobDetails({...jobDetails, [e.target.name] : e.target.value})} placeholder="Enter your company name here" />
                    </div>
                    <div className="flex dir-row justify-space-btwn">
                        <label>Add logo URL</label>
                        <input className={styles.formInput} type="text" name="addLogoUrl" value={jobDetails.addLogoUrl} onChange={(e) => setJobDetails({...jobDetails, [e.target.name] : e.target.value})} placeholder="Enter the link" />
                    </div>
                    <div className="flex dir-row justify-space-btwn">
                        <label>Job position</label>
                        <input className={styles.formInput} type="text" name="jobPosition" value={jobDetails.jobPosition} onChange={(e) => setJobDetails({...jobDetails, [e.target.name] : e.target.value})} placeholder="Enter job position" />
                    </div>
                    <div className="flex dir-row justify-space-btwn">
                        <label>Monthly Salary</label>
                        <input className={styles.formInput} type="number" name="monthlySalary" value={jobDetails.monthlySalary} onChange={(e) => setJobDetails({...jobDetails, [e.target.name] : e.target.value})} placeholder="Enter amount in rupees" />
                    </div>
                    <div className="flex dir-row justify-space-btwn">
                        <label>Job Type</label>
                        <select name="jobType" value={jobDetails.jobType} onChange={(e) => setJobDetails({...jobDetails, [e.target.name] : e.target.value})} >
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
                        <select name="jobNature" value={jobDetails.jobNature} onChange={(e) => setJobDetails({...jobDetails, [e.target.name] : e.target.value})} >
                            <option className={styles.optionsContainer} value="">Select</option>
                            <option className={styles.optionsContainer} value="Remote">Remote</option>
                            <option className={styles.optionsContainer} value="Office">Office</option>
                        </select>
                    </div>
                    <div className="flex dir-row justify-space-btwn">
                        <label>Location</label>
                        <input className={styles.formInput} type="text" name="location" value={jobDetails.location} onChange={(e) => setJobDetails({...jobDetails, [e.target.name] : e.target.value})} placeholder="Enter location" />
                    </div>
                    <div className="flex dir-row justify-space-btwn">
                        <label>Job Description</label>
                        <textarea className={styles.formInput} name="jobDescription" value={jobDetails.jobDescription} onChange={(e) => setJobDetails({...jobDetails, [e.target.name] : e.target.value})} placeholder="Type the Job Description"></textarea>
                    </div>
                    <div className="flex dir-row justify-space-btwn">
                        <label>About Company</label>
                        <textarea className={styles.formInput} name="aboutCompany" value={jobDetails.aboutCompany} onChange={(e) => setJobDetails({...jobDetails, [e.target.name] : e.target.value})} placeholder="Type about your company"></textarea>
                    </div>
                    <div className="flex dir-row justify-space-btwn">
                        <label>Skills Required</label>
                        <input className={styles.formInput} type="text" name="skillsRequired" value={jobDetails.skillsRequired} onChange={handleInputChange} placeholder="Enter your skills here" />
                    </div>
                    <div className="flex dir-row justify-space-btwn">
                        <label>Information</label>
                        <input className={styles.formInput} type="text" name="information" value={jobDetails.information} onChange={(e) => setJobDetails({...jobDetails, [e.target.name] : e.target.value})} placeholder="Enter the additional information" />
                    </div>
                    <div className={styles.btnContainer}>
                        <button className={`${styles.cancelBtn} font-wt-500 roboto text-18 bg-transparent cursor-pointer`} type="button" onClick={handleReset}>Cancel</button>
                        <button className={`${styles.addBtn} font-wt-500 roboto text-18 cursor-pointer outline-none border-none`} type="submit">Update Job</button>
                    </div>
                </form>
            </div>
            {/*         image container      */}
            <div className={`${styles.imageContainer} flex justify-center position-relative`}>
                <p className="dm-sans text-30 font-wt-500 text-white position-absolute">Recruiter edit job details here</p>
                <img className={styles.image} src={addJobPng} alt="add job png"/>
            </div>
        </div>
    );
};

export default EditJobPage;
