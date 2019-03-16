"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const chaiHttp = require("chai-http");
chai_1.use(chaiHttp);
describe('Bare path /', () => {
    it("should return {hello: 'world'}", (done => {
        chai_1.request("localhost:3001")
            .get('/')
            .end(function (err, res) {
            chai_1.assert.notExists(err);
            chai_1.assert(res.status === 200);
            chai_1.assert.isObject(res.body);
            chai_1.assert.deepEqual(res.body, { hello: "world" });
            done();
        });
    }));
});
