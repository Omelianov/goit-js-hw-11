export { onScroll, onToUpBtn }

const toUpBtn = document.querySelector('.btn-to-top')
window.addEventListener('scroll', onScroll)
toUpBtn.addEventListener('click', onToUpBtn)

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