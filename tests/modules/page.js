import {server, token} from '../index';
import faker from 'faker';

let page = {
    title: faker.company.companyName()
};

describe("page", function () {

    it("create a new page", function (done) {

        server.post("/api/page")
            .set('Authorization', 'Bearer ' + token)
            .send(page)
            .expect(200)
            .end(function (error, response) {
                if (error) return done(error);
                page.id = response.body.data;
                done();
            });
    });

    it("find page by id", function (done) {
        server.get("/api/page/" + page.id)
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end(function (error, response) {
                if (error) return done(error);
                page.slug = response.body.data.slug;
                done();
            });
    });

    it("find page by slug", function (done) {
        server.get("/api/page/slug/" + page.slug)
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("update page by id", function (done) {
        server.put("/api/page/" + page.id)
            .set('Authorization', 'Bearer ' + token)
            .send({
                name: faker.company.companyName()
            })
            .expect(200, done);
    });

    it("list all pages", function (done) {
        server.get('/api/page')
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("delete page by id", function (done) {
        server.delete("/api/page/" + page.id)
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("perform bulk delete operations", function (done) {

        let page = {
            title: faker.company.companyName()
        };

        server.post("/api/page")
            .set('Authorization', 'Bearer ' + token)
            .send(page)
            .expect(200)
            .end(function (error, response) {
                if (error) return done(error);

                page.id = response.body.data;

                server.patch("/api/page")
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        operation: "delete",
                        ids: [page.id]
                    })
                    .expect(200, done);
            });
    });
});
