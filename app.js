import App from "dotapp";
import { docs, notFound, serverError } from "dotapp/middlewares";

const app = App();

app.use("/api/v1/docs", docs("v1"));
app.use(notFound());
app.use(serverError());

export default app;
