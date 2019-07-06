export default {

    toArray: function (term) {

        let items = [];

        this.split(term).forEach(item => {
            item = item.trim();
            if (items.indexOf(item) < 0) {
                items.push(item);
            }
        });

        return items.filter(item => item !== "");
    }

};
