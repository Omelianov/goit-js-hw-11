import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const API_KEY = '34760614-c151dedd5f6572838af89f3cc';
const BASE_URL = 'https://pixabay.com/api/';
const perPage = 40
let queryValue = ''
let pageNumber;


const formInputRef = document.querySelector('#search-form')
// const formInputValue = document.querySelector('.input')

const divGallery = document.querySelector('.gallery')
const galleryEl = document.querySelector('.gallery .a')
const loadMoreBtn = document.querySelector('.load-more')
const toUpBtn = document.querySelector('.btn-to-top')

formInputRef.addEventListener('submit', onSearchSmt)
loadMoreBtn.addEventListener('click', onLoadMoreBtn)
window.addEventListener('scroll', onScroll)
toUpBtn.addEventListener('click', onToUpBtn)

// let simpleLightbox = new SimpleLightbox('.gallery', {
//   captions: true,
//   captionsData: 'alt',
//   captionDelay: 250,
// });



function onSearchSmt(ev) {
  ev.preventDefault();
  pageNumber = 1;
  divGallery.innerHTML = '';
  loadMoreBtn.classList.add('is-hidden');
  const formData = new FormData(formInputRef);
  const queryValue = formData.get('searchQuery').trim()
  if (!queryValue) {
    alertEmptyQuery()
    return;
  }


  fetchImages(queryValue, pageNumber, perPage)
    .then(({ data }) => {
      if ((pageNumber > (Math.ceil(data.totalHits / perPage)))) {
        loadMoreBtn.classList.remove('load-more-visible')
        alertReachedImages()
      }
      if (data.totalHits === 0) {
        alertNoImagesFound()

      } else {
        createMarkup(data)
        simpleLightBox = new SimpleLightbox('.gallery a').refresh()
        alertTotalImagesFound(data)

        if (data.totalHits > perPage) {
          loadMoreBtn.classList.remove('is-hidden')
        }
      }
    })

    .then(createMarkup(data))
    .then((markup) => { divGallery.insertAdjacentHTML('beforeend', markup) })

}



async function fetchImages(queryValue, pageNumber, perPage) {
  const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${queryValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}&per_page=${perPage}`,)
  console.log(response.data.totalHits);

  return response


}


function createMarkup(data) {
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


function onScroll() {
  const scrolled = window.pageYOffset
  const coords = document.documentElement.clientHeight

  if (scrolled > coords) {
    toUpBtn.classList.add('btn-to-top--visible')
    loadMoreBtn.classList.remove('is-hidden')
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


function onLoadMoreBtn() {
  // pageNumber = pageNumber + 1;
  // // simpleLightBox.destroy()
  // // return pageNumber
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

// const alerts = (data) => {
//   console.log(data)
//   const totalFreeQueryes = Math.ceil(data.totalHits / perPage)
//   if ((pageNumber > totalFreeQueryes)) {
//     loadMoreBtn.classList.remove('load-more-visible')
//     Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
//   }
//   console.log(data.totalHits);
//   if (data.totalHits === 0) {
//     Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
//   }
//   console.log(data.total)
//   if (data.totalHits > 0) {
//     alertTotalImagesFound
//   }
// }







// window.onScroll = function () {
//   if (window.pageYOffset >= window.innerHeight) {
//     toUpBtn.style.opacity = '1';
//   } else if (window.pageYOffset <= window.innerHeight) {
//     toUpBtn.style.display = 'none';
//   }
//   toUpBtn.onclick = function () {
//     window.scrollTo(0, 0, { behavior: "smooth" });
//   }
// }