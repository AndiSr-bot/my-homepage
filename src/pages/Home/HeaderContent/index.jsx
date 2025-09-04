import { Box, Center, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
    const [mbs, setMbs] = useState("90px");
    useEffect(() => {
        function updateMbs() {
            if (window.innerWidth <= 1080) {
                setMbs(null);
            } else {
                setMbs("90px");
            }
        }

        updateMbs();

        window.addEventListener("resize", updateMbs);

        return () => {
            window.removeEventListener("resize", updateMbs);
        };
    }, []);
    return (
        <Box
            as="header"
            h="60px"
            w="100%"
            bg="#3F51B5"
            mb={mbs}>
            <Center h="100%">
                <Text
                    textAlign="center"
                    color="white"
                    fontSize="28px"
                    fontWeight={"600"}>
                    Andi<NavLink to={"/dashboard"}>&apos;</NavLink>s Homepage
                </Text>
            </Center>
        </Box>
    );
};

export default Header;
