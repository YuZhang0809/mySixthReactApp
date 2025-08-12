import React, { useMemo, useState } from 'react'
import { useExpenses } from '../context/ExpensesContext'
import { useBudgets } from '../context/BudgetsContext'
import { useCategories } from '../context/CategoriesContext'
import { CATEGORIES_ACTIONS } from "../context/categoriesReducer";

export default function CategoriesManager() {

    const { expenses } = useExpenses()
    const { budgets } = useBudgets()
    const { categories, dispatch } = useCategories()
    const [editToCategory, setEditToCategory] = useState('')
    const [errors, setErrors] = useState('')

    const usedCategoriesSet = useMemo(() => {
        //Expenses
        const usedCategoriesSetInExpenses = new Set(expenses.map(expense => expense.category))

        const categoriesByMonth = budgets.map(month => {
            const entries = Object.entries(month.budgets || {});
            return entries
              .filter(([, amount]) => amount !== null) // 若需“> 0 才算在用”，改成 amount > 0
              .map(([category]) => category);
          });
        const usedCategoriesSetInBudgets = new Set(categoriesByMonth.flat())

        return new Set([...usedCategoriesSetInExpenses, ...usedCategoriesSetInBudgets ])

    }, [expenses, budgets])

    const validateField = (category) => {
        const name = category.trim()
        if (name === '') {
            setErrors('类别不能为空')
            return false
        }
        if (name.length > 12) {
            setErrors('类别长度不能超过 12 个字符')
            return false
        }
        if (categories.includes(name)) {
            setErrors('该类别已存在')
            return false
        }
        setErrors('')
        return true  
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateField(editToCategory)) {
            dispatch({type: CATEGORIES_ACTIONS.ADD_EXPENSE_CATEGORY, payload:editToCategory.trim()})
            setEditToCategory('')
        }
    } 
    
    const handleChange = (e) => {
        const value = e.target.value
        setEditToCategory(value)
    }
    
    const handleDelete = (category) => {
        if (usedCategoriesSet.has(category)) {
            alert('该类别存在预算或者支出，无法删除！')
            return
        }
        if (!window.confirm(`确定要删除“${category}”？此操作不可撤销。`)) return
        dispatch({ type: CATEGORIES_ACTIONS.DELETE_EXPENSE_CATEGORY, payload: category })
    }

    // const handleEdit = (oldName, newName) => {
    //     const payload = {oldName: oldName, newName: newName}

    //     if (usedCategoriesSet.includes(oldName)) {
    //         alert('该类别存在预算或者支出，无法编辑！')
    //     }
    //     dispatch({type: CATEGORIES_ACTIONS.EDIT_CATEGORY, payload: payload})
    // }

  return (
    <>
        <div>CategoriesManager</div>
        <form onSubmit={handleSubmit}>
            <input value={editToCategory} id='category' name='category' type='text' onChange={handleChange}></input>
            <button type='submit'>添加</button>
            {errors && <span>{errors}</span>}
        </form>
        <div>
            {categories.length === 0 ? (
                <span>类别为空，请你设置预算！</span>
            ) : (
                categories.map(category => {
                    const isUsed = usedCategoriesSet.has(category)
                    return (
                        <div key={category} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6 }}>
                            <span>{category}</span>
                            {/* <button onClick={() => handleEdit(category)}>编辑</button> */}
                            <button onClick={() => handleDelete(category)} disabled={isUsed} title={isUsed ? '该类别在使用中，无法删除' : undefined}>删除</button>
                        </div>
                    )
                })
            )}

        </div>
    </>
  )
}
