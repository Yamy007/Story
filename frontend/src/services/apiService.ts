import axios from 'axios'
import { baseURL } from '../constant/urls'

export const apiService = axios.create({ baseURL })
