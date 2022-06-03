import ImageApiService from './api-service';
import {successNote, failureNote, endListNote} from './notes';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    searchForm: document.querySelector('.search-form'),  
    loadMoreButton: document.querySelector('.load-more'),
    imgContainer: document.querySelector('.gallery'),
}

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreButton.addEventListener('click', onclick);

const imageApiService = new ImageApiService();
const gallery = new SimpleLightbox('.gallery a');

async function onSearch(evt) {
    try {
        evt.preventDefault();

        imageApiService.query = evt.currentTarget.elements.searchQuery.value;
        imageApiService.resetPage();

        const newSearch = await imageApiService.fetchImages();
        successNote(newSearch.totalHits);

        refs.imgContainer.innerHTML = appendImgMarkup(newSearch.hits);
        gallery.refresh();
        refs.loadMoreButton.classList.remove('hidden');
    } catch (error) {
        refs.imgContainer.innerHTML = '';
        refs.loadMoreButton.classList.add('hidden');
        failureNote();
    };
}

async function onclick() {
    try {
        const moreImages = await imageApiService.fetchImages();
        
        refs.imgContainer.insertAdjacentHTML('beforeend', appendImgMarkup(moreImages.hits));
        gallery.refresh();
    } catch (error) {
        endListNote();
        refs.loadMoreButton.classList.add('hidden');
    }
}

function appendImgMarkup(images) {
    return images.map(image =>`<div class="photo-card">
    <a href=${image.largeImageURL}><img src=${image.webformatURL} alt="img" loading="lazy" width=395 height=260></a>
    <div class="info">
    <p class="info-item"><b>Likes</b></p>
    <p class="info-item">${image.likes}</p>
    <p class="info-item"><b>Views</b></p>
    <p class="info-item">${image.views}</p>
    <p class="info-item"><b>Comments</b></p>
    <p class="info-item">${image.comments}</p>
    <p class="info-item"><b>Downloads</b></p>
    <p class="info-item">${image.downloads}</p>
    </div>
    </div>`
    ).join('');
}

