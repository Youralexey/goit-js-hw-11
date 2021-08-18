
import Notiflix from "notiflix";
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '22688730-7478780a51f867bdd79495f14';

export default class ApiService {
    constructor() {
        this.seachQuery = '';
        this.page = 1;
        this.perPage = 40;
    }

    fetchImg(isSubmit) {
        const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.seachQuery}&page=${this.page}&per_page=${this.perPage}&key=${API_KEY}`;
        if (isSubmit === true) {
            this.page = 1;
        }
            return fetch(url).then(response => {
                console.log('response :>> ', response);
               
                return response.json();
            
            }).then(data => {
            console.log(this.page)    
            this.incrementPages();
                
            const loadMoreBtn = document.querySelector('.load-more-btn');
            const lengthHits = document.querySelectorAll('.photo-card').length;
            loadMoreBtn.style.display = 'block';
       
            

            if (data.totalHits === 0) {
              loadMoreBtn.style.display = 'none';
              return Notiflix.Notify.warning(
                'Sorry, there are no images matching your search query. Please try again.',
              );
                };


            if (lengthHits + this.perPage >= data.totalHits && !isSubmit) {
              loadMoreBtn.style.display = 'none';
              return Notiflix.Notify.info(
                'We are sorry, but you have reached the end of search results.',
              );
            }

            return data.hits;
        })

    }
    
    incrementPages() {
        this.page += 1;
    }

    get query() {
        return this.seachQuery;
    }

    set query(newQuery) {
        this.seachQuery = newQuery;
    }
}