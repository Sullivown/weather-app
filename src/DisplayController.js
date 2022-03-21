import PubSub from 'pubsub-js';

const DisplayController = (() => {
	let state = {};

	// DOM Cache
	let cityInputElement = null;
	let outputElement = null;
	let cityElement = null;
	let tempElement = null;
	let weatherElement = null;

	const initRender = () => {
		const body = document.querySelector('body');

		const app = document.createElement('div');
		app.setAttribute('id', 'app');
		body.appendChild(app);

		const heading = document.createElement('h1');
		heading.textContent = 'Weather App!';
		app.appendChild(heading);

		const description = document.createElement('p');
		description.textContent = `What's the weather like today?`;
		app.appendChild(description);

		const form = document.createElement('form');
		form.setAttribute('onsubmit', 'event.preventDefault()');
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

		const weatherField = document.createElement('div');
		weatherField.setAttribute('id', 'weather');
		output.appendChild(weatherField);

		// Event Listners
		cityInput.addEventListener('keyup', (e) => {
			if (e.key == 'Enter') {
				handleSubmit();
			}
		});
		submitButton.addEventListener('click', handleSubmit);
	};

	const cacheDOM = () => {
		cityInputElement = document.querySelector('#city-input');
		outputElement = document.querySelector('#output');
		cityElement = document.querySelector('#city');
		tempElement = document.querySelector('#temp');
		weatherElement = document.querySelector('#weather');

		PubSub.publish('Get Data', { city: 'London' });
	};

	const renderOutput = () => {
		let validCity = null;

		if (state.cod !== 200) {
			validCity = false;
		} else {
			validCity = true;
		}

		cityElement.textContent = validCity
			? `${state.name}, ${state.sys.country}`
			: 'Invalid City!';
		tempElement.textContent = `${validCity ? state.main.temp : '???'} °C`;

		if (validCity) {
			for (const weather in state.weather) {
				if (weather == state.weather.length - 1) {
					weatherElement.textContent += `${state.weather[weather].description}`;
				} else {
					weatherElement.textContent += `${state.weather[weather].description}, `;
				}
			}
		} else {
			weatherElement.textContent = '???';
		}
	};

	const handleSubmit = () => {
		const inputValue = cityInputElement.value;
		PubSub.publish('Get Data', { city: inputValue });
	};

	// PubSub
	PubSub.subscribe('DOMContentLoaded', () => {
		initRender();
		cacheDOM();
	});

	PubSub.subscribe('Data Loaded', (msg, data) => {
		state = data;
		renderOutput();
	});
})();

export default DisplayController;
