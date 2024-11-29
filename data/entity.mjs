import Position from "./position.mjs";

class Entity {

	constructor(name, display) {
		/**
		 * The name of the entity.
		 * @returns {string}
		 */
		this.name = name;
		/**
		 * The position the entity is located at.
		 * @returns {Position}
		 */
		this.position = new Position(0, 0);
		/**
		 * The character to display on the UI.
		 * @return {string}
		 */
		this.display = display;
		/**
		 * The hitpoints of the entity.
		 * @returns {int}
		 */
		this.hp = 8;
		/**
		 * The cash of the entity.
		 * @returns {int}
		 */
		this.cash = 0;
	}

}

export default Entity;