export function emailValidation(value) {
  return value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
}
export function minLength(value, data) {
  return value.length >= data.min ? true : false;
}

export {createUser, getData, createFood, createRes} from './firebaseHelper';
