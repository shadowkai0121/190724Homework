(function (global) {

    twv = function (request) {
        return new twv.init(request);
    }

    var idParams = {
        prefix: 'ABCDEFGHJKLMNPQRSTUVXYWZIO',
        genderList: ['1', '2']
    }

    var features = {
        idVertify: function (queryString) {

            let result = false,
                sum = this.idSum(queryString)
                    + parseInt(queryString[queryString.length - 1]);

            result = sum % 10 === 0;

            return result ? 'id' : '';
        },
        randomID: function (...option) {
            // option[0] = 指定區域
            // option[1] = 指定性別

            let rndLetter,
                rndNums,
                rndID,
                rndGender,
                lastNum;

            // 產生 7 位亂數
            rndNums = '' + parseInt(Math.random() * 10000000);
            rndNums = rndNums.padStart(7, '0');

            // 判斷是否有指定性別
            if (idParams.genderList.indexOf(option[1]) !== -1) {
                rndGender = option[1];
            }
            else {
                rndGender = parseInt(Math.random() * 2 + 1);
            }

            // 判斷是否有需要指定區域
            if (option[0]) {
                rndID = option[0] + rndGender + rndNums;
            }
            else {
                rndLetter = parseInt(Math.random() * idParams.prefix.length);
                rndID = idParams.prefix[rndLetter] + rndGender + rndNums;
            }

            // 補上最後一號
            lastNum = this.idSum(rndID) % 10 === 0 ?
                0 : 10 - this.idSum(rndID) % 10;

            return rndID + lastNum;
        },
        // id 數字加總驗證
        idSum: function (queryString) {

            let first = queryString[0],
                // 確認是要驗證還是要亂數
                controller = queryString.length < 10 ? 0 : 1,
                // 轉換字首對應的數字
                n12 = idParams.prefix.indexOf(first) + 10,
                n1 = parseInt(n12 / 10),
                n2 = n12 % 10,
                // 第二個字元後轉為字元陣列
                ns = queryString.substring(1, queryString.length).split(''),
                sum = n1 + n2 * 9;

            for (let i = 0; i < ns.length - controller; i++) {
                sum += ns[i] * (8 - i);
            }

            return sum;
        }
    }



    twv.prototype = {
        validate: function (queryString) {
            const idPattern = /^[A-Z][12]\d{8}/g;
            const emailPattern = /^\w+@\w+\.[A-Za-z]+/g

            if (idPattern.exec(queryString)) {
                return features.idVertify(queryString);
            }
            else if (emailPattern.exec(queryString)) {
                return 'email';
            }
        },
        randomID: function (area, gender) {
            return features.randomID(area, gender);
        }
    }

    twv.init = function (request) {
        this.type = this.validate(request);
    }

    twv.init.prototype = twv.prototype;

    global.twv = twv;
}(window));
