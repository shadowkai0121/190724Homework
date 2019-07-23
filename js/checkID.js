
function checkTWID(id) {
    let ret = false;

    // g = 完整搜尋
    // i = 不分大小寫
    const regex = /^[A-Z][12]\d{8}$/g;

    const letters = 'ABCDEFGHJKLMNPQRSTUVXYWZIO';

    if (regex.exec(id)) {
        let c = id[0],
            // 轉換字首對應的數字
            n12 = letters.indexOf(c) + 10,
            n1 = parseInt(n12 / 10),
            n2 = n12 % 10,
            // 第二個字元後轉為字元陣列
            ns = id.substring(1, id.length).split(''),
            sum = n1 + n2 * 9;

        for (let i = 0; i < ns.length - 1; i++) {
            sum += ns[i] * (8 - i);
        }

        sum += parseInt(ns[ns.length - 1]);

        ret = sum % 10 === 0;
    }

    return ret;
}