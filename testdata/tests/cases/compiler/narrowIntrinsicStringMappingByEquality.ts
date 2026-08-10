// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/63724

function narrowUppercase(prefix: Uppercase<string>) {
    let countryCode: "BE" | "LU" | "NL";

    if (prefix === "BE" || prefix === "LU" || prefix === "NL") {
        countryCode = prefix;
    }
}

function narrowLowercase(prefix: Lowercase<string>) {
    let countryCode: "be" | "lu" | "nl";

    if (prefix === "be" || prefix === "lu" || prefix === "nl") {
        countryCode = prefix;
    }

    let uppercaseCountryCode: "BE" | "LU" | "NL";

    if (prefix === "BE" || prefix === "LU" || prefix === "NL") {
        uppercaseCountryCode = prefix;
    }
}

function narrowCapitalize(country: Capitalize<string>) {
    let countryName: "Belgium" | "Luxembourg" | "Netherlands";

    if (country === "Belgium" || country === "Luxembourg" || country === "Netherlands") {
        countryName = country;
    }
}

function narrowUncapitalize(country: Uncapitalize<string>) {
    let countryName: "belgium" | "luxembourg" | "netherlands";

    if (country === "belgium" || country === "luxembourg" || country === "netherlands") {
        countryName = country;
    }
}

function narrowUppercasePattern(prefix: Uppercase<`foo-${string}`>) {
    let pattern: "FOO-BAR" | "FOO-BAZ";

    if (prefix === "FOO-BAR" || prefix === "FOO-BAZ") {
        pattern = prefix;
    }

    if (prefix === "foo-bar") {
        pattern = prefix;
    }
}

function narrowLowercasePattern(prefix: Lowercase<`FOO-${string}`>) {
    let pattern: "foo-bar" | "foo-baz";

    if (prefix === "foo-bar" || prefix === "foo-baz") {
        pattern = prefix;
    }
}

function narrowCapitalizePattern(prefix: Capitalize<`foo-${string}`>) {
    let pattern: "Foo-bar" | "Foo-baz";

    if (prefix === "Foo-bar" || prefix === "Foo-baz") {
        pattern = prefix;
    }

    if (prefix === "foo-bar") {
        pattern = prefix;
    }
}
