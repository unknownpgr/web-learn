let param1 = document.getElementById('param1');
let param2 = document.getElementById('param2');
let result = document.getElementById('result');

function doAdd() {
    fetch('/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            a: param1.value,
            b: param2.value
        })
    })
        .then(data => data.json())
        .then(json => {
            result.innerText = json.result;
        });
}

function doSub() {
    fetch('/sub', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            a: param1.value,
            b: param2.value
        })
    })
        .then(data => data.json())
        .then(json => {
            result.innerText = json.result;
        });
}