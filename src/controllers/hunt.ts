import { UserInterface } from 'types/users'
import { Coordinates, UpdateCoordinate, UpdateDirection } from 'types/hunt'
import { UsersModel } from 'models/Users'

export module Hunt {
  export const getCoordinateName = (coordinates: Coordinates): string => `[${coordinates.x},${coordinates.y}]`

  export const getNewCoordinates = (coordinates: Coordinates, direction: string, mapCount: number): Coordinates => {
    const xNumber = parseInt(coordinates.x)
    const yNumber = parseInt(coordinates.y)
    switch (direction) {
      case 'top':
        return { x: coordinates.x, y: (yNumber - mapCount).toString() }
      case 'left':
        return { x: (xNumber - mapCount).toString(), y: coordinates.y }
      case 'right':
        return { x: (xNumber + mapCount).toString(), y: coordinates.y }
      case 'bottom':
        return { x: coordinates.x, y: (yNumber + mapCount).toString() }
      default:
        return { x: '', y: '' }
    }
  }

  export const updateCoordinateX = async(data: UpdateCoordinate): Promise<void> => {
    try {
      const { _id, coordinates, x } = data
      await UsersModel.findByIdAndUpdate(_id, { coordinates: { ...coordinates, x }}, { new: true })
    } catch (error: any) {
      throw new Error(error)
    }
  }

  export const updateCoordinateY = async(data: UpdateCoordinate): Promise<void> => {
    try {
      const { _id, coordinates, y } = data
      await UsersModel.findByIdAndUpdate(_id, { coordinates: { ...coordinates, y }}, { new: true })
    } catch (error: any) {
      throw new Error(error)
    }
  }

  export const updateBothCoordinates = async(data: UpdateCoordinate): Promise<void> => {
    try {
      const { _id, coordinates } = data
      await UsersModel.findByIdAndUpdate(_id, { coordinates }, { new: true })
    } catch (error: any) {
      throw new Error(error)
    }
  }

  export const updateDirection = async(data: UpdateDirection): Promise<UserInterface> => {
    try {
      const { _id, direction } = data
      const updatedUser = await UsersModel.findByIdAndUpdate(_id, { direction }, { new: true }) as UserInterface
      return updatedUser!
    } catch (error: any) {
      throw new Error(error)
    }
  }
}