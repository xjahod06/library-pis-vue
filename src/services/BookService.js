import axios from 'axios';
import serviceConfig from "@/services/serviceConfig";

const SERVICE_URL = serviceConfig.hostname+'books';

class BookService{

    get() {
        return axios.get(SERVICE_URL + '/');
    }
    post(jsonData){
        return axios.post(SERVICE_URL,jsonData);
    }
    put(jsonData){
        return axios.put(SERVICE_URL,jsonData);
    }
    getId(id){
        return axios.get(SERVICE_URL+'/'+id);
    }
    deleteId(id){
        return axios.delete(SERVICE_URL+'/'+id);
    }

}

export default new BookService();