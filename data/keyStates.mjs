import KEY_ID from "./keyIdList.mjs";
const KEY_STATES = Object.keys(KEY_ID).reduce((prev, cur) => {
	prev[cur] = false;
	return prev;
}, {});
export default KEY_STATES;