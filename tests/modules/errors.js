import { server, token } from '../index';
import faker from 'faker';

describe("Errors", function () {

    it("test not found", function (done) {
        server.get("/other/path")
            .expect(404, done);
    });

    it("test not authenticated", function (done) {
        server.get("/api/user")
            .expect(401, done);
    });
});