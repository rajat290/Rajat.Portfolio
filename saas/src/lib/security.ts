const prohibitedPattern = /<\s*\/?\s*script.*?>/gi;

export function sanitizeString(value: string) {
  return value.replace(prohibitedPattern, "");
}

export function sanitizePortfolioJson<T extends Record<string, any>>(data: T): T {
  return JSON.parse(
    JSON.stringify(data, (_, value) => {
      if (typeof value === "string") {
        return sanitizeString(value);
      }
      return value;
    })
  );
}


