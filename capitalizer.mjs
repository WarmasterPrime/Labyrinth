/**
 * Capitalizes the first letter in the string.
 * @param {string} value The string to capitalize.
 * @returns {string}
 */
function capitalize(value) {
	let res = "";
	for (let i = 0; i < value.length; i++) {
		res += i > 0 ? value[i] : value[i].toUpperCase();
	}
	return res;
}