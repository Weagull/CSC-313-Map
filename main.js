import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import {Style, Circle, Fill, Stroke} from 'ol/style'; 

const circleStyles = {
  1: new Style({
    image: new Circle({
      radius: 7, 
      fill: new Fill({ color: 'yellow' }),
      stroke: new Stroke({ color: 'black', width: 1 }),
    }),
  }),
  2: new Style({
    image: new Circle({
      radius: 7, 
      fill: new Fill({ color: 'orange' }),
      stroke: new Stroke({ color: 'black', width: 1 }),
    }),
  }),
  3: new Style({
    image: new Circle({
      radius: 7, 
      fill: new Fill({ color: 'purple' }),
      stroke: new Stroke({ color: 'black', width: 1 }),
    }),
  }),
    4: new Style({
    image: new Circle({
      radius: 7, 
      fill: new Fill({ color: 'blue' }),
      stroke: new Stroke({ color: 'black', width: 1 }),
    }),
  }),
    5: new Style({
    image: new Circle({
      radius: 7, 
      fill: new Fill({ color: 'red' }),
      stroke: new Stroke({ color: 'black', width: 1 }),
    }),
  }),
};

const locations = [
  { coords: [-117.801609, 33.735685], count: 4 }, // Tustin CA
  { coords: [-118.325079, 34.182173], count: 1 }, // Burbank CA
  { coords: [-104.854792, 39.764418], count: 2 }, // Denver CO
  { coords: [-122.654387, 45.542817], count: 3 }, // Portland OR
    { coords: [-87.836202, 42.127520], count: 5 }, // NorthBrook IL
];

const features = locations.map(location => {
  const point = new Point(fromLonLat(location.coords));
  const feature = new Feature({ geometry: point });
  const styleIndex = Math.min(location.count, Object.keys(circleStyles).length);
  feature.setStyle(circleStyles[styleIndex]);
  return feature;
});

const vectorLayer = new VectorLayer({
  source: new VectorSource({ features }),
});

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    vectorLayer
  ],
  view: new View({
    center: fromLonLat([0, 0]), 
    zoom: 6
  })
});