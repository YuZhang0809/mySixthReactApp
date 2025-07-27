import React from 'react'
import { useBudgets } from '../context/BudgetsContext'
import { BUDGETS_ACTIONS } from '../context/budgetsReducer'

export default function BudgetList() {

    const {budgets, dispatch} = useBudgets()

    const handleDelete = (budgetCategory) => {
        dispatch({type:BUDGETS_ACTIONS.DELETE_BUDGET,payload:budgetCategory})
    }

    const handleClear = () => {
        dispatch({type:BUDGETS_ACTIONS.CLEAR_ALL_BUDGETS})
    }

    const handleReset = () => {
        dispatch({type:BUDGETS_ACTIONS.RESET_BUDGETS})
    }


  return (
    <>
        <div>预算清单</div>
        <button onClick={handleReset}>重置所有预算</button>
        <button onClick={handleClear}>删除所有预算</button>
        <ul>
            {Object.entries(budgets).map((budget) =>{
                return(
                    <li key={budget[0]}>
                        <span>{budget[0]}</span>
                        <span>{budget[1]}</span>
                        <button onClick={() => handleDelete(budget[0])}>删除</button>
                    </li>
                )
            })}
        </ul>
    </>
  )
}
