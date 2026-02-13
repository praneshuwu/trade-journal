import TradeStatusBadge from "./TradeStatusBadge"

function TradeMeta({ trade, dispatch }) {
  function handleToggleStatus() {
    dispatch({
      type: "UPDATE_TRADE_STATUS",
      tradeId: trade.trade_id,
      status: trade.status === "OPEN" ? "CLOSED" : "OPEN",
    })
  }

  const isLong = trade.direction === "LONG"

  return (
    <div
      className="flex flex-col items-center justify-center gap-3 py-6 px-3 border-x min-h-[80px]"
      style={{ borderColor: "var(--edge)" }}
    >
      <span
        className="font-data text-sm font-semibold tracking-[3px] uppercase"
        style={{ color: isLong ? "var(--long-text)" : "var(--short-text)" }}
      >
        {trade.direction}
      </span>
      <TradeStatusBadge status={trade.status} />
      <span
        className="font-data text-[9px] tracking-[3px] uppercase"
        style={{ color: "var(--text-3)" }}
      >
        {trade.symbol}
      </span>
      <button
        onClick={handleToggleStatus}
        className="font-data text-[9px] tracking-[2px] uppercase px-3 py-1.5 rounded-md border transition-colors"
        style={{ borderColor: "var(--edge)", color: "var(--text-2)", backgroundColor: "rgba(255,255,255,0.06)" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "var(--text-1)"
          e.currentTarget.style.borderColor = "var(--text-2)"
          e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.11)"
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "var(--text-2)"
          e.currentTarget.style.borderColor = "var(--edge)"
          e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)"
        }}
      >
        {trade.status === "OPEN" ? "Close" : "Reopen"}
      </button>
    </div>
  )
}

export default TradeMeta
