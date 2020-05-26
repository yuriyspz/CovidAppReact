import axios from 'axios';
const baseUrl = 'https://coronavirus-stat.herokuapp.com/';

export const getWorldStatus = () => {
    return dispatch => {
        axios.get(baseUrl + 'history/global')
            .then(res => {
                dispatch({
                    type: "GET_WORLD_STATUS",
                    data: res.data
                })
                }
            );
    };
}
export const getCountriesInfo = () => {
    return dispatch => {
        axios.get(baseUrl + '/history/world/current')
            .then(res => {
                    dispatch({
                        type: "GET_COUNTRIES_STATUS",
                        data: res.data
                    })
                }
            );
    };
}
