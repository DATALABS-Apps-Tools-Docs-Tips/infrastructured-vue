/**
 * infrastructured
 * @author Dee Harvey <dennis.cameron.harvey@gmail.com>
 */

// Define a new component called button-counter
Vue.component('header-component', {
  template: `<nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top px-0">
   <div class="container-fluid">
     <a class="navbar-brand" href="#">Infrastructured</a>
     <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsiveTop" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
       <span class="navbar-toggler-icon"></span>
     </button>
     <div class="collapse navbar-collapse" id="navbarResponsiveTop">
       <ul class="navbar-nav ml-auto">
         <li class="nav-item"><router-link to="/grid" class="nav-link">Grid</router-link>
         </li>
         <li class="nav-item"><router-link to="/map" class="nav-link">Map</router-link>
         </li>
       </ul>
     </div>
     <dropdown-menu>
     </dropdown-menu>
   </div>
  </nav>`
})

// Define the dropdown component
Vue.component('dropdown-menu', {
  template: `<div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
     {{ this.$root.$data.currentDataset }}
    </button>
    <div class="dropdown-menu  dropdown-menu-right" aria-labelledby="dropdownMenu1">
        <div v-for='category in this.$root.$data.categories'>
          <h6 class="dropdown-header">{{ category.text }}</h6>
          <button v-for="dataset in category.datasets" v-on:click="chooseData(dataset)" class="dropdown-item" type="button">{{ dataset.name }}</button>
        </div>
    </div>
  </div>`,
  methods: {
    chooseData(dataset) {
      // this.$root.clearBox('grid-container')
      this.$root.$data.currentDataset = dataset.name
      this.$root.$data.json = this.$root.loadData(dataset.name)
    }
  }
})

// Define the data table component
Vue.component('data-table', {
  props: ['features'],
  template:`
  <nav class="navbar navbar-dark bg-dark fixed-bottom px-0">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#tableCollapse" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="text-light">Table</span>
      </button>
      <div class="collapse navbar-collapse text-light w-100" id="tableCollapse" ref="vuemodal">
        <div id="table-container">
          <table id="table" class="display nowrap" style="width:100%">
            <thead>
              <tr>
                <th v-for="(value, key, index) in features[0].properties" :key="index" class="pl-2 pr-4">{{ key }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(value, key, index) in features" :key="index">
                <td v-for="(v, k, ind) in value.properties" :key="ind" class="px-2">{{ v }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </nav>
  `,
  data: function () {
    return {
      table: null
    }
  },
  methods: {
    adjustColumns() {
      this.table.columns.adjust()
      console.log('table headers adjusted')
    }
  },
  mounted: function () {
    this.table = $('#table').DataTable({
      "scrollY": 200,
      "scrollX": true,
      "paging": false
    })
    console.log('table created')
    // adjust the header widths when the collapse element is opened
    $(this.$refs.vuemodal).on('shown.bs.collapse', this.adjustColumns)
  },
  beforeUpdate: function () {
    $('#table').DataTable().destroy()
  },
  updated: function () {
    this.table = $('#table').DataTable({
      "scrollY": 200,
      "scrollX": true,
      "paging": false
    })
    console.log("table updated")
  }
})

// Define the large map component
const mapLarge = Vue.component('map-large', {
  props: ['json'],
  template: `
    <div id="map-large" class="map-container">{{ json.features.length }}</div>
  `,
  data: function () {
    return {
      map: null,
      markers: []
    }
  },
  methods: {
    addMarkers(json) {
      for (i = 0; i < json.features.length; i++) {
        var coords = json.features[i].geometry.coordinates
        var marker = L.marker([coords[1], coords[0]]).bindPopup(json.features[i].properties.NAME)
        this.markers.push(marker)
        this.map.addLayer(this.markers[i])
      }
    },
    removeMarkers() {
      for(i=0;i<this.markers.length;i++) {
        this.map.removeLayer(this.markers[i]);
      }
      this.markers=[]
    }
  },
  mounted: function () {
      this.map = this.$root.createMap("map-large", [39, -98], 4, true)
      console.log('map created')
      this.addMarkers (this.json)
      console.log('markers added')
  },
  updated: function () {
      console.log(this.map)
      this.removeMarkers ()
      this.addMarkers (this.json)
      console.log('markers updated')
  }
})

// Define the map grid component
const mapGrid = Vue.component('map-grid', {
  props: ['json'],
  template:`
    <div class="container">
      <div id="grid-container" class="row text-center text-lg-left pb-5 mb-5">
          <map-cell v-for="(value, index) in json.features"
            v-bind:value="value"
            v-bind:index="index">
          </map-cell>
      </div>
    </div>`,
  methods: {
    clickMap(dataset) {
    }
  },
  mounted: function () {
      // as scroll down the page add more map divs
      // $(window).scroll(scrollHandler);
  },
  beforeUpdate: function () {
    this.$root.clearBox('grid-container')
    console.log('map grid cleared')
  },
  updated: function () {
    console.log('map grid updated')
  }
})

// Define the map cell component
Vue.component('map-cell', {
  props: ['value','index'],
  template:`
  <div class="col-lg-3 col-md-4 col-xs-6 p-1">
    <div v-on:click="" :id="'map_' + index" class="d-block" style="padding-top: 100%; cursor: pointer;">
      <div :id="'info_' + index" class="info position-absolute" style="z-index:1000;">
        <span class="info_name">{{ value.properties.NAME }}</span>
        <span class="info_location">{{ index }}</span>
      </div>
    </div>
  </div>
  `,
  mounted: function () {
    this.$root.createMap("map_" + this.index, [this.value.geometry.coordinates[1],this.value.geometry.coordinates[0]], 14, false)
  }
})

// Router
const router = new VueRouter({
  routes: [
    { path: '/map', component: mapLarge, props: true },
    { path: '/grid', component: mapGrid, props: true }
  ]
})

// Define the app
const app = new Vue({
  router,
  data: {
    currentDataset: "State Fairgrounds",
    categories: [
      { text: 'Agriculture', 'datasets': [
        { name: 'State Fairgrounds' },
        { name: 'Poultry Slaughtering and Processing Facilities' }
      ]},
      { text: 'Borders', 'datasets': [
        { name: 'Canada and Mexico Border Crossings' },
        { name: 'US Ports of Entry' }
      ]},
    ],
    json: null
  },
  methods: {
    clearBox(elementID)
      {
        document.getElementById(elementID).innerHTML = "";
      },
    createMap(div, coords, zoom, interactive) {
      var map = L.map(div,{
        center: coords,
        zoom: zoom,
        zoomControl: false,
        attributionControl: interactive,
        dragging: interactive,
        touchZoom: interactive,
        doubleClickZoom: interactive,
        scrollWheelZoom: interactive
      });
      // Add tile layer for Open Street Map to map object
      L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);
      return map
    },

    // general function that loads data
    loadData(datasetName) {

      var json;

      var my_url = dataDictionary[datasetName].url

      json = (function () {
        var json = null;
        $.ajax({
          'async': false,
          'global': false,
          'url': my_url,
          'dataType': "json",
          'success': function (data) {
              json = data;
          }
        });
        return json;
      })();

      return json
    }
  },
  created: function () {
    this.json = this.loadData(this.currentDataset)
  }
}).$mount('#app')

// router.replace('/map')
