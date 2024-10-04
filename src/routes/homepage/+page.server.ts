import axios from 'axios';
const baseURL = 'https://scholarxivapi.onrender.com/arxiv';

export async function load() {
	try {
		const response = await axios.get(baseURL + '/recommended');
		return {
			recommendedPapers: response.data
		};
	} catch (error) {
		console.error('Error fetching recommended papers:', error);
		return {
			recommendedPapers: []
		};
	}
}
