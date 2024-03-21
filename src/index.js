let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("country-inp");

function formatPopulation(population) {
    if (population >= 1e9) {
      return (population / 1e9).toFixed(2) + " billion";
    } else if (population >= 1e6) {
      return (population / 1e6).toFixed(2) + " million";
    } else {
      return population.toLocaleString();
    }
  }
  
  searchBtn.addEventListener("click", () => {
    let countryName = countryInp.value;
    let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    console.log(finalURL);
    fetch(finalURL)
      .then((response) => response.json())
      .then((data) => {

        let formattedPopulation = formatPopulation(data[0].population);
  
        result.innerHTML = `
          <img src="${data[0].flags.svg}" class="flag-img">
          <h2>${data[0].name.common}</h2>
          <div class="wrapper">
              <div class="data-wrapper">
                  <h4>Capital:</h4>
                  <span>${data[0].capital[0]}</span>
              </div>
          </div>
          <div class="wrapper">
              <div class="data-wrapper">
                  <h4>Continent:</h4>
                  <span>${data[0].continents[0]}</span>
              </div>
          </div>
           <div class="wrapper">
              <div class="data-wrapper">
                  <h4>Population:</h4>
                  <span>${formattedPopulation}</span> <!-- Formatted population -->
              </div>
          </div>
          <div class="wrapper">
              <div class="data-wrapper">
                  <h4>Currency:</h4>
                  <span>${
                    data[0].currencies[Object.keys(data[0].currencies)].name
                  } - ${Object.keys(data[0].currencies)[0]}</span>
              </div>
          </div>
           <div class="wrapper">
              <div class="data-wrapper">
                  <h4>Common Languages:</h4>
                  <span>${Object.values(data[0].languages)
                    .toString()
                    .split(",")
                    .join(", ")}</span>
              </div>
          </div>
        `;
      })
      .catch(() => {
        if (countryName.length == 0) {
          result.innerHTML = `<h3>The input field cannot be empty</h3>`;
        } else {
          result.innerHTML = `<h3>Please enter a valid country name.</h3>`;
        }
      });
  });
  