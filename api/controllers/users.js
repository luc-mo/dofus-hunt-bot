import Users from '../models/Users';

const initialValues = {
  coords: {
    x: '',
    y: '',
  },
  direction: '',
  hints: [],
}

export async function createUser(_id, name) {
  try {
    await Users.create({ _id, name });
  } catch(error) {
    console.log(error);
  }
}

export async function findUser(_id) {
  try {
    return await Users.findById(_id);
  } catch(error) {
    console.log(error);
  }
}

export async function resetUserValues(_id) {
  try {
    await Users.findByIdAndUpdate(_id, initialValues);
  } catch(error) {
    console.log(error);
  }
}