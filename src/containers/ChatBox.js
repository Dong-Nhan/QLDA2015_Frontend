import React from 'react';
import './ChatBox.css';
import MessageInput from './MessageInput.js';
import MessageContainer from './MessageContainer.js';
import { connect } from 'react-redux';
import { messageActions } from '../actions/messageActions';
import helpers from '../helpers/helpers.js';
import config from '../config';
import { setSignUpFalse } from '../actions';

const GVTV = 'gvtuvan';
class ChatBox extends React.Component {
    decodeMessage(message) {
        let msg;
        msg = JSON.parse(message);
        return msg;
    }

    componentDidMount = () => {
        if (this.props.isLoggedIn && this.props.userName !== GVTV && this.props.userName.length !== 0 && this.props.connection === null) {
            this.connectServer();
            var payload = {
                isOpen: false
            }
            this.props.actionMinitureChatBox(payload);
        }
    }

    componentDidUpdate = () => {
        if (!this.props.isLoggedIn && this.props.connection !== null) {
            if (this.props.connection) {
                this.props.connection.close()
            }

            let payload = {
                isOpen: false
            }
            this.props.actionMinitureChatBox(payload);
            payload = {
                listMessages: null
            }
            this.props.actionSetListMessages(payload);
        }

        if (this.props.isLoggedIn && this.props.userName !== GVTV && this.props.userName && this.props.connection === null) {
            // console.log("connect server")
            this.connectServer();
            let payload = {
                isOpen: false
            }
            this.props.actionMinitureChatBox(payload);
        }

        if (this.props.connection && this.props.isSignUp && this.props.userName) {
            var message = {
                token: this.props.accessToken,
                type: helpers.TYPE_MESSAGE_CREATE_USER,
                data: {
                    id: this.props.userId,
                    userName: this.props.userName,
                    isOnline: true
                }
            }
            this.props.connection.send(JSON.stringify(message));
            // console.log("send user: " + this.props.userName);
            let payload = {
                isSignUp: false
            }
            this.props.setSignUpFalse(payload);
        }
    }

    handleMiniatueChatBox = () => {
        let payload = {
            isOpen: !this.props.isOpen
        }
        this.props.actionMinitureChatBox(payload);

        // if(this.props.isLoggedIn && this.props.listMessages === null){
        //     this.handleGetAllMessage();
        // }
    }

    handleMessage = (message) => {
        const msg = this.decodeMessage(message);
        const type = msg.type;
        var payload;

        switch (type) {
            case helpers.TYPE_MESSAGE_ID_GV:
                payload = {
                    idGVTV: msg.idGVTV
                }
                this.props.actionSetIdGVTV(payload);
                if (this.props.isLoggedIn && this.props.listMessages === null) {
                    console.log("get all message");
                    this.handleGetAllMessage();
                }
                break;
            case helpers.TYPE_MESSAGE_CREATE:
                var messageTmp = {
                    _id: msg._id,
                    idChannel: msg.idChannel,
                    idSender: msg.idSender,
                    data: msg.data,
                    create: msg.create
                }
                payload = {
                    newMessage: messageTmp
                }
                if (this.props.listMessages !== null) {
                    this.props.actionsAddNewMessage(payload);
                }
                break;
            default: console.log('arg');
        }
    }

    connectServer = () => {
        const ws = new WebSocket('ws:' + config.CHAT_SOCKET);
        ws.onopen = () => {
            console.log("connect socket");
            let payload = {
                connection: ws
            }
            this.props.actionSetConnection(payload);
            //gui message auth
            var message = {
                token: this.props.accessToken,
                type: helpers.TYPE_MESSAGE_AUTH,
                idReceiver: "",
                data: "authentication"
            }
            this.props.connection.send(JSON.stringify(message));
            console.log("send auth")
        }

        ws.onmessage = (event) => {
            const message = event.data;
            // console.log(message);
            this.handleMessage(message);
        }

        ws.onclose = () => {
            let payload = {
                connection: null
            }
            this.props.actionSetConnection(payload);
            console.log("disconnect socket");
        }
    }

    disconnectServer = () => {

    }

    handleGetAllMessage = () => {
        var idChannel = (this.props.idGVTV > this.props.userId) ? this.props.idGVTV + this.props.userId :
            this.props.userId + this.props.idGVTV;
        var payload = {
            idChannel: idChannel
        }
        console.log("id channel: " + idChannel);
        this.props.actionGetAllMessageOfChannel(payload);
    }

    render() {
        const isOpen = this.props.isOpen;

        return (
            <div className="container-fluid">
                <div className="row justify-content-end">
                    {isOpen ?
                        <div className="col-3 container-chatbox">
                            <div className="box-shadow">
                                <div className="title-chatbox">
                                    <div className="name-title">Chat box</div>
                                    <div className="icon-min">
                                        <img alt="" src="/images/icons8-horizontal-line-26.png" onClick={this.handleMiniatueChatBox}></img>
                                    </div>
                                </div>
                                <div className="content-message">
                                    <MessageContainer></MessageContainer>
                                </div>
                                <MessageInput></MessageInput>
                            </div>
                        </div>
                        :
                        <div className="col-3 container-chatbox-mini">
                            <div className="title-chatbox">
                                <div className="name-title">Chat box</div>
                                <div className="icon-min">
                                    <img alt="" src="/images/icons8-horizontal-line-26.png" onClick={this.handleMiniatueChatBox}></img>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isOpen: state.messageReducer.isOpen,
    isLoggedIn: state.auth.isLoggedIn,
    userName: state.profile.userName,
    connection: state.messageReducer.connection,
    idGVTV: state.messageReducer.idGVTV,
    accessToken: state.auth.accessToken,
    listMessages: state.messageReducer.listMessages,
    userId: state.profile._id,
    isSignUp: state.auth.isSignUp,
})

const mapDispatchToProps = (dispatch) => ({
    actionMinitureChatBox: (payload) => dispatch(messageActions.actionMiniatureChatBox(payload)),
    actionSetConnection: (payload) => dispatch(messageActions.actionSetConnection(payload)),
    actionSetIdGVTV: (payload) => dispatch(messageActions.actionSetIdGVTV(payload)),
    actionGetAllMessageOfChannel: (payload) => dispatch(messageActions.actionGetAllMessageOfChannel(payload)),
    actionsAddNewMessage: (payload) => dispatch(messageActions.actionsAddNewMessage(payload)),
    actionSetListMessages: (payload) => dispatch(messageActions.actionSetListMessages(payload)),
    setSignUpFalse: (payload) => dispatch(setSignUpFalse(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatBox);
