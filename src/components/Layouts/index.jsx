// Import React-Router-Dom
import { Outlet } from "react-router-dom";

// Import Libaray UI
import { Box, Grid, GridItem } from "@chakra-ui/react";
import SideBar from "../Sidebar";
export default function index() {
    return (
        <Box
            maxW="100%"
            py={14}
            p={0}
            bgColor={"#dedfe0"}
            position={"relative"}>
            <Grid
                templateColumns={{ lg: "20rem auto" }}
                minH={"100vh"}
                bgColor={"#dedfe0"}>
                <GridItem position={"relative"}>
                    <SideBar />
                </GridItem>
                <GridItem>
                    <Outlet />
                </GridItem>
            </Grid>
        </Box>
    );
}
