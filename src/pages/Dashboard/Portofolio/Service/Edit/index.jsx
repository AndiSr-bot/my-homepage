/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Progress,
    Stack,
    Textarea,
    useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TextPoppins } from "../../../../../atoms/TextPoppins";
import NavBar from "../../../../../atoms/NavBar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_API } from "../../../../../helpers/constant";
import { AiFillSave } from "react-icons/ai";
const index = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const toast = useToast();

    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [data, setData] = useState(null);

    const [inputName, setInputName] = useState("");
    const [inputDescription, setInputDescription] = useState("");

    const isErrorNama = inputName === "";
    const isErrorDescription = inputDescription === "";
    const navigator = [
        {
            label: "Service /",
            link: "/service",
        },
        {
            label: "Edit",
            link: null,
        },
    ];
    const getData = async () => {
        setLoading(true);
        try {
            await axios
                .get(`${BASE_API}/dashboard/service/${id}`, {
                    headers: {
                        Email: localStorage.user,
                        Authorization: localStorage.authorization,
                    },
                })
                .then((res) => {
                    setData(res.data);
                    setInputName(res.data.name);
                    setInputDescription(res.data.description);
                    setLoading(false);
                });
        } catch (error) {
            setLoading(false);
        }
    };
    const handleSubmit = async () => {
        setSubmitting(true);
        const formData = new FormData();
        formData.append("_method", "PUT");
        formData.append("name", inputName);
        formData.append("description", inputDescription);
        try {
            await axios
                .post(`${BASE_API}/dashboard/service/${id}`, formData, {
                    headers: {
                        Email: localStorage.user,
                        Authorization: localStorage.authorization,
                    },
                })
                .then((res) => {
                    toast({
                        title: "Success",
                        description: res.data.status,
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                        position: "top-right",
                    });
                    navigate(-1);
                    setLoading(false);
                })
                .catch((error) => {
                    toast({
                        title: "Error",
                        description: error.response.data.message,
                        status: "error",
                        isClosable: true,
                        variant: "subtle",
                        duration: 3000,
                        position: "top-right",
                    });
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
                title={"Edit Service"}
                navigator={navigator}
            />
            <Box
                p={{ base: 3, sm: 6, md: "row" }}
                minH={"80%"}
                // boxShadow="0px 10px 20px rgba(35, 70, 193, 0.15)"
                bgColor={"white"}
                rounded={20}
                // width={"600px"}
                bg={"white"}
                mt={"20px"}>
                {loading ? (
                    <Progress
                        my="20px"
                        size="xs"
                        isIndeterminate
                    />
                ) : data ? (
                    <>
                        <FormControl isInvalid={isErrorNama}>
                            <FormLabel mb={3}>
                                <TextPoppins
                                    text={"Nama"}
                                    fontWeight={"700"}
                                    color={"rgba(43, 44, 90, 1)"}
                                    textAlign={"left"}
                                />
                            </FormLabel>
                            <Input
                                mb={isErrorNama ? 0 : 7}
                                value={inputName}
                                onChange={(e) => setInputName(e.target.value)}
                            />
                            {!isErrorNama ? null : (
                                <FormErrorMessage mb={7}>
                                    Nama harus diisi
                                </FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isInvalid={isErrorDescription}>
                            <FormLabel>
                                <TextPoppins
                                    text={"Description"}
                                    fontWeight={"700"}
                                    color={"rgba(43, 44, 90, 1)"}
                                    textAlign={"left"}
                                />
                            </FormLabel>
                            <Textarea
                                mb={isErrorDescription ? 0 : 7}
                                rows={10}
                                value={inputDescription}
                                onChange={(e) =>
                                    setInputDescription(e.target.value)
                                }
                            />
                            {!isErrorDescription ? null : (
                                <FormErrorMessage mb={7}>
                                    Description harus diisi
                                </FormErrorMessage>
                            )}
                        </FormControl>
                        <Stack>
                            {!inputName || !inputDescription ? (
                                <Button
                                    rounded="10px"
                                    bg="#13B58E"
                                    color="white"
                                    _hover={{
                                        bg: "#13B58E",
                                    }}
                                    isDisabled>
                                    <AiFillSave />
                                    Save
                                </Button>
                            ) : submitting ? (
                                <Button
                                    isLoading
                                    loadingText="Loading"
                                    bg={"#13B58E"}
                                    _hover={{
                                        bg: "#13B58E",
                                    }}
                                />
                            ) : (
                                <Button
                                    variant={"confirm"}
                                    type="submit"
                                    value="submit"
                                    onClick={() => {
                                        handleSubmit();
                                    }}>
                                    <AiFillSave />
                                    Save
                                </Button>
                            )}
                        </Stack>
                    </>
                ) : null}
            </Box>
        </Stack>
    );
};

export default index;
