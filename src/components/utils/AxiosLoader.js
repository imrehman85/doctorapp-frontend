// useAxiosLoader.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useAxiosLoader = () => {
    const router = useNavigate();

    const [loading, setLoading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const requestInterceptor = axios.interceptors.request.use((request) => {
            setLoading(true);
            return request;
        });

        const responseInterceptor = axios.interceptors.response.use(
            (response) => {
                setLoading(false);
                return response;
            },
            (error) => {
                setLoading(false);
                if (error.response && error.response.status === 401 && error.response.data.message === 'please authenticate') {
                    setErrorMessage("Session Expired: Please Login Again");
                    setShowError(true);
                    router("/");
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, [router]);

    const hideError = () => {
        setShowError(false);
    };

    return { loading, showError, errorMessage, hideError };
};

export default useAxiosLoader;
