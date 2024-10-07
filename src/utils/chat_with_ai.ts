import axios from 'axios';
import { chat_history_store } from '../store/chat_history_store';
import { search_term_store } from '../store/search_store';
import { aiBaseURL } from '$lib/constants.js';

let searchTerm = '';

// Chat with AI
async function chatWithAI() {
	const newUserChat = {
		from: 'user',
		content: searchTerm
	};
	const newLoading = {
		from: 'system',
		content: 'Thinking ...'
	};
	chat_history_store.update((currentHistory) => [...currentHistory, newUserChat, newLoading]);

	const response = await axios.post(aiBaseURL + '/ask', {
		// prompt: searchTerm + $selectedPapersForAI
		prompt: searchTerm
	});
	const newAIChat = {
		from: 'ai',
		content: response.data
	};
	chat_history_store.update((currentHistory) => {
		currentHistory.pop(); // Remove the last element
		return [...currentHistory, newAIChat]; // Add newAIChat
	});
}

search_term_store.subscribe((value) => {
	searchTerm = value;
});

export default chatWithAI;
