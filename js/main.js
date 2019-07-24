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

function checkID(id) {
    document.getElementById('checkResult').innerHTML =
        twv(id).type === 'id' ? '格式正確' : '身分證格式錯誤';
}

function checkEmail(email) {
    document.getElementById('checkResult').innerHTML =
        twv(email).type === 'email' ? '格式正確' : '信箱格式錯誤';
}

function getID() {
    let area = document.getElementById('area').value;
    let gender = document.getElementById('gender').value;

    document.getElementById('newID').value = twv().randomID(area, gender);
}