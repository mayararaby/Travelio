import React from 'react'
import './header.css'
import leftImage from '../../assets/Header/left.png'
import rightImage from '../../assets/Header/right.png'
import comp from '../../assets/Header/comp.png'
import styled, { keyframes } from 'styled-components';
import { slideInLeft, slideInRight } from 'react-animations';
import imagesCard from '../../assets/Header/img.png';
import camera from '../../assets/Header/cam.png';
import sea from '../../assets/Header/sea.png';
import travel from '../../assets/Header/travel.png';
import Dropdown from '../dropDown/dropDown'
import line from '../../assets/Header/line.png'
export default function Header(props: { name: string }) {


  //animation
  const SlideInLeftAnimation = keyframes`${slideInLeft}`;
  const StyledDivLeft = styled.div`
    animation: 2s ${SlideInLeftAnimation};`;

  const SlideInRightAnimation = keyframes`${slideInRight}`;

  const StyledDivRight = styled.div`
  animation: 1s ${SlideInRightAnimation};`;

  const zoomInUpAnimation = keyframes`
  from {
    transform: scale(0.2) translateY(50px);
    opacity: 0;
  }
  to {
    transform: scale(1) translateY(0);
    opacity: 1;}`;

  const ZoomAnimation = styled.div`
  animation: 1s ${zoomInUpAnimation} forwards;
  transform-origin: center;
  opacity: 0; `;
  const TravelComponentAnimation = styled.div`
  animation: 2s ${zoomInUpAnimation} forwards;
  transform-origin: center;
  opacity: 0; `;

  return (
    <>
      <div className='mainHeaderContainer fullSectionWidth'>
        <div className='firstSectionWidth'>
          <StyledDivLeft>
            <img src={leftImage} alt='leftImage' className='imageSize' />
          </StyledDivLeft>
        </div>


        <div className='centerHeaderContainer centerSectionWidth'>
          <div>
            <ZoomAnimation>

              <img src={imagesCard} alt='imagesCard' className='imageSize' />
            </ZoomAnimation>
          </div>

          <div>
            <div className='titleText'>
              {props.name}
            </div>

            <div className='titleDescription'>
              {props.name === 'TRAVELIO' && <>
                <div className='descriptionFontSize'>
                  Escape to Your Ideal Destination
                </div>
                <div>

                  Create Unforgettable Memories
                </div>
                <div className='descriptionFontSize'>

                  Discover Your Dream
                </div>
              </>}
            </div>
          </div>
          <div>
            <img src={line} alt='line' style={{ position: "absolute", left: "0px" }} className='imageSize' />
          </div>
          <div>

            <ZoomAnimation>

              <img src={camera} alt='camera' className='imageSize absolutePosition cameraPosition' />
            </ZoomAnimation>
          </div>


        </div>

        <div className='lastSectionWidth'>
          <StyledDivRight>

            <img src={rightImage} alt='rightImage' className='imageSize' />
          </StyledDivRight>

        </div>
      </div>
      <div className='centerHeaderContainerSecondSection fullSectionWidth'>
        <div>
          <ZoomAnimation>
            <img src={comp} alt='compass' className='imageSize'
            />

          </ZoomAnimation>
        </div>
        <div className='discoverContainer'>


          {props.name === 'TRAVELIO' ? <Dropdown /> : null}
        </div>

        <div>
          <ZoomAnimation >
            <img src={sea} alt='sea' className='imageSize' />
          </ZoomAnimation>
        </div>

        <div className='travel'>
          <TravelComponentAnimation >
            <img src={travel} alt='travel' className='imageSize' />
          </TravelComponentAnimation>
        </div>
      </div>
    </>
  )
}
