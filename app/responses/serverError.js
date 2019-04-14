export default function (data) {

    let error = new Error();

    error.message = "Internal Server Error";
    error.status = 500;
    error.success = false;

    if (_config("app.env") != "production") {
        if (data instanceof Error) {
            error.message = data.message;
        } else if (data) {
            error.message = data
        }
    }

    this.res.status(error.status);

    return this.res.json(error);
};
