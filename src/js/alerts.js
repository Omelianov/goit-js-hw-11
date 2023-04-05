import Notiflix from 'notiflix';

export { alertEmptyQuery, alertTotalImagesFound, alertNoImagesFound, alertReachedImages }

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
