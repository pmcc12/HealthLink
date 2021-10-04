import {render, screen} from '@testing-library/react';
import SignIn from '../components/signIn/signIn.tsx';
import userEvent from '@testing-library/user-event';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';

describe('sign in component', () => {
  const mockSignIn = jest.fn(()=>{});
  const MockComponent = () => {
    return (
      <div>
      <p>mock</p>
      </div>
    )
  }

  test('should match the snapshot', () => {
    const {container} = render(
      <Router>
        <SignIn handleLogIn={mockSignIn}/>
      </Router>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('email and password should be present on form',()=>{
    render(
      <Router>
        <SignIn handleLogIn={mockSignIn}/>
      </Router>
    );
    screen.getByPlaceholderText('Email Address');
    screen.getByPlaceholderText('Password');
  } );

  test('should not be able to attempt sign in if password or email are blank', ()=> {
    // const spy = jest.spyOn(SignInSide,'handleSubmit');
    render(
      <Router>
        <SignIn handleLogIn={()=>mockSignIn}/>
      </Router>
    );
    const email = screen.getByPlaceholderText('Email Address');
    const password = screen.getByPlaceholderText('Password');
    expect(email.value).toBe('');
    expect(password.value).toBe('');
    userEvent.click(screen.getByRole('button'));
    expect(mockSignIn).toHaveBeenCalledTimes(0);
  });

  test('sign up link takes you to sign up page',()=> {
    render(
      <Router>
        <SignIn handleLogIn={mockSignIn}/>
        <Switch>
        <Route exact path="/register" component={MockComponent}/>
        </Switch>
      </Router>
    );
    const signUp = screen.getByText("Don't have an account? Sign Up");
    userEvent.click(signUp);
    screen.getByText('mock');
  });
})