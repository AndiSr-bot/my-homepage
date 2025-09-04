/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Grid, GridItem } from "@chakra-ui/react";
import NavBar from "../../atoms/NavBar";
import MainContent from "../Home/MainContent";
const index = () => {
    const navigator = [
        {
            label: "Dashboard /",
            link: null,
        },
    ];
    return (
        <Box
            maxW="100%"
            p={0}
            gridTemplateColumns="auto">
            <Grid minH={"100vh"}>
                <GridItem>
                    <NavBar
                        margin={"20px"}
                        title={"Dashboard"}
                        navigator={navigator}
                    />
                    <MainContent isDashboard={true} />
                </GridItem>
            </Grid>
        </Box>
    );
};

export default index;
