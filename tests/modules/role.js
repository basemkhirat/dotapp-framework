import { server, token } from '../index';
import faker from 'faker';

let role = {
    name: faker.company.companyName()
};

describe("Role", function () {

    it("create a new role", function (done) {
        server.post("/api/v1/role")
            .set('Authorization', 'Bearer ' + token)
            .send(role)
            .expect(200)
            .end(function (error, response) {
                if (error) return done(error);
                role.id = response.body.data;
                done();
            });
    });

    it("find role by id", function (done) {
        server.get("/api/v1/role/" + role.id)
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("update role by id", function (done) {
        server.put("/api/v1/role/" + role.id)
            .set('Authorization', 'Bearer ' + token)
            .send({
                name: faker.company.companyName()
            })
            .expect(200, done);
    });

    it("list all roles", function (done) {
        server.get('/api/v1/role')
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("delete role by id", function (done) {
        server.delete("/api/v1/role/" + role.id)
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });
});
