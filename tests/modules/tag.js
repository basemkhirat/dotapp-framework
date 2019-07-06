import { server, token } from '../index';
import faker from 'faker';

let tag = {
    name: faker.company.companyName()
};

describe("Tag", function () {

    it("create a new tag", function (done) {
        server.post("/api/tag")
            .set('Authorization', 'Bearer ' + token)
            .send(tag)
            .expect(200)
            .end(function (error, response) {
                if (error) return done(error);
                tag.id = response.body.data;
                done();
            });
    });

    it("find tag by id", function (done) {
        server.get("/api/tag/" + tag.id)
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("find tag by name", function (done) {
        server.get("/api/tag/name/" + tag.name)
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("update tag by tag id", function (done) {
        server.put("/api/tag/" + tag.id)
            .set('Authorization', 'Bearer ' + token)
            .send({
                name: faker.company.companyName()
            })
            .expect(200, done);
    });

    it("list all categories", function (done) {
        server.get('/api/tag')
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("delete tag by id", function (done) {
        server.delete("/api/tag/" + tag.id)
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("perform bulk delete operations", function (done) {

        let tag = {
            name: faker.company.companyName()
        };

        server.post("/api/tag")
            .set('Authorization', 'Bearer ' + token)
            .send(tag)
            .expect(200)
            .end(function (error, response) {
                if (error) return done(error);

                tag.id = response.body.data;

                server.patch("/api/tag")
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        operation: "delete",
                        ids: [tag.id]
                    })
                    .expect(200, done);
            });
    });
});
