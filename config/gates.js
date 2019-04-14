export default {

    permissions: [
        "createPost"
    ],

    overrides: {
        createPost: function () {
            return false;
        }
    }

}
