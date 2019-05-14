import BodyParser from 'body-parser';

export default function () {
    return BodyParser.json({
        limit: '100mb',
        extended: true
    });
}
