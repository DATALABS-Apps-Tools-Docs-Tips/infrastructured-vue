var INFRASTRUCTURED = {
  categories: [
    "Agriculture",
    "Borders",
    "Energy",
    "Mining",
    "Government",
    "Public Venues"
  ],
  datasets: {
    "State Fairgrounds": {
      "url": "https://opendata.arcgis.com/datasets/7f35881c8860490ab6a76516978e9e15_0.geojson",
      "zoomLevel":15,
      "category": "Agriculture",
      "nameField": "FAIRGROUND",
      "cityField": "CITY",
      "stateField": "STATE"
    },
    "Poultry Slaughtering and Processing Facilities": {
      "url": "https://opendata.arcgis.com/datasets/b6b9cc72fb58476d92056d5c7ed25f8b_0.geojson",
      "zoomLevel":16,
      "category": "Agriculture",
      "nameField": "NAME",
      "cityField": "CITY",
      "stateField": "STATE"
    },
    "Canada and Mexico Border Crossings": {
      "url": "https://opendata.arcgis.com/datasets/33f493e577a44c2aa34450a898f16900_0.geojson",
      "zoomLevel":14,
      "category": "Borders",
      "nameField": "PortName",
      "cityField": "CP_Name",
      "stateField": "State"
    },
    "US Ports of Entry" : {
      "url": "https://opendata.arcgis.com/datasets/9ea04e9e2dd6465689a01eea5f3652fe_0.geojson",
      "zoomLevel":14,
      "category": "Borders",
      "nameField": "NAME",
      "cityField": "CITY",
      "stateField": "STATE"
    },
    "Natural Gas": {
      "url": "https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Environmental_Protection_Agency_EPA_Facility_Registry_Service_FRS_Power_Plants/FeatureServer/0/query?outFields=*&where=ENERGY_SOU%3D%27NG%27&inSR=3857&outSR=4326&f=geojson",
      "zoomLevel":14,
      "category": "Energy",
      "nameField": "PRIMARY_NA",
      "cityField": "CITY_NAME",
      "stateField": "STATE_CODE"
    },
    "Coal": {
      "url": "https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Environmental_Protection_Agency_EPA_Facility_Registry_Service_FRS_Power_Plants/FeatureServer/0/query?outFields=*&where=ENERGY_SOU%3D%27BIT%27+OR+ENERGY_SOU%3D%27SUB%27&inSR=3857&outSR=4326&f=geojson",
      "zoomLevel":14,
      "category": "Energy",
      "nameField": "PRIMARY_NA",
      "cityField": "CITY_NAME",
      "stateField": "STATE_CODE"
    },
    "Solid Waste": {
      "url": "https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Environmental_Protection_Agency_EPA_Facility_Registry_Service_FRS_Power_Plants/FeatureServer/0/query?outFields=*&where=ENERGY_SOU%3D%27MSW%27&inSR=3857&outSR=4326&f=geojson",
      "zoomLevel":14,
      "category": "Energy",
      "nameField": "PRIMARY_NA",
      "cityField": "CITY_NAME",
      "stateField": "STATE_CODE"
    },
    "Wood Waste": {
      "url": "https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Environmental_Protection_Agency_EPA_Facility_Registry_Service_FRS_Power_Plants/FeatureServer/0/query?outFields=*&where=ENERGY_SOU%3D%27WDL%27+OR+ENERGY_SOU%3D%27WDS%27&inSR=3857&outSR=4326&f=geojson",
      "zoomLevel":14,
      "category": "Energy",
      "nameField": "PRIMARY_NA",
      "cityField": "CITY_NAME",
      "stateField": "STATE_CODE"
    },
    "Hydroelectric": {
      "url": "https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Environmental_Protection_Agency_EPA_Facility_Registry_Service_FRS_Power_Plants/FeatureServer/0/query?outFields=*&where=ENERGY_SOU%3D%27WAT%27&inSR=3857&outSR=4326&f=geojson",
      "zoomLevel":14,
      "category": "Energy",
      "nameField": "PRIMARY_NA",
      "cityField": "CITY_NAME",
      "stateField": "STATE_CODE"
    },
    "Nuclear": {
      // "url": "https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Environmental_Protection_Agency_EPA_Facility_Registry_Service_FRS_Power_Plants/FeatureServer/0/query?outFields=*&where=ENERGY_SOU%3D%27NUC%27&inSR=3857&outSR=4326&f=geojson",
      "url": "https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Environmental_Protection_Agency_EPA_Facility_Registry_Service_FRS_Power_Plants/FeatureServer/0/query?where=ENERGY_SOU%3D%27NUC%27&objectIds=&time=&outFields=*&returnGeometry=true&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=4326&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnDistinctValues=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=",
      "zoomLevel":14,
      "category": "Energy",
      "nameField": "PRIMARY_NA",
      "cityField": "CITY_NAME",
      "stateField": "STATE_CODE"
    },
    "Solar": {
      "url": "https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Environmental_Protection_Agency_EPA_Facility_Registry_Service_FRS_Power_Plants/FeatureServer/0/query?outFields=*&where=ENERGY_SOU%3D%27SUN%27&inSR=3857&outSR=4326&f=geojson",
      "zoomLevel":14,
      "category": "Energy",
      "nameField": "PRIMARY_NA",
      "cityField": "CITY_NAME",
      "stateField": "STATE_CODE"
    },
    "Geothermal": {
      "url": "https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Environmental_Protection_Agency_EPA_Facility_Registry_Service_FRS_Power_Plants/FeatureServer/0/query?outFields=*&where=ENERGY_SOU%3D%27GEO%27&inSR=3857&outSR=4326&f=geojson",
      "zoomLevel":14,
      "category": "Energy",
      "nameField": "PRIMARY_NA",
      "cityField": "CITY_NAME",
      "stateField": "STATE_CODE"
    },
    "Wind": {
      "url": "https://services1.arcgis.com/Hp6G80Pky0om7QvQ/arcgis/rest/services/Environmental_Protection_Agency_EPA_Facility_Registry_Service_FRS_Power_Plants/FeatureServer/0/query?outFields=*&where=ENERGY_SOU%3D%27WND%27&inSR=3857&outSR=4326&f=geojson",
      "zoomLevel":14,
      "category": "Energy",
      "nameField": "PRIMARY_NA",
      "cityField": "CITY_NAME",
      "stateField": "STATE_CODE"
    },
    "Petroleum Terminals": {
      "url": "https://opendata.arcgis.com/datasets/84c768d289a142c2a29f0169917ebb97_0.geojson",
      "zoomLevel":14,
      "category": "Energy",
      "nameField": "NAME",
      "cityField": "CITY",
      "stateField": "STATE"
    },
      "Oil Refineries": {
      "url": "https://opendata.arcgis.com/datasets/c89ad8bc4a924d43b57bc528571a46f7_0.geojson",
      "zoomLevel": 14,
      "category": "Energy",
      "nameField": "NAME",
      "cityField": "CITY",
      "stateField": "STATE"
    },
    "Weather Radar Stations": {
      "url": "https://opendata.arcgis.com/datasets/ee95f43399c84c8082bda526685911bb_3.geojson",
      "zoomLevel":14,
      "category": "Government",
      "nameField": "siteID",
      "cityField": "siteName",
      "stateField": ""
    },
    "State Capitol Buildings": {
      "url": "https://opendata.arcgis.com/datasets/ad458191727e475e8cf9685b6803ba7c_0.geojson",
      "zoomLevel":14,
      "category": "Government",
      "nameField": "NAME1",
      "cityField": "CITY",
      "stateField": "STATE"
    },
    "Ferrous Metal Mining": {
      "url": "https://opendata.arcgis.com/datasets/687d8b5935bb4f0aaacea6e21e2df7e2_0.geojson",
      "zoomLevel":14,
      "category": "Mining",
      "nameField": "SITE_NAME",
      "cityField": "CITY",
      "stateField": "COUNTY"
    },
    "Sand and Gravel Operations": {
      "url": "https://opendata.arcgis.com/datasets/868492d681864859bba34776efa437e7_0.geojson",
      "zoomLevel":14,
      "category": "Mining",
      "nameField": "OPER_NAME",
      "cityField": "CITY",
      "stateField": "COUNTRY"
    },
    "Major Sports Venues": {
      "url": "https://opendata.arcgis.com/datasets/15142d7e20074d2390efeab9a2fe9aa8_0.geojson",
      "zoomLevel":14,
      "category": "Public Venues",
      "nameField": "NAME",
      "cityField": "CITY",
      "stateField": "STATE"
    },
    "Mobile Home Parks": {
      "url": "https://opendata.arcgis.com/datasets/76fab83b0d9f4590b5ddf42307810622_0.geojson",
      "zoomLevel":14,
      "category": "Public Venues",
      "nameField": "NAME",
      "cityField": "CITY",
      "stateField": "STATE"
    },
    "Cruise Line Terminals": {
      "url": "https://opendata.arcgis.com/datasets/d07e477649a144e984c211ba3cf8fb2c_0.geojson",
      "zoomLevel":14,
      "category": "Public Venues",
      "nameField": "NAME",
      "cityField": "CITY",
      "stateField": "STATE"
    }
  }
}
