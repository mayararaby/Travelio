import { Flight ,UserInfo} from "../../../common/interfaces"
import { ResultCardProps } from "../../resultCard/interfaces"
export interface FirstStepProps {
  selectedFlight : Flight | Record<string, unknown>
  flightInfo:  ResultCardProps

}

export interface BookFormProps {
  flightInfo:  ResultCardProps
}
export interface SecondStepProps {
  flightInfo:  ResultCardProps
  userInfo:UserInfo
  selectedFlight : Flight
}
export interface ThirdStepProps {
  flightInfo:  ResultCardProps
  userInfo:UserInfo
  selectedFlight : Flight
}

export interface FormData {
  firstName: string,
  lastName: string,
  mobileNumber: string,
  email: string,
  tickets: number,
  departureTime: string|unknown,
}