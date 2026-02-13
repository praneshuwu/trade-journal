# Trade Journal

A simple trade journal app I built to track my buy and sell legs for each position. You can add trades, log entries with price and quantity, and close them out when done.

## What it does

- Add trades with a symbol and direction (long or short)
- Log individual buy and sell legs with price, quantity, and date
- Click any leg to edit it in a modal
- Close or reopen a trade once you're done with it
- Everything saves to localStorage so the data sticks around on reload

## Tech

- React 18 with Vite
- Tailwind CSS v4
- useReducer for state management
- localStorage for persistence

## Running it locally

Make sure you have Node.js installed, then:

```
npm install
npm run dev
```

That's it. Opens at http://localhost:5173.

## Project structure

```
src/
  components/
    TradeJournal.jsx   - main container with stats and add trade form
    TradeRow.jsx       - single trade row with the three-column layout
    BuyTable.jsx       - table of buy legs
    SellTable.jsx      - table of sell legs
    TradeMeta.jsx      - center column with direction, status, close button
    AddLegModal.jsx    - modal for adding or editing a leg
    TradeStatusBadge.jsx
  reducer/
    journalReducer.js  - all state logic in one place
  data/
    mockData.js        - initial seed data loaded on first visit
```
