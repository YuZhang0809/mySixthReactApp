import React, { useState, useEffect } from 'react'
import { useBudgets } from '../context/BudgetsContext'
import { BUDGETS_ACTIONS } from '../context/budgetsReducer';
import { useCategories } from "../context/CategoriesContext";



export default function BudgetForm({filter}) {

    const { categories } = useCategories()
    const Options = [
        ...categories.map(category => ({value:category, label:category}))
      ];

    const {budgets, dispatch} = useBudgets()
    const [budgetToEdit, setBudgetToEdit] = useState({category: '',amount: 0, filterData: filter.date})
    const [errors, setErrors] = useState({})
    
    const validateField = (name,value) => {
        
        const newErrors = { ...errors }
        switch (name) {
            case 'amount':
                if (value < 0) {
                    newErrors[name] = '请输入有效的非负金额'
                }else{
                    delete newErrors[name]
                }
                break
            case 'category':
                if (!value) {
                    newErrors[name] = '请选择类别'
                }
                else if(!categories.includes(value)){
                    newErrors[name] = '类别不存在'
                }
                else{
                    delete newErrors[name]
                }
                break
            default:
                break
            }

        setErrors(newErrors)
        }

      // 兜底：当当前类别不在可选列表中时，回退为 '' 并给出提示
    useEffect(() => {
        if (budgetToEdit.category && !categories.includes(budgetToEdit.category)) {
        setBudgetToEdit(prev => ({ ...prev, category: '' }))
        setErrors(prev => ({ ...prev, category: '该记录原类别已不存在，请重新选择' }))
        } else {
        setErrors(prev => {
            const next = { ...prev }
            if (next.category === '该记录原类别已不存在，请重新选择') {
            delete next.category
            }
            return next
        })
        }
        // 仅依赖类别源与当前选择，避免使用每次重建的本地数组
    }, [categories, budgetToEdit.category])

    const handleCategoryChange = (e) => {
        const categoryToEdit = e.target.value
        validateField('category',categoryToEdit)
        const currentMonthData = budgets.find(monthData => monthData.date === filter.date)
        const currentAmount = currentMonthData?.budgets?.[categoryToEdit] || 0
        setBudgetToEdit({...budgetToEdit, category:categoryToEdit, amount:currentAmount})
    }

    const handleAmountChange = (e) => {
        const amountToEdit = e.target.value
        validateField('amount',amountToEdit)
        setBudgetToEdit({...budgetToEdit, amount:amountToEdit})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        validateField('category', budgetToEdit.category)
        validateField('amount', budgetToEdit.amount)

        const hasErrors = budgetToEdit.category === '' ||  budgetToEdit.amount < 0 || !categories.includes(budgetToEdit.category);

        if (!hasErrors) {
            dispatch({
                type: BUDGETS_ACTIONS.SET_BUDGET,
                payload: {
                    category: budgetToEdit.category,
                    amount: parseInt(budgetToEdit.amount, 10),
                    date: budgetToEdit.filterData
                }
            })
            setBudgetToEdit(prev => ({...prev, category:'',amount:0}))
        }else{alert('请输入正确的值！')}
    }

  return (
    <>
        <div>{budgetToEdit.filterData}预算设置</div>
        <form onSubmit={handleSubmit}>
            <select value={budgetToEdit.category} onChange={handleCategoryChange}>
                <option value='' disabled>请选择种类</option>
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
            {errors.category && <span>{errors.category}</span>}
            <input type='number' value={budgetToEdit.amount} onChange={handleAmountChange}></input>
            {errors.amount && <span>{errors.amount}</span>}
            <button type='submit'>设置</button>
        </form>
    </>
  )
}
