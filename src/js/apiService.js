const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '22688730-7478780a51f867bdd79495f14';


export default class apiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    };


    fetchImgs() {
        const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.seachQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
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
            return data;
        }).catch(console.error(error))
    }

    incrementPage() {
        this.page += 1;
    }
};