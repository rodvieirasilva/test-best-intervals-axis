/*
 * Create the test canvas
 */
function createTestUI(description, idFunc, testCase) {
    div = returnDiv();
    var canvas = document.createElement('canvas');
    canvas.setAttribute("id", returnIdCanvas(idFunc, testCase));
    canvas.setAttribute("style", "background-color: white;border-style: solid;");
    div.appendChild(canvas);
}

/*
 * Return id of the canvas to create
 */
function returnIdCanvas(idFunc, testCase) {
    return "canvas" + idFunc + '_' + testCase;
}

/*
 * Create simple BR
 */
function createBr(idFunc, testCase) {
    var br = document.createElement('br');
    returnDiv().appendChild(br);
}

/*
 * Return the div main
 */
function returnDiv() {
    return document.getElementById('content');
}

/*
 * Create H3
 */
function createH3(description) {
    var h3 = document.createElement('h3');
    h3.innerHTML = description;
    returnDiv().appendChild(h3);
}

/*
 * Create H2
 */
function createH2(description) {
    var h3 = document.createElement('h2');
    h3.innerHTML = description;
    returnDiv().appendChild(h3);
}
