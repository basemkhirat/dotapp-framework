import Controller from './Controller';
import {google} from 'googleapis';

export default class extends Controller {

    /**
     * Show homepage
     * @param req
     * @param res
     * @param next
     */
    async index(req, res, next) {


        let auth = new google.auth.OAuth2(
            '827628876469-d8mjv567l534qqctlok54uv7von2bp00.apps.googleusercontent.com',
            '8QrBiybwkIFgyysTFMFtC9ks',
            'https://your-website.com/google-auth'
        );

        auth.setCredentials({access_token: 'ya29.GltvBzfNYC9_yTzeKdQg15LePoYLlQMXzEou-Wps4NZkBB9vSnYOZhVHkaMBKI7vcMkKPb6g5WZ05YLKUekzOYQC1tj7LyuIE1nHACXRJ02EoACYAXdN2BA3tdvU'});
        //
        var oauth2 = google.oauth2({
            auth: auth,
            version: 'v2'
        });

        oauth2.userinfo.get(
            function(err, x) {
                if (err) {
                    console.log(err);
                } else {
                    res.ok(x);
                }
            });

        // const people = google.people({
        //     version: 'v1',
        //     auth: auth,
        // });
        //
        // let xxx = await people.people.get({
        //     resourceName: 'people/me',
        //     personFields: 'emailAddresses,names,photos',
        //     /// access_token: ""
        // });
        //
        //
        // res.ok(xxx);

        // res.ok(auth.getToken("ya29.GltuBw0--wtjaIKYkUzyHlHku71HFoGzu22cGLOGZdNOP28ydFESAotOcSrVl7X4F4Vyqn2S8SyLCxe59ChYWfvRXIW6ftRe_ouqhcNjj_2oajWXsUNtHHGMZQrw"));

        // let client = google.auth.OAuth2();
        //
        // client.setCredentials({access_token: 'ACCESS TOKEN HERE'});
        // // var oauth2 = google.oauth2({
        // //     auth: oauth2Client,
        // //     version: 'v2'
        // // });
        //
        // const people = google.people({
        //  //   version: 'v2',
        //     auth: client,
        // });
        //
        // const xxx = await people.people.get({
        //     resourceName: 'people/me',
        //     personFields: 'emailAddresses,names,photos',
        // });


    }
};
