import User from '~/models/user';

export default class {

    command = 'user';

    description = "Listing all users";

    async action(args, done) {

        let users = await User.find();

        this.log(users);

        this.log("Total: " + users.length);
    }

    cancel() {
        this.log("Listing user canceled");
    }
}
