import Reservation from '~/models/reservation';
import Validator from 'validatorjs';

/**
 * validate Registerer
 * @param req
 * @param res
 * @returns {Validator}
 */
export default function (req, res) {

    Validator.registerAsync('email_available', function (email, id, x, passes) {


        Reservation.findOne({email: email, event: id}).exec((error, user) => {
            return user ? passes(false, req.lang("user.email_taken")) : passes();
        });
    });

    let rules = {
        email: 'required|email|email_available:' + req.param("id"),
        first_name: 'required|min:2'
    };

    return new Validator(req.all(), rules);
}
