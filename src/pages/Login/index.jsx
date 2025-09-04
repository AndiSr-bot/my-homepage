/* eslint-disable react-hooks/rules-of-hooks */
import { Box } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";
import { authorization } from "../../helpers/cryptoJS";
import LoginForm from "../../components/LoginForm";
const index = () => {
    if (authorization()) {
        return <Navigate to={"/dashboard"} />;
    }
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh">
            <LoginForm />
        </Box>
    );
};
export default index;
