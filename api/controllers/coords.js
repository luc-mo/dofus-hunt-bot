import Users from '../models/Users';

export async function updateCoordX(_id, coords, x) {
  await Users.findByIdAndUpdate(_id, {
    coords: {
      ...coords,
      x,
    }
  });
}

export async function updateCoordY(_id, coords, y) {
  await Users.findByIdAndUpdate(_id, {
    coords: {
      ...coords,
      y,
    }
  });
}

export async function updateCoords(_id, coords) {
  await Users.findByIdAndUpdate(_id, { coords });
}

export async function updateDirection(_id, direction) {
  return await Users.findByIdAndUpdate(_id, { direction }, { new: true });
}

export async function updateHints(_id, hints) {
  return await Users.findByIdAndUpdate(_id, { hints }, { new: true});
}