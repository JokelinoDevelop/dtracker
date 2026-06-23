export function sleep(ms: number): Promise<void> {
  // oxlint-disable-next-line promise/avoid-new no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, ms));
}
