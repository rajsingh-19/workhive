const JobCard = ({addLogoUrl, jobPosition, monthlySalary, jobType, jobNature, jobLocation, skillsRequired, id, handleEditJob, handleViewDetails, handleDeleteJob}) => {
    return (
        <div>
            <div>
                <div>
                    <img src={addLogoUrl} alt="" />
                </div>
                <div>
                    <div>{jobPosition}</div>
                    <div>
                        <div></div>
                        <div>{monthlySalary}</div>
                    </div>
                    <div>
                        <div>
                            <img src={""} alt="" />
                        </div>
                        <div>{jobLocation}</div>
                    </div>
                </div>
                <div>
                    <p>{jobNature}</p>
                    <p>{jobType}</p>
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
