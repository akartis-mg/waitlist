export const setHeaders = (token) => {
    const header = {
        headers: {
            "Content-Type": "application/json",
            "X-auth-token": `${token}`,
        }
    }
    return header;
}