type ParsedNumberMap = Record<string, number>;


export function stringToObject(input:unknown): ParsedNumberMap {
    if (!input) {
        throw new Error("value not provided");
    }
    
    // Guard: must be a string
    if (typeof input !== "string") {
        throw new TypeError("Input must be a string");
    }

    const result: ParsedNumberMap = Object.create(null);

    // Split by commas safely
    const pairs = input.split(",");

    for (const pair of pairs) {
        const trimmed = pair.trim();

        // Skip empty segments (e.g. trailing commas)
        if (!trimmed) continue;

        const separatorIndex = trimmed.indexOf(":");

        // Guard: must contain exactly one colon
        if (separatorIndex === -1) {
            throw new Error(`Invalid key-value pair: "${trimmed}"`);
        }

        const key = trimmed.slice(0, separatorIndex).trim();
        const rawValue = trimmed.slice(separatorIndex + 1).trim();

        // Guard: key validation
        if (!key) {
            throw new Error(`Empty key detected in "${trimmed}"`);
        }

        // Prevent prototype pollution
        if (key === "__proto__" || key === "constructor" || key === "prototype") {
            throw new Error(`Unsafe key detected: "${key}"`);
        }

        // Parse and validate number
        const value = Number(rawValue);

        if (!Number.isFinite(value)) {
            throw new Error(`Invalid numeric value for key "${key}": "${rawValue}"`);
        }

        result[key] = value;
    }

    return result;
}

export function isValidIngredientOption(obj) {
    if (typeof obj !== 'object') throw new Error("not valid object");
    
    return (
        obj.optionName !== undefined &&
        obj.optionName !== '' &&
        obj.options !== undefined &&
        obj.options.length > 0
    )
}

export function objectToText(obj: Record<string, number>): string {
  return Object.entries(obj)
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");
}
