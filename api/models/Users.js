import { model, Schema } from 'mongoose';

const Users = model('User', new Schema({
  _id: String,
  name: String,
  direction: { type: String, default: '' },
  coords: {
    x: { type: String, default: '' },
    y: { type: String, default: '' },
  },
  hints: Array,
}));

export default Users;