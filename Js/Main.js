let input = document.getElementById("country");
let search = document.getElementById("search");
let error = document.querySelector(".error p");

let flag = document.querySelector(".flag");
let country_name = document.querySelector(".country_name");
let ulA = document.querySelector(".country_info");

search.addEventListener("click", function () {
  let inputV = input.value;
  if (inputV !== "" && inputV !== null) {
    startFetching(inputV);
    error.innerHTML = "";
  } else {
    error.innerHTML = "Please Enter A Valid Country Name";
  }
  setTimeout(() => {
    input.value = "";
  }, 1000);
});

function startFetching(iv) {
  fetch(`https://restcountries.com/v3.1/name/${iv}`)
    .then((result) => {
      let data = result.json();
      return data;
    })
    .then((data) => {
      setData(data[0]);
    })
    .catch((reject) => {
      error.innerHTML = "Please Enter A Valid Name Country";
    });
}

function setData(data) {
  flag.innerHTML = "";
  country_name.innerHTML = "";
  ulA.innerHTML = "";

  let img = document.createElement("img");
  img.className = "fluid-img rounded-1";
  img.alt = "This Is The Flag Of That Country You Have Been Search For!!!";
  img.src = data.flags.png;
  flag.appendChild(img);

  country_name.innerHTML = data.name.common;

  let infoArr = [
    "capital",
    "continent",
    "population",
    "currency",
    "language",
    "area",
    "borders",
    "driving side",
    "start of week",
    "subregion",
  ];

  let ul = document.createElement("ul");
  ul.innerHTML = `
  <li class='mb-1'><span>${infoArr[0]}:</span> ${data.capital}</li>
  <li class='mb-1'><span>${infoArr[1]}:</span> ${data.continents}</li>
  <li class='mb-1'><span>${infoArr[2]}:</span> ${data.population}</li>
  <li class='mb-1'><span>${infoArr[3]}:</span> ${
    data.currencies[Object.keys(data.currencies)].name
  }-${Object.keys(data.currencies)[0]}</li>
  <li class='mb-1'><span>${infoArr[4]}:</span> ${
    data.languages[Object.keys(data.languages)]
  }</li>
  <li class='mb-1'><span>${infoArr[5]}:</span> ${data.area}</li>
  <li class='mb-1'><span>${infoArr[6]}:</span> ${data.borders}</li>
  <li class='mb-1'><span>${infoArr[7]}:</span> ${data.car.side}</li>
  <li class='mb-1'><span>${infoArr[8]}:</span> ${data.startOfWeek}</li>
  <li class='mb-1'><span>${infoArr[9]}:</span> ${data.subregion}</li>

  `;
  ul.className = "list-unstyled";

  ulA.appendChild(ul);
  console.log(data);
}

// fetch("../Test.json")
//   .then((result) => {
//     let data = result.json();
//     return data;
//   })
//   .then((data) => {
//     console.log(data.demonyms.eng.f);
//   });
