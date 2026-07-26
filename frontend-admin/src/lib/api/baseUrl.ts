export const getBaseUrl = () => {
    if (typeof window !== "undefined") {
        return "";
    }

    if (process.env.DOCKER === "true") {
        console.log("Is Docker active: " + process.env.DOCKER)
        return "http://backend:8080";
    }

    if (process.env.NODE_ENV === "development") {
        console.log("Is local active: " + process.env.NODE_ENV)
        return "http://localhost:8080";
    }

    console.log("BaseUrl: " + process.env.NEXT_PUBLIC_API_URL)
    return process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";
};
