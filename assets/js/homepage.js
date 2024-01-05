//Global Variables
//current weather
var currenttempEl= document.getElementById('temperature');
var currenticonEl= document.getElementById('currentIcon');
var currentwindspeedEl= document.getElementById('wind-speed');
var currenthumidityEl= document.getElementById('humidity');
var currentcityEl=document.getElementById('city-name');

var cityinput= document.getElementById('city');
var cityhistory = document.getElementById('city-history');
var weekforecast= document.getElementById('forecast');
//Button Variables
var findcity=document.getElementById('find-city');

var apikey ='99a4aac6c785221677057cb8889bf37e';
//make function to save user input of city

findcity.addEventListener("click", function (event){
    event.preventDefault();
    var cityvalue = cityinput.value;
    console.log(cityvalue);
    var li = document.createElement('li');
    li.innerHTML= cityvalue;
    cityhistory.appendChild(li);
})

//make function to get longitude and lattitude of city
function LongLat(){
    var city=cityinput.value;
    var today = dayjs();
    var todaydate = today.format('MMM D, YYYY');
    var weatherapi='http://api.openweathermap.org/geo/1.0/direct?q='+ city +'&appid='+ apikey;
    fetch(weatherapi)
     .then(function(response){
        return response.json();
     })
     .then(function(data){
      //console.log(data);
      var lon=data[0].lon;
      var lat=data[0].lat;
      //console.log(Lon);
      var weatherurl ='http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&units=metric&appid='+apikey;
      fetch(weatherurl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
         //console.log(data);
         var weathericon=data.weather[0].icon;
         var iconurl=  "https://openweathermap.org/img/wn/" + weathericon + ".png"
         var currentname=data.name;
         var currentwindspeed=data.wind.speed;
         var currenthumidity= data.main.humidity;
         var currenttemp=data.main.temp;
         var longitude=data.coord.lon;
         var latitude=data.coord.lat;
        currentcityEl.innerText=currentname;
        currenticonEl.src=iconurl;
        currenttempEl.innerText='Temperature:'+currenttemp+'\u00B0';
        currentwindspeedEl.innerText='Wind Speed:'+currentwindspeed+'km/hr';
        currenthumidityEl.innerText='Humidity:'+currenthumidity+'\u0025';
        var forecasturl='https://api.openweathermap.org/data/2.5/forecast?lat='+latitude+'&lon='+longitude+'&appid='+apikey;
        fetch(forecasturl)
         .then(function(response){
            return response.json();
         })
         .then(function(data){
            //console.log(data);
         for(var i = 0;i<data.list.length;i++){
            var daydata=data.list[i];
            var daytimeUTC=daydata.dt;
            var timezoneoffset=data.city.timezone;
            var timezoneoffsethours=timezoneoffset/60/60;
            var thisMoment= moment.unix(daytimeUTC).utc().utcOffset(timezoneoffsethours);
            var forecasticon="https://openweathermap.org/img/wn/"+daydata.weather[0].icon+".png";
            if (thisMoment.format("HH:mm:ss") === "11:00:00" || thisMoment.format("HH:mm:ss") === "12:00:00" || thisMoment.format("HH:mm:ss") === "13:00:00"){
                
            }

         }
         })






        })

      
     })

}

findcity.addEventListener('click',LongLat)
