import React from 'react';
import { Route } from 'react-router-dom';

// Corporaciones
import Corporations from '../pages/corporations/Corporations';
import NewCorporation from '../pages/corporations/NewCorporation';
import EditCorporation from '../containers/corporations/EditCorporation';

import Dashboard from '../pages/Dashboard';
import BlankPage from '../pages/BlankPage';
import ComponentsPage from '../pages/ComponentsPage';

const PageWrapper = () => (
        <section className="main-content-wrapper">
            <Route exact path="/" component={Dashboard} />
            <Route path="/dashboard" component={Dashboard} />
            {/* Corporaciones */}
            <Route exact path="/corporations" component={Corporations} />
            <Route exact path="/corporations/new" component={NewCorporation} />
            <Route exact path="/corporation/:_id/edit" component={EditCorporation} />
            
            <Route path="/blank-page" component={BlankPage} />
            <Route path="/components-page" component={ComponentsPage} />
        </section>
    );

export default PageWrapper;
