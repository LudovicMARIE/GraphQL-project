export const getApiRoute = (endpoint) => {
    return `${getApiUrl()}/api/${endpoint}`;
}

const getApiUrl = () => {
    return import.meta.env.VITE_API_BASE_URL;
}