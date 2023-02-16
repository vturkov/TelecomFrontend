import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v0/call/';

class CallService {
    createCall(callerId, calleeId) {
        return axios.post(API_URL+ "create?callerId="+callerId+"&calleeId="+calleeId);
    }

    stopCall(callId) {
        return axios.post(API_URL+ "stop?callId="+callId);
    }

}

export default new CallService();
