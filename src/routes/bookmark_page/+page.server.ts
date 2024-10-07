import axios from 'axios';
import { baseBookmarkURL } from '$lib/constants';
// import { authClient } from '$lib/auth_client';
import { useSession } from '$lib/auth_client';

export async function load() {
	// const session = authClient.useSession();
	const session = useSession();
	console.log(session);
	try {
		const response = await axios.post(baseBookmarkURL + '/myBookmarks', {
			userId: session.get().data?.user.id
		});
		return {
			bookmarkedPapers: response.data
		};
	} catch (error) {
		console.error('Error fetching discovery papers:', error);
		return {
			bookmarkedPapers: []
		};
	}
}
