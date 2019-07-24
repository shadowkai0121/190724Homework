; (function (global) {

    twv = function (str, kind) {
        return new twv.init(str, kind);
    }

    var features = {
        idVertify: function (queryString) {

            let result = false;

            const letters = 'ABCDEFGHJKLMNPQRSTUVXYWZIO';

            let first = queryString[0],
                // 轉換字首對應的數字
                n12 = letters.indexOf(first) + 10,
                n1 = parseInt(n12 / 10),
                n2 = n12 % 10,
                // 第二個字元後轉為字元陣列
                ns = queryString.substring(1, queryString.length).split(''),
                sum = n1 + n2 * 9;

            for (let i = 0; i < ns.length - 1; i++) {
                sum += ns[i] * (8 - i);
            }

            sum += parseInt(ns[ns.length - 1]);

            result = sum % 10 === 0;

            return result;
        },
    }



    twv.prototype = {
        validate: function (queryString) {
            const idPattern = /^[A-Z][12]\d{8}/gi;

            if (idPattern.exec(queryString)) {
                return features.idVertify(queryString);
            }

            return false;
        }
    }

    twv.init = function (str, request) {
        var self = this;
        self.queryString = [str, request];

        self.validate(str);
    }

    twv.init.prototype = twv.prototype;

    global.twv = twv;
}(window));

twv('A123456789');
