import fs from "node:fs";
import { CONSTANTS } from "../constants.mjs";


class FileManager {

    static readFromFile(fileName) {
        return fs.readFileSync(`${CONSTANTS.mapDirectory}${fileName.trim()}`, {encoding: "utf8"}).replace("\r", "");
    }

    static readMapFile(fileName) {
        console.log("PASSED");
        console.trace();
        return FileManager.readFromFile(fileName).split("\n").reduce((prev, curr) => {
            if (prev === undefined) {
                prev = [];
            }
            prev.push(curr.split(""));
        }, []);
    }

    static readRecordFile(fileName) {
        return fs.readFileSync(fileName.trim(), {encoding: "utf8"}).replace("\r", "").split("\n");
    }

}

//function readMapFile(fileName) {
//    let data = fs.readFileSync(`${MAP_DIRECTORY}${fileName.trim()}`, { encoding: "utf8" });
//    data = data.split("\n");
//    data = data.reduce((prev, curr) => {
//        prev.push(curr.split(""));
//        return prev;
//    }, []);
//    return data;
//}

//function readRecordFile(fileName) {
//    let data = fs.readFileSync(fileName, { encoding: "utf8" });
//    return data.split("\n");
//}

export default FileManager;