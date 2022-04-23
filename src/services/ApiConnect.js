import axios from 'axios'
import serviceConfig from "@/services/serviceConfig";

const headers = {
    'Content-Type': 'application/json'
}

export default axios.create({
    baseURL: serviceConfig.hostname,
    timeout: 15000,
    headers: headers
})