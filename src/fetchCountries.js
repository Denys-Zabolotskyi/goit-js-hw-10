import Notiflix from 'notiflix';

const BASE_URL = 'https://restcountries.com/v3.1';
const FILTER = 'fields=name,capital,population,flags,languages';
export default function fetchCountries(name) {
  return fetch(`${BASE_URL}/name/${name}?${FILTER}`).then(response => {
    if (!response.ok) {
      return Notiflix.Notify.failure(
        'Oops, there is no country with that name'
      );
    }
    return response.json();
  });
}
