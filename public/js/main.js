const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const submitBtn = document.getElementById('submitBtn');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');

const dataHide = document.querySelector('.middle_layer');


const getInfo = async(event) => {
    event.preventDefault();
    let cityVal = cityName.value;

    if(cityVal === "") {
       city_name.innerText = `Plz write the name before search.`;
       dataHide.classList.add("data_hide");
    }
    else{
        try{
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=bab4d138b0103e4ef154a534ac19b089`
            const response = await fetch(url)
            .then((response) => response.json());
            const arrayData = [response];

            city_name.innerText = `${arrayData[0].name}, ${arrayData[0].sys.country}`;
            temp_real_val.innerText = `${arrayData[0].main.temp}`;

            let tempMood = `${arrayData[0].weather[0].main}`;
            console.log(tempMood);

            // condition to check sunny or cloudy

            if(tempMood == "Clear") {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'></i>";
            }
            else if (tempMood == "Clouds") {
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
            }
            else if (tempMood == "Rain") {
                temp_status.innerHTML = "<i class='fas fa-cloud-rain' style='color: #a4b0be;'></i>";
            }
            else {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'></i>";
            }
            dataHide.classList.remove('data_hide');
        }
        catch{
            city_name.innerText = `Plz enter the city name prperly.`;
            dataHide.classList.add('data_hide');
        }  
    }
}

submitBtn.addEventListener("click" , getInfo);