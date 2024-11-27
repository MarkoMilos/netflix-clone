import axios from "axios";

const fetcher = async (url: string) => {
    const response = await axios.get(url);
    if (response.status !== 200) {
        throw new Error(response.data.message || "An error occurred");
    }
    return response.data;
};

export default fetcher;
