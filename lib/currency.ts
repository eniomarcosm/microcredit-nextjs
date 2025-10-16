export function currencyFormat(
  amount: number | string | null | undefined,
  currency = "MZN",
  locale = "pt-MZ"
) {
  // Handle null/undefined
  if (amount == null) return "";

  // Handle string inputs
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  // Handle NaN
  if (isNaN(numAmount)) return "";

  try {
    // Format just the number part
    const numberPart = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numAmount);

    return `${numberPart} ${currency}`;
  } catch (error) {
    // Fallback formatting
    return `${numAmount.toFixed(2)} ${currency}`;
  }
}
