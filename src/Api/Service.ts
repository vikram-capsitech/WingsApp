import axios from "axios";

const apiUri = import.meta.env.VITE_SERVER_URI;

class AxiosServiceDef {
  get = async (endpoint: string, token?: string) => {
    const { data } = await axios.get(apiUri + endpoint, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return { result: data };
  };
  
  post = async (endpoint: string, payload: any, token?: string) => {
    const { data } = await axios.post(apiUri + endpoint, payload, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return { result: data };
  };

  postMsg = async (endpoint: string, payload: any, token?: string) => {
    const { data } = await axios.post(apiUri + endpoint, payload, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return { result: data };
  };

  auth = async (endpoint: string, payload: any) => {
    const { data } = await axios.post(apiUri + endpoint, payload, {
      headers: {
        "Content-type": "application/json",
      },
    });
    return { result: data };
  };
}
const AxiosService = new AxiosServiceDef();
export default AxiosService;

//chat object type
export interface IChatMsgObject {
  //chat id for reerence
  chat: string;
  //content of msg
  content: any;
  //for check that msg is seen by receievers
  seenBy: string[];
  // sender id
  owner: string;
  // msg timespan
  updatedAt: string;
  //msg id
  _id: string;
}

export interface IChatMsgs {
  date: string;
  chats: IChatMsgObject[];
}

export interface IdNameValue<T> {
  _id: string;
  name: string;
  value: T;
}

export interface ISendMsgResponse {
  owner: IdNameValue<string>;
  content: any;
  chat: {
    _id: string;
    name: string;
    users: { _id: string; name: string; email: string; pic: string }[];
    updatedAt: string;
  };
  seenBy: string[];
  _id: string;
  updatedAt: string;
}

export interface IGroupType {}
