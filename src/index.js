import './style.css';
import PubSub from 'pubsub-js';
import DataController from './DataController';
import DisplayController from './DisplayController';

document.addEventListener('DOMContentLoaded', () => {
	PubSub.publish('DOMContentLoaded');
});
