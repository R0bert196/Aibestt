import Api, { axiosPrivate } from '../utilities/Api';
import { useAtom } from "jotai";
import state from "../state";


const useRefreshToken = () => {

    const [token, setToken] = useAtom(state.token);

    const refresh = async () => {
        const response = await Api.get('/refreshtoken', { headers: {"Authorization" : `Bearer ${token}`} });
        // setAuth(prev => {
        //     // console.log(JSON.stringify(prev));
        //     console.log(response.data.token);
        //     return { ...prev, accessToken: response.data.accessToken }
        // });
        console.log(response.data.jwtToken);
        setToken(response.data.jwtToken);
        return response.data.jwtToken;
    }
    return refresh;
};

export default useRefreshToken;