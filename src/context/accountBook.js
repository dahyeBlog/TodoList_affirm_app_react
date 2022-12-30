import React, { useReducer, useEffect } from "react";
import { v4 } from "uuid";

export const AccountBookContext = React.createContext();

// 원 단위 변환
const commaAdd = (num) => {
  const regexp = /\B(?=(\d{3})+(?!\d))/g;
  return num.toString().replace(regexp, ",");
};

let price = +1000000;

// 페이지 로드할때, 초기값 설정
const initialState = {
  budget: commaAdd(price),
  //localstorage에서 expenses 객체에 저장한 값 가져오기
  expenses: JSON.parse(localStorage.getItem("expenses")) || [],
};

// localStorage에 변경된 예산 value를 가져옴.
if (localStorage.getItem("budget")) {
  let budgets = localStorage.getItem("budget");
  // 초기값에 변경된 budget의 값을 할당해줌.
  initialState.budget = commaAdd(budgets);
}

// Reducer 메서드는 action에 기반하여 state를 업데이트 해주는 것
const AccountReducer = (state, action) => {
  switch (action.type) {
    // 지출 등록
    case "ADD_EXPENSE":
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };

    // 지출 삭제하기
    case "DELETE_EXPENSE":
      // 삭제한 지출내역 localstorage 삭제하기
      localStorage.removeItem("expense", action.payload);

      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload
        ),
      };

    // 예산 등록
    case "SET_BUDGET":
      // localStorage에 변경된 budget의 값을 저장함
      localStorage.setItem("budget", action.payload);
      return {
        ...state,
        budget: commaAdd(action.payload),
      };

    default:
      return state;
  }
};

const AccountBookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AccountReducer, initialState);

  // 지출 내역 localstorage에 저장하기
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(state.expenses));
  }, [state.expenses]);

  return (
    <AccountBookContext.Provider
      value={{ expenses: state.expenses, budget: state.budget, dispatch }}
    >
      {children}
    </AccountBookContext.Provider>
  );
};

export default AccountBookProvider;
