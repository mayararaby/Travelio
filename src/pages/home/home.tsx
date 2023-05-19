import React, { useEffect } from 'react'
import './home.css'
import { ReducerState, Flight } from '../../common/interfaces'
import { useDispatch, useSelector } from 'react-redux'
import availableFlights from '../../mocks/availableFlights.json'
import {setMockedData} from '../../redux/actions/index'

import Header from '../../components/header/header'
import Footer from '../../components/footer/footer'
import ResultCard from '../../components/resultCard/resultCard'

export default function Home () {
  const Dispatch = useDispatch()


  useEffect(() => {
    Dispatch(setMockedData(availableFlights))
  }, [])

  const availableTrips:Record<string, {
    price: number
    flight: Flight[]
  }> = useSelector((state:ReducerState) => state.availableTrips)


  return (
    <>

      <div className='pageContent'>
        <Header name={'Travelio'} />
        {
          Object.keys(availableTrips).length
            ? <>
            <div>
              <div className="availableAirLinesTitle">
                Available trips on this airPlane
              </div>
              <div className="availableAirLines">

                {Object.keys(availableTrips).map(airPlane => (<ResultCard airPlaneDetails={availableTrips[airPlane]} airPlaneName={airPlane} />))}
              </div>
            </div>
          </>
            : null

        }
      </div>
      <Footer />
    </>
  )
}
