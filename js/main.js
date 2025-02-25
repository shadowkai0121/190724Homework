
// 驗證 & 隨機身分證
(function (global) {

    // 先建立物件給全域使用
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


    // 全域使用的功能
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

    // 物件建構子
    twv.init = function (request) {
        this.type = this.validate(request);
    }

    twv.init.prototype = twv.prototype;

    // 全域使用 twv() 操作物件
    global.twv = twv;
}(window));



// 取得縣市、字首資料
axios.get('https://raw.githubusercontent.com/shadowkai0121/myNotes/master/JavaScript/JS_D3/TaiwanMap/taiwan.json')
    .then(res => {
        let data = res.data.objects.County_MOI_1060525.geometries,
            region;

        for (let item of data) {
            region = `<option value="${item.properties.COUNTYID}">${item.properties.COUNTYNAME}</option>`;
            document.getElementById('area').insertAdjacentHTML(
                'beforeend', region);
        }
    });

function vertifyID(id) {
    document.getElementById('checkResult').innerHTML =
        twv(id).type === 'id' ? '格式正確' : '身分證格式錯誤';
}

function vertifyEmail(email) {
    document.getElementById('checkResult').innerHTML =
        twv(email).type === 'email' ? '格式正確' : '信箱格式錯誤';
}

function getID() {
    let area = document.getElementById('area').value;
    let gender = document.getElementById('gender').value;

    document.getElementById('newID').value = twv().randomID(area, gender);
}


