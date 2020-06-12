# Commands

Commands are classes created in `commands` directory to execute nodejs scripts.

Let's create users command to list all database users.
Create a file `commands/users.js`.

``` javascript
// commands/users.js

import User from '~/models/user';

export default class {

    // The command name
    command = 'users';

    // The command description [help]
    description = "Listing all users";

    // method that fired on command
    async action(args, done) {

        let users = await User.find();

        this.log(users);

        this.log("Total: " + users.length);
    }

    // method that fired on command cancellation
    cancel() {
        this.log("Listing user canceled");
    }
}

```
Now, you can run the above from cli.

``` bash
$ node run users

[
  {
    first_name: 'basem',
    last_name: 'khirat',
    status: 1,
    lang: 'en',
    provider: 'local',
    email: 'basem@gmail.com',
    email_verification_code: '636kz2pc',
    email_verification_code_expiration: 1591833948390,
    created_at: 2020-06-10T23:05:48.392Z,
    updated_at: 2020-06-10T23:46:49.871Z,
    photo: null,
    password_token: 'm89rnv4b',
    password_token_expiration: 1591836160100,
    name: 'basem khirat',
    created: '2 days ago',
    updated: '2 days ago',
    id: '5ee1674c6ae42955d75f50dc'
  }
]
Total: 4
```

Show all defined command on `commands` directory.

``` bash
$ node run help

Commands:

    help [command...]  Provides help for a given command.
    exit               Exits application.
    users              Listing all users

```


