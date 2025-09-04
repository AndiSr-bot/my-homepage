/* eslint-disable react-hooks/rules-of-hooks */
import {
    Box,
    Button,
    HStack,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Stack,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { FaUser } from "react-icons/fa6";
import { FaPowerOff } from "react-icons/fa";
import { TextPoppins } from "../TextPoppins";
import { useState } from "react";
import ModalConfirm from "../ModalConfirm";
import { authorization } from "../../helpers/cryptoJS";
const index = (props) => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const handleLogoutClick = () => {
        localStorage.clear();
        navigate("/login");
    };
    return (
        <Box
            px={6}
            py={3}
            m={props.margin}
            // boxShadow="0px 10px 20px rgba(35, 70, 193, 0.15)"
            bgColor={"white"}
            rounded={20}
            justifyItems={"flex-start"}>
            <ModalConfirm
                openModal={openModal}
                setOpenModal={setOpenModal}
                handleLogoutClick={handleLogoutClick}
            />
            <HStack>
                <Stack
                    position={"relative"}
                    w={"full"}>
                    <HStack justifyContent="space-between">
                        <HStack
                            justifyContent="flex-start"
                            flexWrap={"wrap"}
                            mb={1}>
                            {props.navigator.map((list, index) => {
                                return list.link ? (
                                    <Link
                                        key={index}
                                        to={list.link}>
                                        <TextPoppins
                                            text={list.label}
                                            fontSize={"12px"}
                                            fontWeight={"700"}
                                            color={"#5867b8"}
                                        />
                                    </Link>
                                ) : (
                                    <TextPoppins
                                        text={list.label}
                                        fontSize={"12px"}
                                        fontWeight={"700"}
                                        color={"grey"}
                                    />
                                );
                            })}
                        </HStack>
                    </HStack>
                    <HStack
                        justifyContent="start"
                        flexWrap={"wrap"}>
                        {props.canBack ? (
                            <Stack
                                w={"25px"}
                                cursor={"pointer"}
                                color={"#3F51B5"}
                                fontSize={"20px"}
                                onClick={() => {
                                    navigate(-1);
                                }}>
                                <BiArrowBack />
                            </Stack>
                        ) : null}
                        <TextPoppins
                            text={props.title}
                            fontSize={"15px"}
                            fontWeight={"700"}
                            color={"#3F51B5"}
                        />
                    </HStack>
                </Stack>
                <Stack
                    position={"relative"}
                    w={"full"}>
                    <HStack justifyContent="end">
                        <Menu>
                            <MenuButton
                                bg={"white"}
                                color={"grey"}
                                as={Button}
                                _hover={{ bg: "white" }}
                                rightIcon={<FaUser />}>
                                <TextPoppins
                                    text={authorization()?.name}
                                    fontSize={"15px"}
                                    fontWeight={"700"}
                                    color={"grey"}
                                />
                            </MenuButton>
                            <MenuList>
                                <Link to={"/profile"}>
                                    <MenuItem icon={<FaUser />}>
                                        Profile
                                    </MenuItem>
                                </Link>
                                <Box
                                    borderBottom="1px"
                                    borderColor="gray.200"
                                    my={2}
                                />
                                <MenuItem
                                    onClick={() => {
                                        setOpenModal(true);
                                    }}
                                    color={"red"}
                                    icon={<FaPowerOff />}>
                                    Logout
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </HStack>
                </Stack>
            </HStack>
        </Box>
    );
};

export default index;
