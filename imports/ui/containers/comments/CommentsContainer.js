import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Loading from '../../components/Loading.js';
import CommentsPage from '../../pages/comments/CommentsPage';
import moment from 'moment';
import Ideas from '../../../api/ideas/ideas';

const composer = ({ match }, onData) => {
    moment.locale('es');
    const userId = Meteor.userId();
    const sub = Meteor.subscribe('ideas.filters', { 'viewers.userId': userId }, 100);
    if (sub.ready()) {
        const ideas = Ideas.find({ 'viewers.userId': userId }, { sort: { date: -1 } }).fetch();
        onData(null, { ideas });
    }
};

export default composeWithTracker(composer, Loading)(CommentsPage);
