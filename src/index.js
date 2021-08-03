import './sass/main.scss';
import _debounce from '../node_modules/lodash.debounce';
import ApiService from './js/apiService';
import galleryItem from './templates/galleryItem.hbs';
import Notiflix from 'notiflix';
import * as basicLightbox from '../node_modules/basiclightbox';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css'

const refs = {
    searchForm: document.querySelector('.search-form'),
    inputEl: document.querySelector('.search-form-input'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more-btn'),
};
const apiService = new ApiService();
console.log('apiService :>> ', apiService);

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', loadMore);
refs.gallery.addEventListener('click', onImgClick);


function onSearch(e) {
    e.preventDefault();
    clearInput()
    apiService.query = e.target.elements.query.value;
    console.log('apiService.query :>> ', apiService.query);
    // const total = response.totalHits;
    
    if (apiService.query) {
        apiService.fetchImg().then(appendHitsMarckup);
        refs.loadMoreBtn.classList.remove('is-hidden');
    }
    // if (apiService.query === '') {
    //     return Notiflix.Report.Failure( 'Sorry, there are no images matching your search query','Please try again.' ); 
    // }
}

function loadMore() {
    apiService.fetchImg().then(appendHitsMarckup).then(scroll);
}

function appendHitsMarckup(hits) {
    refs.gallery.insertAdjacentHTML('beforeend', galleryItem(hits))
}

function scroll(){
   const { height: cardHeight } = document
  .querySelector('.gallery')
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 9,
  behavior: 'smooth',
});
}

function onImgClick(e) {
    if (e.target.nodeName === 'IMG') {
        console.log('e.target :>> ', e.target);
        const instance = basicLightbox.create(`<img src=${e.target.dataset.source}>`);
        instance.show()
    }
}

function clearInput() {
    refs.gallery.innerHTML = '';
    refs.loadMoreBtn.classList.add('is-hidden')
}