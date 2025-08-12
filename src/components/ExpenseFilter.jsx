import React, { useState } from 'react'
import { useCategories } from '../context/CategoriesContext';


export default function ExpenseFilter({setFilter}) {

    const [filterOnChange, setFilterOnChange] = useState({
        categories: [], 
        dateRange:{start: '', end: ''},
        amountRange: {min: '', max: ''}
    })
    const { categories } = useCategories()

    // 更新状态的函数

    const handleDateRangeChange = (e) => {
        const { name, value } = e.target;
        setFilterOnChange(prevState => ({
        ...prevState,
        dateRange: {
            ...prevState.dateRange,
            [name]: value
        }
        }));
    };

    const handleAmountRangeChange = (e) => {
        const { name, value } = e.target;
        setFilterOnChange(prevState => ({
        ...prevState,
        amountRange: {
            ...prevState.amountRange,
            [name]: value === '' ? null : Number(value)
        }
        }));
    };

    const handleCategoryChange = (e) => {
        const { value } = e.target;
        setFilterOnChange(prevState => ({
        ...prevState,
        categories: prevState.categories.includes(value)
            ? prevState.categories.filter(item => item !== value)
            : [...prevState.categories, value]
        }));
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault()
        setFilter({...filterOnChange})
        // 清空表单
        setFilterOnChange({
            categories: [], 
            dateRange:{start: '', end: ''},
            amountRange: {min: '', max: ''}
        })
    }

  return (
    <form onSubmit={handleFilterSubmit}>

        {/* Categories */}    
        <div>
            <label>Categories:</label>
            {categories.map(category => (
                <label key={category}>
                    <input
                        type='checkbox'
                        value={category}
                        name='categories'
                        checked={filterOnChange.categories.includes(category)}
                        onChange={handleCategoryChange}
                    />
                    {category}
                </label>
            ))}
        </div>

        {/* Date Range */}
        <div>
            <label>Start Date:</label>
            <input
            type="date"
            name="start"
            value={filterOnChange.dateRange.start}
            onChange={handleDateRangeChange}
            />
            <label>End Date:</label>
            <input
            type="date"
            name="end"
            value={filterOnChange.dateRange.end}
            onChange={handleDateRangeChange}
            />
        </div>

        {/* Amount Range */}
        <div>
            <label>Min Amount:</label>
            <input
            type="number"
            name="min"
            value={filterOnChange.amountRange.min}
            onChange={handleAmountRangeChange}
            />
            <label>Max Amount:</label>
            <input
            type="number"
            name="max"
            value={filterOnChange.amountRange.max}
            onChange={handleAmountRangeChange}
            />
        </div>



        {/* Submit Button */}
        <div>
            <button type="submit">应用过滤</button>
        </div>
    </form>
  )
}
