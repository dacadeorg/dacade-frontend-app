import { Course, LearningModule } from "@/types/course";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    learningModules: LearningModule[] | null;
    courses: Course[] | null;
    loading: boolean
}
const initialState: InitialState = {
    learningModules: null,
    courses: null,
    loading: false
}
const learningMaterialsSlice = createSlice({
    name: "learningMaterials",
    initialState,
    reducers: {
        setCourseList: (state, action) => {
            state.courses = action.payload
        },
        setLearningModulesList: (state, action) => {
            state.learningModules = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        }
    }
})

export const { setCourseList, setLearningModulesList, setLoading } = learningMaterialsSlice.actions

export default learningMaterialsSlice