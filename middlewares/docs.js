const swaggerUi = require('swagger-ui-express');

export default function () {
    return [
        swaggerUi.serve,
        swaggerUi.setup(
            require(process.cwd() + '/docs.json'),
            {
                customSiteTitle: "CMS API Documentation",
                customCss: '.swagger-ui .topbar { display: none } .responses-table > tbody > div {display: none}'
            }
        ),

    ];
}
