import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";

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
    const product = axios.get('https://pixabay.com/api/')
        .then(response => response.data)
        .then(createMarkup)
        .then((markup) => divGallery.insertAdjacentHTML('beforeend', markup))

})
console.log(product);