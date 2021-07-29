import '..//sass/main.scss'
import apiService from "./apiService";
import '..//templates/galleryItem.hbs';
import _debounce from '../../node_modules/lodash.debounce';
import Notiflix from "../../node_modules/notiflix";
import apiService from "./apiService";

const refs = {
    searchForm: document.querySelector('#search-form'),
    inputEl: document.querySelector('search-form-input'),
    gallery: document.querySelector('gallery'),
    loadMoreButton: document.querySelector('load-more-btn'),
};

const apiService = new apiService();
