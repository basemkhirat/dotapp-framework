import {server, token} from '../index';
import faker from 'faker';

let user = {
    email: faker.internet.email(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    password: faker.internet.password(),
    status: 1,
    lang: "en",
    permissions: ["category.create", "category.delete"]
};

describe("User", function () {

    it("create a new user", function (done) {
        server.post("/api/v1/user")
            .set('Authorization', 'Bearer ' + token)
            .send(user)
            .expect(200)
            .end(function (error, response) {
                if (error) return done(error);
                user.id = response.body.data;
                done();
            });
    });

    it("find user by id", function (done) {
        server.get("/api/v1/user/" + user.id)
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("update user by id", function (done) {
        server.put("/api/v1/user/" + user.id)
            .set('Authorization', 'Bearer ' + token)
            .send({
                email: faker.internet.email(),
                first_name: faker.name.firstName(),
                password: faker.internet.password()
            })
            .expect(200, done);
    });

    it("list all users", function (done) {
        server.get('/api/v1/user')
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("delete user by id", function (done) {
        server.delete("/api/v1/user/" + user.id)
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

});
