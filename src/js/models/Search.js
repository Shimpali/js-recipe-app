import axios from 'axios';

export default class Search {
	constructor(query) {
		this.query = query;
	}

	async getResults() {
		const proxy = 'https://cors-anywhere.herokuapp.com/';
		const key = '783f962f09da1fbb9ce5167c4dae1c7d';
		try {
			const response = await axios(
				`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`
			);
			this.result = response.data.recipes;
		//	console.log(this.result);
		} catch (error) {
			alert(error);
		}
	}
}
