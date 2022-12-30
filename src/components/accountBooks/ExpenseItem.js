import React, { useContext } from "react";
import styled from "styled-components";
import { AccountBookContext } from "../../context/accountBook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const ExpenseItem = ({ name, cost, id }) => {
  const { dispatch } = useContext(AccountBookContext);

  // 원 단위 변환
  const commaAdd = (num) => {
    const regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ",");
  };

  // 해당 지출 내역 삭제하기
  const handleDeleteExpense = () => {
    dispatch({
      type: "DELETE_EXPENSE",
      payload: id,
    });
  };

  return (
    <ExpenseItem_content>
      <li>
        {name}
        <div className="expenseItem_price">
          <span>{commaAdd(cost)} 원 </span>
          <FontAwesomeIcon
            className="icon"
            icon={faCircleXmark}
            onClick={handleDeleteExpense}
          />
        </div>
      </li>
    </ExpenseItem_content>
  );
};

const ExpenseItem_content = styled.div`
  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }

  .expenseItem_price {
    width: 150px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0px;
    border-top: 1px solid #282828;

    span {
      padding: 10px;
    }
    .icon {
      cursor: pointer;
    }
  }
`;

export default ExpenseItem;
