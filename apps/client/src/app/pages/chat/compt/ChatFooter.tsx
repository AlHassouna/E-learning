// import React, { useState } from 'react';

// interface ChatFooterProps {
//   socket: any; // Assuming socket is of any type for now, you should replace it with the actual type
// }

// const ChatFooter: React.FC<ChatFooterProps> = ({ socket }) => {
//   const [message, setMessage] = useState<string>(''); // Assuming message is of type string

//   const handleSendMessage = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (message.trim() && localStorage.getItem('userName')) {
//       socket.emit('message', {
//         text: message,
//         name: localStorage.getItem('userName'),
//         id: `${socket.id}${Math.random()}`,
//         socketID: socket.id,
//       });
//     }
//     setMessage('');
//   };

//   return (
//     <div className="chat__footer">
//       {/* Add your chat footer UI elements here */}
//     </div>
//   );
// };

// export default ChatFooter;
