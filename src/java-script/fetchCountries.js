

export default function fetchCountries(searchQuery){
  fetch(searchQuery)
  .then(el =>{
  return el.json()
})
.then(data => {
   console.log(data)
   return data;
});
}
// fetchCountries(`https://restcountries.eu/rest/v2/name/poland`)
// .then(el =>{
//   return el
// })
// .then(data => console.log(data));