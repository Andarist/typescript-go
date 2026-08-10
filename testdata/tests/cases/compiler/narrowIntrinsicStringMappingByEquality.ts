// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/63724

function narrowUppercase(prefix: Uppercase<string>) {
    let countryCode: "BE" | "LU" | "NL";

    if (prefix === "BE" || prefix === "LU" || prefix === "NL") {
        countryCode = prefix;
    }

    if (prefix === "be") {
        countryCode = prefix;
    }
}

function narrowLowercase(prefix: Lowercase<string>) {
    let countryCode: "be" | "lu" | "nl";

    if (prefix === "be" || prefix === "lu" || prefix === "nl") {
        countryCode = prefix;
    }

    if (prefix === "BE") {
        countryCode = prefix;
    }
}

function narrowCapitalize(country: Capitalize<string>) {
    let countryName: "Belgium" | "Luxembourg" | "Netherlands";

    if (country === "Belgium" || country === "Luxembourg" || country === "Netherlands") {
        countryName = country;
    }

    if (country === "belgium") {
        countryName = country;
    }
}

function narrowUncapitalize(country: Uncapitalize<string>) {
    let countryName: "belgium" | "luxembourg" | "netherlands";

    if (country === "belgium" || country === "luxembourg" || country === "netherlands") {
        countryName = country;
    }

    if (country === "Belgium") {
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

    if (prefix === "foo-BAR") {
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

function narrowUncapitalizePattern(prefix: Uncapitalize<`Foo-${string}`>) {
    let pattern: "foo-bar" | "foo-baz";

    if (prefix === "foo-bar" || prefix === "foo-baz") {
        pattern = prefix;
    }

    if (prefix === "Foo-bar") {
        pattern = prefix;
    }
}

function narrowUppercaseSuffixPattern(suffix: Uppercase<`${string}-foo`>) {
    let pattern: "BAR-FOO" | "BAZ-FOO";

    if (suffix === "BAR-FOO" || suffix === "BAZ-FOO") {
        pattern = suffix;
    }

    if (suffix === "bar-FOO") {
        pattern = suffix;
    }
}

function narrowLowercaseSuffixPattern(suffix: Lowercase<`${string}-FOO`>) {
    let pattern: "bar-foo" | "baz-foo";

    if (suffix === "bar-foo" || suffix === "baz-foo") {
        pattern = suffix;
    }

    if (suffix === "BAR-foo") {
        pattern = suffix;
    }
}

function narrowCapitalizeSuffixPattern(suffix: Capitalize<`${string}-foo`>) {
    let pattern: "Bar-foo" | "Baz-foo";

    if (suffix === "Bar-foo" || suffix === "Baz-foo") {
        pattern = suffix;
    }

    if (suffix === "bar-foo") {
        pattern = suffix;
    }
}

function narrowUncapitalizeSuffixPattern(suffix: Uncapitalize<`${string}-foo`>) {
    let pattern: "bar-foo" | "baz-foo";

    if (suffix === "bar-foo" || suffix === "baz-foo") {
        pattern = suffix;
    }

    if (suffix === "Bar-foo") {
        pattern = suffix;
    }
}
