import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: number
}

type Filter = 'all' | 'active' | 'completed'

const STORAGE_KEY = 'react-todo-app:todos'
const REMOVE_DELAY = 380

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return (parsed as Todo[]).filter(
      (item) =>
        item &&
        typeof item.id === 'string' &&
        typeof item.text === 'string' &&
        typeof item.completed === 'boolean',
    )
  } catch {
    return []
  }
}

function createId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'active', label: '进行中' },
  { key: 'completed', label: '已完成' },
]

function App() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos)
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const [removing, setRemoving] = useState<Set<string>>(new Set())
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const stats = useMemo(() => {
    const total = todos.length
    const completed = todos.filter((t) => t.completed).length
    const active = total - completed
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100)
    return { total, active, completed, percent }
  }, [todos])

  const visibleTodos = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.completed)
    if (filter === 'completed') return todos.filter((t) => t.completed)
    return todos
  }, [todos, filter])

  const addTodo = () => {
    const text = input.trim()
    if (!text) {
      inputRef.current?.focus()
      return
    }
    const newTodo: Todo = {
      id: createId(),
      text,
      completed: false,
      createdAt: Date.now(),
    }
    setTodos((prev) => [newTodo, ...prev])
    setInput('')
    inputRef.current?.focus()
  }

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    )
  }

  const deleteTodo = (id: string) => {
    if (removing.has(id)) return
    setRemoving((prev) => new Set(prev).add(id))
    window.setTimeout(() => {
      setTodos((prev) => prev.filter((t) => t.id !== id))
      setRemoving((prev) => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    }, REMOVE_DELAY)
  }

  const clearCompleted = () => {
    const completedIds = todos.filter((t) => t.completed).map((t) => t.id)
    if (completedIds.length === 0) return
    setRemoving((prev) => {
      const next = new Set(prev)
      completedIds.forEach((id) => next.add(id))
      return next
    })
    window.setTimeout(() => {
      setTodos((prev) => prev.filter((t) => !t.completed))
      setRemoving(new Set())
    }, REMOVE_DELAY)
  }

  const emptyText =
    filter === 'active'
      ? '进行中的事项已清空'
      : filter === 'completed'
        ? '还没有已完成的事项'
        : '此处清静，暂无待办'

  return (
    <div className="app">
      <div className="yin-yang-bg" aria-hidden="true" />
      <main className="card">
        <header className="header">
          <div className="brand">
            <span className="brand-mark" aria-hidden="true">
              ☯
            </span>
            <div>
              <h1 className="title">清心待办</h1>
              <p className="subtitle">事无巨细 · 清静无为</p>
            </div>
          </div>
        </header>

        <form
          className="input-row"
          onSubmit={(e) => {
            e.preventDefault()
            addTodo()
          }}
        >
          <input
            ref={inputRef}
            className="input"
            type="text"
            value={input}
            placeholder="写下今日要事……"
            onChange={(e) => setInput(e.target.value)}
            aria-label="新待办事项"
          />
          <button className="add-btn" type="submit" disabled={!input.trim()}>
            添加
          </button>
        </form>

        <section className="stats" aria-label="统计信息">
          <div className="stat">
            <span className="stat-num">{stats.total}</span>
            <span className="stat-label">总计</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">{stats.active}</span>
            <span className="stat-label">进行中</span>
          </div>
          <div className="stat-divider" />
          <div className="stat">
            <span className="stat-num">{stats.completed}</span>
            <span className="stat-label">已完成</span>
          </div>
        </section>

        <div className="progress" aria-hidden="true">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${stats.percent}%` }} />
          </div>
          <span className="progress-text">完成 {stats.percent}%</span>
        </div>

        <nav className="filters" aria-label="分类筛选">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              className={`filter-btn${filter === f.key ? ' is-active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </nav>

        <ul className="todo-list">
          {visibleTodos.length === 0 ? (
            <li className="empty">
              <span className="empty-mark" aria-hidden="true">
                ☯
              </span>
              <p>{emptyText}</p>
            </li>
          ) : (
            visibleTodos.map((todo) => (
              <li
                key={todo.id}
                className={[
                  'todo-item',
                  todo.completed ? 'is-done' : '',
                  removing.has(todo.id) ? 'is-removing' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <button
                  type="button"
                  className={`check${todo.completed ? ' is-checked' : ''}`}
                  onClick={() => toggleTodo(todo.id)}
                  aria-label={todo.completed ? '标记为未完成' : '标记为完成'}
                >
                  {todo.completed && (
                    <span className="check-mark" aria-hidden="true">
                      ✓
                    </span>
                  )}
                </button>
                <span className="todo-text">{todo.text}</span>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => deleteTodo(todo.id)}
                  aria-label="删除待办"
                >
                  ✕
                </button>
              </li>
            ))
          )}
        </ul>

        <footer className="footer">
          <span className="hint">
            {stats.completed > 0
              ? `已完成 ${stats.completed} 项，继续保持`
              : '数据已自动保存至本地'}
          </span>
          {stats.completed > 0 && (
            <button type="button" className="clear-btn" onClick={clearCompleted}>
              清除已完成
            </button>
          )}
        </footer>
      </main>
    </div>
  )
}

export default App
