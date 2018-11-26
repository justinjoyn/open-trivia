import {GET_QUESTIONS, ON_GET_QUESTIONS_FAILURE, ON_GET_QUESTIONS_SUCCESS,} from "./actionTypes";

export const questions = (state = {data: null, error: null, isLoading: false}, {type, payload}) => {
    switch (type) {
        case GET_QUESTIONS:
            return {
                ...state,
                isLoading: true
            };
        case ON_GET_QUESTIONS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: payload.data
            };
        case ON_GET_QUESTIONS_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: payload
            };
        default:
            return state;
    }
};
