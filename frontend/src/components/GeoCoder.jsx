import MapBoxGeocoder  from '@mapbox/mapbox-gl-geocoder';
import { useControl } from 'react-map-gl';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

const GeoCoder =(props)=>{
    let token = "pk.eyJ1Ijoic2FoaWxtYWxpeWEtNTYiLCJhIjoiY2x0Mzh5aGJ3MXVreDJycGxiOXIwamI0NCJ9.CPd5AYtiwyV3K2X_3cRY9Q";
    const ctrl = new MapBoxGeocoder({
        accessToken:token,
        marker:false,
        collapsed:false
    })
    useControl(()=>ctrl);
    ctrl.on('result',(e)=>{
        const coords = e.result.center
        props.setlong(coords[0])
        props.setlat(coords[1])
    })
    return null;
}

export default GeoCoder