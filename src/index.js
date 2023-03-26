import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";

const API_KEY = '34760614-c151dedd5f6572838af89f3cc';

const formInputRef = document.querySelector('#search-form')
const submitButton = document.querySelector('[type="submit"]')
const divGallery = document.querySelector('.gallery')


const createMarkup = data => {
    console.log(data)
    const markup = data.products.map(({ likes, views, comments, downloads }) => {
        return ` <div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>${likes}</b>
    </p>
    <p class="info-item">
      <b>${views}</b>
    </p>
    <p class="info-item">
      <b>${comments}</b>
    </p>
    <p class="info-item">
      <b>${downloads}</b>
    </p>
  </div>
</div>`
    })
        .join('')
    return markup
}

formInputRef.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const product = axios.get('https://pixabay.com/api/?key=34760614-c151dedd5f6572838af89f3cc&q=yellow+flowers&image_type=photo')
        .then(response => response.data)
        .then(createMarkup)
        .then((markup) => divGallery.insertAdjacentHTML('beforeend', markup))
    console.log(product);
})

// let BASE_URL = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + encodeURIComponent('red roses');
