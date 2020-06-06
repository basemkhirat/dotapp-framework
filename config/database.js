export default {

    /**
     * The database connection string
     */

    url: process.env.DB_URL || 'mongodb://localhost/db_name',

    options: {

        /**
         * The underlying MongoDB driver has deprecated their current connection string parser.
         * Because this is a major change, they added the useNewUrlParser flag to allow users to
         * fall back to the old parser if they find a bug in the new parser.
         * You should set useNewUrlParser: true unless that prevents you from connecting.
         * Note that if you specify useNewUrlParser: true, you must specify a port in your connection string,
         * like mongodb://localhost:27017/dbname. The new url parser does not support connection strings that
         * do not have a port, like mongodb://localhost/dbname.
         */

        useNewUrlParser: true,

        /**
         * DB user
         */

        user: process.env.DB_USER || '',

        /**
         * DB password
         */

        pass: process.env.DB_PASS || '',

        /**
         * By default, mongoose will automatically build indexes defined in your schema
         * when it connects. This is great for development, but not ideal for large production deployments,
         * because index builds can cause performance degradation. If you set autoIndex to false,
         * mongoose will not automatically build indexes for any model associated with this connection.
         */

        autoIndex: true,

        /**
         * False by default. Set to true to make Mongoose's default index build use createIndex()
         * instead of ensureIndex() to avoid deprecation warnings from the MongoDB driver.
         */

        useCreateIndex: true,

        /**
         * True by default. Set to false to make findOneAndUpdate() and findOneAndRemove()
         * use native findOneAndUpdate() rather than findAndModify().
         */

        useFindAndModify: true,

        /**
         * The maximum number of sockets the MongoDB driver will keep open for this connection.
         * By default, poolSize is 5. Keep in mind that, as of MongoDB 3.4, MongoDB only allows
         * one operation per socket at a time, so you may want to increase this if you find you
         * have a few slow queries that are blocking faster queries from proceeding.
         */

        poolSize: 5,

        /**
         * How long the MongoDB driver will wait before killing a socket due to inactivity during
         * initial connection. Defaults to 30000. This option is passed transparently to
         * Node.js' socket#setTimeout() function.
         */

        connectTimeoutMS: 30000,

        /**
         * How long the MongoDB driver will wait before killing a socket due to inactivity after initial connection.
         * A socket may be inactive because of either no activity or a long-running operation.
         * This is set to 30000 by default,
         * you should set this to 2-3x your longest running operation if you expect some of
         * your database operations to run longer than 20 seconds. This option is passed to Node.js
         * socket#setTimeout() function after the MongoDB driver successfully completes.
         */

        socketTimeoutMS: 30000,

        /**
         * Enables the new unified topology layer
         */

        useUnifiedTopology: true
    }
};
