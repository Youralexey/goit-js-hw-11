const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '22688730-7478780a51f867bdd79495f14';

export default class ApiService {
    constructor() {
        this.seachQuery = '';
        this.page = 1;
    }

    fetchImg() {
        const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.seachQuery}&page=${this.page}&per_page=40&key=${API_KEY}`;
        console.log(url.totalHits)
            return fetch(url).then(response => {
                console.log('response :>> ', response);
                 // не знаю как воспользоваться библиотекой
            if (!response.ok) {
                return Notiflix.Report.Failure( 'Sorry, there are no images matching your search query','Please try again.' );
            } else {
                return response.json();
            }
        }).then(data => {
            this.incrementPages();
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