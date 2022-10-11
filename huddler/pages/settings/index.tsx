import SettingsForm from "../../src/components/Profile components/Settings"
// import {User} from '../../src/types'
//mock user
const user: User = {
  name: 'Florio',
  email: 'flo@flo.flo',
}
export interface User {
  name: string;
  email: string;
  createdOn?: number;
  id?: number;
  password?: string;
  firstName?: string;
  lastName?: string;
  avatar?: StaticImageData |string;
  dateOfBirth?: Date;
}


const SettingsPage = () => {
  return <SettingsForm user={user}/>
}

export default SettingsPage
