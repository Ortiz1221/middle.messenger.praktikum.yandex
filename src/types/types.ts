import { Socket } from "../modules/socket/Socket";

interface IUser {
  "display_name": null | string,
  "first_name": string,
  "second_name": string,
  avatar: null | string,
  email: string,
  id: number,
  login: string,
  phone: string
}

interface IMsg {
  content: string
  time: string,
  user: IUser
}

interface NewChat {
  chatId: string,
  title: string | null,
  socket: Socket,
  userId?: number,
  msg?: IMsg,
  userName?: string
}

interface IProps {
  events?: {[k: string]: EventListener},
  btn?: {[k: string]: string},
  tmpl?: string,
  searchUserPopup?: {name: string},
  addChatPopupData?: {name: string},
  changeAvatarPopupData?: {name: string},
  currChat?: string | null,
  users?: [],
  data?: {},
  chats?: [],
  user?: IUser,
  socket?: Socket,
  avatar?: string,
  userName?: string
}

export {
    IUser, IMsg, NewChat, IProps,
};
