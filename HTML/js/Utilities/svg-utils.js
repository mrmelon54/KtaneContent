/**
 * Creates a tag that goes in an <svg> block.
 * @param {string} tag - Type of element (text, rect, circle, etc.).
 * @param {dictionary} attrs - Attributes to set in the new element. e.g. {class:"highlightable", r:5, cx:4, cy:12}.
 */
 function makeSvgElem(tag, attrs) {
    let el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (let k in attrs)
        el.setAttribute(k, attrs[k]);
    return el;
}

/**
 * Makes a perfect regular polygon with verticies all lying on a circle.
 * @param {float} radius - Radius of the invisible circle (and the polygon).
 * @param {float} cx - x coordinate of center of polygon.
 * @param {float} cy - y coordinate of center of polygon.
 * @param {float} numSides - Number of sides of the polygon.
 * @param {float} rot - Rotation angle in degrees of the whole polygon.
 * @param {dictionary} attrs - Attributes to set in the new element. e.g. {class:"highlightable", fill:"#000"}.
 */
function regularPolygon(radius, cx = 0, cy = 0, numSides = 3, rot = 0, attrs = null) {
    let n = Math.max(3, numSides);
    let r = Math.max(1e-6, radius);
    let angle = Math.PI / 180 * (rot - 90);
    let dTheta = 2 * Math.PI / n;
    let vert = [];
    for (let i = 0; i < n; i++) {
        let a = i*dTheta + angle;
        let x = cx + r * Math.cos(a);
        let y = cy + r * Math.sin(a);
        vert.push([x, y]);
    }

    let el = makeSvgElem("polygon", attrs);
    el.setAttribute("points", vert.join(" "));
    return el;
}