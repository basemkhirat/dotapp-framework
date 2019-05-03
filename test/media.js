import { server, token } from './index';
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
                if(error) throw error;
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
                if(error) throw error;
                media.id = response.body.data;
                done();
            });
    });

    it("create a new video from url", function (done) {

        this.timeout(60000);

        media.payload = "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4";

        server.post("/api/media")
            .set('Authorization', 'Bearer ' + token)
            .send(media)
            .expect(200)
            .end(function (error, response) {
                if(error) throw error;
                media.id = response.body.data;
                done();
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
                description: faker.company.companyName(),
            })
            .expect(200, done);
    });

    it("list all users", function (done) {
        server.get('/api/media')
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("delete media by id", function (done) {
        server.delete("/api/media/" + media.id)
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });
});
