"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const app_1 = require("../src/app");
mocha_1.describe('app express-wrapper', () => {
    const testapp = new app_1.app();
    it('should exist', (done) => {
        chai_1.assert.exists(testapp);
        done();
    });
});
