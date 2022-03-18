import PubSub from 'pubsub-js';

const DataController = (() => {
	const API_KEY = '3c6358d85a3f7131abb3bdb5b015b27c';

	// Eg API Call: https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

	async function getWeather(city) {
		let response = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
		);
		let data = await response.json();

		PubSub.publish('Data Loaded', data);
	}

	// PubSub
	PubSub.subscribe('Get Data', (msg, data) => {
		getWeather(data.city);
	});
})();

export default DataController;
