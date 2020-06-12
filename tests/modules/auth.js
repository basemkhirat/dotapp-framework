import {server, token, user} from '../index';

describe("Authentication", function () {

    it("do an invalid authentication with non existing email", function (done) {
        server.post('/api/auth/token')
            .send({email: 'FAFE32423FRFf_@gmail.com', password: '1234567'})
            .expect(422, done);
    });

    it("do a valid authentication", function (done) {
        server.post('/api/auth/token')
            .send(user)
            .expect(200)
            .end(function (error, response) {
                if (error) return done(error);
                user.id = response.body.data.id;
                done();
            });
    });

    it("send a forgot/reset password request", function (done) {

        server.post('/api/auth/forgot')
            .send({
                email: user.email
            })
            .expect(200)
            .end(function (error) {
                if (error) return done(error);

                server.get("/api/user/" + user.id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (error, response) {
                        if (error) return done(error);

                        server.post('/api/auth/reset')
                            .send({
                                code: response.body.data.password_token,
                                password: "QRE@#$@!$fo3424F43dse3"
                            })
                            .expect(200, done);
                    });
            });
    });
});
