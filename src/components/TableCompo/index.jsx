/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// Library UI
import { Button, HStack, Stack } from "@chakra-ui/react";
import { Select, Table } from "antd";
import { Option } from "antd/es/mentions";
import { useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
export const TableCompo = (props) => {
    useEffect(() => {
        if (
            props.data.pagination.prev_page == null &&
            props.data.pagination.next_page == null
        ) {
            props.setCurrentPage("1");
        }
    }, []);
    return props.data ? (
        <Stack
            // maxWidth={"1440px"}
            width={{ base: "600px", md: "100%" }}
            marginX={"auto"}
            // my={"20px"}
        >
            <Table
                columns={props.columns}
                dataSource={
                    props.data.data
                        ? props.data.data.map((item, index) => {
                              item.key = index;
                              return item;
                          })
                        : null
                }
                pagination={false}
            />

            {/* pagination section */}
            {props.data.pagination ? (
                <HStack justifyContent={"flex-end"} my={"20px"}>
                    {props.data.pagination.current_page == 1 ? (
                        <Button
                            size={"sm"}
                            _hover={{ bg: "white" }}
                            variant={"outline"}
                            cursor={"default"}>
                            <IoIosArrowBack />
                        </Button>
                    ) : (
                        <Button
                            size={"sm"}
                            variant={"primary"}
                            onClick={() =>
                                props.setCurrentPage(
                                    props.data.pagination.prev_page
                                )
                            }>
                            <IoIosArrowBack />
                        </Button>
                    )}
                    {[...Array(props.data.pagination.total_page).keys()].map(
                        (page) => (
                            <>
                                {parseInt(props.data.pagination.current_page) ==
                                    parseInt(
                                        props.data.pagination.total_page
                                    ) &&
                                page + 1 ==
                                    parseInt(props.data.pagination.total_page) -
                                        2 ? (
                                    <Button
                                        size={"sm"}
                                        variant={
                                            props.data.pagination
                                                .current_page ==
                                            page + 1
                                                ? "outline"
                                                : "primary"
                                        }
                                        _hover={
                                            props.data.pagination
                                                .current_page ===
                                            page + 1
                                                ? {}
                                                : { bg: "#4839AB" }
                                        }
                                        cursor={
                                            props.data.pagination
                                                .current_page ==
                                            page + 1
                                                ? "default"
                                                : "pointer"
                                        }
                                        onClick={() =>
                                            props.setCurrentPage(page + 1)
                                        }>
                                        {page + 1}
                                    </Button>
                                ) : parseInt(
                                      props.data.pagination.current_page
                                  ) ==
                                      parseInt(
                                          props.data.pagination.total_page
                                      ) &&
                                  page + 1 ==
                                      parseInt(
                                          props.data.pagination.total_page
                                      ) -
                                          3 ? (
                                    <Button
                                        size={"sm"}
                                        variant={"outline"}
                                        _hover={{ bg: "white" }}
                                        cursor={"default"}>
                                        ...
                                    </Button>
                                ) : parseInt(
                                      props.data.pagination.current_page
                                  ) == 1 && page + 1 == 3 ? (
                                    <Button
                                        size={"sm"}
                                        variant={
                                            props.data.pagination
                                                .current_page ==
                                            page + 1
                                                ? "outline"
                                                : "primary"
                                        }
                                        _hover={
                                            props.data.pagination
                                                .current_page ===
                                            page + 1
                                                ? {}
                                                : { bg: "#4839AB" }
                                        }
                                        cursor={
                                            props.data.pagination
                                                .current_page ==
                                            page + 1
                                                ? "default"
                                                : "pointer"
                                        }
                                        onClick={() =>
                                            props.setCurrentPage(page + 1)
                                        }>
                                        {page + 1}
                                    </Button>
                                ) : parseInt(
                                      props.data.pagination.current_page
                                  ) == 1 && page + 1 == 4 ? (
                                    <Button
                                        size={"sm"}
                                        variant={"outline"}
                                        _hover={{ bg: "white" }}
                                        cursor={"default"}>
                                        ...
                                    </Button>
                                ) : parseInt(
                                      props.data.pagination.current_page
                                  ) -
                                      2 ==
                                      page + 1 ||
                                  parseInt(props.data.pagination.current_page) +
                                      2 ==
                                      page + 1 ? (
                                    <Button
                                        size={"sm"}
                                        variant={"outline"}
                                        _hover={{ bg: "white" }}
                                        cursor={"default"}>
                                        ...
                                    </Button>
                                ) : page + 1 <
                                      parseInt(
                                          props.data.pagination.current_page
                                      ) -
                                          2 ||
                                  page + 1 >
                                      parseInt(
                                          props.data.pagination.current_page
                                      ) +
                                          2 ? null : page + 1 ==
                                  parseInt(
                                      props.data.pagination.current_page
                                  ) ? (
                                    <Button
                                        size={"sm"}
                                        variant={"confirm"}
                                        _hover={{ bg: "#13B58E" }}
                                        cursor={"default"}>
                                        {page + 1}
                                    </Button>
                                ) : (
                                    <Button
                                        size={"sm"}
                                        variant={
                                            props.data.pagination
                                                .current_page ==
                                            page + 1
                                                ? "outline"
                                                : "primary"
                                        }
                                        _hover={
                                            props.data.pagination
                                                .current_page ===
                                            page + 1
                                                ? {}
                                                : { bg: "#4839AB" }
                                        }
                                        cursor={
                                            props.data.pagination
                                                .current_page ==
                                            page + 1
                                                ? "default"
                                                : "pointer"
                                        }
                                        onClick={() =>
                                            props.setCurrentPage(page + 1)
                                        }>
                                        {page + 1}
                                    </Button>
                                )}
                            </>
                        )
                    )}
                    {props.data.pagination.current_page ==
                    props.data.pagination.total_page ? (
                        <Button
                            size={"sm"}
                            variant={"outline"}
                            _hover={{ bg: "white" }}
                            cursor={"default"}>
                            <IoIosArrowForward />
                        </Button>
                    ) : (
                        <Button
                            size={"sm"}
                            variant={"primary"}
                            onClick={() =>
                                props.setCurrentPage(
                                    props.data.pagination.next_page
                                )
                            }>
                            <IoIosArrowForward />
                        </Button>
                    )}
                    <Select
                        value={props.currentLimit}
                        onChange={(value) => {
                            props.setCurrentlimit(value);
                            props.setCurrentPage(1);
                        }}>
                        <Option value="5">5</Option>
                        <Option value="10">10</Option>
                        <Option value="50">50</Option>
                        <Option value="100">100</Option>
                    </Select>
                </HStack>
            ) : null}
        </Stack>
    ) : null;
};
