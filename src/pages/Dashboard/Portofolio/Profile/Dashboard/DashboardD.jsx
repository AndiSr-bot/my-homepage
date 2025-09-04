/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Grid, GridItem, HStack, Text } from "@chakra-ui/react";
import { authorization } from "../../../../../helpers/cryptoJS";

const DashboardD = () => {
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
                        <Text fontFamily="Poppins, sans-serif">Tagline</Text>
                    </HStack>
                </GridItem>
                <GridItem colSpan={3}>
                    <HStack
                        justifyContent="start"
                        marginBottom={"20px"}
                        flexWrap={"wrap"}>
                        <Text
                            fontFamily="Poppins, sans-serif"
                            textAlign={"justify"}>
                            {authorization()?.tagline}
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
                        <Text fontFamily="Poppins, sans-serif">
                            Description
                        </Text>
                    </HStack>
                </GridItem>
                <GridItem colSpan={3}>
                    <HStack
                        justifyContent="start"
                        marginBottom={"20px"}
                        flexWrap={"wrap"}>
                        <Text
                            fontFamily="Poppins, sans-serif"
                            textAlign={"justify"}>
                            {authorization()?.description}
                        </Text>
                    </HStack>
                </GridItem>
            </Grid>
        </Box>
    );
};

export default DashboardD;
