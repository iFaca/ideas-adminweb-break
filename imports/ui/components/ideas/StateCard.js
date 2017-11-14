import React from 'react';
import { PropTypes } from 'react';

const StateCard = ({ state }) => (
    <div className="col-md-6" style={{ display: "flex" }}>
        <div className="card-single" style={{ backgroundColor: state.color, width: "100%" }}>
            <h3>{state.step}</h3>
            <p>{state.state}</p>
            <small>{state.description}</small>
        </div>
    </div>
);

StateCard.propTypes = {
    state: PropTypes.shape().isRequired,
};

export default StateCard;