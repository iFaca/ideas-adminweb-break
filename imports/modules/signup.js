/* eslint-disable no-undef */

import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import _ from 'lodash';
import './validation.js';

let component;

const getUserData = () => ({
  email: document.querySelector('[name="emailAddress"]').value.toLowerCase(),
  password: document.querySelector('[name="password"]').value,
  // profile: {
  //   name: {
  //     first: document.querySelector('[name="firstName"]').value,
  //     last: document.querySelector('[name="lastName"]').value,
  //   },
  // },
});

const signup = () => {
  const { history } = component.props;
  const user = getUserData();

 console.log('USER', user);

  Accounts.createUser(user, (error, data) => {
    console.log('DATA', data)
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      history.push('/profile');
    }
  });
};

const validate = () => {
  $(component.signupForm).validate({
    rules: {
      // firstName: {
      //   required: true,
      // },
      // lastName: {
      //   required: true,
      // },
      emailAddress: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        minlength: 6,
      },
    },
    messages: {
      // firstName: {
      //   required: 'First name?',
      // },
      // lastName: {
      //   required: 'Last name?',
      // },
      emailAddress: {
        required: 'Debe ingresar un e-mail',
        email: 'No tiene formato de email',
      },
      password: {
        required: 'Debe ingresar una contraseña',
        minlength: 'Mínimo 6 caracteres',
      },
    },
    submitHandler() { signup(); },
  });
};

export default function handleSignup(options) {
  component = options.component;
  validate();
}
