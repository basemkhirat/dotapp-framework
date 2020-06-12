import User from "~/models/user";
import Role from "~/models/role";
import { Validator } from "dotapp/services";

export default class {
    command = "user:create";

    description = "Create the root user";

    async action() {
        try {
            // Create a superadmin role

            let superadmin_role = await Role.where(
                "name",
                "superadmin"
            ).findOne();

            if (!superadmin_role) {
                superadmin_role = new Role();
                superadmin_role.name = "superadmin";
                superadmin_role.status = 1;
                await superadmin_role.save();
            }

            let questions = [
                {
                    type: "input",
                    name: "first_name",
                    message: "First Name *: ",
                },
                {
                    type: "input",
                    name: "last_name",
                    message: "Last Name *: ",
                },
                {
                    type: "input",
                    name: "email",
                    message: "Email: ",
                },
                {
                    type: "password",
                    name: "password",
                    message: "Password: ",
                },
            ];

            let values = await this.prompt(questions);

            Validator.registerAsync(
                "email_available",
                async (email, id, x, passes) => {
                    let user = await User.where("email", email).findOne();
                    return user
                        ? passes(false, "Email is already taken")
                        : passes();
                }
            );

            let validation = new Validator(values, {
                first_name: "required|min:2",
                last_name: "required|min:2",
                email: "required|email|email_available",
                password: "required|min:7",
            });

            if (!(await validation.validate())) {
                return console.log(validation.errors.all());
            }

            const user = new User();

            user.first_name = values.first_name;
            user.last_name = values.last_name;
            user.email = values.email;
            user.password = values.password;
            user.role = superadmin_role.id;
            user.status = 1;

            await user.save();

            this.log("\n");
            this.log("User created successfully!");

        } catch (error) {
            throw error;
        }
    }
}
