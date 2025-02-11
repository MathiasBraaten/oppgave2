import React, { useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";

// Styling of OpenLayers components like zoom and pan controls
import "ol/ol.css";
import VectorLayer from "ol/layer/Vector";
import { GeoJSON } from "ol/format";
import VectorSource from "ol/source/Vector";
import { Stroke, Style } from "ol/style";

// By calling the "useGeographic" function in OpenLayers, we tell that we want coordinates to be in degrees
//  instead of meters, which is the default. Without this `center: [10.6, 59.9]` brings us to "null island"
useGeographic();

// Here we create a Map object. Make sure you `import { Map } from "ol"`. Otherwise, the standard Javascript
//  map data structure will be used
const map = new Map({
  view: new View({ center: [10.8, 59.9], zoom: 9 }),
  layers: [
    new TileLayer({ source: new OSM() }),
    new VectorLayer({
      source: new VectorSource({
        url: "/oppgave2/geojson/fylker.json",
        format: new GeoJSON(),
      }),
      style: new Style({
        stroke: new Stroke({
          color: "blue",
          width: 2,
        }),
      }),
    }),
  ],
});

// A functional React component
export default function Application() {
  // `useRef` bridges the gap between JavaScript functions that expect DOM objects and React components
  const mapRef = useRef<HTMLDivElement | null>(null);
  // When we display the page, we want the OpenLayers map object to target the DOM object refererred to by the
  // map React component
  useEffect(() => {
    map.setTarget(mapRef.current!);
  }, []);

  // This is the location (in React) where we want the\ map to be displayed
  return <div ref={mapRef}></div>;
}
