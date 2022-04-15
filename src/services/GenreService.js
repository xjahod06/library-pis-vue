import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/pis-library/api/v1/genres/';

class GenreService{

    getName(id){
        return axios.get(API_BASE_URL+id);
    }

}

export default new GenreService();