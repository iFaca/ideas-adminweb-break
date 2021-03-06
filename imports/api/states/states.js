import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

import PersonSchema from '../persons/personSchema';

const AlertSchema = new SimpleSchema({
    temporal: { type: Boolean },
    stateChange: { type: Boolean, optional: true, defaultValue: false },
    delay: { type: Number, optional: true, defaultValue: 1 },
    daily: { type: Boolean, optional: true, defaultValue: false },
    weekly: { type: Boolean, optional: true, defaultValue: false },
    sendEmail: { type: Boolean, defaultValue: true },
    sendInbox: { type: Boolean },
    owner: { type: Boolean },
    lead: { type: Boolean, defaultValue: true },
    oneUp: { type: Boolean },
    chief: { type: Boolean },
    message: { type: String, optional: true },
})

const States = new Mongo.Collection('states');
export default States

States.allow({
    insert: () => false,
    update: () => false,
    remove: () => false,
})

States.deny({
    insert: () => true,
    update: () => true,
    remove: () => true,
})

const NextSchema = new SimpleSchema({
    title: { type: String, optional: true },
    code: { type: String, optional: true },
    color: { type: String, optional: true },
    action: { type: String, optional: true },
})
const toChangeSchema = new SimpleSchema({
    type: { type: String, optional: true },
    label: { type: String, optional: true },
    name: { type: String, optional: true },
    text: { type: String, optional: true },
    chief: { type: PersonSchema, optional: true },
    date: { type: Date, optional: true },
    checked: { type: Boolean, optional: true },
    maxDais: { type: Number, optional: true },
    parents: { type: Boolean, optional: true },
})
const RoleStateSchema = new SimpleSchema({
    role: { type: String, optional: true },
    title: { type: String, optional: true },
    onlyView: { type: Boolean, optional: true },
})


States.schema = new SimpleSchema(
    {
        _id: { type: String, optional: true },
        corporationId: { type: String, optional: true },
        userId: { type: String, optional: true },
        createdAt: { type: Date, optional: true },
        updatedAt: {
            type: Date,
            index: true,
            autoValue: function () {
                if (this.isUpdate) return new Date
            },
            denyInsert: true,
            optional: true,

        },
        code: { type: String },
        step: { type: String },
        state: { type: String },
        description: { type: String },
        color: { type: String },
        showInDashboard: { type: Boolean, optional: true },
        config: { type: [Object], optional: true },
        green: { type: Number, optional: true, defaultValue: 1, min: 0 },
        yellow: { type: Number, optional: true, defaultValue: 2, min: 0 },

        alerts: { type: [AlertSchema], optional: true },
        roles: { type: [RoleStateSchema], optional: true },
        nexts: { type: [NextSchema], optional: true },
        toChanges: { type: [toChangeSchema], optional: true },
        action: { type: String, optional: true },
    },
)

States.attachSchema(States.schema);

