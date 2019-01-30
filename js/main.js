/**
 * infrastructured
 * @author Dee Harvey <dennis.cameron.harvey@gmail.com>
 */

// Define a new component called button-counter
Vue.component('header-component', {
  props: {
    location: Boolean,
    categories: Array,
    datasets: Object,
    current: String
  },
  template: `
  <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
   <a class="navbar-brand" href="#">Infrastructured</a>
   <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsiveTop" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
     <span class="navbar-toggler-icon"></span>
   </button>
   <div class="collapse navbar-collapse justify-content-end" id="navbarResponsiveTop">
     <form class="mr-2">
      <input class="form-control search" v-bind:class="{'bg-dark':!location}" v-model="locationInput" @keyup.enter="chooseLocation()" type="search" placeholder="enter location" aria-label="Search">
      </form>
     <dropdown-menu
       v-bind:location="location"
       v-bind:categories="categories"
       v-bind:datasets="datasets"
       v-bind:current="current">
     </dropdown-menu>
   </div>
  </nav>
  `,
  data: function () {
    return {
      locationInput: ''
    }
  },
  methods: {
    toggleMap(boolean) {
      this.$root.$data.mapVisible = boolean
    },
    chooseLocation() {
      console.log(this.locationInput)
      this.$root.$data.byLocation = true
      this.$root.$data.currentDataset = 'Nuclear'
      this.$root.$data.features = this.$root.loadProximity('Nuclear')
    }
  }
}),

// Define the dropdown component
Vue.component('dropdown-menu', {
  props: {
    location: Boolean,
    categories: Array,
    datasets: Object,
    current: String
  },
  template: `
    <div class="dropdown">
    <button class="btn dropdown-toggle" v-bind:class="{'btn-outline-secondary':location, 'btn-info':!location}" @click="byType()" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
     {{ current }}
    </button>
    <div class="dropdown-menu  dropdown-menu-right" aria-labelledby="dropdownMenu1">
        <div v-for='(value, key) in categorize'>
          <h6 class="dropdown-header">{{ key }}</h6>
          <button v-for="dataset in value" @click="chooseData(dataset)" class="dropdown-item" type="button">{{ dataset }}</button>
        </div>
    </div>
  </div>
  `,
  computed: {
    categorize: function() {
      var categorized = {}
      for ( var i = 0; i < this.categories.length; i++ ) {
        category = this.categories[i]
        categorized[category] = []
        for ( var key in this.datasets ) {
          if ( this.datasets[key].category === category ) {
            categorized[category].push(key)
          }
        }
      }
      return categorized
    }
  },
  methods: {
    chooseData(dataset) {
      // this.$root.clearBox('grid-container')
      this.$root.$data.currentDataset = dataset
      this.$root.$data.features = this.$root.loadType(dataset)
    },
    byType() {
      this.$root.$data.byLocation = false
    }
  }
})

Vue.component('sidebar', {
  props: {
    'mapVisible': Boolean,
    'mapIsMoved': Boolean
  },
  template:`
  <div class="navbar-side fixed-top p-0">
    <button class="btn btn-circle bg-dark text-light" @click="toggleMap(true)" type="button" aria-haspopup="true" aria-expanded="false">M
    </button>
    <button class="btn btn-circle bg-dark text-light" @click="toggleMap(false)" type="button" aria-haspopup="true" aria-expanded="false">G
    </button>
    <button class="btn btn-circle bg-dark text-light" v-if="mapIsMoved" @click="zoomOut()" type="button" aria-haspopup="true" aria-expanded="false">-
    </button>
  </div>
  `,
  methods: {
    toggleMap(boolean) {
      this.$root.$data.mapVisible = boolean
    },
    zoomOut() {
      this.$root.$emit('updateMap', { lat: 39, lng: -98 }, 4);
    }
  }
})

// Define the data table component
Vue.component('footer-component', {
  props: {
    'features': Array,
    'hovered': String,
    'info': Object
  },
  template:`
  <nav class="navbar navbar-dark bg-dark fixed-bottom px-0">
    <div class="container-fluid">
      <div class="text-secondary">
        <span><p class="m-0"><strong>{{ info.name }}</strong> {{ info.location }}</p></span>
      </div>
      <button class="btn btn-outline-secondary btn-sm" type="button" data-toggle="collapse" data-target="#tableCollapse" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span>Table</span>
      </button>
    </div>
    <data-table
      v-bind:features="features"
      v-bind:hovered="hovered">
    </data-table>
  </nav>
  `
})

// Define the data table component
Vue.component('data-table', {
  props: {
    'features': Array,
    'hovered': String
  },
  template:`
  <div class="collapse navbar-collapse text-secondary w-100" id="tableCollapse" ref="tableCollapse">
    <div id="table-container">
      <table id="table" class="display nowrap" style="width:100%">
        <thead>
          <tr>
            <th v-for="(value, key, index) in features[0].properties" :key="index" class="pl-2 pr-4">{{ key }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, key, index) in features" :key="index" @mouseover="mouseOver(key)" @mouseout="mouseOut()" @click="clickRow(value)">
            <td v-for="(v, k, ind) in value.properties" :key="ind" class="px-2">{{ v }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
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
    },
    mouseOver(index) {
      this.$root.$data.hoveredFeature = index.toString()
    },
    mouseOut() {
      this.$root.$data.hoveredFeature = null
    },
    clickRow(feature) {
      if (this.$root.$data.mapVisible == true) {
        coords = { lat: feature.geometry.coordinates[1], lng: feature.geometry.coordinates[0] }
        this.$root.$emit('updateMap', coords, 14);
      } else {
        this.$root.loadMap(feature)
      }
    },
    getRowOrder() {
      this.$root.$data.featureOrder = this.table.rows({ filter : 'applied'})[0]
    }
  },
  mounted: function () {
    this.table = $('#table').DataTable({
      'scrollY': 200,
      'scrollX': true,
      'paging': false,
      'language': {
        'search': '',
        'searchPlaceholder': 'search'
      }
    })
    console.log('table created')

    // $(#table.rows(1).nodes()).addClass("highlight")

    // adjust the header widths when the collapse element is opened
    $(this.$refs.tableCollapse).on('shown.bs.collapse', this.adjustColumns)

    // get the row order and update root
    this.getRowOrder()

    // listen for row reordering and update row order in root
    var self = this
    this.table.on('draw.dt', function() {
      self.getRowOrder()

      self.$root.$emit('updateMarkers');
      console.log('table redrawn')
    });
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

// LARGE MAP
const mapLarge = Vue.component('map-large', {
  props: {
    'features': Array,
    'order': Array,
    'current': String,
    'datasets': Object,
    'center': Object,
    'zoom': Number
  },
  template: `
    <div id="map-large" class="map-container">{{ order.length }}{{ zoom }}</div>
  `,
  data: function () {
    return {
      map: null,
      markers: {},
      localCurrent: null
    }
  },
  methods: {
    addMarkers(features) {
      var markers = {}
      for (i = 0; i < this.order.length; i++) {
        var coords = features[this.order[i]].geometry.coordinates
        markers[i] = L.circleMarker([coords[1], coords[0]], {
           radius: 6,
           stroke: true,
           color: 'white',
           opacity: 1,
           weight: 1,
           fill: true,
           fillColor: '#17a2b8',
           fillOpacity: 1
        })
          // add a popup
          .bindPopup(i.toString())

        var self = this;

        // make popup visible on mouseover
        markers[i].on('mouseover', function () {
            // this.openPopup();
            self.$root.$data.hoveredFeature = this._popup._content
        });
        markers[i].on('mouseout', function () {
            // this.closePopup();
            self.$root.$data.hoveredFeature = null
        });

        // zoom in on map when a marker is clicked
        markers[i].on('click', function () {
          self.$root.$data.selectedFeature = this._popup._content
          self.map.setView(this.getLatLng(), 14)
        });

        this.map.addLayer(markers[i])

        this.markers = markers
      }
      console.log('markers added')
    },
    removeMarkers() {
      for(i in this.markers) {
        this.map.removeLayer(this.markers[i]);
      }
      this.markers={}
      console.log('markers removed')
    }
  },
  mounted: function () {

      this.map = this.$root.createMap("map-large", [this.center['lat'],this.center['lng']], this.zoom, true)
      console.log('map created')

      this.addMarkers (this.features)
      console.log('markers added')

      var self = this;

      this.map.on('click', function(e) {
        self.$root.$data.byLocation = true
        self.$root.$data.currentDataset = 'Nuclear'
        self.$root.$data.features = self.$root.loadProximity('Nuclear', e.latlng.lat, e.latlng.lng)
      });

      this.map.on('moveend', function(){
        self.$root.$data.mapCenter = L.latLng(this.getCenter());
        self.$root.$data.mapZoom = this.getZoom();
      });

      this.$root.$on('updateMap', function (coords, zoomLevel) {
        self.map.setView(coords, zoomLevel)
      })

      this.$root.$on('updateMarkers', function () {
        self.removeMarkers ()
        self.addMarkers(self.features)
      })
  },
  updated: function() {
    if (this.localCurrent == null) {
      this.localCurrent = this.current

    } else if (this.localCurrent != this.current) {
      this.removeMarkers ()
      this.addMarkers (this.features)
      this.localCurrent = this.current

    } else {
      this.localCurrent = this.current
    }
  }
})

// GRID
const mapGrid = Vue.component('map-grid', {
  props: {
    'features': Array,
    'order': Array
  },
  template:`
    <div class="container">
      <div id="grid-container" class="row text-center text-lg-left pb-5 mb-5">
          <map-cell
            v-for="i in order"
            v-bind:key="features[i].geometry.coordinates[0]"
            v-bind:feature="features[i]"
            v-bind:index="i">
          </map-cell>
      </div>
    </div>`,
  methods: {
    clickMap(dataset) {
    }
  },
  mounted: function () {
    console.log(this.order)
      // as scroll down the page add more map divs
      // $(window).scroll(scrollHandler);
  },
  beforeUpdate: function () {
    // this.$root.clearBox('grid-container')
    console.log('map grid cleared')
  },
  updated: function () {
    console.log('map grid updated')
  }
})

// MAP CELL
Vue.component('map-cell', {
  props: {
    'feature': Object,
    'index': Number
  },
  template:`
  <div class="col-lg-3 col-md-4 col-xs-6 p-1">
    <div @click="clickCell(feature)" v-bind:id="'map_' + index" @mouseover="mouseOver()" @mouseout="mouseOut()" class="map-cell d-block"></div>
  </div>
  `,
  methods: {
    clickCell(feature) {
      this.$root.loadMap(feature)
    },
    mouseOver() {
      this.$root.$data.hoveredFeature = this.index.toString()
    },
    mouseOut() {
      this.$root.$data.hoveredFeature = null
    }
  },
  mounted: function () {
    this.$root.createMap("map_" + this.index, [this.feature.geometry.coordinates[1],this.feature.geometry.coordinates[0]], 14, false)
  }
})

// ROUTER
const router = new VueRouter({
  routes: [
    // { path: '/map', component: mapLarge, props: true },
    // { path: '/grid', component: mapGrid, props: true }
  ]
})

// Define the app
const app = new Vue({
  router,
  data: {
    byLocation: false,
    mapVisible: true,
    mapCenter: { lat: 39, lng: -98 },
    mapZoom: 4,
    categories: INFRASTRUCTURED.categories,
    datasets: INFRASTRUCTURED.datasets,
    currentDataset: "Oil Refineries",
    features: {},
    featureOrder: [],
    hoveredFeature: null,
    selectedFeature: null
  },
  computed: {
    // get the name and location of the feature that's hovered over
    hoveredInfo: function () {
      info = {}
      if (this.hoveredFeature !== null) {
        info.name = this.features[this.hoveredFeature].properties[this.datasets[this.currentDataset].nameField]
        city = this.features[this.hoveredFeature].properties[this.datasets[this.currentDataset].cityField]
        state = this.features[this.hoveredFeature].properties[this.datasets[this.currentDataset].stateField]
        info.location = city + ',  ' + state
      } else {
        info.name = ""
        info.location = ""
      }
      return info
    },
    mapIsMoved: function () {
      if (Math.round(this.mapCenter.lat) == 39 && Math.round(this.mapCenter.lng) == -98 && this.mapZoom == 4) {
        result = false
      } else {
        result = true
      }
      return result
    }
  },
  methods: {
    // general function for creating a map
    createMap(div, coords, zoom, interactive) {
      var map = L.map(div,{
        center: coords,
        zoom: zoom,
        zoomControl: false,
        attributionControl: false,
        dragging: interactive,
        touchZoom: interactive,
        doubleClickZoom: interactive,
        scrollWheelZoom: interactive
      });
      // Add tile layer for Open Street Map to map object
      L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }).addTo(map);

      L.tileLayer('https://api.mapbox.com/styles/v1/dcharvey/cjr5vba8c18q12srycjduvwih/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGNoYXJ2ZXkiLCJhIjoiY2ltemVpNjY1MDRlanVya2szYzlnM2dxcyJ9.im9EDlP7YIYefEt_wz2fww').addTo(map);

      return map
    },

    // load a large map at a specific data feature
    loadMap(feature) {
      this.mapVisible = true
      this.mapCenter = { lat: feature.geometry.coordinates[1], lng: feature.geometry.coordinates[0] }
      this.mapZoom = 14
    },

    // general function that loads data
    loadData(url) {
      console.log("starting json load")

      var features;

      features = (function () {
        var json = null;
        $.ajax({
          'async': false,
          'global': false,
          'url': url,
          'dataType': "json",
          'success': function (data) {
              json = data;
          }
        });

        return json.features;
      })();
      console.log("json loaded")
      return features
    },

    loadType(datasetName) {
      var url = this.datasets[datasetName].url

      return this.loadData(url)
    },

    // this function will load all features within a certain proximity
    loadProximity(datasetName, lat, lng) {

      lat = Math.round(lat * 1000) / 1000
      lng = Math.round(lng * 1000) / 1000
      console.log(lng.toString() + ', ' + lat.toString())

      var buffer = '&geometry=' + lng.toString() + '%2C' + lat.toString() + '&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&resultType=none&distance=1000000&units=esriSRUnit_Meter&returnGeodetic=false'

      var url = this.datasets[datasetName].url + buffer

      return this.loadData(url)
    }
  },
  created: function () {
    this.features = this.loadType(this.currentDataset)

    var order = []

    for (i=0; i<this.features.length; i++) {
      order.push(i)
    }

    this.featureOrder = order
  }
}).$mount('#app')

// router.replace('/map')
