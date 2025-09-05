/* eslint-disable react/prop-types */
import {
    Box,
    Center,
    Container,
    SimpleGrid,
    Spinner,
    Text,
} from "@chakra-ui/react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import CardContent from "../CardContent";
import { useEffect, useState } from "react";
import { firestore } from "../../../helpers/firebase";
import { version } from "../../../../package.json";

const MainContent = ({ isDashboard: isDashboard = false }) => {
    const [columns, setColumns] = useState(3);
    const [cardsData, setCardsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const getData = async () => {
        setIsLoading(true);
        const querySnapshot = await getDocs(
            query(
                collection(firestore, "my-website"),
                orderBy("created_at", "asc")
            )
        );
        let data = [];
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        for (let index = 0; index < 6; index++) {
            if (!data[index]) {
                data[index] = { id: null, icon: null, title: null, link: null };
            } else {
                data[index];
            }
        }
        setCardsData(data);
        setIsLoading(false);
    };
    useEffect(() => {
        function updateColumns() {
            if (window.innerWidth <= 720) {
                setColumns(1);
            } else if (window.innerWidth <= 1080) {
                setColumns(2);
            } else {
                setColumns(3);
            }
        }

        updateColumns();

        window.addEventListener("resize", updateColumns);

        return () => {
            window.removeEventListener("resize", updateColumns);
        };
    }, []);
    useEffect(() => {
        getData();
    }, []);
    return isLoading ? (
        <Box
            height="60vh"
            display="flex"
            justifyContent="center"
            alignItems="center">
            <Spinner thickness="4px" color="blue.500" size="xl" />
        </Box>
    ) : (
        <Container maxW="container.lg">
            <Center>
                <SimpleGrid columns={columns} spacing={8} mt={8} mb={8}>
                    {cardsData.map((data, index) => (
                        <CardContent
                            key={index}
                            id={data.id}
                            icon={data.icon}
                            image={data.image}
                            title={data.title}
                            link={data.link}
                            isDashboard={isDashboard}
                            getData={getData}
                        />
                    ))}
                </SimpleGrid>
            </Center>
            <Text
                textAlign="center"
                color="white"
                fontSize="8px"
                fontWeight={"600"}>
                Versi {version}
            </Text>
        </Container>
    );
};

export default MainContent;
