// Takes in a single cupcake object and generates the HTML to be appended to the page
function generateCupcakeHtml(cupcake){
  $cupcake = $(`<div class="card" width="100px"> 
                  <img src="${cupcake.image}" class="card-img-top">
                  <p class="card-title">Flavor: ${cupcake.flavor}</p>
                  <div class="card-body">
                    <p>Size: ${cupcake.size}</p>
                    <p>Rating: ${cupcake.rating}</p>
                  </div>
                </div>`)

  let $list = $("<li>")
  $list.append($cupcake)
  return $list
}

// Populates the homepage with cupcakes from the database
async function getCupcakeList(){
  let response = await axios.get('http://localhost:5000/api/cupcakes')
 
  for(let cupcake of response.data.cupcakes){
    let cupcakeHtml = generateCupcakeHtml(cupcake)

    $('.cupcakes-list').append(cupcakeHtml)
  }
}

// Handles add cupcake form, adds cupcake to the database, adds HTML to the page
async function addCupcake(){
  const $flavor = $(".flavor").val();
  const $size = $(".size").val();
  const $rating = $(".rating").val();
  const $image = $(".image").val();
  console.log($size)

  let cupcakeObj = {"flavor": $flavor,
                "size": $size,
                "rating": $rating,
                "image": $image
              }
              
  let response = await axios.post('http://localhost:5000/api/cupcakes', cupcakeObj)

  let newCupcake = generateCupcakeHtml(response.data.cupcake)

  $('.cupcakes-list').append(newCupcake)
}

// Adds an event listener for the form submission and calls addCupcake function
$(async function(){
  $("form").on("submit", function(event){
    event.preventDefault()
    addCupcake()
  })
  await getCupcakeList()
})