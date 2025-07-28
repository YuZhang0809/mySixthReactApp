import React, { useState } from 'react'
import { useBudgets } from '../context/BudgetsContext'
import { BUDGETS_ACTIONS } from '../context/budgetsReducer';

const Options = [
    { value: '', label: '请选择种类', disabled: true },
    { value: '餐饮', label: '餐饮' },
    { value: '交通', label: '交通' },
    { value: '购物', label: '购物' },
    { value: '娱乐', label: '娱乐' },
    { value: '医疗', label: '医疗' },
    { value: '教育', label: '教育' },
    { value: '其他', label: '其他' },
  ];

export default function BudgetForm() {

    const {budgets, dispatch} = useBudgets()
    const [budgetToEdit, setBudgetToEdit] = useState({category:'',amount:0})

    const handleCategoryChange = (e) => {
        const categoryToEdit = e.target.value
        setBudgetToEdit({category:categoryToEdit, amount:Object.hasOwn(budgets, categoryToEdit)?budgets[categoryToEdit]:0})
    }

    const handleAmountChange = (e) => {
        const amountToEdit = e.target.value
        setBudgetToEdit({...budgetToEdit, amount:amountToEdit})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch({
            type: BUDGETS_ACTIONS.SET_BUDGET,
            payload: {
                category: budgetToEdit.category,
                amount: parseInt(budgetToEdit.amount, 10)
            }
        })
        setBudgetToEdit({category:'',amount:0})
    }

  return (
    <>
        <div>预算设置</div>
        <form onSubmit={handleSubmit}>
            <select value={budgetToEdit.category} onChange={handleCategoryChange}>
                {
                    Options.map(option => {
                        return(
                            <option key={option.value} value={option.value} disabled={option.disabled}>
                                {option.label}
                            </option>
                        )
                    })
                }

            </select>
            <input type='number' value={budgetToEdit.amount === -1? 0 :budgetToEdit.amount} onChange={handleAmountChange}></input>
            <button type='submit'>设置</button>
        </form>
    </>
  )
}
