import axios from "axios";

const authApiInstance = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true,
});

export async function login({ email, password }) {
    const response = await authApiInstance.post("/login", {
        email,
        password
    })

    console.log(response);  

    return response.data;
}


export async function register({email, password, fullName}) {
    const response = await authApiInstance.post("/register", {
        email,
        password,
        fullname: fullName
    });

    return response.data;
}

export async function me() {
    const response = await authApiInstance.get('/me');
    return response.data;    
}