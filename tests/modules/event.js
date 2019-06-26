import { server, token } from '../index';
import faker from 'faker';

let event = {
    title: faker.company.companyName()
};

describe("Event", function () {

    it("create a new event", function (done) {

        server.event("/api/event")
            .set('Authorization', 'Bearer ' + token)
            .send(event)
            .expect(200)
            .end(function (error, response) {
                if (error) return done(error);
                event.id = response.body.data;
                done();
            });
    });

    it("find event by id", function (done) {
        server.get("/api/event/" + event.id)
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

        server.event("/api/event")
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
