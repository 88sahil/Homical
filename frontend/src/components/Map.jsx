import React, { useCallback, useEffect, useState } from "react";
import ReactMapGl, { GeolocateControl, Marker, NavigationControl } from 'react-map-gl'
import '../../node_modules/mapbox-gl/dist/mapbox-gl.css'
import GeoCoder from "./GeoCoder";
const Map=(props)=>{
    let token = "pk.eyJ1Ijoic2FoaWxtYWxpeWEtNTYiLCJhIjoiY2x0Mzh5aGJ3MXVreDJycGxiOXIwamI0NCJ9.CPd5AYtiwyV3K2X_3cRY9Q";
    const [longitude,setlongitude] = useState(props.coordinates[1]|| 0);
    const [latitude,setlatitude] = useState(props.coordinates[0] || 0);
    const [zoom,setzoom] =useState(0);
    useEffect(()=>{
        setlatitude(props.coordinates[0])
        setlongitude(props.coordinates[1])
    },[props.coordinates])
    const handleDrag = (e)=>{
        setlatitude(e.lngLat.lat)
        setlongitude(e.lngLat.lng)
    }
    const handlemapClick = (e)=>{
        setlatitude(e.lngLat.lat)
        setlongitude(e.lngLat.lng)
        getLocationData();
    }
    const handleUserLocation = (e)=>{
        setlatitude(e.coords.latitude)
        setlongitude(e.coords.longitude)
    }
    const getLocationData =async()=>{
        let res = await fetch(`https://api.mapbox.com/search/geocode/v6/reverse?longitude=${longitude}&latitude=${latitude}.733&access_token=pk.eyJ1Ijoic2FoaWxtYWxpeWEtNTYiLCJhIjoiY2x0Mzh5aGJ3MXVreDJycGxiOXIwamI0NCJ9.CPd5AYtiwyV3K2X_3cRY9Q`);
        let data = await res.json();
        console.log(data)
        const address = data.features[0].properties.place_formatted 
        const city =  data.features[0].properties.context.place.name;
        props.location({
            coordinates:[latitude,longitude],
            address:address,
            City:city
        })
    }
    useEffect(()=>{
        getLocationData()
    },[latitude,longitude])
    return(
        <div style={{width:'1000px',height:'500px'}}>
            <ReactMapGl mapStyle="mapbox://styles/mapbox/streets-v11"  mapboxAccessToken={token} initialViewState={{longitude:longitude ||0,latitude:latitude ||0,zoom:10}} onClick={handlemapClick}>
                <Marker latitude={latitude} longitude={longitude} draggable onDragEnd={handleDrag}>
                </Marker>
                <NavigationControl position="bottom-right"  />
                <GeolocateControl position="top-left" trackUserLocation onGeolocate={handleUserLocation} />
                <GeoCoder setlong={setlongitude} setlat={setlatitude} />
            </ReactMapGl>
        </div>
    )
}
export default Map