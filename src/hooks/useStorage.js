import { useEffect, useState } from "react";

const useStorage = (key, defaultValue) => {

    const [estado, setEstado] = useState(() => {
        const dado = window.localStorage.getItem(key);
        return dado ? dado : defaultValue;
    });

    useEffect(() => {
        window.localStorage.setItem(key, estado);
    }, [key, estado]);

    return [estado, setEstado];
}

export default useStorage;
