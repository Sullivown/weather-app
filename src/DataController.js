import PubSub from 'pubsub-js';

const DataController = (() => {
	const API_KEY = '3c6358d85a3f7131abb3bdb5b015b27c';

	async function getWeather(city) {
		try {
			let response = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
			);

			let data = await response.json();
			PubSub.publish('Data Loaded', data);
		} catch (error) {
			console.error(error);
			PubSub.publish('Data Loaded', data);
		}
	}

	// PubSub
	PubSub.subscribe('Get Data', (msg, data) => {
		getWeather(data.city);
	});
})();

export default DataController;
