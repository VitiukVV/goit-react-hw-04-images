import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38656766-61e002171b8446ae895d82614';

export const PixabayAPIRequest = async (search, page) => {
  const options = {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    params: {
      key: API_KEY,
      q: `${search}`,
      image_type: 'photo',
      orientatio: 'horizontal',
      safesearch: 'true',
      per_page: 12,
      page: `${page}`,
    },
  };
  const response = await axios.get(BASE_URL, options);
  return response.data;
};
