import { alert, notice, info, success, error, defaultModules } from'@pnotify/core';
export default function fetchCountries(searchQuery){
  return fetch(searchQuery)
  .then(el =>{
    console.log(el)
  return el.json()
})
.then((data) => {
  console.log(data)
  if(data.status === 404){
    const myError = error({
    text:"`write more correct word`" });
  return;
  }
   return data;
})
}