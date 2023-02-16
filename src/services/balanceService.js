import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v0/';

class BalanceService {
  getBalanceById(id) {
    return axios.get(API_URL+ "balance?userId="+id);
  }
  addAmount(id, amount) {
    return axios.post(API_URL+ "balance?userId="+id+"&amount="+amount);
  }
}

export default new BalanceService();
