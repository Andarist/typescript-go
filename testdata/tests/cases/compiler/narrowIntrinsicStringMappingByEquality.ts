// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/63724

let countryCode: "BE" | "LU" | "NL";

declare const prefix: Uppercase<string>;

if (prefix === "BE" || prefix === "LU" || prefix === "NL") {
    countryCode = prefix;
}

let lowerCountryCode: "be" | "lu" | "nl";

declare const lowerPrefix: Lowercase<string>;

if (lowerPrefix === "be" || lowerPrefix === "lu" || lowerPrefix === "nl") {
    lowerCountryCode = lowerPrefix;
}

let capitalizedCountryCode: "Belgium" | "Luxembourg" | "Netherlands";

declare const capitalizedCountry: Capitalize<string>;

if (capitalizedCountry === "Belgium" || capitalizedCountry === "Luxembourg" || capitalizedCountry === "Netherlands") {
    capitalizedCountryCode = capitalizedCountry;
}

let uncapitalizedCountryCode: "belgium" | "luxembourg" | "netherlands";

declare const uncapitalizedCountry: Uncapitalize<string>;

if (uncapitalizedCountry === "belgium" || uncapitalizedCountry === "luxembourg" || uncapitalizedCountry === "netherlands") {
    uncapitalizedCountryCode = uncapitalizedCountry;
}

let upperPattern: "FOO-BAR" | "FOO-BAZ";

declare const upperPatternPrefix: Uppercase<`foo-${string}`>;

if (upperPatternPrefix === "FOO-BAR" || upperPatternPrefix === "FOO-BAZ") {
    upperPattern = upperPatternPrefix;
}

let lowerPattern: "foo-bar" | "foo-baz";

declare const lowerPatternPrefix: Lowercase<`FOO-${string}`>;

if (lowerPatternPrefix === "foo-bar" || lowerPatternPrefix === "foo-baz") {
    lowerPattern = lowerPatternPrefix;
}

let capitalizedPattern: "Foo-bar" | "Foo-baz";

declare const capitalizedPatternPrefix: Capitalize<`foo-${string}`>;

if (capitalizedPatternPrefix === "Foo-bar" || capitalizedPatternPrefix === "Foo-baz") {
    capitalizedPattern = capitalizedPatternPrefix;
}

// These literals aren't members of the corresponding string mapping types.
if (lowerPrefix === "BE" || lowerPrefix === "LU" || lowerPrefix === "NL") {
    countryCode = lowerPrefix;
}

if (upperPatternPrefix === "foo-bar") {
    upperPattern = upperPatternPrefix;
}

if (capitalizedPatternPrefix === "foo-bar") {
    capitalizedPattern = capitalizedPatternPrefix;
}
