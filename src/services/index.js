// const URL = "http://localhost:4000/"

//          register 
export const register = (data) => {
    return fetch("http://localhost:4000/api/user/register/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    )
}



