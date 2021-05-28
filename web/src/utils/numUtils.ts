
const THOUSAND_SEPARATOR_EXP = /\B(?=(\d{3})+(?!\d))/g

/**
 * Converts a number to "1.000.000,00" format.
 */
export function displayAsBrazilian(number: number, decimals = 0) {
  return (number ?? 0)
    .toFixed(decimals)
    .replace('.', ',')
    .replace(THOUSAND_SEPARATOR_EXP, '.')
}
