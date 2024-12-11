const URL = "http://localhost:4000/api/"

//          register 
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

//          signin
export const signin = (data) => {
    return fetch(`${URL}user/singin/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
};

//         all the job
export const jobList = (data) => {
    return fetch(`${URL}job`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    })
} 
