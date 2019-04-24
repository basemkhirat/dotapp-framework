import compression from 'compression';

export default function () {
    return compression({
        threshold: 0,
        filter: function () {
            return true;
        }
    });
}
