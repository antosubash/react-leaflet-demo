import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import * as parkData from "./data/grow.json";
import "./App.css";
import {
  ButtonBack, ButtonFirst, ButtonLast, ButtonNext,
  CarouselProvider, DotGroup, ImageWithZoom, Slide, Slider,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
export const icon = new Icon({
  iconUrl: "/skateboarding.svg",
  iconSize: [25, 25]
});

export default function App() {
  const [activeLocation, setActiveLocation] = React.useState(null);
  return (
    <Map center={[48.2082, 16.3738]} zoom={9}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {parkData.features.map(location => (
        <Marker
          key={location.properties.Id}
          position={[
            location.geometry.coordinates[1],
            location.geometry.coordinates[0]
          ]}
          onClick={() => {
            console.log(location)
            setActiveLocation(location);
          }}
        />
      ))}

      {activeLocation && (
        <Popup
          position={[
            activeLocation.geometry.coordinates[1],
            activeLocation.geometry.coordinates[0]
          ]}
          style={{
            "width": "100%"
          }}
          onClose={() => {
            setActiveLocation(null);
          }}
        >
          <div id="content">
            <div id="left">
              <div className="carousel-div">
                <CarouselProvider
                  visibleSlides={1}
                  totalSlides={6}
                  step={1}
                  naturalSlideWidth={700}
                  naturalSlideHeight={700}
                  hasMasterSpinner
                >
                  <Slider className="slider">
                    {activeLocation.properties.Data.Pictures.map((currentValue, index) =>
                      <Slide index={index}>
                        <ImageWithZoom src={currentValue.Url} />
                      </Slide>
                    )}
                  </Slider>
                  <ButtonFirst>First</ButtonFirst>
                  <ButtonBack>Back</ButtonBack>
                  <ButtonNext>Next</ButtonNext>
                  <ButtonLast>Last</ButtonLast>
                  <DotGroup />
                </CarouselProvider> 
              </div>
            </div>
            <div id="right">
              <p>Ttransaction : {activeLocation.properties.Ttransaction}</p>
              <p>Sub : {activeLocation.properties.Userdata.Sub}</p>
              {/* <span>LandCover : {activeLocation.properties.Data.Land.LandCover}</span> */}
            </div>
          </div>


        </Popup>
      )}
    </Map>
  );
}
