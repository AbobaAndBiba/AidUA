import React, {FC} from 'react';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import classes from "../../../style/sections/map/map.module.sass";
import {IPointItem} from "../../../types";

interface IPointList{
  items: IPointItem[]
}

const Map: FC<IPointList> = ({items}) => {
  const state = {
    lat: 47.848391,
    lng: 35.148229,
    zoom: 12
  };
  const center:[number, number] = [state.lat, state.lng];

  return(
    <MapContainer center={center} zoom={state.zoom} className={classes.map}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((point) =>
        <Marker position={[point.lat, point.lng]} >
          <Popup>Какой то крутой текст!!!</Popup>
        </Marker>
      )}

    </MapContainer>
  )
};

export default Map;