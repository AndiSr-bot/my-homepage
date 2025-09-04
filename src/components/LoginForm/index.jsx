/* eslint-disable react-hooks/rules-of-hooks */
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Center,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    useToast,
} from "@chakra-ui/react";
import { TextPoppins } from "../../atoms/TextPoppins";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import axios from "axios";
import { BASE_API } from "../../helpers/constant";
import { encrypt } from "../../helpers/cryptoJS";
import { AiFillHome } from "react-icons/ai";
const index = () => {
    const [inputEmail, setInputEmail] = useState("");
    const [inputPassword, setInputPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            setIsLoading(true);
            await signInWithEmailAndPassword(
                getAuth(),
                inputEmail,
                inputPassword
            );
            await axios
                .get(`${BASE_API}/dashboard/profile/${inputEmail}`)
                .then((res) => {
                    const userToEncrypt = JSON.stringify({
                        ...res.data.user,
                        session_expired: Date.now() + 1000 * 60 * 60 * 6,
                    });
                    const encryptJson = encrypt(userToEncrypt);
                    localStorage.setItem("authorization", encryptJson);
                    localStorage.setItem("user", res.data.user.email);
                    localStorage.setItem("nama", "Admin");
                    toast({
                        title: "Success",
                        description: "Login successfully",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                        position: "top-right",
                    });
                    setIsLoading(false);
                    navigate("/dashboard");
                });
        } catch (error) {
            toast({
                title: "Error",
                description:
                    error.message == "Firebase: Error (auth/invalid-email)."
                        ? "Wrong Email"
                        : error.message ==
                          "Firebase: Error (auth/invalid-login-credentials)."
                        ? "Wrong password"
                        : error,
                status: "error",
                isClosable: true,
                variant: "subtle",
                duration: 3000,
                position: "top-right",
            });
            console.log(error.message);
            setIsLoading(false);
        }
    };
    return (
        <Card
            // bg="rgba(63, 81, 181, 0.9)"
            align="center">
            <CardHeader>
                <Heading size="md">
                    <TextPoppins
                        text={"Login"}
                        fontSize={"36px"}
                        fontWeight={"700"}
                        color={"#5867b8"}
                    />
                </Heading>
            </CardHeader>
            <CardBody>
                <Stack>
                    <Input
                        mb={2}
                        w={"300px"}
                        placeholder="Email"
                        value={inputEmail}
                        onChange={(e) => setInputEmail(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleLogin();
                            }
                        }}
                    />
                    <InputGroup>
                        <Input
                            type={showPassword ? "text" : "password"}
                            mb={2}
                            w={"300px"}
                            placeholder="Password"
                            value={inputPassword}
                            onChange={(e) => setInputPassword(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleLogin();
                                }
                            }}
                        />
                        <InputRightElement>
                            <Icon
                                onClick={() => setShowPassword(!showPassword)}
                                cursor={"pointer"}
                                as={showPassword ? FaEyeSlash : FaEye}
                                // color={"#3F51B5"}
                                color={"black"}
                            />
                        </InputRightElement>
                    </InputGroup>
                    <Link to={"/"}>
                        <Center>
                            <AiFillHome />
                        </Center>
                    </Link>
                </Stack>
            </CardBody>
            <CardFooter>
                {!isLoading ? (
                    <Button
                        w={"150px"}
                        rounded={"md"}
                        onClick={handleLogin}
                        variant={"primary"}>
                        Login
                    </Button>
                ) : (
                    <Button
                        w={"150px"}
                        isLoading
                        loadingText="Loading"
                        bg={"#3F51B5"}
                        _hover={{
                            bg: "#3F51B5",
                        }}
                    />
                )}
            </CardFooter>
        </Card>
    );
};
export default index;
