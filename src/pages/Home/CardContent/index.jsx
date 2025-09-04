/* eslint-disable react/prop-types */
import {
    Box,
    Button,
    Card,
    CardFooter,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    Icon,
    Image,
    Input,
    InputGroup,
    InputRightAddon,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Progress,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "./index.css";
import {
    AiFillSave,
    AiOutlineArrowRight,
    AiOutlineHistory,
} from "react-icons/ai";
import { BsPlusSquareDotted } from "react-icons/bs";
import { firestore } from "../../../helpers/firebase";
import { collection, addDoc, getDoc, doc, setDoc } from "firebase/firestore";
import { TextPoppins } from "../../../atoms/TextPoppins";
import ImageUpload from "../../../atoms/ImageUpload";
import { Link } from "react-router-dom";
const CardContent = ({
    id,
    title,
    link,
    icon,
    isDashboard,
    getData,
    image,
}) => {
    const [widths, setWidths] = useState("200px");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [inputImage, setInputImage] = useState("");
    const [inputName, setInputName] = useState("");
    const [inputLink, setInputLink] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [loading, setLoading] = useState(false);
    const isErrorImg = inputImage === "";
    const isErrorName = inputName === "";
    const isErrorLink = inputLink === "";
    const handleAdd = async () => {
        setSubmitting(true);
        try {
            await addDoc(collection(firestore, "my-website"), {
                image: inputImage,
                title: inputName,
                link: inputLink,
                created_at: Date.now(),
            });
            setSubmitting(false);
            onClose();
            getData();
        } catch (error) {
            console.log(error);
            setSubmitting(false);
        }
    };
    const handleEdit = async (id) => {
        setSubmitting(true);
        try {
            await setDoc(
                doc(collection(firestore, "my-website"), id),
                {
                    image: inputImage,
                    title: inputName,
                    link: inputLink,
                },
                { merge: true }
            );
            setSubmitting(false);
            onClose();
            getData();
        } catch (error) {
            console.log(error);
            setSubmitting(false);
        }
    };
    const getDataEdit = async (id) => {
        setLoading(true);
        const docSnap = await getDoc(doc(firestore, "my-website", id));
        console.log(docSnap.data());
        setInputImage(docSnap.data().image);
        setInputLink(docSnap.data().link);
        setInputName(docSnap.data().title);
        setLoading(false);
    };
    useEffect(() => {
        function updateWidths() {
            if (window.innerWidth <= 720) {
                let innerWidth = parseInt(window.innerWidth) - 100;
                setWidths(`${innerWidth}px`);
            } else {
                setWidths("300px");
            }
        }

        updateWidths();

        window.addEventListener("resize", updateWidths);

        return () => {
            window.removeEventListener("resize", updateWidths);
        };
    }, []);
    console.log(inputImage);
    return isDashboard ? (
        <Card
            width={widths}
            height="200px"
            bg="white"
            boxShadow="lg"
            borderRadius="md"
            textAlign="center"
            transition="transform 0.35s ease-in-out"
            _hover={{ transform: "scale(1.03)" }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            cursor={"pointer"}
            onClick={() => {
                onOpen();
                if (title && link) {
                    getDataEdit(id);
                }
            }}>
            <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {title && link ? "Edit" : "Add"} Home Menu
                    </ModalHeader>
                    <ModalBody pb={6}>
                        {loading ? (
                            <Progress
                                my="20px"
                                size="xs"
                                isIndeterminate
                            />
                        ) : (
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
                                            path={"home/"}
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
                                <FormControl isInvalid={isErrorName}>
                                    <FormLabel>Name</FormLabel>
                                    <Input
                                        mb={isErrorName ? 0 : 2}
                                        value={inputName}
                                        onChange={(e) =>
                                            setInputName(e.target.value)
                                        }
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
                                    <InputGroup>
                                        <Input
                                            mb={isErrorLink ? 0 : 2}
                                            value={inputLink}
                                            onChange={(e) =>
                                                setInputLink(e.target.value)
                                            }
                                            placeholder="Link"
                                        />
                                        {inputLink ? (
                                            <InputRightAddon>
                                                <Link
                                                    to={inputLink}
                                                    target="_blank">
                                                    <AiOutlineArrowRight />
                                                </Link>
                                            </InputRightAddon>
                                        ) : null}
                                    </InputGroup>
                                    {!isErrorLink ? null : (
                                        <FormErrorMessage mb={2}>
                                            Link harus diisi
                                        </FormErrorMessage>
                                    )}
                                </FormControl>
                            </>
                        )}
                    </ModalBody>

                    <ModalFooter gap={3}>
                        {!inputName || !inputLink || !inputImage ? (
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
                                    title && link
                                        ? handleEdit(id)
                                        : handleAdd();
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
            {title && link ? (
                <>
                    <Image
                        objectFit="cover"
                        src={image}
                        alt="Chakra UI"
                        width={widths}
                        height="135px"
                        borderTopRadius={"md"}
                        borderTopEndRadius={"md"}
                    />
                    <CardFooter>
                        <Box color={"#3F51B5"}>
                            <TextPoppins
                                text={title}
                                fontWeight={"700"}
                                color={"#3F51B5"}
                            />
                        </Box>
                    </CardFooter>
                </>
            ) : (
                <>
                    <Box mb={2}>
                        <Flex
                            mb={2}
                            flexDir={"column"}
                            gap={3}
                            p={2}
                            justifyContent={"center"}
                            alignItems={"center"}
                            w={100}>
                            <Icon
                                as={BsPlusSquareDotted}
                                w={70}
                                h={70}
                                color={"#c7c8c9"}
                            />
                        </Flex>
                    </Box>
                    {/* <Box color={"#dedfe0"}>. . .</Box> */}
                </>
            )}
        </Card>
    ) : link ? (
        <Link
            to={link}
            target="_blank"
            _hover={{ textDecoration: "none" }}>
            <Card
                width={widths}
                height="200px"
                bg="rgba(255, 255, 255, 0.8)"
                boxShadow="lg"
                borderRadius="md"
                textAlign="center"
                transition="transform 0.35s ease-in-out"
                _hover={{
                    animation: "hoverAnimation 0.8s infinite",
                }}
                alignItems="center">
                <Image
                    objectFit="cover"
                    src={image}
                    alt="Chakra UI"
                    width={widths}
                    height="140px"
                    borderTopRadius={"md"}
                    borderTopEndRadius={"md"}
                />
                <CardFooter>
                    <Box color={"#3F51B5"}>
                        <TextPoppins
                            text={title}
                            fontWeight={"700"}
                            color={"#3F51B5"}
                        />
                    </Box>
                </CardFooter>
            </Card>
        </Link>
    ) : (
        <Box
            width={widths}
            height="200px"
            bg="rgba(255, 255, 255, 0.8)"
            boxShadow="lg"
            p="4"
            borderRadius="md"
            textAlign="center"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            position={"relative"}>
            {title ? (
                <Text
                    className="badge"
                    position="absolute"
                    top="0"
                    right="0"
                    bg={"#adadad"}
                    color="white"
                    borderRadius="lg"
                    px={"8px"}
                    py={"3px"}
                    m={"5px"}
                    fontSize={"10px"}>
                    On Progres...
                </Text>
            ) : (
                <Text></Text>
            )}
            <Box mb={2}>
                <Flex
                    mb={2}
                    flexDir={"column"}
                    gap={3}
                    p={2}
                    justifyContent={"center"}
                    alignItems={"center"}
                    w={100}>
                    <Icon
                        as={icon ?? AiOutlineHistory}
                        w={70}
                        h={70}
                        color={"#98a7fa"}
                    />
                </Flex>
            </Box>
            {title ? (
                <Box color={"#98a7fa"}>{title}</Box>
            ) : (
                <Box color={"#98a7fa"}>Coming soon...</Box>
            )}
        </Box>
    );
};

export default CardContent;
