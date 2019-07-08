import { server, token } from '../index';
import faker from 'faker';

let block = {
    name: faker.company.companyName(),
    type: "post"
};

describe("Block", function () {

    it("create a new block", function (done) {

        server.post("/api/block")
            .set('Authorization', 'Bearer ' + token)
            .send(block)
            .expect(200)
            .end(function (error, response) {
                if (error) return done(error);
                block.id = response.body.data;
                done();
            });
    });

    it("find block by id", function (done) {
        server.get("/api/block/" + block.id)
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end(function (error, response) {
                if (error) return done(error);
                block.slug = response.body.data.slug;
                done();
            });
    });

    it("find block by slug", function (done) {
        server.get("/api/block/slug/" + block.slug)
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("update block by id", function (done) {
        server.put("/api/block/" + block.id)
            .set('Authorization', 'Bearer ' + token)
            .send({
                name: faker.company.companyName()
            })
            .expect(200, done);
    });

    it("list all categories", function (done) {
        server.get('/api/block')
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("delete block by id", function (done) {
        server.delete("/api/block/" + block.id)
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("perform bulk delete operations", function (done) {

        let block = {
            name: faker.company.companyName()
        };

        server.post("/api/block")
            .set('Authorization', 'Bearer ' + token)
            .send(block)
            .expect(200)
            .end(function (error, response) {
                if (error) return done(error);

                block.id = response.body.data;

                server.patch("/api/block")
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        operation: "delete",
                        ids: [block.id]
                    })
                    .expect(200, done);
            });
    });
});
