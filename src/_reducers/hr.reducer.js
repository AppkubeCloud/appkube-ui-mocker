
export function hr(state = {}, action) {
    return {
        ...state,
        ...action.data
    }
}