# inter-react

## 常用的react类库

1. redux-actions

使用简便

```js
const initialState = {
  list: tabList ? tabList.list : [],
  activeKey: tabList ? tabList.activeKey : '',
}

const tabListResult = handleActions({
  'request tab list'(state, action) {
    return { ...state, loading: false }
  },
  'update tab list'(state, action) {
    const data = action.payload
    const findList = state.list.find(tab => tab.key === data.key)
    const list = findList === undefined ? [...state.list, data] : state.list
    sessionStorage.setItem('tabList', JSON.stringify({ list, activeKey: data.key, loading: false }))
    return { list, activeKey: data.key, loading: false }
  },
  'update tab checked'(state, action) {
    const { activeKey } = action.payload;
    sessionStorage.setItem('tabList', JSON.stringify({ ...state, activeKey, loading: false }))
    return { ...state, activeKey, loading: false }
  },
  'delete tab from list'(state, action) {
    const { targetKey } = action.payload
    // 。。。
    return { list, activeKey, loading: false }
  },
}, initialState)
```

## 代码规范

REFER: https://github.com/lzbSun/react-native-coding-style

对于JSX的字符串属性使用双引号(")，其他情况下使用单引号

```js
// bad
<Foo bar='bar' />

// good
<Foo bar="bar" />

// bad
<Foo style={{ left: "20px" }} />

// good
<Foo style={{ left: '20px' }} />
```

### 对象结构

```js
const anakinSkywalker = 'Anakin Skywalker';
const lukeSkywalker = 'Luke Skywalker';

// bad
const obj = {
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  lukeSkywalker,
  episodeThree: 3,
  mayTheFourth: 4,
  anakinSkywalker,
};

// good
const obj = {
  lukeSkywalker,
  anakinSkywalker,
  episodeOne: 1,
  twoJediWalkIntoACantina: 2,
  episodeThree: 3,
  mayTheFourth: 4,
};
```

## react 和 vue 的本质区别

1.React严格上只针对MVC的view层,Vue则是MVVM模式

2.virtual DOM不一样,vue会跟踪每一个组件的依赖关系,不需要重新渲染整个组件树.

  而对于React而言,每当应用的状态被改变时,全部组件都会重新渲染,所以react中会需要shouldComponentUpdate这个生命周期函数方法来进行控制

3.组件写法不一样, React推荐的做法是 JSX + inline style, 也就是把HTML和CSS全都写进JavaScript了,即'all in js';

  Vue推荐的做法是webpack+vue-loader的单文件组件格式,即html,css,jd写在同一个文件;

4.数据绑定: vue实现了数据的双向绑定,react数据流动是单向的

5.state对象在react应用中不可变的,需要使用setState方法更新状态;

  在vue中,state对象不是必须的,数据由data属性在vue对象中管理；

react整体的思路就是函数式，所以推崇纯组件，数据不可变，单向数据流，当然需要双向的地方也可以做到，比如结合redux-form，而vue是基于可变数据的，支持双向绑定。react组件的扩展一般是通过高阶组件，而vue组件会使用mixin。vue内置了很多功能，而react做的很少，很多都是由社区来完成的，vue追求的是开发的简单，而react更在乎方式是否正确。

一、监听数据变化的实现原理不同

Vue 通过 getter/setter 以及一些函数的劫持，能精确知道数据变化，不需要特别的优化就能达到很好的性能。
React 默认是通过比较引用的方式进行的，如果不优化（PureComponent/shouldComponentUpdate）可能导致大量不必要的VDOM的重新渲染。
为什么 React 不精确监听数据变化呢？这是因为 Vue 和 React 设计理念上的区别，Vue 使用的是可变数据，而React更强调数据的不可变。所以应该说没有好坏之分，Vue更加简单，而React构建大型应用的时候更加鲁棒。因为一般都会用一个数据层的框架比如 Vuex 和 Redux

二、数据流的不同

Vue中默认是支持双向绑定的
然而 React 从诞生之初就不支持双向绑定，React一直提倡的是单向数据流，他称之为 onChange/setState()模式。

三、HoC 和 mixins

在 Vue 中我们组合不同功能的方式是通过 mixin，而在React中我们通过 HoC (高阶组件）。
React 最早也是使用 mixins 的，不过后来他们觉得这种方式对组件侵入太强会导致很多问题，就弃用了 mixinx 转而使用 HoC
高阶组件本质就是高阶函数，React 的组件是一个纯粹的函数，所以高阶函数对React来说非常简单。

但是Vue就不行了，Vue中组件是一个被包装的函数，并不简单的就是我们定义组件的时候传入的对象或者函数。比如我们定义的模板怎么被编译的？比如声明的props怎么接收到的？这些都是vue创建组件实例的时候隐式干的事。由于vue默默帮我们做了这么多事，所以我们自己如果直接把组件的声明包装一下，返回一个高阶组件，那么这个被包装的组件就无法正常工作了。

四、组件通信的区别

在Vue 中有三种方式可以实现组件通信：
1.父组件通过 props 向子组件传递数据或者回调，虽然可以传递回调，但是我们一般只传数据，而通过 事件的机制来处理子组件向父组件的通信
2.子组件通过 事件 向父组件发送消息
3.通过 V2.2.0 中新增的 provide/inject 来实现父组件向子组件注入数据，可以跨越多个层级。
4.另外有一些比如访问 $parent/$children等比较dirty的方式这里就不讲了。

在 React 中，也有对应的两种方式：
1.父组件通过 props 可以向子组件传递数据或者回调
2.可以通过 context 进行跨层级的通信，这其实和 provide/inject 起到的作用差不多。

可以看到，React 本身并不支持自定义事件，Vue中子组件向父组件传递消息有两种方式：事件和回调函数，而且Vue更倾向于使用事件。但是在 React 中我们都是使用回调函数的，这可能是他们二者最大的区别。

五、模板渲染方式的不同

在表层上， 模板的语法不同

React 是通过JSX渲染模板；
Vue是通过一种拓展的HTML语法进行渲染。

但其实这只是表面现象，毕竟React并不必须依赖JSX。

在深层上，模板的原理不同，这才是他们的本质区别：

React是在组件JS代码中，通过原生JS实现模板中的常见语法，比如插值，条件，循环等，都是通过JS语法实现的；
Vue是在和组件JS代码分离的单独的模板中，通过指令来实现的，比如条件语句就需要 v-if 来实现。

对这一点，我个人比较喜欢React的做法，因为他更加纯粹更加原生，而Vue的做法显得有些独特，会把HTML弄得很乱。
举个例子，说明React的好处：

react中render函数是支持闭包特性的，所以我们import的组件在render中可以直接调用。但是在Vue中，由于模板中使用的数据都必须挂在 this 上进行一次中转，所以我们import 一个组件完了之后，还需要在 components 中再声明下，这样显然是很奇怪但又不得不这样的做法。

六、Vuex 和 Redux 的区别

从表面上来说，store 注入和使用方式有一些区别。

在 Vuex 中，$store 被直接注入到了组件实例中，因此可以比较灵活的使用：

使用 dispatch 和 commit 提交更新；
通过 mapState 或者直接通过 this.$store 来读取数据。

在 Redux 中，我们每一个组件都需要显示的用 connect 把需要的 props 和 dispatch 连接起来。

另外 Vuex 更加灵活一些，组件中既可以 dispatch action 也可以 commit updates，而 Redux 中只能进行 dispatch，并不能直接调用 reducer 进行修改。

从实现原理上来说，最大的区别是两点：
1.Redux 使用的是不可变数据，而Vuex的数据是可变的。Redux每次都是用新的state替换旧的state，而Vuex是直接修改
2.Redux 在检测数据变化的时候，是通过 diff 的方式比较差异的，而Vuex其实和Vue的原理一样，是通过 getter/setter来比较的（如果看Vuex源码会知道，其实他内部直接创建一个Vue实例用来跟踪数据变化）

而这两点的区别，其实也是因为 React 和 Vue的设计理念上的区别。React更偏向于构建稳定大型的应用，非常的科班化。相比之下，Vue更偏向于简单迅速的解决问题，更灵活，不那么严格遵循条条框框。因此也会给人一种大型项目用React，小型项目用 Vue 的感觉。

## setReact

> 两种使用方式

第一种setstate（）格式  第一个参数是一个对象，第二个参数是一个回调函数，这个回调函数是在setstate执行完并页面渲染了之后再执行

setstate的第二种格式，接收一个回调函数，而不是一个对象，这个回调函数有两个参数，

```js
onChangeHandler () {
  this.setState((prevState) => {
    return {
      isActive: !prevState.isActive
    }
  }, () => {
    console.log(this.state.isActive)
  })
}
```

## hooks

REFER: https://github.com/dt-fe/weekly/blob/master/80.%E7%B2%BE%E8%AF%BB%E3%80%8A%E6%80%8E%E4%B9%88%E7%94%A8%20React%20Hooks%20%E9%80%A0%E8%BD%AE%E5%AD%90%E3%80%8B.md

### useMemo\useCallback、Memo

主要用于防止组件不必要的重复渲染

useMemo, useCallback 用法都是差不多的。都会在第一次渲染的时候执行，之后会在其依赖的变量发生改变时再次执行，并且两个hooks都会**返回缓存值**，
useMemo返回**缓存的变量**，useCallback返回**缓存的函数**

```js
const value = useMemo(fnM, [a])

const fnA = useCallback(fnB, [a])
```

💥
在使用 class component 进行开发的时候，我们可以使用 shouldComponentUpdate 来减少不必要的渲染，在使用 react hooks 后，如何实现这样的功能呢？
答案就是 React.memo和useMemo

REFER:
[react Hook之useMemo、useCallback及memo](https://juejin.im/post/5d8dd1d6f265da5b950a431c)
[react渲染性能](https://juejin.im/post/5d26fdb8f265da1b5e731dfe)

```js
// 子组件会有不必要渲染的例子
interface ChildProps {
    name: { name: string; color: string };
    onClick: Function;
}
const Child = ({ name, onClick}: ChildProps): JSX.Element => {
    console.log('子组件?')
    return(
        <>
            <div style={{ color: name.color }}>我是一个子组件，父级传过来的数据：{name.name}</div>
            <button onClick={onClick.bind(null, '新的子组件name')}>改变name</button>
        </>
    );
}
const ChildMemo = memo(Child);

const Page = (props) => {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('Child组件');

    return (
        <>
            <button onClick={(e) => { setCount(count+1) }}>加1</button>
            <p>count:{count}</p>
            <ChildMemo
                name={{ name, color: name.indexOf('name') !== -1 ? 'red' : 'green'}}
                onClick={ useCallback((newName: string) => setName(newName), []) }
            />
        </>
    )
}
```

更新属性name为对象类型，这时子组件还是一样的执行了，在父组件更新其他状态的情况下，子组件的name对象属性会一直发生重新渲染改变，从而导致一直执行。这也是不必要的性能浪费
解决这个问题，使用name的参数使用 useMemo，依赖于State.name数据的变化进行更新

```jsx
interface ChildProps {
    name: { name: string; color: string };
    onClick: Function;
}
const Child = ({ name, onClick}: ChildProps): JSX.Element => {
    console.log('子组件?')
    return(
        <>
            <div style={{ color: name.color }}>我是一个子组件，父级传过来的数据：{name.name}</div>
            <button onClick={onClick.bind(null, '新的子组件name')}>改变name</button>
        </>
    );
}
const ChildMemo = memo(Child);

const Page = (props) => {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('Child组件');

    return (
        <>
            <button onClick={(e) => { setCount(count+1) }}>加1</button>
            <p>count:{count}</p>
            <ChildMemo
                //使用useMemo，返回一个和原本一样的对象，第二个参数是依赖性，当name发生改变的时候，才产生一个新的对象
                name={
                    useMemo(()=>({
                        name,
                        color: name.indexOf('name') !== -1 ? 'red' : 'green'
                    }), [name])
                }
                onClick={ useCallback((newName: string) => setName(newName), []) }
                {/* useCallback((newName: string) => setName(newName),[]) */}
                {/* 这里使用了useCallback优化了传递给子组件的函数，只初始化一次这个函数，下次不产生新的函数
            />
        </>
    )
}
```

小结：
在子组件不需要父组件的值和函数的情况下，只需要使用memo函数包裹子组件即可。而在使用值和函数的情况，需要考虑有没有函数传递给子组件使用useCallback, 值有没有所依赖的依赖项而是用 useMemo，而不是盲目使用这些hooks。

### 修改页面 title

```js
useDocumentTitle("个人中心")

function useDocumentTitle(title) {
  useEffect(
    () => {
      document.title = title;
      return () => (document.title = "前端精读");
    },
    [title]
  );
}
```

### 监听页面大小变化，网络是否断开

```js
const windowSize = useWindowSize();
return <div>页面高度：{windowSize.innerWidth}</div>;

function useWindowSize() {
  let [windowSize, setWindowSize] = useState(getSize());

  function handleResize() {
    setWindowSize(getSize());
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
}

function getSize() {
  return {
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
    outerHeight: window.outerHeight,
    outerWidth: window.outerWidth
  };
}
```

### 将更新与动作解耦

利用 useEffect 的兄弟 useReducer 函数，将更新与动作解耦就可以了：

```js
const [state, dispatch] = useReducer(reducer, initialState);
const { count, step } = state;

useEffect(() => {
  const id = setInterval(() => {
    dispatch({ type: "tick" }); // Instead of setCount(c => c + step);
  }, 1000);
  return () => clearInterval(id);
}, [dispatch]);
```

这就是一个局部 “Redux”，由于更新变成了 dispatch({ type: "tick" }) 所以不管更新时需要依赖多少变量，在调用更新的动作里都不需要依赖任何变量。 具体更新操作在 reducer 函数里写就可以了

> Dan 也将 useReducer 比作 Hooks 的的金手指模式，因为这充分绕过了 Diff 机制，不过确实能解决痛点！

### 将 Function 挪到 Effect 里

在 “告诉 React 如何对比 Diff” 一章介绍了依赖的重要性，以及对 React 要诚实。那么如果函数定义不在 useEffect 函数体内，不仅可能会遗漏依赖，而且 eslint 插件也无法帮助你自动收集依赖。

**如果非要把 Function 写在 Effect 外面呢？**
如果非要这么做，就用 useCallback 吧！

```js
function Parent() {
  const [query, setQuery] = useState("react");

  // ✅ Preserves identity until query changes
  const fetchData = useCallback(() => {
    const url = "https://hn.algolia.com/api/v1/search?query=" + query;
    // ... Fetch data and return it ...
  }, [query]); // ✅ Callback deps are OK

  return <Child fetchData={fetchData} />;
}

function Child({ fetchData }) {
  let [data, setData] = useState(null);

  useEffect(() => {
    fetchData().then(setData);
  }, [fetchData]); // ✅ Effect deps are OK

  // ...
}
```

由于函数也具有 Capture Value 特性，经过 useCallback 包装过的函数可以当作普通变量作为 useEffect 的依赖。
useCallback 做的事情，就是在其依赖变化时，返回一个新的函数引用，触发 useEffect 的依赖变化，并激活其重新执行。

### 模拟生命周期

**componentDidMount**
效果：通过 useMount 拿到 mount 周期才执行的回调函数。
实现：componentDidMount 等价于 useEffect 的回调（仅执行一次时），因此直接把回调函数抛出来即可。

```js
useMount(() => {
  // quite similar to `componentDidMount`
});

useEffect(() => void fn(), []);
```

**componentWillUnmount**
效果：通过 useUnmount 拿到 unmount 周期才执行的回调函数。
实现：componentWillUnmount 等价于 useEffect 的回调函数返回值（仅执行一次时），因此直接把回调函数返回值抛出来即可

```js
useUnmount(() => {
  // quite similar to `componentWillUnmount`
});

useEffect(() => fn, []);
```

**componentDidUpdate**
效果：通过 useUpdate 拿到 didUpdate 周期才执行的回调函数。
实现：componentDidUpdate 等价于 useMount 的逻辑每次执行，除了初始化第一次。因此采用 mouting flag（判断初始状态）+ 不加限制参数确保每次 rerender 都会执行即可。

```js
useUpdate(() => {
  // quite similar to `componentDidUpdate`
});

const mounting = useRef(true);
useEffect(() => {
  if (mounting.current) {
    mounting.current = false;
  } else {
    fn();
  }
});
```

**Force Update**
效果：这个最有意思了，我希望拿到一个函数 update，每次调用就强制刷新当前组件。
实现：我们知道 useState 下标为 1 的项是用来更新数据的，而且就算数据没有变化，调用了也会刷新组件，所以我们可以把返回一个没有修改数值的 setValue，这样它的功能就仅剩下刷新组件了。

```js
const update = useUpdate();

const useUpdate = () => useState(0)[1];
```

**isMounted**
效果：通过 useIsMounted 拿到 isMounted 状态。
实现：看到这里的话，应该已经很熟悉这个套路了，useEffect 第一次调用时赋值为 true，组件销毁时返回 false，注意这里可以加第二个参数为空数组来优化性能。

```js
const isMounted = useIsMounted();

const [isMount, setIsMount] = useState(false);
useEffect(() => {
  if (!isMount) {
    setIsMount(true);
  }
  return () => setIsMount(false);
}, []);
return isMount;
```

### 存数据

**全局 Store**
效果：通过 createStore 创建一个全局 Store，再通过 StoreProvider 将 store 注入到子组件的 context 中，最终通过两个 Hooks 进行获取与操作：useStore 与 useAction：

REFER: https://github.com/ctrlplusb/easy-peasy

### 利用 useState 创建 Redux

Redux的精髓就是 reducer，而利用 react hooks 可以轻松创建一个 redux 机制

```js
function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState)

  function dispatch(action) {
    const nextState = reducer(state, action)
    setState(nextState)
  }

  retrun [state, dispatch]
}
```

 TIP: 竟然是这样地简洁

 ```js
// 一个action
function useTodos() {
  const [todos, dispatch] = useReducer(todosRecuder, [])

  function handleAddClick(text) {
    dispatch({ type: 'add', text })
  }

  return [todos, { handleAddClick }]
}

function TodosUI() {
  const [todos, actions] = useTodos()

  return (
    <div>
    {
      todos.map((todo, index) => {
        <div>{ todo.text }</div>
      })
      <button onClick={actions.handleAddClickshenme}>Add Tofo</button>
    }
    </div>
  )
}
 ```

### useEffect

useEffect是处理副作用的，其执行时机在 **每次render渲染完毕后** ，换句话说就是每次渲染都会执行，只是实际在真是 DOM 操作完毕后。

需要注意的是，useEffect 也随着每次渲染而不同，**同一个组件不同渲染之间，useEffect 内 闭包环境完全独立**。

就是 useEffect 的第二个参数，dependences。dependences 这个参数定义了 useEffect 的依赖，在新的渲染中，只要所有依赖项的引用都不发生变化，useEffect 就不会被执行，且当依赖项为 [] 时，useEffect 仅在初始化执行一次，后续的 Rerender 永远也不会被执行。

**尽量将函数写在 useEffect 内部**：
为了避免遗漏依赖，必须将函数写在 useEffect 内部。这样才能通过一些插件静态分析补齐依赖

```js
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    function getFetchUrl() {
      return "https://v?query=" + count;
    }

    getFetchUrl();
  }, [count]);

  return <h1>{count}</h1>;
}
```

getFetchUrl 这个函数依赖了count，而如果将这个函数定义在 useEffect 外部，无论是机器还是人眼都很难看出 useEffect 的依赖包含了 count。

### useCallback

> 如果非要把 Function 写在 Effect 外面

有点像 vue 里面的 computed

**useCallback 比 componentDidUpdate 更好用**。

```js
function Parent() {
  const [query, setQuery] = useState('react')

  const fetchData = useCallback(() => {
    const url = 'xxx' + query
    // ... fetch data and return it
  }, [query])

  return <Child fetchData={fetchData} />
}

function Child({ fetchData }) {
  let [data, setData] = useData(null)

  useEffect(() => {
    fetchData().then(setData)
  }, [fetchData]) // Effect deps are ok

  /// ...
}
```

 TIP: 由于函数也具有 `Capture Value` 特性，经过 `useCallback` 包装过的函数可以当作**普通变量**作为 useEffect 的依赖， useCallback 做的事情
 就是在其依赖变化时，返回一个新的函数，出发 useEffect 的依赖变化，并激活其重新执行

 利用 useCallback 封装的取数函数，可以直接作为依赖传入 useEffect， useEffect 只要关心取数函数是否变化，而**取数参数**的变化在 useCallback 时关心，做到 依赖不丢，逻辑内聚，从而更加容易维护

### useMemo

> 用 useMemo 做局部 PureRender

使用useMemo方法，避免无用方法的调用

```js
function Button({ name, children }) {
  function changeName(name) {
    console.log('11')
    return name + '改变name的方法'
  }

const otherName =  useMemo(()=>changeName(name),[name]) // -依赖 name 值得变化，只有变化的时候才去调用该方法，避免性能的损耗
  return (
      <div>
        <div>{otherName}</div>
        <div>{children}</div>
      </div>
  )
}

作者：DoJustForlove
链接：https://juejin.im/post/5c9d7968f265da610b3a2153
```

### useRef

通过 useRef 创建的对象，其值只有一份，而且在所有 Rerender 之间共享

```js
function Counter() {
  const count = useRef()

  const log = () => {
    count.current++
    setTimeout(() => {
      console.log(count.current)
    }, 3000)
  }

  return (
    <div>
      <p>you click {count.current} times</p>
      <button onClick={log}>Click me</button>
    </div>
  )
}
```

对 count.current 赋值或者读取，读到的永远是其最新值，而与渲染闭包无关

可以自定义一下上面的逻辑。简化操作

```js
function useCurrentValue(value) {
  const ref = useRef(0)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref
}
```

```js
function Counter() {
  const [count, setCount] = useState(0);
  const currentCount = useCurrentValue(count);  <---------只要理解这个自定义的 hooks 就可以了。代码清爽很多

  const log = () => {
    setCount(count + 1);
    setTimeout(() => {
      console.log(currentCount.current);
    }, 3000);
  };

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={log}>Click me</button>
    </div>
  );
}

```

### useDebounce

很厉害的封装

```js
import { useState } from 'react'

function useDebounce(value, delay) {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay]) // only re-call effect if value or delay changes

  return debounceValue
}
```

使用

```js
const App:React.FC = ({ text }) => {
  // 无论 text 变化多快，textDebounce 最多 1 秒修改一次
  const textDebounce = useDebounce(text, 1000)

  return useMemo(() => {
    // 使用 textDebounce, 但渲染速度很慢的一堆代码
  }, [textDebounce])
}
```

使用 textDebounce 替代 text 可以将渲染频率控制在我们指定的范围内

## redux

### mapDispatchToProps

> connect 的第二个参数是 mapDispatchToProps，它的功能是，用来建立 UI 组件的参数到store.dispatch方法的映射。也就是说，它定义了哪些用户的操作应该当作 Action，传给 Store。

如果mapDispatchToProps是一个对象，它的每个键名也是对应 UI 组件的同名参数，`键值应该是一个函数`，会被当作 Action creator ，返回的 Action 会由 Redux发出

```js
const mapDispatchToProps = (dispatch, ownProps) => {
   return {
       onJudge: (data)=>{
           dispatch({ type: "LOGIN", data });
       }
   }
}
```

如果mapDispatchToProps是一个函数，会得到dispatch和ownProps（容器组件的props对象）两个参数

```js
const mapDispatchToProps = (
  dispatch,
  ownProps
) => {
  return {
    onClick: () => {
      dispatch({
        type: 'LOGIN',
        filter: ownProps.filter
      });
    }
  };
}
```

如果 mapDispatchToProps 是一个对象，她的每一个键名也是对应 UI 组件的同名参数，`键值应该是一个函数`(就是不能简单的就是一个包含 type 的对象)，
**会被当作 Action creator**，`返回的 action 会由 Redux 自动发出`

上面的 mapDispatchToProps 写成对象就是下面

```js
const mapDispatchToProps = {
  onClick: (filter) => {
    type: 'LOGIN,
    filter: filter
  }
}
```

所以，我们可以看到这样的简单写法，将 action 直接应用到 mapDispatchToProps 中

```js
import { connect } from 'react-redux'
import { toggleTodo } from '../redux/actions'

const Todo = //... 实现的组件

export default connect(
  null,
  { toggleTodo }
)(Todo)
```

这里的第二个参数就是使用一个 对象 的方式去传递 mapDispatchToProps 参数

**注意**：
1、即使 connect 什么参数也不传，被包装的组件也会接收到 dispatch 属性. 只是 store 改变时不重新渲染
2、如果提供了mapDispatchToProps，组件将不再接收到默认的dispatch。但你可以通过在mapDispatchToProps的return中添加dispatch把它重新注入你的组件。多数情况下，你不需要这么做。

```js
connect()(TodoList)
```

小结：
mapDispatchToProps 参数有两种形式：函数式自定义化程度更高，对象形式更简单

* 函数式，更高自由度，能够访问 dispatch 和可选择的 ownProps
* 对象式，更声明式，更易于使用

REFER: [react-redux](https://segmentfault.com/a/1190000017064759?utm_source=tag-newest)

### 使用 immutable

```js
import * as pro from './action-type';
import Immutable from 'immutable';

let defaultState = {
  /**
   * 商品数据
   * @type {Array}
   * example: [{
   *    product_id: 1, 商品ID
   *    product_name: "PaiBot（2G/32G)", 商品名称
   *    product_price: 2999, 商品价格
   *    commission: 200, 佣金
   *    selectStatus: false, 是否选择
   *    selectNum: 0, 选择数量
   * }]
   */
  dataList: [],
}

export const proData = (state = defaultState, action) => {
  let imuDataList;
  let imuItem;
  switch(action.type){
    case pro.GETPRODUCTION:
      return {...state, ...action}
    case pro.TOGGLESELECT:
      //避免引用类型数据，使用immutable进行数据转换
      imuDataList = Immutable.List(state.dataList);
      imuItem = Immutable.Map(state.dataList[action.index]);
      imuItem = imuItem.set('selectStatus', !imuItem.get('selectStatus'));
      imuDataList = imuDataList.set(action.index, imuItem);
      // redux必须返回一个新的state
      return {...state, ...{dataList: imuDataList.toJS()}};
    case pro.EDITPRODUCTION:
      //避免引用类型数据，使用immutable进行数据转换
      imuDataList = Immutable.List(state.dataList);
      imuItem = Immutable.Map(state.dataList[action.index]);
      imuItem = imuItem.set('selectNum', action.selectNum);
      imuDataList = imuDataList.set(action.index, imuItem);
      // redux必须返回一个新的state
      return {...state, ...{dataList: imuDataList.toJS()}};
    // 清空数据
    case pro.CLEARSELECTED:
      imuDataList = Immutable.fromJS(state.dataList);
      for (let i = 0; i < state.dataList.length; i++) {
        imuDataList = imuDataList.update(i, item => {
          item = item.set('selectStatus', false);
          item = item.set('selectNum', 0);
          return item
        })
      }
      return {...state, ...{dataList: imuDataList.toJS()}};
    default:
      return state;
  }
}
```

### 使用 thunk 进行异步获取数据

💥这里添加一点理解：

最原始的 dispatch 方法，接收到对象 action 后会传递给 store，这就是没有中间件的情况

对 dispatch 方法做一个升级后，也就是使用中间件时，再调用 dispatch 方法，如果给 dispatch 传递的仍然是个对象，dispatch 就会把这个对象传给 store，跟之前的方法没有任何区别；
但是如果传递的是个函数，就不会直接传递给 store 了，会让这个函数先执行，然后执行完之后再调用 store，这个函数再去调用 store
dispatch 方法会根据参数的不同，执行不同的事情，如果是对象，就直接传给 store，如果时函数，那就直接把函数执行结束
所以 redux 的中间件原理很简单，就是对 store 的dispatch 方法做一个升级，既可以接收对象，又可以接收函数了。

```js
import * as pro from './action-type';
import API from '@/api/api';

// 初始化获取商品数据，保存至redux
export const getProData = () => {
  // 返回函数，异步dispatch
  return async dispatch => {
    try{
      let result = await API.getProduction();
      result.map(item => {
        item.selectStatus = true;
        item.selectNum = 0;
        return item;
      })
      dispatch({
        type: pro.GETPRODUCTION,
        dataList: result,
      })
    }catch(err){
      console.error(err);
    }
  }
}


// 配合 thunk 使用

import {createStore, combineReducers, applyMiddleware} from 'redux';
import * as home from './home/reducer';
import * as production from './production/reducer';
import thunk from 'redux-thunk';

let store = createStore(
  combineReducers({...home, ...production}),
  applyMiddleware(thunk)    <---- 这里使用中间件❗❗❗
);

export default store;
```

## react-router

### 子路由在父路由下的配置使用【比较有意思】

> 需要使用 Redirect 在父路由下面进行重定向

```js
  render() {
    return (
      <main className="common-con-top">
        <PublicHeader title='记录' />
        <section className="record-nav-con">
          <nav className="record-nav">
            <NavLink to={`${this.props.match.path}/passed`} className="nav-link">已通过</NavLink>
            <NavLink to={`${this.props.match.path}/audited`} className="nav-link">待审核</NavLink>
            <NavLink to={`${this.props.match.path}/failed`} className="nav-link">未通过</NavLink>
          </nav>
          <i className="nav-flag-bar" style={{left: this.state.flagBarPos}}></i>
        </section>
        {/* 子路由在父级配置，react-router4新特性，更加灵活 */}
        <Switch>
          <Route path={`${this.props.match.path}/:type`} component={RecordList} />
          <Redirect from={`${this.props.match.path}`} to={`${this.props.match.path}/passed`} exact component={RecordList} />
        </Switch>
      </main>
    );
  }
}

```

### React-Router 4.0 withRouter作用

1、**目的就是让被修饰的组件可以从属性中获取history,location,match**
路由组件可以直接获取这些属性，而非路由组件就必须通过withRouter修饰后才能获取这些属性了

```js
<Route path='/' component={App}/>
```

App组件就可以直接获取路由中这些属性了，但是，如果App组件中如果有一个子组件Foo，那么Foo就不能直接获取路由中的属性了，必须通过withRouter修饰后才能获取到。

2、**withRouter是专门用来处理数据更新问题的**
在使用一些redux的的connect()或者mobx的inject()的组件中，如果依赖于路由的更新要重新渲染，会出现路由更新了但是组件没有重新渲染的情况
这是因为redux和mobx的这些连接方法会修改组件的shouldComponentUpdate

在使用`withRouter`解决更新问题的时候，一定要`保证withRouter在最外层`，比如 `withRouter(connect(Component))`

### 路由中组件按需加载的方案

> react-loadable

1、代码拆分 spliting
2、避免组件加载闪烁。 Loading 组件
3、预加载。preload 属性

```jsx
import Loadable from 'react-loadable';
import Loading from './Loading';

const LoadableComponent = Loadable({
  loader: () => import('./Dashboard'),
  loading: Loading,
})

export default class LoadableDashboard extends React.Component {
  render() {
    return <LoadableComponent />;
  }
}
```

### react-router5

1、history

> history is mutable

```js
length - (number) The number of entries in the history stack
action - (string) The current action (PUSH, REPLACE, or POP)
location - (object) The current location. May have the following
    pathname - (string) The path of the URL
    search - (string) The URL query string
    hash - (string) The URL hash fragment
    state - (object) location-specific state that was provided to e.g. push(path, state) when this location was pushed onto the stack. Only available in browser and memory history.
push(path, [state]) - (function) Pushes a new entry onto the history stack
replace(path, [state]) - (function) Replaces the current entry on the history stack
go(n) - (function) Moves the pointer in the history stack by n entries
goBack() - (function) Equivalent to go(-1)
goForward() - (function) Equivalent to go(1)
block(prompt) - (function) Prevents navigation (see the history docs)
```

2、location

Router 会在一下几个地方提供这个属性

```js
Route component as this.props.location
Route render as ({ location }) => ()
Route children as ({ location }) => ()
withRouter as this.props.location
```

同时，我们也可以在这些地方使用location

```js
Web Link to
Native Link to
Redirect to
history.push
history.replace

// usually all you need
<Link to="/somewhere"/>

// but you can use a location instead
const location = {
  pathname: '/somewhere',
  state: { fromDashboard: true }
}

<Link to={location}/>
<Redirect to={location}/>
history.push(location)
history.replace(location)
```

3、match

match对象包含以下几个属性

```js
params - (object) Key/value pairs parsed from the URL corresponding to the dynamic segments of the path
isExact - (boolean) true if the entire URL was matched (no trailing characters)
path - (string) The path pattern used to match. Useful for building nested <Route>s
url - (string) The matched portion of the URL. Useful for building nested <Link>s
```

我们可以在这几个地方使用或者获得 match 这个属性

```js
Route component as this.props.match
Route render as ({ match }) => ()
Route children as ({ match }) => ()
withRouter as this.props.match
matchPath as the return value
```

当然，match 也有可能是 null 的情况。这是就需要做一些容错处理

4、matchPath

主要用来解析当前路由，获取是否匹配的一个对象
第一个参数是 pathname
第二个参数是 props
  path
  strict // optional, defaults to false
  exact // optional, defaults to false

```js 例子
import { matchPath } from "react-router";

const match = matchPath("/users/123", {
  path: "/users/:id",
  exact: true,
  strict: false
});

// 结果

 {
   isExact: true
   params: {
       id: "123"
   }
   path: "/users/:id"
   url: "/users/123"
 }
```

如果没有匹配到，直接返回一个null

```js
matchPath("/users", {
  path: "/users/:id",
  exact: true,
  strict: true
});

//  null
```

5、Link

常用的一个组件.下面是几个常用的使用方法
to后面可以跟几个属性
  string
  object 类似 loaction 的一个对象
  function

```js
<Link to="/about">About</Link>
<Link to="/courses?sort=name" />

<Link
  to={{
    pathname: "/courses",
    search: "?sort=name",
    hash: "#the-hash",
    state: { fromDashboard: true }
  }}
/>

<Link to={location => ({ ...location, pathname: "/courses" })} />

<Link to={location => `${location.pathname}?sort=name`} />

<Link to="/courses" replace />

<Link
  to="/"
  innerRef={node => {
    // `node` refers to the mounted DOM element
    // or null when unmounted
  }}
/>

let anchorRef = React.createRef()

<Link to="/" innerRef={anchorRef} />
```

6、NavLink

有一个值得关注的属性 activeClassName

```js
<NavLink to="/faq" activeClassName="selected">
  FAQs
</NavLink>

<NavLink
  to="/faq"
  activeStyle={{
    fontWeight: "bold",
    color: "red"
  }}
>
  FAQs
</NavLink>

// 可以更加灵活的判断是否是激活状态
<NavLink
  to="/events/123"
  isActive={(match, location) => {
    if (!match) {
      return false;
    }

    // only consider an event active if its event id is an odd number
    const eventID = parseInt(match.params.eventID);
    return !isNaN(eventID) && eventID % 2 === 1;
  }}
>
  Event 123
</NavLink>
```

7、Redirect

重点关注这个属性的 from 和 to 属性

```js
<Route exact path="/">
  {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
</Route>

<Redirect to="/somewhere/else" />

<Redirect
  to={{
    pathname: "/login",
    search: "?utm=your+face",
    state: { referrer: currentLocation }
  }}
/>

// 默认是repalce，这里可以改为 push 方式
<Redirect push to="/somewhere/else" />

<Switch>
  <Redirect from='/old-path' to='/new-path' />
  <Route path='/new-path'>
    <Place />
  </Route>
</Switch>

// Redirect with matched parameters
<Switch>
  <Redirect from='/users/:id' to='/users/profile/:id'/>
  <Route path='/users/profile/:id'>
    <Profile />
  </Route>
</Switch>
```

## Immutable.js 的常用API

### fromJS()

> 将一个js数据转换为Immutable类型的数据。fromJS(value, converter) 第二个参数可不填，默认情况会将数组准换为List类型，将对象转换为Map类型，其余不做操作

```js
const obj = Immutable.fromJS({a:'123',b:'234'},function (key, value, path) {
        console.log(key, value, path)
        return isIndexed(value) ? value.toList() : value.toOrderedMap())
    })
```

### toJS()

> 将一个Immutable数据转换为js类型的数据。value.toJS()

### is()

> 对两个对象进行比较。is(map1, map2).和js中对象的比较不同，在js中比较两个对象比较的是地址，但是在Immutable中比较的是这个对象hashCode和valueOf，只要两个对象的hashCode相等，值就是相同的，避免了深度遍历，提高了性能

```js
import { Map, is } from 'immutable'
const map1 = Map({ a: 1, b: 1, c: 1 })
const map2 = Map({ a: 1, b: 1, c: 1 })
map1 === map2   //false
Object.is(map1, map2) // false
is(map1, map2) // true
```

### List() 和 Map()

> 用来创建一个新的List/Map对象

```js
//List
Immutable.List(); // 空List
Immutable.List([1, 2]);

//Map
Immutable.Map(); // 空Map
Immutable.Map({ a: '1', b: '2' });
```

### size

> 属性，获取List/Map的长度，等同于ImmutableData.count();

### get() 、 getIn()

> 获取数据结构中的数据

```js
//获取List索引的元素
ImmutableData.get(0);

// 获取Map对应key的value
ImmutableData.get('a');

// 获取嵌套数组中的数据
ImmutableData.getIn([1, 2]);

// 获取嵌套map的数据
ImmutableData.getIn(['a', 'b']);
```

### set()

> 设置第一层key、index的值

```js
const originalList = List([ 0 ]);
// List [ 0 ]
originalList.set(1, 1);
// List [ 0, 1 ]
originalList.set(0, 'overwritten');
// List [ "overwritten" ]
originalList.set(2, 2);
// List [ 0, undefined, 2 ]
```

其余的参考相关文档：

REFER: https://www.jianshu.com/p/0fa8c7456c15

## react 基础

### 虚拟 DOM 的含义和实现

参考：[一文说清 virtualDOM 的含义和实现](https://juejin.im/post/5dd0e102e51d4508482c9739)

```js
class Element {
  constructor(tagName, props, children) {
    this.tagName = tagName
    this.props = props
    this.children = children
  }

  render() {
    const dom = document.createElement(this.tagName)
    // 设置标签属性
    Reflect.wonKeys(this.props).forEach(name => {
      dom.setAttribute(name, this.props[name])
    })

    // 递归更新子节点
    this.children.forEach(child => {
      const childDom = child instanceof Element
        ? child.render()
        : dom.createTextNode(child)
      dom.appendChild(childDom)
    })

    return dom
  }

}
```

```js
// 比较VDom树，并进行高效更新
// diff：递归对比两颗 VDom 树的 对应位置的节点差异
// patch：根据不同的差异，进行节点的更新
// 所有以 $ 开头的变量，代表 真实的 DOM。参数 index 表示 oldNode 在 $parent 的所有子节点构成的数组的下标位置
// 更新策略：diff 的同时，进行patch
function updateEl($parent, newNode, oldNode, index=0) {
  let changeType = null

  // 新增节点。如果oldNode为undefined，说明newNode是一个新增的DOM节点。直接将其追加到DOM节点中即可
  if (!oldNode) {
    $parent.appendChild(newNode.render())
  // 删除节点。如果newNode为undefined，说明VDom中，当前位置没有节点，因此需要将其从实际的DOM中删除。通过调用 index 参数，可以拿到被删除元素的引用
  } else if (!newNode) {
    $parent.removeChild($parent.childNodes[index])
  } else if (changeType = checkChangeType(newNode, oldNode)) {
    if (changeType === CHANGE_TYPE_TEXT) {
      $parent.replaceChild(
        document.createTextNode(newNode),
        $parent.childNodes(index)
      )
    } else if (changeType === CHANGE_TYPE_REPLACE) {
      $parent.replaceChild(newNode.render(), $parent.childNodes[index])
    } else if (changeType === CHANGE_TYPE_PROPS) {
      repalceAttribute($parent.childNodes[index], oldNode.props, newNode.props)
    }
  // 递归对子节点执行diff
  } else if (newNode.tagName) {
    const newLength = newNode.children.length
    const oldLength = oldNode.children.length
    for (ler i = 0; i < newLength || i < oldLength; i++) {
      updateEl(
        $parent.childNodes[index],
        newNode.childNodes[i],
        oldNode.childNodes[i],
        i
      )
    }
  }
}
```

```js 变化节点
// 对比oldNode 和 newNode，有三种情况可以视为改变
// 1、节点类型发生变化，文本变成vDom，vDom编程文本
// 2、新旧节点都是文本，内容发生改变
// 3、节点的属性发生变化
const CHANGE_TYPE_TEXT = Symbol('text)
const CHANGE_TYPE_PROP = Symbol('props')
const CHANGE_TYPE_REPLACE = Symbol('replace')

function repalceAttribute($node, removeAttrs, newAttrs) {
  if (!$node) {
    return
  }
  Reflect.ownProps(removeAttrs).forEach(attr => $node.removeAttribute(attr))
  Reflect.ownProps(newAttrs).forEach(attr => $node.setAttribute(attr, newAttrs[attr]))
}

function checkChangeType(newNode, oldNode) {
  if (
    typeof newNode !== typeof oldNode ||
    newNode.tagName !== oldNode.tagName
  ) {
    return CHANGE_TYPE_REPLACE
  }

  if (typeof newNode === 'string') {
    if (newNode !== oldNode) {
      return CHANGE_TYPE_TEXT
    }
    return
  }

  const propsChanged = Reflect.ownProps(newNode.props).reduce(
    (prev, name) => prev || oldNode.props[name] !== newNode.props[name],
    false
  )
  if (propsChanged) {
    return CHANGE_TYPE_PROPS
  }
  return
}
```

### react.createPortal

REFER: http://www.ptbird.cn/react-portal-createPortal.html

一般使用 React 的组件都是挂到父组件的 `this.props.children` 上面，总是被最近的父组件所捕获，最终到 React 根组件上。
而 Protals 则提供了一种将组件直接挂载到直接父组件 DOM 层次之外的一类方式。

react-dom 提供的具体方法是 `ReactDOM.createPortals(child, container)`，这个方法需要两个参数，第一个参数是需要挂载的组件实例，而第二个参数则是要挂载到的DOM节点。一般来说第一个参数可能传递的是需要挂载的 this.props.children

```js 示例
const loadingRoot = document.getElementById('component-loading')
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />

const SpinStyle = {
  position: 'absolute',
  right: '20px',
  top: '20px'
}

// Spin loading
export const SpinLoading = () => {
  return ReactDOM.createPortal(<Spin indicator={antIcon} style={SpinStyle} />, loadingRoot)
}

// 图片 loading
const Loading = () => <img src={loadingPic} alt="" className="loading" />

export default Loading
```

### react.getDerivedStateFromProps

REFER: https://www.jianshu.com/p/50fe3fb9f7c3

这个生命周期的意思就是从props中获取state，可以说是太简单易懂了。
可以说，这个生命周期的功能实际上就是`将传入的props映射到state上面`

由于16.4的修改，这个函数会在每次`re-rendering`之前被调用，这意味着什么呢

这个生命周期函数是为了替代componentWillReceiveProps存在的，所以在你需要使用componentWillReceiveProps的时候，就可以考虑使用getDerivedStateFromProps来进行替代了。
两者的参数是不相同的，而getDerivedStateFromProps是一个静态函数，也就是这个函数不能通过this访问到class的属性，也并不推荐直接访问属性。而是应该通过参数提供的nextProps以及prevState来进行判断，根据新传入的props来映射到state。

需要注意的是，**如果props传入的内容不需要影响到你的state，那么就需要返回一个null**，这个返回值是必须的，所以尽量将其写到函数的末尾。

```js
class LoginModel extends Component {
  state = { type: 'login' } // 模态框类型

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.loginModalVisible) return { type: 'login' }
    if (nextProps.registerModalVisible) return { type: 'register' }
    return null
  }
```

## emotion

> CSS in JS 方案

从写法上看, 侵入性比较小, 直接就是 className:

```js
import styled, { css } from 'react-emotion';

const Container = styled('div')`
  background: #333;
`
const myStyle = css`
  color: rebeccapurple;
`
const app = () => (
<Container>
  <p className={myStyle}>Hello World</p>
</Container>
);
```

生产的CSS是基于 **hash** 的 className 包裹的。插入在 `<head />>` 当中的。这样运行时甚至热替换时没有问题

## 优秀代码学习 👍👍👍👍👍 重点推介

### 号码分割

```js
/**
 * 字符串填充函数
 * @param  {string} value      目标字符串
 * @param  {array} position 需要填充的位置
 * @param  {string} padstr   填充字符串
 * @return {string}          返回目标字符串
 */
export const padStr = (value, position, padstr, inputElement) => {
  position.forEach((item, index) => {
    if (value.length > item + index) {
      value = value.substring(0, item + index) + padstr + value.substring(item + index)
    }
  })
  value = value.trim();
  // 解决安卓部分浏览器插入空格后光标错位问题
  requestAnimationFrame(() => {
    inputElement.setSelectionRange(value.length, value.length);
  })
  return value;
}

// NOTE: 使用

<input type="text" maxLength="13" placeholder="请输入客户电话" value={this.props.formData.phoneNo} onChange={this.handleInput.bind(this, 'phoneNo')}/>

/**
   * 将表单数据保存至redux，保留状态
   * @param  {string} type  数据类型 orderSum||name||phoneNo
   * @param  {object} event 事件对象
   */
  handleInput = (type, event) => {
    let value = event.target.value;
    switch(type){
      case 'orderSum':
        value = value.replace(/\D/g, '');
      break;
      case 'name':
      break;
      case 'phoneNo':
        value = this.padStr(value.replace(/\D/g, ''), [3, 7], ' ', event.target);
      break;
      default:;
    }
    this.props.saveFormData(value, type);
  }
```

### 这样也可以啊 😄😄😄

```js
componentDidMount() {
    const params = this.decodeQuery(this.props)
    this.setState({ type: params.type }, this.fetchList({ page: 1, ...params }))
  }
```

没有使用回调啊。居然可以i这么写

### 显示富文本中的内容。保持原有的标签样式

> _html

```js
<div dangerouslySetInnerHTML = {{ __html: checkMessages.details }} />
```

如果是直接调用接口中的值，则是以上的写法，如果是单纯的显示固定的内容，用如下的写法：

```js
<div dangerouslySetInnerHTML={{ __html: '<div>123</div>' }} />
```

原理：

1.dangerouslySetInnerHTMl 是React标签的一个属性，类似于angular的ng-bind；

2.有2个{{}}，第一{}代表jsx语法开始，第二个是代表dangerouslySetInnerHTML接收的是一个对象键值对;

3.既可以插入DOM，又可以插入字符串；

4.不合时宜的使用 innerHTML 可能会导致 cross-site scripting (XSS) 攻击。 净化用户的输入来显示的时候，经常会出现错误，不合适的净化也是导致网页攻击的原因之一。dangerouslySetInnerHTML 这个 prop 的命名是故意这么设计的，以此来警告，它的 prop 值（ 一个对象而不是字符串 ）应该被用来表明净化后的数据。

### useInterval

> 自定义 hooks

```js
import React, { useState, useEffect, useRef } from 'react'

function useInterval(callback, delay) {
  const savedCallback = useRef()

  // 保留新回调
  useEffect(() => {
    savedCallback = callback
  })

  // 建立interval
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }

    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

// 可以暂停的 interval
const [delay, setDelay] = useState(100)
const [isRunning, setIsRunning] = useState(true)

useInterval(() => {
  setCount(count + 1)
}, isRuning ? delay : null)
```

### 理解 setState 可以传入两个参数的原因

```js
const updateValue = (oldValue, newValue) => {
  if (isFunction(newValue)) {
    return newValue(oldValue)
  }
  return newValue
}

const isFunction = val => {
  return typeof val === 'function'
}
```
