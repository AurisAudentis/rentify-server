import {assert, request, use} from 'chai';
import chaiHttp = require("chai-http");

use(chaiHttp);


describe('Bare path /', () => {

    it("should return {hello: 'world'}", (done => {
        request("localhost:3001")
            .get('/')
            .end(function (err, res) {
                assert.notExists(err);
                assert(res.status === 200);
                assert.isObject(res.body);
                assert.deepEqual(res.body, {hello: "world"});
                done()
    })}));
});
