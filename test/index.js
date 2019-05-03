import request from 'supertest';

let server = request.agent('http://localhost:3000');
let user = {email: 'basem@gmail.com', password: '1234567'};

before(function (done) {

    server.post('/api/auth/token')
        .send(user)
        .expect(200)
        .end((error, response) => {
            if (error) throw error;
            module.exports.token = response.body.data.token;
            done();
        });
});

after(function (done) {
    done();
});

module.exports.server = server;
