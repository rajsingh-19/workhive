import React from "react";
import styles from "./jobcard.module.css";
import flagIcon from "../../assets/flag.svg";

const JobCard = ({addLogoUrl, jobPosition, monthlySalary, jobType, jobNature, jobLocation, skillsRequired, id, handleEditJob, handleViewDetails, handleDeleteJob}) => {
    return (
        <div className={`${styles.jobCard} flex dir-row`}>
            <div className="flex dir-row">
                {/*         img container     */}
                <div className={`${styles.companyLogoContainer} flex dir-row justify-center align-center`}>
                    <img className={styles.companyLogo} src={addLogoUrl} alt="" />
                </div>
                {/*         detail container  */}
                <div className="flex dir-col">
                    <div>{jobPosition}</div>
                    <div>
                        <div></div>
                        <div>{monthlySalary}</div>
                    </div>
                    <div className="flex dir-row">
                        <p>{jobNature}</p>
                        <p>{jobType}</p>
                    </div>
                </div>
                {/*         location         */}
                <div className="flex dir-row">
                    <div className={styles.countryFlagContainer}>
                        <img className={styles.countryFlag} src={flagIcon} alt={addLogoUrl} />
                    </div>
                    <p>{jobLocation}</p>
                </div>
            </div>
            <div>
                <div>
                    {/* Render skillsRequired */}
                    {Array.isArray(skillsRequired) ? (
                        skillsRequired.map((skill, index) => (
                            <button key={index}>{skill}</button>
                        ))
                    ) : (
                        <button>{skillsRequired}</button>
                    )}
                </div>
                <div>
                    <button onClick={() => {handleEditJob(id)}}>Edit job</button>
                    <button onClick={() => {handleViewDetails(id)}}>View details</button>
                    <button onClick={() => {handleDeleteJob(id)}}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
