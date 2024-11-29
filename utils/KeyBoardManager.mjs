import * as readline from "node:readline"
import KEY_ID from "../data/keyIdList.mjs";
import KEY_STATES from "../data/keyStates.mjs";
import readKeyState from "../data/readKeyState.mjs";
import capitalize from "../capitalizer.mjs";
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY)
	process.stdin.setRawMode(true);
process.stdin.on("keypress", (str, key) => {
	if (key.name == KEY_ID.escape) {
		process.exit();
	}
	if (KEY_STATES.hasOwnProperty(key.name)) {
		KEY_STATES[key.name] = true;
	}
});

let KeyBoardManager = {};
initializeKeyboardManagerData();
function initializeKeyboardManagerData() {
	let item, value;
	for ([item, value] of Object.entries(KEY_ID)) {
		let keyName = item;
		addFunctionToKeyboardManager("is" + capitalize(keyName) + "Pressed", () => {
			return readKeyState(KEY_ID[keyName]);
		});
	}
}
function addFunctionToKeyboardManager(key, value) {
	KeyBoardManager[key] = value;
}

//let KeyBoardManager = {
//	isEnterPressed: () => {
//		return readKeyState(KEY_ID.return);
//	},
//	isDownPressed: () => {
//		return readKeyState(KEY_ID.down);
//	},
//	isUpPressed: () => {
//		return readKeyState(KEY_ID.up);
//	},
//	isLeftPressed: () => {
//		return readKeyState(KEY_ID.left);
//	},
//	isRightPressed: () => {
//		return readKeyState(KEY_ID.right);
//	},
//	isRotatePressed: () => {
//		return readKeyState(KEY_ID.r);
//	},
//	isWPressed: () => {
//		return readKeyState(KEY_ID.w);
//	},
//	isQuitPressed: () => {
//		return readKeyState(KEY_ID.q);
//	}
//}

export default KeyBoardManager;