import axios from 'axios';
import serviceConfig from "@/services/serviceConfig";

const SERVICE_URL = serviceConfig.hostname+'/magazines/';

class MagazineService{

    get(){
        return axios.get(SERVICE_URL);
    }
}

export default new MagazineService();