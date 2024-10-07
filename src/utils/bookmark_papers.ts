import { baseBookmarkURL } from '$lib/constants';
import axios from 'axios';
import { bookmark_list_store } from '../store/bookmark_list_store';
import selectPaperFunctions from '../utils/select_paper';

async function getBookmarks(id: string | undefined) {
	const response = await axios.post(baseBookmarkURL + '/myBookmarks', {
		userID: id
	});
	bookmark_list_store.set(response.data);
	selectPaperFunctions.selectFirstPaper();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function bookmarkPaper(paperID: any, userID: string | undefined) {
	const response = await axios.post(baseBookmarkURL + '/paper', {
		userID: userID,
		paperID: paperID
	});
	bookmark_list_store.set(response.data);
	selectPaperFunctions.selectFirstPaper();
}

export default { getBookmarks, bookmarkPaper };