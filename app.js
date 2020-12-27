import App from "dotapp";
import { routes, docs, notFound, serverError } from "dotapp/middlewares";

const app = App();

app.use(routes());
app.use("/api/v1/docs", docs("v1"));
app.use(notFound());
app.use(serverError());

export default app;
