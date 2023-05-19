import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import Footer from '../../components/footer/footer'
import leftImage from '../../assets/Header/left.png'
import rightImage from '../../assets/Header/right.png'
import styled, { keyframes } from 'styled-components';
import { slideInLeft, slideInRight } from 'react-animations';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReducerState } from '../../common/interfaces';
import BookForm from '../../components/bookForm/bookForm'
import './book.css'

export default function Book() {
  const location = useLocation();
  const navigate = useNavigate();

  const availableTripsStored = useSelector((state:ReducerState) => state.availableTrips)

  useEffect(() => {
    if (!Object.keys(availableTripsStored).length) navigate('/')
  }, [availableTripsStored, navigate])

  const airPlaneName:string = location.state?.airPlaneName
  
  const SlideInLeftAnimation = keyframes`${slideInLeft}`;
  const StyledDivLeft = styled.div`
    animation: 2s ${SlideInLeftAnimation};`;

  const SlideInRightAnimation = keyframes`${slideInRight}`;
  const StyledDivRight = styled.div`
  animation: 1s ${SlideInRightAnimation};`;




  return (
    <>
      <div className='mainHeaderContainer fullSectionWidth bookContainer'>
        <div className='firstSectionWidth'>
          <StyledDivLeft>
            <img src={leftImage} alt='leftImage' className='imageSize' />
          </StyledDivLeft>
        </div>


        <div className='centerSectionWidth bookSectionCenter'>
          <div className='bookFlightHeader'>
            Book a flight
          </div>
          <div className='bookFlightDescription'>
            {airPlaneName} - Airplane
          </div>
          {location.state && <BookForm flightInfo={location.state} />}
        </div>

        <div className='lastSectionWidth'>
          <StyledDivRight>

            <img src={rightImage} alt="rightImage" className='imageSize' />
          </StyledDivRight>

        </div>
      </div>
      <Footer />

    </>
  )
}
