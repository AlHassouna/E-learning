// import { Schema, model } from 'mongoose';

// // const bcrypt = require('bcrypt');
// let dataAr = [];
// var UserEmail = [];

// class UsersDataService {
//     constructor() {


        

//         this.UsersSUSchema = new Schema({
//             fname: String,
//             lname: String,
//             phone: Number,
//             email: {
//                 type: String,
//                 required: 'Require e-mail',
//                 unique: true,
//             },
//             password: String,
//         });
//         this.UsersSchema = new Schema({
//             name: String,
//             lname: String,
//             role: {
//                 type: String,
//                 default: 'student',
//                 enum: ['student', 'teacher', 'admin']
//             },
//             phone: String,
//             email: {
//                 type: String,
//                 required: 'Require e-mail',
//                 unique: true,
//             },
//             password: String,
//         });
       

//         this.MessagesSchema = new Schema({
//             name: String,
//             lname: String,
//             data: String,
//             date: String,
//         })
//         this.MessagesPrivateSchema = new Schema({
//             from: String,
//             to: String,
//             data: String,
//             date: String,
//         })

//         this.ChatUserDBSchema = new Schema({
//             fromID: String,
//             data: String,
//             date: String,

//         })

//         this.UserdataSchema = new Schema({
//             id1: {
//                 type: String,
//                 unique: true
//             },
//             name: String,
//             email: {
//                 type: String,
//                 unique: true // `email` must be unique
//             }
//         })

//         //connect shema to DB in mongo
        
//         // mongoose.model('Users2', this.UsersSchema);
//         // this.Users = mongoose.model('Users2');
//         // mongoose.model('UsersSignUp', this.UsersSUSchema);
//         // this.UsersSU = mongoose.model('UsersSignUp');
//         // mongoose.model('Teachers', this.TeacherSchema);
//         // this.Teachers = mongoose.model('Teachers');
       
//         // mongoose.model('messages', this.MessagesSchema);
//         // this.Messages = mongoose.model('messages');
//         // mongoose.model('messagesPrivate', this.MessagesPrivateSchema);
//         // this.MessagesPrivate = mongoose.model('messagesPrivate');
//         // mongoose.model('userdata', this.UserdataSchema);
//         // this.Userdata = mongoose.model('userdata');

//         this.Userdata.remove({}, { "__v": 0 }, (err, usr) => {
//             if (err) {
//                 callback(null, err);
//             }
//             if (usr.length > 0) {
//                 dataAr.push(usr);
//                 console.log(dataAr);
//                 // callback(dataAr, null);

//             }
//         })

//         //////////////
//         this.Users.find({}, { "_id": 0 }, (err, usr) => {
//             if (err) {
//                 callback(null, err);
//             }
//             if (usr.length > 0) {
//                 for (let key in usr) {
//                     usr[key].email;
//                     // console.log("ff", usr[key].email)
//                     mongoose.model(usr[key].email, this.ChatUserDBSchema);
//                     this.UserCHat = mongoose.model(usr[key].email);
//                 }

//                 // callback(usr, null);
//             } else {
//                 callback(null, 'not found');
//             }
//         })

//         /////////

//     }

//     deleteUserdata(idUser) {
//         /// do thometging to find
//         this.Userdata.deleteOne({ id1: idUser }, (err, usr) => {
//             if (err) {
//                 callback(null, err);
//             }
//             if (usr.length > 0) {
//                 dataAr.push(usr);
//                 callback(dataAr, null);

//             }
//         })
//     }



//     findUserdata(username, callback) {
//         /// do thometging to find
//         dataAr = [];
//         this.Userdata.find({}, { "_id": 0 }, (err, usr) => {
//             if (err) {
//                 callback(null, err);
//             }
//             if (usr.length > 0) {
//                 dataAr.push(usr);
//                 callback(dataAr, null);

//             } else {
//                 callback(null, 'not found');
//             }
//         })
//     }


//     ////////////////////
//     findMessagesPrivate(fromID, toID, callback) {
//         /// do thometging to find
//         dataAr = [];

//         console.log(fromID, toID, "the emails for find")
//         this.MessagesPrivate.find({
//             $or: [
//                 { $and: [{ from: fromID }, { to: toID }] },
//                 { $and: [{ from: toID }, { to: fromID }] }
//             ]
//         }, { "_id": 0 }, (err, usr) => {
//             if (err) {
//                 callback(null, err);
//             }
//             if (usr.length > 0) {
//                 dataAr.push(usr);
//                 callback(dataAr, null);

//             } else {
//                 callback(null, 'not found');
//             }
//         })
//     }

//     ///////////////////


//     findMessages(username, callback) {
//         /// do thometging to find
//         dataAr = [];
//         this.Messages.find({}, { "_id": 0 }, (err, usr) => {
//             if (err) {
//                 callback(null, err);
//             }
//             if (usr.length > 0) {
//                 dataAr.push(usr);
//                 callback(dataAr, null);

//             } else {
//                 callback(null, 'not found');
//             }
//         })
//     }

    

//     findUsers(callback) {
//         this.Users.find((err, usr) => {
//             if (err) {
//                 callback(null, err);
//             }
//             if (usr.length > 0) {
//                 for (let key in usr) {
//                     UserEmail = usr[key].email;
//                     // console.log("ff", UserEmail)
//                 }
//                 callback(usr, null);
//             } else {
//                 callback(null, 'not found');
//             }
//         })
//     }

//     findUser(username, callback) {
//         /// do thometging to find
//         this.Users.find({ 'email': username }, (err, usr) => {
//             if (err) {
//                 callback(null, err);
//             }
//             if (usr.length > 0) {
//                 console.log('find user')
//                 callback(usr, null);
//             } else {
//                 callback(null, 'not found');
//             }
//         })
//     }
//     signUp(user, callback) {
//         console.log('line 253 U D S', user)
//         let password = bcrypt.hashSync(user.password, 10);
//         const SignUser = new this.UsersSU({
//             'fname': 'user.fname',
//             'lname': user.lname,
//             'phone': user.phone,
//             'email': user.email,
//             'password': password,
//         });
//         console.log(SignUser, "123123");

//         SignUser.save().then((usr) => {
//             console.log(SignUser, "ljljljljlj");

//             callback(usr, null);
//         }).catch((err) => {
//             callback(null, err)
//         });
//     }


//     addUser(user, callback) {
//         let password = bcrypt.hashSync(user.phone, 10);
//         const finalUser = new this.Users({
//             'name': user.name,
//             'lname': user.lname,
//             'role': user.role,
//             'phone': user.phone,
//             'email': user.email,
//             'password': password,
//         });
//         finalUser.save().then((usr) => {
//             console.log(user);
//             if (user.role === 'teacher') {
//                 const Teacher = new this.Teachers({
//                     companyName: user.company,
//                     user: usr._id,
//                 });
//                 Teacher.save();
//             } else if (user.role === 'admin') {
//                 const Admin = new this.Admins({
//                     department: user.department,
//                     user: usr._id,
//                 });
//                 Admin.save();
//             }
//             callback(usr, null);
//         }).catch((err) => {
//             callback(null, err)
//         });
//     }


//     updateUser(user, callback) {
//         this.Users.updateOne({
//                 'email': user.email
//             }, {
//                 'name': user.name,
//                 'lname': user.lname,
//                 'role': user.role,
//                 'phone': user.phone,
//                 'email': user.email
//             },
//             (err, usr) => {
//                 if (err) {
//                     console.log('error', err);
//                     callback(null, err)
//                 } else {
//                     callback(usr, null)
//                 }
//             }
//         );
//     }

// }

//    export  new UsersDataService()
