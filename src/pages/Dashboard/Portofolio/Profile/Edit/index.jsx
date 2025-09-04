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
    InputGroup,
    InputLeftAddon,
    Progress,
    Stack,
    Textarea,
    useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TextPoppins } from "../../../../../atoms/TextPoppins";
import NavBar from "../../../../../atoms/NavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_API } from "../../../../../helpers/constant";
import { AiFillSave } from "react-icons/ai";
import { authorization, encrypt } from "../../../../../helpers/cryptoJS";
import ImageUpload from "../../../../../atoms/ImageUpload";
const index = () => {
    const navigate = useNavigate();
    const toast = useToast();

    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [data, setData] = useState(null);

    const [inputImage, setInputImage] = useState("");
    const [inputName, setInputName] = useState("");
    const [inputPhone, setInputPhone] = useState("");
    const [isInvalidPhone, setIsInvalidPhone] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputTagline, setInputTagline] = useState("");
    const [inputDescription, setInputDescription] = useState("");
    const [inputDistrict, setInputDistrict] = useState("");
    const [inputRegency, setInputRegency] = useState("");
    const [inputProvince, setInputProvince] = useState("");
    const [inputCountry, setInputCountry] = useState("");

    const isErrorNama = inputName === "";
    const isErrorEmail = inputEmail === "";
    const isErrorTagline = inputTagline === "";
    const isErrorDescription = inputDescription === "";
    const isErrorDistrict = inputDistrict === "";
    const isErrorRegency = inputRegency === "";
    const isErrorProvince = inputProvince === "";
    const isErrorCountry = inputCountry === "";
    const isErrorImg = inputImage === "";
    const navigator = [
        {
            label: "Profile /",
            link: "/profile",
        },
        {
            label: "Edit",
            link: null,
        },
    ];
    const handleChange = (e) => {
        const inputValue = e.target.value.replace(/\D/g, "");
        const isValidPhone = /^8[1-9][0-9]{8,10}$/.test(inputValue);
        setInputPhone(inputValue);
        console.log(isValidPhone);
        if (!isValidPhone) {
            setIsInvalidPhone("Phone tidak valid");
        } else if (!inputValue) {
            setIsInvalidPhone("Phone harus diisi");
        } else {
            setIsInvalidPhone("");
        }
    };
    const getData = async () => {
        setLoading(true);
        try {
            await axios
                .get(`${BASE_API}/dashboard/profile/${authorization().email}`, {
                    headers: {
                        Email: localStorage.user,
                        Authorization: localStorage.authorization,
                    },
                })
                .then((res) => {
                    setData(res.data.user);
                    setInputImage(res.data.user.photo);
                    setInputName(res.data.user.name);
                    setInputPhone(res.data.user.phone);
                    setInputEmail(res.data.user.email);
                    setInputTagline(res.data.user.tagline);
                    setInputDescription(res.data.user.description);
                    setInputDistrict(res.data.user.district);
                    setInputRegency(res.data.user.regency);
                    setInputProvince(res.data.user.province);
                    setInputCountry(res.data.user.country);
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
        formData.append("photo", inputImage);
        formData.append("name", inputName);
        formData.append("phone", "+62" + inputPhone);
        formData.append("email", inputEmail);
        formData.append("tagline", inputTagline);
        formData.append("description", inputDescription);
        formData.append("district", inputDistrict);
        formData.append("regency", inputRegency);
        formData.append("province", inputProvince);
        formData.append("country", inputCountry);
        try {
            await axios
                .post(
                    `${BASE_API}/dashboard/profile/${authorization().id}`,
                    formData,
                    {
                        headers: {
                            Email: localStorage.user,
                            Authorization: localStorage.authorization,
                        },
                    }
                )
                .then((res) => {
                    const userToEncrypt = JSON.stringify({
                        ...res.data.user,
                        session_expired: authorization().session_expired,
                    });
                    const encryptJson = encrypt(userToEncrypt);
                    localStorage.setItem("authorization", encryptJson);
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
                    navigate(-1);
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
                title={"Edit Profile"}
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
                                border={!isErrorImg ? null : "1px"}
                                borderColor={!isErrorImg ? null : "red"}
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
                        <FormControl isInvalid={isInvalidPhone ? true : false}>
                            <FormLabel>
                                <TextPoppins
                                    text={"Phone"}
                                    fontWeight={"700"}
                                    color={"rgba(43, 44, 90, 1)"}
                                    textAlign={"left"}
                                />
                            </FormLabel>
                            <InputGroup>
                                <InputLeftAddon>+62</InputLeftAddon>
                                <Input
                                    mb={isInvalidPhone ? 0 : 7}
                                    value={inputPhone}
                                    onChange={handleChange}
                                />
                            </InputGroup>
                            {!isInvalidPhone ? null : (
                                <FormErrorMessage mb={7}>
                                    {isInvalidPhone}
                                </FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isInvalid={isErrorEmail}>
                            <FormLabel mb={3}>
                                <TextPoppins
                                    text={"Email"}
                                    fontWeight={"700"}
                                    color={"rgba(43, 44, 90, 1)"}
                                    textAlign={"left"}
                                />
                            </FormLabel>
                            <Input
                                mb={isErrorEmail ? 0 : 7}
                                value={inputEmail}
                                onChange={(e) => setInputEmail(e.target.value)}
                            />
                            {!isErrorEmail ? null : (
                                <FormErrorMessage mb={7}>
                                    Email harus diisi
                                </FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isInvalid={isErrorTagline}>
                            <FormLabel>
                                <TextPoppins
                                    text={"Tagline"}
                                    fontWeight={"700"}
                                    color={"rgba(43, 44, 90, 1)"}
                                    textAlign={"left"}
                                />
                            </FormLabel>
                            <Textarea
                                mb={isErrorTagline ? 0 : 7}
                                rows={5}
                                value={inputTagline}
                                onChange={(e) =>
                                    setInputTagline(e.target.value)
                                }
                            />
                            {!isErrorTagline ? null : (
                                <FormErrorMessage mb={7}>
                                    Tagline harus diisi
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
                        <FormControl isInvalid={isErrorDistrict}>
                            <FormLabel mb={3}>
                                <TextPoppins
                                    text={"District"}
                                    fontWeight={"700"}
                                    color={"rgba(43, 44, 90, 1)"}
                                    textAlign={"left"}
                                />
                            </FormLabel>
                            <Input
                                mb={isErrorDistrict ? 0 : 7}
                                value={inputDistrict}
                                onChange={(e) =>
                                    setInputDistrict(e.target.value)
                                }
                            />
                            {!isErrorDistrict ? null : (
                                <FormErrorMessage mb={7}>
                                    District harus diisi
                                </FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isInvalid={isErrorRegency}>
                            <FormLabel mb={3}>
                                <TextPoppins
                                    text={"Regency"}
                                    fontWeight={"700"}
                                    color={"rgba(43, 44, 90, 1)"}
                                    textAlign={"left"}
                                />
                            </FormLabel>
                            <Input
                                mb={isErrorRegency ? 0 : 7}
                                value={inputRegency}
                                onChange={(e) =>
                                    setInputRegency(e.target.value)
                                }
                            />
                            {!isErrorRegency ? null : (
                                <FormErrorMessage mb={7}>
                                    Regency harus diisi
                                </FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isInvalid={isErrorProvince}>
                            <FormLabel mb={3}>
                                <TextPoppins
                                    text={"Province"}
                                    fontWeight={"700"}
                                    color={"rgba(43, 44, 90, 1)"}
                                    textAlign={"left"}
                                />
                            </FormLabel>
                            <Input
                                mb={isErrorProvince ? 0 : 7}
                                value={inputProvince}
                                onChange={(e) =>
                                    setInputProvince(e.target.value)
                                }
                            />
                            {!isErrorProvince ? null : (
                                <FormErrorMessage mb={7}>
                                    Province harus diisi
                                </FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isInvalid={isErrorCountry}>
                            <FormLabel mb={3}>
                                <TextPoppins
                                    text={"Country"}
                                    fontWeight={"700"}
                                    color={"rgba(43, 44, 90, 1)"}
                                    textAlign={"left"}
                                />
                            </FormLabel>
                            <Input
                                mb={isErrorCountry ? 0 : 7}
                                value={inputCountry}
                                onChange={(e) =>
                                    setInputCountry(e.target.value)
                                }
                            />
                            {!isErrorCountry ? null : (
                                <FormErrorMessage mb={7}>
                                    Country harus diisi
                                </FormErrorMessage>
                            )}
                        </FormControl>
                        <Stack>
                            {!inputName ||
                            !inputPhone ||
                            isInvalidPhone ||
                            !inputEmail ||
                            !inputTagline ||
                            !inputDescription ||
                            !inputDistrict ||
                            !inputRegency ||
                            !inputProvince ||
                            !inputCountry ? (
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
