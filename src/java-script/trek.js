export let debounce = require('lodash.debounce');
import { alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import fetchCountries from './fetchCountries';
const fragment = document.createDocumentFragment();
const containerDom = document.querySelector('.container');
const capitalDom = document.querySelector('.capital');
const populationDom = document.querySelector('.population');
const languagesDom = document.querySelector('.languages');
const imgDom = document.querySelector('img');
const titleDom = document.querySelector('.title');
const ulForRenderLi = document.querySelector('.list_render');
const stopDefaultBehaviorForm = document.querySelector('form');
const getValueFromInput = document.querySelector('input');
capitalDom.textContent = 'Capital : ';
populationDom.textContent = 'Population :';
languagesDom.textContent = 'Languages : ';
document.addEventListener(
  'DOMContentLoaded',
  () => (getValueFromInput.value = ''),
);
stopDefaultBehaviorForm.addEventListener('submit', even => {
  even.preventDefault();
});
const handleInput = document.querySelector('input');
handleInput.addEventListener(
  'input',
  debounce(() => {
    ulForRenderLi.innerHTML = '';
    capitalDom.textContent = 'Capital : ';
    populationDom.textContent = 'Population :';
    languagesDom.textContent = 'Languages : ';
    containerDom.classList.remove('find');
    imgDom.setAttribute(
      'src',
      'https://www.nwflags.co.uk/ekmps/shops/0ec9a8/resources/design/country_flags_banner_mobile3.jpg',
    );
    const keyWord = getValueFromInput.value;
    if (keyWord === '' || keyWord === Number) {
      return;
    }
    const keyRequest = `https://restcountries.eu/rest/v2/name/${keyWord
      .toLowerCase()
      .trim()}`;
    fetchCountries(keyRequest)
      .then(data => {
        if (data.length >= 10) {
          alert({
            text: 'Clarify request',
            type: 'info',
          });
          return;
        }
        const dataFromServer = data.reduce(
          (acc, { name, flag, capital, population, languages, demonym }) => {
            acc.push(name, flag, capital, population, languages, demonym);
            const RenderLiDom = document.createElement('li');
            RenderLiDom.classList.add('list_render_li');
            RenderLiDom.textContent = name;
            fragment.appendChild(RenderLiDom);
            return acc;
          },
          [],
        );
        if (dataFromServer.length === 6) {
          imgDom.removeAttribute('src');
          imgDom.setAttribute('src', dataFromServer[1]);
          capitalDom.textContent = 'Capital : ' + dataFromServer[2];
          populationDom.textContent = 'Population : ' + dataFromServer[3];
          languagesDom.textContent = `Languages :${
            dataFromServer[4][0].name
              ? dataFromServer[4][0].name
              : dataFromServer[4][0].iso639_1
          }`;
          console.log(languagesDom.textContent);
          titleDom.textContent = 'Search country is ' + dataFromServer[5];
          containerDom.classList.add('find');
        }
        ulForRenderLi.appendChild(fragment);
      })
      .catch(err => {
        console.error(err, `something wrong  with server`);
        getValueFromInput.value = '';
      });
  }, 500),
);
