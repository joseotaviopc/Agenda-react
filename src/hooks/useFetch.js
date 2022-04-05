import { useCallback, useState } from "react";


const useFetch = () => {
    const urlBase = "http://localhost:5000/v1/";
    const [loading, setLoading] = useState(null);

    const request = useCallback(async (rota, options) => {

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Access-Control-Allow-Methods", "*");
        headers.append("Access-Control-Allow-Origin", "*");
        headers.append("Access-Control-Allow-Headers", "*");
        options.headers = headers;

        let response;
        let json;

        try {
            setLoading(true);
            response = await fetch(urlBase + rota, options);
            json = await response.json();
        }
        catch(err) {
            json = null;
            console.log("Deu ruim!", err);
        }
        finally {
            setLoading(false);
            return { response, json };
        }
    }, []);

    return { loading, request };
};

export default useFetch;