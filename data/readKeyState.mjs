import KEY_STATES from "./keyStates.mjs";
function readKeyState(key) {
	let value = KEY_STATES[key];
	KEY_STATES[key] = false;
	return value;
}
export default readKeyState;