import {
    Input,
    Button,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    useDisclosure,
    Icon,
    Flex,
    Center,
    Text,
    Box,
    Stack,
    Spinner,
    HStack,
    Badge,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import { AiFillWechat, AiOutlinePoweroff } from "react-icons/ai";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
// import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { MdSend } from "react-icons/md";
import { db } from "../../helpers/firebase";
import {
    onValue,
    ref,
    set,
    push,
    query,
    orderByChild,
    equalTo,
} from "firebase/database";
import { useEffect, useRef, useState } from "react";
import ModalConfirm from "../ModalConfirm";

const ChatApp = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();
    const lastChatRef = useRef();
    const [historyChat, setHistoryChat] = useState([]);
    const [listChat, setListChat] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(localStorage.getItem("user"));
    const [usernama, setUsernama] = useState("");
    const [nama, setNama] = useState(localStorage.getItem("nama"));
    const [password, setPassword] = useState("");
    const [errorUser, setErrorUser] = useState(false);
    const [errorNama, setErrorNama] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [input, setInput] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [groupChat, setGroupChat] = useState(localStorage.getItem("user"));
    const [openModal, setOpenModal] = useState(false);
    const cssScroll = {
        "&::-webkit-scrollbar": {
            width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#4f66e3",
            borderRadius: "8px",
        },
        "&::-webkit-scrollbar-track": {
            backgroundColor: "rgba(63, 81, 181, 0.1)",
            borderRadius: "8px",
        },
    };
    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const handleInputChange = (e) => {
        const inputUsername = e;
        if (isEmailValid(inputUsername) == true) {
            setErrorUser(false);
            setUsername(inputUsername);
        } else {
            setErrorUser(true);
        }
    };
    const handleLoginClick = () => {
        if (
            username == "andisr131117@gmail.com" &&
            usernama &&
            !errorNama &&
            !errorUser
        ) {
            if (password == "andisr98") {
                setIsLoading(true);
                setTimeout(() => {
                    localStorage.setItem("user", username);
                    setUser(localStorage.getItem("user"));
                    localStorage.setItem("nama", usernama);
                    setNama(localStorage.getItem("nama"));
                    setIsLoading(false);
                    setErrorPassword(false);

                    setUsername(null);
                    setUsernama(null);
                    setPassword(null);
                    setIsLogin(true);
                }, 1000);
            } else {
                setErrorPassword(true);
            }
        } else {
            setIsLoading(true);
            setTimeout(() => {
                setGroupChat("");
                localStorage.setItem("user", username);
                setUser(localStorage.getItem("user"));
                localStorage.setItem("nama", usernama);
                setNama(localStorage.getItem("nama"));
                setTimeout(() => {
                    setGroupChat(username);
                    setUsername(null);
                    setUsernama(null);
                    setPassword(null);
                    setIsLogin(true);
                    setTimeout(() => {
                        setIsLoading(false);
                    }, 10);
                }, 10);
            }, 1000);
        }
    };
    const handleLogoutClick = () => {
        setIsLoading(true);
        setTimeout(() => {
            localStorage.clear();
            setUser(localStorage.getItem("user"));
            setNama(localStorage.getItem("nama"));
            setGroupChat("");
            setIsLoading(false);
        }, 1000);
    };
    const convertTime = (epoch) => {
        const timestamp = epoch;
        const date = new Date(timestamp);
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    };
    const konversiData = (dataAwal) => {
        const hasilKonversi = {};
        dataAwal.forEach((item) => {
            const { grupChatDate, text, user, waktu } = item;
            if (!hasilKonversi[grupChatDate]) {
                hasilKonversi[grupChatDate] = {
                    grupChat: grupChatDate,
                    chat: [],
                };
            }
            hasilKonversi[grupChatDate].chat.push({
                user,
                text,
                waktu,
            });
        });
        const hasilAkhir = Object.values(hasilKonversi);
        return hasilAkhir;
    };
    const kelompokkanPesan = (dataAwal) => {
        const hasilKelompok = {};

        dataAwal.forEach((item) => {
            const { grupChatUser, text, waktu } = item;

            if (!hasilKelompok[grupChatUser]) {
                hasilKelompok[grupChatUser] = {
                    grupChatUser,
                    text: "",
                    waktu: 0,
                    isReplied: false,
                    countNotReplied: 0,
                };
            }

            if (waktu > hasilKelompok[grupChatUser].waktu) {
                hasilKelompok[grupChatUser].text = text;
                hasilKelompok[grupChatUser].waktu = waktu;
            }

            if (item.user === localStorage.getItem("user")) {
                hasilKelompok[grupChatUser].isReplied = true;
                hasilKelompok[grupChatUser].countNotReplied = 0;
            } else {
                hasilKelompok[grupChatUser].isReplied = false;
                hasilKelompok[grupChatUser].countNotReplied =
                    parseInt(hasilKelompok[grupChatUser].countNotReplied) + 1;
            }
        });

        const hasilAkhir = Object.values(hasilKelompok);

        return hasilAkhir;
    };
    const convertEpochToDate = (epoch) => {
        const date = new Date(epoch);

        const options = {
            day: "numeric",
            month: "long",
            year: "numeric",
        };

        return date.toLocaleDateString("id-ID", options);
    };
    const sendMessage = async (group, date) => {
        const chatRef = ref(db, "messages");
        const newMessageRef = push(chatRef);
        const newMessage = {
            grupChatDate: date,
            grupChatUser: group,
            user: localStorage.getItem("user"),
            text: input,
            waktu: Date.now(),
        };
        set(newMessageRef, newMessage);
        setInput("");
    };
    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setTimeout(() => {
                if (lastChatRef.current) {
                    lastChatRef.current.scrollIntoView({
                        behavior: "smooth",
                    });
                }
            }, 10);
        }, 10);
    }, [isOpen, user, isLogin]);

    useEffect(() => {
        if (username == "andisr131117@gmail.com") {
            setUsernama("Admin");
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, [username]);

    useEffect(() => {
        setIsLoading(true);
        const chatRef = ref(db, "messages");
        const userChatQuery = query(
            chatRef,
            orderByChild("grupChatUser"),
            equalTo(groupChat)
        );
        const unsubscribe = onValue(
            localStorage.getItem("user") == "andisr131117@gmail.com" &&
                groupChat == localStorage.getItem("user")
                ? chatRef
                : userChatQuery,
            (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    // history chat
                    const messagesArray = Object.values(data);
                    let newData = konversiData(messagesArray);
                    setHistoryChat(newData);

                    //list chat admin
                    if (
                        localStorage.getItem("user") == "andisr131117@gmail.com"
                    ) {
                        let newListData = kelompokkanPesan(messagesArray);
                        setListChat(newListData);
                    }
                }
                setTimeout(() => {
                    if (lastChatRef.current) {
                        lastChatRef.current.scrollIntoView({
                            behavior: "smooth",
                        });
                    }
                }, 10);
                setIsLoading(false);
            }
        );

        return () => {
            unsubscribe();
        };
    }, [groupChat]);
    console.log(groupChat, "groupChat");
    return (
        <>
            <Button
                position={"absolute"}
                right={6}
                // bottom={6}
                rounded={50}
                p={0}
                bg="rgba(63, 81, 181, 0.5)"
                _hover={{
                    bg: "rgba(63, 81, 181, 0.2)",
                }}
                w={"16"}
                h={"16"}
                onClick={() => {
                    onOpen();
                }}>
                <Icon as={AiFillWechat} w={50} h={50} color={"white"} />
            </Button>
            <ModalConfirm
                openModal={openModal}
                setOpenModal={setOpenModal}
                handleLogoutClick={handleLogoutClick}
            />
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
                autoFocus={false}>
                <DrawerOverlay />
                <DrawerContent bg="rgba(63, 81, 181, 0.5)">
                    <DrawerHeader color={"white"} p={0}>
                        <Stack bg={"rgba(63, 81, 181, 0.9)"} p={2}>
                            <Text textAlign="center" color="white">
                                Customer Services
                            </Text>
                        </Stack>
                        {user ? (
                            <HStack
                                p={0}
                                // alignItems={"flex-end"}
                                bg={"transparent"}
                                justifyContent={"space-between"}>
                                {groupChat == localStorage.getItem("user") ? (
                                    <HStack></HStack>
                                ) : (
                                    <HStack
                                        // bg={"rgba(63, 81, 181, 0.9)"}
                                        bg={"rgba(63, 81, 181, 0.9)"}
                                        py={1}
                                        px={2}
                                        roundedBottomRight={"lg"}>
                                        <Button
                                            w={1}
                                            bg="transparent"
                                            rounded={"3xl"}
                                            size={"xs"}
                                            p={0}
                                            _hover={{
                                                bg: "rgba(63, 81, 181, 0.9)",
                                            }}
                                            onClick={() => {
                                                setGroupChat(
                                                    localStorage.getItem("user")
                                                );
                                            }}>
                                            <Icon
                                                as={FaArrowLeft}
                                                w={4}
                                                h={4}
                                                color={"white"}
                                            />
                                        </Button>
                                    </HStack>
                                )}
                                {groupChat == localStorage.getItem("user") ? (
                                    <HStack></HStack>
                                ) : (
                                    <HStack
                                        // bg={"rgba(63, 81, 181, 0.9)"}
                                        bg={"rgba(63, 81, 181, 0.9)"}
                                        py={1}
                                        px={2}
                                        rounded={"lg"}>
                                        <Text
                                            textAlign="center"
                                            color="white"
                                            fontSize={"x-small"}>
                                            {groupChat}
                                        </Text>
                                    </HStack>
                                )}
                                <HStack
                                    bg={"rgba(63, 81, 181, 0.9)"}
                                    pt={1}
                                    pr={1}
                                    pb={1}
                                    pl={3}
                                    roundedBottomLeft={"lg"}>
                                    <Text
                                        textAlign="center"
                                        color="white"
                                        fontSize={"x-small"}>
                                        {nama}
                                    </Text>
                                    <Button
                                        w={1}
                                        bg="transparent"
                                        rounded={"3xl"}
                                        size={"xs"}
                                        p={0}
                                        _hover={{
                                            bg: "rgba(63, 81, 181, 0.9)",
                                        }}
                                        onClick={() => {
                                            // handleLogoutClick();
                                            setOpenModal(true);
                                            setShowPassword(false);
                                        }}>
                                        <Icon
                                            as={AiOutlinePoweroff}
                                            w={4}
                                            h={4}
                                            // color={"#3F51B5"}
                                            color={"white"}
                                        />
                                    </Button>
                                </HStack>
                            </HStack>
                        ) : null}
                    </DrawerHeader>
                    <DrawerBody
                        w={"full"}
                        p={0}
                        overflowY="auto"
                        css={cssScroll}>
                        {isLoading ? (
                            <Center h="full">
                                <Spinner size="lg" color="white" />
                            </Center>
                        ) : !user ? (
                            <Center h={"full"}>
                                <Box w={"80%"}>
                                    {!isAdmin ? (
                                        <>
                                            <Text
                                                textAlign="left"
                                                color="white"
                                                mb={2}>
                                                Nama :
                                            </Text>
                                            <Input
                                                size={"sm"}
                                                placeholder="Masukkan nama..."
                                                rounded={"lg"}
                                                bg={
                                                    !errorNama
                                                        ? "white"
                                                        : "#FFCCCC"
                                                }
                                                border={
                                                    errorNama
                                                        ? "2px"
                                                        : undefined
                                                }
                                                borderColor={
                                                    errorNama
                                                        ? "red"
                                                        : undefined
                                                }
                                                mb={1}
                                                value={usernama}
                                                required
                                                onChange={(e) => {
                                                    setUsernama(e.target.value);
                                                }}
                                            />
                                        </>
                                    ) : null}
                                    <Text textAlign="left" color="white" mb={2}>
                                        Email :
                                    </Text>
                                    <Input
                                        size={"sm"}
                                        placeholder="Masukkan email..."
                                        rounded={"lg"}
                                        bg={!errorUser ? "white" : "#FFCCCC"}
                                        border={errorUser ? "2px" : undefined}
                                        borderColor={
                                            errorUser ? "red" : undefined
                                        }
                                        mb={isAdmin ? 1 : 3}
                                        value={username}
                                        required
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();

                                                if (!username) {
                                                    setErrorUser(true);
                                                } else {
                                                    handleInputChange(username);
                                                }

                                                if (!usernama) {
                                                    setErrorNama(true);
                                                } else {
                                                    setErrorNama(false);
                                                }
                                                if (
                                                    username &&
                                                    usernama &&
                                                    !errorNama &&
                                                    !errorUser
                                                ) {
                                                    setHistoryChat([]);
                                                    handleLoginClick();
                                                }
                                            }
                                        }}
                                    />
                                    {isAdmin ? (
                                        <>
                                            <Text
                                                textAlign="left"
                                                color="white"
                                                mb={2}>
                                                Password :
                                            </Text>

                                            <InputGroup mb={3} size={"sm"}>
                                                <Input
                                                    type={
                                                        showPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    size={"sm"}
                                                    placeholder="Masukkan Password..."
                                                    rounded={"lg"}
                                                    bg={
                                                        !errorPassword
                                                            ? "white"
                                                            : "#FFCCCC"
                                                    }
                                                    border={
                                                        errorPassword
                                                            ? "2px"
                                                            : undefined
                                                    }
                                                    borderColor={
                                                        errorPassword
                                                            ? "red"
                                                            : undefined
                                                    }
                                                    value={password}
                                                    required
                                                    onChange={(e) => {
                                                        setPassword(
                                                            e.target.value
                                                        );
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();

                                                            if (!username) {
                                                                setErrorUser(
                                                                    true
                                                                );
                                                            } else {
                                                                handleInputChange(
                                                                    username
                                                                );
                                                            }

                                                            if (!usernama) {
                                                                setErrorNama(
                                                                    true
                                                                );
                                                            } else {
                                                                setErrorNama(
                                                                    false
                                                                );
                                                            }
                                                            if (
                                                                username &&
                                                                usernama &&
                                                                !errorNama &&
                                                                !errorUser
                                                            ) {
                                                                setHistoryChat(
                                                                    []
                                                                );
                                                                handleLoginClick();
                                                            }
                                                        }
                                                    }}
                                                />
                                                <InputRightElement>
                                                    <Icon
                                                        onClick={() =>
                                                            setShowPassword(
                                                                !showPassword
                                                            )
                                                        }
                                                        cursor={"pointer"}
                                                        as={
                                                            showPassword
                                                                ? FaEyeSlash
                                                                : FaEye
                                                        }
                                                        // color={"#3F51B5"}
                                                        color={"black"}
                                                    />
                                                </InputRightElement>
                                            </InputGroup>
                                        </>
                                    ) : null}
                                    <Button
                                        size={"sm"}
                                        colorScheme="facebook"
                                        p={2}
                                        onClick={() => {
                                            if (!username) {
                                                setErrorUser(true);
                                            } else {
                                                handleInputChange(username);
                                            }

                                            if (!usernama) {
                                                setErrorNama(true);
                                            } else {
                                                setErrorNama(false);
                                            }
                                            if (
                                                username &&
                                                usernama &&
                                                !errorNama &&
                                                !errorUser
                                            ) {
                                                setHistoryChat([]);
                                                handleLoginClick();
                                            }
                                        }}>
                                        Login
                                    </Button>
                                </Box>
                            </Center>
                        ) : groupChat == "andisr131117@gmail.com" ? (
                            <>
                                {/* <pre>{JSON.stringify(listChat, null, 2)}</pre> */}
                                {listChat.map((list, index) => {
                                    return (
                                        <Box
                                            key={index}
                                            bg={"#3F51B5"}
                                            rounded={"md"}
                                            m={2}
                                            cursor={"pointer"}
                                            _hover={{
                                                bg: "rgba(63, 81, 181, 0.8)",
                                            }}
                                            onClick={() => {
                                                setHistoryChat([]);
                                                setGroupChat(list.grupChatUser);
                                            }}>
                                            <HStack
                                                justifyContent={"space-between"}
                                                bg={"transparent"}
                                                p={2}>
                                                <Box w={"70%"}>
                                                    <Stack
                                                        alignItems={
                                                            "flex-start"
                                                        }>
                                                        <Text
                                                            color={"white"}
                                                            fontSize={10}>
                                                            {list.grupChatUser}
                                                        </Text>
                                                        <Text
                                                            color={"white"}
                                                            fontSize={10}>
                                                            {list.text}
                                                        </Text>
                                                    </Stack>
                                                </Box>
                                                <Box w={"30%"}>
                                                    <Stack
                                                        alignItems={"flex-end"}>
                                                        <Text
                                                            color={"white"}
                                                            fontSize={10}>
                                                            {convertTime(
                                                                list.waktu
                                                            )}
                                                        </Text>
                                                        {!list.isReplied ? (
                                                            <Badge
                                                                rounded={"lg"}
                                                                bg={"red"}>
                                                                <Text
                                                                    color={
                                                                        "white"
                                                                    }
                                                                    fontSize={
                                                                        8
                                                                    }>
                                                                    {
                                                                        list.countNotReplied
                                                                    }
                                                                </Text>
                                                            </Badge>
                                                        ) : (
                                                            <Text
                                                                color={
                                                                    "#3F51B5"
                                                                }
                                                                fontSize={8}>
                                                                {
                                                                    list.countNotReplied
                                                                }
                                                            </Text>
                                                        )}
                                                    </Stack>
                                                </Box>
                                            </HStack>
                                        </Box>
                                    );
                                })}
                            </>
                        ) : (
                            <>
                                {historyChat.length > 0 ? (
                                    <>
                                        {historyChat.map((data, index) => {
                                            return (
                                                <>
                                                    <Stack
                                                        alignItems={"center"}
                                                        key={data.id}>
                                                        <Box
                                                            bg={"#bbbcbf"}
                                                            // color={"white"}
                                                            mb={2}
                                                            p={"0.5"}
                                                            rounded={"md"}>
                                                            <Text
                                                                mx={1}
                                                                my={0}
                                                                fontSize={10}>
                                                                {data.grupChat}
                                                            </Text>
                                                        </Box>
                                                    </Stack>
                                                    {data.chat.map(
                                                        (chat, chatIndex) => {
                                                            const isLastChat =
                                                                index ===
                                                                    historyChat.length -
                                                                        1 &&
                                                                chatIndex ===
                                                                    data.chat
                                                                        .length -
                                                                        1;
                                                            return (
                                                                <Stack
                                                                    key={
                                                                        chat.id
                                                                    }
                                                                    alignItems={
                                                                        chat.user !=
                                                                        localStorage.getItem(
                                                                            "user"
                                                                        )
                                                                            ? "flex-start"
                                                                            : "flex-end"
                                                                    }
                                                                    ref={
                                                                        isLastChat
                                                                            ? lastChatRef
                                                                            : null
                                                                    }
                                                                    mb={2}>
                                                                    <Box
                                                                        bg={
                                                                            chat.user !=
                                                                            localStorage.getItem(
                                                                                "user"
                                                                            )
                                                                                ? "#3F51B5"
                                                                                : "#128c7e"
                                                                        }
                                                                        color={
                                                                            "white"
                                                                        }
                                                                        mx={2}
                                                                        p={1}
                                                                        maxW={
                                                                            "90%"
                                                                        }
                                                                        minW={
                                                                            "80%"
                                                                        }
                                                                        rounded={
                                                                            "lg"
                                                                        }>
                                                                        <Stack
                                                                            alignItems={
                                                                                "flex-start"
                                                                            }>
                                                                            <Text
                                                                                ml={
                                                                                    1
                                                                                }
                                                                                my={
                                                                                    0
                                                                                }
                                                                                fontSize={
                                                                                    12
                                                                                }
                                                                                textAlign={
                                                                                    "left"
                                                                                }>
                                                                                {
                                                                                    chat.text
                                                                                }
                                                                            </Text>
                                                                        </Stack>
                                                                        <Stack
                                                                            alignItems={
                                                                                "flex-end"
                                                                            }>
                                                                            <Text
                                                                                mr={
                                                                                    2
                                                                                }
                                                                                my={
                                                                                    0
                                                                                }
                                                                                fontSize={
                                                                                    10
                                                                                }>
                                                                                {convertTime(
                                                                                    chat.waktu
                                                                                )}
                                                                            </Text>
                                                                        </Stack>
                                                                    </Box>
                                                                </Stack>
                                                            );
                                                        }
                                                    )}
                                                </>
                                            );
                                        })}
                                    </>
                                ) : (
                                    <Center h={"full"}>
                                        <Text textAlign="center" color="white">
                                            Belum ada percakapan
                                        </Text>
                                    </Center>
                                )}
                            </>
                        )}
                    </DrawerBody>

                    <DrawerFooter
                        px={4}
                        bg={
                            groupChat == "andisr131117@gmail.com" || !groupChat
                                ? ""
                                : "rgba(63, 81, 181, 0.9)"
                        }>
                        {groupChat == "andisr131117@gmail.com" ||
                        !groupChat ? null : (
                            <Flex align="center" w={"full"}>
                                <Input
                                    flex="1"
                                    placeholder="Ketik pesan..."
                                    rounded={"3xl"}
                                    bg={"white"}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            sendMessage(
                                                groupChat,
                                                convertEpochToDate(Date.now())
                                            );
                                        }
                                    }}
                                />
                                <Button
                                    w={5}
                                    ml={2}
                                    bg="white"
                                    rounded={"3xl"}
                                    p={0}
                                    onClick={() => {
                                        sendMessage(
                                            groupChat,
                                            convertEpochToDate(Date.now())
                                        );
                                    }}>
                                    <Icon
                                        as={MdSend}
                                        w={5}
                                        h={5}
                                        color={"#3F51B5"}
                                    />
                                </Button>{" "}
                            </Flex>
                        )}
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default ChatApp;
