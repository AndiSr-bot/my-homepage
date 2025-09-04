/* eslint-disable react-hooks/rules-of-hooks */
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Grid,
    GridItem,
    HStack,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from "@chakra-ui/react";
import DashboardA from "./Dashboard/DashboardA";
import DashboardB from "./Dashboard/DashboardB";
import DashboardC from "./Dashboard/DashboardC";
import DashboardD from "./Dashboard/DashboardD";
import NavBar from "../../../../atoms/NavBar";
import { AiFillPlusCircle, AiFillSave, AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BASE_API } from "../../../../helpers/constant";
import { authorization, encrypt } from "../../../../helpers/cryptoJS";

const index = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [inputName, setInputName] = useState("");
    const [inputLink, setInputLink] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const isErrorName = inputName === "";
    const isErrorLink = inputLink === "";
    const navigator = [
        {
            label: "Profile /",
            link: null,
        },
    ];
    const handleAdd = async () => {
        setSubmitting(true);
        const formData = new FormData();
        formData.append("name", inputName);
        formData.append("link", inputLink);
        formData.append("user_id", authorization().id);
        await axios
            .post(`${BASE_API}/dashboard/social`, formData, {
                headers: {
                    Email: localStorage.user,
                    Authorization: localStorage.authorization,
                },
            })
            .then((res) => {
                const userToEncrypt = JSON.stringify({
                    ...res.data.user,
                    session_expired: authorization().session_expired,
                });
                const encryptJson = encrypt(userToEncrypt);
                localStorage.setItem("authorization", encryptJson);
                setSubmitting(false);
                onClose();
            });
    };
    return (
        <Box
            maxW="100%"
            p={0}
            gridTemplateColumns="auto">
            <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Social Media</ModalHeader>
                    <ModalBody pb={6}>
                        <FormControl isInvalid={isErrorName}>
                            <FormLabel>Name</FormLabel>
                            <Input
                                mb={isErrorName ? 0 : 2}
                                value={inputName}
                                onChange={(e) => setInputName(e.target.value)}
                                placeholder="Name"
                            />
                            {!isErrorName ? null : (
                                <FormErrorMessage mb={2}>
                                    Nama harus diisi
                                </FormErrorMessage>
                            )}
                        </FormControl>

                        <FormControl
                            mt={4}
                            isInvalid={isErrorLink}>
                            <FormLabel>Link</FormLabel>
                            <Input
                                mb={isErrorLink ? 0 : 2}
                                value={inputLink}
                                onChange={(e) => setInputLink(e.target.value)}
                                placeholder="Link"
                            />
                            {!isErrorLink ? null : (
                                <FormErrorMessage mb={2}>
                                    Link harus diisi
                                </FormErrorMessage>
                            )}
                        </FormControl>
                    </ModalBody>

                    <ModalFooter gap={3}>
                        {!inputName || !inputLink ? (
                            <Button
                                rounded="10px"
                                bg="#3F51B5"
                                color="white"
                                _hover={{
                                    bg: "#3F51B5",
                                }}
                                isDisabled>
                                <AiFillSave />
                                Save
                            </Button>
                        ) : submitting ? (
                            <Button
                                isLoading
                                loadingText="Loading"
                                bg={"#3F51B5"}
                                _hover={{
                                    bg: "#3F51B5",
                                }}
                            />
                        ) : (
                            <Button
                                gap={1}
                                variant={"primary"}
                                type="submit"
                                value="submit"
                                onClick={() => {
                                    handleAdd();
                                }}>
                                <AiFillSave />
                                Save
                            </Button>
                        )}
                        <Button
                            onClick={() => {
                                onClose();
                                setInputName("");
                                setInputLink("");
                            }}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Grid minH={"100vh"}>
                <GridItem>
                    <NavBar
                        margin={"20px"}
                        title={"Profile"}
                        navigator={navigator}
                    />
                    <HStack
                        justifyContent={"flex-end"}
                        pr={"20px"}
                        pb={"20px"}>
                        <Link to={"edit"}>
                            <Button
                                size={"sm"}
                                variant={"primary"}
                                gap={2}>
                                <AiOutlineEdit />
                                Edit Profile
                            </Button>
                        </Link>
                        <Button
                            size={"sm"}
                            variant={"primary"}
                            gap={2}
                            onClick={onOpen}>
                            <AiFillPlusCircle />
                            Add Social Media
                        </Button>
                    </HStack>
                    <Grid
                        templateColumns={{
                            xl: "repeat(3, 1fr)",
                            lg: "repeat(1, 1fr)",
                        }}>
                        <GridItem>
                            <DashboardA />
                            <DashboardB />
                        </GridItem>
                        <GridItem
                            colSpan={{
                                xl: 2,
                                lg: null,
                            }}>
                            <DashboardC />
                            <DashboardD />
                        </GridItem>
                    </Grid>
                </GridItem>
            </Grid>
        </Box>
    );
};

export default index;
