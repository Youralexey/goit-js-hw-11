import './sass/main.scss'
import Notiflix from 'notiflix';
import _debounce from '../node_modules/lodash.debounce';
// import apiService from './js/apiService';
import galleryItem from './templates/galleryItem.hbs';
import * as basicLightbox from 'basiclightbox'

const refs = {
    searchForm: document.querySelector('.search-form'),
    inputEl: document.querySelector('.search-form-input'),
    gallery: document.querySelector('.gallery'),
    loadMoreButton: document.querySelector('.load-more-btn'),
};

refs.loadMoreButton.addEventListener('click', searchForm);
refs.gallery.addEventListener('click', onGalleryImgClick);


const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '22688730-7478780a51f867bdd79495f14';
export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    };


    fetchImgs() {
        const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
        console.log(url)
            return fetch(url).then(response => {
            console.log('response :>> ', response);
            if (!response.ok) {
                 Notiflix.Report.Failure( 'Sorry, there are no images matching your search query. Please try again.', 'Ok' ); 
                return;
            } else {
                return response.json();
            }
        }).then(data => {
            this.incrementPage();
            console.log(data.hits);
            appendHits(data.hits)
            return data.hits;
        })
    }

    incrementPage() {
        this.page += 1;
    };
    
    get () {
        return this.searchQuery;
    };
    set (newQuery) {
        this.searchQuery = newQuery
    };
};

let apiService = new ApiService();


function searchForm(event) {
    event.preventDefault();
    apiService.set(refs.inputEl.value);
    apiService.fetchImgs();
}

function appendHits(hits) {
    refs.gallery.insertAdjacentHTML('beforeend', galleryItem(hits))
}

function onGalleryImgClick(event) {
    console.log(event.target.nodeName)
    if (event.target.nodeName === 'IMG') {
        console.log(event.target.dataset.source)
        const instance = basicLightbox.create(`
    <img src=${event.target.dataset.source}>`);
        instance.show()
    }
}