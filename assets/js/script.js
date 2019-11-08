const apiKey = "fe3db3c446c85b8d61dc6f7699f4fac7"
const cityId = "3"
const cuisineId = "148"

const restaurants = []
const container = document.querySelector('.container')

const url = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&cuisines=${cuisineId}`

fetch(url, { headers: { "user-key": apiKey } })
  .then(res => res.json())
  .then(json => {
    console.log(json)
    json.restaurants.forEach(el => {
      restaurants.push({
        name: el.restaurant.name,
        cost: el.restaurant.average_cost_for_two,
        rating: el.restaurant.user_rating.aggregate_rating,
        image: el.restaurant.featured_image,
        address: el.restaurant.location.address,
        delivery: el.restaurant.has_online_delivery,
        booking: el.restaurant.has_table_booking 
      })
    })
    printRestaurants()
  })

document.getElementById("priceUp").addEventListener("click", () => {
  sortUp("cost")
})
document.getElementById("priceDown").addEventListener("click", () => {
  sortDown("cost")
})
document.getElementById("nameUp").addEventListener("click", () => {
  sortUp("name")
})
document.getElementById("nameDown").addEventListener("click", () => {
  sortDown("name")
})
document.getElementById("rateUp").addEventListener("click", () => {
  sortUp("rating")
})
document.getElementById("rateDown").addEventListener("click", () => {
  sortDown("rating")
})
document.getElementById("delivery").addEventListener("click", () => {
  filterOptions("delivery")
})
document.getElementById("bookOnline").addEventListener("click", () => {
  filterOptions("booking")
})

const filterOptions = (option) => {
  printRestaurants( restaurants.filter( el => {
    return el[option] === 1
  }))
}

const sortUp = (key) => {
  restaurants.sort((a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0))
  printRestaurants()
}

const sortDown = (key) => {
  restaurants.sort((a, b) => (a[key] < b[key]) ? 1 : ((b[key] < a[key]) ? -1 : 0))
  printRestaurants()
}

const printRestaurants = ( arr = restaurants ) => {
  container.innerHTML = ""
  arr.forEach(el => {
    container.innerHTML += `<div class="boxes"><h2>${el.name}</h2><p>${el.cost}</p><p>${el.rating}</p><img src="${el.image}"><p>${el.address}</p></div>`
  })
}