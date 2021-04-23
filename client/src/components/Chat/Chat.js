import React from 'react';
import './style/ChatStyle.scss'


export class Chat extends React.Component{

    componentDidMount() {
        const socket = new WebSocket("ws://localhost:3001");
        socket.onopen = () => {
            console.log("Connected by Websocket")
        }
    }


    render(){
        return(
            <div >
                <div className={"Chat__wrapper"}>
                    <div className={"Chat"}>
                        <div className={"Chat__messages"}>сообщения</div>
                        <div className={"Chat__wrapperForButtons"}>
                            <input className={"Chat__input"}/>
                            <button className={"Chat__button"}>Отправить</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}