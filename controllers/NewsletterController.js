import Controller from "~/controllers/Controller";
import Validator from 'validatorjs';
import Subscription from '~/models/subscription';

export default class extends Controller {

    /**
     * Subscribe an email
     * @param req
     * @param res
     */
    subscribe(req, res) {

        let email = req.param("email");

        let validate = new Validator(req.all(), {
            email: 'required|email'
        });

        validate.checkAsync(() => {

            Subscription.where("email", email).findOne((error, subscription) => {
                if (error) return res.serverError(error);

                if (subscription) {

                    if (subscription.status === 1) {
                        return res.validationError(req.lang("subscription.errors.email_already_subscribed"));
                    }

                    if (subscription.status === 0) {

                        subscription.status = 1;

                        subscription.save((error, subscription) => {
                            if (error) return res.serverError(error);

                            return res.message(req.lang("subscription.events.subscribed")).ok(subscription.id);
                        });
                    }

                } else {

                    subscription = new Subscription();

                    subscription.email = email;
                    subscription.status = 1;

                    subscription.save((error, subscription) => {
                        if (error) return res.serverError(error);

                        req.mail(email, "NewsletterSubscribed");

                        return res.message(req.lang("subscription.events.subscribed")).ok(subscription.id);
                    });

                }
            });

        }, () => {
            return res.validationError(Object.values(validate.errors.all()).map(error => error[0]));
        });
    }

    /**
     * Unsubscribe an email
     * @param req
     * @param res
     */
    unsubscribe(req, res) {

        let email = req.param("email");

        let validate = new Validator(req.all(), {
            email: 'required|email'
        });

        validate.checkAsync(() => {

            Subscription.where("email", email).findOne((error, subscription) => {
                if (error) return res.serverError(error);

                if (!subscription) return res.validationError(req.lang("subscription.errors.email_not_found"));

                subscription.status = 0;

                subscription.save((error, subscription) => {
                    if (error) return res.serverError(error);

                    return res.ok(subscription.id);
                });
            });

        }, () => {
            return res.validationError(Object.values(validate.errors.all()).map(error => error[0]));
        });

    }
}
