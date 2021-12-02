import axios from 'axios';
import { ApiConstants } from 'constants/api';

// TODO: it could be a good idea to set up a yarn workspace, create a `common` directory and put all these TypeScript definitions for data models in that directory so they can be shared between client and server (since both use TypeScript)
// This would also also make input validation easier -- you write it once for both client and server rather than doing both independently.

export interface User {
    username: string;
    email: string;
    password: string;
}

export interface Lesson {
    _id: string;
    topicId: string;
    title: string;
    rawMarkdown: string;
    creatorId: string;
    quizzes: Quiz[];
}

export interface Topic {
    _id: string;
    title: string;
    description: string;
    courses: string[];
    videos: string[];
    sourceCodeIds: string[];
    image: string;
}

export interface SourceCode {
    _id: string;
    topicId: string;
    title: string;
    code: string;
}

export interface Quiz {
    _id: string;
    type: string;
    data: string; // This is a stringified object
}

interface MultipleChoiceQuizData {
    question: string;
    rawMarkdown: string;
    choices: string[];
    answers: string[];
    correctMessage: string;
    incorrectMessage: string;
    explanation: string;
}

interface TrueFalseQuizData {
    question: string;
    rawMarkdown: string;
    isTrue: boolean;
    correctMessage: string;
    incorrectMessage: string;
    explanation: string;
}

interface QuestionAnswerQuizData {
    question: string;
    rawMarkdown: string;
    answer: string;
    correctMessage: string;
    incorrectMessage: string;
    explanation: string;
}

type GetLessons = (topicId: string) => Promise<Lesson[]>;
type GetQuizzes = (lessonId: string) => Promise<Quiz[]>;
type GetTopics = () => Promise<Topic[]>;
type GetSourceCode = (topicId: string) => Promise<SourceCode[]>;

export type TopicForm = Omit<Topic, '_id'>;
export type SourceCodeForm = Omit<SourceCode, '_id'>;
export type LessonForm = Omit<Lesson, '_id'>;
export type QuizForm = Omit<Quiz, '_id'>;

type CreateLesson = (lesson: LessonForm) => Promise<Lesson>;
type CreateQuiz = (lessonId: string, quiz: QuizForm) => Promise<Quiz>;
type CreateTopic = (topic: TopicForm) => Promise<Topic>;
type CreateSourceCode = (sourceCode: SourceCodeForm) => Promise<SourceCode>;

type EditLesson = (lessonId: string, newLesson: LessonForm) => Promise<Lesson>;
type EditQuiz = (quizId: string, newQuiz: QuizForm) => Promise<Quiz>;
type EditTopic = (topicId: string, newTopic: TopicForm) => Promise<Topic>;
type EditSourceCode = (sourceCodeId: string, newSourceCode: SourceCodeForm) => Promise<SourceCode>;

export const getLessons: GetLessons = async (topicId: string) => {
    try {
        const response = await axios.get(`${ApiConstants.URL}/api/lessons?topicId=${topicId}`);
        const lessons: Lesson[] = response.data.lessons as Lesson[];
        return lessons;
    } catch (err) {
        const errMessage: string = err.response.data.statusText;
        throw errMessage;
    }
};

export const getQuizzes: GetQuizzes = async (lessonId: string) => {
    try {
        const response = await axios.get(`${ApiConstants.URL}/api/quiz?lessonId=${lessonId}`);
        const quizzes: Quiz[] = response.data.quizzes as Quiz[];
        return quizzes;
    } catch (err) {
        const errMessage: string = err.response.data.statusText;
        throw errMessage;
    }
};

export const getTopics: GetTopics = async () => {
    try {
        const response = await axios.get(`${ApiConstants.URL}/api/topics`);
        const topics: Topic[] = response.data.topics;
        return topics;
    } catch (err) {
        const errMessage: string = err.response.data.statusText;
        throw errMessage;
    }
};

export const getSourceCodes: GetSourceCode = async (topicId: string) => {
    try {
        const response = await axios.get(`${ApiConstants.URL}/api/source-code?topicId=${topicId}`);
        const sourceCode: SourceCode[] = response.data.sourceCode;
        return sourceCode;
    } catch (err) {
        const errMessage: string = err.response.data.statusText;
        throw errMessage;
    }
};

// TODO: Untested and unimplemented in backend
export const createLesson: CreateLesson = async (lesson: LessonForm) => {
    try {
        const response = await axios.post(`${ApiConstants.URL}/api/lessons`, lesson, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data.lesson as Lesson;
    } catch (err) {
        const errMessage: string = err.response.data.statusText;
        throw errMessage;
    }
};

// TODO: Untested and unimplemented in backend
export const createQuiz: CreateQuiz = async (lessonId: string, quiz: QuizForm) => {
    try {
        const response = await axios.post(
            `${ApiConstants.URL}/api/quiz`,
            {
                lessonId: lessonId,
                ...quiz,
            },
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );
        return response.data.quiz as Quiz;
    } catch (err) {
        const errMessage: string = err.response.data.statusText;
        throw errMessage;
    }
};

// TODO: Untested and unimplemented in backend
export const createTopic: CreateTopic = async (topic: TopicForm) => {
    try {
        const response = await axios.post(`${ApiConstants.URL}/api/topics`, topic, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data.topic as Topic;
    } catch (err) {
        const errMessage: string = err.response.data.statusText;
        throw errMessage;
    }
};

// TODO: Untested and unimplemented in backend
export const createSourceCode: CreateSourceCode = async (sourceCode: SourceCodeForm) => {
    try {
        const response = await axios.post(`${ApiConstants.URL}/api/source-code`, sourceCode, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data.sourceCode as SourceCode;
    } catch (err) {
        const errMessage: string = err.response.data.statusText;
        throw errMessage;
    }
};

// TODO: Untested and unimplemented in backend
export const editLesson: EditLesson = async (lessonId: string, newLesson: LessonForm) => {
    try {
        if (!lessonId) {
            throw new Error("Lesson ID mustn't be empty");
        }
        const response = await axios.put(`${ApiConstants.URL}/api/lessons/${lessonId}`, newLesson, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data.lesson as Lesson;
    } catch (err) {
        const errMessage: string = err.response.data.statusText;
        throw errMessage;
    }
};

// TODO: Untested and unimplemented in backend
export const editQuiz: EditQuiz = async (quizId: string, newQuiz: QuizForm) => {
    try {
        if (!quizId) {
            throw new Error("Quiz ID mustn't be empty");
        }
        const response = await axios.put(`${ApiConstants.URL}/api/quiz/${quizId}`, newQuiz, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data.quiz as Quiz;
    } catch (err) {
        const errMessage: string = err.response.data.statusText;
        throw errMessage;
    }
};

// TODO: Untested and unimplemented in backend
export const editTopic: EditTopic = async (topicId: string, newTopic: TopicForm) => {
    try {
        if (!topicId) {
            throw new Error("Topic ID mustn't be empty");
        }
        const response = await axios.put(`${ApiConstants.URL}/api/topics/${topicId}`, newTopic, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data.topic as Topic;
    } catch (err) {
        const errMessage: string = err.response.data.statusText;
        throw errMessage;
    }
};

// TODO: Untested and unimplemented in backend
export const editSourceCode: EditSourceCode = async (
    sourceCodeId: string,
    newSourceCode: SourceCodeForm
) => {
    try {
        const response = await axios.put(
            `${ApiConstants.URL}/api/source-code/${sourceCodeId}`,
            newSourceCode,
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );
        return response.data.sourceCode as SourceCode;
    } catch (err) {
        const errMessage: string = err.response.data.statusText;
        throw errMessage;
    }
};
