const letters = 'ABCDEFGHJKLMNPQRSTUVXYWZIO';
const genderList = ['1', '2'];

function ramdomTWID(...option) {
    // option[0] = 指定區域，無指定為 none
    // option[1] = 指定性別

    let rndLetter,
        rndNums,
        rndID,
        rndGender;


    // 產生 7 位亂數
    rndNums = parseInt(Math.random() * 10000000);

    // 判斷是否有指定性別
    if (genderList.indexOf(option[1]) !== -1) {
        rndGender = option[1];
    }
    else {
        rndGender = parseInt(Math.random() * 2 + 1);
    }

    // 判斷是否有需要指定區域
    if (option[0] !== 'none') {
        rndID = option[0] + rndGender + rndNums;
    }
    else {
        rndLetter = parseInt(Math.random() * letters.length);
        rndID = letters[rndLetter] + rndGender + rndNums;
    }

    return rndID + takeFinalNumber(rndID);
}

function takeFinalNumber(id) {
    let first = id[0],
        // 轉換字首對應的數字
        n12 = letters.indexOf(first) + 10,
        n1 = parseInt(n12 / 10),
        n2 = n12 % 10,
        // 第二個字元後轉為字元陣列
        ns = id.substring(1, id.length).split(''),
        sum = n1 + n2 * 9;

    // 計算驗證數字
    for (let i = 0; i < ns.length; i++) {
        sum += ns[i] * (8 - i);
    }


    // 如果 sum % 10 = 0 則最後一位為 0
    // 否則回傳可以讓 (sum + n) % 10 等於 0 的 n
    return sum % 10 === 0 ? 0 : 10 - sum % 10;

}

