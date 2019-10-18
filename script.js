const DEBUG = false;

$(document).ready(function(){
    $('#submitCity').click(function(){
        var city = $('#city').val();
        // push city to cityList array
        // set cityList in localStroage (remember to use stringify!)
        // BONUS: check length of array. if > 5 then don't add.
        if(city != ''){
            $.ajax({
                url:'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=imperial" + "&APPID=5650ba04d76cc8ddc64d65a07cda4c4a", 
                type:"GET",
                success: function(data){
                    var display = show(data);
                    $("#show").html(display);
                    console.log(data);
                }
            });
        }else{
            $('#error').html('Please insert a city name:');
        }
    });

});

function show(data){
    var d = new Date ();
    // moment().format('YYYY DD MM');
    return "<h2>" + data.name +  d.getDate() + "</h2>" +
            "<p><strong>Temperature</strong>: "+ data.main.temp + "F" +'</p>' +
            "<p><strong>Humidity</strong>: "+ data.main.humidity + "%" +'</p>' +
            "<p><strong>Wind Speed</strong>: "+ data.wind.speed + "MPH" +'</p>';
}

if (DEBUG) {
// DEMO - JSON.stringify vs. JSON.parse
// -----------------------------------------
let exampleArray = [1,2,3];
let stringifiedArray = JSON.stringify(exampleArray); // "[1,2,3]"
let parsedArray = JSON.parse(stringifiedArray); // [1,2,3]
console.log(exampleArray === parsedArray); // true
// -----------------------------------------
}

let cityList = [];
// On page load, we will get cityList array from localStorage

// If value exists, parse it and set cityList equal to that array

// When user clicks submit, grab user input
// push city to cityList array
// save stringified cityList array to localStorage
// make ajax request

function displayCities(){
    let list = localStorage.getItem("cityList");
    console.log(list);
    if (list) {
        cityList = JSON.parse(list);
        // display each element in the array as a list in the browser
        console.log(cityList);
        // Create a for loop that loops over our cityList
        // For each city in our array, create a p tag
        // set the text of the p tag to the current city
        // then append that p tag to .city-list
        for(var i = 0; i < cityList.length; i++){
            var container = $("<p></p>").text(cityList[i])
            $('.city-list').prepend(container);
        }
    }
}

displayCities();


