import v1 from "~/routes/api/v1";

export default {
    "/": {
        handler: "HomeController.index",

        group: {
            "/api": {
                group: {
                    "/v1": v1,
                },
            },
        },
    },
};
