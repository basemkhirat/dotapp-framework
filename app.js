import App from "dotapp";
import { docs, notFound, serverError } from "dotapp/middlewares";

const app = App();

app.use("/docs", docs());
app.use(notFound());
app.use(serverError());

export default app;
