import { FunctionComponent, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Copyright from "../Copyright/Copyright"

interface SignInProps {
  handleLogIn: (email: string, password: string, redirect: () => void) => void;
}

const SignIn: FunctionComponent<SignInProps> = ({ handleLogIn }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

  function redirectAfterLogin(): void {
    history.push("/");
  }

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleLogIn(email, password, redirectAfterLogin);
        }}
      >
        <h2>Sign In</h2>
        <label></label>
        <input
          key="email"
          name="email"
          placeholder="Email Address"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label></label>
        <input
          key="password"
          name="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button>Sign In</button>
        <span>
          <Link to="/register">Don't have an account? Sign Up</Link>
        </span>
      </form>
      <Copyright/>
    </div>
  );
};

export default SignIn;
