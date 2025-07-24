# 项目开发任务清单

---

本文档将 PRD 中的里程碑分解为具体的、小颗粒度的开发任务，每项任务都附有明确的完成标准。

## 📊 项目进度概览
- **里程碑 1**: ✅ 完成 (5/5 任务)
- **里程碑 2**: 🔄 进行中 (2/5 任务)
- **里程碑 3&4**: ⏳ 待开始 (0/5 任务)  
- **里程碑 5**: ⏳ 待开始 (0/2 任务)

**总体进度**: 6/17 任务完成 (35%)

## 里程碑 1: 项目搭建与基础路由 ✅ COMPLETED (预计 2-3 小时)

### 任务 1.1: 初始化 Vite + React 项目 ✅
- **描述:** 使用 Vite 创建一个新的 React 项目，并确保基础环境可以正常运行。
- **完成日期:** 2024-07-28
- **预计耗时:** 0.5 小时
- **完成标准:**
    1. 在终端执行 `npm create vite@latest my-react-app -- --template react` (或类似命令) 成功。
    2. 进入项目目录，执行 `npm install` 无错误。
    3. 执行 `npm run dev` 后，能在浏览器 `http://localhost:5173` (或指定端口) 看到默认的 React 应用页面。

### 任务 1.2: 引入 React Router 并规整目录结构 ✅
- **描述:** 安装 `react-router-dom` 并创建规范化的项目文件夹，为后续开发做准备。
- **完成日期:** 2024-07-28
- **预计耗时:** 0.5 小时
- **完成标准:**
    1. 执行 `npm install react-router-dom` 成功，`package.json` 中出现对应依赖。
    2. 在 `src` 目录下创建以下文件夹: `pages`, `components`, `context`, `hooks`。

### 任务 1.3: 创建路由页面占位组件 ✅
- **描述:** 根据 PRD 定义，为四个主要页面创建最基础的占位组件文件。
- **完成日期:** 2024-07-28
- **预计耗时:** 0.5 小时
- **完成标准:**
    1. 在 `src/pages` 目录下创建 `DashboardPage.jsx`, `ExpensesPage.jsx`, `BudgetPage.jsx`, `SettingsPage.jsx` 四个文件。
    2. 每个文件内都包含一个简单的 React 组件，该组件仅渲染一个带有页面名称的 `<h1>` 标签 (例如 `<h1>Dashboard</h1>`)。

### 任务 1.4: 配置应用主路由 ✅
- **描述:** 在 `App.jsx` 中配置路由，将 URL 路径映射到对应的页面组件。
- **完成日期:** 2024-07-28
- **预计耗时:** 1 小时
- **完成标准:**
    1. 在 `App.jsx` 或 `main.jsx` 中，使用 `createBrowserRouter` 和 `RouterProvider` 设置路由。
    2. 配置路径 `/`, `/expenses`, `/budget`, `/settings` 分别对应 `DashboardPage`, `ExpensesPage`, `BudgetPage`, `SettingsPage` 组件。
    3. 在浏览器中手动输入并访问这四个 URL，能够正确显示对应的页面标题。

### 任务 1.5: 创建全局导航组件 ✅
- **描述:** 创建一个在所有页面共享的导航栏，方便用户在不同功能间切换。
- **完成日期:** 2024-07-28
- **预计耗时:** 0.5 小时
- **完成标准:**
    1. 在 `src/components` 目录下创建 `Navbar.jsx`。
    2. `Navbar.jsx` 中使用 React Router 的 `Link` 或 `NavLink` 组件创建指向四个页面的导航链接。
    3. 将 `Navbar` 组件整合到 `App.jsx` 的布局中，确保它在所有页面都可见且可点击。

---

## 里程碑 2: 核心状态管理与记账功能 🔄 IN PROGRESS (1/5 完成) (预计 4-5 小时)

### 任务 2.1: 设计并实现 `expensesReducer` ✅
- **描述:** 使用 `useReducer` 的思想，定义管理所有支出记录的 state 结构和 reducer 函数。
- **完成日期:** 2024-07-28
- **预计耗时:** 1 小时
- **完成标准:**
    1. 创建 `src/context/expensesReducer.js` 文件。
    2. 在文件中定义支出的初始状态 `initialState` (例如一个空数组)。
    3. 实现 reducer 函数，该函数能处理 `'ADD_EXPENSE'`, `'DELETE_EXPENSE'`, `'EDIT_EXPENSE'` 三种 action 类型，并返回新的状态。

### 任务 2.2: 创建 `ExpensesContext` 并提供全局状态 ✅
- **描述:** 创建一个 React Context，利用 `useReducer` 将 state 和 dispatch 函数提供给整个应用。
- **预计耗时:** 1 小时
- **完成日期:** 2024-07-28
- **完成标准:**
    1. 创建 `src/context/ExpensesContext.jsx` 文件。
    2. 在文件中使用 `createContext` 创建 `ExpensesContext`。
    3. 创建 `ExpensesProvider` 组件，内部使用 `useReducer` 挂接 `expensesReducer`，并通过 Context.Provider 将 `state` 和 `dispatch` 暴露出去。
    4. 在 `App.jsx` 或 `main.jsx` 中，用 `ExpensesProvider` 包裹整个应用。

### 任务 2.3: 创建支出表单组件 (`ExpenseForm.jsx`) ✅
- **描述:** 构建一个可复用的表单，用于新增和编辑支出。
- **预计耗时:** 1 小时
- **完成日期:** 2024-07-28
- **完成标准:**
    1. 在 `src/components` 目录下创建 `ExpenseForm.jsx`。
    2. 组件内部使用 `useState` 管理表单字段（金额、类别、日期、备注）。
    3. 表单包含所有必要的输入元素，并有一个提交按钮。
    4. 组件能接收一个可选的 `expenseToEdit` prop，如果接收到该 prop，表单会用其数据初始化。

### 任务 2.4: 实现支出列表与新增功能
- **描述:** 在 `/expenses` 页面上，显示所有支出记录，并使用表单添加新的记录。
- **预计耗时:** 1 小时
- **完成标准:**
    1. 在 `ExpensesPage.jsx` 中，引入并使用 `ExpenseForm` 组件。
    2. 在页面中，消费 `ExpensesContext` 获取支出列表并将其渲染出来。[[memory:482701]]
    3. 当 `ExpenseForm` 提交时，调用 `dispatch` 函数并传入 `'ADD_EXPENSE'` action，新记录成功出现在列表中。

### 任务 2.5: 实现删除与编辑功能
- **描述:** 为每条支出记录添加删除和编辑的交互能力。
- **预计耗时:** 1 小时
- **完成标准:**
    1. 支出列表中的每一项旁边都有“编辑”和“删除”按钮。
    2. 点击“删除”按钮，会调用 `dispatch` 并传入 `'DELETE_EXPENSE'` action，对应记录从列表中消失。
    3. 点击“编辑”按钮，会将该条记录的数据传递给 `ExpenseForm`，使其进入编辑模式。表单提交后，调用 `dispatch` 并传入 `'EDIT_EXPENSE'` action，列表中的记录被更新。

---

## 里程碑 3 & 4: 预算、统计与优化 (预计 4-5 小时)

### 任务 3.1: 扩展 Reducer 以管理预算
- **描述:** 增强现有的状态管理，使其同时能处理预算数据。
- **预计耗时:** 1 小时
- **完成标准:**
    1. 修改 `expensesReducer.js` (或重命名为 `appReducer.js`)，使其 state 结构包含 `expenses` 和 `budgets` 两部分。
    2. 为 reducer 新增处理 `'SET_BUDGET'` action 的逻辑。
    3. Context Provider 也相应更新，以提供完整的 `state`。

### 任务 3.2: 实现预算设置功能
- **描述:** 在 `/budget` 页面，允许用户为不同类别设置预算。
- **预计耗时:** 1 小时
- **完成标准:**
    1. `BudgetPage.jsx` 包含一个表单，允许用户选择类别并输入预算金额。
    2. 提交表单后，调用 `dispatch` 并传入 `'SET_BUDGET'` action。
    3. 页面上会显示当前所有已设置的预算列表。

### 任务 3.3: (useMemo) 计算并展示预算使用情况
- **描述:** 在预算页面动态计算并展示每个类别的已用/剩余预算。
- **预计耗时:** 1 小时
- **完成标准:**
    1. 在 `BudgetPage.jsx` 中，消费 `state.expenses` 和 `state.budgets`。
    2. 使用 `useMemo` 计算每个类别的总支出。
    3. 页面清晰地展示每个类别的“预算”、“已用”和“剩余”金额。此计算仅在 `expenses` 或 `budgets` 变化时才重新执行。

### 任务 3.4: (useMemo) 实现统计面板
- **描述:** 在 `/dashboard` 页面，利用 `useMemo` 计算并展示当月总支出和各类别占比。
- **预计耗时:** 1 小时
- **完成标准:**
    1. `DashboardPage.jsx` 使用 `useMemo` 计算当月总支出并显示。
    2. `DashboardPage.jsx` 使用 `useMemo` 计算各类别支出占总支出的百分比并显示。
    3. 确保这些计算的依赖项数组设置正确，避免不必要的重复计算。

### 任务 3.5: (memo/useCallback) 性能优化
- **描述:** 对接收回调函数的子组件应用 `React.memo` 和 `useCallback` 进行性能优化。
- **预计耗时:** 0.5 小时
- **完成标准:**
    1. 将渲染单条支出记录的组件（例如 `ExpenseItem.jsx`）用 `React.memo` 包裹。
    2. 在父组件（例如 `ExpensesPage.jsx`）中，传递给 `ExpenseItem.jsx` 的事件处理函数（如 `handleDelete`, `handleEdit`）都用 `useCallback` 包裹。

---

## 里程碑 5: 数据持久化 (预计 1-2 小时)

### 任务 5.1: (useEffect) 将应用状态同步到 localStorage
- **描述:** 当 state 发生变化时，自动将其保存到浏览器的 localStorage 中。
- **预计耗时:** 1 小时
- **完成标准:**
    1. 在 `ExpensesProvider` 组件中，使用 `useEffect` Hook。
    2. 该 `useEffect` 的依赖项是 `state` 对象。
    3. 每当 `state` 更新时，`useEffect` 的回调函数会将 `state` 对象字符串化 (`JSON.stringify`) 并存入 `localStorage` (例如，键为 `'appState'`)。

### 任务 5.2: (useEffect) 从 localStorage 初始化应用状态
- **描述:** 应用启动时，尝试从 localStorage 加载数据作为初始状态。
- **预计耗时:** 0.5 小时
- **完成标准:**
    1. 在 `useReducer` 初始化 state 时，编写一个惰性初始化函数。
    2. 该函数尝试从 `localStorage` 读取并解析 (`JSON.parse`) 数据。
    3. 如果 `localStorage` 中有有效数据，则将其作为 `useReducer` 的初始 state；否则，使用默认的空 state。
    4. 打开应用后，之前录入的数据能够被正确加载和显示。 