import React, { Component, PropTypes } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap-button-loader';

import { Link } from 'react-router-dom';
import ideaEditor from '../../../modules/ideas/idea-editor.js';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import MainList from '../MainList';
import _ from 'lodash';
import $ from 'jquery';

// collections
import Persons from '../../../api/persons/persons';

// Step components
import StepIndicator from '../../components/StepIndicator';
import IdeasStep1 from './IdeasStep1'
import IdeasStep2 from './IdeasStep2'
import IdeasStep3 from './IdeasStep3'
import IdeasStep4 from './IdeasStep4'
import IdeasStep5 from './IdeasStep5'

export default class IdeaEditor extends Component {
    state = {
        formStep: 1,
        doc: {
            _id: '',
            origin: '',
            person: {},
            chief: {},
            description: '',
            opportunity: '',
            drivers: [],
            collaborators: [],
            states: []
        },
        loading: false,
    }

    componentDidMount() {
        ideaEditor({ component: this });
        // setTimeout(() => { document.querySelector('[name="name"]').focus(); }, 0);
        if (this.props.doc) {
            this.setState({
                doc: this.props.doc
            });
        }
        this.calculateIndicatorWidth();
        $(window).on("resize", () => {
            this.calculateIndicatorWidth();
        })
    }

    toggleStepReady = () => {
        const { formStep } = this.state;
        const { origin, person, chief, description, opportunity, drivers, states } = this.state.doc;
        return (formStep === 1 && origin && person) ||
            (formStep === 2 && origin && person && chief) ||
            (formStep === 3 && origin && person && chief && description && opportunity && drivers && drivers.length > 0) ||
            (formStep === 4 && origin && person && chief && description && opportunity && drivers && drivers.length > 0) ||
            (formStep === 5 && origin && person && chief && states && description && opportunity && drivers && drivers.length > 0)
    }


    onChangeDoc = e => {
        e.preventDefault();
        this.setState({
            doc: { ...this.state.doc, [e.target.name]: e.target.value }
        });
    }
    onChange = e => {
        e.preventDefault();
        this.setState(
            { ...this.state, [e.target.name]: e.target.value }
        );
    }

    changeStep = (add, step) => e => {
        e.preventDefault()
        if (add) {
            this.setState(prev => ({
                formStep: prev.formStep + step,
            }))
        } else {
            this.setState({
                formStep: step,
            })
        }

        setTimeout(() => {
            this.calculateIndicatorWidth()
        }, 100);
    }

    calculateIndicatorWidth() {
        const { formStep } = this.state;

        let breakpoints = $(".stepIndicator ul").children().length + 1;
        let elWidth = $(".line-progress-back").width();
        let eachStep = elWidth / breakpoints;

        $(".line-progress-front").width(eachStep * formStep);
    }

    onChangeSearchPerson = e => {
        e.preventDefault();
        const text = e.target.value;
        this.props.textSearch.set(text);
    }

    selectPerson = person => e => {
        e.preventDefault()
        delete person.score;

        this.setState(prev => ({
            doc: { ...prev.doc, person: prev.doc.person !== person && person || undefined }
        }))

        this.props.textSearch.set('');

    }

    selectChief = chief => e => {
        e.preventDefault()
        delete chief.score;

        this.setState(prev => ({
            doc: { ...prev.doc, chief: prev.doc.chief !== chief && chief || undefined }
        }))

        this.props.textSearch.set('');

    }
    selectState = state => e => {
        e.preventDefault();
        state.userId = Meteor.userId();
        state.createdAt = new Date(this.state.doc.date) || new Date();
        this.setState(prev => ({
            doc: { ...prev.doc, states: [state] }
        }));

    }
    selectCollaborator = collaborator => e => {
        e.preventDefault()
        $('#personSearchInput').html('');
        delete collaborator.score;

        const prevCollaborators = this.state.doc.collaborators;
        const collaborators = _.includes(prevCollaborators, collaborator) && _.pull(prevCollaborators, collaborator) || _.union(prevCollaborators, [collaborator])
        this.setState(prev => ({ doc: { ...prev.doc, collaborators }, persons: [] }))

        this.props.textSearch.set('');

    }

    selectOrigin = origin => e => {
        e.preventDefault()
        this.setState(prev => ({ doc: { ...prev.doc, origin } }))
    }

    selectDriver = driver => e => {
        e.preventDefault()
        const prevDrivers = this.state.doc.drivers;
        const drivers = _.includes(prevDrivers, driver) && _.pull(prevDrivers, driver) || _.union(prevDrivers, [driver])
        this.setState(prev => ({ doc: { ...prev.doc, drivers } }))
    }

    handleChangeDate = (date, formattedValue) => {
        this.setState(prev => ({
            doc: { ...prev.doc, date }  // ISO String, ex: "2016-11-19T12:00:00.000Z" 
        }));
    }
    //formattedValue: formattedValue // Formatted String, ex: "11/19/2016" 

    //   componentDidUpdate: function(){
    //     // Access ISO String and formatted values from the DOM. 
    //     var hiddenInputElement = document.getElementById("example-datepicker");
    //     console.log(hiddenInputElement.value); // ISO String, ex: "2016-11-19T12:00:00.000Z" 
    //     console.log(hiddenInputElement.getAttribute('data-formattedvalue')) // Formatted String, ex: "11/19/2016" 
    //   },
    render() {

        const formMaxStep = 5;

        const { persons, driversArray, origins, ideasstates } = this.props;

        const { formStep } = this.state;
        const { doc } = this.state;
        const { origin, _id } = this.state.doc;
        // console.log('DOC', doc);

        return (
            <div className="row">
                <div className="col-xs-12 no-sides-padding">
                    <StepIndicator changeStep={this.changeStep} formStep={formStep} items={formMaxStep} />
                </div>
                <div className="panel-body ng-binding col-xs-10 col-xs-offset-1">
                    <form
                        className="label-left"
                        noValidate
                        ref={form => (this.ideaEditorForm = form)}
                        onSubmit={event => event.preventDefault()}>

                        {formStep === 1 &&
                            <IdeasStep1 onChangeForm={this.onChangeDoc}
                                data={doc}
                                onChangeSearchPerson={this.onChangeSearchPerson}
                                persons={persons}
                                selectPerson={this.selectPerson}
                                origins={origins}
                                selectOrigin={this.selectOrigin}
                                handleChangeDate={this.handleChangeDate}
                            />}
                        {formStep === 2 &&
                            <IdeasStep2 onChangeForm={this.onChangeDoc}
                                data={doc}
                                onChangeSearchPerson={this.onChangeSearchPerson}
                                persons={persons}
                                selectChief={this.selectChief}
                            />}
                        {formStep === 3 &&
                            <IdeasStep3 onChangeForm={this.onChangeDoc}
                                data={doc}
                                driversArray={driversArray}
                                selectDriver={this.selectDriver}
                            />}
                        {formStep === 4 &&
                            <IdeasStep4
                                data={doc}
                                onChangeSearchPerson={this.onChangeSearchPerson}
                                persons={persons}
                                selectCollaborator={this.selectCollaborator}
                            />}
                        {formStep === 5 &&
                            <IdeasStep5
                                data={doc}
                                ideasstates={ideasstates}
                                selectState={this.selectState}
                            />}
                        <div className="row forms-bottom-panel">
                            {
                                formStep === formMaxStep &&
                                <Button
                                    loading={this.state.loading}
                                    disabled={this.toggleStepReady() ? false : true}
                                    type='submit'
                                    bsStyle="success"
                                    className="btn btn-sm pull-right">
                                    <i className="fa fa-paper-plane"></i>
                                    Finalizar</Button> 
                                ||
                                <Button
                                    onClick={this.changeStep(true, 1)}
                                    disabled={this.toggleStepReady() ? false : true}
                                    type='button'
                                    bsStyle="success"
                                    className="btn btn-sm pull-right">
                                    <i className="fa fa-arrow-right"></i>
                                    Siguiente
                                </Button>
                            }

                            {
                                formStep !== 1 &&
                                <Button
                                    onClick={this.changeStep(true, -1)}
                                    type="button" bsStyle="default" className="btn btn-sm pull-right">
                                    <i className="fa fa-arrow-left"></i>{`Anterior`}
                                </Button>
                            }

                            <Button onClick={(e) => this.props.history.push('/my-ideas')} type="button" bsStyle="default" className="btn btn-trans btn-sm pull-right"><i className="fa fa-times"></i>Cancelar</Button>

                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

IdeaEditor.propTypes = {
    doc: PropTypes.object,
};
