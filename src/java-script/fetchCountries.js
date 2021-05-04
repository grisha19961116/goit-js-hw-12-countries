import { error } from '@pnotify/core';
export default function fetchCountries(searchQuery) {
  return fetch(searchQuery)
    .then(el => {
      return el.json();
    })
    .then(data => {
      if (data.status === 404) {
        error({ text: 'Write real name of countries!' });
      }
      return data;
    });
}
