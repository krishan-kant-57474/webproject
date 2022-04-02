const submitBtn = document.getElementById("submitBtn");
const cityname = document.getElementById("cityname");
const city_name = document.getElementById("city_name");
const temp = document.getElementById("temp_real_value");
const temp_status = document.getElementById("temp_status");
const datahide = document.querySelector(".middle_layer");

const getInfo = async (event) => {
  event.preventDefault();
  let cityval = cityname.value;

  if (cityval === "") {
    city_name.innerText = "Plzz write the name before you search";
    datahide.classList.add("data_hide");
  } else {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityval}&units=metric&appid=534c754ccee7058821e6542e27d2e065`;
      const response = await fetch(url);
      const data = await response.json();
      const arrData = [data];
      city_name.innerText = `${arrData[0].name},${arrData[0].sys.country}`;

      temp.innerText = arrData[0].main.temp;
      temp_status.innerText = arrData[0].weather[0].main;
      const tempMood = arrData[0].weather[0].main;

      if (tempMood == "Clear") {
        temp_status.innerHTML =
          '<i class="fa-solid fa-sun" style="color: #f1c40f"></i>';
      } else if (tempMood == "Clouds") {
        temp_status.innerHTML =
          '<i class="fa-solid fa-cloud" style="color: #ecf0f1"></i>';
      } else if (tempMood == "Rain") {
        temp_status.innerHTML =
          '<i class="fa-solid fa-cloud-rain" style="color: #3498db"></i>';
      } else {
        temp_status.innerHTML =
          '<i class="fa-solid fa-cloud" style="color: #ecf0f1"></i>';
      }

      datahide.classList.remove("data_hide");
    } catch (error) {
      city_name.innerText = "Please enter the city name poperly";
      datahide.classList.add("data_hide");
    }
  }
};

submitBtn.addEventListener("click", getInfo);
