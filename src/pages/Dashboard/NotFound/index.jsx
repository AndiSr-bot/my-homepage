import { Box, Button, Image, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
const NotFound = () => {
    return (
        <>
            <Box
                // bg={"red"}
                textAlign={"start"}
                textDecoration={"underline"}
                pt={2}
                pl={2}>
                <Link to={"/"}>
                    <Button colorScheme="teal">
                        <AiFillHome />
                    </Button>
                </Link>
            </Box>
            <Stack
                minH={"80vh"}
                width={"100%"}
                rounded={20}
                justifyContent={"center"}
                alignItems={"center"}>
                <Stack
                    justifyContent={"center"}
                    alignItems={"center"}>
                    <Image
                        src="https://firebasestorage.googleapis.com/v0/b/my-homepage-157fb.appspot.com/o/home%2F404PageNotFound.png?alt=media&token=7fe9ef6d-2105-403d-8b75-b6ad056e60c2"
                        textAlign={"center"}
                        width={"40%"}
                        alt="Deskripsi Gambar Anda"
                    />
                </Stack>
            </Stack>
        </>
    );
};

export default NotFound;
