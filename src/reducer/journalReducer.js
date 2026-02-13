function makeId() {
  return `leg-${Date.now()}-${Math.floor(Math.random() * 9999)}`
}

export function journalReducer(state, action) {
  switch (action.type) {
    case "ADD_LEG_WITH_VALUES": {
      const leg = {
        leg_id: makeId(),
        price: action.price,
        quantity: action.quantity,
        date: action.date,
      }
      return {
        ...state,
        trades: state.trades.map((t) =>
          t.trade_id === action.tradeId
            ? { ...t, [action.side]: [...t[action.side], leg] }
            : t
        ),
      }
    }

    case "UPDATE_LEG_VALUES":
      return {
        ...state,
        trades: state.trades.map((t) => {
          if (t.trade_id !== action.tradeId) return t
          return {
            ...t,
            [action.side]: t[action.side].map((leg) =>
              leg.leg_id === action.legId
                ? { ...leg, price: action.price, quantity: action.quantity, date: action.date }
                : leg
            ),
          }
        }),
      }

    case "DELETE_LEG":
      return {
        ...state,
        trades: state.trades.map((t) => {
          if (t.trade_id !== action.tradeId) return t
          return {
            ...t,
            [action.side]: t[action.side].filter((leg) => leg.leg_id !== action.legId),
          }
        }),
      }

    case "ADD_TRADE":
      return {
        ...state,
        trades: [...state.trades, action.trade],
      }

    case "UPDATE_TRADE_STATUS":
      return {
        ...state,
        trades: state.trades.map((t) =>
          t.trade_id === action.tradeId ? { ...t, status: action.status } : t
        ),
      }

    default:
      return state
  }
}
