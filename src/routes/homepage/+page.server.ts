import axios from 'axios';
import { baseURL } from '$lib/constants.js';

export async function load() {
	try {
		const response = await axios.get(baseURL + '/discover');
		return {
			recommendedPapers: response.data
		};
	} catch (error) {
		console.error('Error fetching discovery papers:', error);
		return {
			recommendedPapers: []
		};
	}
}
