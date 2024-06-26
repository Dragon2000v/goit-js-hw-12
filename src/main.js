import './js/pixabay-api';
import './js/render-functions';
import './css/styles.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import errorPng from '../src/img/icon-error.png';
import {
  renderGallery,
  renderLoader,
  toggleLoadMoreButton,
} from './js/render-functions';
import { getImage } from './js/pixabay-api';

//#region form elements
const loader = document.createElement('span');
loader.classList.add('loader');
const container = document.createElement('div');
container.classList.add('container');

const form = document.createElement('form');

const input = document.createElement('input');
input.setAttribute('type', 'text');
input.setAttribute('name', 'query');
input.placeholder = 'Search images...';

const button = document.createElement('button');
button.setAttribute('type', 'submit');
button.textContent = 'Search';

const gallery = document.createElement('ul');
gallery.classList.add('gallery');

const loadMoreBtn = document.createElement('button');
loadMoreBtn.setAttribute('type', 'button');
loadMoreBtn.classList.add('search-button');
loadMoreBtn.classList.add('load-button');
loadMoreBtn.classList.add('is-hidden');
loadMoreBtn.textContent = 'Load more';

form.append(input, button);
container.append(form);
document.body.append(container);
document.body.append(gallery, loader, loadMoreBtn);
//#endregion

form.addEventListener('submit', onSearch);

let page = 1;
let query = '';
let per_page = 15;

async function onSearch(e) {
  e.preventDefault();
  query = e.currentTarget.elements.query.value.trim();
  if (query.trim() === '') {
    iziToast.warning({
      title: 'Caution',
      message: 'Type what you want to find!',
      backgroundColor: '#FFA000',
      position: 'topRight',
      theme: 'dark',
      iconUrl: '',
      timeout: 2000,
    });
    return;
  }
  // Reset page to 1 for new searches
  page = 1;
  // Clear previous gallery content
  gallery.innerHTML = '';
  // Show loader
  loader.classList.add('isVisible');
  try {
    const imageData = await getImage(query, page);
    if (imageData.hits.length === 0) {
      iziToast.error({
        theme: 'dark',
        position: 'topRight',
        message:
          'image not found!',
        backgroundColor: '#ef4040',
        iconUrl: errorPng,
        maxWidth: '432px',
        timeout: 2000,
      });
      toggleLoadMoreButton(false);
      input.value = '';
      
      return;
    }
    input.value = '';
    renderGallery(imageData.hits);
    if (isAllImagesDisplayed()) { 
      toggleLoadMoreButton(false); // Приховати кнопку "Загрузити ще"
    } else {
      toggleLoadMoreButton(true); // Показати кнопку "Загрузити ще"
    }
    //toggleLoadMoreButton(imageData.totalHits);
  } catch (error) {
    //console.error('Error fetching images:', error);
    iziToast.error({
      theme: 'dark',
      position: 'topRight',
      message:
        `An error occurred while fetching images. ${error}`,
      backgroundColor: '#ef4040',
      iconUrl: errorPng,
      maxWidth: '432px',
      timeout: 2000,
    });
  } finally {
    
    // Hide loader
    loader.classList.remove('isVisible');
  }
}

loadMoreBtn.addEventListener('click', onLoadMore);

async function onLoadMore() {
  page++;
  loader.classList.add('isVisible');
  try {
    const imageData = await getImage(query, page);
    renderGallery(imageData.hits);
    // Если количество загруженных изображений равно или больше общего количества изображений
    if (gallery.querySelectorAll('.gallery-item').length >= imageData.totalHits) { 
      toggleLoadMoreButton(false); 
      iziToast.warning({
        title: 'Caution',
        message: 'No more images found.',
        backgroundColor: '#FFA000',
        position: 'topRight',
        theme: 'dark',
        iconUrl: '',
        timeout: 2000,
      });
    }
    toggleLoadMoreButton(imageData.totalHits > page * per_page);
    // Smooth scroll to bottom
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  } catch (error) {
    //console.error('Error fetching more images:', error);
    iziToast.warning({
      title: 'Caution',
      message: 'No more images found.',
      backgroundColor: '#FFA000',
      position: 'topRight',
      theme: 'dark',
      iconUrl: '',
      timeout: 2000,
    });
    toggleLoadMoreButton(false);
  } finally {
    loader.classList.remove('isVisible');
  }
}

function isAllImagesDisplayed() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (!galleryItems.length) {
    // Якщо немає зображень, повертаємо false
    return false;
  }

  const lastImage = galleryItems[galleryItems.length - 1];
  const lastImageRect = lastImage.getBoundingClientRect();

  // Перевіряємо, чи нижній край останнього зображення більше або рівний висоті вікна
  return lastImageRect.bottom <= window.innerHeight;
}


