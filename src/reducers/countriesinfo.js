const initialState = {
    countriesStatus: []
};
export default function (state = initialState, action) {
    switch (action.type) {
        case "GET_COUNTRIES_STATUS":
            return{
             countriesStatus: action.data
            }
        case "GET_STATS_BY_DATE":
            return{
                countriesStatus: action.data
            }
        default:
            return state;
    }
}

