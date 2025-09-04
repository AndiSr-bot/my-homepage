import { Navigate, Outlet } from "react-router-dom";
import { authorization } from "../helpers/cryptoJS";
import { useToast } from "@chakra-ui/react";

const Otentikasi = () => {
    const toast = useToast();
    if (localStorage.getItem("authorization")) {
        if (authorization().session_expired > Date.now()) {
            <Navigate to="/dashboard" />;
            return <Outlet />;
        } else {
            toast({
                title: "Error",
                description: "Session expired",
                status: "error",
                isClosable: true,
                variant: "subtle",
                duration: 3000,
                position: "top-right",
            });
            localStorage.clear();
            return <Navigate to="/login" />;
        }
    } else {
        localStorage.clear();
        return <Navigate to="/login" />;
    }
};
export default Otentikasi;
