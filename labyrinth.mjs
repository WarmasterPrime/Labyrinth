import ANSI from "./utils/ANSI.mjs";
import KeyBoardManager from "./utils/KeyBoardManager.mjs";
import FileManager from "./utils/fileHelpers.mjs";
import {CONSTANTS} from "./constants.mjs";
import Entity from "./data/entity.mjs";
import Position from "./data/position.mjs";
import KeyValuePair from "./data/keyValuePair.mjs";




class Labyrinth {


	constructor() {
		console.warn(LEVELS);
		this.level = FileManager.readMapFile(LEVELS[CONSTANTS.startLevelId]);
	}

	get levels() {
		return Labyrinth.loadLevelListings();
	}


	update() {

		if (ENTITIES.hero.position.x == null) {
			for (let row = 0; row < level.length; row++) {
				for (let col = 0; col < level[row].length; col++) {
					if (level[row][col] == ENTITIES.hero.display) {
						ENTITIES.hero.position.x = col;
						ENTITIES.her.position.y = row;
						break;
					}
				}
				if (ENTITIES.hero.position.y !== undefined) {
					break;
				}
			}
		}

		let drow = 0;
		let dcol = 0;

		if (KeyBoardManager.isUpPressed()) {
			drow = -1;
		} else if (KeyBoardManager.isDownPressed()) {
			drow = 1;
		}

		if (KeyBoardManager.isLeftPressed()) {
			dcol = -1;
		} else if (KeyBoardManager.isRightPressed()) {
			dcol = 1;
		}

		let tRow = ENTITIES.hero.position.y + (1 * drow);
		let tcol = ENTITIES.hero.position.x + (1 * dcol);
		if (THINGS.includes(this.level[tRow][tcol])) { // Is there anything where Hero is moving to
			let currentItem = level[tRow][tcol];
			if (currentItem == LOOT) {
				let loot = Math.round(Math.random() * 7) + 3;
				ENTITIES.hero.cash += loot;
				eventText = `Player gained ${loot}$`;
			}

			// Move the HERO
			level[ENTITIES.hero.position.y][ENTITIES.hero.position.x] = EMPTY;
			level[tRow][tcol] = ENTITIES.hero.display;

			// Update the HERO
			ENTITIES.hero.position.y = tRow;
			ENTITIES.hero.position.x = tCol;

			// Make the draw function draw.
			isDirty = true;
		} else {
			direction *= -1;
		}
	}

	draw() {

		if (isDirty == false) {
			return;
		}
		isDirty = false;

		console.log(ANSI.CLEAR_SCREEN, ANSI.CURSOR_HOME);

		let rendring = "";

		rendring += Labyrinth.renderHud();

		for (let row = 0; row < level.length; row++) {
			let rowRendering = "";
			for (let col = 0; col < level[row].length; col++) {
				let symbol = level[row][col];
				if (pallet[symbol] != undefined) {
					rowRendering += pallet[symbol] + symbol + ANSI.COLOR_RESET;
				} else {
					rowRendering += symbol;
				}
			}
			rowRendering += "\n";
			rendring += rowRendering;
		}

		console.log(rendring);
		if (eventText != "") {
			console.log(eventText);
			eventText = "";
		}
	}

	static loadLevelListings(source = CONSTANTS.levelListingFile) {
		let data = FileManager.readRecordFile(source);
		let levels = {};
		for (const item of data) {
			let keyValue = item.split(":");
			let itm = new KeyValuePair(keyValue[0], keyValue[1]);
			levels[itm.key] = itm.value;
		}
		return levels;
	}

	static renderHud() {
		let hpBar = `Life:[${ANSI.COLOR.RED + Labyrinth.pad(ENTITIES.hero.hp, "♥︎") + ANSI.COLOR_RESET}${ANSI.COLOR.LIGHT_GRAY + Labyrinth.pad(HP_MAX - ENTITIES.hero.hp, "♥︎") + ANSI.COLOR_RESET}]`
		let cash = `$:${ENTITIES.hero.cash}`;
		return `${hpBar} ${cash}\n`;
	}

	static pad(len, text) {
		let output = "";
		for (let i = 0; i < len; i++) {
			output += text;
		}
		return output;
	}

}

const STARTING_LEVEL = CONSTANTS.startLevelId;
const LEVELS = Labyrinth.loadLevelListings();

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




export default Labyrinth;
