import { useEffect, useState } from "react";
import { jobList } from "../services";

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
    // console.log(jobs);
    return (
        <>
                {loading ? <h1>Loading.....</h1> : 
                <div>

                </div>
            }
        </>
    )
};

export default HomePage;
