import React, { FC,useEffect,useState } from 'react'
import AddressForm from '../../section/addressForm/addressForm'
import AdressTable from '../../section/addressTable/addressTable'
import CityTable from '../../section/cityTable/cityTable'
import CoordinatesForm from '../../section/coordinatesForm/coordinatesForm'
import CoordinatesTable from '../../section/coordinatesTable/coordinatesTable'
import DistrictForm from '../../section/districtForm/districtForm'
import DistrictTable from '../../section/districtTable/districtTable'
import Navbar from '../../section/navbar/navbar'
import PickUpPointForm from '../../section/pickUpPointForm/pickUpPointForm'
import PickUpPointTable from '../../section/pickUpPointTable/pickUpPointTable'
import RegionTable from '../../section/region/regionTable'
import RegionForm from '../../section/regionForm/regionForm'
import clasess from "./mapPages.module.sass"

interface MapProps{
    token:string|null
}


const MapPages:FC<MapProps> = ({token})=>{
    const [countAdress, SetCountAdress] = useState<number>(0)
    const [countCity, SetCountCity] = useState<number>(0)
    const [countRegion, SetCountRegion] = useState<number>(0)
    const [countDistrict, SetCountDistrict] = useState<number>(0)
    const [countCoordinates, SetCountCoordinates] = useState<number>(0)
    const [countPickUpPoint,SetCountPickUpPoint] = useState<number>(0)
    const [countAid,SetCountAid] = useState<number>(0)

    return(
        <div className={clasess.wrapper}>
            <Navbar/>
            <CityTable token={token} counterCity={countCity} updateCountCity={SetCountCity}/>
            <RegionForm token={token} counterRegion={countRegion} updateCountRegion={SetCountRegion}/>
            <RegionTable token={token} counterRegion={countRegion} updateCountRegion={SetCountRegion}/>
            <DistrictForm token={token} counterDistrict={countDistrict} updateCountDistrict={SetCountDistrict}/>
            <DistrictTable token={token} counterDistrict={countDistrict} updateCountDistrict={SetCountDistrict}/>
            <AddressForm token={token} counterAddress={countAdress} updateCountAddress={SetCountAdress}/>
            <AdressTable token={token} counterAdress={countAdress} updateCountAdress={SetCountAdress}/>
            <CoordinatesForm token={token} counterCoordinates={countCoordinates} updateCountCoordinates={SetCountCoordinates}/>
            <CoordinatesTable token={token} counterCoordinates={countCoordinates} updateCountCoordinates={SetCountCoordinates}/>
            <PickUpPointForm token={token} counterPickUpPoint={countPickUpPoint} updateCountPickUpPoint={SetCountPickUpPoint} />
            <PickUpPointTable token={token} counterAid={countAid} updateCountAid={SetCountAid}  counterPickUpPoint={countPickUpPoint} updateCountPickUpPoint={SetCountPickUpPoint} counterCity={countCity} updateCountCity={SetCountCity} counterRegion={countRegion} updateCountRegion={SetCountRegion} counterDistrict={countDistrict} updateCountDistrict={SetCountDistrict} counterAdress={countAdress} updateCountAdress={SetCountAdress} counterCoordinates={countCoordinates} updateCountCoordinates={SetCountCoordinates}></PickUpPointTable>
        </div>
    )
}
export default MapPages