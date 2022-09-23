import { api } from "../services/api";

export async function getUserData(id: string) {
    const response = await api.post("/user/getUserData", {
        id
    });
    if (response.data.code === 200) {
        return response.data.data;
    }
    return false;
}