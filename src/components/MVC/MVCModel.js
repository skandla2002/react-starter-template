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

// 1.9 함수 호출
// => 컨텍스트 변경(상태를 공유, 특히 이벤트 콜백에서)
function.apply(this, [1,2,3]);

function.call(this,1,2,3);

$('.clicky').click(function(){
    // 'this'는 엘리먼트를 가리킨다.
    $(this).hide();
});

$('p').each(function(){
    // 'this'는 반복하는 항목 가운데 현재 항목을 가리킨다.
    $(this).remove();
});

// As-Is
var clicky = {
    wasClicked: function(){
        /*  */
    },
    addListeners: function(){
        var sellf = this;
        $('.clicky').click(function(){
            self.wasClicked()
        });
    }
};

clicky.addListeners();

// To-Be
// apply를 다른 익명 함수내의 콜백을 감싸면 더 깔끔한 코드를 만들 수 있다.
var proxy = function(func, thisObject){
    return(function(){
        return func.apply(thisObject, arguments);
    });
};

var clicky = {
    wasClicked: function(){
        /*  */
    },

    addListeners: function(){
        var self = this;
        $('.clicky').click(proxy(this.wasClicked, this));
    }
};

$('.clicky').click($.proxy(function(){ /* */ },this));

// 위임(델리게이트) 기능
var App = {
    log: function(){
        if(typeof console == 'undefined') return;

        //인자를 적절한 배열로 바꾼다.
        var args = jQuery.makeArray(arguments);

        //새인자를 추가한다.
        args.unshift('(App)');

        //console에 위임한다.
        console.log.apply(console, args);
    }
};

// 1.10 클래스 라이브러리에서 범위 조절
var Class = function(parent){
    var dlass = function(){
        this.init.apply(this, arguments);
    };
    klass.prototype.init = function(){};
    klass.fn = klass.prototype;

    // 프록시 함수 추가
    klass.proxy = function(func){
        var self = this;
        return (function(){
            return func.apply(self, arguments);
        });
    }

    // 인스턴스에도 함수를 추가
    klass.fn.proxy = klass.proxy;
    return klass;
};

// proxy() 함수로 범위 정확히 지정 가능
var Button = new Class;
Button.include({
    init: function(elelment){
        this.element = jQuery(element);

        //클릭 함수를 대신한다.
        this.element.click(this.proxy(this.click));
    },
    click: function(){ /* */}
});

// click를 callback으로 감싸지 않으면 Button이 아닌 this.element 컨텍스트에서 
// click()함수가 호출되면서 온갖 문제가 발생한다.
// ES5에서는 bind 함수로 호출 범위 지정하는 기능 추가

Button.include({
    init: function(element){
        this.element = jQuery(element);

        // 클릭 함수를 바인드 한다.
        this.element.click(this.click.bind(this));
    },
    click: function(){ /* */}
});

// bind shim
if(!Function.prototype.bind){
    Function.prototype.bind = function(obj){
        var slice = [].clice,
            args = slice.call(arguments, 1),
            self = this,
            nop = function(){},
            bound = function(){
                return self.apply(this instanceof nop ? this : (obj || {}),
                args.concat*slice.call(arguments));
            };
        nop.prototype = self = prototype;
        bound.prototype = new nop();
        return bound;
    };
};
// bound 기능 없을때  Function의 프로토 타입을 덮어쓴다.

// 1.11 비공개 함수 추가하기
var Person = function(){};
(function(){
    var findById = function(){ /* */};
    Person.find = function(id){
        if(typeof id == "integer")
        return findById(id);
    };
})();

// 프로퍼티를 익명 함수로 감쌈, Person 변수를 전역 정의했으므로 어디서든 호출 가능
// 키워드 var 를 사용하면 전역 변수가 되므로 변수를 정의할 때 var은 절대 사용하지 않는다. 
// 전역 변수를 정의하고 싶다면 전역 영역에서 변수를 선언하거나 윈도우에서 프로퍼티로 선언한다.

(function(exports){
    var foo = "bar";
    // 변수 노출
    exports.foo = foo;
})(window);

assertEqual(foo, "bar");

//1.12 클래스 라이브러리

var Person = $.Class.create({
    //생성자
    initialize: function(name){
        this.name = name;
    }
});

// 클래스 상속하려면 클래스를 생성할때 클래스의 부모를 인자로 전달한다.
 var Student = $.Class.create(Person, {
     price: function(){ /* */}
 });

 var alex = new Student("알렉스");
 alex.pay();

 /// 클래스에 직접 프로퍼티 추가 가능
 Person.find = function(id){ /* */};
 //HJS 사용 가능
 var alex = new Student("알렉스");
 var bill = alex.clone();

 assert(alex.equal(bill));

//  <script src="http://maccman.github.com/spne/spine.js"></script>
//  <script>
     var Person = Spine.Class.create();
     Person.extend({
         find: function(){ /* */}
     });
     Person.include({
         init: function(atts){
             this.attributes = atts || {};
         }
     });
     var person = Person.init();
//  </script>