import "./message.css"
const SenderMessage = (props)=> {
  console.log("Sender message",props)
    return(<div>
        <div class="message left">
      <p class="message-text">{props.chat}</p>
      </div>
    </div>)
}

export default SenderMessage;