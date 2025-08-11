import React from 'react'
import { useBudgets } from '../context/BudgetsContext'
import { BUDGETS_ACTIONS } from '../context/budgetsReducer'
import { useCategories } from '../context/CategoriesContext';

export default function BudgetSettings() {

    const {categories} = useCategories()
    const {dispatch} = useBudgets()
    
    const handleReset = (categories) => {
        dispatch({type:BUDGETS_ACTIONS.RESET_BUDGETS, payload:categories})
    }

  return (
    <>
        <div>BudgetSettings</div>
        <button onClick={() => handleReset(categories)}>重置所有预算</button>
    </>
  )
}
