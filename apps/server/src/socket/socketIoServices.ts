import { MsgPrivate, User, Online } from '../models/auth';

class IoClient {
  io: any;
  contactOnline: any[] = [];
  users: string[] = [];

  constructor(io: any) {
    this.io = io;
  }

  async getUsers() {
    try {
      const users = await User.find({}, { "_id": 0 });
      if (users.length > 0) {
        this.users = users.map(user => user.username);
        console.log("Users:", this.users);
      } else {
        console.log('No users found');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  }

  startClient() {
    this.io.on('connection', (socket: any) => {
      socket.on("msgList", async (data: any) => {
        try {
          const userdata = {
            socketID: socket.id,
            username: data.username,
          };
          await Online.create(userdata);
           this.users = await Online.find({}, { "_id": 0 });
          this.io.emit('contacts', this.users);
        } catch (err) {
          console.error('Error:', err);
        }
      });

      this.getUsers();

      console.log('A user connected', socket.id);

      socket.on('message', (data: any) => {
        this.io.emit('message', data);
      });

      // socket.on("msg", (data11: any) => {
      //   this.contactOnline.push(data11.username);
      //   const filtered = this.contactOnline.filter((el: any) => el != null);
      //   this.io.emit('msg', filtered);
      //   this.io.emit('contacts', this.users);
      // });

      socket.on('disconnect', async () => {
        try {
          await Online.deleteOne({ socketID: socket.id });
          this.users = await Online.find({}, { "_id": 0 });

          socket.broadcast.emit('contacts', this.users);
          
        } catch (err) {
          console.error('Error:', err);
        }
      });

      socket.on("contactOnlineNow", (userName: any) => {
        this.contactOnline.push(userName);
        console.log("contacts are online", this.contactOnline);
      });
    
      socket.on("private message", async (dataPrivate) => {
     if(dataPrivate.receiver==="public"){
      this.io.emit('message', dataPrivate);

      console.log("first",dataPrivate)
     }
     else{

      const anotheSocketId = await Online.find({username:dataPrivate.receiver}, { "_id": 0 });
     
     
      const messagePrivate = ({
        sender: dataPrivate.sender,
        receiver: dataPrivate.receiver,
         msg: dataPrivate.msg,
          date: dataPrivate.date,
        });
        // await MsgPrivate.create(messagePrivate);

        console.log(messagePrivate,"user re")
        // messagePrivate.save().then(() => {}).catch(err => { console.log(err) });
        socket.emit("message", messagePrivate);
        socket.to(anotheSocketId[0].socketID).emit("message",  messagePrivate);
     }
      });
    });
  }
}

export { IoClient };
