import {createContext, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "./useLocalStorage.tsx";
import {IContextProps, IUser} from "../routes/types.tsx";

export const AuthContext = createContext({} as IContextProps);

export const AuthProvider = ({children}: React.PropsWithChildren) => {
    const [user, setUser] = useLocalStorage("user", null);

    const navigate = useNavigate();

    const loginUser = (data: IUser) => {
        console.log("je passe ici ?")
        setUser(data);
        navigate("/dashboard");
    }

    const logout = () => {
        setUser(null);
        navigate("/login", {replace: true});
    }

    return <AuthContext.Provider value={{user, loginUser, logout}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};