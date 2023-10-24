import { Label, Textarea } from 'flowbite-react';
import "./message.css"
import io from 'socket.io-client';
import { Button } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { useEffect ,useState} from 'react';
import { apiCall } from '../../utils/Utils';
import TypeingIcon from "../typeing-icon/TypeingIcon"
var socket, selectedChatCompare;
const Message = (props)=>{
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [socketConnected, setSocketConnected] = useState(false);
    const [istyping, setIsTyping] = useState(false);
    const [userData,setUserData] = useState()
   
   
   // console.log(" props",props.userId)
    // io('http://localhost:4999',{ transports: ['websocket', 'polling', 'flashsocket'] }); // Replace with your server URL
    useEffect(() => {
      if(props?.chatMessage){
        setMessages(props?.chatMessage)
      }
       socket = io('http://localhost:9999',{ transports: ['websocket', 'polling', 'flashsocket'] })
      socket.emit("setup",props.userId);
      socket.on("connected", () => setSocketConnected(true));
      socket.on("typing", () => setIsTyping(true));
      socket.on("stop typing", () => setIsTyping(false));
       const userInfo =  JSON.parse(localStorage.getItem('getToken'));
       setUserData(userInfo)
      // eslint-disable-next-line
    }, []);

    useEffect(() => {
      console.log(" hello ",messages)
      socket.on("message recieved", (newMessageRecieved) => {
        console.log(" Message recived",newMessageRecieved)
        setMessages([...messages, newMessageRecieved]);
        console.log("  recived ked bad",messages)
        
      });
    },[messages]);
  
    
      const sendMessage =async () => {
       // join room 
       socket.emit("stop typing",userData.id);
       setIsTyping(false)
       const payload = {
        receiver_id:userData.id,
        sender_id:props.userId,
        message:message
       }
      // console.log("-------- hello",payload)
      socket.emit("new message", payload);
        setMessages([...messages, payload]);
        const mesaageRes = await apiCall("POST",`/user/send-message`,payload,true);
       // console.log("-------- message Res",mesaageRes)
        setMessage('');
      };


    const handleInputMessage = ($event)=>{
      setIsTyping(true)
      socket.emit("typing",userData.id);
      
      setMessage($event.target.value)
    }
      
    
    const handleRedirect = ()=>{
        props.handlePages()
    }
     return(
     <div class="grid grid-rows-2 grid-flow-col gap-1">
       
     <div class="row-span-6 ..."></div>
 <div class="col-span-0">
 
 <div class="chat-box">
  
    
        <div class="chat-header">
      <span onClick={handleRedirect}>
        <FaArrowCircleLeft className="h-7 w-7"/>
      </span>
            Chat With {props?.name}
        </div>
        <div class="chat-messages">
        <ul>
          {messages?.map((msg, index) => (
            <li key={index}>{msg.message}</li>
          ))}
        </ul>
        {istyping ? <TypeingIcon/>:'' }
       
        
        </div>
        <div class="message-input">
            <input type="text"
             onChange={($event)=>handleInputMessage($event)} 
             value={message}
            placeholder="Type your message..."/>
            <button onClick={sendMessage}>Send</button>
        </div>
    </div>
    </div>
     </div>
     )
}


export default Message;