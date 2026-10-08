import axios from "axios";

const aiApiInstance = axios.create({
    baseURL: "http://localhost:3000/api/ai",
    withCredentials: true,
});


export async function createRoadmap(data) {
    const response = await aiApiInstance.post("/create", data);

    console.log("Ai: ",response);

    return response.data;
}

export async function getRoadmaps() {
    const response = await aiApiInstance.get('/roadmap');
    console.log("Roadmaps:",response);

    return response.data;
}