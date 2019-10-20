$(document).ready(function () {
    var cityList = [];
    $('#submitCity').click(function () {
        var city = $('#city').val();
        // push city to cityList array
        cityList.push(city);
        // set cityList in localStorage (remember to use stringify!)
        localStorage.setItem("cityList", JSON.stringify(cityList));
        // check length of array. if > 5 then don't add.
        displayCities();
        if (city != '') {
            $.ajax({
                url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=imperial" + "&APPID=5650ba04d76cc8ddc64d65a07cda4c4a",
                type: "GET",
                success: function (data) {
                    var display = show(data);
                    $("#show").html(display);
                    console.log(data);
                }
            });
        } else {
            $('#error').html('Please insert a city name:');
        }
    });

    
    function show(data) {
        return "<h2>" + data.name + moment().format(' (MM/DD/YYYY)') + "</h2>" +
        "<p><strong>Temperature</strong>: " + data.main.temp + "F" + '</p>' +
        "<p><strong>Humidity</strong>: " + data.main.humidity + "%" + '</p>' +
        "<p><strong>Wind Speed</strong>: " + data.wind.speed + "MPH" + '</p>';
    }
    
    function displayCities() {
        $('.city-list').empty();
        var list = localStorage.getItem("cityList");
        console.log(list);   
        // cityList = (JSON.parse(list)); 
        // returning as a string, find javascript function to parse cityList
        if (list) {
            console.log(cityList);
            for (var i = 0; i < cityList.length; i++) {
                var container = $("<p></p>").text(cityList[i]);
                $('.city-list').prepend(container);
            } 
        }
    }
    displayCities();
});
    
    
    