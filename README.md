# 긍정 확언 리액트 앱
- todolist 및 명언, 언어 변환, 가계부 사이트

## 데모
- 

## 구현한 기능
- 회원가입
- 로그인
- 로그아웃
- 홈화면 날씨 검색 및 현재 날씨
- 본인의 긍정 글귀 등록(이미지 등록, 삭제, 업데이트)
- 영어 번역 
- TodoList
- 가계부

## 백엔드
- firebase

## 사용한 라이브러리
- npm i react-router-dom@6.3.0
- npm i firebase
- npm install --save @fortawesome/react-fontawesome
- npm i @fortawesome/free-brands-svg-icons
- npm i axios


## 어려웠던 점과 개선하고 싶은 부분



## Firebase CRUD

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