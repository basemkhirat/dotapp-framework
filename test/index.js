process.env.NODE_ENV = "testing";

require('~/services/database');

import User from '~/models/user';
import Role from '~/models/role';

let server = require('supertest').agent(process.env.APP_URL);
let fakeUser = {email: "testy.mail.dev@me.com", password: "k14l2134421n5l215DSF@$", first_name: "Testy"};

before(function (done) {

    this.timeout(60000);

    Role.findOne({name: "superadmin"}, (error, role) => {

        if (error) throw error;
        if (!role) throw "No superadmin role found";

        let user = new User();

        user.email = fakeUser.email;
        user.password = fakeUser.password;
        user.first_name = fakeUser.first_name;
        user.status = 1;
        user.role = role.id;

        user.save(error => {
            if (error) throw error;
            server.post('/api/auth/token')
                .send({email: fakeUser.email, password: fakeUser.password})
                .expect(200)
                .end((error, response) => {
                    if (error) throw error;
                    module.exports.token = response.body.data.token;
                    done();
                });
        });
    });
});


after(function (done) {
    User.findOne({email: fakeUser.email}, function (error, user) {
        if (error) throw error;
        user.remove();
        done();
    });
});

module.exports.user = fakeUser;
module.exports.server = server;
