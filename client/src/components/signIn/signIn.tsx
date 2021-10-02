import {FC, ReactElement, useState, useCallback} from 'react';
import {Link} from 'react-router-dom';


const SignIn: FC = (children:React.ReactNode):ReactElement => {
  const {handleLogin} = children
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>Sign In</h2>
        <label></label>
        <input
          key="email"
          name="email"
          placeholder='Email Address'
          type="text"
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          required
        />
        <label></label>
        <input
          key="password"
          name="password"
          placeholder='Password'
          type="password"
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
          required
        />
        <button
        />
        <span ><Link to="/register">Don't have an account? Sign Up</Link></span>
      </form>

    </div>
  )
}

export default SignIn