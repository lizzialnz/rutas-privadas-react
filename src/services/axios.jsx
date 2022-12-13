import axios from 'axios'

const axiosPublic = axios.create();
axiosPublic.defaults.baseURL = 'http://localhost:3001/api'

axiosPublic.get('/authapi/security').then((response) => {
    axiosPublic.defaults.headers.common['apikey'] = response.data
});

axiosPublic.defaults.headers.common['Content-Type'] = 'application/json'

axiosPublic.defaults.headers.common['cache-control'] = 'no-cache'

export {
    axiosPublic
}