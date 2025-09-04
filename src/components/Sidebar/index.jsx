/* eslint-disable react-hooks/rules-of-hooks */
// Library UI
import {
    Box,
    Flex,
    VStack,
    IconButton,
    Heading,
    Stack,
    useDisclosure,
    Image,
    HStack,
} from "@chakra-ui/react";
import { MdOutlineMiscellaneousServices, MdSettings } from "react-icons/md";
import { AiFillDashboard, AiFillHome, AiFillMessage } from "react-icons/ai";

import { X, AlignCenter } from "react-feather";
// import { User } from "../index";
import { NavItem } from "./Fragments/NavItem";
import { TextPoppins } from "../../atoms/TextPoppins";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_API } from "../../helpers/constant";
import { FaCode, FaTools } from "react-icons/fa";

const index = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const location = useLocation();
    const [badgePortofolioMessage, setBadgePortofolioMessage] = useState(false);
    const cekBadge = async () => {
        await axios
            .get(`${BASE_API}/dashboard`, {
                headers: {
                    Email: localStorage.user,
                    Authorization: localStorage.authorization,
                },
            })
            .then((res) => {
                if (res.data.messageCount > 0) {
                    setBadgePortofolioMessage(true);
                } else {
                    setBadgePortofolioMessage(false);
                }
            });
    };

    useEffect(() => {
        cekBadge();
    }, [location.pathname]);
    return (
        <Box
            w={{ base: "100%", lg: "20rem" }}
            h={{ base: "auto", lg: "full" }}
            overflow={"scroll"}
            bg={"white"}
            px={{ base: 4, md: 0 }}
            py={2}
            zIndex={10}
            // boxShadow={"2px 0px 20px 2px rgba(0, 0, 0, 0.1)"}
            position={{ md: "relative", lg: "fixed" }}>
            <Flex
                h={16}
                alignItems={"center"}
                flexDir={"column"}>
                <Flex
                    w={"full"}
                    my={"auto"}
                    mt={{ base: 4, md: 4 }}
                    position={"relative"}
                    justifyItems={"center"}
                    alignItems={"center"}
                    justifyContent={{ base: "flex-end", md: "space-between" }}
                    // backgroundColor={"lightblue"}
                >
                    {/* <User /> */}

                    <HStack
                        mx={"auto"}
                        display={{ base: "flex", lg: "none" }}>
                        <Image
                            src={
                                "https://firebasestorage.googleapis.com/v0/b/my-homepage-157fb.appspot.com/o/home%2Fandisr.png?alt=media&token=8b2ae32e-77b8-4317-87dc-f0f22443718c"
                            }
                            height={"35px"}
                            objectFit={"contain"}
                        />
                        <Heading
                            color={"#3F51B5"}
                            fontSize={{ base: "xl", md: "2xl" }}
                            fontFamily={"Poppins"}>
                            Web Admin
                        </Heading>
                    </HStack>
                    <HStack
                        pl={5}
                        w={"full"}
                        mx={"auto"}
                        display={{ base: "none", lg: "flex" }}>
                        <Image
                            src={
                                "https://firebasestorage.googleapis.com/v0/b/my-homepage-157fb.appspot.com/o/home%2Fandisr.png?alt=media&token=8b2ae32e-77b8-4317-87dc-f0f22443718c"
                            }
                            height={"35px"}
                            objectFit={"contain"}
                        />
                        <Heading
                            color={"#3F51B5"}
                            fontSize={{ base: "xl", md: "2xl" }}
                            fontFamily={"Poppins"}>
                            Web Admin
                        </Heading>
                    </HStack>

                    <IconButton
                        size={"md"}
                        p={2}
                        my="auto"
                        icon={isOpen ? <X /> : <AlignCenter />}
                        aria-label={"Open Menu"}
                        display={{ lg: "none" }}
                        onClick={isOpen ? onClose : onOpen}
                        right={{ base: 6, md: 10 }}
                        position={"absolute"}
                    />
                </Flex>
                <VStack
                    mt={{ base: 4, md: 4 }}
                    alignItems={"center"}
                    w={"full"}
                    display={{ base: "none", lg: "flex" }}>
                    <Stack w={"full"}>
                        <Box
                            w={"full"}
                            mt={3}>
                            <NavItem
                                label={"Dashboard"}
                                link={"/dashboard"}
                                icon={AiFillDashboard}
                                badge={false}
                                isOpen={undefined}
                                onClose={undefined}
                                onOpen={undefined}
                            />
                            <NavItem
                                label={"Home"}
                                link={"/"}
                                icon={AiFillHome}
                                badge={false}
                                isOpen={undefined}
                                onClose={undefined}
                                onOpen={undefined}
                            />
                            <Stack
                                alignItems={"start"}
                                pl={6}
                                my={4}>
                                <TextPoppins
                                    text="Manajemen Portofolio"
                                    fontWeight={"700"}
                                    color={"#3F51B5"}
                                />
                            </Stack>
                            <NavItem
                                label={"Message"}
                                link={"/message"}
                                icon={AiFillMessage}
                                badge={badgePortofolioMessage}
                                isOpen={undefined}
                                onClose={undefined}
                                onOpen={undefined}
                            />
                            <NavItem
                                label={"Service"}
                                link={"/service"}
                                icon={MdOutlineMiscellaneousServices}
                                badge={false}
                                isOpen={undefined}
                                onClose={undefined}
                                onOpen={undefined}
                            />
                            <NavItem
                                label={"Tool"}
                                link={"/tool"}
                                icon={FaTools}
                                badge={false}
                                isOpen={undefined}
                                onClose={undefined}
                                onOpen={undefined}
                            />
                            <NavItem
                                label={"Language"}
                                link={"/language"}
                                icon={FaCode}
                                badge={false}
                                isOpen={undefined}
                                onClose={undefined}
                                onOpen={undefined}
                            />
                            <Stack
                                alignItems={"start"}
                                pl={6}
                                my={4}>
                                <TextPoppins
                                    text="Other"
                                    fontWeight={"700"}
                                    color={"#3F51B5"}
                                />
                            </Stack>
                            <NavItem
                                label={"Pengaturan"}
                                link={"/pengaturan"}
                                icon={MdSettings}
                                badge={false}
                                isOpen={undefined}
                                onClose={undefined}
                                onOpen={undefined}
                            />
                        </Box>
                    </Stack>
                </VStack>
            </Flex>

            <Box
                borderBottom="1px"
                ml={"8px"}
                borderColor="gray.200"
                my={2}
            />
            {isOpen ? (
                <Box
                    pb={4}
                    display={{ lg: "none" }}>
                    <Stack
                        as={"nav"}
                        spacing={[4]}
                        onClick={() => {
                            onClose();
                        }}>
                        <NavItem
                            label={"Dashboard"}
                            link={"/dashboard"}
                            icon={AiFillDashboard}
                            badge={false}
                            isOpen={undefined}
                            onClose={undefined}
                            onOpen={undefined}
                        />
                        <NavItem
                            label={"Home"}
                            link={"/"}
                            icon={AiFillHome}
                            badge={false}
                            isOpen={undefined}
                            onClose={undefined}
                            onOpen={undefined}
                        />
                        <Stack
                            alignItems={"start"}
                            pl={6}
                            my={4}>
                            <TextPoppins
                                text="Manajemen Portofolio"
                                fontWeight={"700"}
                                color={"#3F51B5"}
                            />
                        </Stack>
                        <NavItem
                            label={"Message"}
                            link={"/message"}
                            icon={AiFillMessage}
                            badge={badgePortofolioMessage}
                            isOpen={undefined}
                            onClose={undefined}
                            onOpen={undefined}
                        />
                        <NavItem
                            label={"Service"}
                            link={"/service"}
                            icon={MdOutlineMiscellaneousServices}
                            badge={false}
                            isOpen={undefined}
                            onClose={undefined}
                            onOpen={undefined}
                        />
                        <NavItem
                            label={"Tool"}
                            link={"/tool"}
                            icon={FaTools}
                            badge={false}
                            isOpen={undefined}
                            onClose={undefined}
                            onOpen={undefined}
                        />
                        <NavItem
                            label={"Language"}
                            link={"/language"}
                            icon={FaCode}
                            badge={false}
                            isOpen={undefined}
                            onClose={undefined}
                            onOpen={undefined}
                        />
                        <Stack
                            alignItems={"start"}
                            pl={6}
                            my={4}>
                            <TextPoppins
                                text="Other"
                                fontWeight={"700"}
                                color={"#3F51B5"}
                            />
                        </Stack>
                        <NavItem
                            label={"Pengaturan"}
                            link={"/pengaturan"}
                            icon={MdSettings}
                            badge={false}
                            isOpen={undefined}
                            onClose={undefined}
                            onOpen={undefined}
                        />
                    </Stack>
                </Box>
            ) : null}
        </Box>
    );
};

export default index;
