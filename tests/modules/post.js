import {server, token} from '../index';
import faker from 'faker';

let post = {
    title: faker.company.companyName()
};

describe("Post", function () {

    it("create a new post", function (done) {

        server.post("/api/post")
            .set('Authorization', 'Bearer ' + token)
            .send(post)
            .expect(200)
            .end(function (error, response) {
                if (error) return done(error);
                post.id = response.body.data;
                done();
            });
    });


    it("like the created post", function (done) {

        server.put("/api/post/like/" + post.id)
            .set('Authorization', 'Bearer ' + token)
            .send({
                id: post.id
            })
            .expect(200, done);
    });

    it("follow the created post", function (done) {

        server.put("/api/post/follow/" + post.id)
            .set('Authorization', 'Bearer ' + token)
            .send({
                id: post.id
            })
            .expect(200, done);
    });

    it("comment the created post", function (done) {

        server.put("/api/post/comment/" + post.id)
            .set('Authorization', 'Bearer ' + token)
            .send({
                id: post.id,
                body: faker.company.companyName()
            })
            .expect(200, done);
    });

    it("find post by id", function (done) {
        server.get("/api/post/" + post.id)
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("update post by id", function (done) {
        server.put("/api/post/" + post.id)
            .set('Authorization', 'Bearer ' + token)
            .send({
                name: faker.company.companyName()
            })
            .expect(200, done);
    });

    it("list all posts", function (done) {
        server.get('/api/post')
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("delete post by id", function (done) {
        server.delete("/api/post/" + post.id)
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("perform bulk delete operations", function (done) {

        let post = {
            title: faker.company.companyName()
        };

        server.post("/api/post")
            .set('Authorization', 'Bearer ' + token)
            .send(post)
            .expect(200)
            .end(function (error, response) {
                if (error) return done(error);

                post.id = response.body.data;

                server.patch("/api/post")
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        operation: "delete",
                        ids: [post.id]
                    })
                    .expect(200, done);
            });
    });
});
