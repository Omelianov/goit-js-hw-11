import axios from 'axios'
export { fetchImages }

const API_KEY = '34760614-c151dedd5f6572838af89f3cc';
const BASE_URL = 'https://pixabay.com/api/';

async function fetchImages(queryValue, pageNumber, perPage) {
    const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${queryValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}&per_page=${perPage}`,)
    return response
}