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
      const users = await User.find({}, { '_id': 0 });
      if (users.length > 0) {
        this.users = users.map(user => user.username);
      } else {
        console.log('No users found');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  }

  async startClient() {
    this.io.on('connection', async (socket: any) => {
      socket.on('msgList', async (data: any) => {
        try {
          const existingUser = await Online.findOne({ username: data.username });
          if (!existingUser) {
            const userData = {
              socketID: socket.id,
              username: data.username
            };
            await Online.create(userData);
            this.users = await Online.find({}, { '_id': 0 });
            this.io.emit('contacts', this.users);
          } else {
            await Online.updateOne({ username: data.username }, { socketID: socket.id });
            this.users = await Online.find({}, { '_id': 0 });
            this.io.emit('contacts', this.users);
          }
        } catch (err) {
          if (err.code === 11000) {
            console.log('Duplicate username:', data.username);
          } else {
            console.error('Error:', err);
          }
        }
      });

      await this.getUsers();

      socket.on('message', (data: any) => {
        this.io.emit('message', data);
      });

      socket.on('disconnect', async () => {
        try {
          await Online.deleteOne({ socketID: socket.id });
          this.users = await Online.find({}, { '_id': 0 });
          socket.broadcast.emit('contacts', this.users);
        } catch (err) {
          console.error('Error:', err);
        }
      });

      socket.on('contactOnlineNow', (userName: any) => {
        this.contactOnline.push(userName);
        console.log('contacts are online', this.contactOnline);
      });

      socket.on('private message', async (dataPrivate) => {
        if (dataPrivate.receiver === 'public') {
          this.io.emit('message', dataPrivate);
        } else {
          try {
            const anotherSocketId = await Online.findOne({ username: dataPrivate.receiver });
            if (anotherSocketId) {
              const messagePrivate = {
                sender: dataPrivate.sender,
                receiver: dataPrivate.receiver,
                msg: dataPrivate.msg,
                date: dataPrivate.date
              };
              socket.emit('message', messagePrivate);
              socket.to(anotherSocketId.socketID).emit('message', messagePrivate);
              await MsgPrivate.create(messagePrivate);
            } else {
              console.log('Receiver not found:', dataPrivate.receiver);
            }
          } catch (err) {
            console.error('Error:', err);
          }
        }
      });
    });
  }
}

export { IoClient };
