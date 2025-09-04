/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Button, HStack, Progress } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { TextPoppins } from "../../../../../atoms/TextPoppins";
import { useEffect, useState } from "react";
import { TableCompo } from "../../../../../components/TableCompo";
import { paginationArray } from "../../../../../helpers/paginate";
import BadgeText from "../../../../../atoms/BadgeText";
import axios from "axios";
import { BASE_API } from "../../../../../helpers/constant";
const index = () => {
    const [height, setHeight] = useState(window.innerHeight - 40);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentlimit] = useState(10);
    const [data, setData] = useState(
        paginationArray({
            data: [],
            count: 0,
            page: 1,
            limit: 10,
        })
    );
    const columns = [
        {
            title: "No",
            key: "no",
            align: "center",
            width: "5%",
            render: (data) => (
                <TextPoppins
                    text={data.no}
                    fontSize={""}
                    fontWeight={""}
                    color={undefined}
                />
            ),
        },
        {
            title: "Email",
            key: "email",
            width: "25%",
            render: (data) => (
                <TextPoppins
                    text={data.email}
                    fontSize={""}
                    fontWeight={""}
                    color={undefined}
                />
            ),
        },
        {
            title: "Subject",
            key: "subject",
            width: "40%",
            render: (data) => (
                <TextPoppins
                    text={data.subject}
                    fontSize={""}
                    fontWeight={""}
                    color={undefined}
                />
            ),
        },
        {
            title: "Status",
            key: "Status",
            align: "center",
            width: "15%",
            render: (data) =>
                data.isRead ? (
                    <BadgeText
                        color={"green"}
                        textColor={"white"}
                        text={"read"}
                    />
                ) : (
                    <BadgeText
                        color={"red"}
                        textColor={"white"}
                        text={"unread"}
                    />
                ),
        },
        {
            title: "Action",
            align: "center",
            key: "prefix",
            width: "15%",
            render: (data) => (
                <HStack justifyContent={"center"}>
                    <Link to={`detail/${data?.id}`}>
                        <Button
                            size={"xs"}
                            variant={"primary"}
                            onClick={() => {}}>
                            Detail
                        </Button>
                    </Link>
                </HStack>
            ),
        },
    ];
    const updateHeight = () => {
        setHeight(window.innerHeight - 40);
    };
    const getData = async () => {
        setLoading(true);
        try {
            await axios
                .get(`${BASE_API}/dashboard/message`, {
                    headers: {
                        Email: localStorage.user,
                        Authorization: localStorage.authorization,
                    },
                })
                .then((res) => {
                    let outputAxios = res.data.message;
                    for (let i = 0; i < outputAxios.length; i++) {
                        outputAxios[i] = { ...outputAxios[i], no: i + 1 };
                    }
                    setData(
                        paginationArray({
                            data: res.data.message,
                            count: res.data.message.length,
                            page: currentPage,
                            limit: currentLimit,
                        })
                    );

                    setLoading(false);
                });
        } catch (error) {
            setLoading(false);
        }
    };
    useEffect(() => {
        window.addEventListener("resize", updateHeight);
        return () => {
            window.removeEventListener("resize", updateHeight);
        };
    }, []);
    useEffect(() => {
        getData();
    }, [currentPage, currentLimit]);
    return (
        <Box
            p={{ base: 3, sm: 6, md: "row" }}
            m={"20px"}
            // minH={"80%"}
            // boxShadow="0px 10px 20px rgba(35, 70, 193, 0.15)"
            bgColor={"white"}
            rounded={20}
            minHeight={`${height}px`}>
            <HStack
                justifyContent="space-between"
                marginBottom={"20px"}
                flexWrap={"wrap"}>
                <TextPoppins
                    text={"Message List"}
                    fontSize={"20px"}
                    fontWeight={"700"}
                    color={"#3F51B5"}
                />
            </HStack>
            {loading ? (
                <Progress
                    my="20px"
                    size="xs"
                    isIndeterminate
                />
            ) : data ? (
                <TableCompo
                    data={data}
                    columns={columns}
                    currentLimit={currentLimit}
                    setCurrentPage={setCurrentPage}
                    setCurrentlimit={setCurrentlimit}
                />
            ) : null}
        </Box>
    );
};

export default index;
