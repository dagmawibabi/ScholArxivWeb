/* eslint-disable @typescript-eslint/no-explicit-any */

// Extract Paper ID
function extractID(eachPaper: any) {
	const paperId = eachPaper['id'];
	const extractedId = paperId.split('/').pop();
	return extractedId;
}

export default extractID;
