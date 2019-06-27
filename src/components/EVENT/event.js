var button = document.getElementById('createButton');
button.addEventListener('click', function(){ /**  */});

// 이벤트 삭제하려면 이름이 있어야함
var div = document.getElementById('div');

var listener = function(event){

}

div.addEventListener ('click', listener, false);

div.removeEventListener('click', listener, false);

// 2.2 이벤트 순서

//마지막 인자 false 는 버블링 이벤트 핸들러 방식을 사용한다는 의미다.
button.addEventListener("click", function(){ /* ... */ }, false);

// 2.3 이벤트 취소
button.addEventListener("click", function(e){
    e.stopPropagation();
    /* */
}, false);

FormData.addEventListener("submit", function(e){
    /* */
    return confirm("Are you super sure?");
}, false);