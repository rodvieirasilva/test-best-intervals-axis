/*
 * Simple min max method
 */
function simple_min_max_method(min, max, steps) {
    var results = [];

    var step = (max - min) / steps;
    for (var i = 0; i <= steps; i++) {
        var valStep = (step * i);
        var value = min + valStep;
        results.push(value);
    }

    return results;
}
