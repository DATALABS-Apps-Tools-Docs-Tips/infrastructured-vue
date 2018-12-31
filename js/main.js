/**
 * infrastructured
 * @author Dee Harvey <dennis.cameron.harvey@gmail.com>
 */

// Define a new component called button-counter
Vue.component('header-component', {
  props: {
    categories: Array,
    datasets: Object,
    current: String
  },
  template: `
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top px-0">
   <div class="container-fluid">
     <a class="navbar-brand" href="#">Infrastructured</a>
     <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsiveTop" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
       <span class="navbar-toggler-icon"></span>
     </button>
     <div class="collapse navbar-collapse" id="navbarResponsiveTop">
       <ul class="navbar-nav ml-auto">
         <li v-on:click="toggleMap(false)" class="nav-item nav-link">Grid</li>
         <li v-on:click="toggleMap(true)" class="nav-item nav-link">Map</li>
       </ul>
     </div>
     <dropdown-menu
       v-bind:categories="categories"
       v-bind:datasets="datasets"
       v-bind:current="current">
     </dropdown-menu>
   </div>
  </nav>
  `,
  methods: {
    toggleMap(boolean) {
      this.$root.$data.mapVisible = boolean
    }
  }
}),

// Define the dropdown component
Vue.component('dropdown-menu', {
  props: {
    categories: Array,
    datasets: Object,
    current: String
  },
  template: `
    <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
     {{ current }}
    </button>
    <div class="dropdown-menu  dropdown-menu-right" aria-labelledby="dropdownMenu1">
        <div v-for='(value, key) in categorize'>
          <h6 class="dropdown-header">{{ key }}</h6>
          <button v-for="dataset in value" v-on:click="chooseData(dataset)" class="dropdown-item" type="button">{{ dataset }}</button>
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
      this.current = dataset
      this.$root.$data.features = this.$root.loadData(dataset)
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
          <tr v-for="(value, key, index) in features" :key="index">
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
    mouseOver() {
      this.$root.$data.hoveredFeature = this.index.toString()
    },
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
    // adjust the header widths when the collapse element is opened
    $(this.$refs.tableCollapse).on('shown.bs.collapse', this.adjustColumns)

    var table = this.table
    var self = this.$root.$data

    // when hover over row display on footer
    $('#table tbody').on('mouseover', 'tr', function () {
      self.hoveredFeature = table.row( this ).index().toString()
    });

    $('#table tbody').on('mouseout', 'tr', function () {
      self.hoveredFeature = null
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
    'current': String,
    'datasets': Object,
    'center': Object,
    'zoom': Number
  },
  template: `
    <div id="map-large" class="map-container">{{ features.length }}</div>
  `,
  data: function () {
    return {
      map: null,
      markers: []
    }
  },
  methods: {
    addMarkers(features) {
      var markers = {}
      for (i = 0; i < features.length; i++) {
        var coords = features[i].geometry.coordinates
        markers[i] = L.marker([coords[1], coords[0]])
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

        var map = this

        // zoom in on map when a marker is clicked
        markers[i].on('click', function () {
          self.$root.$data.selectedFeature = this._popup._content
          self.map.setView(this.getLatLng(), 14)
        });

        this.map.addLayer(markers[i])
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
      this.map = this.$root.createMap("map-large", [this.center['lat'],this.center['lng']], this.zoom, true)
      console.log('map created')

      this.addMarkers (this.features)
      console.log('markers added')

      var self = this;

      this.map.on('moveend', function(){
        self.$root.$data.mapCenter = L.latLng(this.getCenter());
        self.$root.$data.mapZoom = this.getZoom();
      });
  },
  updated: function () {
      this.removeMarkers ()

      this.addMarkers (this.features)
      console.log('markers updated')
  }
})

// GRID
const mapGrid = Vue.component('map-grid', {
  props: ['features'],
  template:`
    <div class="container">
      <div id="grid-container" class="row text-center text-lg-left pb-5 mb-5">
          <map-cell
            v-for="i in 50"
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
    <div v-on:click="loadMap()" v-bind:id="'map_' + index" @mouseover="mouseOver()" @mouseout="mouseOut()" class="d-block" style="padding-top: 100%; cursor: pointer;"></div>
  </div>
  `,
  methods: {
    loadMap() {
      this.$root.$data.mapCenter = { lat: this.feature.geometry.coordinates[1], lng: this.feature.geometry.coordinates[0] }
      this.$root.$data.mapZoom = 14
      this.$root.$data.mapVisible = true
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
    mapVisible: true,
    mapCenter: { lat: 39, lng: -98 },
    mapZoom: 4,
    categories: INFRASTRUCTURED.categories,
    datasets: INFRASTRUCTURED.datasets,
    currentDataset: "Oil Refineries",
    features: {},
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
      return map
    },

    // general function that loads data
    loadData(datasetName) {
      console.log("starting json load")

      var features;

      var my_url = this.datasets[datasetName].url

      features = (function () {
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

        return json.features;
      })();
      console.log("json loaded")
      return features
    }
  },
  created: function () {
    this.features = this.loadData(this.currentDataset)
  }
}).$mount('#app')

// router.replace('/map')
