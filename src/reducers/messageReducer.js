import {messageConstant} from '../constants/messageConstant.js';

const initalState = {
    message: '',
    listMessages: [],
    isOpen : true,
}

export default function messageReducer(state=initalState, actions){
    switch(actions.type){
        case messageConstant.SET_NEW_MESSAGE:
            return{
                ...state,
                message: actions.payload.message
            };
        case messageConstant.SET_LIST_MESSAGES:
            return {
                ...state,
                listMessages: actions.payload.listMessages
            }
<<<<<<< HEAD
        case messageConstant.MINIATURE_CHATBOX:
            return{
                ...state,
                isOpen: actions.payload.isOpen
            }
=======
>>>>>>> 966d11190e61da42c3297b36841421c985a24c9b
        default:
            return state;
    }   
}
