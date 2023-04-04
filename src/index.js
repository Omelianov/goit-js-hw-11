import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

const API_KEY = '34760614-c151dedd5f6572838af89f3cc';
const BASE_URL = 'https://pixabay.com/api/';
const perPage = 40;
let queryValue = '';
let pageNumber = 0;

const formInputRef = document.querySelector('#search-form')
const divGallery = document.querySelector('.gallery')
const loadMoreBtn = document.querySelector('.load-more')
const toUpBtn = document.querySelector('.btn-to-top')

formInputRef.addEventListener('submit', onSearchSmt)
loadMoreBtn.addEventListener('click', onLoadMoreBtn)
window.addEventListener('scroll', onScroll)
toUpBtn.addEventListener('click', onToUpBtn)

let lightbox = new SimpleLightbox('.photo-card a', {
  captionDelay: 250,
});

async function onSearchSmt(ev) {
  ev.preventDefault();
  pageNumber += 1;
  divGallery.innerHTML = '';
  loadMoreBtn.classList.add('is-hidden');
  const formData = new FormData(formInputRef);
  const queryValue = formData.get('searchQuery').trim()
  if (!queryValue) {
    alertEmptyQuery()
    return;
  }
  try {
    const { data } = await fetchImages(queryValue, pageNumber, perPage);
    if (data.totalHits === 0) {
      alertNoImagesFound()
    } else {
      createMarkup(data)
      lightbox.refresh()
      alertTotalImagesFound(data)
      loadMoreBtn.classList.remove('is-hidden')
    }
    divGallery.insertAdjacentHTML('beforeend', createMarkup(data))
  } catch (error) {
    console.log(error);
  }
}

async function onLoadMoreBtn() {
  pageNumber += 1;
  const formData = new FormData(formInputRef);
  const queryValue = formData.get('searchQuery').trim();

  try {
    const { data } = await fetchImages(queryValue, pageNumber, perPage);
    createMarkup(data);
    lightbox.refresh()
    if ((pageNumber * perPage) > data.totalHits) {
      loadMoreBtn.classList.add('is-hidden')
      alertReachedImages()
    }
    divGallery.insertAdjacentHTML('beforeend', createMarkup(data))
  } catch (error) {
  }
}


async function fetchImages(queryValue, pageNumber, perPage) {
  const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${queryValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}&per_page=${perPage}`,)
  return response
}


function createMarkup(data) {
  const markup = data.hits.map(({ id, largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
    return `
    <div class="photo-card">
    <a class="gallery__link" href="${largeImageURL}">
          <div class="gallery-item" id="${id}">
            <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
            <div class="info">
              <p class="info-item"><b>Likes</b>${likes}</p>
              <p class="info-item"><b>Views</b>${views}</p>
              <p class="info-item"><b>Comments</b>${comments}</p>
              <p class="info-item"><b>Downloads</b>${downloads}</p>
            </div>
          </div>
        </a>
        </div>`
  })
    .join('')
  return markup
}


function onScroll() {
  const scrolled = window.pageYOffset
  const coords = document.documentElement.clientHeight

  if (scrolled > coords) {
    toUpBtn.classList.add('btn-to-top--visible')
  }
  if (scrolled < coords) {
    toUpBtn.classList.remove('btn-to-top--visible')

  }
}

function onToUpBtn() {
  if (window.pageYOffset > 0) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}




function alertTotalImagesFound(data) {
  Notiflix.Notify.success(`'Hooray! We found ${data.totalHits} images.'`)
}

function alertNoImagesFound() {
  Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
}

function alertReachedImages() {
  Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
}

function alertEmptyQuery() {
  Notiflix.Notify.failure('Please write something and try again.')
}

