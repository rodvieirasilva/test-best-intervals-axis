/*
* Implementantion of loose label algorithm,
* Tufte_Visual-Display-of-Quantitative-Information
* GRAPHIC GEMS - NICE NUMBERS FOR GRAPH LABELS
*/

//const ntick ← 5; desired number of tick marks
//loose_label: label the data range from min to max loosely. (tight method is similar )
//procedure loose_label(min, max: real);
function loose_label_method(min, max, ntick) {
    var intervals = [];
    //nfrac: int;
    var nfrac;
    //d: real; tick mark spacing
    var d;
    //graphmin, graphmax: real; graph range min and max
    var graphmin;
    var graphmax;
    //range, x: real;
    var range, x;
    //begin
    //range ← nicenum(max – min, false);
    range = nicenum(max - min, false);

    //d ← nicenum(range/(ntick – 1), true);
    d = nicenum(range / (ntick - 1), true);

    //graphmin ← floor(min/d)*d;
    graphmin = Math.floor(min / d) * d;

    //graphmax ← ceiling(max/d)*d;
    graphmax = Math.ceil(max / d) * d;

    //nfrac ← max( – floor(logl0(d)), 0); number of fractional digits to show
    nfrac = Math.max(-Math.floor(log10(d)), 0);
    //number of fractional digits to show
    //for x← graphmin to graphmax + .5 * d step d do
    for (x = graphmin; x <= graphmax + (.5 * d); x += d) {
        //put tick mark at x, with a numerical label showing nfrac fraction digits
        intervals.push(x.roundTo(nfrac))
            //endloop;
    }

    return intervals;
    //endproc loose_label;
}

//nicenum: find a“ nice” number approximately equal to x.
//Round the number
//if round = true, take ceiling
//if round = false.


//function nicenum(x: real; round: boolean): real;
function nicenum(x, round) {
    //exp: int;exponent of x
    var exp;
    //f: real;fractional part of x
    var f;
    //nf: real;nice,
    var nf;
    //rounded fraction
    //begin
    //exp← floor(logl0(x));
    exp = Math.floor(log10(x));
    //f← x / expt(10., exp);between 1 and 10
    f = x / (Math.pow(10, exp));

    //if round then
    if (round) {

        if (f < 1.5) { //if f < 1.5 then nf← 1.;
            nf = 1.;
        } else if (f < 3) { //else if f < 3. then nf← 2.;
            nf = 2.;
        } else if (f < 7) { //else if f < 7. then nf← 5.;
            nf = 5.;
        } else { //else nf← 10.;
            nf = 10.;
        }
    }
    //    else
    else {

        if (f <= 1.) { //if f≤ 1. then nf← 1.;
            nf = 1.;
        } else if (f <= 2.) { //else if f≤ 2. then nf← 2.
            nf = 2.;
        } else if (f <= 5.) { //else if f≤ 5. then nf← 5.;
            nf = 5.;
        } else {
            nf = 10.;
        }
    }
    //return nf * expt(10., exp);
    return nf * (Math.pow(10., exp));
    //  endfunc nicenum;
}
