import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../helpers/firebase'

export const UserContext = createContext({ user: null })

const UserProvider: React.FC = ({ children }): JSX.Element => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      setUser(userAuth)
    })
  }, [])
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useUser = (): any => useContext(UserContext)

export default UserProvider
