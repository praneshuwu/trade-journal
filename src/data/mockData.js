export const initialJournal = {
  journal_id: "journal-2025-05",
  trades: [
    {
      trade_id: "trade-001",
      symbol: "AAA",
      direction: "LONG",
      status: "OPEN",
      setup: null,
      opened_at: "2025-05-25",
      buy: [
        { leg_id: "b-001-1", price: "0", quantity: "0", date: "2025-05-25" },
        { leg_id: "b-001-2", price: "0", quantity: "0", date: "2025-05-25" },
        { leg_id: "b-001-3", price: "0", quantity: "0", date: "2025-05-25" },
      ],
      sell: [
        { leg_id: "s-001-1", price: "0", quantity: "0", date: "2025-05-25" },
        { leg_id: "s-001-2", price: "0", quantity: "0", date: "2025-05-25" },
        { leg_id: "s-001-3", price: "0", quantity: "0", date: "2025-05-25" },
      ],
      notes: "",
    },
    {
      trade_id: "trade-002",
      symbol: "MSFT",
      direction: "SHORT",
      status: "OPEN",
      setup: null,
      opened_at: "2025-09-09",
      buy: [
        { leg_id: "b-002-1", price: "3", quantity: "3", date: "2025-09-09" },
      ],
      sell: [],
      notes: "",
    },
    {
      trade_id: "trade-003",
      symbol: "ALPHA",
      direction: "LONG",
      status: "OPEN",
      setup: null,
      opened_at: "2025-05-25",
      buy: [],
      sell: [],
      notes: "",
    },
  ],
}
