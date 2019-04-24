/**
 * get base url
 * @param path
 * @returns {string}
 * @private
 */
export default function (path) {
    let base_url = this.req.protocol + '://' + this.req.get('host');
    return path ? base_url + "/" + path : base_url;
};
