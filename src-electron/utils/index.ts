export async function delay(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(null), milliseconds);
  });
}

export async function timeout<T>(
  task: Promise<T>,
  milliseconds: number = 1000 * 10,
): Promise<T> {
  const expiredAt = setTimeout(() => {
    throw new Error('Timeout');
  }, milliseconds);
  try {
    return await task;
  } catch (e) {
    throw e;
  } finally {
    clearTimeout(expiredAt);
  }
}

/**
 * 
 */
export function parseNumber(text: string) {
  return parseFloat(text.replace(/[^\d-.]/g, ''));
}
