/* eslint-disable no-undef */

import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import './validation.js';

let component;

const handleRecovery = () => {
    const { history } = component.props;

    component.setState({ loading: true });
    Accounts.forgotPassword({
        email: document.querySelector('[name="emailAddress"]').value,
    }, (error) => {
        if (error) {
            Bert.alert(error.reason, 'warning');
        } else {
            Bert.alert('Check your inbox for a reset link!', 'success');
        }
        component.setState({ loading: false });
        history.push('/login');
    });
};

const validate = () => {
    $(component.recoverPasswordForm).validate({
        rules: {
            emailAddress: {
                required: true,
                email: true,
            },
        },
        messages: {
            emailAddress: {
                required: 'Need an email address here.',
                email: 'Is this email address legit?',
            },
        },
        submitHandler() { handleRecovery(); },
    });
};

export default function handleRecoverPassword(options) {
    component = options.component;
    validate();
}
