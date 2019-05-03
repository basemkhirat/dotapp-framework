import {server} from './index';

describe("Authentication", function () {

    it("do an invalid authentication with non Existing email", function (done) {
        server.post('/api/auth/token')
            .send({email: 'FAFE32423FRFf_@gmail.com', password: '1234567'})
            .expect(422, done);
    });

    it("do a valid authentication", function (done) {
        server.post('/api/auth/token')
            .send({email: 'basem@gmail.com', password: '1234567'})
            .expect(200, done);
    });
});
