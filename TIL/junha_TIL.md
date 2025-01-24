<details>
<summary><h2>📖 2025-01-13 학습</h2></summary>

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

</details>

<details>
<summary><h2>📖 2025-01-14 학습</h2></summary>

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
  t1ow Error('Unknown action: ' + action.type);
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

</details>

<details>
<summary><h2>📖 2025-01-15 학습</h2></summary>

# Side Effect를 처리해야 한다

**useEffect**는 일반적으로 함수형(Functional) 컴포넌트에서 **부수 효과(Side Effect)**를 처리하기 위해 사용한다.

## Side Effect란?

Side Effect는 컴퓨터 과학에서 함수가 결과값 이외에 다른 상태를 변경하는 것을 의미한다.

이러한 의미를 React의 컴포넌트에 적용한다면, UI를 렌더링하는 작업 이외의 부수적인 효과가 될 것이다. 일반적으로 Side Effect의 예시는 아래와 같다.

- 외부 데이터 fetching
- 브라우저 API(window, document 등)의 사용
- `setTimeout`, `setInterval` 등의 타이밍 함수 사용

함수형 컴포넌트에서 이러한 Side Effect를 처리하기 위해 useEffect가 나오게 되었다. useEffect의 Effect가 Side Effect를 의미한다.

# useEffect

## Side Effect를 왜 useEffect에서 처리해야 할까?

React의 함수형 컴포넌트는 함수를 실행함으로써 렌더링 된다.
Side Effect는 예상할 수 없는 결과를 반환한다. 이러한 Side Effect가 함수를 실행하는 과정에서 발생한다면 React가 컴포넌트를 렌더링 하는 데에 방해가 된다.

useEffect는 컴포넌트가 모두 렌더링 된 후 실행된다. 따라서 useEffect 안에서는 Side Effect 처리가 가능하다.

## useEffect 사용법

```jsx
useEffect(function, deps?)
```

useEffect는 다음과 같이 두 가지 인자를 받는다.

첫 번째 인자로 함수를 받는다. 컴포넌트 렌더링이 완료된 후 실행할 함수를 정의한다.
두 번째 인자로 생략 가능한 **의존성 배열(deps)**을 받는다.

### 의존성 배열(deps)

의존성 배열은 useEffect를 언제 실행할지 결정한다.

의존성 배열이 존재하지 않는다면 컴포넌트가 렌더링 될 때마다 useEffect가 실행된다.

```jsx
useEffect(() => {
  fetchData();
});
```

의존성 배열이 존재한다면, 의존성 배열에 포함된 변수가 변경될 때마다 useEffect를 실행한다. `Obejct.is` 함수를 사용하여 변수의 변경 여부를 확인한다.
의존성 배열이 빈 배열이라면 컴포넌트의 첫 렌더링에만 useEffect가 실행된다.

```jsx
useEffect(() => {
  fetchData(dataId);
}, [dataId]);
```

### 클린업(clean-up) 함수

useEffect는 **클린업(clean-up)** 함수를 반환할 수 있다. useEffect의 `return`을 통해 컴포넌트가 언마운트 될 때 어떤 동작을 할 것인지 정의할 수 있다.
클래스형 컴포넌트의 `componentDidUnMount`와 비슷한 기능을 수행한다고 할 수 있다.

일반적으로 클린업 함수를 사용하는 경우는 아래와 같다.

- 타이밍 함수를 clear 할 때
- 이벤트 리스너를 제거해야 할 때
- 웹 소켓의 연결을 끊어야 할 때
- ...

## useEffect 사용시 주의할 점

useEffect에서 컴포넌트의 상태값을 바꾸면 컴포넌트가 리렌더링 되기 때문에 성능에 영향을 미칠 수 있다.
따라서 useEffect는 꼭 필요한 경우에만 사용하는 것이 좋다.

렌더링 과정에서 계산할 수 있거나 이벤트 핸들러에서 처리할 수 있는 작업은 useEffect 밖에서 실행하자.

```jsx
const [a, setA] = useState(0);
const [b, setB] = useState(0);

// ❌ 이러한 방식은 피하는 것이 좋다.
const [sum, setSum] = useState(0);
useEffect(() => {
  setSum(a + b);
}, [a, b]);
```

```jsx
const [a, setA] = useState(0);
const [b, setB] = useState(0);

// 🟢 이렇게 사용하자. 어차피 상태값이 바뀌면 리렌더링 되면서 sum이 업데이트 된다.
const sum = a + b;
```

# References

> https://ko.react.dev/learn/escape-hatches
> https://velog.io/@okxooxoo/React-useEffect%EB%8A%94-%EC%99%9C-%EC%82%AC%EC%9A%A9%ED%95%A0%EA%B9%8C
> https://velog.io/@yeonjin1357/React-Side-Effect-%EA%B7%B8%EB%A6%AC%EA%B3%A0-useEffect

</details>

<details>
<summary><h2>📖 2025-01-16 학습</h2></summary>

# props

## props란?

React에서는 함수형 컴포넌트에서 상태값을 관리하기 위해 **useState**라는 React Hook을 제공한다. 그리고 관리해야 하는 상태값이 복잡해지는 경우를 대비하여 **useReducer**라는 React Hook도 제공한다.

이렇게 만든 상태값이나 그 이외의 데이터들이 컴포넌트 사이에 공유되어야 하는 경우가 있을 것이다. 그럴 때 사용하는 것이 **props**이다.

```jsx
// App.jsx
export default function App() {
  const [num, setNum] = useState(0);
  return (
    <div>
      <Component num={num} />
    </div>
  );
}
// Component.jsx
export default function Component({ num }) {
  // num을 사용한 컴포넌트 설계
}
```

하지만 props만으로 컴포넌트 사이에 데이터를 공유한다면 **Prop drilling**이 발생할 수 있다.

## Prop drilling

Prop drilling은 React에서 props를 오로지 하위 컴포넌트로 전달하는 용도로만 사용되는 컴포넌트들을 거치며 props가 전달되는 현상을 의미한다. 아래는 이해를 돕기 위한 그림이다.

![Prop drilling](https://velog.velcdn.com/images/junhakjh/post/e3a708b9-850b-4a46-bc94-93ed04b41e56/image.png)

위 이미지와 같은 경우(Prop drilling)가 발생하면 코드를 작성하기에도 번거롭고 props를 추적하기도 어렵다.

이러한 상황이 발생하는 것을 막으면서도 여러 컴포넌트 사이에 데이터를 공유하기 위해 React에서는 Context를 제공하고 있습니다.

# Context

## Context의 용도

Context는 부모 컴포넌트가 자신의 자식 컴포넌트 전체에게 데이터를 전달할 수 있게 한다. props와 다를게 뭐냐라고 생각할 수 있지만, props를 전달할 필요 없이 context는 원하는 자식 컴포넌트에서만 데이터를 뽑아서 쓸 수 있다.

![Context](https://velog.velcdn.com/images/junhakjh/post/50d7e1ba-3148-40e7-872b-55ec6cf62547/image.png)

위 그림과 같이 **Context**를 선언하고 **Context.Provider**라는 *Wrapper*로 해당 Context를 사용할 컴포넌트들을 감싼다. 그러면 상태가 바뀔 때마다 여러 컴포넌트를 통해 props를 전달하지 않고도, Context Provider를 통해 Context에 바로 접근할 수 있다는 장점이 존재한다.

## 간단한 사용법

사용법을 간단하게 알아보자.

```jsx
// 1.
createContext(initialState);

// 2.
<Context.Provider value={value}>
  {children}
</Context.Provider>

// 3.
useContext(Context);
```

1. 먼저 사용할 Context를 초기값으로 선언한다.
2. 해당 Context를 사용하게 될 집단을 선택한 후 Provider로 묶어준다.
3. Context가 필요한 컴포넌트에서 꺼내서 쓴다.

```jsx
// NumContext.js
import { createContext } from "react";
// 사용할 Context 생성
export const NumContext = createContext(0);
export const SetNumContext = createContext(null);

// App.jsx
export default function App() {
  const [num, setNum] = useState(0);
  
  return (
    <div>
      <NumContext.Provider value={num}>
        <SetNumContext.Provider value={setNum}>
          <Component />
        </SetNumContext.Provider>
      </NumContext.Provider>
    </div>
  );
}

// Component.jsx
export default function Component() {
  // num을 사용할 컴포넌트에서 context를 꺼내어 쓴다.
  const num = useContext(NumContext);
  const setNum = useContext(SetNumContext);

  ...
}
```

위 코드는 직접 작성해본 예제이다.

useState로 num과 setState를 선언하긴 했지만 다시 Context에 대입하여 Provider로 묶여있는 children에서는 어디에서나 값을 바꾸고 사용할 수 있다. useReducer와 많이 사용하기도 한다.

React는 Context가 변경될 때마다 해당 Context를 사용하는 모든 컴포넌트를 리렌더링 시킨다. Context의 변경 여부는 `Object.is` 함수를 활용하여 비교한다.

## 주의할 점

Context가 만능은 아니다. props를 사용하는 것이 더 좋은 경우가 존재할 수 있다.

### props의 장점을 살리자

Prop drilling이 일어나지 않는 상황이라면 굳이 Context를 사용하지 않아도 된다. props가 여러 컴포넌트를 거쳐 가는 것은 자연스러운 현상이다.
props를 사용함으로써 컴포넌트 사이의 **데이터 흐름**을 명확하게 파악할 수 있기 때문에 코드 유지보수에 유리할 수 있다.

### children을 활용하자

컴포넌트 분리가 충분히 이루어지지 않는다면 props를 전달하는 층이 증가할 수도 있다.
`<Layout posts={posts} />`를 `<Layout><Posts posts={posts} /></Layout>`으로 컴포넌트를 분리하고 children 형태를 활용하면 컴포넌트 층이 줄어들게 된다.

</details>

<details>
<summary><h2>📖 2025-01-17 학습</h2></summary>

# 메모이제이션(Memoization)

useMemo와 useCallback에는 메모이제이션이라는 개념이 적용된다. 여기서 메모이제이션은 무엇일까?

## 계산한 값을 재사용

메모이제이션은 거창한 개념이 아니고 단순하다.
내가 **계산한 값**을 **재사용**할 수 있도록 **기억**해두는 것이다. 

useMemo, useCallback과 직접적인 관련이 있는 것은 아니지만, 간단하게 피보나치 수열을 예시로 살펴보겠다.

```javascript
function fibo(n) {
  if(n < 2) {
    return n;
  }
  return fibo(n - 1) + fibo(n - 2);
}

console.log(fibo(5));
```

위 코드와 같이 재귀 함수로 피보나치 수열을 구현하면 5번째 값을 구하기 위해 fibo 함수를 15회 호출해야 한다.
여기에 메모이제이션 개념을 적용하면 아래 코드가 된다.

```javascript
const memo = [0, 1];
for(int i = 2; i <= 5; i++) {
  memo[i] = memo[i - 1] + memo[i - 2];
}

console.log(memo[5]);
```
위 코드에서는 6번의 연산(초기화 과정을 2회로 가정)만에 피보나치 수열의 5번째 값을 구할 수 있다.

두 코드의 차이점은, 계산했던 값을 기억하고 있느냐이다.
첫 번째 코드가 `fibo`를 호출하는 과정을 살펴보자

1. fibo(5)
2. fibo(4), fibo(3)
3. fibo(3), fibo(2), fibo(2), fibo(1)
4. fibo(2), fibo(1), fibo(1), fibo(0), fibo(1), fibo(0)
5. fibo(1), fibo(0)

fibo(1)을 5회 호출했다. 계산했던 값이지만 그 값을 기억하고 있지 못하기 때문에 동일한 결과를 내놓는 작업을 반복했다.
***비효율적이다.***

하지만 두 번째 코드는 memo[0], memo[1], memo[2], memo[3], memo[4], memo[5] 각각에 대한 연산을 **1번씩**만 했다. 이전에 계산했던 값을 memo라는 배열에 저장해 놓았기 때문이다.

이렇게 동일한 결과를 반환하는 작업을 줄이기 위해 각각에 대한 결과를 **메모**해놓는 것을 **메모이제이션(memoization)**이라고 한다.

## 메모이제이션은 React에서 언제 필요할까?

리액트의 함수형 컴포넌트는 리랜더링 될 때마다 컴포넌트 함수가 다시 실행된다. 따라서 컴포넌트가 리랜더링 될 때마다 컴포넌트가 갖고 있는 모든 함수나 계산들도 다시 실행된다. *값이 바뀌지 않더라도 말이다.* 이러한 점은 불필요한 계산을 포함할 수 있다.

컴포넌트의 props에 종속되지 않는, 계산이 필요한 값이 존재한다고 하자.

```javascript
const value = calculate(noPropsValue);
```

이 때 props가 바뀌거나 컴포넌트의 state가 변경되어 리랜더링이 발생한다면 `calculate` 함수가 다시 실행 되어 계산된 결과값이 result에 저장될 것이다. `calculate` 함수의 실행시간이 크다면 이러한 점은 문제가 된다. 불필요한 계산을 반복하기 때문에 성능에 문제가 발생할 수 있기 때문이다.

이럴 때 필요한 것이 앞서 살펴본 **메모이제이션** 개념이다.

# useMemo

## 간단한 사용법

**useMemo**는 리랜더링 사이에 계산 결과를 캐싱(메모이제이션)해주는 React Hook이다.

```javascript
const memoizedValue = useMemo(calculateValue, dependencies);
```

`calculateValue`는 캐싱하려는 값을 계산하는 함수이다. 인자로 아무것도 넘길 수 없다.
`calculateValue`로부터 반환되는 값이 `memoizedValue`에 저장된다. `dependencies`는 의존성 배열로, 콜백 함수를 실행할지 결정한다. `dependencies`의 값이 변경되면 콜백 함수를 실행하여 캐시된 값을 최신화 한다. `dependencies` 값의 변경 여부는 `Object.is`로 확인한다.

```javascript
const memoizedValue = useMemo(
  () => calculate(a, b),
  [a, b]
);
```

이와 같이 코드를 작성하면 첫 랜더링에 `calculate` 함수가 실행되며 `memoizedValue`가 결정된다. 이후에 발생하는 리랜더링에서는 `a`나 `b`의 값이 바뀌지 않는다면 `calculate` 함수가 실행되지 않고 이미 계산된 `memoizedValue`가 사용되며, `a`나 `b`의 값 둘 중 하나라도 바뀐다면 `calculate` 함수가 다시 실행되어 `memoizedValue`가 업데이트 된다.

## useMemo는 언제 적용해야 할까?

불필요한 계산이 많이 발생한다면 useMemo를 적용하는 것이 성능 측면에서 유리할 수 있다. 불필요한 계산이 많지 않더라도 딱히 문제가 생기는 점은 없기 때문에 항상 useMemo를 적용해도 괜찮다.

하지만 useMemo를 아무 때나 모든 코드에 사용한다면 코드의 가독성을 해칠 수 있기 때문에, 필요할 때만 사용하는 것이 권장된다.

## React.memo

컴포넌트의 리랜더링 자체를 막는 방법도 있다. React.memo는 props의 변경에 따라 컴포넌트의 리랜더링을 결정한다.

```javascript
const MemoizedComponent = memo(Component, arePropsEqual?);
```

현재 시리즈에서는 React Hook에 대해 알아보고 있으니 리액트 공식 문서를 확인해보자.
https://ko.react.dev/reference/react/memo

# useCallback

useCallback은 useMemo와 거의 동일하다. 유일한 차이점은, useMemo에서는 캐시된 값을 반환하지만, useCallback은 캐시된 함수를 반환한다는 점이다.

## 간단한 사용법

```javascript
const memoizedFn = useCallback(fn, dependencies);
```

`fn`은 캐싱할 함수이다. 어떤 인자나 반환값도 가질 수 있다. 모든 랜더링에서 첫 번째 랜더링과 dependencies의 값이 바뀔 때마다 `fn`의 함수가 `memoizedFn`으로 반환된다.



# References

> https://ko.react.dev/reference/react/useMemo
> https://ko.react.dev/reference/react/useCallback
> https://ko.react.dev/reference/react/memo

</details>

<details>
<summary><h2>📖 2025-01-20 학습</h2></summary>



## 데이터 타입의 종류

### 기본형(primitive type)

- number
- string
- boolean
- null
- undefined
- Symbol(ES6부터)

### 참조형(reference type)

- object
  - Array
  - Function
  - Date
  - RegExp(정규표현식)
  - Map, WeakMap(ES6)
  - Set, WeakSet(ES6)

### 데이터 타입을 구분하는 기준은?

할당이나 현산 시, 기본형은 값이 담긴 주솟값을 복제하고 불변성을 띄며, 참조형은 값이 담긴 주솟값들로 이루어진 묶음을 가리키는 주솟값을 복제.

## 데이터 타입에 관한 배경지식

### 메모리와 데이터

컴퓨터는 모든 데이터를 `0`과 `1`로 바꿔 기억하고, 이를 `비트(bit)`라고 한다. 그리고 8개의 `비트`를 하나로 묶은 `바이트(byte)`라는 단위가 존재한다. `1 bit`가 나타낼 수 있는 값이 2개이기 때문에 `1 byte`가 나타낼 수 있는 값은 256(2^8^)개이다.
자바스크립트에서는 숫자를 저장하기 위해 `8byte(64bit)`를 확보한다.
그리고, 모든 데이터는 바이트 단위의 식별자인, **메모리 주솟값(memory address)** 을 통해 서로 구분하고 연결한다.

### 식별자와 변수

변수는 변할 수 있는 무언가, 즉 변할 수 있는 `데이터`이다. 식별자는 이러한 데이터를 식별하는 데 사용되는 이름, 즉 `변수명`이다.

## 변수 선언과 데이터 할당

### 변수 선언

```javascript
var a;
```

위 코드를 말로 풀어쓰면

> 변할 수 있는 데이터를 만든다. 이 데이터의 식별자는 a로한다

이다. 선언할 때는 `undefined`이지만 나중에 다른 값으로 바뀔 수 있다. 즉, 변수는 **변경 가능한 데이터가 담길 수 있는 공간 또는 그릇** 이라고 생각할 수 있다.

### 데이터 할당

```javascript
var a;              // 변수 a 선언
a = 'abc';          // 변수 a에 데이터 할당

var a = 'abc';      // 변수 선언과 할당을 한 문장으로 표현
```

변수를 선언하고 할당하는 과정은 다음과 같다.

1. 메모리에서 비어있는 공간을 확보하고 그 공간의 이름을 설정(선언)한다.
2. 데이터를 저장하기 위한 별도의 메모리 공간을 확보해서 문자열 'abc'를 저장한다.
3. 문자열의 주소를 변수 영역에 저장한다.

> 왜 변수 영역에 값을 직접 대입하지 않고 별도의 메모리 공간을 확보해서 저장한 후 이 주조슬 대입할까?

문자열은 숫자형 데이터와 달리 특별히 정해진 규격이 없다. 즉 필요한 메모리 용량이 가변적인데, 문자열을 추가한다면 추가적인 메모리 공간 확보가 필요하고, 그렇다면 뒤에 있는 데이터들이 이동하고 재할당 되면서 컴퓨터의 연산이 커지게 된다. 따라서 별도의 공간에 문자열을 저장하고, 문자열이 바뀐다면 원래 저장되어있던 공간이 아니라 새로운 공간에 새로운 문자열을 저장한 후 변수에 할당한다.

💡 기존 데이터는 자신의 주소를 저장하는 변수가 하나도 없게 되면 `가비지 컬렉터(garbage collector)`의 수거 대상이 된다.

## 기본형 데이터와 참조형 데이터

### 불변값

> 상수와 불변값은 다른 개념이다.

변수와 상수를 구분짓는 변경 가능성의 대상은 **변수 영역** 메모리이다. 하지만, 불변성 여부를 구분할 때의 변경 가능성의 대상은 **데이터 영역** 메모리이다.
즉, 상수는 변수에 새로운 값을 할당할 수 없고, 불변값은 데이터 영역에서 값을 변경할 수 없다.
기본형 데이터는 모두 불변값이다.

```javascript
var b = 5;
var c = 5;
b = 7;
```

위 코드에서 `b`에 `5`를 대입할 때, 먼저 데이터 영역에서 `5`를 찾고 없으면 새로 만든다.
`c`에 `5`를 대입할 때는 데이터 영역에서 `5`를 찾고 그 주소를 재활용한다.
`b`에 다시 `7`을 대입하려고 할 때는 메모리 영역에 있는 `5`를 `7`로 바꾸는 것이 아니고, 메모리 영역에서 `7`을 찾고 없으면 새로 만든다.
이와 같은 성질을 **불변성** 이라고 한다. 한 번 만들어진 값은 **가비지 컬렉팅** 을 당하지 않는 한 **영원히 변하지 않는다** .

### 가변값

먼저, 참조형 데이터의 할당 과정을 살펴보자.

```javascript
var obj1 = {
    a: 1,
    b: 'bbb'
};
```

1. 변수 영역에 obj1에 대한 빈 공간을 확보한다.
2. 별도의 변수 영역을 마련하고, 메모리 영역에 이 변수 영역의 주소를 저장한다.
3. 별도의 변수 영역에는 a와 b에 대한 공간이 확보되고, 각각의 값을 저장하는 메모리 영역이 할당된다.

이 상황에서 `obj1.a = 2;`라는 코드가 추가된다면, 데이터 영역에서 숫자 `2`를 검색하고 검색 결과가 없다면 메모리 영역에 `2`를 새로 저장하고 이 주소를 `obj1.a`에 저장한다. 숫자에 대한 불변성은 여전하지만, **새로운 객체** 가 만들어진 것이 아니라 기존 객체 내부의 값만 바뀌게 되었다. 이러한 성질을 가변성이라고 한다.

### 변수 복사 비교

```javascript
var a = 100;
var b = a;

var obj1 = { c: 10, d: 'ddd' };
var obj2 = obj1;
```

변수를 복사할 때 `a`와 `b`가 같은 주소를 바라보게 되고, `obj1`과 `obj2`가 같은 주소를 바라보게 된다는 점은 동일하다. 복사 과정은 동일하지만, 데이터 할당 과정에서 이미 차이가 있으므로 변수 복사 이후 동작에도 큰 차이가 존재한다.
위 코드에서 두 가지 코드를 추가하고 살펴보자.

```javascript
b = 15;
obj2.c = 20;
```

앞서 공부한 것을 바탕으로 분석해보면, `b = 15;`에서는 먼저 메모리 영역에서 `15`를 찾고 없기 때문에 `15`를 새로 만든 후 `b`에 할당한다. 마찬가지로 `obj2.c = 20;`에서도 메모리 영역세어 `20`을 찾고 없으므로 `20`을 새로 만든 후 `obj2.c`에 할당한다.

이후에 `a`와 `b`, `obj1`과 `obj2`의 관계는 어떻게 될까?

```javascript
a !== b
obj1 === obj2
```

코드로 표현하면 위와 같은 결과가 된다.

> 왜??

기본형과 참조형 데이터의 가장 큰 차이점이다. 생각해보면, `b`에는 `15`에 해당하는 새로운 메모리 영역을 만든 후 이 주소를 바라보고 있다. 그렇기 때문에 `a`와 `b`는 다른 주소를 바라보게 된다.
`obj2.c`도 같은 방식으로 새로운 주소를 바라보게 된다. 하지만 `obj2`가 바라보는 주소는 어떤가?
**똑같다.**
`obj2`의 주소를 바꾼 적은 없다. `obj2`가 바라보고 있는 주소는 `obj1`이 바라보고 있는 주소와 여전히 똑같고, 해당 주소에 대입되어있는 값을 바꿔버렸다고 할 수 있다. 그렇기 때문에 `obj2.c`에 다른 값을 할당하는 순간 `obj1.c`의 값도 동일한 값으로 할당되는 것이다. 즉, `obj1.c === obj2.c`가 되기도 한다.

```javascript
obj2 = { c: 10, d: 'ddd' };
```

위 코드를 실행한 이후에는 `obj1 !== obj2`가 된다. 값은 완전히 동일할지라도, 새로운 객체를 만들어서 `obj2`에 할당한 것이기 때문에 `obj1`과 `obj2`는 서로 다른 주소를 바라보게 된다.

## 불변 객체(immutable object)

### 불변 객체를 만드는 간단한 방법

```javascript
var user = {
    name: 'Jaenam',
    gender: 'male'
};

var changeName = function(user, newName) {
    var newUser = user;
    newUser.name = newName;
    return newUser;
};

var user2 = changeName(user, 'Jung');

if(user !== user2) {
    console.log('유저 정보가 변경되었습니다.');
}
console.log(user.name, user2.name);     // Jung Jung
console.log(user === user2);            // true
```

위와 같은 코드에서는 `if`문을 지나치고 `user === user2`의 결과가 `true`가 된다. 이러한 상황에서는 불변 객체가 필요하다.

이를 위해서는

```javascript
var changeName = function(user, newName) {
    return {
        name: newName,
        gender: user.gender
    }
}
```

```javascript
var copyObject = function (target) {
    var result = {};
    for (var prop in target) {
        result[prop] = target[prop];
    }
    return result;
};
```

위 두 코드를 통해 새로운 객체를 생성해서 반환할 수 있다. 하지만 첫 번째 코드는 하드코딩이고, 두 번째 코드는 얕은 복사를 수행한다는 부분이 여전히 아쉽다.

### 얕은 복사와 깊은 복사

**얕은 복사(shallow copy)** 는 바로 아래 단계의 값만 복사하는 방법이고, **깊은 복사(deep copy)** 는 내부의 모든 값들을 하나하나 찾아서 전부 복사하는 방법이다.
얕은 복사의 경우 불변값인 기본형 데이터를 복사할 때는 문제가 되지 않지만, 가변값을 복사한다면 문제가 발생한다.

```javascript
var user1 = {
    name: 'Jaenam',
    urls: {
        portfolio: 'http://github.com/abc',
        blog: 'http://blog.com',
    }
};

var user2 = copyObject(user);

user2.name = 'Jung';
user2.urls.portfolio = 'http://portfolio.com';
```

위 코드를 실행 후 `user1.name !== user2.name`이 된다. 여기까지는 문제가 없다. 하지만 `user1.urls.portfolio === user2.urls.portfolio`가 된다. 왜일까?
얕은 복사를 할 때, `name`의 주소와 `urls`의 주소를 복사한다. 그런데 `urls`에 할당된 값은 가변성을 띈다. 결국 `user1.urls`와 `user2.urls`는 서로 다르지만 같은 주소를 바라보고 있기 때문에, `user2.urls.portfolio`를 바꾸면 `user1.urls.portfolio`의 값도 똑같이 바뀌게 된다.

따라서 모든 값을 불변 객체로 만들고 복사하기 위해서는 내부 프로퍼티들을 순회하며 `copyObject` 함수를 재귀적으로 호출해야 된다.

```javascript
var copyObject = function (target) {
    var result = {};
    if (typeof target === 'object' && target !== null) {        // 자바스크립트에서 typeof 명령어가 null에 대해 'object'를 반환한다.(자바스크립트 자체의 버그)
        for (var prop in target) {
            result[prop] = copyObject(target[prop]);
        }
    } else {
        result = target;
    }
    return result;
};
```

다른 간단한 방법으로는 객체를 `JSON` 형식의 문자열로 전환했다가 다시 `JSON` 객체로 바꾸는 것이다. 하지만 메서드(함수)나 숨겨진 프로퍼티인 `__proto__`나 `getter/setter`등과 같이 `JSON`으로 변경할 수 없는 프로퍼티들은 모두 무시한다. `httpRequest`로 받은 데이터를 저장한 객체를 복사할 때 등 순수한 정보만 다룰 때 활용하기 좋다.

```javascript
var copyObjectViaJSON = function (target) {
    return JSON.parse(JSON.stringify(target));
}
```

## undefined와 null

`undefined`와 `null`은 둘 다 '없음'을 나타내지만 의미가 미세하게 다르고 사용하는 목적도 다르다.

`undefined`는 다음 세 경우에 부여된다.

1. 값을 대입하지 않은 변수, 즉 데이터 영역의 메모리 주소를 지정하지 않은 식별자에 접근할 때
2. 객체 내부의 존재하지 않는 프로퍼티에 접근하려고 할 때
3. `return` 문이 없거나 호출되지 않는 함수의 실행 결과

> var로 변수를 선언하면 변수가 인스턴스화될 때 undefined로 초기화되지만, ES6에서 등장한 let, const에는 undefined를 할당하지 않은 채로 초기화를 마치며, 이후 실제 변수가 평가되기 전까지 해당 변수에 접근할 수 없다.

단, 자바스크립트 엔진이 반환해주는 `undefined`와 직접 할당하는 `undefined`에는 차이가 존재한다. 자바스크립트 엔진이 반환해주는 `undefined`는 문자 그대로 값이 없음을 나타내고, 직접 할당하는 `undefined`는 '비어있음'을 의미하긴 하지만 하나의 값으로 동작하기 때문에 실존한다.
이러한 혼란을 막기 위해 '비어있음'을 명시적으로 나타내는 `null`을 사용하는 것이 좋다.

```javascript
var n = null;
console.log(typeof n); // object

console.log(n == undefined); // true
console.log(n == null); // true

console.log(n === undefined); // false
console.log(n === null); // true
```

위 코드는 `undefined`와 `null`을 사용할 때 주의사항이다. `typeof null`은 `object`를 반환한다. 또한 `동등 연산자(==)(equality operator)`로 비교할 경우 `null`과 `undefined`는 서로 같다고 판단한다. `일치 연산자(===)(identity operator)`를 써야 정확히 판별 가능하다.

</details>

<details>
<summary><h2>📖 2025-01-21 학습</h2></summary>

# 실행 컨텍스트란?

> 실행할 코드에 제공할 환경 정보들을 모아놓은 객체

실행 컨텍스트들은 콜 스택(call stack)에 쌓아 올렸다가, 가장 위에 쌓여있는 컨텍스트와 관련 있는 코드들을 실행하면서 전체 코드의 환경과 순서를 보장한다.

실행 컨텍스트는 전역공간, eval() 함수, 함수 등이 있고, 일반적으로 실행 컨텍스트를 구성하는 방법은 함수를 실행하는 것이다.

다음은 예제 코드이다.

<!-- prettier-ignore -->
```javascript
// -----------------------------(1)
var a = 1;
function outer() {
  function inner() {
    console.log(a);   // undefined
    var a = 3;
  }
  inner(); // ------------------(2)
  console.log(a);     // 1
}
outer(); // --------------------(3)
console.log(a);       // 1
```

1. 자바스크립트 코드를 실행하는 순간(1) 전역 컨텍스트가 콜 스택에 담긴다.
2. (3)에서 `outer` 함수를 호출하면 `outer에` 대한 환경 정보를 수집해서 `outer` 실행 컨텍스트를 생성하고 콜 스택에 담는다. -> 콜 택의 맨 위가 `outer` 실행 컨텍스트가 되므로 전역 컨텍스트와 관련된 코드의 실행을 일시중단하고 `outer` 함수 내부의 코드를 순차로 실행한다.
3. (2)에서 `inner` 함수의 실행 컨텍스트가 콜 스택의 가장 위에 담긴다.

스택 구조에 컨텍스트들이 쌓이기 때문에 한 실행 컨텍스트가 콜 스택의 맨 위에 쌓이는 순간이 현재 실행할 코드에 관여하게 되는 시점이다. 이 때 자바스크립트 엔진은 해당 컨텍스트에 관련된 코드들을 실행하는 데 필요한 환경 정보들을 수집해서 실행 컨텍스트 객체에 저장한다.
여기에 담기는 정보들은 다음과 같다.

- `VariableEnvironment`: 현재 컨텍스트 내의 식별자들에 대한 정보 + 외부 환경 정보. 선언 시점의 `LexicalEnvironment`의 `스냅샷(snapshot)`으로, 변경 사항은 반영되지 않음.
- `LexicalEnvironment`: 처음에는 `VariableEnvironment`와 같지만 변경 사항이 실시간으로 반영됨.
- `ThisBinding`: `this` 식별자가 바라봐야 할 대상 객체.

# Variable Environment

`VariableEnvironment`에 담기는 내용은 `LexicalEnvironment`와 같지만 최초 실행 시의 스냅샷을 유지한다는 점이 다르다. 주로 실행 컨텍스트를 생성할 때 `VariableEnvironment`에 정보를 먼저 담은 다음, 이를 그대로 복사해서 `LexicalEnvironment`를 만들고, 이후에는 `LexicalEnvironment`를 주로 활용한다.

# LexicalEnvironment

## environmentRecord와 호이스팅

`environmentRecord`에는 현재 컨텍스트와 관련된 코드의 식별자 정보들이 저장된다. 함수의 매개변수 식별자, 함수, 변수의 식별자 등이 식별자에 해당하고, 컨텍스트 내부 전체를 처음부터 끝까지 쭉 훑어나가며 **순서대로** 수집한다. 이 과정에서 **호이스팅(hoisting)** 이라는 개념이 등장한다.

> 전역 실행 컨텍스트는 변수 객체를 생성하는 대신 자바스크립트 구동 환경이 별도로 제공하는 개체, 즉 전역 객체(global object)를 활용한다. 전역 객체에는 브라우저의 `window`, Node.js의 `global` 객체 등이 있다. 이들은 자바스크립트 내장 객체(native object)가 아닌 호스트 객체(host object)로 분류된다.

### 호이스팅 규칙

```javascript
function a(x) {
  console.log(x); // (1), 1
  var x;
  console.log(x); // (2), 1
  var x = 2;
  console.log(x); // (3), 2
}
a(1);
```

호이스팅에 의해 위와 같은 결과가 나오게 된다. 과정은 다음과 같다.

1. 함수 `a`의 인자로 1이 전달된다.
2. `a(x)`에 대한 실행 컨텍스트가 생성된다.
3. `a(x)` 내부에서 호이스팅이 발생하기 때문에 `var x`가 선언된 상태가 된다.
4. `a(1)`에 의해 함수 `a`의 인자로 1이 전달되었기 때문에 `var x`는 1로 초기화 된다.
5. (1)과 (2)에서 바라보는 `x` 값은 1이 된다.
6. `var x = 2`, 즉 `x = 2` 를 통해 x에 2가 할당되기 때문에 (3)에서 바라보는 `x` 값은 2가 된다.

이와 같은 과정으로, 호이스팅 개념이 적용되어 (2)에서는 `undefined`가 아닌 1이 출력된다.

다른 예제에서는 코드가 어떤 식으로 동작하는지 코드의 변형을 통해 알아보겠다. _실제 자바스크립트 엔진에서는 이러한 변환 과정을 거치지 않는다._

```javascript
function a() {
  console.log(b);
  var b = 'bbb';
  console.log(b);
  function b() {}
  console.log(b);
}
a();
```

<!-- prettier-ignore -->
```javascript
function a() {
  var b;          // 수집 대상 1. 변수는 선언부만 끌어올린다.
  function b() {} // 수집 대상 2. 함수 선언은 전체를 끌어올린다.

  console.log(b);
  b = 'bbb';      // 변수의 할당부는 원래 자리에 남겨둔다.
  console.log(b);
  console.log(b);
}
a();
```

```javascript
function a() {
  var b;
  var b = function b() {}; // 함수 선언문을 함수 표현식으로 바꾼 코드

  console.log(b);
  b = 'bbb';
  console.log(b);
  console.log(b);
}
a();
```

이러한 과정 때문에 `b 함수`, `'bbb'`, `'bbb'`라는 결과가 나오게 된다.

### 함수 선언문과 함수 표현식

함수 선언문은 function 정의부만 존재하고 별도의 할당 명령이 없는 것을 의미하고, 반대로 함수 표현식은 정의한 function을 별도의 변수에 할당하는 것을 의미한다. 이 둘 사이에는 호이스팅 과정에서 차이가 발생한다.

<!-- prettier-ignore -->
```javascript
console.log(sum(1, 2));
console.log(multiply(3, 4));

function sum(a, b) {              // 함수 선언문 sum
  return a + b;
}

var multiply = function (a, b) {  // 함수 표현식 multiply
  return a * b;
};
```

이 때는 함수 선언문 `sum`은 함수 전체를 호이스팅 하기 때문에 `sum(1, 2)`가 잘 동작하지만, 함수 표현식 `multiply`는 변수 선언부만 호이스팅 하기 때문에 `multiply(3, 4)`를 호출하는 코드에서 `multiply is not a function`이라는 에러가 발생하게 된다.

## 스코프, 스코프 체인, outerEnvironmentReference

스코프(scope)란 식별자에 대한 유효범위이다. 어떤 경계 A의 외부에서 선언한 변수는 A의 외부뿐 아니라 A의 내부에서도 접근이 가능하지만, A의 내부에서 선언한 변수는 오직 A의 내부에서만 접근할 수 있다. 단, ES5까지의 자바스크립트는 전역공간을 제외하면 **오직 함수에 의해서만** 스코프가 생성된다.
이렇게 **식별자의 유효범위**를 안에서부터 바깥으로 차례로 검색해나가는 것을 **스코프 체인(scope chain)**이라고 한다. 그리고 이를 가능하게 하는 것이 `LexicalEnvironment`의 두 번째 수집 자료인 `outerEnvironmentReference`이다.

### 스코프 체인

여러 스코프에서 동일한 식별자를 선언한 경우에는 항상 스코프 체인 상에서 가장 먼저 발견된 식별자에만 접근 가능하게 된다.

<!-- prettier-ignore -->
```javascript
var a = 1;
var outer = function () {
  var inner = function () {
    console.log(a); // undefined
    var a = 3;
  };
  inner();
  console.log(a);   // 1
};
outer();
console.log(a);     // 1
```

위와 같은 실행 결과가 나오는 것은 스코프에 의해 결정된다. `inner` 함수가 실행될 때는 바깥에 있는 `a`에 접근하기 전에 `inner` 함수에서 호이스팅된 `a`에 접근한다. 하지만 이 때는 `a`가 초기화되지 않은 상태이기 때문에 `undefined`가 출력된다. `outer` 함수에서 `a`를 출력할 때는 자신, 또는 자신의 바깥 스코프에서 `a`를 찾는다. 자신보다 더 깊은 스코프로 들어가서 확인할 수 없기 때문에 `inner` 함수의 `a`를 출력하는 것이 아니라 바깥의 `a` 값이 1이 출력된다. 마찬가지로 마지막 코드에서도 동인한 스코프에 있는 `a`인 1이 출력된다.
이렇게 `outer` 함수에서 `inner` 함수 내부의 변수에 접근할 수 없는 것을 `변수 은닉화(variable shadowing)`이라고 한다.

</details>

<details>
<summary><h2>📖 2025-01-22 학습</h2></summary>

# 상황에 따라 달라지는 this

`this`는 기본적으로 실행 컨텍스트가 생성될 때, 즉 함수를 호출할 때 결정된다.

## 전역 공간에서의 this

전역 공간에서 `this`는 전역 객체를 가리킨다. 즉, 브라우저 환경에서 전역 객체는 `window`이고 `Node.js` 환경에서는 `global`이다.

전역변수를 선언하면 자바스크립트 엔진은 이를 전역객체의 프로퍼티로 할당한다.

<!-- prettier-ignore -->
```javascript
var a = 1;
console.log(a);           // 1
console.log(window.a);    // 1
console.log(this.a);      // 1
```

위 코드에서 알 수 있듯이, 브라우저 환경에서 `window === this`이고, 전역 공간에서 `a === window.a`, `a === this.a`라는 것도 알 수 있다. 이를 응용하면 아래와 같은 코드도 가능하다.

```javascript
var a = 1;
window.b = 2;
window.a = 3;
b = 4;
```

하지만, **삭제** 명령에 대해서는 조금 다르다.

<!-- prettier-ignore -->
```javascript
var a = 1;
delete window.a;                  // false
console.log(a, window.a, this.a); // 1, 1, 1
var b = 2;
delete b;                         // false
console.log(b, window.b, this.b); // 2, 2, 2
window.c = 3;
delete window.c;                  // true
console.log(c, window.c, this.c); // Uncaught ReferenceError: c is not defined
window.d = 4;
delete d;                         // true
console.log(d, window.d, this.d); // Uncaught ReferenceError: d is not defined
```

위와 같이 전역객체의 프로퍼티로 할당한 경우 삭제가 되지만, 전역변수로 선언한 경우에는 삭제가 되지 않는다.

## 메서드로서 호출할 때 그 메서드 내부에서의 this

### 함수 vs. 메서드

함수와 메서드를 구분하는 유일한 차이는 **독립성** 이다. 함수는 그 자체로 독립적인 기능을 수행하지만, 메서드는 자신을 호출한 대상 객체에 관한 동작을 수행한다. 자바스크립트에서는 상황별로 `this` 키워드에 다른 값을 부여하게 함으로써 이를 구현했다.

<!-- prettier-ignore -->
```javascript
var func = function (x) {
  console.log(this, x);
};
func(1);        // Window { ... } 1

var obj = {
  method: func,
};
obj.method(2);  // { method: function } 2
```

함수는 객체의 메서드로서 호출하는 경우에는 메서드로 동작하고, 그렇지 않으면 함수로 동작한다. 함수로 동작했을 때는 `this`가 전역 객체인 `window`, 메서드로 동작했을 때는 `Object`가 된다. 자바스크립트에서는 '함수로서 호출'과 '메서드로서 호출'을 함수 이름 앞에 객체가 명시되어 있는지 여부로 판단한다.

### 메서드 내부에서의 this

`this`에는 호출한 주체에 대한 정보가 담긴다. 만약 `outer.inner.method()`로 `method` 함수를 호출했다면, 여기서는 `method`가 가리키는 `this`는 `outer.inner`가 된다.

## 함수로서 호출할 때 그 함수 내부에서의 this

### 메서드의 내부함수에서의 this

<!-- prettier-ignore -->
```javascript
var obj1 = {
  outer: function () {
    console.log(this);            
    var innerFunc = function () {
      console.log(this);
    };
    innerFunc();          // 전역 객체(Window)

    var obj2 = {
      innerMethod: innerFunc,
    };
    obj2.innerMethod();   // obj2
  },
};
obj1.outer();             // obj1
```

위 코드 결과에서 확인할 수 있듯이, 함수 앞에 점(.)이나 대괄호([]) 만으로 호출되는 함수의 `this`가 어떤 객체를 가리키는지 결정된다. `innerFunc()`가 호출될 때 발생하는 과정은, `innerFunc` 함수의 실행 컨텍스트가 생성되면서 호이스팅, 스코프 체인 수집, `this` 바인딩 등을 수행하고, `this`가 지정되지 않았기 때문에 자동으로 스코프 체인상의 최상위 객체인 전역 객체(`Window`)가 바인딩 된다.

> 즉, `this` 바인딩에 관해서는 함수를 실행하는 당시의 주변 환경은 중요하지 않고, 오직 해당 함수를 호출하는 구문 앞에 점 또는 대괄호 표기의 유무가 관건이다.

### this를 바인딩하지 않는 함수

ES6에서는 `this`를 바인딩하지 않는 화살표 함수(arrow function)을 도입했다. 화살표 함수는 실행 컨텍스트를 생성할 때 `this` 바인딩 과정 자체가 빠지게 되어, 상위 스코프의 `this`를 그대로 활용할 수 있다.

```javascript
var obj = {
  outer: function () {
    console.log(this); // { outer: [Function: outer] }
    var innerFunc = () => {
      console.log(this); // { outer: [Function: outer] }
    };
    innerFunc();
  },
};
obj.outer();
```

## 콜백 함수 호출 시 그 함수 내부에서의 this

함수 A의 제어권을 다른 함수(또는 메서드) B에게 넘겨주는 경우, 함수 A를 콜백 함수라고 한다. 이 때, 함수 A는 함수 B의 내부 로직에 따라 실행되고, `this`도 함수 B 내부 로직에서 정한 규칙에 따라 값이 결정된다.

## 생성자 함수 내부에서의 this

'생성자'는 **구체적인 인스턴스를 만들기 위한** 일종의 **틀** 이다. 여기서 `this`는 곧 새로 만들 구체적인 **인스턴스 자신** 이 된다.

# 명시적으로 this를 바인딩하는 방법

## call 메서드

```javascript
Function.prototype.call(thisArg[, arg1[, arg2[, ...]]]);
```

<!-- prettier-ignore -->
```javascript
var func = function (a, b, c) {
  console.log(this, a, b, c);
};

func(1, 2, 3);                // Window{ ... } 1 2 3
func.call({ x: 1 }, 4, 5, 6); // { x: 1 } 4 5 6
```

<!-- prettier-ignore -->
```javascript
var obj = {
  a: 1,
  function(x, y) {
    console.log(this.a, x, y);
  },
};

obj.method(2, 3);                 // 1 2 3
obj.method.call({ a: 4 }, 2, 3);  // 4 2 3
```

## apply 메서드

```javascript
Function.prototype.apply(thisArg[, argsArray]);
```

`call` 메서드와 `apply` 메서드는 기능적으로 완전히 동일하다.
단, `call` 메서드는 첫 번째 인자를 제외한 나머지 모든 인자들을 호출할 함수의 매개변수로 지정하고, `apply` 메서드는 두 번째 인자를 배열로 받아 그 배열의 요소들을 호출할 함수의 매개변수로 지정한다.

```javascript
var func = function (a, b, c) {
  console.log(this, a, b, c);
};

func.apply({ x: 1 }, [4, 5, 6]); // { x: 1 } 4 5 6

var obj = {
  a: 1,
  method: function (x, y) {
    console.log(this.a, x, y);
  },
};
obj.method.apply({ a: 2 }, [3, 4]); // 2 3 4
```

## call / apply 메서드의 활용

### 생성자 내부에서 다른 생성자를 호출

생성자 내부에서 다른 생성자와 공통된 내용이 있을 때 `call`이나 `apply`를 이용해 다른 생성자를 호출하여 간단하게 반복을 줄일 수 있다.

```javascript
function Person(name, gender) {
  this.name = name;
  this.gender = gender;
}
function Student(name, gender, school) {
  Person.call(this, name, gender);
  this.school = school;
}
function Employee(name, gender, company) {
  Person.call(this, name, gender);
  this.company = company;
}

var jh = new Student('준하', 'male', '아주대');
var th = new Employee('태호', 'male', '구글');

console.log(jh); // Student { name: '준하', gender: 'male', school: '아주대' }
console.log(th); // Employee { name: '태호', gender: 'male', company: '구글' }
```

## bind 메서드

```javascript
Function.prototype.bind(thisArg[, arg1[, arg2[, ...]]])
```

bind 메서드는 `call`과 비슷하지만, 즉시 호출하지 않고 넘겨받은 `this`와 인수들로 새로운 함수를 반환하는 메서드다.

<!-- prettier-ignore -->
```javascript
var func = function (a, b, c, d) {
  console.log(this, a, b, c, d);
};
func(1, 2, 3, 4);                     // Window { ... } 1 2 3 4

var bindFunc1 = func.bind({ x: 1 });
bindFunc1(1, 2, 3, 4);                // { x: 1 } 1 2 3 4

var bindFunc2 = func.bind({ x: 1}, 4, 5);
bindFunc2(6, 7);                      // { x: 1 } 4 5 6 7
bindFunc3(8, 9);                      // { x: 1 } 4 5 6 7
```

위와 같이 `bind` 메서드는 함수에 this를 미리 적용하는 것과 부분 적용 함수를 구현하는 두 가지 목적을 모두 지닌다.

## 화살표 함수

ES6에 새롭게 도입된 화살표 함수는 실행 컨텍스트 생성 시 `this`를 바인딩하는 과정이 제외되었다. 즉, 함수 내부에는 `this`가 없고, 접근하고자 하면 스코프체인상 가장 가까운 this에 접근한다.

```javascript
var obj = {
  outer: function () {
    console.log(this);
    var innerFunc = () => {
      console.log(this);
    };
    innerFunc(); // { outer: [Function: outer] }
  },
};
obj.outer(); // { outer: [Function: outer] }
```
</details>

<details>
<summary><h2>📖 2025-01-23 학습</h2></summary>
# 콜백 함수란?

> A와 B는 다음 날 아침 8시에 만나기로 했다. A는 수시로 깨어 시계를 확인했고, B는 알람을 맞추고 자다가 6시에 알람 소리를 듣고 일어났다.

위와 같은 경우에, B의 알람이 콜백 함수와 비슷하다고 생각할 수 있다. 즉, 콜백 함수는 간단히 말하면 자신의 호출 제어권을 다른 함수에게 위임한 함수라고 할 수 있다. 콜백 함수를 위임받은 함수는 적절한 시점에 콜백 함수를 실행한다.

# 제어권

## 호출 시점

콜백 함수의 대표적인 예시는 `setInterval(func, delay[, param1, param2, ...])`가 있다. `setInterval`의 첫 번째 인자가 콜백 함수가 되고, `delay`에 따라 첫 번째 인자인 `func`이 실행된다.
이와 같이 콜백 함수의 제어권을 넘겨받은 코드(`setInterval`)는 콜백 함수 호출 시점에 대한 제어권을 갖는다.

## 인자

또다른 대표적인 예시로 `Array.prototype.map`이 있다.

```javascript
Array.prototype.map(callback[, thisArg])
callback: function(currentValue, index, array)
```

이 때 콜백 함수의 인자로 배열의 요소 중 현재값이, 두 번째 인자에는 현재값의 인덱스가, 세 번째 인자에는 `map` 메서드의 대상이 되는 배열 자체가 담긴다. 이러한 인자들은 콜백 함수가 아니라 `map` 메서드에 의해 결정되는 인자들이고, 따라서 `map` 메서드에서 정의한 규칙에 따라 콜백 함수를 작성해야 한다.
이와 같이 콜백 함수의 제어권을 넘겨받은 코드(`map`)는 콜백 함수를 호출할 때 인자에 어떤 값들을 어떤 순서로 넘길 것인지에 대한 제어권을 갖는다.

# 콜백 함수는 함수다

콜백 함수는 메서드가 아니라 함수다. 콜백 함수로 어떠한 객체의 메서드를 전달해도, 메서드가 아니라 함수로서 호출된다.

<!-- prettier-ignore -->
```javascript
var obj = {
  vals: [1, 2, 3],
  logValues: function (v, i) {
    console.log(this, v, i);
  },
};
obj.logValues(1, 2);                // { vals: [1, 2, 3], logValues: f } 1 2
[4, 5, 6].forEach(obj.logValues);   // Window { ... } 4 0
                                    // Window { ... } 5 1
                                    // Window { ... } 6 2
```

위와 같이 `obj.logValues`를 `forEach()`의 콜백 함수로 전달하더라도, 이 함수는 `obj`의 메서드로서 호출되는 것이 아니라 하나의 함수로서 호출된다. 따라서 `this`를 별도로 지정하지 않았기 때문에 여기서 가리키는 `this`는 `obj`가 아니라 전역객체가 된다.

# 콜백 함수 내부의 this에 다른 값 바인딩하기

```javascript
var obj1 = {
  name: 'obj1',
  func: function () {
    var self = this;
    return function () {
      console.log(self.name);
    };
  },
};
var callback = obj1.func();
setTimeout(callback, 1000);
```

위 코드에서, `var callback = obj1.func()`에서 callback에 먼저 `obj1.func()`으로 만든 함수를 `callback`애 할당한다. 이 때 `obj1.func`의 `this`는 `obj1`으로 바인딩되기 때문에 `setTimeout(callback, 1000)`에서는 우리가 원하는대로 `this`에 `obj1`이 할당된다. 이와 같은 방식으로, 코드 작성이 번거롭지만 `this`를 이용해 다양한 상황에서 재활용 할 수 있다.

이와 같은 번거로움을 보완하기 위해 `ES5`에서 `bind` 메서드가 등장했다.

```javascript
var obj1 = {
  name: 'obj1',
  func: function () {
    console.log(this.name);
  },
};
setTimeout(obj1.func.bind(obj1), 1000);

var obj2 = { name: 'obj2' };
setTimeout(obj1.func.bind(obj2), 1500);
```

# 콜백 지옥과 비동기 제어

동기적인 코드는 현재 실행 중인 코드가 완료된 후 다음 코드를 실행하는 방식이고, 비동기적인 코드는 이와 반대로 현재 실행 중인 코드의 완료 여부와 무관하게 즉시 다음 코드로 넘어간다. 비동기적인 코드는 **별도의 요청, 실행 대기, 보류** 등과 관련된 코드가 있다.
이러한 비동기적인 코드를 작성할 때 콜백 지옥에 빠지지 않기 위한 방법이 몇 가지 있다.

```javascript
var addCoffee = function (name) {
  return function (prevName) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        var newName = prevName ? prevName + ', ' + name : name;
        console.log(newName);
        resolve(newName);
      }, 500);
    });
  };
};
addCoffee('에스프레소')().then(addCoffee('아메리카노')).then(addCoffee('카페모카')).then(addCoffee('카페라떼'));
```

첫 번째로 `ES6`의 `Promise`이다. `resolve`와 `reject` 함수를 호출하여 비동기 작업의 성공 여부를 전달하고, 이를 통해 동기적 표현이 가능하다. `.then()`으로 `resolve`된 `Promise`를 받아서 이후 작업을 수행할 수 있다.

```javascript
var addCoffee = function (prevName, name) {
  setTimeout(function () {
    coffeeMaker.next(prevName ? prevName + ', ' + name : name);
  }, 500);
};

var coffeeGenerator = function* () {
  var espresso = yield addCoffee('', '에스프레소');
  console.log(espresso);
  var americano = yield addCoffee(espresso, '아메리카노');
  console.log(espresso);
  var mocha = yield addCoffee(espresso, '카페모카');
  console.log(mocha);
  var latte = yield addCoffee(espresso, '카페라떼');
  console.log(latte);
};
var coffeeMaker = coffeeGenerator();
coffeeMaker.next();
```

두 번째로 `ES6`의 `Generator`이다. `*`로 `Generator`임을 명시한다. `Generator` 함수를 실행하면 `Iterator`를 반환하고, `.next()`와 `yield`를 활용하여 비동기 작업의 동기적 표현이 가능하다.

```javascript
var addCoffee = function (name) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(name);
    }, 500);
  });
};

var coffeeMaker = async function () {
  var coffeeList = '';
  var _addCoffee = async function (name) {
    coffeeList += (coffeeList ? ',' : '') + (await addCoffee(name));
  };

  await _addCoffee('에스프레소');
  console.log(coffeeList);
  await _addCoffee('아메리카노');
  console.log(coffeeList);
  await _addCoffee('카페모카');
  console.log(coffeeList);
  await _addCoffee('카페라떼');
  console.log(coffeeList);
};
coffeeMaker();
```

마지막으로 `ES2017`의 `async/await`이다. 비동기 작업을 수행하고자 하는 함수 앞에 `async`를 표기하고, 각각의 비동기 작업이 끝날때까지 `await`로 기다리고 다음 작업을 수행함으로써 비동기 작업의 동기적 표현이 가능하다.
</details>

<details>
<summary><h2>📖 2025-01-24 학습</h2></summary>
# 클로저의 의미 및 원리 이해

> 자신을 내포하는 함수의 컨텍스트에 접근할 수 있는 함수
> 함수가 특정 스코프에 접근할 수 있도록 의도적으로 그 스코프에서 정의하는 것
> **_함수를 선언할 때 만들어지는 유효범위가 사라진 후에도 호출할 수 있는 함수_** > **_이미 생명 주기상 끝난 외부 함수의 변수를 참조하는 함수_**
> 자유변수가 있는 함수와 자유변수를 알 수 있는 환경의 결합
> 로컬 변수를 참조하고 있는 함수 내의 함수
> **_자신이 생성될 때의 스코프에서 알 수 있었던 변수들 중 언젠가 자신이 실행될 때 사용할 변수들만을 기억하여 유지시키는 함수_**

클로저는 자바스크립트 고유의 개념이 아니고 여러 함수형 프로그래밍 언어에서 등장하는 보편적인 특성이기 때문에 설명하는 방식도 각각 조금씩 다르다.

```javascript
var outer = function () {
  var a = 1;
  var inner = function () {
    console.log(a);
  };
  inner();
};
outer();
```

위 코드에서는 `inner` 함수에서 `a`를 `environmentRecord`에서 찾지 못하기 때문에 `outerEnvironmentReference`에 지정된 상위 컨텍스트인 `outer`의 `LexicalEnvironment`에 접근해서 `a`를 찾는다. 그래서 4번째 줄에서 `2`를 출력하고, `outer` 함수의 실행 컨텍스트가 종료되면 더이상 `LexicalEnvironment`에 저장된 식별자들(`a`, `inner`)에 대한 참조를 지운다. 그러면 각 식별자들에 저장되어 있던 값은 자신을 참조하는 변수가 하나도 없기 때문에 `가비지 컬렉터`의 수집 대상이 된다.

```javascript
var outer = function () {
  var a = 1;
  var inner = function () {
    return ++a;
  };
  return inner();
};
var outer2 = outer();
console.log(outer2);
```

위 코드에서 `outer` 함수는 `inner` 함수의 실행 결과를 반환한다. 이번에도 마찬가지로 `outer` 함수의 실행 컨텍스트가 종료된 시점에 `a`와 `inner`를 참조하는 대상이 없어지기 때문에 `가비지 컬렉터`의 수집 대상이 된다.

이 두 코드는 `outer` 함수의 실행 컨텍스트가 종료되기 이전에 `inner` 함수의 실행 컨텍스트가 종료되고, 이후 별도로 `inner` 함수를 호출할 수 없다는 공통점이 있다.

<!-- prettier-ignore -->
```javascript
var outer = function () {
  var a = 1;
  var inner = function () {
    return ++a;
  };
  return inner;
};
var outer2 = outer();
console.log(outer2());  // 2
console.log(outer2());  // 3
```

이번에는 `inner` 함수를 `outer` 함수 안에서 실행하지 않고 함수 자체를 `return` 하고있다. 그러면 `outer` 함수의 실행 컨텍스트가 종료되더라도 `outer2` 변수는 여전히 `inner` 함수를 참조하게 될 것이고, 9, 10번째 줄에서 `outer2`를 호출하면서 앞서 반환된 `inner` 함수가 실행된다.
`inner` 함수의 실행 컨텍스트의 `outerEnvironmentReference`에는 `outer` 함수의 `LexicalEnvironment`가 담긴다. 이후 스코프 체이닝에 따라 `outer`에서 선언한 변수 `a`에 접근하게 된다.

`outer` 함수의 실행이 이미 종료되었음에도 불구하고 `inner` 함수의 실행 시점에 `outer` 함수의 `LexicalEnvironment`에 접근할 수 있는 것은 `가비지 컬렉터`의 동작 방식 때문이다. `가비지 컬렉터`는 어떤 값을 참조하는 변수가 단 하나라도 존재한다면 수집 대상에 포함시키지 않는다. 위 코드에서는 `outer2`에 의해 `inner` 함수가 실행되면서 실행 컨텍스트가 활성화 될 것이고, 이 때 `outerEnvironmentReference`가 `outer` 함수의 `LexicalEnvironment`를 필요로 할 것이기 때문에 `outer` 함수는 수집 대상에서 제외된다.

위와 같은 내용을 바탕으로, 클로저는 아래와 같이 정의할 수 있다.

> **_클로저란 어떤 함수 A에서 선언한 a를 참조하는 내부함수 B를 외부로 전달할 경우 A의 실행 컨텍스트가 종료된 이후에도 변수 a가 사라지지 않는 현상_**

# 클로저와 메모리 관리

클로저는 필요에 의해 의도적으로 함수의 지역변수가 메모리를 소모하도록 함으로써 발생한다. 즉, 필요성이 사라진다면 더이상 메모리를 소모하지 않게 해주어야 하고, 이를 위해서는 참조 카운트가 0이 되도록 하여 `가비지 컬렉터`의 수집 대상이 되게 한다.
참조 카운트를 0으로 만들기 위해서는 식별자에 참조형이 아닌 기본형 데이터(null, undefined)를 할당하면 된다.

<!-- prettier-ignore -->
```javascript
var outer = function () {
  var a = 1;
  var inner = function () {
    return ++a;
  };
  return inner;
};
var outer2 = outer();
console.log(outer2());
console.log(outer2());
outer2 = null;  // outer 식별자의 inner 함수 참조를 끊는다.
```

# 클로저의 활용

## 접근 권한 제어(정보 은닉)

자바스크립트는 기본적으로 변수 자체에 `public`, `protected`, `private` 등의 접근 권한을 직접 부여하도록 설계되어 있지 않다. 하지만 클로저를 이용하면 함수 차원에서 `return`을 통해 함수 내부의 변수를 `public`한 값과 `private`한 값으로 구분할 수 있다.

```javascript
var car = {
    fuel: Math.ceil(Math.random() * 10 + 10),
    power: Math.ceil(Math.random() * 3 + 2),
    moved: 0,
    run: function() {
        ...
    }
}
```

위와 같은 코드가 있다고 할 때, `car.fuel = 1000;`와 같은 코드를 작성한다면 `car` 객체의 `fuel` 변수에 할당되어 있는 랜덤값이 의미가 없어져버린다. 따라서 이러한 정보를 은닉하기 위해서 객체를 함수로 바꾸고 `return`으로 함수의 변수의 접근 권한을 설정할 수 있다.

```javascript
var createCar = function () {
  fuel = Math.ceil(Math.random() * 10 + 10);
  power = Math.ceil(Math.random() * 3 + 2);
  moved = 0;
  return {
    get moved() {
      return moved;
    },
    run: function () {
      ...
    },
  };
};
var car = createCar();
```

코드를 위와 같이 변경하면, `moved` 변수는 `getter`만 부여함으로써 읽기 전용 속성이 부여되었기 때문에 `car.moved`로 접근할 수 있지만, `fuel`과 `power` 변수는 비공개 멤버이기 때문에 `car.fuel`, `car.power`로 변수에 접근하려 하면 `undefined`가 반환된다.

이렇게 함수의 `return`에서 발생하는 클로저를 이용하여 정보를 은닉할 수 있다.

## 부분 적용 함수

부분 적용 함수(partially applied function)란 n개의 인자를 받는 함수에 미리 m개의 인자만 넘겨 기억시켰다가, 나중에 (n-m)개의 인자를 넘기면 원래 함수의 실행 결과를 얻을 수 있게 하는 함수이다. 미리 일부 인자를 넘겨두어 기억하게 하고 추후 필요한 시점에 기억했던 인자들까지 함께 실행하게 한다는 개념 자체가 클로저의 정의에 부합한다.

대표적인 예로 `디바운스(debounce)`가 존재한다.

```javascript
var debounce = function (eventName, func, wait) {
  var timeoutId = null;
  return function (event) {
    var self = this;
    console.log(eventName, 'event 발생');
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func.bind(self, event), wait);
  };
};

var moveHandler = function (e) {
  console.log('move event 처리');
};
var wheelHandler = function (e) {
  console.log('wheel event 처리');
};
document.body.addEventListener('mousemove', debounce('move', moveHandler, 500));
document.body.addEventListener('mousewheel', debounce('wheel', wheelHandler, 700));
```

위 코드는 마우스 이벤트에 대한 `debounce`를 구현한 것이다. 마우스의 움직임과 스크롤 이벤트가 발생할 때마다 각각 `500ms`, `700ms`의 대기시간을 갖고 이벤트에 대한 처리를 한다. 동작 방식을 간략하게 정리하면 아래와 같다.

1. 마우스 이벤트가 발생함.
2. `debounce` 함수에서 반환된 함수가 실행됨.
3. 기존에 비동기로 동작중이던 `setTimeout`을 `clearTimeout` 함수를 통해 중단시킴.
4. `bind` 함수를 이용하여 마우스 이벤트에 대한 처리 함수(`func`)의 `this`를 지정하고 `event`(마우스 이벤트)를 `argument`로 넘겨준 함수를 `setTimeout`의 콜백 함수로 지정함.

위 과정을 통해 `wait`만큼의 시간이 지나기 전에 마우스 이벤트가 발생하면 해당 이벤트에 대한 처리를 하지 않고, 마우스 이벤트가 없는 상태로 `wait`만큼의 시간이 지난 후에야 해당 이벤트에 대한 처리를 진행한다.

이러한 동작 과정에서 클로저로 처리되는 변수는 `debounce` 함수가 종료된 이후에도 참조하고 있는 `eventName`, `func`, `wait`, `timeoutId`가 있다.

## 커링 함수

커링 함수는 여러 개의 인자를 받는 함수를 하나의 인자만 받는 함수로 나눠서 순차적으로 호출될 수 있게 체인 형태로 구성한 것을 말한다. 마지막 인자가 전달되기 전까지는 함수를 실행하지 않는다.

<!-- prettier-ignore -->
```javascript
var curry3 = function (func) {
  return function (a) {
    return function (b) {
      return func(a, b);
    };
  };
};

var getMaxWith10 = curry3(Math.max)(10);
console.log(getMaxWith10(8));             // 10
console.log(getMaxWith10(25));            // 25

var getMinWith10 = curry3(Math.min)(10);
console.log(getMinWith10(8));             // 8
console.log(getMinWith10(25));            // 10
```

위 코드는 가독성을 위해 화살표 함수를 적용할 수 있다.

<!-- prettier-ignore -->
```javascript
var curry5 = func => a => b => func(a, b);
```

이러한 커링 함수를 사용한다면 각 단계에서 받은 인자들은 모두 마지막 단계에서 참조할 것이기 때문에 `GC(가비지 컬렉션)`의 수거 대상이 되지 않고, 마지막 호출로 실행 컨텍스트가 종료된 후에야 `GC`의 수거 대상이 된다.

보통 커링 함수는 자주 쓰이는 함수에서 매개변수가 항상 비슷하고 일부만 바뀌는 경우에 적절하게 사용된다. 대표적인 예로 Flux 아키텍처의 구현체 중 하나인 `Redux`의 미들웨어가 있다.

<!-- prettier-ignore -->
```javascript
//  Redux Middleware 'Logger'
const logger = store => next => action => {
  console.log('dispatching', action);
  console.log('next state', store.getState());
  return next(action);
};
// Redux Middleware 'thunk'
const thunk = store => next => action => {
  return typeof action === 'function' 
    ? action(dispatch, store.getState) 
    : next(action);
};
```

여기서 `store`는 프로젝트 내에서 한 번 생성된 이후로 바뀌지 않는 속성이고, `dispatch`의 의미를 가지는 `next`도 마찬가지지만, `action`은 매번 달라진다. 따라서 `store`와 `next`의 값이 결정되면 `Redux` 내부에서 `logger` 또는 `thunk`에 `store`, `next`를 미리 넘겨서 반환된 함수를 저장시켜놓고, 이후에 `action`만 받아서 처리할 수 있게 한다.
</details>
