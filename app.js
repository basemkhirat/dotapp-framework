import App from 'dotapp';
import Docs from 'dotapp/middlewares/docs';

const app = App();

app.use('/docs', Docs());
app.use(app.errorHandler());

export default app;
