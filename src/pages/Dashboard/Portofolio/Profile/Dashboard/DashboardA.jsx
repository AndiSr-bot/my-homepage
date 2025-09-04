/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { Box, HStack, Image, Stack, Text } from "@chakra-ui/react";
import { authorization } from "../../../../../helpers/cryptoJS";

const DashboardA = () => {
    return (
        <Box
            p={{ base: 3, sm: 6, md: "row" }}
            ml={"20px"}
            mb={"20px"}
            mr={{
                xl: 0,
                lg: "20px",
                base: "20px",
            }}
            // boxShadow="0px 10px 20px rgba(35, 70, 193, 0.15)"
            bgColor={"white"}
            rounded={20}>
            <HStack
                justifyContent="center"
                marginBottom={"20px"}
                flexWrap={"wrap"}>
                <Image
                    borderRadius="full"
                    boxSize="150px"
                    src={authorization()?.photo}
                    alt={authorization()?.name}
                />
            </HStack>
            <Stack
                justifyContent="center"
                marginBottom={"20px"}
                flexWrap={"wrap"}>
                <Text
                    fontFamily="Poppins, sans-serif"
                    fontWeight={"bold"}>
                    {authorization()?.name}
                </Text>
                <Text fontFamily="Poppins, sans-serif">
                    Full Stack Developer
                </Text>
                <Text fontFamily="Poppins, sans-serif">
                    {authorization()?.district}, {authorization()?.regency},{" "}
                    {authorization()?.province}, {authorization()?.country}
                </Text>
            </Stack>
        </Box>
    );
};

export default DashboardA;
