import {server, token} from '../index';
import faker from 'faker';

let media = {
    title: faker.company.companyName(),
    description: faker.company.companyName()
};

describe("Media", function () {

    it("create a new image from url", function (done) {

        this.timeout(60000);

        media.payload = "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png";

        server.post("/api/media")
            .set('Authorization', 'Bearer ' + token)
            .send(media)
            .expect(200)
            .end(function (error, response) {
                if (error) return done(error);
                media.id = response.body.data;
                done();
            });
    });

    it("create a new image from base64 data", function (done) {

        this.timeout(60000);

        media.payload = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg==";

        server.post("/api/media")
            .set('Authorization', 'Bearer ' + token)
            .send(media)
            .expect(200)
            .end(function (error, response) {
                if (error) return done(error);
                server.delete("/api/media/" + response.body.data)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200, done);
            });
    });

    it("create mp4 video from url", function (done) {

        this.timeout(120000);

        media.payload = "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4";

        server.post("/api/media")
            .set('Authorization', 'Bearer ' + token)
            .send(media)
            .expect(200)
            .end(function (error, response) {
                if (error) return done(error);
                server.delete("/api/media/" + response.body.data)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200, done);
            });
    });

    it("create flv video from url", function (done) {

        this.timeout(120000);

        media.payload = "https://sample-videos.com/video123/flv/720/big_buck_bunny_720p_1mb.flv";

        server.post("/api/media")
            .set('Authorization', 'Bearer ' + token)
            .send(media)
            .expect(200)
            .end(function (error, response) {
                if (error) return done(error);
                server.delete("/api/media/" + response.body.data)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200, done);
            });
    });


    it("create a new youtube video from url", function (done) {

        this.timeout(120000);

        media.payload = "https://www.youtube.com/watch?v=L6_CoHNSbwc";

        server.post("/api/media")
            .set('Authorization', 'Bearer ' + token)
            .send(media)
            .expect(200)
            .end(function (error, response) {
                if (error) return done(error);
                server.delete("/api/media/" + response.body.data)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200, done);
            });
    });

    it("create a new soundcloud track from url", function (done) {

        this.timeout(120000);

            media.payload = "https://soundcloud.com/user9175165/deep-shamanic-meditation-relaxing-powerful-meditation-music-for-deep-relaxation-sleep-music-030";

        server.post("/api/media")
            .set('Authorization', 'Bearer ' + token)
            .send(media)
            .expect(200)
            .end(function (error, response) {
                if (error) return done(error);
                server.delete("/api/media/" + response.body.data)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200, done);
            });
    });

    it("find media by id", function (done) {
        server.get("/api/media/" + media.id)
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("update media by id", function (done) {
        server.put("/api/media/" + media.id)
            .set('Authorization', 'Bearer ' + token)
            .send({
                title: faker.company.companyName(),
                description: faker.company.companyName()
            })
            .expect(200, done);
    });

    it("update media thumbnail by id", function (done) {
        server.put("/api/media/thumbnail/" + media.id)
            .set('Authorization', 'Bearer ' + token)
            .send({
                size: "medium",
                data: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg=="
            })
            .expect(200, done);
    });

    it("list all media", function (done) {
        server.get('/api/media')
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("list all media thumbnails", function (done) {
        server.get('/api/media/thumbnails')
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("list all media types", function (done) {
        server.get('/api/media/types')
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("list all media extensions", function (done) {
        server.get('/api/media/extensions')
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("delete media by id", function (done) {
        server.delete("/api/media/" + media.id)
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("perform bulk delete/update operations", function (done) {

        this.timeout(6000);

        let media = {
            payload: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/HgAGgwJ/lK3Q6wAAAABJRU5ErkJggg=="
        };

        server.post("/api/media")
            .set('Authorization', 'Bearer ' + token)
            .send(media)
            .expect(200)
            .end(function (error, response) {
                if (error) return done(error);

                media.id = response.body.data;

                server.patch("/api/media")
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        operation: "update",
                        ids: [media.id],
                        data: {
                            title: "new title",
                            description: "new description"
                        }
                    })
                    .expect(200)
                    .end(function (error, response) {
                        if (error) return done(error);

                        server.patch("/api/media")
                            .set('Authorization', 'Bearer ' + token)
                            .send({
                                operation: "delete",
                                ids: [media.id]
                            })
                            .expect(200, done);
                    })
            });
    });
});
