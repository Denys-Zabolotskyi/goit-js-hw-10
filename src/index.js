//*******************Import********************** */
import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries.js';
const DEBOUNCE_DELAY = 300;
//*******************Сonstants********************** */
const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryItem: document.querySelector('.country-info'),
};
const { input, countryList, countryItem } = refs;
input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

//*****Function input and render ********************* */

function onInputSearch(evt) {
  const valueInput = evt.target.value.trim();
  if (valueInput === '') {
    clearCountriesList();
    clearCountryItem();
  } else {
    fetchCountries(valueInput)
      .then(data => {
        if (data.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name'
          );
          clearCountriesList();
          clearCountryItem();
        } else if (data.length >= 2 && data.length <= 10) {
          clearCountryItem();
          countryList.innerHTML = markupCountriesList(data);
        } else {
          clearCountriesList();
          countryItem.innerHTML = markupCountryItem(data);
        }
      })
      .catch(error => console.log('Oops, there is no country with that name'));
  }
}

// //*************Markup list of countries********************* */

function markupCountriesList(countriesArr) {
  return countriesArr
    .map(
      ({
        name: { official },
        flags: { svg },
      }) => `<li class="country-list__item">
<img src="${svg}" alt="flag" width="30">
<h1 class="country-list__title">${official}</h1>
      </li>`
    )
    .join('');
}

// //*************Markup one of country********************* */

function markupCountryItem(countriesArr) {
  return countriesArr
    .map(
      ({
        name: { official },
        capital,
        population,
        flags: { svg },
        languages,
      }) => `<div class="country-info__box"><img src="${svg}" alt="flag" width="30">
    <h1 class="country-info__main-title">${official}</h1></div>
    <ul class="country-info__list">
    <li class="country-info__item">
     <h2 class="country-info__title">Capital:</h2>
    <p class="country-info___text">${capital}</p>
    </li>
    <li class="country-info__item">
        <h2 class="country-info___title">Population:</h2>
     <p class="country-info___text">${population}</p>
    </li>
    <li class="country-info__item">
    <h2 class="country-info___title">Languages:</h2>
     <p class="country-info___text">${Object.values(languages)}</p></li>
    </ul>`
    )
    .join('');
}
//*****Function clear render list of countries ********************* */
function clearCountriesList() {
  countryList.innerHTML = '';
}
//*****Function clear render one of country ********************* */
function clearCountryItem() {
  countryItem.innerHTML = '';
}
