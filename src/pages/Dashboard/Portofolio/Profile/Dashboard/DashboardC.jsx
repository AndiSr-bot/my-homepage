/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Grid, GridItem, HStack, Text } from "@chakra-ui/react";
import { authorization } from "../../../../../helpers/cryptoJS";

const DashboardC = () => {
    return (
        <Box
            p={{ base: 3, sm: 6, md: "row" }}
            ml={"20px"}
            mb={"20px"}
            mr={"20px"}
            // boxShadow="0px 10px 20px rgba(35, 70, 193, 0.15)"
            bgColor={"white"}
            rounded={20}>
            <Grid templateColumns="repeat(4, 1fr)">
                <GridItem>
                    <HStack
                        justifyContent="start"
                        marginBottom={"20px"}
                        flexWrap={"wrap"}>
                        <Text fontFamily="Poppins, sans-serif">Name</Text>
                    </HStack>
                </GridItem>
                <GridItem colSpan={3}>
                    <HStack
                        justifyContent="start"
                        marginBottom={"20px"}
                        flexWrap={"wrap"}>
                        <Text fontFamily="Poppins, sans-serif">
                            {authorization()?.name}
                        </Text>
                    </HStack>
                </GridItem>
            </Grid>
            <Grid templateColumns="repeat(4, 1fr)">
                <GridItem>
                    <HStack
                        justifyContent="start"
                        marginBottom={"20px"}
                        flexWrap={"wrap"}>
                        <Text fontFamily="Poppins, sans-serif">Email</Text>
                    </HStack>
                </GridItem>
                <GridItem colSpan={3}>
                    <HStack
                        justifyContent="start"
                        marginBottom={"20px"}
                        flexWrap={"wrap"}>
                        <Text fontFamily="Poppins, sans-serif">
                            {authorization()?.email}
                        </Text>
                    </HStack>
                </GridItem>
            </Grid>
            <Grid templateColumns="repeat(4, 1fr)">
                <GridItem>
                    <HStack
                        justifyContent="start"
                        flexWrap={"wrap"}>
                        <Text fontFamily="Poppins, sans-serif">Phone</Text>
                    </HStack>
                </GridItem>
                <GridItem colSpan={3}>
                    <HStack
                        justifyContent="start"
                        flexWrap={"wrap"}>
                        <Text fontFamily="Poppins, sans-serif">
                            {authorization()?.phone}
                        </Text>
                    </HStack>
                </GridItem>
            </Grid>
        </Box>
    );
};

export default DashboardC;
