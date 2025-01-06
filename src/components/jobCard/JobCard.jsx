import React, { useState, useEffect } from "react";
import styles from "./jobcard.module.css";
import flagIcon from "../../assets/flag.svg";
import rupeeIcon from "../../assets/rupeeIcon.svg";

const JobCard = ({addLogoUrl, jobPosition, monthlySalary, jobType, jobNature, jobLocation, skillsRequired, id, handleEditJob, handleViewDetails, handleDeleteJob}) => {
    const [userStatus, setUserStatus] = useState(false);

    // Check if the user is logged in
    useEffect(() => {
        const isUserLoggedIn = localStorage.getItem('token');
        if (isUserLoggedIn) {
            setUserStatus(true);
        }
    }, []);
          
    return (
        <div className={`${styles.jobCard} flex dir-row justify-space-btwn`}>
            <div className="flex dir-row">
                {/*         img container     */}
                <div className={`${styles.companyLogoContainer} flex dir-row justify-center align-center`}>
                    <img className={styles.companyLogo} src={addLogoUrl} alt="company logo icon" />
                </div>
                {/*         detail container  */}
                <div className={`${styles.secondSection} flex dir-col`}>
                    <div className="m-b-10">{jobPosition}</div>
                    <div className="flex dir-row align-center m-b-10">
                        <div className="flex dir-row align-center m-r-5">
                            <img className={styles.ruppeIcon} src={rupeeIcon} alt="salary icon" />
                        </div>
                        <div className={`${styles.monthlySalary} text-16 font-wt-500 roboto`}>{monthlySalary}</div>
                    </div>
                    <div className="flex dir-row justify-space-btwn">
                        <p className={`${styles.jobNature} text-14 font-wt-500 roboto`}>{jobNature}</p>
                        <span className={styles.verticalLine}>|</span>
                        <p className={`${styles.jobType} text-14 font-wt-500 roboto`}>{jobType}</p>
                    </div>
                </div>
                {/*         location         */}
                <div className={`${styles.thirdSection} flex dir-row align-center`}>
                    <div className={styles.countryFlagContainer}>
                        <img className={styles.countryFlag} src={flagIcon} alt={addLogoUrl} />
                    </div>
                    <p className={`${styles.location} text-16 roboto font-wt-500`}>{jobLocation}</p>
                </div>
            </div>
            <div className={"flex dir-col"}>
                <div className={styles.skillsContainer}>
                    {/* Render skillsRequired */}
                    {Array.isArray(skillsRequired) ? (
                        skillsRequired.map((skill, index) => (
                            <button className={styles.skillsBtn} key={index}>{skill}</button>
                        ))
                    ) : (
                        <button>{skillsRequired}</button>
                    )}
                </div>
                <div className={styles.btnsContainer}>
                    {
                        userStatus ? (
                            <div className="flex dir-row">
                                <button className={`${styles.detailsBtn} text-14 font-wt-500 dm-sans outline-none border-none cursor-pointer`} onClick={() => {handleViewDetails(id)}}>View details</button>
                                <button className={`${styles.editDelBtn} text-14 font-wt-500 dm-sans outline-none cursor-pointer`} onClick={() => {handleEditJob(id)}}>Edit job</button>
                                <button className={`${styles.editDelBtn} text-14 font-wt-500 dm-sans outline-none cursor-pointer`} onClick={() => {handleDeleteJob(id)}}>Delete</button>
                            </div>
                        ) :
                        (
                            <button className={`${styles.detailsBtn} text-14 font-wt-500 dm-sans outline-none border-none cursor-pointer`} onClick={() => {handleViewDetails(id)}}>View details</button>
                        )
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default JobCard;
