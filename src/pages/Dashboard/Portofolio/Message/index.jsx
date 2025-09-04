import { Box, Grid, GridItem } from "@chakra-ui/react";
import Dashboard from "./Dashboard";
import NavBar from "../../../../atoms/NavBar";

const index = () => {
    const navigator = [
        {
            label: "Message /",
            link: null,
        },
    ];
    return (
        <Box maxW="100%" p={0} gridTemplateColumns="auto">
            <Grid minH={"100vh"}>
                <GridItem>
                    <NavBar
                        margin={"20px"}
                        title={"Message"}
                        navigator={navigator}
                    />
                    <Dashboard />
                </GridItem>
            </Grid>
        </Box>
    );
};

export default index;
