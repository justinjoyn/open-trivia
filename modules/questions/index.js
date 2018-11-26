import Questions from "./components/Questions";
import * as epics from "./epics";
import * as reducers from "./reducers";
import {combineReducers} from "redux";

export const questionsEpics = Object.values(epics);

export const questions = combineReducers({
    ...reducers
});

export {
    Questions
};
