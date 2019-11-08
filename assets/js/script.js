//API data
const apiKey = "fe3db3c446c85b8d61dc6f7699f4fac7"
const cityId = "3"
const cuisineId = "148"
const url = `https://developers.zomato.com/api/v2.1/search?entity_id=${cityId}&entity_type=city&cuisines=${cuisineId}`

//local data storage
const restaurants = []

const container = document.querySelector('.container')

//Fetching data from ZAMATO API and creating local copy of used only inforamtions for every restaurant
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
    // Adding event listeners to buttons
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
    document.getElementById("clearFilters").addEventListener("click", () => {
      printRestaurants()
    })
    printRestaurants()
  })


//Universal filter function for boolean values (0/1 options)
const filterOptions = (option) => {
  printRestaurants(restaurants.filter(el => {
    return el[option] === 1
  }))
}

//Universal incr sorting function
const sortUp = (key) => {
  restaurants.sort((a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0))
  printRestaurants()
}

//Universal decr sorting function
const sortDown = (key) => {
  restaurants.sort((a, b) => (a[key] < b[key]) ? 1 : ((b[key] < a[key]) ? -1 : 0))
  printRestaurants()
}

//Universal rendering function with default parameter asign to local restaurants array
const printRestaurants = (arr = restaurants) => {
  container.innerHTML = ""
  arr.forEach(el => {
    container.innerHTML += `
      <div class="boxes">
        <h2>${el.name}</h2>
        <p>${el.cost}</p>
        <p>${el.rating}</p>
        <img src="${el.image}">
        <p>${el.address}</p>
      </div>`
  })
}