import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  image: {
    type: String,
  }
});

const User = models.User || model("User", UserSchema)

export default User

// używamy new Schema, co jest bardziej standardowe i zgodne z konwencjami ES6+
//Zalecenia
// Używanie import i new Schema jest bardziej zgodne z nowoczesnymi standardami JavaScript i ES6+.
// Jeśli używasz ES6+ (co jest rekomendowane dla nowoczesnych aplikacji), drugi przykład jest preferowany.

// import mongoose from 'mongoose'

// const UserSchema = mongoose.Schema({
//   email: {
//     type: String,
//     unique: [true, 'Email already exists'],
//     required: [true, 'Email is required!']
//   },
//   username: {
//     type: String,
//     required: [true, 'Username is required!'],
//     match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
//   },
//   image: {
//     type: String,
//   }
// })

// const User = mongoose.models.User || mongoose.model('User', UserSchema)

// export default User