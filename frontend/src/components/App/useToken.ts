import { useState } from "react";

interface Token {
    token: string;
}

export default function useToken() {

    const getToken = (): string | null => {
        const tokenString = sessionStorage.getItem('token');
        const userToken: Token | null = tokenString ? JSON.parse(tokenString) : null;
        return userToken ? userToken?.token : null;
    }

    const [token, setToken] = useState<string | null>(getToken());

    const saveToken = (userToken: Token) => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
    }

    return {
        setToken: saveToken,
        token
    }
}