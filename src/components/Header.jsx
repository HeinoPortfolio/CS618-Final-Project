import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../contexts/AuthContext'
import { User } from './User.jsx'

export function Header() {
  const [token, setToken] = useAuth()

  if (token) {
    const { sub } = jwtDecode(token)

    return (
      <div>
        <h1>Welcome to the Recipe Blog! </h1>
        Logged in as:<b><User id={sub}/></b>
        <br />
        <button onClick={() => setToken(null)}> Logout</button>
      </div>
    )
  }

  return (
    <div>
      <h1>Welcome to the Recipe Blog! </h1>
      <br />
      <Link to='/login'> Login Here </Link> |
      <Link to='/signup'> Sign Up Here</Link>
    </div>
  )
}
