import "./message.css"
const SenderMessage = (props)=> {
    console.log(" hello sendmessage",props)
    return(<div>
        <div class="message right">
      <p class="message-text">{props.chat}</p>
      </div>
    </div>)
}

export default SenderMessage;