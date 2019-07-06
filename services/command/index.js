import vorpal from 'vorpal';
import walkSync from 'walk-sync';
import path from 'path';
import connection from "~/services/database";

let c = vorpal();

c.on("client_command_executed", () => connection.close());

let commands_path = path.join(process.cwd(), "commands");

walkSync(commands_path).forEach(file => {

    let command = require(commands_path + "/" + file).default;

    if (command !== undefined) {

        let command_object = new command();

        let cli = c.delimiter("")
            .command(command_object.command)
            .description(command_object.description);

        if (Array.isArray(command_object.options)) {
            command_object.options.forEach(option => {
                cli.option(option[0] ? option[0] : "", option[1] ? option[1] : "");
            });
        }

        cli.action(command_object.action).cancel(command_object.cancel);
    }
});

c.show();
c.parse(process.argv);

export default c;
