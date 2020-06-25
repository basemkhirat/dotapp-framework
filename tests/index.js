import supertest from 'supertest';
import User from '~/models/user';
import Role from '~/models/role';
import app from '../app';
import faker from "faker";

let server = supertest(app);

let fakeUser = {
    email: faker.internet.email(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    password: faker.internet.password()
};

before(function (done) {

    this.timeout(60000);

    Role.findOne({name: "superadmin"}, (error, role) => {

        if (error) return done(error);
        if (!role) return done(new Error("No superadmin role found"));

        let user = new User();

        user.email = fakeUser.email;
        user.password = fakeUser.password;
        user.first_name = fakeUser.first_name;
        user.status = 1;
        user.role = role.id;

        user.save(error => {
            if (error) return done(error);
            server.post('/api/v1/auth/token')
                .send({email: fakeUser.email, password: fakeUser.password})
                .expect(200)
                .end((error, response) => {
                    if (error) return done(error);
                    module.exports.token = response.body.data.token;
                    done();
                });
        });
    });
});


after(function (done) {
    User.findOne({email: fakeUser.email}, function (error, user) {
        if (error) return done(error);
        if(!user) return done(new Error("No user has superadmin role"));
        user.remove();
        done();
    });
});

module.exports.user = fakeUser;
module.exports.server = server;
