import { api } from "../services/api";

export async function getUserImage(id: string) {
    const response = await api.post("/user/getUserAvatar", {
        id
    });
    if (response.data.code === 200) {
        return response.data.data.avatar;
    }
    return false;
}