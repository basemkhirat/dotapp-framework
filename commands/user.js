import User from '~/models/user';

export default class {

    command = 'user';

    description = "Listing all user";

    action(args, done) {

        this.log("Listing all user");

        User.find().exec((error, users) => {
            this.log(users);
            done(error, users);
        });
    }

    cancel() {
        this.log("Listing user canceled");
    }
}
