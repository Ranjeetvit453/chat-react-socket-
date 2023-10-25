import "./message.css"
const Receivermessage = (props)=>{
    console.log(" massageReceivermessage ",props)
    return(
        <div>
            <div class="message left">
        <p class="message-text">{props?.chat}</p>
      </div>
        </div>
    )
}

export default Receivermessage;