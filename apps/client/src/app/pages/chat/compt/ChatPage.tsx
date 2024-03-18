// import React, { useEffect, useState } from 'react';
// import ChatBar from './ChatBar';
// import ChatBody from './ChatBody';
// import ChatFooter from './ChatFooter';

// interface Message {
//   text: string;
//   name: string;
//   id: string;
//   socketID: string;
// }

// interface ChatPageProps {
//   socket: any; // Assuming socket is of any type for now, you should replace it with the actual type
// }

// export const ChatPage: React.FC<ChatPageProps> = ({ socket }) => {
//   const [messages, setMessages] = useState<Message[]>([]);

//   useEffect(() => {
//     const messageHandler = (data: Message) => {
//       setMessages(prevMessages => [...prevMessages, data]);
//     };

//     socket.on('messageResponse', messageHandler);

//     return () => {
//       socket.off('messageResponse', messageHandler);
//     };
//   }, [socket]);

//   return (
//     <div className="chat">
//       <ChatBar socket={socket} />
//       <div className="chat__main">
//         <ChatBody messages={messages} />
//         <ChatFooter socket={socket} />
//       </div>
//     </div>
//   );
// };

