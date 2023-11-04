import "./message.css"
import { useState,useEffect } from "react"
import SenderMessage from "./SenderMessage"
const Receivermessage = (props)=>{

    console.log("receiver message",props)
    return(
        <div>
      {props.sender_id==props.loginUserId?<SenderMessage chat={props.chat.message} />:<div class="message right"><p class="message-text">{props?.chat?.message}</p></div>
}
      
        </div>
    )
}

export default Receivermessage;