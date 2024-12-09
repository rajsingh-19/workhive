const URL = "http://localhost:4000/api/user/"

//          register 
export const register = (data) => {
    return fetch(`${URL}register/`, {
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
    return fetch(`${URL}singin/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
};

