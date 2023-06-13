import {
    Badge,
    Box,
    Flex,
    Image,
    Text,
    useColorModeValue,
    useToast,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { api } from "../../../src/services/api";
import styles from "./style.module.scss";
import { useEffect, useState } from "react";

interface ICourse {
    name: string;
    count: number;
}
interface IRankData {
    totalUsers: number;
    courses: ICourse[];
}

const GetMedal = (index: number) => {
    if (index < 4) {
        let src = "";
        switch (index) {
            case 1:
                src = "/assets/images/logged/pngs/gold-medal.png";
                break;
            case 2:
                src = "/assets/images/logged/pngs/silver-medal.png";
                break;
            case 3:
                src = "/assets/images/logged/pngs/bronze-medal.png";
                break;
        }
        return <Image src={src} alt="Medalha" w={"32px"} h={"40px"} mr={3} />;
    } else return <Text mr={3}>{index}º</Text>;
};

const Ranking: NextPage = () => {
    const theme = useColorModeValue("light", "dark");
    const toast = useToast();
    const [rankData, setRankData] = useState<IRankData>({
        totalUsers: 0,
        courses: [],
    });

    const [onLoad, setOnLoad] = useState(true);

    const getRankData = async () => {
        try {
            setOnLoad(true);
            const response = await api.get("ranking/getRanking");
            if (response.data.totalUsers === undefined) throw new Error();
            setRankData(response.data);
        } catch (error) {
            toast({
                title: "Erro ao buscar ranking de cursos",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
        } finally {
            setOnLoad(false);
        }
    };

    useEffect(() => {
        getRankData();
    }, []);

    return (
        <>
            <Box
                p={{ base: ".5rem", md: "1rem" }}
                bg={useColorModeValue("white", "gray.900")}
                borderRadius={"12px"}
                borderWidth="1px"
                mb={4}
            >
                <Text
                    fontSize={{
                        base: "sm",
                        md: "md",
                        lg: "lg",
                    }}
                    textAlign={"center"}
                >
                    Agradeço imensamente a todos pelo apoio, atualmente
                    atingimos a incrível marca de {rankData.totalUsers || 0}{" "}
                    usuários cadastrados em nosso sistema. <br /> Aproveitei
                    para compartilhar com vocês o número de alunos matriculados
                    em cada curso.
                </Text>
            </Box>
            <Box
                p={{ base: ".5rem", md: "1rem" }}
                bg={useColorModeValue("white", "gray.900")}
                borderRadius={"12px"}
                borderWidth="1px"
            >
                <Box
                    overflowX={"auto"}
                    className={styles.table_scrollbar}
                    maxH={"70vh"}
                    pr={2}
                >
                    <table
                        className={`${styles.custom_table} ${
                            onLoad ? styles.on_load : ""
                        }`}
                        {...(rankData.courses.length === 0 && {
                            style: { minWidth: "0 !important" },
                        })}
                        data-theme={theme}
                    >
                        <thead data-theme={theme}>
                            <tr>
                                <th>Nome do curso</th>
                                <th>Número de alunos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rankData.courses.length > 0 ? (
                                rankData.courses.map((course, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <Flex alignItems={"center"}>
                                                    {GetMedal(index + 1)}
                                                    <Text>{course.name}</Text>
                                                </Flex>
                                            </td>
                                            <td>{course.count}</td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={4}>
                                        {!onLoad ? (
                                            <>
                                                <Text
                                                    fontSize={"2xl"}
                                                    fontWeight={600}
                                                    my={2}
                                                    textAlign={"center"}
                                                >
                                                    Ocorreu um erro
                                                </Text>
                                                <Flex justifyContent={"center"}>
                                                    <Image
                                                        src="/assets/images/logged/svgs/empty.svg"
                                                        alt="vazio"
                                                        w={{
                                                            base: "200px",
                                                            md: "300px",
                                                            lg: "400px",
                                                        }}
                                                        h={{
                                                            base: "200px",
                                                            md: "300px",
                                                            lg: "400px",
                                                        }}
                                                    />
                                                </Flex>
                                            </>
                                        ) : (
                                            <Box h={"60vh"}></Box>
                                        )}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Box>
            </Box>
        </>
    );
};
export default Ranking;
