export const setHeaders = (token) => {
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    }
    return header;
}