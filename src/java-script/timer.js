export 
let debounce = require('lodash.debounce');
  const fragment = document.createDocumentFragment();
const containerDom = document.querySelector('.container');
const capitalDom = document.querySelector('.capital');
const populationDom = document.querySelector('.population');
const languagesDom = document.querySelector('.languages');
const imgDom = document.querySelector('img');
const ulForRenderLi = document.querySelector('.list_render')
console.log(languagesDom)
const stopDefaultBehaviorForm = document.querySelector('form');
stopDefaultBehaviorForm.addEventListener('submit', even => {
  even.preventDefault();
})
const handleInput = document.querySelector('input');
handleInput.addEventListener('input', debounce((ev) => {
  ulForRenderLi.innerHTML = '';
  const keyWord = ev.explicitOriginalTarget.value;
  const keyRequest = `https://restcountries.eu/rest/v2/name/${keyWord}`;

  fetch(keyRequest)
  .then(response => {
   return response.json();
  })
  .then((data) => {
    const foo = data.reduce((acc,elem ,index) =>{
      acc.push(elem.name)
      return acc;
    },[]);
    foo.forEach(element => {
      const RenderLiDom = document.createElement('li');
      RenderLiDom.classList.add('list_render_li');
      RenderLiDom.textContent = element;
      fragment.appendChild(RenderLiDom);
    });
    ulForRenderLi.appendChild(fragment);
    console.log(ulForRenderLi)
  })
  .then( (elem) => {
    console.log(elem)
  }
  )
  .catch(error => {
  });
}, 500 ));


 
