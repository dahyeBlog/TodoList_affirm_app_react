# 긍정 확언 리액트 앱
- todolist 및 명언 등록, 가계부 사이트

## 데모
- 

## 구현한 기능
- 회원가입
- 로그인
- 로그아웃
- 홈화면 날씨 검색 및 현재 날씨
- 동기부여 페이지에 이미지 업로드 및 삭제, 업데이트
- TodoList
- 가계부(수입, 지출 관리)

## 백엔드
- firebase

## 사용한 라이브러리
- npm i react-router-dom@6.3.0
- npm i firebase
- npm install --save @fortawesome/react-fontawesome
- npm i @fortawesome/free-brands-svg-icons
- npm i axios
- npm i uuid

## Firebase CRUD 메서드 정리
```
  //Create Todolist - 데이터베이스에 저장하기
  const createTodo = async (e) => {
    e.preventDefault();

    if (todoInput === "") {
      alert("오늘의 할일을 입력하세요 😝🚀");
      return;
    }
    await addDoc(collection(firestoreDb, "todos"), {
      text: todoInput,
      completed: false,
      createdAt: new Date(),
    });
    setTodoInput("");
  };

  //Read Todolist  -  저장한 쿼리 실행하기
  useEffect(() => {
    const q = query(
      collection(firestoreDb, "todos"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  //Update todoList - 저장한 데이터 업데이트하기
  const toggleComplete = async (todo) => {
    
      await updateDoc(doc(firestoreDb, "todos", todo.id), {
        completed: !todo.completed,
      });
    
  };

  //Delete Todolist - 저장한 데이터 삭제하기
  const deleteTodo = async (id) => {
    await deleteDoc(doc(firestoreDb, "todos", id));
  };

```

## 가계부 페이지 - useReducer 정리
- 가계부의 지출 및 수익 관리를 하기 위한 주요 로직을 useReducer를 통해서 관리 했다. 
- useReducer함수를 통해서 로직을 컴포넌트에서 분리 시킬 수 있고, 상태 업데이트 로직을 컴포넌트 바깥에 작성 할 수 있고, 다른 파일에 작성후 불러와서 사용할 수 도 있다. 
- useReducer훅에서 지정한, reducer함수는 현재 state와 action 객체를 파라미터로 받아와서 새로운 상태를 반환해주는 함수이다. 
- 주로 initialState라는 객체에 초기 정보를 담고 useReducer 에게 전달한다.
- action은 업데이트를 위한 정보를 가지고 있다. 주로 type값을 지닌 객체 형태로 사용한다. 
- state는 앞으로 컴포넌트에서 사용할 수 있는 상태를 가르킨다. dispatch는 action을 발생시키는 함수하고 이해하면 된다. 
- 만약 컴포넌트에서 관리하는 값이 하나고 단순하다면, useState를 사용하는 것이 낫다.

### useReducer 형태
```
  const [state, dispatch] = useReducer(reducer, initialState);

```

## Localstorage를 이용해서 현재 정보 저장하기
- 가계부를 작성하고, 값을 저장하기 위해서 localstorage를 이용하기로 했다. 
- localstorage는 데이터를 임시로 웹 브라우저에 저장할 수 있고, 기본적으로 문자열만 받을 수 있다.
- 데이터를 저장할 땐, JSON.stringify()로 json 화 시켜줘야하고, 데이터를 불러올땐, JSON.parse()로 객체화 시켜줘야한다. 
- LocalStorage는 브라우저를 닫아도 저장이 된다.
- 메서드로 getItem()은 로컬스토리지에서 데이터를 가져오고,
- setItem()은 로컬스토리지에 데이터를 저장한다. 


## reduce 함수
- reduce 메서드는 배열의 각 요소를 돌면서, callback함수의 실행 값을 누적하여 하나의 결과값을 반환한다. 
- 배열원소들의 전체 합이나, 최대값을 구할 수 있다. 

```
 배열.reduce((누적값, 현잿값, 인덱스, 요소) => { return 결과 }, 초깃값);

```


## 콤마 찍혀있는 숫자형 String 을 정수 Number 로 변환

```
parseInt(stringNumber.replace(/,/g , ''))

```


