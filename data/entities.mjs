import Entity from "./entity.mjs";
let entities = {
	hero: new Entity("Hero", "H"),
	empty: new Entity("Empty", " "),
	door: new Entity("Door", "D"),
	teleporter: new Entity("Teleporter", "⇡"),
	loot: new Entity("Loot", "$")
};
export default entities;