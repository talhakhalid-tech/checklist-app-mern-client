import axios from "axios";
import config from '../config/key'

export default axios.create({
    baseURL: config.ChecklistUserUrl
})