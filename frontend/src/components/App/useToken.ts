import { useState } from "react";

export default function useToken() {

    const getToken = (): string | null => {
        const tokenString = localStorage.getItem('token');
        const userToken: string | null = tokenString ? JSON.parse(tokenString) : null;
        return userToken ? userToken : null;
    }

    const [token, setToken] = useState<string | null>(getToken());

    const saveToken = (userToken: string) => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
    }

    return {
        setToken: saveToken,
        token
    }
}