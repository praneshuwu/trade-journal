import BuyTable from "./BuyTable"
import TradeMeta from "./TradeMeta"
import SellTable from "./SellTable"

function TradeRow({ trade, dispatch }) {
  const isLong = trade.direction === "LONG"

  return (
    <div
      className="grid grid-cols-[1fr_148px_1fr] border-b last:border-b-0 relative"
      style={{
        borderColor: "var(--edge-dim)",
        backgroundColor: isLong ? "var(--long-bg)" : "var(--short-bg)",
      }}
    >
      <span
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{
          backgroundColor: isLong ? "var(--long-stripe)" : "var(--short-stripe)",
          opacity: 0.7,
        }}
      />
      <BuyTable trade={trade} dispatch={dispatch} />
      <TradeMeta trade={trade} dispatch={dispatch} />
      <SellTable trade={trade} dispatch={dispatch} />
    </div>
  )
}

export default TradeRow
