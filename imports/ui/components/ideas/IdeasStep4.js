import React from 'react';
import _ from 'lodash';

const IdeasStep4 = ({ data, onChangeSearchPerson, persons, selectCollaborator }) => {

    const { collaborators } = data;

    return (
        <div className="form-steps step-one">
            <h2>Selección de Colaboradores</h2>
            {
                _.map(collaborators, (collaborator, index) =>
                    (<div key={index} className="panel panel-default">
                        <div className="panel-body">
                            <p>{collaborator.firstName} {collaborator.secondName} {collaborator.lastName}</p>
                            {collaborator.rut && <p>rut: {collaborator.rut}</p>}
                        </div>
                    </div>)
                )
            }
            <div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Buscar Persona Colaboradora </label>
                    <div className="col-md-6">
                        <input type="text" className="form-control" onChange={onChangeSearchPerson} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-10 control-label">Seleccione una Persona para continuar</label>
                    <div className="col-md-10">
                        <div className="card">
                            <ul className="list-group list-group-flush">
                                {
                                    _.map(persons, (person, index) => (
                                        <li key={index} className="list-group-item" onClick={selectCollaborator(person).bind(this)}>
                                            rut: {person.rut}   {person.firstName} {person.secondName} {person.lastName}
                                        </li>))
                                }

                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default IdeasStep4;