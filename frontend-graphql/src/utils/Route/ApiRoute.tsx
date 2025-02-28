
interface ApiRouteParams {
    endpoint: string;
}

export const getApiRoute = (endpoint: ApiRouteParams['endpoint']): string => {
    return `${getApiUrl()}/api/${endpoint}`;
}

const getApiUrl = () => {
    return import.meta.env.VITE_API_BASE_URL;
}