export enum RemainStatus {
  Plenty = 'plenty', // x >= 100 (green)
  Some = 'some', // 30 <= x < 100 (yellow)
  Few = 'few', // 2 <= x < 30 (red)
  Empty = 'empty', // x <= 1 (gray)
  Break = 'break', // stop sales
}
