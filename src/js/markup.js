
export { createMarkup }

function createMarkup(data) {
    const markup = data.hits.map(({ id, largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
        return `
    <div class="photo-card">
    <a class="gallery__link" href="${largeImageURL}">
          <div class="gallery-item" id="${id}">
            <img class="gallery-item__img" src="${webformatURL}" alt="${tags}" loading="lazy" width="320"
          />
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