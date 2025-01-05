const apiURL = import.meta.env.VITE_API_URL;

//              register 
export const register = (data) => {
    return fetch(`${apiURL}api/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    )
};

//              signin
export const signin = (data) => {
    return fetch(`${apiURL}api/user/signin`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
};

//              all the job
export const jobList = ({limit, offset, name, skillsRequired}) => {
    return fetch(`${apiURL}api/job?limit=${limit}&offset=${offset}&name=${name}&skillsRequired=${skillsRequired}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    })
};

//              create a job
export const addJob = (data) => {
    return fetch(`${apiURL}api/job`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'authorization': `${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
    })
};

//              get job by id
export const getJobById = (id) => {
    return fetch(`${apiURL}api/job/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application.json',
            'authorization': `${localStorage.getItem('token')}`
        }
    })
};

//              edit a job
export const editJob = (id, jobDetails) => {
    return fetch(`${apiURL}api/job/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'authorization': `${localStorage.getItem('token')}`
        },
        body: JSON.stringify(jobDetails)
    })
};

//              delete a job
export const deleteJob = (id) => {
    return fetch(`${apiURL}api/job/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application.json',
            'authorization': `${localStorage.getItem('token')}`
        }
    })
};
