class PathExample {

    /**
     * Play with x, but in the end return it unchanged
     * @param x   value to be returned unchanged
     * @param c1  a condition
     * @param c2  a condition
     * @param c3  a condition
     * @return same as x
     */
    return_same_value(x, c1, c2, c3) {
        if (c1) {
            x += 1;
        }
        if (c2) {
            x -= 1;
        }
        if (c3) {
            x = x+1-1;
        }
        return x;
    }
}

module.exports = PathExample