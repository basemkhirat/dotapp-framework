export default function (data, code = 500) {

    let error = "Internal Server Error";

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

    return this.res.error(error, code);
};
