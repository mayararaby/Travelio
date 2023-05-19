import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import United from '../../assets/AirLine/United.jpg'
import American from '../../assets/AirLine/American.jpg'
import Delta from '../../assets/AirLine/Delta.jpg'
import JetBlue from '../../assets/AirLine/JetBlue.jpg'
import Southwest from '../../assets/AirLine/Southwest.jpg'
import Alaska from '../../assets/AirLine/Alaska.jpg'
import './resultCard.css'
import {ImageSrc , ResultCardProps} from './interfaces'
import {Flight} from '../../common/interfaces'

export default function ResultCard(props:ResultCardProps) {
  const imageSrc:ImageSrc = {
    United,
    American,
    Delta,
    JetBlue,
    Southwest,
    Alaska
  }

  const { flight, price }:{ flight:Flight[], price:number} = props.airPlaneDetails

  const [showText, setShowText] = useState<boolean>(false);
  const navigate = useNavigate()

  // navigate to book form when user click on air plane
  const handelBook = () => {
    navigate("/book",{state:props});
  }

  return (

    <div className="cardContainerImage" onClick={handelBook}>
      <div className="backgroundImage"
        onMouseEnter={() => setShowText(true)}
        onMouseLeave={() => setShowText(false)}

        style={{ backgroundImage: `url(${imageSrc[props.airPlaneName]})` }}>
        <div className="layer" >
          {
            showText &&
            <>
              <div className='infoText'>
                <div>{props.airPlaneName}</div>
                <div>{price} $</div>
              </div>
              <div  className='infoTextSub'>
                <div>Available :&nbsp;{flight.length}</div>

              </div>
            </>
          }
        </div>

      </div>
    </div>
  );
}