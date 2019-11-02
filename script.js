// FUNCTIONS
function show(data) {
    return "<h2>" + data.name + moment().format(' (MM/DD/YYYY)') + "</h2>" +
        "<p><strong>Temperature</strong>: " + data.main.temp + " °F" + '</p>' +
        "<p><strong>Humidity</strong>: " + data.main.humidity + "%" + '</p>' +
        "<p><strong>Wind Speed</strong>: " + data.wind.speed + "MPH" + '</p>';
}

function displayCities(cityList) {
    $('.city-list').empty();
    var list = localStorage.getItem("cityList");
    console.log(list);
    // cityList = (JSON.parse(list)); 
    // returning as a string, find javascript function to parse cityList
    if (list) {
        for (var i = 0; i < cityList.length; i++) {
            var container = $("<p></p>").text(cityList[i]);
            $('.city-list').prepend(container);
        }
    }
}

function showForecast(data) {
    var forecast = data.list; // [{},{},{}]
    console.log(forecast);
    // We have an array of 40 objects
    // We want every 5th object's date, icon, temp, humidity (index 4)
    // Display date, icon, temp and humidity via html
    // LOGIC:
    // Loop over array
    var currentForecast = [];
    for (var i = 0; i < forecast.length; i++) {
        console.log("Value at Index", forecast[i]) // {}, {}, {}

        var currentObject = forecast[i];
        // First time through loop - 0: {}
        // Second time through loop - 1: {}
        // Third time through loop - 2: {}

        var dt_time = currentObject.dt_txt.split(' ')[1] // '12:00:00'[1 is the number of index]
        // At each index..If...dt_txt === "12:00:00" get info
        if (dt_time === "12:00:00") {
            // currentObject.main ... time, icon, temp, humidity
            var main = currentObject.main;
            // Store each of these in variables
            var temp = main.temp; // TODO: Convert to F
            var humidity = main.humidity;
            var date = moment(currentObject.dt_txt).format('l'); // TODO: Use MomentJS to convert
            var icon = currentObject.weather[0].icon;

            let htmlTemplate = `
            <div class="col currentCondition">
            <div class="card">
                <div class="card-body 5-day">
                    <h5>${date}</h5>
                    <p>Temperature: ${temp} °F</p>
                    <p>Humidity: ${humidity}%</p>
                </div>
            </div> 
        </div>`;
        console.log(htmlTemplate);
            currentForecast.push(htmlTemplate);
            // 3. Then we;; review how to inject into the html template
            // "<h2>" + data.main.temp + "</h2>";
            // Pass those values into html template

            /* var htmlTemplate = `
                <div>
                    <h1>${forecast. .... }</h1>
                </div>
            `;
            */
            // Display on page

        }

    }
    console.log(currentForecast);
    console.log(currentForecast.join(''));
    $("#5-day-forecast").html(currentForecast.join(''));

}

// METHODS
$(document).ready(function () {

    var cityList = [];
    $('#submitCity').click(function (event) {
        event.preventDefault();
        var city = $('#city').val();
        // push city to cityList array
        cityList.push(city);
        // set cityList in localStorage (remember to use stringify!)
        localStorage.setItem("cityList", JSON.stringify(cityList));
        // check length of array. if > 5 then don't add.
        displayCities(cityList);
        if (city != '') {
            $.ajax({
                url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=imperial" + "&APPID=5650ba04d76cc8ddc64d65a07cda4c4a",
                type: "GET",
                success: function (data) {
                    var display = show(data);
                    $("#show").html(display);
                }
            });

            $.ajax({
                url: 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + "&units=imperial" + "&APPID=5650ba04d76cc8ddc64d65a07cda4c4a",
                type: "GET",
                success: function (data) {
                    console.log("forecast data", data);
                    var forecastDisplay = showForecast(data)
                    // add to page
                }
            });

        } else {
            $('#error').html('Please insert a city name:');
        }
    });

    displayCities(cityList);

});


