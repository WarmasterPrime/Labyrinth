import ANSI from "./utils/ANSI.mjs";
import KeyBoardManager from "./utils/KeyBoardManager.mjs";
import FileManager from "./utils/fileHelpers.mjs";
import {CONSTANTS} from "./constants.mjs";
import Entity from "./data/entity.mjs";
import Position from "./data/position.mjs";
import KeyValuePair from "./data/keyValuePair.mjs";

class Labyrinth {

	#levels;

	constructor() {
		//this.level = undefined;
		this.#levels = Labyrinth.loadLevelListings();
		let tmp = FileManager.readMapFile(this.#levels[CONSTANTS.startLevelId]);
		this.level = tmp;
		entities.hero.position = this.getHeroPosition();
	}
	/**
	 * Gets the levels.
	 * @return {object}
	 */
	get levels() {
		return this.#levels;
	}

	get currentLevel() {
		return this.level;
	}

	set currentLevel(levelName) {
		this.level = this.levels[levelName];
	}
	/**
	 * Updates the data for all entities and objects.
	 */
	update() {

		if (KeyBoardManager.isQuitPressed()) {
			process.exit();
		}

		if (entities.hero.position.x == null) {
			for (let row = 0; row < this.currentLevel.length; row++) {
				for (let col = 0; col < this.currentLevel[row].length; col++) {
					if (level[row][col] == entities.hero.display) {
						entities.hero.position.x = col;
						entities.her.position.y = row;
						break;
					}
				}
				if (entities.hero.position.y !== undefined) {
					break;
				}
			}
		}
		let drow = 0;
		let dcol = 0;
		if (KeyBoardManager.isUpPressed()) {
			drow = 1;
		} else if (KeyBoardManager.isDownPressed()) {
			drow = -1;
		}
		if (KeyBoardManager.isLeftPressed()) {
			dcol = -1;
		} else if (KeyBoardManager.isRightPressed()) {
			dcol = 1;
		}
		let tRow = entities.hero.position.y + drow; // Predicted Y position.
		let tcol = entities.hero.position.x + dcol; // Predicted X position.

		console.log(`X: ${tcol}, Y: ${tRow}`);
		//console.log(THINGS.includes(this.currentLevel[tRow][tcol]));

		if (THINGS.includes(this.currentLevel[tRow][tcol])) { // Is there anything where Hero is moving to
			let currentItem = this.currentLevel[tRow][tcol];
			if (currentItem == LOOT) {
				let loot = Math.round(Math.random() * 7) + 3;
				entities.hero.cash += loot;
				eventText = `Player gained ${loot}$`;
			}
			// Move the HERO
			this.moveHeroBy(dcol, drow);
			console.log("PASSED");
			//level[entities.hero.position.y][entities.hero.position.x] = EMPTY;
			//level[tRow][tcol] = entities.hero.display;
			// Update the HERO

			//entities.hero.position.y = tRow;
			//entities.hero.position.x = tCol;
			// Make the draw function draw.
			isDirty = true;
		} else {
			direction *= -1;
		}
	}
	/**
	 * Adjusts the player's current position on the map.
	 * @param {any} x
	 * @param {any} y
	 */
	moveHeroBy(x, y) {
		let currentHeroPosition = this.getHeroPosition();
		this.setHero(entities.hero.position.x + x, entities.hero.position.y + y);
		this.setBlockAt(currentHeroPosition.x, currentHeroPosition.y, entities.empty);
	}
	/**
	 * Sets the player's position on the map.
	 * @param {any} x
	 * @param {any} y
	 */
	setHero(x, y) {
		entities.hero.position.x = x;
		entities.hero.position.y = y;
		this.setBlockAt(entities.hero.position.x, entities.hero.position.y, entities.hero.display);
	}
	/**
	 * Sets the block or entity at a given position in the level map.
	 * @param {int} x The x coordinate
	 * @param {int} y The y coordinate
	 * @param {string} entityDisplay The entity to place.
	 */
	setBlockAt(x, y, entityDisplay) {
		console.log(Object.getOwnPropertyDescriptors(this.level));
		let tmpRow = this.level[y].split("");
		tmpRow[x] = Labyrinth.#simplify(entityDisplay);
		this.level[y] = tmpRow;
		//this.level[y][x] = entityDisplay;
	}
	/**
	 * Gets the position of the hero in the level map.
	 * @returns {Position|null}
	 */
	getHeroPosition() {
		return this.getEntityPosition(entities.hero.display);
	}
	/**
	 * Gets the position of a given entity in the level.
	 * @param {string} entityDisplay The character representing the entity.
	 * @returns {Position|null}
	 */
	getEntityPosition(entityDisplay) {
		for (let y = 0; y < this.currentLevel.length; y++) {
			for (let x = 0; x < this.currentLevel[y].length; x++) {
				if (this.level[y][x] === entityDisplay) {
					return new Position(x, y);
				}
			}
		}
		return null;
	}
	/**
	 * Renders all of the game objects.
	 * @returns {undefined}
	 */
	draw() {
		if (!isDirty)
			return;
		isDirty = false;
		console.log(ANSI.CLEAR_SCREEN, ANSI.CURSOR_HOME);
		let rendring = "";
		rendring += Labyrinth.renderHud();
		for (let row = 0; row < this.currentLevel.length; row++) {
			let rowRendering = "";
			for (let col = 0; col < this.currentLevel[row].length; col++) {
				let symbol = this.currentLevel[row][col];
				rowRendering += pallet[symbol] === undefined ? symbol : pallet[symbol] + symbol + ANSI.COLOR_RESET;
			}
			rendring += rowRendering + "\n";
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
		let hpBar = `Life:[${ANSI.COLOR.RED + Labyrinth.pad(entities.hero.hp, "♥︎") + ANSI.COLOR_RESET}${ANSI.COLOR.LIGHT_GRAY + Labyrinth.pad(HP_MAX - entities.hero.hp, "♥︎") + ANSI.COLOR_RESET}]`;
		let cash = `$:${entities.hero.cash}`;
		return `${hpBar} ${cash}\n`;
	}

	static pad(len, text) {
		let output = "";
		for (let i = 0; i < len; i++) {
			output += text;
		}
		return output;
	}

	static #simplify(array) {
		let res = "";
		for (let i = 0; i < array.length; i++) {
			res += array[i];
		}
		return res;
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
let entities = {hero: new Entity("Hero", HERO), empty: new Entity("Empty", EMPTY)};

export default Labyrinth;