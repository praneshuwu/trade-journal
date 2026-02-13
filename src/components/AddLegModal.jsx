import { useState, useEffect } from "react"

function AddLegModal({ tradeId, symbol, side, leg, onClose, dispatch }) {
  const [price, setPrice] = useState(leg?.price ?? "")
  const [quantity, setQuantity] = useState(leg?.quantity ?? "")
  const [date, setDate] = useState(leg?.date ?? new Date().toISOString().split("T")[0])

  const isEdit = !!leg
  const isBuy = side === "buy"
  const accentColor = isBuy ? "var(--long-stripe)" : "var(--short-stripe)"
  const accentText = isBuy ? "var(--long-text)" : "var(--short-text)"
  const accentBadge = isBuy ? "var(--long-badge)" : "var(--short-badge)"
  const accentBadgeBorder = isBuy ? "var(--long-badge-border)" : "var(--short-badge-border)"

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [onClose])

  function handleSubmit(e) {
    e.preventDefault()
    if (!price || !quantity) return
    if (isEdit) {
      dispatch({
        type: "UPDATE_LEG_VALUES",
        tradeId,
        legId: leg.leg_id,
        side,
        price,
        quantity,
        date,
      })
    } else {
      dispatch({
        type: "ADD_LEG_WITH_VALUES",
        tradeId,
        side,
        price,
        quantity,
        date,
      })
    }
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-enter"
      style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
      onClick={onClose}
    >
      <div
        className="modal-enter relative rounded-2xl overflow-hidden w-[400px]"
        style={{
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--edge)",
          boxShadow: "0 32px 100px rgba(0,0,0,0.7)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-[3px]" style={{ backgroundColor: accentColor }} />

        <div className="p-8">
          <div className="mb-8">
            <span
              className="font-data text-[9px] tracking-[3px] uppercase"
              style={{ color: accentText }}
            >
              {symbol} · {side.toUpperCase()}
            </span>
            <h2
              className="font-display text-[28px] italic mt-1 leading-tight"
              style={{ color: "var(--text-1)" }}
            >
              {isEdit
                ? `Edit ${isBuy ? "Buy" : "Sell"} Leg`
                : `New ${isBuy ? "Buy" : "Sell"} Leg`}
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-7"
            style={{ "--field-accent": accentColor }}
          >
            <label className="flex flex-col gap-2">
              <span
                className="font-data text-[9px] tracking-[3px] uppercase"
                style={{ color: "var(--text-2)" }}
              >
                Price
              </span>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                autoFocus
                className="field-input"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span
                className="font-data text-[9px] tracking-[3px] uppercase"
                style={{ color: "var(--text-2)" }}
              >
                Quantity
              </span>
              <input
                type="number"
                step="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="0"
                className="field-input"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span
                className="font-data text-[9px] tracking-[3px] uppercase"
                style={{ color: "var(--text-2)" }}
              >
                Date
              </span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="field-input field-date font-data"
              />
            </label>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl font-data text-[11px] tracking-[3px] uppercase font-semibold transition-colors"
                style={{
                  backgroundColor: accentBadge,
                  color: accentText,
                  border: `1px solid ${accentBadgeBorder}`,
                }}
              >
                {isEdit ? "Update" : "Add Leg"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="btn-ghost"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddLegModal
