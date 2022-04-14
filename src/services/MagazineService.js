import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/pis-library/api/v1/magazines/';

class MagazineService{

    get(){
        return axios.get(API_BASE_URL);
    }
}

export default new MagazineService();