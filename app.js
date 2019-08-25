import App from 'dotapp';
import Docs from 'dotapp/middlewares/docs';
import Router from 'dotapp/services/router';
import routes from "~/routes";

const app = App();

app.use("/", Router.map(routes));
app.use('/docs', Docs());

app.use(app.errorHandler());

export default app;
