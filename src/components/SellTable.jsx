import { useState } from "react"
import AddLegModal from "./AddLegModal"

function SellTable({ trade, dispatch }) {
  const isClosed = trade.status === "CLOSED"
  const [modal, setModal] = useState(null)

  function handleDelete(e, legId) {
    e.stopPropagation()
    dispatch({ type: "DELETE_LEG", tradeId: trade.trade_id, legId, side: "sell" })
  }

  return (
    <div className="p-4 pr-6">
      <table className="w-full">
        <thead>
          <tr style={{ borderBottom: "1px solid var(--edge-dim)" }}>
            <th className="text-left pb-2.5 pr-3 font-data text-[9px] tracking-[2px] uppercase font-medium w-14" style={{ color: "var(--text-2)" }}>
              Sym
            </th>
            <th className="text-right pb-2.5 px-3 font-data text-[9px] tracking-[2px] uppercase font-medium w-24" style={{ color: "var(--text-2)" }}>
              Price
            </th>
            <th className="text-right pb-2.5 px-3 font-data text-[9px] tracking-[2px] uppercase font-medium w-16" style={{ color: "var(--text-2)" }}>
              Qty
            </th>
            <th className="text-left pb-2.5 pl-3 font-data text-[9px] tracking-[2px] uppercase font-medium" style={{ color: "var(--text-2)" }}>
              Date
            </th>
            <th className="w-10" />
          </tr>
        </thead>
        <tbody>
          {trade.sell.map((leg) => (
            <tr
              key={leg.leg_id}
              onClick={() => !isClosed && setModal({ mode: "edit", leg })}
              className="group transition-colors"
              style={{ borderBottom: "1px solid var(--edge-dim)", cursor: isClosed ? "default" : "pointer" }}
              onMouseEnter={(e) => { if (!isClosed) e.currentTarget.style.backgroundColor = "var(--short-glow)" }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent" }}
            >
              <td className="py-2.5 pr-3 font-data text-xs font-medium" style={{ color: "var(--text-2)" }}>
                {trade.symbol}
              </td>
              <td className="py-2.5 px-3 text-right font-data text-sm font-semibold" style={{ color: "var(--text-1)" }}>
                {leg.price}
              </td>
              <td className="py-2.5 px-3 text-right font-data text-sm" style={{ color: "var(--text-1)" }}>
                {leg.quantity}
              </td>
              <td className="py-2.5 pl-3 font-data text-xs" style={{ color: "var(--text-2)" }}>
                {leg.date}
              </td>
              <td className="py-2.5 pr-1 text-right">
                <button
                  onClick={(e) => handleDelete(e, leg.leg_id)}
                  disabled={isClosed}
                  className="opacity-0 group-hover:opacity-100 transition-opacity font-data text-xs px-1.5 disabled:opacity-0"
                  style={{ color: "var(--text-3)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--short-text)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-3)")}
                >
                  ×
                </button>
              </td>
            </tr>
          ))}
          {trade.sell.length === 0 && (
            <tr>
              <td colSpan="5" className="py-7 text-center font-data text-[10px] tracking-[2px] uppercase italic" style={{ color: "var(--text-3)" }}>
                no entries
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {!isClosed && (
        <button
          onClick={() => setModal({ mode: "add" })}
          className="mt-3 font-data text-[10px] tracking-[3px] uppercase px-4 py-1.5 rounded-lg border transition-colors"
          style={{ color: "var(--short-text)", borderColor: "rgba(185,28,28,0.4)", background: "var(--short-badge)" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(185,28,28,0.3)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          + Sell
        </button>
      )}

      {modal && (
        <AddLegModal
          tradeId={trade.trade_id}
          symbol={trade.symbol}
          side="sell"
          leg={modal.mode === "edit" ? modal.leg : null}
          onClose={() => setModal(null)}
          dispatch={dispatch}
        />
      )}
    </div>
  )
}

export default SellTable
