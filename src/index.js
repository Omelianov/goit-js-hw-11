import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const API_KEY = '34760614-c151dedd5f6572838af89f3cc';
const BASE_URL = 'https://pixabay.com/api/';
const perPage = 40
let page;

const formInputRef = document.querySelector('#search-form')
const formInputValue = document.querySelector('.input')
const submitButton = document.querySelector('[type="submit"]')
const divGallery = document.querySelector('.gallery')
const galleryEl = document.querySelector('.gallery .a')


formInputRef.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const formData = new FormData(formInputRef);
  const queryValue = formData.get('searchQuery').trim()
  if (!queryValue) {
    alert('Enter smt')
    return;
  }
  console.log(queryValue);

  let product = axios.get(`${BASE_URL}?key=${API_KEY}&q=${queryValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`)
    .then(result => result.data)
    .then(createMarkup)
    .then((markup) => { divGallery.insertAdjacentHTML('beforeend', markup) })
  console.log(product);

})

const createMarkup = (data) => {
  console.log(data)
  if (data.total === 0) {
    alert('Sorry, there are no images matching your search query. Please try again.')
  }
  console.log(data.total)
  const markup = data.hits.map(({ id, largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
    return `<a class="gallery__link" href="${largeImageURL}">
          <div class="gallery-item" id="${id}">
            <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item"><b>Likes</b>${likes}</p>
              <p class="info-item"><b>Views</b>${views}</p>
              <p class="info-item"><b>Comments</b>${comments}</p>
              <p class="info-item"><b>Downloads</b>${downloads}</p>
            </div>
          </div>
        </a>`
  })
    .join('')
  return markup
}
