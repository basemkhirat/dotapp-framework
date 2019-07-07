import { server, token } from '../index';
import faker from 'faker';

let author = {
    name: faker.company.companyName()
};

describe("Author", function () {

    it("create a new author", function (done) {

        server.post("/api/author")
            .set('Authorization', 'Bearer ' + token)
            .send(author)
            .expect(200)
            .end(function (error, response) {
                if (error) return done(error);
                author.id = response.body.data;
                done();
            });
    });

    it("find author by id", function (done) {
        server.get("/api/author/" + author.id)
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end(function (error, response) {
                if (error) return done(error);
                author.slug = response.body.data.slug;
                done();
            });
    });

    it("find author by slug", function (done) {
        server.get("/api/author/slug/" + author.slug)
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("update author by id", function (done) {
        server.put("/api/author/" + author.id)
            .set('Authorization', 'Bearer ' + token)
            .send({
                name: faker.company.companyName()
            })
            .expect(200, done);
    });

    it("list all categories", function (done) {
        server.get('/api/author')
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("delete author by id", function (done) {
        server.delete("/api/author/" + author.id)
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("perform bulk delete operations", function (done) {

        let author = {
            name: faker.company.companyName()
        };

        server.post("/api/author")
            .set('Authorization', 'Bearer ' + token)
            .send(author)
            .expect(200)
            .end(function (error, response) {
                if (error) return done(error);

                author.id = response.body.data;

                server.patch("/api/author")
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        operation: "delete",
                        ids: [author.id]
                    })
                    .expect(200, done);
            });
    });
});
