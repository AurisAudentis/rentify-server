import { describe } from 'mocha';
import { assert } from 'chai';
import {app} from "../src/app";


describe('app express-wrapper', () => {
    const testapp = new app();

    it('should exist', (done) => {
        assert.exists(testapp);
        done();
    })
});