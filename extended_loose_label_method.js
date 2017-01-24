/*  An Extension of Wilkinson’s Algorithm
 *       for Positioning Tick Labels on Axes
 */

//EXTENDED(dmin,dmax,ρt ,Q = {1,5,2,2.5,4,3})
function extended_loose_label_method(dmin, dmax, pt, Q) {

    var results = [];
    var best = extended_loose_label_method_calc(dmin, dmax, pt, Q);

    for (var i = best.min; i <= best.max; i += best.step) {
        results.push(i.roundTo(4));
    }

    return results;
}


function extended_loose_label_method_calc(dmin, dmax, pt, Q) {
    if (typeof(Q) == 'undefined') {
        Q = [1, 5, 2, 2.5, 4, 3];
    }
    var best = {};
    //w = [0.2, 0.25, 0.5, 0.05]
    var w = [0.25, 0.2, 0.5, 0.05];
    //result = NULL;
    var result = [];
    //best-score = −2
    var bestScore = -2;
    var loose = true;
    //for q, j∈ Q×[1..∞]
    var j = 1;
    while_prin:
        while (j < Number.MAX_VALUE) {
            for (var i = 0; i < Q.length; i += 1) {
                var q = Q[i];
                //s ˆ = simplicitymax(q, j)
                var tmpI = i + 1;
                var sm = simplicityMax(tmpI, j, Q.length);
                //if [sˆ, 1, 1, 1]· w < best - score
                //console.log(bestScore);
                if (score(w, sm, 1, 1, 1) < bestScore) {

                    break while_prin;
                }
                //for k in 2 to∞
                var k = 2;
                while (k < Number.MAX_VALUE) {
                    //2 dˆ = densitymax(k)
                    var dm = densityMax(k, pt);
                    // if [sˆ, 1, dˆ, 1]· w < best - score
                    //break
                    if (score(w, sm, 1, dm, 1) < bestScore) {
                        break;
                    }
                    //delta = (dmax− dmin) / (k + 1) / (j∗ q)
                    var delta = (dmax - dmin) / (k + 1) / (j * q);
                    //for z in dlog10 deltae to∞
                    var z = Math.ceil(log10(delta));
                    while (z < Number.MAX_VALUE) {
                        //lstep = q∗ j∗ 10 z
                        var step = j * q * Math.pow(10, z);

                        //3 ˆc = coveragemax(k− 1, lstep)
                        var cm = coverageMax(dmin, dmax, step * (k - 1));

                        //if [sˆ, cˆ, dˆ, 1]· w < best - score
                        //break
                        if (score(w, sm, cm, dm, 1) < bestScore) {
                            break;
                        }
                        //for start in bdmax / lstepc−(k− 1)
                        //  to ddmin / lstepe by 1 / j
                        var min_start = (Math.floor(dmax / step - (k - 1)) * j);
                        var max_start = (Math.ceil(dmin / step)) * j;

                        for (var start = min_start; start <= max_start; start += 1) {
                            //lmin = start∗ lstep;
                            var lmin = start * step / j;
                            //lmax = lmin + (k− 1) lstep
                            var lmax = lmin + step * (k - 1);
                            //s = simplicity(q, j, lmin, lmax, lstep)
                            var s = simplicity(tmpI, j, lmin, lmax, step, Q.length);
                            //d = density(lmin, lmax, lstep)
                            var d = density(k, pt, dmin, dmax, lmin, lmax);
                            //c = coverage(lmin, lmax, lstep)
                            var c = coverage(dmin, dmax, lmin, lmax);
                            var l = legibility(lmin, lmax, step);
                            //if [s, c, d, 1]· w < best - score
                            var scor = score(w, s, c, d, l);
                            if (scor > bestScore && (!loose || (lmin <= dmin && lmax >= dmax))) {
                                //continue
                                //l, lformat = OPTLEGIBILITY(lmin, lmax, lstep)
                                //score = [s, c, d, l]· w
                                //if score > best - score
                                //best - score = score
                                //result = LABEL(lmin, lmax, lstep, lf ormat)
                                best.min = lmin;
                                best.max = lmax;
                                best.step = step;
                                best.score = scor;
                                bestScore = scor;
                            }
                        }
                        z += 1;
                    }
                    k += 1;
                }
            }
            j += 1;
        }
    return best;
}

function simplicity(i, j, min, max, step, qLength) {
    if (qLength > 1) {
        return 1 - i / (qLength - 1) - j + v(min, max, step);
    } else {
        return 1 - j + v(min, max, step);
    }
}

function simplicityMax(i, j, qLength, v) {
    if (typeof(v) === 'undefined') {
        v = 1; //default
    }
    //simplicity = 1 − i −1
    //|Q| −1 − j + v
    if (qLength > 1) {
        return 1.0 - i / (qLength - 1.0) - j + 1.0;
    } else {
        return 1.0 - j + 1.0;
    }
}

function score(w, s, c, d, l) {
    return w[0] * s + w[1] * c + w[2] * d + w[3] * l;
}

function densityMax(k, m) {
    /*  1− max( ρ
     ρt
     ,
     ρt
     ρ
     )*/
    if (k >= m) {
        return 2 - (k - 1) / (m - 1);
    } else {
        return 1;
    }
}

function density(k, m, dmin, dmax, lmin, lmax) {
    /*  1− max( ρ
     ρt
     ,
     ρt
     ρ
     )*/
    var r = (k - 1) / (lmax - lmin);
    var rt = (m - 1) / (Math.max(lmax, dmax) - Math.min(lmin, dmin));
    return 2 - Math.max(r / rt, rt / r);
}

function legibility(min, max, step) {
    //not now
    //legibility = format + font-size + orientation + overlap
    //  4
    return 1;
}

function coverage(dmin, dmax, lmin, lmax) {
    //  coverage = 1 −
    //1 2
    //(dmax − lmax)2 + (dmin − lmin)2
    //[0.1 · (dmax − dmin)]
    var a = dmax - lmax;
    var b = dmin - lmin;
    var c = 0.1 * (dmax - dmin);
    return 1 - 0.5 * ((a * a + b * b) / (c * c));
}

function coverageMax(dmin, dmax, span) {
    //  coverage = 1 −
    //1 2
    //(dmax − lmax)2 + (dmin − lmin)2
    //[0.1 · (dmax − dmin)]
    var range = dmax - dmin;
    if (span > range) {
        var half = (span - range) / 2;
        var r = 0.1 * range;
        return 1 - half * half / (r * r);
    } else {
        return 1.0;
    }
}


function v(min, max, step) {
    return (flooredMod(min, step) < eps && min <= 0 && max >= 0) ? 1 : 0;
}

function flooredMod(a, n) {
    return a - n * Math.floor(a / n);
}
