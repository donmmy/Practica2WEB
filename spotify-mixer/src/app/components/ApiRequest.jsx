import { getAccessToken } from "@/lib/auth";

export async function apiRequest(url, method = "GET", body = null) {
    const token = getAccessToken();

    if (!token) {
        throw new Error("No access token available. Please login.");
    }

    const response = await fetch(url, {
        method,
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : null
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}