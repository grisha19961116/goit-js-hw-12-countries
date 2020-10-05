

export default function fetchCountries(searchQuery){
  return fetch(searchQuery)
  .then(el =>{
  return el.json()
})
}