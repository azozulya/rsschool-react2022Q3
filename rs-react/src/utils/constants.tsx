const SEARCH_STRING_LS = 'search';

const COUNTRIES = ['Cyprus', 'France', 'Italy', 'Spain'];

const API_KEY = '025817b5c967821b262fca2cd381e36f';

const API_URL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&format=json&nojsoncallback=1`;

const API_IMG_URL = 'https://live.staticflickr.com/';

const API_PHOTO_DETAILS_URL = `https://www.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${API_KEY}&format=json&nojsoncallback=1`;

const IMG_EMPTY = 'No image';

const MAX_PHOTOS = 500;

const PER_PAGE = [5, 20, 30, 40, 60];

const SORT_PARAMS = [
  'date-posted-desc',
  'date-posted-asc',
  'date-taken-asc',
  'date-taken-desc',
  'interestingness-desc',
  'interestingness-asc',
];

export {
  IMG_EMPTY,
  SEARCH_STRING_LS,
  COUNTRIES,
  API_KEY,
  API_URL,
  API_IMG_URL,
  API_PHOTO_DETAILS_URL,
  MAX_PHOTOS,
  PER_PAGE,
  SORT_PARAMS,
};
