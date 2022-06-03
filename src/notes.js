import Notiflix from "notiflix";

export const successNote = (totalHits) => {
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
}

export const failureNote = () => {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
}

export const endListNote = () => {
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
}