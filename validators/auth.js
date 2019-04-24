export default function (req) {
    req.check("email", "Email required").notEmpty();
    req.check("email", "Invalid email").isEmail();
    req.check("password", "Password required").notEmpty();
}
