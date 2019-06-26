var button = document.getElementById('createButton');
button.addEventListener('click', function(){ /**  */});

// 이벤트 삭제하려면 이름이 있어야함
var div = document.getElementById('div');

var listener = function(event){

}

div.addEventListener ('click', listener, false);

div.removeEventListener('click', listener, false);