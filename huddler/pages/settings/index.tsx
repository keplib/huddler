import { useState } from "react";
import SettingsForm from "../../src/components/Profile components/Settings"
import {User} from '../../src/types'
//mock user
const user: User = {
  name: 'Florio',
  email: 'flo@flo.flo',
}

const SettingsPage = () => {
  const [currentUser, setCurrentUser] = useState<User>(user)
  return <SettingsForm currentUser={currentUser}/>
}

export default SettingsPage
