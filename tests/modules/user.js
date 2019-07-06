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
        server.post("/api/user")
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
        server.get("/api/user/" + user.id)
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("update user by id", function (done) {
        server.put("/api/user/" + user.id)
            .set('Authorization', 'Bearer ' + token)
            .send({
                email: faker.internet.email(),
                first_name: faker.name.firstName(),
                password: faker.internet.password()
            })
            .expect(200, done);
    });

    it("list all users", function (done) {
        server.get('/api/user')
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("delete user by id", function (done) {
        server.delete("/api/user/" + user.id)
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });


    it("perform bulk delete/update operations", function (done) {

        let user = {
            email: faker.internet.email(),
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            password: faker.internet.password(),
            status: 1,
            lang: "en",
            permissions: ["category.destroy", "category.read"]
        };

        server.post("/api/user")
            .set('Authorization', 'Bearer ' + token)
            .send(user)
            .expect(200)
            .end(function (error, response) {
                if (error) return done(error);
                user.id = response.body.data;

                server.patch("/api/user")
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        operation: "update",
                        ids: [user.id],
                        data: {
                            status: 1,
                            permissions: ["category.create", "category.delete"]
                        }
                    })
                    .expect(200)
                    .end(function (error, response) {
                        if (error) return done(error);

                        server.patch("/api/user")
                            .set('Authorization', 'Bearer ' + token)
                            .send({
                                operation: "delete",
                                ids: [user.id]
                            })
                            .expect(200, done);
                    })

            });
    });
});
