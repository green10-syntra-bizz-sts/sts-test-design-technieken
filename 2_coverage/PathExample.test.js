const PathExample = require("./PathExample.js");
let pathExample, x;

beforeEach( () => {
    pathExample = new PathExample();
    x = 25;
})

test("p0-p2-p4-p6-p7", () => {
    expect(pathExample.return_same_value(x, true, true, true))
        .toEqual(25);
} )

test("p0-p1-p4-p6-p7", () => {
    expect(pathExample.return_same_value(x, false, true, true))
        .toEqual(25);
} )

test("p0-p2-p3-p6-p7", () => {
    expect(pathExample.return_same_value(x, true, false, true))
        .toEqual(25);
} )

test("p0-p2-p4-p5-p7", () => {
    expect(pathExample.return_same_value(x, true, true, false))
        .toEqual(25);
} )

test("p0-p1-p3-p5-p7", () => {
    expect(pathExample.return_same_value(x, false, false, false))
        .toEqual(25);
} )