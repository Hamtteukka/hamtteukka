# 25.01.13

---

# React Hooks란?

**2018 React Conf**에서 처음 소개되어 **React v16.8**에 도입된 기술. 함수형 컴포넌트에서 **상태(state) 관리**와 **생명주기(life cycle)**를 다룰 수 있게 해준다.

- useState()
- useEffect()
- useMemo()
- useContext()
- useRef()
- useCallback()
- ...

# React Hooks가 나오게 된 배경

React Hooks가 나오게 된 이유는 간단히 말하면

> **Functional Component**에서 생명주기를 관리하고 싶어서

이다.

**Functional Component**가 나오기 전에는 **ECMAScript 6**에 도입된 class 문법을 사용한 **Class Component**를 사용해야 했다. 먼저 각각의 방식에 대해 간단히 알아보겠다.

## Class Component

앞서 언급한 것처럼, ECMAScript 6에 도입된 class 문법을 사용한 컴포넌트 표현 방식이다. React에서 제공하는 Component 클래스를 상속해야 한다. 또한 render() 함수를 호출해서 컴포넌트를 렌더링해줘야 한다.

```javascript
class App extends React.Component {
  render() {
    return <div>Hello World</div>;
  }
}

export default App;
```

Class Component에서 상태를 관리하기 위해 **constructor**와 **this**를 활용해야 한다.

```javascript
constructor(props) {
  super(props);
  this.state = 0;
}
```

생명주기를 관리하기 위해서는 Class Component에서만 사용할 수 있는 다양한 함수를 사용할 수 있다. 위에서 사용한 constructor와 render도 생명주기 메서드이다.

- constructor()
- render()
- componentDidMount()
- componentDidUpdate()
- componentWillUnmount()
- ...

위 함수들을 이용해서 컴포넌트가 마운트 될 때, 업데이트 될 때 등 각각의 상황에서 컴포넌트가 갖고 있는 상태를 변경하거나 특정 작업을 수행할 수 있다.

## Functional Component

별도의 함수 없이 컴포넌트를 렌더링할 수 있다.

```javascript
function App() {
  return <div>Hello World</div>;
}

export default App;
```

Class Component보다 간결한 코드로 컴포넌트를 렌더링할 수 있다. 코드가 간결해지면 자바스크립트의 컴파일러인 **Babel**을 통해 브라우저가 이해할 수 있는 코드로 변환할 때 코드의 양이 적어지기 때문에 더 높은 성능을 얻을 수 있다.

하지만 Functional Component는 생명주기를 관리할 방법이 없다는 치명적인 단점이 존재했다. 그래서 짧고 간결한 코드로 작성할 수 있고, Class Component보다 높은 성능을 갖는 Functional Class에서 생명주기를 관리할 수 있도록 React Hooks가 나오게 되었다.

# React Hooks로 얻게 된 점

**useState**로 컴포넌트가 갖는 상태를, **useEffect**로 컴포넌트의 생명주기를 관리할 수 있게 되면서 기존의 Class Component를 사용할 때보다 간결한 코드를 작성할 수 있게 되었다. 또한 HOC 컴포넌트로 인해 발생하는 문제를 해결할 수 있게 되었다.

## 간결해진 코드

컴포넌트의 props를 받아서 컴포넌트의 상태값으로 사용하고, 그 값으로 fetch 함수를 부르며, props가 바뀔 때마다 상태값을 바꾸는 코드를 작성해야 한다고 하자. 그러면 Class Component는 다음과 같이 코드를 작성해야 한다.

```javascript
constructor(props) {
  super(props);
  this.state = {
    books: [];
  };
}

componentDidMount() {
  fetch(`${baseUrl}/${this.props.id}`)
    .then((response) => response.json())
    .then(booksList => {
        this.setState({ books: booksList });
    });
}

componentDidUpdate(prevProps) {
  if (this.props.id !== prevProps.id) {
    fetch(`${baseUrl}/${this.props.id}`)
    .then((response) => response.json())
    .then(booksList => {
        this.setState({ books: booksList });
    });
  }
}
```

하지만 React Hooks를 사용한 Function Component는 훨씬 간결한 코드 작성이 가능하다.

```javascript
const [books, setBooks] = React.useState([]);

useEffect(() => {
  fetch(`${baseUrl}/${props.id}`)
    .then((response) => response.json())
    .then(booksList => {
        setState({ books: booksList });
    });
}, [props.id]);
```

과장 조금 보태서 코드 양이 거의 10분의 1로 줄었다.
뿐만 아니라 this를 사용하지 않기 때문에 this의 바인딩을 신경쓰지 않아도 된다는 장점 또한 가져갈 수 있다.

## HOC 컴포넌트 대체

Custom Hooks를 사용하면 **HOC**를 대체하여 HOC에서 발생할 수 있는 **Wrapper 지옥**을 해결할 수 있다.

### HOC(Higher Order Component)란?

재사용할 수 있는 코드를 **Wrapper Component**로 만든 것이다. 일반적으로 인증 체크나 권한 관리 등, 애플리케이션 전반에서 사용되는 컴포넌트의 상태나 생명주기와 관련된 로직을 HOC로 작성한다. 로직과 상관 없는 UI같은 부분은 parameter로 받아서 처리한다.

하지만 많은 로직들이 겹쳐 있다면 **Wrapper 지옥**에 빠지는 문제가 발생할 수 있다.

```HTML
<LanguageHOC>
  <ThemeHOC>
  	<AuthHOC>
  	  <ScrollHOC>
  		<Page />
  	  </ScrollHOC>
	</AuthHOC>
  </ThemeHOC>
</LanguageHOC>
```

### Custom Hooks

React에서 제공하는 React Hooks 외에도 직접 React Hooks를 만들어서 사용할 수 있다. 즉, Custom Hooks를 만들어서 그 내부에서 React Hooks를 사용할 수 있다. 그렇다면 상태나 생명주기와 관련된 로직들을 HOC가 아니라 Custom Hooks를 만들어서 사용할 수 있지 않을까?

```javascript
// useCustomHook.js
...

const [state, setState] = React.useState(0);

useEffect(() => {
  fetchApi();
}, []);

...

return [state, setState];
```

이러한 방식으로 Custom Hooks를 만들 수 있고, HOC를 사용할 때보다 더 간결한 방식으로 코드를 재사용할 수 있다. Wrapper 지옥에 빠질 일도 없다!

```
// Page.jsx
...
useLanguageHook();
useThemeHook();
useAuthHook();
useScrollHook();
...
```

# 결론

가장 중요한 것은 React Hooks를 통해 Functional Component에서 생명주기를 다룰 수 있다는 점인 것 같다. 그래서 React Hooks의 이점에 대해 내가 내린 결론은 다음과 같다. 

> 1. Functional Component에서 생명주기를 다룰 수 있다.
> 2. 간결한 코드로 생명주기를 다룰 수 있다.
> 3. Custom Hooks를 만들어서 중복되는 생명주기 관련 로직을 HOC보다 직관적이고 간결하게처리할 수 있다.

---

# 25.01.14

---

# UI를 어떻게 변경할 수 있을까?

화면에 숫자 0을 나타내고, +1 버튼을 누를 때마다 화면에 나타나는 숫자를 1씩 증가시키고 싶다. 어떻게 하면 될까?

```jsx
export default function App() {  
  let num = 0;

  function handleClick() {
    num = num + 1;
  }
  
  return (
    <>
      <p>num</p>
      <button onClick={handleClick}>+1</button>
    </>
  );
}
```

이렇게 지역변수를 업데이트하는 방식으로는 화면을 변경할 수 없다. 여기에는 두 가지 이유가 있다.

> 지역 변수는 렌더링 간에 유지되지 않는다.
> 지역 변수를 변경하더라도 렌더링이 발생하지 않는다.

**useState** 는 이 두 가지 문제를 해결해준다.

# useState

## useState의 간단한 사용법

useState는 두 개의 값을 포함하는 배열을 반환한다.

1. 저장한 값을 가진 **state 변수**
2. state 변수를 업데이트하고 React에 컴포넌트를 다시 렌더링하도록 유발하는 **state setter 함수**

```jsx
const [num, setNum] = useState(0);
function handleClick() {
  setNum(num + 1);
}
```

## 렌더링이 뭔데?

React에는 UI를 요청하고 제공하는 세 가지 단계가 있다.

1. 렌더링 **트리거**
2. 컴포넌트 **렌더링**
3. DOM에 **커밋**

### 렌더링 트리거

컴포넌트에서 렌더링이 일어나는 조건은 두 가지이다.

1. 컴포넌트의 **초기 렌더링인 경우**
2. 컴포넌트의 **state가 업데이트된 경우**

### 컴포넌트 렌더링

컴포넌트 렌더링은 React에서 컴포넌트를 호출하는 것이다.
초기 렌더링에서는 React가 루트 컴포넌트를 호출한다. 이후에 발생하는 리렌더링에서는 state의 업데이트에 의해 트리거가 발생한 컴포넌트를 호출한다. 이 과정에서 만약 업데이트된 컴포넌트가 다른 컴포넌트를 포함하고 있다면, 해당 컴포넌트를 재귀적으로 렌더링하는 과정을 거친다.

### DOM에 변경사항 커밋

컴포넌트 렌더링 이후 DOM을 수정한다. 단, DOM을 수정할 때는 렌더링 간에 차이가 발생한 부분에 대해서만 DOM의 노드를 변경한다.

---

React가 DOM 업데이트까지 마친 후 브라우저는 다시 화면을 그린다. 이 단계를 "브라우저 렌더링" 또는 "페인팅"이라고 부른다.

## state의 스냅샷

React는 컴포넌트를 리렌더링할 때 그 시점의 **스냅샷**을 찍고 반환한다. 그리고 해당 스냅샷과 일치하도록 화면을 업데이트 한다. React가 스냅샷을 찍을 때 state도 스냅샷에 포함된다. 이 때 찍힌 스냅샷을에 해당하는 state 값은 JSX에 적용되고, **이벤트 핸들러**에도 해당 스냅샷이 적용된다.
아래 코드는 state의 스냅샷에 대해 이야기 할 때 언제나 등장하는 예시이다.

```jsx
export default funtion App() {
  const [num, setNum] = useState(0);
  
  return (
    <>
      <p>num</p>
      <button onClick={() => {
        setNum(num + 1);
        setNum(num + 1);
        setNum(num + 1);
      }}>+3</button>
    </>
  );
```

위 코드의 결과는 모두가 아는 것처럼 버튼을 한 번 누를 때마다 num이 3이 아니라 1씩 증가된다. 이 때 state의 스냅샷 개념이 적용된다.

먼저 App 컴포넌트가 초기 렌더링 될 때 React는 num에는 0이 할당한 상태로 컴포넌트의 스냅샷을 찍는다. 여기서 스냅샷을 찍는다는 것은 그 시점의 상태를 기억하고 있다는 뜻이 된다. 그렇다면 button의 onClick에 적용된 이벤트 핸들러에서 모든 setNum(num + 1)은 setNum(0 + 1)을 의미하게 된다.
즉, 이벤트 핸들러가 실행될 때 num을 업데이트 하면서 해당 값을 계속 사용하는 것이 아니라, 렌더링 되었을 때 찍은 스냅샷을 기준으로 한 num 값을 사용한다는 것이다.

## state 업데이트 큐

### batching

하나의 이벤트 핸들러에서 하나의 state에 대해 여러번 업데이트 할 때마다 렌더링을 한다면 불필요한 리렌더링이 발생할 것이다. 따라서 React에서는 **batching**이라는 동작을 수행한다.

batching은 하나의 이벤트를 하나의 batch로 취급하고 수행한다. 즉, 이벤트 핸들러가 종료될 때까지 렌더링을 하지 않고 대기하다가 이벤트 핸들러의 모든 작업이 수행된 후에 최종적인 결과에 대해서만 렌더링을 수행한다.

```jsx
<button onClick={() => {
  setNum(num + 1); // 0 + 1 = 1, 렌더링 대기
  setNum(num + 1); // 0 + 1 = 1, 렌더링 대기
  setNum(num + 1); // 0 + 1 = 1, 렌더링 대기
  // 이벤트 핸들러가 종료된 이후 리렌더링
}}>+3</button>
```

### 업데이터 함수(updater function)

하나의 batch 안에서 상태 값을 업데이트 하고 그 값을 다시 참고하여 업데이트 하고싶을 수 있다. 이 때 `n => n + 1` 을 사용할 수 있고 이를 **업데이터 함수(updater function)**라고 한다.

```jsx
<button onClick={() => {
  setNum(n => n + 1); // 0 + 1 = 1
  setNum(n => n + 1); // 1 + 1 = 2
  setNum(n => n + 1); // 2 + 1 = 3
}}>+3</button>
```

업데이터 함수는 단순히 state 값을 대체하는 것이 아니라 React에 *state 값으로 무언가를 하라* 고 지시하는 것이다.
업데이터 함수는 이벤트 핸들러의 다른 코드가 모두 실행된 후 처리되도록 **큐(Queue)**로 들어간다. 큐의 작업들은 이벤트 핸들러의 코드가 모두 실행된 이후 순차적(FIFO)으로 수행된다.

큐에 들어간 업데이터 함수는 이전 state를 참조하여 state를 업데이트 한다.

# useReducer

useReducer는 useState와 동일한 기능을 수행한다. 단, useState와 다르게 **dispatch**와 **reducer**를 사용한다는 차이점이 존재한다.

## useReducer의 간단한 사용법

```jsx
// react 공식 문서 참조

const [state, dispatch] = useReducer(reducer, initialArg, init?);
                                     
function handleButtonClick() {
  dispatch({ type: 'incremented_age' });
}

function handleInputChange(e) {
  dispatch({
    type: 'changed_name',
    nextName: e.target.value
  });
}

function reducer(state, action) {
  switch (action.type) {
    case 'incremented_age': {
      return {
        name: state.name,
        age: state.age + 1
      };
    }
    case 'changed_name': {
      return {
        name: action.nextName,
        age: state.age
      };
    }
  }
  throw Error('Unknown action: ' + action.type);
}
```

reducer는 state를 어떻게 업데이트 할 것인지 정의하는 함수이다. state와 action을 인수로 받아서 전달받은 action에 맞게 업데이트 될 state를 반환한다.

dispatch는 state를 reducer에 의해 반환된 값으로 업데이트 하고 리렌더링을 발생시킨다. action을 인수로 받아서 state 업데이트와 리렌더링 트리거를 수행한다. 반환하는 값은 없다.

## useReducer는 언제 사용할까?

useState, useReducer 둘 중 무엇을 선택할지는 개발자의 자유다.
단, 관리해야 할 state가 복잡하다면 useReducer를 사용하는 것이 유리할 것 같다. 이유는 다음과 같다.

1. **코드 크기:** useReducer의 boilerplate 코드는 길지만, state를 업데이트 할 때는 간단하게 dispatch를 사용한다. 따라서 state가 복잡하다면 dispatch를 이용하는 useReducer를 사용하는 것이 코드 크기 측면에서 유리하다.
2. **가독성:** state가 복잡할 때 useState를 사용하면 가독성이 떨어진다. state가 복잡하더라도 비슷한 가독성을 갖는 dispatch를 사용하면 가독성 측면에서 유리하다.
3. **디버깅:** reducer에 console.log를 작성하면 state의 변화를 쉽게 확인할 수 있다.

---

# References
> https://ko.react.dev/learn/adding-interactivity
> https://react.dev/blog/2022/03/08/react-18-upgrade-guide#automatic-batching
> https://d-cron.tistory.com/77
