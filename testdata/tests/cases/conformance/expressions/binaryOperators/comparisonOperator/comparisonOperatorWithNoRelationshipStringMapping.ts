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
