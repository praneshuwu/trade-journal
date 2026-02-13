function AddLegButton({ onClick, label, disabled, side }) {
  const isBuy = side === "buy"

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`mt-2 text-[11px] px-3 py-1 rounded border transition-colors disabled:opacity-20 disabled:cursor-not-allowed ${
        isBuy
          ? "border-emerald-800/50 text-emerald-600 hover:border-emerald-600/70 hover:text-emerald-400"
          : "border-rose-800/50 text-rose-600 hover:border-rose-600/70 hover:text-rose-400"
      }`}
    >
      {label}
    </button>
  )
}

export default AddLegButton
