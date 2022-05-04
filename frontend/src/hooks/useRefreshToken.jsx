import Api, { axiosPrivate } from '../utilities/Api';
import { useAtom } from "jotai";
import state from "../state";


const useRefreshToken = () => {

    const [token, setToken] = useAtom(state.token);

    const refresh = async () => {
        const response = await Api.post('/refresh', { headers: {"Authorization" : `Bearer ${token}`} });
        // setAuth(prev => {
        //     // console.log(JSON.stringify(prev));
        //     console.log(response.data.token);
        //     return { ...prev, accessToken: response.data.accessToken }
        // });
        console.log(response.data);
        setToken(response.data);
        return response.data;
    }
    return refresh;
};

export default useRefreshToken;