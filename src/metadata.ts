/* eslint-disable */
export default async () => {
    const t = {};
    return { "@nestjs/swagger": { "models": [[import("./dtos/survey.dto"), { "SurveyDto": { id: { required: true, type: () => Number }, title: { required: true, type: () => String }, description: { required: true, type: () => String }, status: { required: true, type: () => String }, createdAt: { required: true, type: () => String }, updatedAt: { required: true, type: () => String } } }]], "controllers": [[import("./controllers/survey.controller"), { "SurveyController": { "getAll": {} } }]] } };
};