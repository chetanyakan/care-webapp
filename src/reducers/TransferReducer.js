import { GET_TRANSFER_LIST, UPDATE_TRANSFER_STATUS, UPDATE_TRANSFER_STATUS_ERROR } from "Reducers/Types";

const transfers = (state = {}, action) => {
    switch (action.type) {
        case GET_TRANSFER_LIST:
            return { 
                ...state,
                ...action.data,
                error_message: {} 
            }; 
        case UPDATE_TRANSFER_STATUS: {
            const newState = {...state};
            const {id, status, status_updated_at, comments } = action.data
            newState.results = newState.results.map(result => {
                if(result.id === id) {
                    result.status = status;
                    result.status_updated_at = status_updated_at;
                    result.comments = comments;
                }
                return result
            });
            newState.update_transfer_errors = {}; 
            return newState;
        }
        case UPDATE_TRANSFER_STATUS_ERROR:
            return { 
                ...state,
                update_transfer_errors: action.data 
            };
        default:
            return state;
    }
};

export { transfers };
