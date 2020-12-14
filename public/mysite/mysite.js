let addNewBox = document.getElementsByClassName("addBox")[0];
let addNewTitle = document.getElementById('addNewInput1');
let addNewContent = document.getElementById('addNewInput2');

function addNewClose(obj) {
    let thispp = obj.parentNode.parentNode;
    thispp.style.display = "none";
}

function addNewConfirm() {
    if (addNewTitle.value && addNewContent.value) {
        $.post('/article/saveArt', {
            title: addNewTitle.value,
            content: addNewContent.value
        }, (res) => {
            if (res.msg == "success") {
                addNewTitle.value = "";
                addNewContent.value = "";
                addNewBox.style.display = "none";
                window.location.reload();
            }
        })
    }
}

function addNewShow() {
    addNewBox.style.display = "";
}

function check_in() {
    $.get('/check_in_or_out/check', res=>{
        if (res.msg == "in") {
        } else {
            document.location = './';
        }
    })
};

$("document").ready(function () {
    check_in();
})