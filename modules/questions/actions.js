import {actionCreator} from "../../common/utils";
import {GET_QUESTIONS, ON_GET_QUESTIONS_FAILURE, ON_GET_QUESTIONS_SUCCESS,} from "./actionTypes";

export const getQuestions = actionCreator(GET_QUESTIONS);
export const onGetQuestionsFailure = actionCreator(ON_GET_QUESTIONS_FAILURE);
export const onGetQuestionsSuccess = actionCreator(ON_GET_QUESTIONS_SUCCESS);
