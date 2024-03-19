import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { getItem } from '../../utils/localStorage';
import { useSocket } from '../../hooks/useSocket';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBTextArea,
  MDBCardHeader
} from 'mdb-react-ui-kit';
import { getAllMessages } from '../../api';

interface AppProps {
}

interface AuthResponse {
  username: string;
  email: string;
}

interface Message {
  sender: string;
  receiver: string;
  msg: string;
  date: Date;
}

interface Contact {
  username: string;
  socketID: string;
}

export const Chat: React.FC<AppProps> = () => {
  const [value, setValue] = useState<string>('');
  const [sender, setSender] = useState<string>('');
  const [receiver, setReceiver] = useState<string>('public');
  const [chatListPublic, setChatListPublic] = useState<Message[]>([]);
  const [chatListPrivate, setChatListPrivate] = useState<Message[]>([]);
  const [contactList, setContactList] = useState<Contact[]>([]);
  const [authResponse, setAuthResponse] = useState<AuthResponse | null>(null);
  const [activeContact, setActiveContact] = useState<string | null>('public');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { emit, listen } = useSocket();


  useEffect(() => {
    if (sender && receiver && receiver !== 'public') {
      setIsLoading(true);
      getAllMessages(sender, receiver)
        .then((response) => {
          setChatListPrivate(response);
        })
        .catch((error) => {
          console.error('Error fetching messages:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

  }, [sender, receiver]);

  useEffect(() => {
    const authResponseFromLocalStorage = getItem('token');
    const parsedAuthResponse = authResponseFromLocalStorage ? JSON.parse(authResponseFromLocalStorage) : null;
    setAuthResponse(parsedAuthResponse);
  }, []);

  useEffect(() => {
    if (authResponse) {
      setSender(authResponse.username);
    }
  }, [authResponse]);

  useEffect(() => {
    const subscription = listen('contacts').subscribe((data: any) => {
      setContactList(data);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [listen]);


  useEffect(() => {
    const subscription = listen('message').subscribe((data: any) => {
      if (data.receiver === 'public') {
        setChatListPublic(prevChatList => [...prevChatList, data]);
      } else {
        setChatListPrivate(prevChatList => [...prevChatList, data]);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [listen, sender, receiver]);


  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const dataToSend: Message = {
      sender: sender,
      receiver: receiver || 'public',
      msg: value,
      date: new Date()
    };

    emit('private message', dataToSend);
    setValue('');
  }

  const handleContactClick = (clickedUsername: string) => {
    setActiveContact(clickedUsername === 'public' ? 'public' : clickedUsername);
    setReceiver(clickedUsername);
  };

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setValue(event.target.value);
  }

  const groupedPublicMessages: any = {};
  chatListPublic.forEach((chat) => {
    const date = new Date(chat.date).toLocaleDateString();
    if (!groupedPublicMessages[date]) {
      groupedPublicMessages[date] = [];
    }
    groupedPublicMessages[date].push(chat);
  });

  const sortedPublicDates = Object.keys(groupedPublicMessages).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  const groupedPrivateMessages: any = {};
  chatListPrivate.forEach((chat) => {
    const date = new Date(chat.date).toLocaleDateString();
    if (!groupedPrivateMessages[date]) {
      groupedPrivateMessages[date] = [];
    }
    groupedPrivateMessages[date].push(chat);
  });

  const sortedPrivateDates = Object.keys(groupedPrivateMessages).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  console.log(isLoading);
  return (
    <MDBContainer fluid className="py-5" style={{ backgroundColor: '#eee', height: '93vh' }}>
      <MDBRow>
        <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
          <MDBCard>
            <MDBCardBody>
              <MDBTypography listUnStyled className="mb-0">
                <MDBCard style={{
                  border: 'none',
                  backgroundColor: activeContact === 'public' ? '#f0f0f0' : '',
                  transition: 'background-color 0.3s'
                }} className="w-100">
                  <li key="public" className="d-flex justify-content-between mb-4"
                      onClick={() => handleContactClick('public')}>
                    <MDBTypography>
                      <p className="fw-bold mb-0">Public Chat</p>
                    </MDBTypography>
                  </li>
                </MDBCard>
                {contactList.filter(contact => contact.username !== sender).map((contact, index) => (
                  <li key={index} className={`d-flex justify-content-between mb-4 `}
                      onClick={() => handleContactClick(contact.username)}>
                    <MDBCard style={{
                      border: 'none',
                      backgroundColor: activeContact === contact.username ? '#f0f0f0' : '',
                      transition: 'background-color 0.3s'
                    }} className="w-100">
                      <MDBCardBody style={{ display: 'flex' }}>

                        <img src={`https://robohash.org/${sender}.png?set=set4`} alt="avatar"
                             className="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60" />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <MDBTypography>
                            <p className="fw-bold mb-0">{contact.username}</p>
                          </MDBTypography>
                        </div>
                      </MDBCardBody>
                    </MDBCard>
                  </li>
                ))}
              </MDBTypography>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol md="6" lg="7" xl="8">
          <MDBTypography listUnStyled>
            <MDBCard>
              <MDBCardHeader className="bg-white d-flex justify-content-between">
                <p className="fw-bold mb-0">Chat</p>
              </MDBCardHeader>
              <MDBCardBody style={{ height: '60vh', overflowY: 'scroll' }}>
                <MDBTypography listUnStyled className="mb-0">
                  {activeContact === 'public' ? sortedPublicDates.map((date, index) => (
                    <li key={index} className="mb-4">
                      <MDBTypography style={{
                        display: 'flex',
                        justifyContent: 'center'
                      }}>
                        <p style={{
                          backgroundColor: '#e7e7e7',
                          borderRadius: '10px',
                          padding: '10px',
                          textAlign: 'center',
                          margin: '10px 0',
                          width: 'fit-content'
                        }} className="fw-bold mb-0">{date}</p>
                      </MDBTypography>
                      {groupedPublicMessages[date].map((chat: Message, index: number) => (
                        <li style={{
                          display: 'flex',
                          justifyContent: chat.sender === sender ? 'flex-start' : 'flex-end',
                          alignItems: 'center'
                        }} key={index} className="d-flex mb-4">
                          <MDBTypography>
                            <img src={`https://robohash.org/${chat.sender}.png?set=set4`} alt="avatar"
                                 className="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60" />
                          </MDBTypography>
                          <MDBTypography style={{
                            backgroundColor: chat.sender === sender ? '#86bb71' : '#f0f0f0',
                            borderRadius: '20px',
                            padding: '10px'
                          }}>
                            <p className="fw-bold mb-0">{chat.sender}</p>
                            <p className="text-muted small mb-0">
                              <MDBIcon far
                                       icon="clock" /> {new Date(chat.date).toLocaleTimeString()}
                            </p>
                            <p className="mb-0">{chat.msg}</p>
                          </MDBTypography>
                        </li>
                      ))}
                    </li>
                  )) : sortedPrivateDates.map((date, index) => (
                    isLoading ? <p>Loading...</p> :
                      <li key={index} className="mb-4">
                        <MDBTypography style={{
                          display: 'flex',
                          justifyContent: 'center'
                        }}>
                          <p style={{
                            backgroundColor: '#e7e7e7',
                            borderRadius: '10px',
                            padding: '10px',
                            textAlign: 'center',
                            margin: '10px 0',
                            width: 'fit-content'
                          }}
                             className="fw-bold mb-0">{date}</p>
                        </MDBTypography>
                        {groupedPrivateMessages[date].map((chat: Message, index: number) => (
                          <li style={{
                            display: 'flex',
                            justifyContent: chat.sender === sender ? 'flex-start' : 'flex-end',
                            alignItems: 'center'
                          }} key={index} className="d-flex  mb-4">
                            <MDBTypography>
                              <img src={`https://robohash.org/${chat.sender}.png?set=set4`} alt="avatar"
                                   className="rounded-circle d-flex align-self-start me-3 shadow-1-strong" width="60" />
                            </MDBTypography>
                            <MDBTypography style={{
                              backgroundColor: chat.sender === sender ? '#86bb71' : '#f0f0f0',
                              borderRadius: '20px',
                              padding: '10px'
                            }}>
                              <p className="fw-bold mb-0">{chat.sender}</p>
                              <p className="text-muted small mb-0">
                                <MDBIcon far
                                         icon="clock" /> {new Date(chat.date).toLocaleTimeString()}
                              </p>
                              <p className="mb-0">{chat.msg}</p>
                            </MDBTypography>
                          </li>
                        ))}
                      </li>
                  ))}
                </MDBTypography>

              </MDBCardBody>
            </MDBCard>
            <form onSubmit={onSubmit}>
              <MDBTextArea placeholder={receiver ? `Message to ${receiver}` : 'Message to public'} id="textAreaExample"
                           rows={4} value={value} onChange={handleChange} />
              <MDBBtn color="info" rounded className="float-end" type="submit">
                Send
              </MDBBtn>
            </form>
          </MDBTypography>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};