import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/pis-library/api/v1/books';

class BookService{

    getBooks(genre){
        let params = {params:{"genres": genre}};
        return axios.get(API_BASE_URL, params);
    }
}

export default new BookService();