import axios from 'axios'
import serviceConfig from "@/services/serviceConfig";


export default axios.create({
    baseURL: serviceConfig.hostname,
    timeout: 5000

})