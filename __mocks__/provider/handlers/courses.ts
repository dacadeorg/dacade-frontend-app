import { HttpResponse, http } from "msw";
import { mockCourse, mockLearningModule } from "../../fixtures/course";


const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL


export const coursesHandler = [
    http.get(`${baseUrl}/courses/:slug`, () => {
        return HttpResponse.json(mockCourse);
    }),
    http.get(`${baseUrl}/learning-modules/:id`, () => {
        return HttpResponse.json(mockLearningModule);
    }),
    http.get(`${baseUrl}/courses/:slug/learning-modules`, () => {
        return HttpResponse.json([mockLearningModule]);
    }),
    http.put(`${baseUrl}/interactive-modules/answer`, () => {
        return
    }),
]