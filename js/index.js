const SK_API_URL = "http://apis.skplanetx.com";
initMap();

function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
        getLocationWeather("hour", pos.lat, pos.lng, currentNowWeather);
        getLocationWeather("12hour", pos.lat, pos.lng, forecastGoToAndLeave);
      // currentNowWeather("");
      // forecastGoToAndLeave("");
      getLocationName(pos.lat, pos.lng);
    }, function () {
      console.log("Error Occured.");
    });
  } else {
    // Browser doesn't support Geolocation
    console.log("Error Occured.");
  }
}

async function getLocationName(lat, lon) {
  const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyD1FyInkZsYpB9BgEXJ-APIF7PEuJW1f-k`);
  const location = await res.json();
  let locationName = "";
  for (let item of location.results) {
    if (item.address_components.length > 4 && item.types.length === 3) {
      locationName = "";
      for (let i = 2; i >= 0; i--) {
        locationName += item.address_components[i].long_name + " ";
      }
    }
  }
  const dongEl = document.querySelector('.dong');
  dongEl.textContent = locationName;
  //   console.log(locationName);
}

function currentNowWeather(result) {
    const curWeather = result.weather.hourly[0];
  // 임시 데이터
  // const curWeather = {
  //   sky: { code: "SKY_O01", name: "맑음" },
  //   temperature: { tc: "-7.80" },
  //   precipitation: { sinceOntime: "0.00", type: "0" },
  //   timeRelease: "2018-01-12 19:00:00"
  // }
  const skyImg = document.querySelector('.weather-img img');
  let stateName = "";
  for (let i = 1; i < 15; i++) {
    stateName = "SKY_O";
    stateName = (i < 10) ? stateName + "0" + i : stateName + i;
    console.log(curWeather.sky.code, stateName);
    if (curWeather.sky.code === stateName) {
      skyImg.setAttribute("src", "image/" + stateName + ".png");
      break;
    }
  }
  const skyState = document.querySelector('.weather-state');
  skyState.textContent = curWeather.sky.name; //맑음
  const temper = document.querySelector('.degree');
  temper.textContent = curWeather.temperature.tc; //온도
  const timeRelease = document.querySelector('.curr-time-value');
  timeRelease.textContent = curWeather.timeRelease; //업데이트시간
  const precipitation = document.querySelector('.precipitation');
  precipitation.textContent = curWeather.precipitation.sinceOntime; //강수량
}

function forecastGoToAndLeave(result) {
  const foreWeather = result.weather.forecast6days[0];
  let retArr = [];
    for (let i = 2; i < 4; i++) {
      retArr.push({
        "code": foreWeather.sky["amCode" + i + "day"],
        "state": foreWeather.sky["amName" + i + "day"],
        "temp": foreWeather.temperature["tmin" + i + "day"]
      });
      retArr.push({
        "code": foreWeather.sky["pmCode" + i + "day"],
        "state": foreWeather.sky["pmName" + i + "day"],
        "temp": foreWeather.temperature["tmax" + i + "day"]
      })
    }
  //임시 데이터
  // retArr.push({ code: "SKY_W11", state: "비 또는 눈", temp: "1" });
  // retArr.push({ code: "SKY_W11", state: "비 또는 눈", temp: "1" });
  // retArr.push({ code: "SKY_W02", state: "구름조금", temp: "6" });
  // retArr.push({ code: "SKY_W02", state: "구름조금", temp: "6" });
  const qStateDiv = document.querySelectorAll(".q-state");
  for (let i = 0; i < qStateDiv.length; i++) {
    qStateDiv[i].querySelector(".weather-img img").setAttribute("src", "image/" + retArr[i].code + ".png");
    qStateDiv[i].querySelector(".weather-state").textContent = retArr[i].state;
    qStateDiv[i].querySelector(".degree").textContent = retArr[i].temp;
  }
}

function getLocationWeather(type, lat, lon, callback) {
  let scope = "";
  switch (type) {
    case "minute":
      scope = "current/minutely";
      break;
    case "hour":
      scope = "current/hourly";
      break;
    case "3hour":
      scope = "forecast/3days";
      break;
    case "12hour":
      scope = "forecast/6days";
      break;
  }
  //   http: //apis.skplanetx.com/weather/current/minutely?version={version}&lat={lat}&lon={lon}&city={city}&county={county}&village={village}&stnid={stnid}
  PlanetX.api("get", `${SK_API_URL}/weather/${scope}`, "JSON", {
    "version": 1,
    "lat": lat,
    "lon": lon
  }, function (r) {
    if (r.result.code === 9200) {
      callback(r);
    } else {
      throw new Error(e);
    }
  }, function (e) {
    throw new Error(e);
  });
}