import { post } from './api'

export function registerUser({ firstName, lastName, mobileNumber, email, password, dob, gender, area, address, pincode }) {
  return post('/users/register', {
    firstName,
    lastName,
    mobileNumber,
    email,
    password,
    dob,
    gender: gender.toUpperCase(),
    area,
    address,
    pincode,
  })
}

export function loginUser({ email, password }) {
  return post('/users/login', { email, password, sourceScreen: 'USER' })
}
