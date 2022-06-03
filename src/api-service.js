import axios from "axios";

export default class ImageApiService {
    constructor() {
        this.options = {
                q: null,
                page: this.page,
                per_page: 40,
                orientation: 'horizontal',
                image_type: 'photo',
                safesearch: true,
                min_height: 260
        }
    }

    fetchImages() {
        const url = `https://pixabay.com/api/?key=27787422-246ac701e88e70094f4a99590`;

        return axios.get(url, { params: this.options }).then(response => {
            if (response.data.totalHits === 0) {
                    throw new Error(response.status);
                }
            this.options.page += 1;
            return response.data;
        })
    }

    resetPage() {
       this.options.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.options.q = newQuery;

    }
}