export const camelCaseToKebabCase = (str: string) => str.replace(/([A-Z])/g, ($1) => `-${$1.toLowerCase()}`);
