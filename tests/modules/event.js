import { server, token } from '../index';
import faker from 'faker';

let event = {
    title: faker.company.companyName(),
    place: "5d2c782c63a44d713664a600",
    scheduled_at: "2099-07-08T18:15:46.829+02:00"
};

describe("Event", function () {

    it("create a new event", function (done) {

        server.post("/api/event")
            .set('Authorization', 'Bearer ' + token)
            .send(event)
            .expect(200)
            .end(function (error, response) {
                if (error) return done(error);
                event.id = response.body.data;
                done();
            });
    });

    it("like the created event", function (done) {

        server.put("/api/event/like/" + event.id)
            .set('Authorization', 'Bearer ' + token)
            .send(event)
            .expect(200, done);
    });

    it("follow the created event", function (done) {

        server.put("/api/event/follow/" + event.id)
            .set('Authorization', 'Bearer ' + token)
            .send(event)
            .expect(200, done);
    });

    it("find event by id", function (done) {
        server.get("/api/event/" + event.id)
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end(function (error, response) {
                if (error) return done(error);
                event.slug = response.body.data.slug;
                done();
            });
    });

    it("find event by slug", function (done) {
        server.get("/api/event/slug/" + event.slug)
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("update event by id", function (done) {
        server.put("/api/event/" + event.id)
            .set('Authorization', 'Bearer ' + token)
            .send({
                name: faker.company.companyName()
            })
            .expect(200, done);
    });

    it("list all events", function (done) {
        server.get('/api/event')
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("delete event by id", function (done) {
        server.delete("/api/event/" + event.id)
            .set('Authorization', 'Bearer ' + token)
            .expect(200, done);
    });

    it("perform bulk delete operations", function (done) {

        let event = {
            title: faker.company.companyName()
        };

        server.post("/api/event")
            .set('Authorization', 'Bearer ' + token)
            .send(event)
            .expect(200)
            .end(function (error, response) {
                if (error) return done(error);

                event.id = response.body.data;

                server.patch("/api/event")
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        operation: "delete",
                        ids: [event.id]
                    })
                    .expect(200, done);
            });
    });
});
