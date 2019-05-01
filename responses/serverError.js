export default function (data) {

    let error = undefined;

    if (process.env.NODE_ENV !== 'production') {
        if (data instanceof Error) {

            error = data.stack.split('\n')
                .splice(0, 2)
                .map(line => {
                    return line.trim();
                }).join(" ");

        } else {
            error = data;
        }
    }

    this.res.smessage = this.res.smessage || "Internal Server Error";

    return this.res.error(error, 500);
};
