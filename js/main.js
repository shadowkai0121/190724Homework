axios.get('https://raw.githubusercontent.com/shadowkai0121/myNotes/master/JavaScript/JS_D3/TaiwanMap/taiwan.json')
    .then(res => {
        data = res.data.objects.County_MOI_1060525.geometries;

        let info = '';
        for (let item of data) {
            info = `<option value="${item.properties.COUNTYID}">${item.properties.COUNTYNAME}</option>`;
            document.getElementById('area').insertAdjacentHTML(
                'beforeend', info);
        }
    });


function checkID(id) {
    document.getElementById('checkResult').innerHTML =
        checkTWID(id) ? '格式正確' : '身分證格式錯誤';
}