import React from 'react';
import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import classes from "./map.module.sass";
import L from "leaflet"
import {PointItem} from '../../../types/points';
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useActions} from "../../../hooks/useActions";

const Map:React.FC = () => {
  const {points} = useTypedSelector(state => state)
  const {setPointActive} = useActions()

  const state = {
    lat: 47.848391,
    lng: 35.148229,
    zoom: 12
  };
  const center:[number, number] = [state.lat, state.lng];
  const customIcon = new L.Icon({
    iconUrl: require('../../../img/location.svg').default,
    iconRetinaUrl: require('../../../img/location.svg').default,
    iconSize: new L.Point(60, 75),
  });
  const customIconActive = new L.Icon({
    iconUrl: require('../../../img/location-active.svg').default,
    iconRetinaUrl: require('../../../img/location-active.svg').default,
    iconSize: new L.Point(60, 75),
  });


  const render = (point:PointItem) => {
    if (points.filter !== null && points.filter !== 'Все' && points.filter !== point.region) return
    return <Marker
      position={[point.lat, point.lng]}
      key={point.id}
      icon={point.id === points.active ? customIconActive : customIcon}
      eventHandlers={{
        click: () => {
          //setPointActive(point.id)
        }
      }}
    >
      <Popup>
        <p>{point.phone}</p>
        <p>{point.privileges}</p>
        <p>{point.author}</p>
      </Popup>
    </Marker>
  }

  return(
    <MapContainer center={center} zoom={state.zoom} className={classes.map}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {points.points.map((point: PointItem) =>
        render(point)
      )}

    </MapContainer>
  )
};

export default Map;