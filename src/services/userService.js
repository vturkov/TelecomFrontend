import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v0/';

class UserService {
  getAll(){
    return axios.get(API_URL);
  }

  conect(id){
    return axios.post(API_URL+"user/connect?userId="+id);
  }

  disconnect(id){
    return axios.post(API_URL+"user/disconnect?userId="+id);
  }

}

export default new UserService();
