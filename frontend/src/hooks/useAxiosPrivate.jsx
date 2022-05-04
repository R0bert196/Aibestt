import { axiosPrivate } from "../utilities/Api";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useAtom } from "jotai";
import state from "../state";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const [token, setToken] = useAtom(state.token);



    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [refresh, token])

    return axiosPrivate;
}

export default useAxiosPrivate;