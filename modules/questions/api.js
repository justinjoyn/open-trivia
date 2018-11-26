import axios from "axios";
import {BASE_URL, USERS} from "../../common/constants";

export const getQuestions$$ = payload => {
    let params = [
        "amount=50",
        "category=9",
        "type=multiple"
    ].join('&');

    return axios({
        method: "GET",
        url: BASE_URL + `?${params}`,
        data: payload
    }).then(response => response).catch(error => error);
};
