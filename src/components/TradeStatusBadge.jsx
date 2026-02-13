function TradeStatusBadge({ status }) {
  const isOpen = status === "OPEN"
  return (
    <span
      className="font-data text-[8px] font-semibold tracking-[1.5px] uppercase px-2.5 py-1 rounded-full"
      style={{
        color: isOpen ? "var(--long-text)" : "var(--text-2)",
        backgroundColor: isOpen ? "var(--long-badge)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${isOpen ? "var(--long-badge-border)" : "var(--edge)"}`,
      }}
    >
      {status}
    </span>
  )
}

export default TradeStatusBadge
