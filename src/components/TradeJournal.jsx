import { useState } from "react"
import TradeRow from "./TradeRow"

function Stat({ label, value, color }) {
  return (
    <div className="flex flex-col gap-2">
      <span
        className="font-data text-[9px] tracking-[3px] uppercase"
        style={{ color: "var(--text-2)" }}
      >
        {label}
      </span>
      <span
        className="font-data text-[26px] font-semibold leading-none"
        style={{ color }}
      >
        {value}
      </span>
    </div>
  )
}

function TradeJournal({ journal, dispatch }) {
  const [symbol, setSymbol] = useState("")
  const [direction, setDirection] = useState("LONG")

  const openCount = journal.trades.filter((t) => t.status === "OPEN").length
  const closedCount = journal.trades.filter((t) => t.status === "CLOSED").length
  const longCount = journal.trades.filter((t) => t.direction === "LONG").length
  const shortCount = journal.trades.filter((t) => t.direction === "SHORT").length

  function handleAddTrade(e) {
    e.preventDefault()
    if (!symbol.trim()) return
    dispatch({
      type: "ADD_TRADE",
      trade: {
        trade_id: `trade-${Date.now()}`,
        symbol: symbol.trim().toUpperCase(),
        direction,
        status: "OPEN",
        setup: null,
        opened_at: new Date().toISOString().split("T")[0],
        buy: [],
        sell: [],
        notes: "",
      },
    })
    setSymbol("")
    setDirection("LONG")
  }

  return (
    <div>
      <div className="flex items-center gap-10 mb-10 px-1">
        <Stat label="Trades" value={journal.trades.length} color="var(--text-1)" />
        <div className="w-px h-10 self-center" style={{ backgroundColor: "var(--edge)" }} />
        <Stat label="Open" value={openCount} color="var(--long-text)" />
        <Stat label="Closed" value={closedCount} color="var(--text-2)" />
        <div className="w-px h-10 self-center" style={{ backgroundColor: "var(--edge)" }} />
        <Stat label="Long" value={longCount} color="var(--long-text)" />
        <Stat label="Short" value={shortCount} color="var(--short-text)" />
      </div>

      <div
        className="rounded-2xl overflow-hidden border"
        style={{
          borderColor: "var(--edge)",
          backgroundColor: "var(--bg-surface)",
          boxShadow: "0 0 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.018)",
        }}
      >
        <div
          className="grid grid-cols-[1fr_148px_1fr] border-b"
          style={{ borderColor: "var(--edge)", backgroundColor: "var(--bg-raised)" }}
        >
          <div className="px-6 py-3.5 text-center">
            <span
              className="font-data text-[10px] font-semibold tracking-[4px] uppercase"
              style={{ color: "var(--gold)" }}
            >
              BUY
            </span>
          </div>
          <div
            className="px-6 py-3.5 text-center border-x"
            style={{ borderColor: "var(--edge)" }}
          >
            <span
              className="font-data text-[10px] font-semibold tracking-[4px] uppercase"
              style={{ color: "var(--text-2)" }}
            >
              TRADE
            </span>
          </div>
          <div className="px-6 py-3.5 text-center">
            <span
              className="font-data text-[10px] font-semibold tracking-[4px] uppercase"
              style={{ color: "var(--gold)" }}
            >
              SELL
            </span>
          </div>
        </div>

        {journal.trades.map((trade) => (
          <TradeRow key={trade.trade_id} trade={trade} dispatch={dispatch} />
        ))}

        {journal.trades.length === 0 && (
          <div
            className="py-28 text-center font-data text-xs tracking-[3px] uppercase"
            style={{ color: "var(--text-3)" }}
          >
            No trades recorded
          </div>
        )}
      </div>

      <form className="flex gap-3 mt-6 items-center" onSubmit={handleAddTrade}>
        <input
          type="text"
          placeholder="SYMBOL"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="font-data text-xs tracking-[3px] uppercase rounded-lg px-4 py-2.5 w-36 focus:outline-none transition-colors"
          style={{
            backgroundColor: "var(--bg-surface)",
            border: "1px solid var(--edge)",
            color: "var(--text-1)",
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "var(--gold)")}
          onBlur={(e) => (e.currentTarget.style.borderColor = "var(--edge)")}
        />
        <select
          value={direction}
          onChange={(e) => setDirection(e.target.value)}
          className="font-data text-xs tracking-[2px] rounded-lg px-4 py-2.5 focus:outline-none cursor-pointer transition-colors"
          style={{
            backgroundColor: "var(--bg-surface)",
            border: "1px solid var(--edge)",
            color: "var(--text-1)",
          }}
        >
          <option value="LONG">LONG</option>
          <option value="SHORT">SHORT</option>
        </select>
        <button type="submit" className="btn-gold">
          + New Trade
        </button>
      </form>
    </div>
  )
}

export default TradeJournal
