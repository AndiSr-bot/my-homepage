/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Image,
    Input,
    Stack,
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { TextPoppins } from "../../../../../atoms/TextPoppins";
import NavBar from "../../../../../atoms/NavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ImageUpload from "../../../../../atoms/ImageUpload";
import { BASE_API } from "../../../../../helpers/constant";
import { AiFillSave } from "react-icons/ai";
const index = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [submitting, setSubmitting] = useState(false);

    const [inputImage, setInputImage] = useState("");
    const [inputName, setInputName] = useState("");
    const [inputLevel, setInputLevel] = useState("");

    const isErrorImg = inputImage === "";
    const isErrorNama = inputName === "";
    const isErrorLevel = inputLevel === "";
    const navigator = [
        {
            label: "Language /",
            link: "/language",
        },
        {
            label: "Create",
            link: null,
        },
    ];
    const handleSubmit = async () => {
        setSubmitting(true);
        const formData = new FormData();
        formData.append("img", inputImage);
        formData.append("name", inputName);
        formData.append("level", inputLevel);
        await axios
            .post(`${BASE_API}/dashboard/language`, formData, {
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
            });
    };
    return (
        <Stack
            p={"20px"}
            minHeight={"100vh"}
            m={0}>
            <NavBar
                canBack={true}
                title={"Create Language"}
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
                <FormControl isInvalid={isErrorImg}>
                    <FormLabel mb={3}>
                        <TextPoppins
                            text={"Img"}
                            fontWeight={"700"}
                            color={"rgba(43, 44, 90, 1)"}
                            textAlign={"left"}
                        />
                    </FormLabel>
                    <HStack
                        textAlign={"left"}
                        border={!isErrorImg ? null : "2px"}
                        borderColor={!isErrorImg ? null : "#E53E3E"}
                        borderRadius={!isErrorImg ? null : "md"}
                        p={2}>
                        <ImageUpload
                            path={"portofolio/"}
                            inputImage={inputImage}
                            setInputImage={setInputImage}
                        />
                        {inputImage ? (
                            <Image
                                boxSize="50px"
                                objectFit="cover"
                                src={inputImage}
                                alt="lorem"
                            />
                        ) : null}
                    </HStack>
                    {!isErrorImg ? null : (
                        <FormErrorMessage mb={7}>
                            Image harus diisi
                        </FormErrorMessage>
                    )}
                </FormControl>
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
                <FormControl isInvalid={isErrorLevel}>
                    <FormLabel>
                        <TextPoppins
                            text={"Level"}
                            fontWeight={"700"}
                            color={"rgba(43, 44, 90, 1)"}
                            textAlign={"left"}
                        />
                    </FormLabel>

                    <Input
                        mb={isErrorLevel ? 0 : 7}
                        value={inputLevel}
                        onChange={(e) => setInputLevel(e.target.value)}
                    />
                    {!isErrorLevel ? null : (
                        <FormErrorMessage mb={7}>
                            Level harus diisi
                        </FormErrorMessage>
                    )}
                </FormControl>
                <Stack>
                    {!inputName || !inputLevel || !inputImage ? (
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
            </Box>
        </Stack>
    );
};

export default index;
