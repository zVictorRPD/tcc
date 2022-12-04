import { api } from "../services/api";

export async function getUserData() {
    const response = await api.post("/user/getUserData");
    if (response.data.code === 200) {
        return response.data.data;
    }
    return false;
}