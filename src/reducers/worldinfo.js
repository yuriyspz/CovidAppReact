const initialState = {
    worldStatus: []
};
export default function (state = initialState, action) {
    switch (action.type) {
        case "GET_WORLD_STATUS":
            return{
             worldStatus: action.data
            }

        default:
            return state;
    }
}

