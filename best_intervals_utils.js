/*
 * Round numbers with places
 */
Number.prototype.roundTo = function(places) {
    return +(Math.round(this + "e+" + places) + "e-" + places);
}

/*
 * log in base 10
 */
function log10(n) {
    return Math.log(n) / Math.LN10;
}

/*
 *  Constant for min modification
 */
var eps = 1e-10;



/*
 * Count decimals in value
 */
Number.prototype.countDecimals = function(value) {
    if (Math.floor(value) !== value)
        return value.toString().split(".")[1].length || 0;
    return 0;
}
