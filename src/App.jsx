import { useReducer, useEffect } from "react"
import { journalReducer } from "./reducer/journalReducer"
import { initialJournal } from "./data/mockData"
import TradeJournal from "./components/TradeJournal"

const STORAGE_KEY = "trade-journal-state"

function getInitialState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {}
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialJournal))
  return initialJournal
}

function App() {
  const [journal, dispatch] = useReducer(journalReducer, undefined, getInitialState)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(journal))
  }, [journal])

  return (
    <div className="min-h-screen py-12 px-8">
      <div className="max-w-[1480px] mx-auto">
        <header className="mb-12">
          <div
            className="flex items-end justify-between pb-7"
            style={{ borderBottom: "1px solid var(--edge)" }}
          >
            <div>
              <p
                className="font-data text-[10px] tracking-[4px] uppercase mb-3"
                style={{ color: "var(--text-2)" }}
              >
                {journal.journal_id}
              </p>
              <h1
                className="font-data text-[44px] font-bold leading-none tracking-tight"
                style={{ color: "var(--text-1)" }}
              >
                Trade Journal
              </h1>
            </div>
            <p
              className="font-data text-[10px] tracking-[3px] uppercase mb-1"
              style={{ color: "var(--text-3)" }}
            >
              {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }).toUpperCase()}
            </p>
          </div>
        </header>
        <TradeJournal journal={journal} dispatch={dispatch} />
      </div>
    </div>
  )
}

export default App
