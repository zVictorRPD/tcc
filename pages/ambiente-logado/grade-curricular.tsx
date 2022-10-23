import { NextPage } from "next";
import DragDropMainContainer from "../../src/components/Logged/Curriculum/DragDropMainContainer";
import { CurriculumProvider } from "../../src/components/Logged/Curriculum/curriculumContext";
import AddSubjectModal from "../../src/components/Logged/Curriculum/AddSubjectModal";
import SubjectModal from "../../src/components/Logged/Curriculum/SubjectModal/SubjectModal";
import SelectCurriculumModal from "../../src/components/Logged/Curriculum/SelectCurriculumModal";

const Curriculum: NextPage = () => {
    return (
        <CurriculumProvider>
            <DragDropMainContainer />
            <AddSubjectModal />
            <SubjectModal />
            <SelectCurriculumModal />
        </CurriculumProvider>
    );
};

export default Curriculum;