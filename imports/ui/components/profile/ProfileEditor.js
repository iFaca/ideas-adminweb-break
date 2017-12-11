import React, { Component, PropTypes } from 'react'
import { FormGroup, ControlLabel, FormControl, Button, Radio } from 'react-bootstrap'
import profileEditor from '../../../modules/profile/profile-editor';
import CSSTransitionGroup from 'react-addons-css-transition-group'
import MainList from '../MainList'
import _ from 'lodash'

import DatePicker from 'react-bootstrap-date-picker';

const companies = ['MEL', 'BHP', 'Contratista']

export default class ProfileEditor extends Component {
    state = {
        user: {
            profile: {
                group: '',
                personId: '',
                rut: '',
                firstName: '',
                secondName: '',
                lastName: '',
                secondLastName: '',
                nationality: '',
                enterprise: '',
                oneUp: {
                    email: '',
                    name: '',
                },
                areaId: '',
            },

        },
        person: {},
        searching: false,
    }

    componentDidMount() {
        profileEditor({ component: this });
        const { user, person } = this.props;

        if (user) {
            this.setState({ user });
        }

        if (person) {
            this.setState({ person });
        }

    }

    onChangeProfile = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prev => ({
            user: {
                ...prev.user,
                profile: {
                    ...prev.user.profile, [name]: value
                }
            }
        }));
    }

    onChangeInc = inc => {
        this.setState(prev => ({
            user: {
                ...prev.user,
                profile: {
                    ...prev.user.profile, company: inc
                }
            }
        }));
    }

    handleChangeDate = (birthdate, formattedValue) => {
        this.setState(prev => ({
            user: {
                ...prev.user,
                profile: {
                    ...prev.user.profile, birthdate
                }
            }
        }));
    }

    onChange = e => {
        this.setState(
            { ...this.state, [e.target.name]: e.target.value }
        );
    }

    setDatosMel = () => {
        this.setState(prev => ({ user: { ...prev.user, profile: prev.person } }))
        Bert.alert("Datos actualizados desde MEL. Guarde los cambios antes de salir para mantenerlos.", 'warning');
    }

    render() {
        const { person } = this.state;
        const { _id, emails, profile } = this.state.user;
        const rut = profile && profile.rut || '';
        const firstName = profile && profile.firstName || '';
        const secondName = profile && profile.secondName || '';
        const lastName = profile && profile.lastName || '';
        const secondLastName = profile && profile.secondLastName || '';
        const birthdate = profile && profile.birthdate || '';
        const nationality = profile && profile.nationality || '';
        const enterprise = profile && profile.enterprise || '';
        const contactPhone = profile && profile.contactPhone || '';
        const address = profile && profile.address || '';
        const company = profile && profile.company || person && 'MEL' || '';
        console.log('person', person)
        console.log('profile', profile)
        return (
            <div>
                <div className="col-sm-12 header-profile">
                    <div>
                        {
                            _.map(emails, (email, index) => (
                                <p key={index}>{email.address}</p>
                            ))

                        }
                    </div>
                    <div>
                        {
                            !_.isEmpty(person) &&
                            <button className="btn btn-primary btn-trans btn-xs" onClick={this.setDatosMel}>Copiar Datos de MEL</button>
                        }
                    </div>
                </div>

                <form
                    className="label-left"
                    noValidate
                    ref={form => (this.profileEditorForm = form)}
                    onSubmit={event => event.preventDefault()}>
                    {
                        _.isEmpty(person) &&
                        <FormGroup>
                            <div className="col-sm-12">
                                {
                                    _.map(companies, (inc, index) =>
                                        <Radio key={index} name="company" value={inc} checked={inc == company}
                                            // onChange={this.onChangeProfile} 
                                            onChange={(e) => this.onChangeInc(inc)}
                                            inline>
                                            {inc}
                                        </Radio>
                                    )
                                }
                            </div>
                        </FormGroup>
                    }

                    <FormGroup>
                        <div className="col-sm-4">
                            <ControlLabel>RUT</ControlLabel>
                        </div>
                        <div className="col-sm-6">
                            <FormControl
                                type="text"
                                name="rut"
                                value={rut}
                                onChange={this.onChangeProfile}
                                placeholder="RUT"
                            />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="col-sm-4">
                            <ControlLabel>Primer Nombre</ControlLabel>
                        </div>
                        <div className="col-sm-6">
                            <FormControl
                                type="text"
                                name="firstName"
                                value={firstName}
                                onChange={this.onChangeProfile}
                                placeholder="Primer Nombre"
                            />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="col-sm-4">
                            <ControlLabel>Segundo Nombre</ControlLabel>
                        </div>
                        <div className="col-sm-6">
                            <FormControl
                                type="text"
                                name="secondName"
                                value={secondName}
                                onChange={this.onChangeProfile}
                                placeholder="Segundo Nombre"
                            />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="col-sm-4">
                            <ControlLabel>Primer Apellido</ControlLabel>
                        </div>
                        <div className="col-sm-6">
                            <FormControl
                                type="text"
                                name="lastName"
                                value={lastName}
                                onChange={this.onChangeProfile}
                                placeholder="Primer Apellido"
                            />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="col-sm-4">
                            <ControlLabel>Segundo Apellido</ControlLabel>
                        </div>
                        <div className="col-sm-6">
                            <FormControl
                                type="text"
                                name="secondLastName"
                                value={secondLastName}
                                onChange={this.onChangeProfile}
                                placeholder="Segundo Apellido"
                            />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="col-sm-4">
                            <ControlLabel>Fecha de Nacimiento</ControlLabel>
                        </div>
                        <div className="col-sm-6">
                            <DatePicker
                                id="date"
                                value={birthdate}
                                onChange={this.handleChangeDate}
                                name="birthdate"
                                dateFormat={'DD MM YYYY'}
                                dayLabels={['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']}
                                monthLabels={['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']}
                            />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="col-sm-4">
                            <ControlLabel>Nacionalidad</ControlLabel>
                        </div>
                        <div className="col-sm-6">
                            <FormControl
                                type="text"
                                name="nationality"
                                value={nationality}
                                onChange={this.onChangeProfile}
                                placeholder="Nacionalidad"
                            />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="col-sm-4">
                            <ControlLabel>Empresa</ControlLabel>
                        </div>
                        <div className="col-sm-6">
                            <FormControl
                                type="text"
                                name="enterprise"
                                value={enterprise}
                                onChange={this.onChangeProfile}
                                placeholder="Empresa"
                            />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="col-sm-4">
                            <ControlLabel>Tel Contacto</ControlLabel>
                        </div>
                        <div className="col-sm-6">
                            <FormControl
                                type="text"
                                name="contactPhone"
                                value={contactPhone}
                                onChange={this.onChangeProfile}
                                placeholder="Tel Contacto"
                            />
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <div className="col-sm-4">
                            <ControlLabel>Dirección</ControlLabel>
                        </div>
                        <div className="col-sm-6">
                            <FormControl
                                type="text"
                                name="address"
                                value={address}
                                onChange={this.onChangeProfile}
                                placeholder="Dirección"
                            />
                        </div>
                    </FormGroup>
                    <div className="row">
                        <div className="col-sm-12 col-sm-offset-4 col-sm-6 control-bottom">
                            <Button type="submit" className="reset-icon" bsStyle="success">
                                <i className="fa fa-plus"></i>{_id ? ' Guardar' : ' Crear'}
                            </Button>
                        </div>
                    </div>

                </form>


            </div>
        )
    }
}

ProfileEditor.propTypes = {
    user: PropTypes.shape().isRequired,
    person: PropTypes.shape(),
};