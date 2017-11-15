import React from 'react';
import _ from 'lodash';
import PersonCard from './PersonCard';
import PersonSearch from './PersonSearch';
import StatesSelect from './StatesSelect';
import StateCard from './StateCard';

const IdeasStep5 = ({ data, selectState, ideasstates }) =>

    (
        <div className="row form-steps step-two">
            <div className="col-xs-12">
                {
                    data && data.states && data.states[0] && <StateCard state={data.states[0]} />
                }
                <div className="row">
                    <div className="col-xs-12">
                        <div className="form-group">
                            <h2>Seleccione el estado de la Idea</h2>
                            <StatesSelect ideasstates={ideasstates} selectState={selectState} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

export default IdeasStep5;