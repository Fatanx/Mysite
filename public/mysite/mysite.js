let addNewBox = document.getElementsByClassName("addBox")[0];
let addNewTitle = document.getElementById('addNewInput1');
let addNewContent = document.getElementById('addNewInput2');

function addNewClose(obj) {
    let thispp = obj.parentNode.parentNode;
    thispp.style.display = "none";
}

function addNewConfirm() {
    if (addNewTitle.value && addNewContent.value) {
        $.post('/mongo/saveArt', {
            title: addNewTitle.value,
            content: addNewContent.value
        }, (req, res) => {
            if(res=="success!"){
                addNewBox.style.display = "none";
            }
        })
    }
}

function addNewShow() {
    addNewBox.style.display = "";
}

function check_in(){
    $.get('/check_in_or_out/check',function(res){
      if(res.msg == "in"){
        console.log('登录了');
      }
      else{
        // $.get('./');
        document.location='./';
      }
    })
  };
$("document").ready(function(){
    check_in();
})
