import { NextPage } from "next";
import DragDropMainContainer from "../../src/components/Logged/Curriculum/DragDropMainContainer";
import { CurriculumProvider } from "../../src/components/Logged/Curriculum/curriculumContext";

const Curriculum: NextPage = () => {
    return (
        <CurriculumProvider>
            <DragDropMainContainer />
        </CurriculumProvider>
    );
};

export default Curriculum;