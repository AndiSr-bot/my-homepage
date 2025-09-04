/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { Box, HStack, Progress, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TextPoppins } from "../../../../../atoms/TextPoppins";
import NavBar from "../../../../../atoms/NavBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_API } from "../../../../../helpers/constant";

const index = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const navigator = [
        {
            label: "Message /",
            link: "/message",
        },
        {
            label: "Detail",
            link: null,
        },
    ];
    const getData = async () => {
        setLoading(true);
        try {
            await axios
                .get(`${BASE_API}/dashboard/message/${id}`, {
                    headers: {
                        Email: localStorage.user,
                        Authorization: localStorage.authorization,
                    },
                })
                .then((res) => {
                    setData(res.data);
                    setLoading(false);
                });
        } catch (error) {
            setLoading(false);
        }
    };
    useEffect(() => {
        getData();
    }, []);
    return (
        <Stack
            p={"20px"}
            minHeight={"100vh"}
            m={0}>
            <NavBar
                canBack={true}
                title={"Detail Message"}
                navigator={navigator}
            />
            <Box
                p={{ base: 3, sm: 6, md: "row" }}
                minH={"80%"}
                // boxShadow="0px 10px 20px rgba(35, 70, 193, 0.15)"
                bgColor={"white"}
                rounded={20}
                width={"600px"}
                bg={"white"}
                mt={"20px"}>
                {loading ? (
                    <Progress
                        my="20px"
                        size="xs"
                        isIndeterminate
                    />
                ) : data ? (
                    <Stack>
                        <HStack
                            justifyContent="space-between"
                            flexWrap={"wrap"}
                            gap={"20px"}
                            mt={"20px"}>
                            <TextPoppins
                                text={"Nama"}
                                fontWeight={"700"}
                                color={"rgba(43, 44, 90, 1)"}
                            />
                            <TextPoppins
                                color={"rgba(43, 44, 90, 1)"}
                                text={data.name}
                            />
                        </HStack>
                        <HStack
                            justifyContent="space-between"
                            flexWrap={"wrap"}
                            gap={"20px"}
                            mt={"20px"}>
                            <TextPoppins
                                text={"Email"}
                                fontWeight={"700"}
                                color={"rgba(43, 44, 90, 1)"}
                            />
                            <TextPoppins
                                color={"rgba(43, 44, 90, 1)"}
                                text={data.email}
                            />
                        </HStack>
                        <HStack
                            justifyContent="space-between"
                            flexWrap={"wrap"}
                            gap={"20px"}
                            mt={"20px"}>
                            <TextPoppins
                                text={"Subject"}
                                fontWeight={"700"}
                                color={"rgba(43, 44, 90, 1)"}
                            />
                            <TextPoppins
                                color={"rgba(43, 44, 90, 1)"}
                                text={data.subject}
                            />
                        </HStack>
                        <HStack
                            justifyContent="space-between"
                            flexWrap={"wrap"}
                            gap={"20px"}
                            mt={"20px"}>
                            <TextPoppins
                                text={"Message"}
                                fontWeight={"700"}
                                color={"rgba(43, 44, 90, 1)"}
                            />
                            <TextPoppins
                                color={"rgba(43, 44, 90, 1)"}
                                text={data.message}
                                textAlign="justify"
                            />
                        </HStack>
                    </Stack>
                ) : null}
            </Box>
        </Stack>
    );
};

export default index;
