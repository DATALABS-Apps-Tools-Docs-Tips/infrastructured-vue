//https://services2.arcgis.com/1cdV1mIckpAyI7Wo/arcgis/rest/services/Power_Plants/FeatureServer/0/query?outFields=*&where=NAICS_DESC+%3D+%27SOLAR+ELECTRIC+POWER+GENERATION%27&inSR=3857&outSR=4326&f=geojson

var json;
var currentProperties = {
  "datasetName":"",
  "loadNumber":"",
  "zoomLevel":"",
  "featuresLoaded":"",
  "baseQuery":"",
  "mostRecentQuery":"",
  "scrollLocation":""
};

var dataDictionary = {
  "State Fairgrounds": {
    "url":"https://opendata.arcgis.com/datasets/7f35881c8860490ab6a76516978e9e15_0.geojson",
    "zoomLevel":15
  },
  "Poultry Slaughtering and Processing Facilities": {
    "url":"https://opendata.arcgis.com/datasets/b6b9cc72fb58476d92056d5c7ed25f8b_0.geojson",
    "zoomLevel":16
  },
  "Canada and Mexico Border Crossings": {
    "url":"https://opendata.arcgis.com/datasets/33f493e577a44c2aa34450a898f16900_0.geojson",
    "zoomLevel":14
  },
  "US Ports of Entry" : {
    "url":"https://opendata.arcgis.com/datasets/9ea04e9e2dd6465689a01eea5f3652fe_0.geojson",
    "zoomLevel":14
  },
  "Natural Gas": {
    "url":"https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Environmental_Protection_Agency_EPA_Facility_Registry_Service_FRS_Power_Plants/FeatureServer/0/query?outFields=*&where=ENERGY_SOU%3D%27NG%27&inSR=3857&outSR=4326&f=geojson",
    "zoomLevel":14
  },
  "Coal": {
    "url":"https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Environmental_Protection_Agency_EPA_Facility_Registry_Service_FRS_Power_Plants/FeatureServer/0/query?outFields=*&where=ENERGY_SOU%3D%27BIT%27+OR+ENERGY_SOU%3D%27SUB%27&inSR=3857&outSR=4326&f=geojson",
    "zoomLevel":14
  },
  "Solid Waste": {
    "url":"https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Environmental_Protection_Agency_EPA_Facility_Registry_Service_FRS_Power_Plants/FeatureServer/0/query?outFields=*&where=ENERGY_SOU%3D%27MSW%27&inSR=3857&outSR=4326&f=geojson",
    "zoomLevel":14
  },
  "Wood Waste": {
    "url":"https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Environmental_Protection_Agency_EPA_Facility_Registry_Service_FRS_Power_Plants/FeatureServer/0/query?outFields=*&where=ENERGY_SOU%3D%27WDL%27+OR+ENERGY_SOU%3D%27WDS%27&inSR=3857&outSR=4326&f=geojson",
    "zoomLevel":14
  },
  "Hydroelectric": {
    "url":"https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Environmental_Protection_Agency_EPA_Facility_Registry_Service_FRS_Power_Plants/FeatureServer/0/query?outFields=*&where=ENERGY_SOU%3D%27WAT%27&inSR=3857&outSR=4326&f=geojson",
    "zoomLevel":14
  },
  "Nuclear": {
    "url":"https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Environmental_Protection_Agency_EPA_Facility_Registry_Service_FRS_Power_Plants/FeatureServer/0/query?outFields=*&where=ENERGY_SOU%3D%27NUC%27&inSR=3857&outSR=4326&f=geojson",
    "zoomLevel":14
  },
  "Solar": {
    "url":"https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Environmental_Protection_Agency_EPA_Facility_Registry_Service_FRS_Power_Plants/FeatureServer/0/query?outFields=*&where=ENERGY_SOU%3D%27SUN%27&inSR=3857&outSR=4326&f=geojson",
    "zoomLevel":14
  },
  "Geothermal": {
    "url":"https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Environmental_Protection_Agency_EPA_Facility_Registry_Service_FRS_Power_Plants/FeatureServer/0/query?outFields=*&where=ENERGY_SOU%3D%27GEO%27&inSR=3857&outSR=4326&f=geojson",
    "zoomLevel":14
  },
  "Wind": {
    "url":"https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Environmental_Protection_Agency_EPA_Facility_Registry_Service_FRS_Power_Plants/FeatureServer/0/query?outFields=*&where=ENERGY_SOU%3D%27WND%27&inSR=3857&outSR=4326&f=geojson",
    "zoomLevel":14
  },
  "Petroleum Terminals": {
    "url":"https://opendata.arcgis.com/datasets/84c768d289a142c2a29f0169917ebb97_0.geojson",
    "zoomLevel":14
  },
    "Oil Refineries": {
    "url":"https://opendata.arcgis.com/datasets/c89ad8bc4a924d43b57bc528571a46f7_0.geojson",
    "zoomLevel": 14
  },
  "Weather Radar Stations": {
    "url":"https://opendata.arcgis.com/datasets/ee95f43399c84c8082bda526685911bb_3.geojson",
    "zoomLevel":14
  },
  "State Capitol Buildings": {
    "url":"https://opendata.arcgis.com/datasets/ad458191727e475e8cf9685b6803ba7c_0.geojson",
    "zoomLevel":14
  },
  "Ferrous Metal Mining": {
    "url":"https://opendata.arcgis.com/datasets/687d8b5935bb4f0aaacea6e21e2df7e2_0.geojson",
    "zoomLevel":14
  },
  "Sand and Gravel Operations": {
    "url":"https://opendata.arcgis.com/datasets/868492d681864859bba34776efa437e7_0.geojson",
    "zoomLevel":14
  },
  "Major Sports Venues": {
    "url":"https://opendata.arcgis.com/datasets/15142d7e20074d2390efeab9a2fe9aa8_0.geojson",
    "zoomLevel":14
  },
  "Mobile Home Parks": {
    "url":"https://opendata.arcgis.com/datasets/76fab83b0d9f4590b5ddf42307810622_0.geojson",
    "zoomLevel":14
  },
  "Cruise Line Terminals": {
    "url":"https://opendata.arcgis.com/datasets/d07e477649a144e984c211ba3cf8fb2c_0.geojson",
    "zoomLevel":14
  }
};

// autoscroll to row in table of clicked item
function tableScroll(selectedID) {
  $('.dataTables_scrollBody').animate({
      scrollTop: $('#row_' + selectedID).offset().top - 602
  }, 0)
}

function getName(feature) {
    // adding the name info
    nameFields = ["PortName","FAIRGROUND","PRIMARY_NA","NAME","NAME1","siteName","SITE_NAME"];

    for (j = 0; j < nameFields.length; j++) {

      nameTest = [feature.properties[nameFields[j]]];

      if (nameTest != "") {
        return nameTest[0]
      } else {
      }
    }
}

function getLocation(feature) {

// adding the location info
    cityFields = ["CP_Name","CITY_NAME","CITY"]

    for (j = 0; j < cityFields.length; j++) {

      cityTest = [feature.properties[cityFields[j]]]

      if(cityTest != "") {
        var city = cityTest[0].replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      } else {
      }
    }

    stateFields = ["STATE_CODE","STATE","State"]

    for (j = 0; j < stateFields.length; j++) {

        stateTest = [feature.properties[stateFields[j]]]

      if(stateTest != "") {
        var state = stateTest[0]
      }
    }

    if (city != null && state != null) {
      var location = city + ", " + state;

    } else if (city != null) {
      var location = city;

    } else if (state != null) {
      var location = state;

    } else {
      var location = "";
    }

    return location
    console.log(location);
};

// as scroll down the page add more map divs
var scrollHandler = function(){
  if (currentProperties.featuresLoaded == false) {
    if($(window).scrollTop() >= $(document).height() - $(window).height() - 1000) {
      currentProperties.loadNumber = currentProperties.loadNumber + 1
      loadMapGrid(json, currentProperties.loadNumber, currentProperties.datasetName);
    }
  }
};
