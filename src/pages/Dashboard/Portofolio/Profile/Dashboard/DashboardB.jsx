/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { authorization, encrypt } from "../../../../../helpers/cryptoJS";
import {
    AiFillCloseSquare,
    AiFillFacebook,
    AiFillInstagram,
    AiFillLinkedin,
    AiFillSave,
    AiFillTwitterSquare,
    AiFillYoutube,
    AiOutlineEdit,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BASE_API } from "../../../../../helpers/constant";
const DashboardB = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [inputId, setInputId] = useState("");
    const [inputName, setInputName] = useState("");
    const [inputLink, setInputLink] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const isErrorName = inputName === "";
    const isErrorLink = inputLink === "";

    const getData = async (id) => {
        await axios
            .get(`${BASE_API}/dashboard/social/${id}`, {
                headers: {
                    Email: localStorage.user,
                    Authorization: localStorage.authorization,
                },
            })
            .then((res) => {
                setInputId(res.data.id);
                setInputName(res.data.name);
                setInputLink(res.data.link);
            });
    };
    const handleEdit = async () => {
        setSubmitting(true);
        const formData = new FormData();
        formData.append("_method", "PUT");
        formData.append("name", inputName);
        formData.append("link", inputLink);
        formData.append("user_id", authorization().id);
        await axios
            .post(`${BASE_API}/dashboard/social/${inputId}`, formData, {
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
            <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Social Media</ModalHeader>
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
                                    handleEdit();
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
            <HStack
                justifyContent="space-between"
                marginBottom={"20px"}
                flexWrap={"wrap"}>
                <Text
                    fontFamily="Poppins, sans-serif"
                    fontWeight={"500"}>
                    Social Media
                </Text>
            </HStack>
            {authorization()?.social.map((item) => {
                return (
                    <>
                        <Box
                            borderBottom="1px"
                            borderColor="gray.200"
                            my={2}
                        />
                        <HStack
                            justifyContent="space-between"
                            my={3}
                            flexWrap={"wrap"}>
                            {item.name == "instagram" ? (
                                <AiFillInstagram />
                            ) : item.name == "twitter" ? (
                                <AiFillTwitterSquare />
                            ) : item.name == "facebook" ? (
                                <AiFillFacebook />
                            ) : item.name == "youtube" ? (
                                <AiFillYoutube />
                            ) : item.name == "linkedin" ? (
                                <AiFillLinkedin />
                            ) : (
                                <AiFillCloseSquare />
                            )}
                            <Link
                                to={item.link}
                                target="_blank">
                                <Text fontFamily="Poppins, sans-serif">
                                    {item.name}
                                </Text>
                            </Link>
                            <Box
                                onClick={() => {
                                    onOpen();
                                    getData(item.id);
                                }}
                                cursor={"pointer"}>
                                <AiOutlineEdit />
                            </Box>
                        </HStack>
                    </>
                );
            })}
        </Box>
    );
};

export default DashboardB;
