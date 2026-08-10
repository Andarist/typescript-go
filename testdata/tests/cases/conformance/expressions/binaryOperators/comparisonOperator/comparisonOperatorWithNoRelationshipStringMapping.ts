// @noEmit: true

function compareUppercase(foo: Uppercase<string>) {
    if (foo === "BA") {} // No error
    if (foo === "ba") {} // Error
}

function compareLowercase(foo: Lowercase<string>) {
    if (foo === "ba") {} // No error
    if (foo === "BA") {} // Error
}

function compareCapitalize(foo: Capitalize<string>) {
    if (foo === "Ba") {} // No error
    if (foo === "ba") {} // Error
}

function compareUncapitalize(foo: Uncapitalize<string>) {
    if (foo === "ba") {} // No error
    if (foo === "Ba") {} // Error
}

function compareUppercasePattern(foo: Uppercase<`foo-${string}`>) {
    if (foo === "FOO-BA") {} // No error
    if (foo === "FOO-ba") {} // Error
}

function compareLowercasePattern(foo: Lowercase<`FOO-${string}`>) {
    if (foo === "foo-ba") {} // No error
    if (foo === "foo-BA") {} // Error
}

function compareCapitalizePattern(foo: Capitalize<`foo-${string}`>) {
    if (foo === "Foo-ba") {} // No error
    if (foo === "foo-ba") {} // Error
}

function compareUncapitalizePattern(foo: Uncapitalize<`Foo-${string}`>) {
    if (foo === "foo-ba") {} // No error
    if (foo === "Foo-ba") {} // Error
}

function compareTemplate(foo: `foo-${string}`) {
    if (foo === "foo-c") {} // No error
    if (foo === "bar-c") {} // Error
}

function compareUppercaseUnion(foo: Uppercase<string> | number) {
    if (foo === "BA") {} // No error
    if (foo === "ba") {} // Error
}

function compareUppercaseUnionWithLiteral(foo: Uppercase<string> | "ba") {
    if (foo === "ba") {} // No error
}

function compareStringMappingUnion(foo: Uppercase<string> | Lowercase<string>) {
    if (foo === "BA") {} // No error
    if (foo === "ba") {} // No error
    if (foo === "Ba") {} // Error
}

function compareUppercaseIntersection(foo: Uppercase<string> & { __brand: "uppercase" }) {
    if (foo === "BA") {} // No error
    if (foo === "ba") {} // Error
}

function compareGenericUppercase<T extends string>(foo: Uppercase<T>) {
    if (foo === "BA") {} // No error
    if (foo === "ba") {} // Error
}

function compareConstrainedGenericUppercase<T extends "ba" | "bb">(foo: Uppercase<T>) {
    if (foo === "BA") {} // No error
    if (foo === "BC") {} // Error
}

function compareGenericUppercaseUnion<T extends string>(foo: Uppercase<T> | number) {
    if (foo === "BA") {} // No error
}

function compareGenericUppercaseIntersection<T extends string>(foo: Uppercase<T> & { __brand: "uppercase" }) {
    if (foo === "BA") {} // No error
}

type BrandedString = string & { __brand: "input" };

function compareUppercaseBrandedString(foo: Uppercase<BrandedString>) {
    if (foo === "BA") {} // No error
}

function compareGenericTemplate<T extends string>(foo: `foo-${T}`) {
    if (foo === "foo-ba") {} // Error
}

function compareConstrainedGenericTemplate<T extends "ba" | "bb">(foo: `foo-${T}`) {
    if (foo === "foo-ba") {} // No error
    if (foo === "foo-bc") {} // Error
}

function compareBrandedTemplate(foo: `${BrandedString}`) {
    if (foo === "ba") {} // Error
}

enum StringMappingComparisonValue {
    Uppercase = "BA",
    Lowercase = "ba",
}

function compareUppercaseEnum(foo: Uppercase<string>) {
    if (foo === StringMappingComparisonValue.Uppercase) {} // No error
    if (foo === StringMappingComparisonValue.Lowercase) {} // Error
}

enum TemplateComparisonValue {
    Match = "foo-ba",
    Miss = "bar-ba",
}

function compareTemplateEnum(foo: `foo-${string}`) {
    if (foo === TemplateComparisonValue.Match) {} // No error
    if (foo === TemplateComparisonValue.Miss) {} // Error
}
