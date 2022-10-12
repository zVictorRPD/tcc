import { NextPage } from "next";
import DragDropMainContainer from "../../src/components/Logged/Curriculum/DragDropMainContainer";
import { CurriculumProvider } from "../../src/components/Logged/Curriculum/curriculumContext";
import AddSubjectModal from "../../src/components/Logged/Curriculum/AddSubjectModal";

const Curriculum: NextPage = () => {
    return (
        <CurriculumProvider>
            <DragDropMainContainer />
            <AddSubjectModal />
        </CurriculumProvider>
    );
};

export default Curriculum;