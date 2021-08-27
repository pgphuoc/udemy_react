import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

import AuthContext from '../../store/auth-context';
import Input from '../UI/Input/Input';

const EMAIL_INITIAL_STATE = {
  value: 'phuocpg@poc.dev',
  isValid: false,
};

const emailRecuder = (state, action) => {
  switch (action.type) {
    case 'EMAIL_INPUT':
      return {
        value: action.value,
        isValid: action.value.includes('@'),
      };
    case 'EMAIL_INPUT_BLUR':
      return {
        value: state.value,
        isValid: state.value.includes('@'),
      };
    default:
      return {
        value: state.value,
        isValid: state.value.includes('@'),
      };
  }
};

const PASSWORD_INITIAL_STATE = {
  value: 'password',
  isValid: false,
};

const passwordRecuder = (state, action) => {
  switch (action.type) {
    case 'PASSWORD_INPUT':
      return {
        value: action.value,
        isValid: action.value.trim().length > 6,
      };
    case 'PASSWORD_INPUT_BLUR':
      return {
        value: state.value,
        isValid: state.value.trim().length > 6,
      };
    default:
      return {
        value: state.value,
        isValid: state.value.trim().length > 6,
      };
  }
};

const Login = () => {
  const [emailState, dispatchEmail] = useReducer(
    emailRecuder,
    EMAIL_INITIAL_STATE
  );

  const { isValid: emailIsValid } = emailState;
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();

  const [passwordState, dispatchPassword] = useReducer(
    passwordRecuder,
    PASSWORD_INITIAL_STATE
  );

  const { isValid: passwordIsValid } = passwordState;
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();

  const [formIsValid, setFormIsValid] = useState(false);

  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      // console.log("CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'EMAIL_INPUT', value: event.target.value });
    // setEnteredEmail(event.target.value);

    // setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
    // setFormIsValid(
    //   event.target.value.includes("@") && enteredPassword.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'PASSWORD_INPUT', value: event.target.value });
    // setEnteredPassword(event.target.value);

    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
    // setFormIsValid(
    //   enteredEmail.includes("@") && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'EMAIL_INPUT_BLUR' });
    // setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'PASSWORD_INPUT_BLUR' });
    // setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
    // props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          type="text"
          label="Email"
          ref={emailInputRef}
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />

        <Input
          id="password"
          type="password"
          label="Password"
          ref={passwordInputRef}
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
