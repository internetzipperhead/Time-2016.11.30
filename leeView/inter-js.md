# js探寻

## Proxy 相比于 defineProperty 的优势

1. 数组变化也能监听到
2. 不需要深度遍历监听

## js函数高级

![高级函数包含的知识点](https://user-gold-cdn.xitu.io/2019/2/22/1691328a8afdf60b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
![一张图搞定原型链](https://user-gold-cdn.xitu.io/2019/2/22/1691328abae3da9c?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 探索js引擎工作

[cankao](http://www.cnblogs.com/onepixel/p/5090799.html)

几个相关的概念：执行环境，全局对象，执行环境，变量对象，活动对象，作用域，作用域链

🎈首先我们要明白一点，只有函数在执行的时候，函数的执行环境才会生成

```js
var x = 1;  //定义一个全局变量 x
function A(y){
   var x = 2;  //定义一个局部变量 x
   function B(z){ //定义一个内部函数 B
       console.log(x+y+z);
   }
   return B; //返回函数B的引用
}
var C = A(1); //执行A,返回B
C(1); //执行函数B，输出 4
```

1. 全局初始化
  * 创建一个全局对象（Global Object）
  * 构建一个执行环境栈（Execution COntext Stack），一个全局执行环境（Execution Context，EC）；将 `EC` 压入执行环境栈中。每个函数都有自己的执行环境，当执行一个函数时，该函数的执行环境就会被推入执行环境栈的顶部并获取执行权。当这个函数执行完毕，他的执行环境又从这个栈的顶部被删除，并把执行权还给之前的执行环境
  * 创建一个于`EC` 关联的全局变量对象（Variable Object）`VO`, 并把 `VO` 指向全局对象。

```js
ECStack = [   //执行环境栈
    EC(G) = {   //全局执行环境
        VO(G):{ //定义全局变量对象
            ... //包含全局对象原有的属性
            x = 1; //定义变量x
            A = function(){...}; //定义函数A
            A[[scope]] = this; //定义A的scope，并赋值为VO本身
        }
    }
];
```

2. 执行函数A
  * JS引擎会船舰函数A的执行环境`EC`，然后EC推入执行环境栈的顶部并获取执行权。
  * 创建函数A的作用域链`Scope Chain`，当执行环境被创建时，它的作用域链就初始化为 当前运行函数的 scope 多包涵的对象
  * js引擎会创建一个当前函数的活动对象（Activable Object，`AO`），AO 中包含了函数的 `形参，arguments对象，this对象，局部变量，内部函数的定义`，然后 AO 会被推入作用域链的顶端。
  * 在定义函数B的时候，JS引擎同样也会为B添加了一个scope属性,并将scope指向了定义函数B时所在的环境，定义函数B的环境就是A的活动对象AO， 而AO位于链表的前端，由于链表具有首尾相连的特点，因此函数B的scope指向了A的整个作用域链

```js 【A 图】
ECStack = [   //执行环境栈
    EC(A) = {   //A的执行环境
        [scope]:VO(G), // ❗VO是全局变量对象
        AO(A) : { //创建函数A的活动对象
            y:1,
            x:2,  //定义局部变量x
            B:function(){...}, //定义函数B
            B[[scope]] = this; //this指代AO本身，而AO位于scopeChain的顶端，因此B[[scope]]指向整个作用域链
            arguments:[],//平时我们在函数中访问的arguments就是AO中的arguments
            this:window  //函数中的this指向调用者window对象
        },
        scopeChain:<AO(A),A[[scope]]>  //链表初始化为A[[scope]],然后再把AO加入该作用域链的顶端,此时A的作用域链：AO(A)->VO(G)
    },
    EC(G) = {   //全局执行环境
        VO(G):{ // ❗创建全局变量对象
            ... //包含全局对象原有的属性
            x = 1; //定义变量x
            A = function(){...}; //定义函数A
            A[[scope]] = this; //定义A的scope，A[[scope]] == VO(G)
        }
    }
];
```

3. 执行函数B
  * 创建函数B的执行环境 EC，然后 EC 推入执行环境栈的顶部并获取执行权。此时执行环境栈中有两个执行环境，分别是全局执行环境和函数B的执行环境
  * 创建函数B的作用域链，并初始化函数B的 Scope 所包含的对象，即包含了A的作用域链
  * 创建函数B的活动对象，并将B的形参 z，arguments对象，this对象 作为 AO 的属性

```js 【B 图】
ECStack = [   //执行环境栈
    EC(B) = {   //创建B的执行环境,并处于作用域链的顶端
        [scope]:AO(A), //指向函数A的作用域链,AO(A)->VO(G); 🎈[scope] 属性，我们可以理解为指针
        var AO(B) = { //创建函数B的活动对象
            z:1,
            arguments:[],
            this:window
        }
        scopeChain:<AO(B),B[[scope]]>  //链表初始化为B[[scope]],再将AO(B)加入链表表头，此时B的作用域链：AO(B)->AO(A)-VO(G)
    },                        ⬆  这里是两个中括号
    EC(A), //A的执行环境已经从栈顶被删除,
    EC(G) = {   //全局执行环境
        VO:{ //定义全局变量对象
            ... //包含全局对象原有的属性
            x = 1; //定义变量x
            A = function(){...}; //定义函数A
            A[[scope]] = this; //定义A的scope，A[[scope]] == VO(G)
        }
    }
]
```

当函数B执行“x+y+z”时，需要对x、y、z 三个标识符进行一一解析，解析过程遵守变量查找规则：先查找自己的活动对象中是否存在该属性，如果存在，则停止查找并返回；如果不存在，继续沿着其作用域链从顶端依次查找，直到找到为止，如果整个作用域链上都未找到该变量，则返回“undefined”。从上面的分析可以看出函数B的作用域链是这样的：

```js
AO(B)->AO(A)->VO(G)
```

4. 局部变量是如何被保存起来的

[如何编写高质量的代码](https://juejin.im/post/5c6bbf0f6fb9a049ba4224fd)

5. this

* this 为什么在运行时才能确定
  执行 A 函数时，只有 A 函数有 this 属性，执行 B 函数时，只有 B 函数有 this 属性，这也就证实了 this 只有在运行时才会存在。

* this 的指向真相
  A 函数调用的时候，属性 this 的属性是 window ，而 通过 var C = A(1) 调用 A 函数后，A 函数的执行环境已经 pop 出栈了。此时执行 C() 就是在执行 B 函数，EC(B) 已经在栈顶了，this 属性值是 window 全局变量

6. 作用域的本质

* 作用域的本质是链表中的一个节点
  - 看 A 图，执行 A 函数时，B 函数的作用域是创建 A 函数的活动对象 AO(A) 。作用域就是一个属性，一个属于 A函数的执行环境中的属性，它的名字叫做 [scope]
  - [scope] 指向的是一个函数活动对象，其实这里最核心的一点，就是大家要把这个函数对象当成一个作用域，但最好理解成一个链表节点

> PS: B 执行 B 函数时，只有 B 函数有 this 属性，这也就交叉证实了 this 只有在运行时才会存在。

7. 作用域链的本质

> 比较 A 图和 B 图的 scopeChain

* 作用域链的本质就是链表
  - 执行哪个函数，那链表就初始化为哪个函数的作用域，然后将该函数的 [scope] 放在表头，形成闭环链表，作用域链的查找，就是通过链表查找的，如果走了一圈还没找到，那就返回 undefined 。

8. 举一个例子

```js
function kun() {
  var result = []
  for (var i = 0; i < 10; i++) {
    result[i] = function() {
      return i
    }
  }
  return result
}

let r = kun()
r.forEach(fn => {
  console.log('fn',fn())
})
```

只有函数在执行的时候，函数的执行环境才会生成。那依据这个规则，我们可以知道在完成 r = kun() 的时候，kun 函数只执行了一次，生成了对应的 AO(kun)

```js
[scope]:VO(G)
AO(kun):{
  i = 10;
  kun = function(){...};
  kun[[scope]] = this;
}
```
这时，在执行 kun() 之后，i 的值已经是 10 了。OK ，下面最关键的一点要来了，请注意，kun 函数只执行了一次，也就意味着:
**在 kun 函数的 AO(kun) 中的 i 属性是 10 。**
kun 函数的作用域链如下：
```js
AO(kun) --> VO(G)
```
而且 kun 函数已经从栈顶被删除了，之只留下了 AO(kun).
这里的 AO(kun) 表示一个节点，这个节点有指针和数据，其中指针指向了 VO(G) ，数据就是 kun 函数的活动对象。
`result` 数组中的每一个函数其作用域都已经确定了，上面也提到过，`JS` 是静态作用域语言，其在程序声明阶段，所有的作用域都将确定。
那么 result 数组中每一个函数其作用域链都是如下：
```js
AO(result[i]) --> AO(kun) --> VO(G)
```
result 数组中的 10 个函数在声明后，总共拥有了 10 个链表(作用域链)，都是 AO(result[i]) --> AO(kun) --> VO(G) 这种形式，但是 10 个作用域链中的 AO(kun) 都是一样的

9. 另一个例子

```js
function kun() {
  var result = []
  for (var i = 0; i < 10; i++) {
    result[i] = (function(n) {
      return function() {
        return n
      }
    })(i)
  }
  return result
}

let r = kun()
r.forEach(fn => {
  console.log('fn', fn())
})
```

```js
ECSack = [
  EC(kun) = {
    [scope]: VO(G)
    AO(kun) = {
      i: 0,
      result[0] = function() {...// return i},
      arguments:[],
      this: window
    },
    scopeChain:<AO(kun), kun[[scope]]>
  },
  // .....
  EC(kun) = [
    [scope]: VO(G)
    AO(kun) = {
      i: 9,
      result[9] = function() {...// return i},
      arguments:[],
      this: window
    },
    scopeChain:<AO(kun), kun[[scope]]>
  ]
]
```
执行 result 数组中的 10 个函数时，走了 10 个不同的链表，同时每个链表的 AO(kun) 节点是不一样的。每个 AO(kun) 节点中的 i 值也是不一样的。