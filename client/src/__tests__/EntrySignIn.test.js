import {render, fireEvent, screen} from '@testing-library/react';
import SignInSide from '../components/EntrySignIn';
import {UserContextProvider} from '../context/UserContext';
import userEvent from '@testing-library/user-event';

describe('sign in component', () => {
  test('should match the snapshot', () => {
    const {container} = render(
      <UserContextProvider>
        <SignInSide/>
      </UserContextProvider>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
  
  test('email and password should be present on form',()=>{
    render(
      <UserContextProvider>
        <SignInSide/>
      </UserContextProvider>
    );
    screen.getByTestId('email-input');
    screen.getByTestId('password');
  } );
  
  test('should not be able to attempt sign in if password or email are blank', ()=> {
    // const spy = jest.spyOn(SignInSide,'handleSubmit');
    render(
      <UserContextProvider>
        <SignInSide/>
      </UserContextProvider>
    );
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password');
    expect(email.value).toBe('');
    expect(password.value).toBe('');
    userEvent.click(screen.getByText('Sign In'));
    expect(screen.getByRole('button').onSubmit).toHaveBeenCalledTimes(0);
  });
  
  test('sign up link takes you to sign up page',()=> {
    render(
      <UserContextProvider>
        <SignInSide/>
      </UserContextProvider>
    );
    const signUp = screen.getByText("Don't have an account? Sign Up");
    userEvent.click(signUp);
    screen.getByText('Patient Sign up');
  });
})