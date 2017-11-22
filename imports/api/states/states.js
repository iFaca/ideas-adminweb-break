import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

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

States.schema = new SimpleSchema(
    {
        code: { type: String },
        step: { type: String },
        state: { type: String },
        description: { type: String },
        color: { type: String },
        corporationId: { type: String },
        showInDashboard: { type: Boolean, optional: true, defaultValue: true },
        config: { type: [Object], optional: true },
    },
)

States.attachSchema(States.schema);
