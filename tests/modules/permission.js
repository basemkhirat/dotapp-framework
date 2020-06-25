import {server, token} from '../index';

describe("Permission", function () {

    it("find all system permissions", function (done) {

        server.get("/api/v1/permission")
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("find current user permissions", function (done) {

        server.get("/api/v1/permission/me")
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });
});
