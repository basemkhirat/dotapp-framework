import User from '~/models/user';

export default class {

    command = 'user';

    description = "Listing all user";

    action(args, done) {

        this.log("Listing all users");

        User.find().exec((error, users) => {
            if(error) throw error
            this.log(users);
            done(error, users);
        });
    }

    cancel() {
        this.log("Listing user canceled");
    }
}
