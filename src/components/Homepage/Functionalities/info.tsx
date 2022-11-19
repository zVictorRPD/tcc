import { IFunctionalities } from "../../../interfaces/homepage/funcitonalites.interface";
import {AiFillAppstore} from "react-icons/ai";
import { FaCalendarAlt, FaChalkboardTeacher, FaMapMarkedAlt, FaRegClock, FaUserGraduate } from "react-icons/fa";

export const funcitonalites:IFunctionalities[] = [
    {
        icon: <FaUserGraduate fontSize={'2.25rem'} color={'#2a4365'}/>,
        title: "Grade Curricular",
        description: "Você seleciona o seu curso e a grade é montada automaticamente, com todos os períodos, matérias obrigatórias e optativas. Mas se você tá atrasado não se preocupe, você pode reorganizar a grade criando novos períodos e reordenando as matérias.",
    },
    {
        icon: <FaRegClock fontSize={'2.25rem'} color={'#2a4365'}/>,
        title: "Grade horária",
        description: "Cansado de tentar entender os códigos dos horários das matérias? Temos uma grade horária que mostra os horários de forma clara e organizada. Com a opção de exportar para excel, caso você queira colocar o resto da sua rotina.",
    },
    {
        icon: <FaChalkboardTeacher fontSize={'2.25rem'} color={'#2a4365'}/>,
        title: "Professores",
        description: "Esquece constantemente o nome ou email do professor? Não se preocupe, você pode atribuir professores as suas matérias e acessar suas informações rapidamente. Ou pode simplesmente pesquisar o mesmo pelo nome ou departamento.",
    },
    {
        icon: <FaCalendarAlt fontSize={'2.25rem'} color={'#2a4365'}/>,
        title: "Calendário",
        description: "Quer organizar ainda mais sua vida? Temos um calendário para você, onde é possível adicionar eventos, como provas, trabalhos, reuniões, etc.",
    },
    {
        icon: <AiFillAppstore fontSize={'2.25rem'} color={'#2a4365'}/>,
        title: "Dashboard",
        description: "Quer ter uma visão geral de tudo que você tem que fazer? O dashboard mostra todas as matérias que você está cursando, seus próximos eventos, todos seus professores e o andamento do seu curso.",
    },
    {
        icon: <FaMapMarkedAlt fontSize={'2.25rem'} color={'#2a4365'}/>,
        title: "Mapa",
        description: "PAP? PPGEA? PQ? Não sabe onde fica? Não se preocupe, temos um mapa para você, onde é possível visualizar os princípais prédios da Rural. E se você quiser, pode até mesmo criar rotas para chegar até o seu destino.",
    },
];
