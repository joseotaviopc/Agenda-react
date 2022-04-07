import { useCallback, useMemo, useState } from "react";
import useStorage from "./useStorage";

// headers.append("Access-Control-Allow-Methods", "*");
// headers.append("Access-Control-Allow-Origin", "*");
// headers.append("Access-Control-Allow-Headers", "*");

const useFetch = (url) => {

    const urlBase = useMemo(() => url || "http://localhost:5000/v1/", [url]);
    const [loading, setLoading] = useState(null);
    const [token, setToken] = useStorage("token", "");

    const request = useCallback(async (rota, options = {}) => {

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${token}`);

        options.headers = headers;

        let response;
        let json;

        try {
            setLoading(true);
            response = await fetch((urlBase + rota), options);
            json = await response.json();

            if(rota === "auth" && options?.method === "POST") {
                setToken(json.data.token);
            }
        }
        catch(err) {
            json = null;
            console.error("Deu ruim!", err);
        }
        finally {
            setLoading(false);
            return { response, json };
        }
    }, [token, setToken, urlBase]);

    return { loading, request };
};

export default useFetch;