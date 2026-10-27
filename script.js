/**
 * ==============================================================================
 * Day 20 of Frontend: JavaScript Data Types, Operators & Type Conversion
 * Author: Harish (harish-0987)
 * Repository: https://github.com/harish-0987/DAY-20-OF-FRONTEND
 * Description: Interactive laboratories powering:
 *              - Lab 1: Data Type Inspector & Stack/Heap Memory Simulator
 *              - Lab 2: Real-time Operators Sandbox & Evaluator
 *              - Lab 3: Strict (===) vs Loose (==) Equality Battle Arena
 *              - Lab 4: Type Conversion (Explicit Casting & Coercion Quirks)
 *              - Lab 5: Truthy vs Falsy Matrix & Dynamic Checker
 *              - Lab 6: Nullish Coalescing (??) & Optional Chaining (?.) Studio
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. LAB 1: DATA TYPE INSPECTOR & MEMORY SIMULATOR
       ========================================================================== */
    const inspectorInput = document.querySelector('#inspector-input');
    const btnInspectEval = document.querySelector('#btn-inspect-eval');
    const specDataType = document.querySelector('#spec-data-type');
    const specTypeof = document.querySelector('#spec-typeof');
    const specCategory = document.querySelector('#spec-category');
    const specMemory = document.querySelector('#spec-memory');
    const specTruthiness = document.querySelector('#spec-truthiness');
    const stackValDisplay = document.querySelector('#stack-val-display');
    const heapContainer = document.querySelector('#heap-container');
    const heapValDisplay = document.querySelector('#heap-val-display');
    const memoryExplanation = document.querySelector('#memory-explanation');
    const presetButtons = document.querySelectorAll('.preset-btn');

    function evaluateExpressionSafely(rawCode) {
        const trimmed = rawCode.trim();
        try {
            // Special cases
            if (trimmed === 'undefined') return { value: undefined, raw: 'undefined' };
            if (trimmed === 'NaN') return { value: NaN, raw: 'NaN' };
            if (trimmed === 'null') return { value: null, raw: 'null' };
            if (trimmed.endsWith('n') && !isNaN(Number(trimmed.slice(0, -1)))) {
                return { value: BigInt(trimmed.slice(0, -1)), raw: trimmed };
            }

            // Using Function constructor to evaluate expression safely in local scope
            const evaluated = Function(`"use strict"; return (${trimmed});`)();
            return { value: evaluated, raw: trimmed };
        } catch (err) {
            return { value: trimmed, raw: trimmed, isStringFallback: true };
        }
    }

    function inspectValue(rawCode) {
        const { value, raw } = evaluateExpressionSafely(rawCode);
        const typeofResult = typeof value;

        let displayType = 'Unknown';
        let isPrimitive = true;
        let memoryZone = 'Call Stack (Direct Value)';
        let truthy = Boolean(value);

        if (value === null) {
            displayType = 'Null';
            isPrimitive = true;
        } else if (value === undefined) {
            displayType = 'Undefined';
            isPrimitive = true;
        } else if (Number.isNaN(value)) {
            displayType = 'Number (NaN)';
            isPrimitive = true;
        } else if (Array.isArray(value)) {
            displayType = 'Array (Object)';
            isPrimitive = false;
        } else if (typeof value === 'function') {
            displayType = 'Function (Callable Object)';
            isPrimitive = false;
        } else if (typeof value === 'symbol') {
            displayType = 'Symbol';
            isPrimitive = true;
        } else if (typeof value === 'bigint') {
            displayType = 'BigInt';
            isPrimitive = true;
        } else if (typeof value === 'object') {
            displayType = 'Object';
            isPrimitive = false;
        } else if (typeof value === 'string') {
            displayType = 'String';
            isPrimitive = true;
        } else if (typeof value === 'number') {
            displayType = 'Number';
            isPrimitive = true;
        } else if (typeof value === 'boolean') {
            displayType = 'Boolean';
            isPrimitive = true;
        }

        // DOM Updates
        if (specDataType) specDataType.textContent = displayType;
        if (specTypeof) specTypeof.textContent = `"${typeofResult}"`;

        if (specCategory) {
            if (isPrimitive) {
                specCategory.className = 'spec-value badge-primitive';
                specCategory.textContent = 'Primitive (Immutable)';
            } else {
                specCategory.className = 'spec-value badge-reference';
                specCategory.textContent = 'Reference Type (Mutable)';
            }
        }

        if (specMemory) {
            if (isPrimitive) {
                specMemory.className = 'spec-value badge-stack';
                specMemory.textContent = 'Call Stack (Direct Value)';
            } else {
                specMemory.className = 'spec-value badge-heap';
                specMemory.textContent = 'Memory Heap (Referenced by Pointer)';
            }
        }

        if (specTruthiness) {
            if (truthy) {
                specTruthiness.className = 'spec-value badge-truthy';
                specTruthiness.textContent = 'Truthy (evaluates to true)';
            } else {
                specTruthiness.className = 'spec-value badge-falsy';
                specTruthiness.textContent = 'Falsy (evaluates to false)';
            }
        }

        // Memory Stage Animation
        if (isPrimitive) {
            if (heapContainer) heapContainer.classList.add('is-hidden');
            if (stackValDisplay) {
                if (typeof value === 'string') stackValDisplay.textContent = `"${value}"`;
                else if (typeof value === 'symbol') stackValDisplay.textContent = value.toString();
                else if (typeof value === 'bigint') stackValDisplay.textContent = `${value}n`;
                else stackValDisplay.textContent = String(value);
            }
            if (memoryExplanation) {
                memoryExplanation.textContent = `${displayType} is a primitive type stored directly by value on the Call Stack. Assigning this value creates an independent clone.`;
            }
        } else {
            if (heapContainer) heapContainer.classList.remove('is-hidden');
            if (stackValDisplay) {
                stackValDisplay.textContent = 'Pointer [#0x10A]';
            }
            if (heapValDisplay) {
                try {
                    heapValDisplay.textContent = typeof value === 'function' ? value.toString() : JSON.stringify(value, null, 2);
                } catch (e) {
                    heapValDisplay.textContent = '[Complex Object]';
                }
            }
            if (memoryExplanation) {
                memoryExplanation.textContent = `${displayType} is a reference type stored dynamically in the Memory Heap. The variable in the stack holds only memory pointer #0x10A.`;
            }
        }
    }

    // Inspect Button click & Enter key
    if (btnInspectEval && inspectorInput) {
        btnInspectEval.addEventListener('click', () => {
            inspectValue(inspectorInput.value);
        });

        inspectorInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                inspectValue(inspectorInput.value);
            }
        });
    }

    // Presets
    presetButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            presetButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const expr = btn.getAttribute('data-expr');
            if (inspectorInput) inspectorInput.value = expr;
            inspectValue(expr);
        });
    });


    /* ==========================================================================
       2. LAB 2: INTERACTIVE OPERATORS SANDBOX
       ========================================================================== */
    const opCategoryBtns = document.querySelectorAll('.segmented-btn');
    const opLeftInput = document.querySelector('#op-left-input');
    const opRightInput = document.querySelector('#op-right-input');
    const opSelect = document.querySelector('#op-select');
    const btnCalcOp = document.querySelector('#btn-calc-op');
    const resExprText = document.querySelector('#res-expr-text');
    const resOutputVal = document.querySelector('#res-output-val');
    const resOutputType = document.querySelector('#res-output-type');
    const resNotes = document.querySelector('#res-notes');

    const operatorCategories = {
        arithmetic: [
            { val: '+', label: '+ (Addition / Concatenation)' },
            { val: '-', label: '- (Subtraction)' },
            { val: '*', label: '* (Multiplication)' },
            { val: '/', label: '/ (Division)' },
            { val: '%', label: '% (Remainder/Modulus)' },
            { val: '**', label: '** (Exponentiation)' }
        ],
        comparison: [
            { val: '===', label: '=== (Strict Equality)' },
            { val: '!==', label: '!== (Strict Inequality)' },
            { val: '==', label: '== (Loose Equality)' },
            { val: '!=', label: '!= (Loose Inequality)' },
            { val: '>', label: '> (Greater Than)' },
            { val: '<', label: '< (Less Than)' },
            { val: '>=', label: '>= (Greater or Equal)' },
            { val: '<=', label: '<= (Less or Equal)' }
        ],
        logical: [
            { val: '&&', label: '&& (Logical AND - Short circuit)' },
            { val: '||', label: '|| (Logical OR - Short circuit)' }
        ],
        modern: [
            { val: '??', label: '?? (Nullish Coalescing)' }
        ]
    };

    // Category Buttons
    opCategoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            opCategoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cat = btn.getAttribute('data-op-cat');
            if (operatorCategories[cat] && opSelect) {
                opSelect.innerHTML = '';
                operatorCategories[cat].forEach(op => {
                    const opt = document.createElement('option');
                    opt.value = op.val;
                    opt.textContent = op.label;
                    opSelect.appendChild(opt);
                });
                calculateOperation();
            }
        });
    });

    function calculateOperation() {
        if (!opLeftInput || !opRightInput || !opSelect) return;

        const leftStr = opLeftInput.value.trim();
        const rightStr = opRightInput.value.trim();
        const op = opSelect.value;

        const expr = `${leftStr} ${op} ${rightStr}`;
        if (resExprText) resExprText.textContent = expr;

        try {
            const result = Function(`"use strict"; return (${leftStr}) ${op} (${rightStr});`)();
            const resType = typeof result;

            if (resOutputVal) {
                if (typeof result === 'string') resOutputVal.textContent = `"${result}"`;
                else if (typeof result === 'symbol') resOutputVal.textContent = result.toString();
                else if (typeof result === 'bigint') resOutputVal.textContent = `${result}n`;
                else resOutputVal.textContent = String(result);
            }

            if (resOutputType) resOutputType.textContent = resType;

            // Explanatory note
            if (resNotes) {
                if (op === '+' && (typeof leftStr === 'string' || typeof rightStr === 'string')) {
                    resNotes.textContent = 'String concatenation triggered: because one operand was a string, all operands were coerced into strings.';
                } else if (op === '??') {
                    resNotes.textContent = 'Nullish Coalescing: returns right-hand operand ONLY if left is null or undefined; otherwise preserves the left operand.';
                } else if (op === '==') {
                    resNotes.textContent = 'Loose Equality: implicit type coercion was performed according to ECMAScript abstract equality rules.';
                } else if (op === '===') {
                    resNotes.textContent = 'Strict Equality: types and values were compared with zero implicit coercion.';
                } else if (['-', '*', '/', '%'].includes(op)) {
                    resNotes.textContent = 'Mathematical operation: operands were automatically converted to numbers.';
                } else {
                    resNotes.textContent = `Evaluated standard ${op} operation resulting in ${resType} output.`;
                }
            }
        } catch (err) {
            if (resOutputVal) resOutputVal.textContent = 'SyntaxError';
            if (resOutputType) resOutputType.textContent = 'error';
            if (resNotes) resNotes.textContent = `Invalid JavaScript syntax: ${err.message}`;
        }
    }

    if (btnCalcOp) {
        btnCalcOp.addEventListener('click', calculateOperation);
    }
    if (opSelect) {
        opSelect.addEventListener('change', calculateOperation);
    }


    /* ==========================================================================
       3. LAB 3: STRICT (===) VS LOOSE (==) BATTLE ARENA
       ========================================================================== */
    const battlePresetBtns = document.querySelectorAll('.battle-preset-btn');
    const looseExprDisplay = document.querySelector('#loose-expr-display');
    const strictExprDisplay = document.querySelector('#strict-expr-display');
    const looseVerdict = document.querySelector('#loose-verdict');
    const strictVerdict = document.querySelector('#strict-verdict');
    const looseExplanation = document.querySelector('#loose-explanation');
    const strictExplanation = document.querySelector('#strict-explanation');

    const battleDatabase = {
        "5 vs '5'": {
            a: "5",
            b: "'5'",
            loose: true,
            strict: false,
            looseText: "Number 5 is loosely compared to string '5'. The engine coerces '5' to Number('5') = 5. Since 5 == 5, it evaluates to true.",
            strictText: "Type mismatch: typeof 5 is 'number', while typeof '5' is 'string'. Strict equality immediately returns false without coercion."
        },
        "0 vs false": {
            a: "0",
            b: "false",
            loose: true,
            strict: false,
            looseText: "When comparing a number to a boolean, the boolean is coerced into a number first: Number(false) becomes 0. Then 0 == 0 evaluates to true.",
            strictText: "Type mismatch: typeof 0 is 'number', while typeof false is 'boolean'. Returns false immediately."
        },
        "'' vs 0": {
            a: "''",
            b: "0",
            loose: true,
            strict: false,
            looseText: "Empty string '' is coerced to a number: Number('') equals 0. The expression becomes 0 == 0, which evaluates to true.",
            strictText: "Type mismatch: typeof '' is 'string', while typeof 0 is 'number'. Returns false immediately."
        },
        "null vs undefined": {
            a: "null",
            b: "undefined",
            loose: true,
            strict: false,
            looseText: "By the ECMAScript specification, null and undefined are loosely equal to each other and to nothing else: null == undefined is true.",
            strictText: "Type mismatch: typeof null is 'object' (legacy quirk) and typeof undefined is 'undefined'. Returns false."
        },
        "[] vs 0": {
            a: "[]",
            b: "0",
            loose: true,
            strict: false,
            looseText: "Empty array [] is an object. In loose comparison, [].toString() yields empty string ''. Then Number('') yields 0. 0 == 0 evaluates to true.",
            strictText: "Type mismatch: Array object vs primitive number. Returns false immediately."
        },
        "[] vs false": {
            a: "[]",
            b: "false",
            loose: true,
            strict: false,
            looseText: "1) Number(false) becomes 0. 2) Array [].toString() becomes ''. 3) Number('') becomes 0. 4) 0 == 0 evaluates to true!",
            strictText: "Array object vs boolean. Types are different, so strict equality returns false."
        },
        "[1] vs 1": {
            a: "[1]",
            b: "1",
            loose: true,
            strict: false,
            looseText: "Array [1] is converted to a primitive via [1].toString(), yielding '1'. Then '1' is coerced to number 1. 1 == 1 is true.",
            strictText: "Object reference vs primitive number. Strict comparison returns false."
        },
        "NaN vs NaN": {
            a: "NaN",
            b: "NaN",
            loose: false,
            strict: false,
            looseText: "Under IEEE 754 specification, NaN represents an invalid number and never equals any value, not even itself! Both == and === return false.",
            strictText: "NaN === NaN is always false! To check if a value is NaN, use Number.isNaN(x) or Object.is(x, NaN)."
        },
        "[] vs ![] (Hard)": {
            a: "[]",
            b: "![]",
            loose: true,
            strict: false,
            looseText: "Step 1: ![] evaluates first. Since [] is an object, it is truthy, so ![] becomes false. Step 2: Expression is [] == false. Step 3: false becomes 0. Step 4: [].toString() is ''. Step 5: '' becomes 0. Step 6: 0 == 0 is TRUE!",
            strictText: "Array object vs boolean false. Different types, so strict equality returns false."
        }
    };

    battlePresetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            battlePresetBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const matchKey = btn.textContent.trim().replace(' (Hard)', '');
            const data = battleDatabase[btn.textContent.trim()] || battleDatabase[matchKey];

            if (data) {
                if (looseExprDisplay) looseExprDisplay.textContent = `${data.a} == ${data.b}`;
                if (strictExprDisplay) strictExprDisplay.textContent = `${data.a} === ${data.b}`;

                if (looseVerdict) {
                    looseVerdict.textContent = String(data.loose);
                    looseVerdict.className = `battle-verdict-badge ${data.loose ? 'verdict-true' : 'verdict-false'}`;
                }

                if (strictVerdict) {
                    strictVerdict.textContent = String(data.strict);
                    strictVerdict.className = `battle-verdict-badge ${data.strict ? 'verdict-true' : 'verdict-false'}`;
                }

                if (looseExplanation) looseExplanation.textContent = data.looseText;
                if (strictExplanation) strictExplanation.textContent = data.strictText;
            }
        });
    });


    /* ==========================================================================
       4. LAB 4: TYPE CONVERSION & COERCION STUDIO
       ========================================================================== */
    const tabExplicit = document.querySelector('#tab-explicit');
    const tabQuirks = document.querySelector('#tab-quirks');
    const panelExplicit = document.querySelector('#panel-explicit');
    const panelQuirks = document.querySelector('#panel-quirks');

    if (tabExplicit && tabQuirks && panelExplicit && panelQuirks) {
        tabExplicit.addEventListener('click', () => {
            tabExplicit.classList.add('active');
            tabQuirks.classList.remove('active');
            panelExplicit.classList.remove('is-hidden');
            panelQuirks.classList.add('is-hidden');
        });

        tabQuirks.addEventListener('click', () => {
            tabQuirks.classList.add('active');
            tabExplicit.classList.remove('active');
            panelQuirks.classList.remove('is-hidden');
            panelExplicit.classList.add('is-hidden');
        });
    }

    // Explicit Type Converters
    const explicitInput = document.querySelector('#explicit-input');
    const converterBtns = document.querySelectorAll('.btn-converter');
    const castExpr = document.querySelector('#cast-expr');
    const castVal = document.querySelector('#cast-val');
    const castType = document.querySelector('#cast-type');

    converterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const castFunc = btn.getAttribute('data-cast');
            const rawVal = explicitInput ? explicitInput.value.trim() : '';

            let evaluatedInput;
            try {
                evaluatedInput = Function(`"use strict"; return (${rawVal});`)();
            } catch (e) {
                evaluatedInput = rawVal;
            }

            let result;
            let exprText = '';

            try {
                switch (castFunc) {
                    case 'String':
                        result = String(evaluatedInput);
                        exprText = `String(${JSON.stringify(rawVal)})`;
                        break;
                    case 'Number':
                        result = Number(evaluatedInput);
                        exprText = `Number(${JSON.stringify(rawVal)})`;
                        break;
                    case 'Boolean':
                        result = Boolean(evaluatedInput);
                        exprText = `Boolean(${JSON.stringify(rawVal)})`;
                        break;
                    case 'parseInt':
                        result = parseInt(String(rawVal), 10);
                        exprText = `parseInt(${JSON.stringify(rawVal)}, 10)`;
                        break;
                    case 'parseFloat':
                        result = parseFloat(String(rawVal));
                        exprText = `parseFloat(${JSON.stringify(rawVal)})`;
                        break;
                    case 'UnaryPlus':
                        result = +evaluatedInput;
                        exprText = `+(${JSON.stringify(rawVal)})`;
                        break;
                    default:
                        result = evaluatedInput;
                }

                if (castExpr) castExpr.textContent = exprText;
                if (castVal) castVal.textContent = typeof result === 'string' ? `"${result}"` : String(result);
                if (castType) castType.textContent = typeof result;
            } catch (err) {
                if (castVal) castVal.textContent = 'Conversion Error';
                if (castType) castType.textContent = 'error';
            }
        });
    });

    // Quirks Runner
    const quirkBtns = document.querySelectorAll('.quirk-btn');
    const quirkTitle = document.querySelector('#quirk-title');
    const quirkOutputBadge = document.querySelector('#quirk-output-badge');
    const quirkStepsList = document.querySelector('#quirk-steps-list');

    const quirksDatabase = {
        'plus-str': {
            title: "Expression: '5' + 2",
            badge: 'Evaluates to: "52"',
            steps: [
                "The binary '+' operator checks operand types and discovers the left operand is a string ('5').",
                "Because one operand is a string, JavaScript enforces String Concatenation mode.",
                "Number 2 is coerced to string: String(2) becomes '2'.",
                "The strings are joined: '5' + '2' = '52'."
            ]
        },
        'minus-str': {
            title: "Expression: '5' - 2",
            badge: 'Evaluates to: 3',
            steps: [
                "The subtraction operator '-' is strictly a mathematical operator (it has no string concatenation concept).",
                "JavaScript triggers Numeric Coercion on both operands.",
                "String '5' is coerced to number: Number('5') becomes 5.",
                "Math calculation runs: 5 - 2 = 3 (number)."
            ]
        },
        'array-plus-array': {
            title: 'Expression: [] + []',
            badge: 'Evaluates to: "" (empty string)',
            steps: [
                "When '+' encounters objects or arrays, it calls the internal [[ToPrimitive]] method.",
                "For arrays, this invokes .toString(): [].toString() yields '' (empty string).",
                "Both arrays convert to primitives: '' + ''.",
                "String concatenation results in empty string: ''."
            ]
        },
        'array-plus-obj': {
            title: 'Expression: [] + {}',
            badge: 'Evaluates to: "[object Object]"',
            steps: [
                "The left operand [] converts via .toString() to empty string ''.",
                "The right operand {} converts via .toString() to '[object Object]'.",
                "Concatenation takes place: '' + '[object Object]'.",
                "Result: '[object Object]'."
            ]
        },
        'bool-plus-bool': {
            title: 'Expression: true + true',
            badge: 'Evaluates to: 2',
            steps: [
                "The '+' operator with no string operands coerces booleans into numbers.",
                "Number(true) evaluates to 1.",
                "Expression becomes 1 + 1.",
                "Result: 2 (number)."
            ]
        },
        'null-plus-one': {
            title: 'Expression: null + 1',
            badge: 'Evaluates to: 1',
            steps: [
                "Numeric addition is performed.",
                "null coerces to number 0: Number(null) is 0.",
                "Expression evaluates as 0 + 1.",
                "Result: 1."
            ]
        },
        'undef-plus-one': {
            title: 'Expression: undefined + 1',
            badge: 'Evaluates to: NaN',
            steps: [
                "Numeric addition is attempted.",
                "undefined coerces to NaN: Number(undefined) is NaN.",
                "Any mathematical operation with NaN produces NaN.",
                "Result: NaN (Not-a-Number)."
            ]
        },
        'nan-equality': {
            title: 'Expression: NaN === NaN',
            badge: 'Evaluates to: false',
            steps: [
                "According to IEEE 754 standard, NaN represents an invalid or indeterminate state.",
                "The specification states that NaN is never equal to any value, including NaN itself.",
                "Both NaN == NaN and NaN === NaN return false.",
                "Tip: Check using Number.isNaN(x) or Object.is(x, NaN)."
            ]
        }
    };

    quirkBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            quirkBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const quirkKey = btn.getAttribute('data-quirk');
            const data = quirksDatabase[quirkKey];

            if (data) {
                if (quirkTitle) quirkTitle.textContent = data.title;
                if (quirkOutputBadge) quirkOutputBadge.textContent = data.badge;
                if (quirkStepsList) {
                    quirkStepsList.innerHTML = '';
                    data.steps.forEach(step => {
                        const li = document.createElement('li');
                        li.textContent = step;
                        quirkStepsList.appendChild(li);
                    });
                }
            }
        });
    });


    /* ==========================================================================
       5. LAB 5: TRUTHY VS FALSY MATRIX & CHECKER
       ========================================================================== */
    const truthyInput = document.querySelector('#truthy-input');
    const btnTestTruthy = document.querySelector('#btn-test-truthy');
    const truthyIndicator = document.querySelector('#truthy-indicator');
    const indicatorText = document.querySelector('#indicator-text');
    const truthyExplanation = document.querySelector('#truthy-explanation');
    const matrixChips = document.querySelectorAll('.matrix-chip');

    const falsyExplanations = {
        'false': 'Boolean false is one of the 8 official falsy values.',
        '0': 'Number 0 is mathematically zero and evaluates to false in boolean contexts.',
        '-0': 'Negative zero (-0) is also one of the 8 official falsy values.',
        '0n': 'BigInt zero (0n) is the falsy representative for the BigInt type.',
        "''": 'An empty string "" has length 0 and is the only falsy string in JavaScript.',
        'null': 'null represents intentional absence of value and coerces to false.',
        'undefined': 'undefined represents uninitialized data and coerces to false.',
        'NaN': 'NaN represents an unrepresentable number calculation and coerces to false.'
    };

    const deceptiveTruthyExplanations = {
        '[]': 'Empty array [] is an Object instance. All objects in JavaScript are TRUTHY, even empty ones!',
        '{}': 'Empty object {} is an Object instance. All objects in JavaScript are TRUTHY!',
        "'0'": 'Non-empty string containing the character "0". Any string with length > 0 is TRUTHY!',
        "'false'": 'Non-empty string containing "false". Strings are evaluated by length, NOT content!',
        '-1': 'Any non-zero number is TRUTHY, including negative numbers like -1.',
        "' '": 'Whitespace string contains space characters (length > 0), making it TRUTHY.',
        'Infinity': 'Infinity is a non-zero special number, making it TRUTHY.',
        '() => {}': 'Functions are first-class callable objects in JavaScript, making them TRUTHY.'
    };

    function testTruthyValue(rawText) {
        let evaluated;
        try {
            if (rawText === 'undefined') evaluated = undefined;
            else if (rawText === 'null') evaluated = null;
            else if (rawText === 'NaN') evaluated = NaN;
            else if (rawText === '0n') evaluated = 0n;
            else evaluated = Function(`"use strict"; return (${rawText});`)();
        } catch (e) {
            evaluated = rawText;
        }

        const isTruthy = Boolean(evaluated);

        if (truthyIndicator && indicatorText) {
            if (isTruthy) {
                truthyIndicator.className = 'indicator-badge badge-truthy';
                indicatorText.textContent = 'TRUTHY (evaluates to true)';
                truthyIndicator.querySelector('.indicator-icon').textContent = '✅';
            } else {
                truthyIndicator.className = 'indicator-badge badge-falsy';
                indicatorText.textContent = 'FALSY (evaluates to false)';
                truthyIndicator.querySelector('.indicator-icon').textContent = '❌';
            }
        }

        if (truthyExplanation) {
            const cleanKey = rawText.trim();
            if (falsyExplanations[cleanKey]) {
                truthyExplanation.textContent = falsyExplanations[cleanKey];
            } else if (deceptiveTruthyExplanations[cleanKey]) {
                truthyExplanation.textContent = deceptiveTruthyExplanations[cleanKey];
            } else if (isTruthy) {
                truthyExplanation.textContent = `The value '${rawText}' is not in the list of 8 official falsy values, so it automatically evaluates to TRUTHY.`;
            } else {
                truthyExplanation.textContent = `The value '${rawText}' evaluates to FALSY in JavaScript boolean conversions.`;
            }
        }
    }

    if (btnTestTruthy && truthyInput) {
        btnTestTruthy.addEventListener('click', () => {
            testTruthyValue(truthyInput.value);
        });

        truthyInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                testTruthyValue(truthyInput.value);
            }
        });
    }

    matrixChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const val = chip.getAttribute('data-val');
            if (truthyInput) truthyInput.value = val;
            testTruthyValue(val);
        });
    });


    /* ==========================================================================
       6. LAB 6: NULLISH (??) & OPTIONAL CHAINING (?.)
       ========================================================================== */
    // Tool 1: ?? vs ||
    const nullishRadios = document.querySelectorAll('input[name="nullish-val"]');
    const resOrVal = document.querySelector('#res-or-val');
    const resNullishVal = document.querySelector('#res-nullish-val');

    function updateNullishDemo() {
        const checkedRadio = document.querySelector('input[name="nullish-val"]:checked');
        if (!checkedRadio) return;

        const raw = checkedRadio.value;
        let testVal;
        if (raw === 'undefined') testVal = undefined;
        else if (raw === 'null') testVal = null;
        else if (raw === 'false') testVal = false;
        else if (raw === "''") testVal = '';
        else if (raw === '0') testVal = 0;

        // Logical OR:
        const orResult = testVal || 'Default';
        // Nullish Coalescing:
        const nullishResult = testVal ?? 'Default';

        if (resOrVal) {
            resOrVal.textContent = typeof orResult === 'string' ? `"${orResult}"` : String(orResult);
            if (raw === '0' || raw === "''" || raw === 'false') {
                resOrVal.textContent += ' ⚠️ (Lost valid value)';
            }
        }

        if (resNullishVal) {
            resNullishVal.textContent = typeof nullishResult === 'string' ? `"${nullishResult}"` : String(nullishResult);
            if (raw === '0' || raw === "''" || raw === 'false') {
                resNullishVal.textContent += ' ✅ (Preserved)';
            }
        }
    }

    nullishRadios.forEach(radio => {
        radio.addEventListener('change', updateNullishDemo);
    });

    // Tool 2: Optional Chaining (?.)
    const chkHasUser = document.querySelector('#chk-has-user');
    const chkHasProfile = document.querySelector('#chk-has-profile');
    const chkHasAvatar = document.querySelector('#chk-has-avatar');
    const chainOutput = document.querySelector('#chain-output');
    const chainStatus = document.querySelector('#chain-status');

    function updateChainingDemo() {
        if (!chkHasUser || !chkHasProfile || !chkHasAvatar) return;

        const hasUser = chkHasUser.checked;
        const hasProfile = chkHasProfile.checked;
        const hasAvatar = chkHasAvatar.checked;

        let response = {};

        if (hasUser) {
            response.user = {};
            if (hasProfile) {
                response.user.profile = {};
                if (hasAvatar) {
                    response.user.profile.avatarUrl = 'https://harish.dev/pic.jpg';
                }
            }
        }

        // Safe optional chaining:
        const outcome = response?.user?.profile?.avatarUrl ?? 'default-avatar.png';

        if (chainOutput) {
            chainOutput.textContent = `"${outcome}"`;
        }

        if (chainStatus) {
            if (!hasUser || !hasProfile || !hasAvatar) {
                chainStatus.className = 'chain-status status-safe';
                chainStatus.textContent = '✅ Missing branch safely skipped: Optional Chaining returned undefined and defaulted gracefully.';
            } else {
                chainStatus.className = 'chain-status status-safe';
                chainStatus.textContent = '✅ Full path reached: returned user avatar URL.';
            }
        }
    }

    [chkHasUser, chkHasProfile, chkHasAvatar].forEach(chk => {
        if (chk) chk.addEventListener('change', updateChainingDemo);
    });

    // Initial triggers on load
    inspectValue("'Hello Frontend'");
    calculateOperation();
    updateNullishDemo();
    updateChainingDemo();
});
