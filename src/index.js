
import SimpleLightbox from 'simplelightbox'
import 'simplelightbox/dist/simple-lightbox.min.css'

import { fetchImages } from './js/fetch-images';
import { alertEmptyQuery, alertTotalImagesFound, alertNoImagesFound, alertReachedImages } from './js/alerts'
import { createMarkup } from './js/markup';
import { onScroll, onToUpBtn } from './js/scroll-up-arrow';

const formInputRef = document.querySelector('#search-form')
const divGallery = document.querySelector('.gallery')
const loadMoreBtn = document.querySelector('.load-more')

formInputRef.addEventListener('submit', onSearchSmt)
loadMoreBtn.addEventListener('click', onLoadMoreBtn)


const perPage = 40;
let queryValue = '';
let pageNumber = 1;
let simpleLightBox = new SimpleLightbox('.photo-card a');

async function onSearchSmt(ev) {
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
      if (data.totalHits === 0) {
        alertNoImagesFound()
      }
      else if (data.totalHits > 0) {
        alertTotalImagesFound(data)
        loadMoreBtn.classList.remove('is-hidden')
        divGallery.insertAdjacentHTML('beforeend', createMarkup(data))
        simpleLightBox = new SimpleLightbox('.photo-card a').refresh()
      }
      if (data.totalHits < perPage) {
        loadMoreBtn.classList.add('is-hidden')
      }
    })
    .catch(error => {
      console.error(error);
    })
}


async function onLoadMoreBtn() {
  pageNumber += 1;
  simpleLightBox.destroy()
  const formData = new FormData(formInputRef);
  const queryValue = formData.get('searchQuery').trim();

  try {
    const { data } = await fetchImages(queryValue, pageNumber, perPage);
    createMarkup(data);
    divGallery.insertAdjacentHTML('beforeend', createMarkup(data))
    simpleLightBox = new SimpleLightbox('.photo-card a').refresh()
    if ((pageNumber * perPage) > data.totalHits || data.hits < perPage) {
      loadMoreBtn.classList.add('is-hidden')
      alertReachedImages()
    }

    const galleryElement = document.querySelector(".gallery").firstElementChild;
    if (galleryElement) {
      const { height: cardHeight } = galleryElement.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
      });
    }

  } catch (error) {
    console.error(error);
  }
}


onToUpBtn()
onScroll()


