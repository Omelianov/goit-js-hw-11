import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const API_KEY = '34760614-c151dedd5f6572838af89f3cc';
const BASE_URL = 'https://pixabay.com/api/';
const perPage = 40
let page = 1

const formInputRef = document.querySelector('#search-form')
const formInputValue = document.querySelector('.input')
const submitButton = document.querySelector('[type="submit"]')
const divGallery = document.querySelector('.gallery')
const galleryEl = document.querySelector('.gallery .a')


// function renderGallery(images) {
//   const markup = images
//     .map(image => {
//       const { id, largeImageURL, webformatURL, tags, likes, views, comments, downloads } = image
//       return `
//         <a class="gallery__link" href="${largeImageURL}">
//           <div class="gallery-item" id="${id}">
//             <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
//             <div class="info">
//               <p class="info-item"><b>Likes</b>${likes}</p>
//               <p class="info-item"><b>Views</b>${views}</p>
//               <p class="info-item"><b>Comments</b>${comments}</p>
//               <p class="info-item"><b>Downloads</b>${downloads}</p>
//             </div>
//           </div>
//         </a>
//       `
//     })
//     .join('')

//   divGallery.insertAdjacentHTML('beforeend', markup)
// }

formInputRef.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const formData = new FormData(formInputRef);
  const queryValue = formData.get('searchQuery')
  console.log(queryValue);

  const product = axios.get(`${BASE_URL}?key=${API_KEY}&q=${queryValue}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`)
    .then(result => result.data
    ).then((data) => {
      console.log(data)
      const markup = data.hits.map(({ userImageURL, id, likes, views, downloads }) => {
        return `<li>
        <a>${userImageURL}</a>
          <p>${id}</p>
          <p>${likes}</p>
          <p>${views}</p>
          <p>${downloads}</p>
        </li>`
      })
        .join('')
      return markup
    })
    .then((markup) => { divGallery.insertAdjacentHTML('beforeend', markup) })
  console.log(product);


  //   .then(renderGallery)
  //   .then((markup) => divGallery.insertAdjacentHTML('beforeend', markup))
  // // alert(`'Hooray! We found ${totalHits} images.'`)
  // console.log(product);
})


