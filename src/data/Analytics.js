// src/data/analytics.js
export const MONTH_NAMES = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

export function parseDateToParts(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return { year: y, monthIndex: m - 1, day: d };
}

export function inPeriod(tx, mode, year, monthIndex) {
  const p = parseDateToParts(tx.date);
  if (mode === "year") return p.year === year;
  return p.year === year && p.monthIndex === monthIndex;
}

export function money(n) {
  return Math.abs(Number(n)).toFixed(2);
}

export function computeAnalytics(transactions, mode, year, monthIndex) {
  const filtered = transactions.filter(tx => inPeriod(tx, mode, year, monthIndex));

  let incomeTotal = 0;
  let expenseTotal = 0; // store as positive

  const expenseByCategory = new Map();

  for (const tx of filtered) {
    const amt = Number(tx.amount);

    if (amt >= 0) {
      incomeTotal += amt;
    } else {
      const abs = Math.abs(amt);
      expenseTotal += abs;
      const cat = tx.category || "other";
      expenseByCategory.set(cat, (expenseByCategory.get(cat) || 0) + abs);
    }
  }

  const rows = [
    { key: "income", label: "INCOME", type: "income", amount: incomeTotal },
    ...Array.from(expenseByCategory.entries())
      .map(([category, amount]) => ({
        key: category,
        label: category.toUpperCase(),
        type: "expense",
        amount,
      }))
      .sort((a, b) => b.amount - a.amount),
  ];

  const total = incomeTotal + expenseTotal;
  const incomePct = total > 0 ? (incomeTotal / total) * 100 : 0;
  const expensePct = total > 0 ? (expenseTotal / total) * 100 : 0;

  return { incomeTotal, expenseTotal, rows, pie: { incomePct, expensePct } };
}

