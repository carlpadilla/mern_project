import React from 'react';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from '../../shared/utils/validator';
import { useForm } from '../../shared/hooks/form-hooks';

import './Auth.css';

const Auth = () => {
  const [fromState, inputHandler] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = (e) => {
    e.preventDefault();
    console.log(fromState.inputs);
  };

  return (
    <Card className='authentication'>
      <h2>Login required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        <Input
          element='input'
          id='email'
          type='email'
          label='E-Mail'
          validators={[VALIDATOR_EMAIL()]}
          errorText='Enter Valid Email'
          onInput={inputHandler}
        />
        <Input
          element='input'
          id='password'
          type='password'
          label='Password'
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText='Enter Valid Password at least 6 characters'
          onInput={inputHandler}
        />
        <Button type='submit' disabled={!fromState.isValid}>
          LOGIN
        </Button>
      </form>
    </Card>
  );
};

export default Auth;
