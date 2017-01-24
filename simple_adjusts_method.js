/*
 * Book: C++ GUI Programming with Qt3
 */
function simple_adjusts_method(min, max, numTicks) {

    var results = [];
    var grossStep = (max - min) / numTicks;
    var step = Math.pow(10.0, Math.floor(log10(grossStep)));

    if (5 * step < grossStep) {
        step *= 5;
    } else if (2 * step < grossStep) {
        step *= 2;
    }
    numTicks = Math.round(Math.ceil(max / step) - Math.floor(min / step));
    //if (numTicks < MinTicks)
    //    numTicks = MinTicks;

    min = Math.floor(min / step) * step;
    max = Math.ceil(max / step) * step;

    nfrac = Math.max(-Math.floor(log10(step)), 0);

    for (var i = min; i <= max; i += step) {
        results.push(i.roundTo(nfrac));
    }
    return results;
}
