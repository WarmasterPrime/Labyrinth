import fs from "node:fs";
import { CONSTANTS } from "../constants.mjs";


class FileManager {

	static readFromFile(fileName) {
		return fs.readFileSync(`${CONSTANTS.mapDirectory}${fileName.trim()}`, {encoding: "utf8"}).replaceAll("\r", "");
	}
	/**
	 * Gets the map file data.
	 * @param {any} fileName
	 * @returns {string[]}
	 */
	static readMapFile(fileName) {
		let res = FileManager.readFromFile(fileName).split("\n");
		return res;
	}

	static readRecordFile(fileName) {
		return fs.readFileSync(fileName.trim(), {encoding: "utf8"}).replaceAll("\r", "").split("\n");
	}

}
export default FileManager;