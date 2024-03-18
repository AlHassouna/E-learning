import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { getItem } from '../../../utils/localStorage';
import { useSocket } from '../socket-io-service';

// import { MDBAvatar } from 'mdbreact';
import './MyForm.css';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBTypography,
  MDBInputGroup,
} from "mdb-react-ui-kit";

interface AppProps {};

interface AuthResponse {
  username: string;
  email: string;
}

interface DataSend {
  Email: string;
  Value: string;
}

interface DataSendPriv {
  sender: string;
  receiver: string;
  msg: string;
  date: Date; // Corrected type
}

export const MyForm: React.FC<AppProps> = () => {
  const [value, setValue] = useState<string>('');
  const [Sender, setSender] = useState<string>('');
  const [Receiver, setReceiver] = useState<string>('');

  const [chatList, setChatList] = useState<any[]>([]);
  const [contactList, setContactList] = useState<any[]>([]);
  const [authResponse, setAuthResponse] = useState<AuthResponse | null>(null);
  const { emit, listen, socketId } = useSocket();
  const socketIDNEW = socketId;
  const [publicChatFlag,setPublicChatFlag]=useState<boolean>(true)
const [privatData,setPrivatData]=useState<DataSendPriv>();
  useEffect(() => {
    const authResponseFromLocalStorage = getItem('token');
    const parsedAuthResponse = authResponseFromLocalStorage ? JSON.parse(authResponseFromLocalStorage) : null;
    setAuthResponse(parsedAuthResponse);
    
  }, []);
 
  useEffect(()=>{
    if(authResponse){
      setSender(authResponse.username)
      }
    setPrivatData(  {
      sender: Sender,
      receiver: Receiver||"public",
                msg: value,
          date: new Date()
        });
  }, [Receiver, Sender, authResponse, value]);
  useEffect(() => {
    const subscription2 = listen('contacts').subscribe((data: any) => {
      setContactList(data);
      console.log(data);
    });

    return () => {
      subscription2.unsubscribe();
    };
  }, [listen]);

  useEffect(() => {
    const subscription = listen('message').subscribe((data: any) => {
    //  console.log(data)
      setChatList((prevChatList) => [...prevChatList, data]);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [listen]);

  function onSubmit( event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    console.log(value);
    setPrivatData(  {
      sender: Sender,
      receiver: Receiver,
                msg: value,
          date: new Date()
        });
        // console.log(privatData);

    if (privatData?.msg!=null) {
      // const dataSend: DataSend = { Email: authResponse.username, Value: value };
      if (privatData) { // Check if privatData is defined
        emit('private message', privatData); // Use privatData instead of privatData
      }
    }
    setValue('');
  }
  
  
  
  const handleContactClick = (event: React.MouseEvent<HTMLButtonElement>, clickedUsername: string) => {
    event.preventDefault();
    console.log(value," value");
    
    if (authResponse && clickedUsername) {
      if (clickedUsername !== authResponse.username) {
        console.log("first");
       setSender(authResponse.username)
       setReceiver(clickedUsername)
        setPrivatData(  {
          sender: Sender,
          receiver: Receiver,
          msg: value,
          date: new Date()
        });
        // emit('private message', dataSend1);
      }
    }
  };
  

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }
  

 
  return (
    <div className='container'>
          <ul>
            {contactList.map((cont, index) => (
              <div key={index} className='online__users' id={cont.id}>
                {cont.username !== authResponse?.username && (
                  <button className="contact-button" onClick={(event) => handleContactClick(event, cont.username)}>
                    {cont.username}
                  </button>
                )}
              </div>
            ))}
          </ul>
          <button  onClick={(event) => handleContactClick(event, "public")}>
          Public Chat
          </button>
          <label className='col-xs-12 col-md-3' >

          <input className='textarea' type="text" value={value} onChange={handleChange} />
          <button className='sendBtn'onClick={onSubmit} type="submit">Submit</button>
        </label>
  
       
        <ul>
          {chatList.map((chat, index) => (
            <div key={index}>
              <p className={chat.sender === (authResponse?.username ?? '') ? 'box1' : 'box2'}>
                {chat.sender} {chat.msg}{chat.date}
              </p>
            </div>
          ))}
        </ul>
      </div>
  );
  
          }  