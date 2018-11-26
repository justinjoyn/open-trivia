import {catchError, map, switchMap, tap} from "rxjs/operators";
import {fromPromise} from "rxjs/observable/fromPromise";
import {of} from "rxjs/observable/of";
import {ofType} from "redux-observable";

import {GET_QUESTIONS} from "./actionTypes";
import {onGetQuestionsFailure, onGetQuestionsSuccess} from "./actions";
import {handleResponse} from "../../common/utils";
import {getQuestions$$} from "./api";

export const getQuestions$ = action$ => {
    return action$.pipe(
        ofType(GET_QUESTIONS),
        switchMap(({payload}) => {
            return fromPromise(getQuestions$$(payload)).pipe(
                tap(console.log),
                map(response =>
                    handleResponse(response, onGetQuestionsSuccess, onGetQuestionsFailure)
                ),
                catchError(err => of(onGetQuestionsFailure(err)))
            );
        })
    );
};
