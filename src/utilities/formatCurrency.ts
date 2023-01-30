const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
});

export function formatCurrency(value: number): string {
    return CURRENCY_FORMATTER.format(value);
}