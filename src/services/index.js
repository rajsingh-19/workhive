const URL = "http://localhost:4000/api/"

//              register 
export const register = (data) => {
    return fetch(`${URL}user/register/`, {
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
    return fetch(`${URL}user/singin/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
};

//              all the job
export const jobList = (data) => {
    return fetch(`${URL}job`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    })
} 

//              create a job
export const addJob = (data) => {
    return fetch(`${URL}job`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'authorization': `${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
    })
}

//              get job by id
export const getJobById = (id) => {
    return fetch(`${URL}job/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application.json',
            'authorization': `${localStorage.getItem('token')}`
        }
    })
}

//              edit a job
export const editJob = (id, jobDetails) => {
    return fetch(`${URL}job/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'authorization': `${localStorage.getItem('token')}`
        },
        body: JSON.stringify(jobDetails)
    })
}

//              delete a job
export const deleteJob = (id) => {
    return fetch(`${URL}job/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application.json',
            'authorization': `${localStorage.getItem('token')}`
        }
    })
}

