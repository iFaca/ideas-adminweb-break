import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import _ from 'lodash';

import TypesAreas from '../imports/api/typesareas/typesareas';
import TypesAreaStructure from '../imports/api/typesareastructure/typesareastructure';
import Corporations from '../imports/api/corporations/corporations';
import Areas from '../imports/api/areas/areas';

const mails = ['mariodelatorre@holos.cl', 'ctomba@holos.cl', 'cbaiardi@holos.cl', 'rmarambio@holos.cl', 'asusel@holos.cl'];

const createAccounts = () => {
  _.map(mails, (mail) => {
    if (!Meteor.users.findOne({ 'emails.address': mail })) {
      Accounts.createUser({ email: mail, password: 'Holos123' });
    }
  });
};

const initRoles = () => {
  if (_.includes(Roles.getAllRoles(), 'SuperAdminHolos')) Roles.createRole('SuperAdminHolos');
  if (_.includes(Roles.getAllRoles(), 'AdminGrupoNegocio')) Roles.createRole('AdminGrupoNegocio');
};

const addMeToAdmin = () => {
  _.map(mails, (mail) => {
    const user = Meteor.users.findOne({ 'emails.address': mail });
    if (user && !Roles.userIsInRole(user, ['SuperAdminHolos'])) {
      Roles.addUsersToRoles(user, ['SuperAdminHolos']);
      console.log('user agreado a SuperAdminHolos', mail);
    }
  });
};

const addSomeCollections = () => {
  const corporations = Corporations.find().fetch();

  /* add typesareasstructure */
  _.map(corporations, (corp) => {
    _.map(['Presidencia', 'Vicepresidencia', 'Gerencia General', 'Gerencia', 'SuperIntendencia'], (typearea, key) => {
      const find = TypesAreaStructure.findOne({ name: typearea, corporationId: corp._id });
      if (!find) {
        TypesAreaStructure.insert({
          name: typearea,
          order: key + 1,
          corporationId: corp._id || '',
        });
      }
    });

    _.map(['Area Operativa', 'Area Funcional'], (typestruct, key) => {
      const find = TypesAreas.findOne({ name: typestruct, corporationId: corp._id });
      if (!find) {
        TypesAreas.insert({
          name: typestruct,
          order: key + 1,
          corporationId: corp._id || '',
        });
      }
    });




    const presidencias = [
      {
        name: 'Escondida',
        typeAreaId: TypesAreas.findOne({ name: 'Area Operativa' })._id,
        typeAreaStructureId: 'XJimmrw5rrH98pthG',
        masterDataMatchText: 'Escondida',
        corporationId: corp._id,
      },
      {
        name: 'Cooper',
        typeAreaId: TypesAreas.findOne({ name: 'Area Funcional' })._id,
        typeAreaStructureId: 'XJimmrw5rrH98pthG',
        masterDataMatchText: 'Cooper',
        corporationId: corp._id,
      },
    ]

    _.map(presidencias, (area) => {
      const find = Areas.findOne(area);
      if (!find) Areas.insert(area);
    });

    // "_id":"rm9tP4J6sscggvvWg"
    // "name":"Vicepresidencia",
    const vicepresidencias = [
      {
        name: 'Warehouse Escondida B',
        typeAreaStructureId: 'rm9tP4J6sscggvvWg',
        parentAreaId: Areas.findOne({ name: 'Cooper', corporationId: corp._id })._id,
        corporationId: corp._id,
      },
      {
        name: 'Purchasing MEL',
        typeAreaStructureId: 'rm9tP4J6sscggvvWg',
        parentAreaId: Areas.findOne({ name: 'Cooper', corporationId: corp._id })._id,
        corporationId: corp._id,
      },
      {
        name: 'Corporate Affairs Copper',
        typeAreaStructureId: 'rm9tP4J6sscggvvWg',
        parentAreaId: Areas.findOne({ name: 'Cooper', corporationId: corp._id })._id,
        corporationId: corp._id,
      },
    ]

    _.map(vicepresidencias, (area) => {
      const find = Areas.findOne(area);
      if (!find) Areas.insert(area);
    });
    // "_id":"Zon5d8M2MAB2Ec4My",
    // "name":"Gerencia General"
    const generalmanager = [
      {
        name: 'Concentrate Operations',
        typeAreaStructureId: 'Zon5d8M2MAB2Ec4My',
        parentAreaId: Areas.findOne({ name: 'Escondida', corporationId: corp._id })._id,
        corporationId: corp._id,
      },
      {
        name: 'Mine Operations',
        typeAreaStructureId: 'Zon5d8M2MAB2Ec4My',
        parentAreaId: Areas.findOne({ name: 'Escondida', corporationId: corp._id })._id,
        corporationId: corp._id,
      },
      {
        name: 'NPI & Conc. Handling Operations',
        typeAreaStructureId: 'Zon5d8M2MAB2Ec4My',
        parentAreaId: Areas.findOne({ name: 'Escondida', corporationId: corp._id })._id,
        corporationId: corp._id,
      },
    ]

    _.map(generalmanager, (area) => {
      const find = Areas.findOne(area);
      if (!find) Areas.insert(area);
    });

    // "_id":"6SJCXwG9tEKKQRs7u",
    // "name":"Gerencia"

    const manager = [
      {
        name: 'Production Mine',
        typeAreaStructureId: '6SJCXwG9tEKKQRs7u',
        parentAreaId: Areas.findOne({ name: 'Mine Operations', corporationId: corp._id })._id,
        corporationId: corp._id,
      },
      {
        name: 'Production Mine M1',
        typeAreaStructureId: '6SJCXwG9tEKKQRs7u',
        parentAreaId: Areas.findOne({ name: 'Mine Operations', corporationId: corp._id })._id,
        corporationId: corp._id,
      },
      {
        name: 'NPI Maitenance',
        typeAreaStructureId: '6SJCXwG9tEKKQRs7u',
        parentAreaId: Areas.findOne({ name: 'NPI & Conc. Handling Operations', corporationId: corp._id })._id,
        corporationId: corp._id,
      },
    ]

    _.map(manager, (area) => {
      const find = Areas.findOne(area);
      if (!find) Areas.insert(area);
    });

    // "_id":"NagX7s2zzkfQZpXq6",
    // "name":"SuperIntendencia"  
  });
};

const Start = {
  start: () => {
    createAccounts();
    initRoles();
    addMeToAdmin();
    addSomeCollections();
  },
};

export default Start;
