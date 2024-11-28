import ANSI from "./utils/ANSI.mjs";
import KeyBoardManager from "./utils/KeyBoardManager.mjs";
import FileManager from "./utils/fileHelpers.mjs";
import * as CONST from "./constants.mjs";
import Entity from "./data/entity.mjs";
import Position from "./data/position.mjs";

import Labyrinth from "./labyrinth.mjs";

const STARTING_LEVEL = CONST.START_LEVEL_ID;
const LEVELS = Labyrinth.loadLevelListings();

//function loadLevelListings(source = CONST.LEVEL_LISTING_FILE) {
//	let data = readRecordFile(source);
//	let levels = {};
//	for (const item of data) {
//		let keyValue = item.split(":");
//		if (keyValue.length >= 2) {
//			let key = keyValue[0];
//			let value = keyValue[1];
//			levels[key] = value;
//		}
//	}
//	return levels;
//}

//let levelData = readMapFile(LEVELS[STARTING_LEVEL]);
console.log(LEVELS);
let level = FileManager.readMapFile(LEVELS[STARTING_LEVEL]);


let pallet = {
	"█": ANSI.COLOR.LIGHT_GRAY,
	"H": ANSI.COLOR.RED,
	"$": ANSI.COLOR.YELLOW,
	"B": ANSI.COLOR.GREEN,
}


let isDirty = true;


const EMPTY = " ";
const HERO = "H";
const LOOT = "$"

let direction = -1;

let items = [];

const THINGS = [LOOT, EMPTY];

let eventText = "";

const HP_MAX = 10;



const ENTITIES = {hero: new Entity("Hero", HERO)};





//function renderHud() {
//	let hpBar = `Life:[${ANSI.COLOR.RED + pad(playerStats.hp, "♥︎") + ANSI.COLOR_RESET}${ANSI.COLOR.LIGHT_GRAY + pad(HP_MAX - playerStats.hp, "♥︎") + ANSI.COLOR_RESET}]`
//	let cash = `$:${playerStats.cash}`;
//	return `${hpBar} ${cash}\n`;
//}

function pad(len, text) {
	let output = "";
	for (let i = 0; i < len; i++) {
		output += text;
	}
	return output;
}


export default Labyrinth;