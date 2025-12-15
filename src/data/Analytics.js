export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function parseDateToParts(dateStr) {
  const parts = dateStr.split("-");
  const year = Number(parts[0]);
  const month = Number(parts[1]);
  const day = Number(parts[2]);

  return { year, monthIndex: month - 1, day };
}

export function inPeriod(transaction, mode, year, monthIndex) {
  const parsedDate = parseDateToParts(transaction.date);

  if (mode === "year") {
    return parsedDate.year === year;
  }
  return (
    parsedDate.year === year &&
    parsedDate.monthIndex === monthIndex
  );
}

export function money(amount) {
  return Math.abs(Number(amount)).toFixed(2);
}

export function computeAnalytics(transactions, mode, year, monthIndex) {
  const filteredTransactions = transactions.filter(transaction =>
    inPeriod(transaction, mode, year, monthIndex)
  );

  let income = 0;
  let expenses = 0;

  const expenseByCategory = {};

  for (let i = 0; i < filteredTransactions.length; i++) {
    const transaction = filteredTransactions[i];
    const amount = Number(transaction.amount);

    if (amount >= 0) {
      income += amount;
    } else {
      const spent = Math.abs(amount);
      expenses += spent;

      const category = transaction.category || "other";

      if (!expenseByCategory[category]) {
        expenseByCategory[category] = 0;
      }
      expenseByCategory[category] += spent;
    }
  }

  const rows = [
    { key: "income", label: "INCOME", type: "income", amount: income },
  ];

  const expenseRows = Object.keys(expenseByCategory)
    .map(category => ({
      key: category,
      label: category.toUpperCase(),
      type: "expense",
      amount: expenseByCategory[category],
    }))
    .sort((a, b) => b.amount - a.amount);

  rows.push(...expenseRows);

  const total = income + expenses;
  const incomePct = total ? (income / total) * 100 : 0;
  const expensePct = total ? (expenses / total) * 100 : 0;

  return {
    incomeTotal: income,
    expenseTotal: expenses,
    rows,
    pie: { incomePct, expensePct },
  };
}
