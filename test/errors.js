import { server, token } from './index';
import faker from 'faker';

describe("errors", function () {

    it("Test Not Found", function (done) {

        server.get("/other/path")
            .expect(404, done);

    });

    it("Test Not Authenticated", function (done) {

        server.get("/api/user")
            .expect(401, done);

    });
});
