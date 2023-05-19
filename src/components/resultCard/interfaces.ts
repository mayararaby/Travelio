import {Flight} from '../../common/interfaces'
export interface ImageSrc {
  United : string
  American : string
  Delta : string
  JetBlue : string
  Southwest : string
  Alaska :string
  [key: string]: string
}
interface AirPlaneDetails {
  price: number
  flight: Flight[]
}
export interface ResultCardProps {
  airPlaneName : string
  airPlaneDetails:AirPlaneDetails
}

