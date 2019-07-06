export default function () {
    return function (req, res, next) {

        let origRender = res.render;

        res.render = function (view, locals, callback) {
            if ('function' == typeof locals) {
                callback = locals;
                locals = undefined;
            }
            if (!locals) {
                locals = {};
            }
            locals.req = req;
            origRender.call(res, view, locals, callback);
        };

        next();
    }
}
