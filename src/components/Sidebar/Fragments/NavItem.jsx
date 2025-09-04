/* eslint-disable react/prop-types */
// import React from "react";

// Library UI
import { Icon, Button, Box, Tooltip, Badge, Flex } from "@chakra-ui/react";

// Import React-Router-Dom
import { NavLink, useLocation } from "react-router-dom";
import { TextPoppins } from "../../../atoms/TextPoppins";

export const NavItem = (props) => {
    // State & Varibales
    const location = useLocation();
    const active = location.pathname == props.link;
    return (
        <NavLink to={props.link}>
            <Tooltip
                hasArrow
                label={props.label}
                bg={"facebook.600"}
                placement="right"
                display={"none"}>
                <Button
                    transition="200ms"
                    my={1}
                    px={[2, 3, 6]}
                    fontWeight={500}
                    justifyContent={"flex-start"}
                    alignItems="center"
                    w={"100%"}
                    _hover={{ color: "facebook.600", bg: "facebook.100" }}
                    bg={active ? "facebook.100" : "white"}
                    color={active ? "facebook.600" : "gray.500"}
                    borderRadius="0"
                    position={"relative"}
                    //   onClick={isOpen ? onClose : onOpen}
                >
                    <Icon
                        as={props.icon}
                        w={{ base: 4, lg: 3.5 }}
                        h={{ base: 4, lg: 3.5 }}
                        my={"auto"}
                        mr={3}
                    />
                    <>
                        <Flex
                            justifyContent={"space-between"}
                            width={"100%"}>
                            <TextPoppins
                                text={props.label}
                                fontSize={"sm"}
                                fontWeight={"normal"}
                                color={active ? "facebook.600" : "null"}
                            />
                            {props.badge ? (
                                <Badge
                                    rounded={"full"}
                                    h={"8px"}
                                    w={"8px"}
                                    my={"auto"}
                                    bgColor={"red"}
                                    color={"red"}
                                    right={2}
                                />
                            ) : null}
                        </Flex>
                        <Box
                            display={active ? "block" : "none"}
                            w={2}
                            h={"full"}
                            borderRadius={"10px 0 0 10px"}
                            position={"absolute"}
                            right={0}
                            bg={"facebook.600"}
                        />
                    </>
                </Button>
            </Tooltip>
        </NavLink>
    );
};
