# ⚡ Day 20 of Frontend: JavaScript Data Types, Operators & Type Conversion

Welcome to **Day 20 of the 100 Days Frontend Challenge**! Today, we dive into the core foundations of JavaScript: mastering the **8 Data Types**, understanding how memory is partitioned between the **Stack and Heap**, exploring all major **Operators** (including modern ES2020 additions like `??` and `?.`), and unravelling **Type Conversion** (explicit casting vs implicit coercion) along with the famous JavaScript quirks that appear in frontend interviews.

🔗 **Repository:** [harish-0987/DAY-20-OF-FRONTEND](https://github.com/harish-0987/DAY-20-OF-FRONTEND)

---

## 📑 Table of Contents
1. [JavaScript Data Types Overview](#-javascript-data-types-overview)
2. [Primitive vs Reference Types (Stack vs Heap Memory)](#-primitive-vs-reference-types-stack-vs-heap-memory)
3. [The Quirks of `typeof`](#-the-quirks-of-typeof)
4. [Mastery of JavaScript Operators](#-mastery-of-javascript-operators)
   - [Arithmetic Operators](#1-arithmetic-operators)
   - [Assignment Operators](#2-assignment-operators)
   - [Comparison Operators (Loose `==` vs Strict `===`)](#3-comparison-operators-loose--vs-strict-)
   - [Logical Operators & Short-Circuit Evaluation](#4-logical-operators--short-circuit-evaluation)
   - [Modern Operators: Nullish Coalescing (`??`) & Optional Chaining (`?.`)](#5-modern-operators-nullish-coalescing--optional-chaining-)
   - [Unary, Ternary & Special Operators](#6-unary-ternary--special-operators)
5. [Operator Precedence & Associativity](#-operator-precedence--associativity)
6. [Type Conversion: Explicit Casting vs Implicit Coercion](#-type-conversion-explicit-casting-vs-implicit-coercion)
   - [String Conversion](#1-string-conversion)
   - [Numeric Conversion](#2-numeric-conversion)
   - [Boolean Conversion (Truthy vs Falsy Deep Dive)](#3-boolean-conversion-truthy-vs-falsy-deep-dive)
7. [Famous JavaScript Type Quirks & Gotchas](#-famous-javascript-type-quirks--gotchas)
8. [Real-World Frontend Practical Use Cases](#-real-world-frontend-practical-use-cases)
9. [Top Frontend Interview Questions & Answers](#-top-frontend-interview-questions--answers)
10. [Summary & Key Takeaways](#-summary--key-takeaways)

---

## 💎 JavaScript Data Types Overview

JavaScript is a **dynamically typed language**, meaning variables do not hold fixed types; instead, **values** hold types. A variable can hold a string at one moment and a number the next.

As of modern ECMAScript, JavaScript has **8 built-in Data Types**, categorized into **7 Primitives** and **1 Reference Type (Object)**:

```
                          ┌───────────────────────────┐
                          │   JAVASCRIPT DATA TYPES   │
                          └─────────────┬─────────────┘
                ┌───────────────────────┴───────────────────────┐
                ▼                                               ▼
     ┌──────────────────────┐                       ┌──────────────────────┐
     │   PRIMITIVE TYPES    │                       │   REFERENCE TYPES    │
     │      (7 Types)       │                       │     (Object-based)   │
     ├──────────────────────┤                       ├──────────────────────┤
     │  1. String           │                       │  1. Plain Object {}  │
     │  2. Number           │                       │  2. Array []         │
     │  3. BigInt           │                       │  3. Function () {}   │
     │  4. Boolean          │                       │  4. Date             │
     │  5. Undefined        │                       │  5. RegExp           │
     │  6. Null             │                       │  6. Map / Set        │
     │  7. Symbol           │                       │  7. Promises / etc.  │
     └──────────────────────┘                       └──────────────────────┘
```

### The 7 Primitive Types

| Primitive Type | Description | Example Values | `typeof` Output |
| :--- | :--- | :--- | :--- |
| **`string`** | Textual data enclosed in single (`'`), double (`"`), or backticks (```) | `'Frontend'`, `"JS"`, `` `Hello ${name}` `` | `"string"` |
| **`number`** | 64-bit IEEE 754 floating-point numbers (integers & decimals) | `42`, `3.1415`, `-10`, `Infinity`, `NaN` | `"number"` |
| **`bigint`** | Arbitrary-precision integers beyond `Number.MAX_SAFE_INTEGER` | `9007199254740995n`, `BigInt(100)` | `"bigint"` |
| **`boolean`** | Logical entities representing truth values | `true`, `false` | `"boolean"` |
| **`undefined`** | Automatically assigned to declared variables with no value | `let x;` (x is `undefined`) | `"undefined"` |
| **`null`** | Intentional absence of any object value / empty reference | `const activeUser = null;` | `"object"` *(legacy bug)* |
| **`symbol`** | Unique, immutable identifier primarily used for object property keys | `Symbol('id')`, `Symbol.for('key')` | `"symbol"` |

---

## 🧠 Primitive vs Reference Types (Stack vs Heap Memory)

Understanding how JavaScript stores values in memory is critical for avoiding subtle mutation bugs and mastering interviews.

```
┌───────────────────────────────────────┐       ┌───────────────────────────────────────┐
│              CALL STACK               │       │                 HEAP                  │
│   (Fast, fixed size, static memory)   │       │  (Dynamic, unorganized object pool)   │
├───────────────────────────────────────┤       ├───────────────────────────────────────┤
│ age     ──► 25                        │       │                                       │
│ name    ──► "Harish"                  │       │  Address #0x101:                      │
│ isReady ──► true                      │       │  { name: "Harish", role: "Dev" }      │
│ user    ──► Pointer [#0x101] ─────────┼───────┼──────────┘                            │
│ skills  ──► Pointer [#0x202] ─────────┼───────┼──► Address #0x202:                    │
│                                       │       │    ["HTML", "CSS", "JS"]              │
└───────────────────────────────────────┘       └───────────────────────────────────────┘
```

### 1. Primitive Types (Stored by Value in Call Stack)
- Stored directly in the memory stack.
- **Immutable:** The value itself cannot be mutated; reassigning replaces the value completely.
- **Copied by value:** Copying creates an independent second copy in memory.

```javascript
let a = 10;
let b = a; // b receives a new copy of 10
b = 20;

console.log(a); // 10 (unaffected!)
console.log(b); // 20
```

### 2. Reference Types (Stored by Reference in Heap)
- Objects, Arrays, and Functions are stored in the memory **Heap**.
- The variable on the stack only holds a **pointer / memory reference** (e.g. `#0x101`) to the Heap location.
- **Mutable:** Properties can be modified without changing the variable's memory address.
- **Copied by reference:** Copying an object copies only the pointer, not the data!

```javascript
const userA = { name: "Harish", score: 95 };
const userB = userA; // Copies pointer #0x101, NOT a new object!

userB.score = 100;

console.log(userA.score); // 100 (Mutated through userB!)
console.log(userA === userB); // true (Points to identical heap address)
```

---

## 🕵️ The Quirks of `typeof`

The `typeof` operator returns a string representing the operand's type, but has three historical quirks every frontend developer must know:

### 1. `typeof null === "object"`
In the original 1995 JavaScript implementation, values were stored with type tags. The type tag for objects was `0`. Because `null` was represented as a NULL pointer (`0x00`), it had a `0` type tag and returned `"object"`. It is kept unchanged to avoid breaking legacy websites.

```javascript
// How to accurately check for null:
const value = null;
console.log(value === null); // true (Correct way)
```

### 2. `typeof NaN === "number"`
`NaN` stands for "Not-a-Number", but its data type is officially a numeric IEEE 754 floating-point state representing an unrepresentable or failed calculation (such as `'abc' * 5`).

```javascript
console.log(typeof NaN); // "number"
console.log(Number.isNaN(NaN)); // true
```

### 3. `typeof function === "function"`
Functions are technically callable objects under the hood (`Function extends Object`), but `typeof` returns `"function"` to make detecting callable entities easy.

```javascript
function greet() {}
console.log(typeof greet); // "function"
console.log(greet instanceof Object); // true
```

---

## ⚙️ Mastery of JavaScript Operators

An operator is a symbol capable of manipulating one or more operands (values or variables) to yield a result.

### 1. Arithmetic Operators
Used to perform mathematical calculations.

| Operator | Name | Syntax | Example | Result |
| :--- | :--- | :--- | :--- | :--- |
| `+` | Addition / Concatenation | `a + b` | `5 + 3` / `'Day ' + 20` | `8` / `'Day 20'` |
| `-` | Subtraction | `a - b` | `10 - 4` | `6` |
| `*` | Multiplication | `a * b` | `6 * 7` | `42` |
| `/` | Division | `a / b` | `15 / 3` | `5` |
| `%` | Modulus (Remainder) | `a % b` | `10 % 3` | `1` |
| `**` | Exponentiation (ES2016) | `a ** b` | `2 ** 3` | `8` |
| `++` | Increment (pre/post) | `++a` / `a++` | `let x = 5; x++;` | `6` |
| `--` | Decrement (pre/post) | `--a` / `a--` | `let x = 5; x--;` | `4` |

---

### 2. Assignment Operators
Assigns values to variables with optional arithmetic transformations.

```javascript
let count = 10;
count += 5;  // count = count + 5  (15)
count -= 3;  // count = count - 3  (12)
count *= 2;  // count = count * 2  (24)
count /= 4;  // count = count / 4  (6)
count %= 4;  // count = count % 4  (2)
count **= 3; // count = count ** 3 (8)

// Logical Assignment (ES2021)
let title = '';
title ||= 'Default Title'; // title becomes 'Default Title' if title is falsy
let port = 0;
port ??= 3000;             // port stays 0 because 0 is NOT nullish!
```

---

### 3. Comparison Operators (Loose `==` vs Strict `===`)

JavaScript provides two levels of equality testing:

```
Loose Equality (==)         Strict Equality (===)
   (Type Coercion)              (No Coercion)
┌─────────────────────┐     ┌─────────────────────┐
│ 1. Convert operands │     │ 1. Check data types │
│    to same type     │     │    If different ──► │ false
│ 2. Compare values   │     │ 2. Check values     │
└─────────────────────┘     └─────────────────────┘
```

#### Comparison Summary Table:
| Comparison | Loose (`==`) | Strict (`===`) | Explanation |
| :--- | :---: | :---: | :--- |
| `5 == '5'` | ✅ `true` | ❌ `false` | Strict verifies both type (`number` vs `string`) and value. |
| `0 == false` | ✅ `true` | ❌ `false` | `false` coerces to `0` in loose comparison. |
| `null == undefined` | ✅ `true` | ❌ `false` | Both are loosely equal by spec, but different types. |
| `"" == 0` | ✅ `true` | ❌ `false` | Empty string `""` coerces to numeric `0`. |
| `[1, 2] == '1,2'` | ✅ `true` | ❌ `false` | Array converts via `.toString()` to `'1,2'`. |
| `NaN == NaN` | ❌ `false` | ❌ `false` | `NaN` is not equal to anything, even itself! |

> [!TIP]
> **Best Practice:** Always use strict equality (`===` and `!==`) to eliminate hidden coercion bugs. Only use `== null` when you intentionally want to check if a value is either `null` or `undefined` simultaneously.

---

### 4. Logical Operators & Short-Circuit Evaluation

Logical operators handle boolean logic and perform **short-circuit evaluation** (they return the actual operand value, not necessarily a boolean!).

#### Logical AND (`&&`)
Returns the **first falsy value**, or the **last truthy value** if all are truthy.
```javascript
console.log('Cat' && 'Dog'); // 'Dog' (both truthy, returns last)
console.log(null && 'Dog');  // null  (first falsy operand encountered)
console.log(0 && false);     // 0     (stops immediately at 0)
```

#### Logical OR (`||`)
Returns the **first truthy value**, or the **last falsy value** if all are falsy.
```javascript
console.log('Harish' || 'Guest'); // 'Harish' (first truthy)
console.log('' || 'Guest');       // 'Guest'  ('' is falsy)
console.log(0 || false || null);  // null     (all falsy, returns last)
```

#### Logical NOT (`!`)
Inverts truthiness to a strict boolean value (`true` or `false`).
```javascript
console.log(!true);   // false
console.log(!0);      // true
console.log(!!'text'); // true (Double-bang explicit boolean cast)
```

---

### 5. Modern Operators: Nullish Coalescing (`??`) & Optional Chaining (`?.`)

Modern JavaScript (ES2020) introduced two game-changing operators for frontend web applications:

#### 1. Nullish Coalescing (`??`) vs Logical OR (`||`)
- `||` falls back on **any falsy value** (`false`, `0`, `""`, `NaN`, `null`, `undefined`).
- `??` falls back **ONLY on nullish values** (`null` or `undefined`).

```javascript
const userSpeed = 0; // Valid setting: speed is 0 mph

// With OR (Bug! Overwrites valid 0):
const speedA = userSpeed || 50;
console.log(speedA); // 50 (Incorrect! 0 was treated as empty)

// With Nullish Coalescing (Safe! Preserves 0 and ""):
const speedB = userSpeed ?? 50;
console.log(speedB); // 0 (Correct! 0 is not null or undefined)
```

#### 2. Optional Chaining (`?.`)
Safely navigates through deeply nested object properties without throwing a `TypeError: Cannot read properties of undefined`:

```javascript
const response = {
    data: {
        user: {
            name: "Harish",
            // address is missing
        }
    }
};

// Without Optional Chaining (Crashes your app):
// const city = response.data.user.address.city; // 💥 TypeError!

// With Optional Chaining (Safe! Evaluates to undefined):
const city = response?.data?.user?.address?.city ?? 'Unknown City';
console.log(city); // "Unknown City"
```

---

### 6. Unary, Ternary & Special Operators

#### Unary Plus (`+`) & Unary Negation (`-`)
Converts operands into numbers fast:
```javascript
console.log(+"42");     // 42 (number)
console.log(+true);     // 1
console.log(+false);    // 0
console.log(+null);     // 0
console.log(+"");       // 0
console.log(+"hello");  // NaN
```

#### Conditional (Ternary) Operator (`? :`)
The only JavaScript operator taking three operands:
```javascript
const isLoggedIn = true;
const greeting = isLoggedIn ? "Welcome back!" : "Please sign in";
```

---

## 📊 Operator Precedence & Associativity

When multiple operators appear in one expression, JavaScript resolves them by **precedence** (highest priority first) and **associativity** (direction of evaluation).

```
Highest Priority ──►  Grouping: ()
                      Member Access: obj.prop, obj?.prop, arr[0]
                      Function Call: fn()
                      Postfix Increment: a++
                      Prefix Increment / Unary: ++a, typeof, +, -, !
                      Exponentiation: ** (Right-to-Left)
                      Multiplicative: *, /, %
                      Additive: +, -
                      Relational: <, <=, >, >=
                      Equality: ===, !==, ==, !=
                      Logical AND: &&
                      Logical OR: ||
                      Nullish Coalescing: ??
                      Conditional (Ternary): ? :
Lowest Priority  ──►  Assignment: =, +=, -=, ??=
```

---

## 🔄 Type Conversion: Explicit Casting vs Implicit Coercion

In JavaScript, type conversion happens in two distinct ways:
1. **Explicit Type Casting:** The developer intentionally converts types using built-in constructors (`Number()`, `String()`, `Boolean()`).
2. **Implicit Type Coercion:** JavaScript automatically converts types behind the scenes to execute an operation.

---

### 1. String Conversion

```javascript
// Explicit Conversion:
String(123);         // "123"
String(true);        // "true"
String(null);        // "null"
String(undefined);   // "undefined"
(100).toString();    // "100" (Fails on null & undefined)

// Implicit Coercion (Triggered by the '+' operator with any string):
"User ID: " + 42;    // "User ID: 42"
"5" + 2;             // "52" (Number 2 coerced to string)
"Result: " + true;   // "Result: true"
```

---

### 2. Numeric Conversion

```javascript
// Explicit Conversion:
Number("42");        // 42
Number("3.14");      // 3.14
Number("");          // 0 (Empty string is 0)
Number("   ");       // 0
Number("hello");     // NaN (Invalid numeric string)
Number(true);        // 1
Number(false);       // 0
Number(null);        // 0
Number(undefined);   // NaN

// String parsing functions:
parseInt("42px", 10);     // 42 (Stops parsing at non-digit)
parseFloat("3.14rem");    // 3.14

// Implicit Coercion (Triggered by mathematical operators: -, *, /, %, unary +):
"10" - 2;            // 8   (String "10" coerced to number 10)
"6" * "7";           // 42  (Both strings coerced to numbers)
"20" / 4;            // 5
+"99";               // 99
```

---

### 3. Boolean Conversion (Truthy vs Falsy Deep Dive)

JavaScript converts any value to a boolean when used in logical operations (`if`, `while`, `!`, `? :`).

#### The 8 Official Falsy Values in JavaScript:
Every single value in JavaScript is **truthy**, EXCEPT these exact **8 falsy values**:

1. `false`
2. `0` (positive zero)
3. `-0` (negative zero)
4. `0n` (BigInt zero)
5. `""` (empty string)
6. `null`
7. `undefined`
8. `NaN`

```javascript
// Everything else is TRUTHY! Even these famous deceptive values:
Boolean([])          // true  (Empty array is an Object!)
Boolean({})          // true  (Empty object is an Object!)
Boolean("0")         // true  (Non-empty string containing '0')
Boolean("false")     // true  (Non-empty string containing 'false')
Boolean(-1)          // true  (Any non-zero number is truthy)
Boolean(() => {})    // true  (Functions are objects)
```

---

## 🎭 Famous JavaScript Type Quirks & Gotchas

JavaScript's implicit type coercion rules lead to several famous expressions frequently asked in frontend interviews:

### 1. `'5' + 2` vs `'5' - 2`
```javascript
console.log('5' + 2); // '52' (The '+' operator prioritizes string concatenation)
console.log('5' - 2); // 3    (The '-' operator has no string meaning, so coerces to number)
```

### 2. `[] + []` and `[] + {}`
```javascript
console.log([] + []); // ""
// Explanation: Arrays convert to primitives via .toString(). [].toString() is "". "" + "" is "".

console.log([] + {}); // "[object Object]"
// Explanation: [].toString() is "", and {}.toString() is "[object Object]". "" + "[object Object]" = "[object Object]".
```

### 3. `true + true` and `true + false`
```javascript
console.log(true + true);  // 2 (true coerces to 1. 1 + 1 = 2)
console.log(true + false); // 1 (1 + 0 = 1)
```

### 4. `null + 1` vs `undefined + 1`
```javascript
console.log(null + 1);      // 1   (null coerces to number 0. 0 + 1 = 1)
console.log(undefined + 1); // NaN (undefined coerces to NaN. NaN + 1 = NaN)
```

### 5. `NaN === NaN`
```javascript
console.log(NaN === NaN); // false
// Under IEEE 754, NaN represents an invalid calculation and never equals any value, even itself!
// Use Number.isNaN(x) or Object.is(x, NaN) to check.
```

---

## 💻 Real-World Frontend Practical Use Cases

### 1. Parsing Form Inputs Safely
HTML `<input>` values always return strings (`event.target.value`), even when `type="number"`. Always coerce explicitly:
```javascript
const priceInput = document.querySelector('#price-input');
const rawValue = priceInput.value; // e.g. "299.95"

// Safe explicit parsing:
const price = parseFloat(rawValue) || 0;
```

### 2. Handling Default Values with Nullish Coalescing
```javascript
function renderBadge(count) {
    // 0 is a valid badge count! (0 notifications)
    const displayCount = count ?? 'N/A';
    return `<span class="badge">${displayCount}</span>`;
}
```

### 3. Safe API Response Traversal
```javascript
async function fetchUserProfile() {
    const res = await fetch('/api/user');
    const data = await res.json();
    
    // Clean, crash-proof access:
    const avatarUrl = data?.payload?.user?.profile?.avatarUrl ?? '/default-avatar.png';
}
```

---

## 🎯 Top Frontend Interview Questions & Answers

### Q1: What is the difference between `undefined` and `null`?
**Answer:**
- `undefined` means a variable has been declared but has not yet been assigned any value. It is JavaScript's default uninitialized state.
- `null` is an assignment value that represents an intentional absence of any object value. It is assigned programmatically by developers.
- `typeof undefined === "undefined"` whereas `typeof null === "object"` (due to a legacy 1995 bug).
- `undefined == null` is `true`, but `undefined === null` is `false`.

### Q2: Why does `0.1 + 0.2 !== 0.3` in JavaScript?
**Answer:**
JavaScript uses binary 64-bit floating-point arithmetic (IEEE 754). In binary base-2, fractional numbers like `0.1` and `0.2` cannot be represented with perfect finite precision (similar to `1/3 = 0.3333...` in base 10), resulting in `0.30000000000000004`. To safely compare floats in frontend code, use `Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON`.

### Q3: What is the difference between `==` and `===`?
**Answer:**
- `==` (loose equality) performs **implicit type coercion** before comparing values.
- `===` (strict equality) compares both **type and value** without performing any coercion. If the types differ, it immediately returns `false`.

### Q4: What is the difference between `||` and `??`?
**Answer:**
- `||` (logical OR) returns the right-hand operand if the left operand is **any falsy value** (`false`, `0`, `""`, `null`, `undefined`, `NaN`).
- `??` (nullish coalescing) returns the right-hand operand **only if** the left operand is `null` or `undefined`. It safely treats `0`, `""`, and `false` as valid present values.

### Q5: How does JavaScript evaluate `[] == ![]`?
**Answer:**
It evaluates to `true` through step-by-step type coercion:
1. `![]` has higher operator precedence than `==`. Since `[]` is truthy, `![]` becomes `false`.
2. The expression is now `[] == false`.
3. In loose comparison, boolean `false` converts to number `0`: `[] == 0`.
4. An object/array compared to a primitive converts via `.toString()`. `[].toString()` is `""`: `"" == 0`.
5. Empty string `""` converts to number `0`: `0 == 0`.
6. `0 === 0` is `true`!

---

## 📋 Summary & Key Takeaways

1. **8 Core Data Types:** 7 Primitives (`string`, `number`, `bigint`, `boolean`, `undefined`, `null`, `symbol`) stored by value in the Stack, and 1 Reference Type (`object`) stored by pointer in the Heap.
2. **Primitives are Immutable:** Modifying a primitive reassigns a new value; modifying an object mutates the underlying heap data.
3. **Always use Strict Equality (`===`):** Avoid unexpected type coercion bugs by defaulting to `===` and `!==`.
4. **Master `??` and `?.`:** Use `??` for default settings to avoid zero/empty string bugs, and `?.` to safely traverse nested API objects.
5. **Memorize the 8 Falsy Values:** `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`. Everything else in JavaScript evaluates to `true`.
6. **Prefer Explicit Casting:** Write predictable, readable code using `Number()`, `String()`, and `Boolean()` rather than relying on automatic coercion.

---

*Created with ❤️ by **Harish (harish-0987)** for Day 20 of the 100 Days Frontend Challenge.*
