import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    components: {
        Button: {
            variants: {
                // Tombol Utama (Primary)
                primary: {
                    rounded: "10px",
                    bg: "#3F51B5",
                    color: "white",
                    _hover: {
                        bg: "#4839AB",
                    },
                },
                // Tombol Sekunder (Secondary)
                secondary: {
                    rounded: "10px",
                    bg: "gray.400",
                    color: "black",
                    _hover: {
                        bg: "gray.500",
                    },
                },
                // Tombol Confirm (Confirm)
                confirm: {
                    rounded: "10px",
                    bg: "#13B58E",
                    color: "white",
                    _hover: {
                        bg: "#3D8559",
                    },
                },
                // Tombol cancel (cancel)
                cancel: {
                    rounded: "10px",
                    bg: "#D03030",
                    color: "white",
                    _hover: {
                        bg: "#BD2E2C",
                    },
                },
                // Tombol warning (warning)
                warning: {
                    rounded: "10px",
                    bg: "#FF9800", // Warna latar belakang sesuaikan dengan warna warning yang diinginkan
                    color: "white",
                    _hover: {
                        bg: "#F57C00", // Warna latar belakang saat dihover
                    },
                },
            },
        },
    },
});

export default theme;
