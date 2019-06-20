## 一、JavaScript基础

### 一、变量与变量声明

> JS的数据类型有7种，其中基本类型6种，分别是`Boolean`,`NUll`,`Undefined`,`Number`,`String`,`Symbol`（ECMAScript6新提出）;然后对象`Object`一种。
>
> 在JS中，我们通过`var`关键字即可声明一个局部变量：
>
> ```javascript
> var foo = 42;    // foo is a Number now
> var foo = "bar"; // foo is a String now`
> ```
>
> 变量声明是如此简单，但请**注意**，变量声明中一旦缺失`var`关键字，那么声明的变量就是全局变量！
>
> 这样相当危险，因为你不知道这个变量会不会覆盖/污染某个全局变量，比如在一个基于`jQuery`的页面中写一句`$ = 'whatever';`很可能造成程序崩溃。过多的全局变量会加大引起冲突的可能。

### 二、作用域

> 1.**全局变量**：声明在函数外部的变量（所有没有var直接赋值的变量都属于全局变量）
>
> 2.**局部变量**：声明在函数内部的变量（所有没有var直接赋值的变量都属于全局变量）
>
> JS中变量申明分显式申明和隐式申明:
>
> ````javascript
> vari=100;//显式申明 
> i=100;//隐式申明 
> ````
>
> 在函数中使用var关键字进行显式申明的变量是做为局部变量，而没有用var关键字，使用直接赋值方式声明的是全局变量。　　 
>
> 当我们使用访问一个没有声明的变量时，JS会报错。而当我们给一个没有声明的变量赋值时，JS不会报错，相反它会认为我们是要隐式申明一个全局变量，这一点一定要注意。

#### 1、全局作用域

> 最外层函数定义的变量拥有全局作用域，即对任何内部函数来说，都是可以访问的：
>
> ```javascript
> var outerVar = "outer";
> function fn(){
> 	console.log(outerVar);
> }
> fn();//result:outer
> ```

#### 2、局部作用域

> 和全局作用域相反，局部作用域一般只在固定的代码片段内可访问到，而对于函数外部是无法访问的，最常见的例如函数内部。
>
> `````` javascript
> function fn(){       
>     var innerVar = "inner";
> }
> fn();
> console.log(innerVar);// ReferenceError: innerVar is not defined
> ``````
>
> 函数内部声明变量的时候，一定要使用`var`命令。如果不用的话，实际上就是声明了一个全局变量！
>
> ``````javascript
> var scope = "global";
> function fn(){
>     console.log(scope);		//result:undefined
>     var scope = "local";
>     console.log(scope);		//result:local;
> }
> fn();
> ``````
>
> 第一个输出居然是`undefined`，原本以为它会访问外部的全局变量(`scope=”global”`)，但是并没有。这可以算是javascript的一个特点，**只要函数内定义了一个局部变量，函数在解析的时候都会将这个变量“提前声明”**：
>
> ``````javascript
> var scope = "global";
> function fn(){
>     var scope;		//提前声明了局部变量
>     console.log(scope);		//result:undefined
>     scope = "local";
>     console.log(scope);		//result:local;
> }
> fn();
> ``````
>
> 然而，也不能因此草率地将局部作用域定义为：用var声明的变量作用范围起止于花括号之间。 
>
> ES6之前javascript并没有所谓的块级作用域，
>
> javascript的作用域是相对函数而言的，可以称为**函数作用域**，
>
> ES6 可以使用 `let` 关键字或者 `const` 关键字来实现块级作用域。
>
> `let` 或 `const`声明的变量只在 `let` 或 `const`命令所在的代码块 {} 内有效，在 {} 之外不能访问。
>
> ``````javascript
> { 
>     let x = 2;
> }
> // 这里不能使用 x 变量
> ``````
>
> **let 关键字声明的变量，只在 let 命令所在的代码块 {} 内有效。**
>
> ``````javascript
> var x = 10;
> // 这里输出 x 为 10
> { 
>     let x = 2;
>     // 这里输出 x 为 2
> }
> // 这里输出 x 为 10
> ``````

#### 3、作用域链 

>https://www.cnblogs.com/mrzl/p/4415149.html
>
>在JavaScript中，函数也是对象，实际上，JavaScript里一切都是对象 。
>
>函数对象和其它对象一样，拥有可以通过代码访问的属性和一系列仅供JavaScript引擎访问的内部属性。
>
>其中一个内部属性是[[`Scope`]]，该内部属性包含了函数被创建的作用域中对象的集合，这个集合被称为**函数的作用域链**，它决定了哪些数据能被函数访问。
>
>当一个函数创建后，它实际上保存一个作用域链，并且作用域链会被创建此函数的作用域中可访问的数据对象填充。例：
>
>    ``````javascript
>    function fnc(){
>    var num =1;
>    alert(num);
>}
>fnc();
>``````
>
>在函数fnc创建时，它的作用域链中会填入一个全局对象，该全局对象包含了所有全局变量。

#### 4、执行环境



















