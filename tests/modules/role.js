import { server, token } from '../index';
import faker from 'faker';

let role = {
    name: faker.company.companyName()
};

describe("Role", function () {

    it("create a new role", function (done) {
        server.post("/api/role")
            .set('Authorization', 'Bearer ' + token)
            .send(role)
            .expect(200)
            .end(function (error, response) {
                if(error) throw error;
                role.id = response.body.data;
                done();
            });
    });

    it("find role by id", function (done) {
        server.get("/api/role/" + role.id)
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("update role by id", function (done) {
        server.put("/api/role/" + role.id)
            .set('Authorization', 'Bearer ' + token)
            .send({
                name: faker.company.companyName()
            })
            .expect(200, done);
    });

    it("list all roles", function (done) {
        server.get('/api/role')
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("delete role by id", function (done) {
        server.delete("/api/role/" + role.id)
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("perform bulk delete/update operations", function (done) {

        let role = {
            name: faker.company.companyName(),
            status: 0,
            permissions: ["category.destroy", "category.read"]
        };

        server.post("/api/role")
            .set('Authorization', 'Bearer ' + token)
            .send(role)
            .expect(200)
            .end(function (error, response) {
                if (error) throw error;

                role.id = response.body.data;

                server.patch("/api/role")
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        operation: "update",
                        ids: [role.id],
                        data: {
                            status: 1,
                            permissions: ["category.create", "category.delete"]
                        }
                    })
                    .expect(200)
                    .end(function (error, response) {
                        if (error) throw error;

                        server.patch("/api/role")
                            .set('Authorization', 'Bearer ' + token)
                            .send({
                                operation: "delete",
                                ids: [role.id]
                            })
                            .expect(200, done);
                    })

            });


    });
});
