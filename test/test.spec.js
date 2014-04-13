"use strict";

describe('adder', function() {
    var add = require('../src/helper/adder');

    it('should add two numbers appropriately', function() {
        expect(add(1,2)).toBe(3);
    });

});
