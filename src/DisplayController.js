import PubSub from 'pubsub-js';

const DisplayController = (() => {
	let state = {};

	// DOM Cache
	let cityInputElement = null;
	let outputElement = null;
	let cityElement = null;
	let tempElement = null;

	const initRender = () => {
		const body = document.querySelector('body');

		const app = document.createElement('div');
		app.setAttribute('id', 'app');
		body.appendChild(app);

		const form = document.createElement('form');
		app.appendChild(form);

		const cityInputLabel = document.createElement('label');
		cityInputLabel.setAttribute('for', 'city-input');
		cityInputLabel.textContent = 'Search City:';
		form.appendChild(cityInputLabel);

		const cityInput = document.createElement('input');
		cityInput.setAttribute('id', 'city-input');
		cityInput.setAttribute('placeholder', 'e.g. London');
		form.appendChild(cityInput);

		const submitButton = document.createElement('button');
		submitButton.setAttribute('type', 'button');

		submitButton.textContent = 'Search City';
		form.appendChild(submitButton);

		const output = document.createElement('div');
		output.setAttribute('id', 'output');
		app.appendChild(output);

		const cityField = document.createElement('div');
		cityField.setAttribute('id', 'city');
		output.appendChild(cityField);

		const tempField = document.createElement('div');
		tempField.setAttribute('id', 'temp');
		output.appendChild(tempField);

		// Event Listners
		submitButton.addEventListener('click', handleClick);
	};

	const cacheDOM = () => {
		cityInputElement = document.querySelector('#city-input');
		outputElement = document.querySelector('#output');
		cityElement = document.querySelector('#city');
		tempElement = document.querySelector('#temp');

		PubSub.publish('Get Data', { city: 'London' });
	};

	const renderOutput = () => {
		cityElement.textContent = state.name;
		tempElement.textContent = state.main.temp;
	};

	const handleClick = (event) => {
		const inputValue = cityInputElement.value;
		PubSub.publish('Get Data', { city: inputValue });
	};

	// PubSub
	PubSub.subscribe('DOMContentLoaded', () => {
		initRender();
		cacheDOM();
	});

	PubSub.subscribe('Data Loaded', (msg, data) => {
		console.log(msg);
		state = data;
		console.log(state);
		renderOutput();
	});
})();

export default DisplayController;
