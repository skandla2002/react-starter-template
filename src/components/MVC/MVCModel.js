import { AssertionError } from "assert";

// Anti
var user = users['송해교'];
destroyUser(user);

// correct
var user = User.find('송해교');
user.destroy();

// View
//helper.js 와 MVCModel.html 참고

// Controller
var Controller = {};
// 익명함수로 범위를 캡슐화
(Controller.users = function($){
    var nameClick = function(){
        /* */
    };
    // 페이지를 로드할때 이벤트 리스너를 추가한다.
    $(function(){
        $('#view .name').click(nameClick);
    });

})(jQuery);

// Module And Class

var Person = function(name){
    this.name = name;
}

// 인스턴스 생성
var alice = new Person('송해교');

// 인스턴스 확인
assert(alice instanceof Person);

// Anti
Person('원빈'); //=> undefined

var Class = function(){
    var Klass = function(){
        this.init.apply(this, arguments);
    };
    Klass.prototype.init = function(){};
    return Klass;
}

var Person = new Class;
Person.prototype.init = function(){
    // Person을 인스턴스화 할때 호출됨
}

// 사용 방법
var person = new Person;

// 1.5 Class 함수 추가하기

// 직접 추가
Person.find = function(id){

}

var person = Person.find(1);

// prototype
Person.prototype.breath = function(){

}
var person = new Person;
person.breath();

// prototype을 fn으로 간결
Person.fn = Person.prototype;
Person.fn.run = function(){

}

// 1.6 클래스 라이브러리에 메소드 추가하기
var Person = new Class;
// 클래스에 직접 정적 함수를 추가했다.
Person.find = function(id){

}
//정적 함수를 직접 호출할 수 있다.
var person = Person.find(1);


// 프로토타입에 설정한 프로퍼티는 인스턴스에서도 이용할 수 있다.
var Person = new Class;

// 프로토타입에 추가한 인스턴스 함수
Person.prototype.save = function(){

}

//인스턴스에서 프로토타입에 추가한 함수를 호출할 수 있다.
var person = new Person;
person.save();

// 좀더 세련되게 extend / include 사용
var Class = function(){
    var klass = function(){
        this.init.apply(this, arguments);
    };

    klass.prototype.init = function(){};

    // 프로토타입의 단축형
    klass.fn = klass.prototype;

    //클래스의 단축형
    klass.fn.parent = klass;

    //클래스 프로퍼티 추가
    klass.extend = function(obj){
        var extended = obj.extended;
        for(var i in obj){
            klass[i] = obj[i];
        }
        if(extende) extended(klass);
    };

    //인스턴스 프로퍼티 추가
    klass.include = function(obj){
        var included = obj.included;
        for(var i in obj){
            klass.fn[i] = obj[i];
        }
        if(included) included(klass);
    };

    return klass;
};

// 오브젝트의 모든 속성을 탐색해서 각각의 속성을 클래스로 직접 복사한다.

var Person = new Class;
Person.extend({
    find: function(id){ /*  */},
    exists: function(id){ /* */}
});
var person = Person.find(1);

var Person = new Class;
Person.include({
    save: function(id){},
    destroy: function(id){}
});
var person = new Person;
person.save();

// 콜백 지원
Person.extend({
    extended: function(klass){
        console.log(klss, "가 확장됐다.");
    }
});

// 상속대신 모듈
var ORMModule = {
    save: function(){
        // 공유 함수
    }
};
var Person = new Class;
var Asset = new Class;

Person.include(ORMModule);
Asset.include(ORMModule);

// 1.7 클래스 상속과 프로토 타입 사용
var Animal = function(){};

Animal.prototype.breath = function(){
    console.log('breath');
}

var Dog = function(){};

// Dog는 Animal을 상속한다.
Dog.prototype = new Animal;

Dog.prototype.wag = function(){
    console.log('wag tail');
}

var dog = new Dog;
dog.wag();
dog.breath(); // 상속받은 properties

//1.8 클래스 라이브러리에 상속 기능 추가하기

var Class = function(parent){
    var klass = function(){
        this.init.apply(this, arguments);
    };

    // klass의 프로토타입을 바꾼다.
    if(parent){
        var subclass = function(){};
        subclass.prototype = parent.prototype;
        klass.prototype = new subclass;
    }

    klass.prototype.init = function(){}

    // 단축형
    klass.fn = klass.prototype;
    klass.fn.parent = klass;
    klass._super = klass.__prototype__;

    /* include/extend 코드 */

    return klass;

}

// 부모 클래스를 Class 에 전달해서 간단한 상속 수행
var Animal = new Class;
Animal.include({
    breath: function(){
        console.log('breath');
    }
})

var Cat = new Class(Animal);

// 사용법 
var tommy = new Cat;
tommy.breath();