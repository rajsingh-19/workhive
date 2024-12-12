import { useEffect, useState } from "react";
import { jobList } from "../services";
import { data } from "react-router-dom";

const HomePage = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const fetchJobs = async () => {
            const res = await jobList();
            if(res.status === 200) {
                setLoading(false);
                const data = await res.json();
                setJobs(data);
            } else {
                console.log(res);
            }
        };
        fetchJobs();
    }, []);
    console.log(jobs);
    return (
        <div>
            <h1>Home Page</h1>
            {loading ? <h1>Loading.....</h1> : 
                jobs.map((jobs) => (
                    <div key={jobs._id}>
                        <p>{jobs.companyName}</p>
                        <p>{jobs.aboutCompany}</p>
                        <p>{jobs.addLogoUrl}</p>
                        <p>{jobs.information}</p>
                    </div>
                ))
            }
        </div>
    )
};

export default HomePage;
