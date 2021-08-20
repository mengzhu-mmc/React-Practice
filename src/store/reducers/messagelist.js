export default function messageList(state={
    messageList: [],
    messagePage: 1,
    loading: false,
    loadEnd: false
}, action) {
    switch(action.type) {
        case "MESSAGE_LOAD":
            return {
                ...state,
                loading: true
            }
        case "MESSAGE_LOADOVER":
            return {
                ...state,
                loading: false,
                messagePage: ++state.messagePage,
                messageList: state.messageList.concat(action.messageList),
            }
        case "MESSAGE_ADD":
            return {
                ...state,
                messageList: [action.messageList,...state.messageList]
            }
        case "MESSAGE_LOADEND":
            return {
                ...state,
                loadEnd: true
            }
        case "MESSAGE_RESET":
            return {
                messageList: [],
                messagePage: 1,
                loading: false,
                loadEnd: false
            }
    }
    return state
}
