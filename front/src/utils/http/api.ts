import axios from 'axios'
import { enviroments } from '../env/enviroments'

export const api = axios.create({
  baseURL: enviroments.apiUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})
