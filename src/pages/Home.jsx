import { useEffect, useState } from "react";
import { jobList } from "../services";

const HomePage = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(()=> {
        const fetchJobs = async () => {
            const res = await jobList();
            if(res.status === 200) {
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
            Home
        </div>
    )
};

export default HomePage;
