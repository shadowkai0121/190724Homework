const letters = 'ABCDEFGHJKLMNPQRSTUVXYWZIO';
function ramdomTWID() {

    let rndLetter = 0;
    let rndNums = 0;
    let rndID = '';
    let rndGender = 0;

    rndLetter = parseInt(Math.random() * letters.length);
    rndNums = parseInt(Math.random() * 10000000);
    rndGender = parseInt(Math.random() * 2 + 1);
    rndID = letters[rndLetter] + rndGender + rndNums;
    console.log(rndID);
    takeFinalNumber(rndID);
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

    console.log(sum % 10);

}

ramdomTWID();
