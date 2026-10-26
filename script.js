/**
 * ==============================================================================
 * Day 19 of Frontend: JavaScript Features & Variables (var, let, const)
 * Author: Harish (harish-0987)
 * Repository: https://github.com/harish-0987/DAY-19-OF-FRONTEND
 * Description: Interactive JavaScript engine laboratories:
 *              - Lab 1: Variable Battle Arena (var vs let vs const simulator)
 *              - Lab 2: Scope & Block Boundary Visualizer
 *              - Lab 3: Hoisting & Temporal Dead Zone (TDZ) Interactive Timeline
 *              - Lab 4: Dynamic Typing & typeof Laboratory
 *              - Lab 5: const Object & Array Mutation Studio
 *              - Lab 6: Identifier Syntax & Convention Rule Validator
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. LAB 1: THE VARIABLE BATTLE ARENA (var vs let vs const)
       ========================================================================== */
    let currentWeapon = 'const'; // Default modern best practice

    const weaponVarBtn = document.querySelector('#weapon-var');
    const weaponLetBtn = document.querySelector('#weapon-let');
    const weaponConstBtn = document.querySelector('#weapon-const');

    const btnTestRedeclare = document.querySelector('#btn-test-redeclare');
    const btnTestReassign = document.querySelector('#btn-test-reassign');
    const btnTestBlock = document.querySelector('#btn-test-block');
    const btnTestHoist = document.querySelector('#btn-test-hoist');
    const btnClearArena = document.querySelector('#btn-clear-arena');

    const arenaCodeDisplay = document.querySelector('#arena-code-display');
    const arenaTerminal = document.querySelector('#arena-terminal');
    const codeSnippetTitle = document.querySelector('#code-snippet-title');
    const terminalBadge = document.querySelector('#terminal-badge');

    // Weapon Selection Logic
    function setWeapon(weapon) {
        currentWeapon = weapon;
        
        // Reset classes
        [weaponVarBtn, weaponLetBtn, weaponConstBtn].forEach(btn => {
            if (btn) btn.className = 'segmented-btn';
        });

        if (weapon === 'var' && weaponVarBtn) {
            weaponVarBtn.className = 'segmented-btn active active-var';
        } else if (weapon === 'let' && weaponLetBtn) {
            weaponLetBtn.className = 'segmented-btn active active-let';
        } else if (weapon === 'const' && weaponConstBtn) {
            weaponConstBtn.className = 'segmented-btn active active-const';
        }

        if (codeSnippetTitle) {
            codeSnippetTitle.textContent = `test.js — active keyword: ${weapon}`;
        }

        logToTerminal(`Switched active declaration to [ ${weapon.toUpperCase()} ]. Pick a test action above.`, 't-info');
    }

    if (weaponVarBtn) weaponVarBtn.addEventListener('click', () => setWeapon('var'));
    if (weaponLetBtn) weaponLetBtn.addEventListener('click', () => setWeapon('let'));
    if (weaponConstBtn) weaponConstBtn.addEventListener('click', () => setWeapon('const'));

    // Terminal Logging Helper
    function logToTerminal(message, type = 't-dim', prompt = '>') {
        if (!arenaTerminal) return;
        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;

        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        line.innerHTML = `<span class="t-prompt">${prompt}</span> <span>[${time}] ${message}</span>`;
        arenaTerminal.appendChild(line);
        arenaTerminal.scrollTop = arenaTerminal.scrollHeight;
    }

    function setTerminalBadge(text, typeClass) {
        if (!terminalBadge) return;
        terminalBadge.textContent = text;
        terminalBadge.className = `tag-badge ${typeClass}`;
    }

    // Test 1: Re-declaration Test
    if (btnTestRedeclare) {
        btnTestRedeclare.addEventListener('click', () => {
            if (currentWeapon === 'var') {
                arenaCodeDisplay.textContent = 
`// Re-declaration with var:
var superhero = "Batman";
var superhero = "Iron Man"; // Allowed!

console.log(superhero); // Outputs: "Iron Man"`;
                
                logToTerminal('Executing re-declaration test on "var"...', 't-dim');
                logToTerminal('Output: "Iron Man"', 't-success');
                logToTerminal('⚠️ WARNING: var permits silent re-declaration in the same scope. This easily causes accidental variable overwrites!', 't-warn');
                setTerminalBadge('PERMITTED (RISKY)', 'tag-warn');
            } else if (currentWeapon === 'let') {
                arenaCodeDisplay.textContent = 
`// Re-declaration with let:
let superhero = "Batman";
let superhero = "Iron Man"; 
// ❌ Uncaught SyntaxError: Identifier 'superhero' has already been declared`;

                logToTerminal('Executing re-declaration test on "let"...', 't-dim');
                logToTerminal('❌ Uncaught SyntaxError: Identifier \'superhero\' has already been declared', 't-error');
                logToTerminal('✅ SAFE: let protects you by throwing a compile-time SyntaxError if you attempt to re-declare the same identifier.', 't-info');
                setTerminalBadge('SYNTAX ERROR', 'tag-no');
            } else {
                arenaCodeDisplay.textContent = 
`// Re-declaration with const:
const superhero = "Batman";
const superhero = "Iron Man"; 
// ❌ Uncaught SyntaxError: Identifier 'superhero' has already been declared`;

                logToTerminal('Executing re-declaration test on "const"...', 't-dim');
                logToTerminal('❌ Uncaught SyntaxError: Identifier \'superhero\' has already been declared', 't-error');
                logToTerminal('✅ SAFE: const strictly forbids re-declaration in the same block scope.', 't-info');
                setTerminalBadge('SYNTAX ERROR', 'tag-no');
            }
        });
    }

    // Test 2: Re-assignment Test
    if (btnTestReassign) {
        btnTestReassign.addEventListener('click', () => {
            if (currentWeapon === 'var') {
                arenaCodeDisplay.textContent = 
`// Re-assignment with var:
var score = 10;
score = 25; // Re-assigned

console.log(score); // 25`;
                logToTerminal('Executing re-assignment on "var"...', 't-dim');
                logToTerminal('score updated to 25. Re-assignment successful.', 't-success');
                setTerminalBadge('ALLOWED', 'tag-yes');
            } else if (currentWeapon === 'let') {
                arenaCodeDisplay.textContent = 
`// Re-assignment with let:
let score = 10;
score = 25; // Re-assigned

console.log(score); // 25`;
                logToTerminal('Executing re-assignment on "let"...', 't-dim');
                logToTerminal('score updated to 25. Re-assignment successful.', 't-success');
                logToTerminal('💡 Use let whenever you anticipate the value will change over time (e.g. counters, loops).', 't-info');
                setTerminalBadge('ALLOWED', 'tag-yes');
            } else {
                arenaCodeDisplay.textContent = 
`// Re-assignment with const:
const score = 10;
score = 25; 
// ❌ Uncaught TypeError: Assignment to constant variable.`;
                logToTerminal('Executing re-assignment on "const"...', 't-dim');
                logToTerminal('❌ Uncaught TypeError: Assignment to constant variable.', 't-error');
                logToTerminal('🛡️ PROTECTED: const creates an immutable binding. The variable cannot point to a new value!', 't-warn');
                setTerminalBadge('TYPE ERROR', 'tag-no');
            }
        });
    }

    // Test 3: Block Scope Leak Test
    if (btnTestBlock) {
        btnTestBlock.addEventListener('click', () => {
            if (currentWeapon === 'var') {
                arenaCodeDisplay.textContent = 
`// Block scoping with var:
if (true) {
    var secretCode = "Pass123";
}

// var LEAKS out of the if block!
console.log(secretCode); // Outputs: "Pass123"`;
                logToTerminal('Testing block scope boundary on "var"...', 't-dim');
                logToTerminal('secretCode = "Pass123" (Accessible outside!)', 't-warn');
                logToTerminal('⚠️ LEAK DETECTED: var is NOT block scoped! It leaks into the surrounding function or global scope.', 't-error');
                setTerminalBadge('SCOPE LEAK', 'tag-warn');
            } else if (currentWeapon === 'let') {
                arenaCodeDisplay.textContent = 
`// Block scoping with let:
if (true) {
    let secretCode = "Pass123";
}

// let stays trapped inside { }
console.log(secretCode); 
// ❌ Uncaught ReferenceError: secretCode is not defined`;
                logToTerminal('Testing block scope boundary on "let"...', 't-dim');
                logToTerminal('❌ Uncaught ReferenceError: secretCode is not defined', 't-error');
                logToTerminal('✅ SEALED: let is strictly block-scoped. It cannot be accessed outside the curly braces { } where declared.', 't-success');
                setTerminalBadge('BLOCK SEALED', 'tag-yes');
            } else {
                arenaCodeDisplay.textContent = 
`// Block scoping with const:
if (true) {
    const secretCode = "Pass123";
}

// const stays trapped inside { }
console.log(secretCode); 
// ❌ Uncaught ReferenceError: secretCode is not defined`;
                logToTerminal('Testing block scope boundary on "const"...', 't-dim');
                logToTerminal('❌ Uncaught ReferenceError: secretCode is not defined', 't-error');
                logToTerminal('✅ SEALED: const is strictly block-scoped. Secure memory isolation.', 't-success');
                setTerminalBadge('BLOCK SEALED', 'tag-yes');
            }
        });
    }

    // Test 4: Hoisting & TDZ Test
    if (btnTestHoist) {
        btnTestHoist.addEventListener('click', () => {
            if (currentWeapon === 'var') {
                arenaCodeDisplay.textContent = 
`// Hoisting with var:
console.log(userGreeting); // Returns: undefined
var userGreeting = "Welcome!";
console.log(userGreeting); // Returns: "Welcome!"`;
                logToTerminal('Testing hoisting on "var"...', 't-dim');
                logToTerminal('console.log(userGreeting) before line = undefined', 't-warn');
                logToTerminal('console.log(userGreeting) after line = "Welcome!"', 't-success');
                logToTerminal('ℹ️ var is hoisted and automatically initialized to undefined during creation phase.', 't-info');
                setTerminalBadge('HOISTED (undefined)', 'tag-warn');
            } else if (currentWeapon === 'let') {
                arenaCodeDisplay.textContent = 
`// Hoisting with let (Temporal Dead Zone):
console.log(userGreeting); 
// ❌ Uncaught ReferenceError: Cannot access 'userGreeting' before initialization

let userGreeting = "Welcome!";`;
                logToTerminal('Testing hoisting on "let"...', 't-dim');
                logToTerminal('❌ Uncaught ReferenceError: Cannot access \'userGreeting\' before initialization', 't-error');
                logToTerminal('⏳ TEMPORAL DEAD ZONE (TDZ): let is hoisted into memory, but NOT initialized until its declaration is evaluated.', 't-info');
                setTerminalBadge('TDZ ERROR', 'tag-no');
            } else {
                arenaCodeDisplay.textContent = 
`// Hoisting with const (Temporal Dead Zone):
console.log(userGreeting); 
// ❌ Uncaught ReferenceError: Cannot access 'userGreeting' before initialization

const userGreeting = "Welcome!";`;
                logToTerminal('Testing hoisting on "const"...', 't-dim');
                logToTerminal('❌ Uncaught ReferenceError: Cannot access \'userGreeting\' before initialization', 't-error');
                logToTerminal('⏳ TEMPORAL DEAD ZONE (TDZ): const must be declared and initialized before any read attempt.', 't-info');
                setTerminalBadge('TDZ ERROR', 'tag-no');
            }
        });
    }

    // Clear Arena Console
    if (btnClearArena) {
        btnClearArena.addEventListener('click', () => {
            if (arenaTerminal) {
                arenaTerminal.innerHTML = `
                    <div class="terminal-line t-dim">
                        <span class="t-prompt">&gt;</span>
                        <span>Console cleared. Ready for next test...</span>
                    </div>
                `;
            }
            setTerminalBadge('READY', 'tag-yes');
        });
    }


    /* ==========================================================================
       2. LAB 2: SCOPE & BLOCK BOUNDARY VISUALIZER
       ========================================================================== */
    const btnScopeBlockTest = document.querySelector('#btn-scope-block-test');
    const btnScopeFunctionTest = document.querySelector('#btn-scope-function-test');
    const btnScopeReset = document.querySelector('#btn-scope-reset');

    const pillLeakyVar = document.querySelector('#pill-leaky-var');
    const pillConfinedLet = document.querySelector('#pill-confined-let');
    const pillConfinedConst = document.querySelector('#pill-confined-const');
    const scopeResultTitle = document.querySelector('#scope-result-title');
    const scopeResultDesc = document.querySelector('#scope-result-desc');
    const visualBlockScope = document.querySelector('#visual-block-scope');

    if (btnScopeBlockTest) {
        btnScopeBlockTest.addEventListener('click', () => {
            if (pillLeakyVar) {
                pillLeakyVar.style.transform = 'translateY(-60px) scale(1.05)';
                pillLeakyVar.style.boxShadow = '0 0 20px rgba(244, 63, 94, 0.6)';
                pillLeakyVar.textContent = 'var leaky ➔ LEAKED OUTSIDE BLOCK!';
            }
            if (pillConfinedLet) {
                pillConfinedLet.style.opacity = '0.5';
                pillConfinedLet.textContent = '🔒 let safeLet (Blocked outside)';
            }
            if (pillConfinedConst) {
                pillConfinedConst.style.opacity = '0.5';
                pillConfinedConst.textContent = '🔒 const safeConst (Blocked outside)';
            }
            if (visualBlockScope) {
                visualBlockScope.style.borderColor = 'rgba(244, 63, 94, 0.8)';
            }
            if (scopeResultTitle) scopeResultTitle.textContent = 'Block Scope Leak Result:';
            if (scopeResultDesc) {
                scopeResultDesc.innerHTML = 
                    '<strong style="color:var(--accent-rose)">var escaped into the function!</strong> Because var ignores curly braces <code>{ }</code>, it is accessible from outside the if block. However, <code>let</code> and <code>const</code> throw <code>ReferenceError</code> when accessed outside.';
            }
        });
    }

    if (btnScopeFunctionTest) {
        btnScopeFunctionTest.addEventListener('click', () => {
            if (pillLeakyVar) {
                pillLeakyVar.style.transform = 'none';
                pillLeakyVar.textContent = 'var inside function';
            }
            if (scopeResultTitle) scopeResultTitle.textContent = 'Function Scope Result:';
            if (scopeResultDesc) {
                scopeResultDesc.innerHTML = 
                    'Inside a function <code>calculate()</code>, all variables (<code>var</code>, <code>let</code>, <code>const</code>) are strictly encapsulated. <strong>No variable can escape a function scope</strong> into the global window.';
            }
        });
    }

    if (btnScopeReset) {
        btnScopeReset.addEventListener('click', () => {
            if (pillLeakyVar) {
                pillLeakyVar.style.transform = 'none';
                pillLeakyVar.style.boxShadow = 'none';
                pillLeakyVar.textContent = 'var leaky = "I can escape!"';
            }
            if (pillConfinedLet) {
                pillConfinedLet.style.opacity = '1';
                pillConfinedLet.textContent = 'let safeLet = "Trapped in block"';
            }
            if (pillConfinedConst) {
                pillConfinedConst.style.opacity = '1';
                pillConfinedConst.textContent = 'const safeConst = "Trapped in block"';
            }
            if (visualBlockScope) {
                visualBlockScope.style.borderColor = 'rgba(245, 158, 11, 0.3)';
            }
            if (scopeResultTitle) scopeResultTitle.textContent = 'Diagram Reset';
            if (scopeResultDesc) scopeResultDesc.textContent = 'Select a test to examine variable boundaries.';
        });
    }


    /* ==========================================================================
       3. LAB 3: HOISTING & TDZ TIMELINE STEPPER
       ========================================================================== */
    const btnTdzStep1 = document.querySelector('#btn-tdz-step1');
    const btnTdzStep2 = document.querySelector('#btn-tdz-step2');
    const btnTdzStep3 = document.querySelector('#btn-tdz-step3');

    const tdzCardStep1 = document.querySelector('#tdz-card-step1');
    const tdzCardStep2 = document.querySelector('#tdz-card-step2');
    const tdzCardStep3 = document.querySelector('#tdz-card-step3');
    const tdzCodePreview = document.querySelector('#tdz-code-preview');
    const tdzStatusBadge = document.querySelector('#tdz-status-badge');

    function setTdzStep(step) {
        [tdzCardStep1, tdzCardStep2, tdzCardStep3].forEach(card => {
            if (card) card.classList.remove('active-step');
        });

        if (step === 1) {
            if (tdzCardStep1) tdzCardStep1.classList.add('active-step');
            if (tdzStatusBadge) {
                tdzStatusBadge.textContent = 'Phase 1: Memory Allocation';
                tdzStatusBadge.className = 'tag-badge tag-warn';
            }
            if (tdzCodePreview) {
                tdzCodePreview.textContent = 
`// 1. Creation Phase (Before any line executes):
// JS Engine allocates memory slots:
var a = undefined; // Initialized to undefined
let b = <uninitialized>; // Bound to block, but in TDZ!`;
            }
        } else if (step === 2) {
            if (tdzCardStep2) tdzCardStep2.classList.add('active-step');
            if (tdzStatusBadge) {
                tdzStatusBadge.textContent = 'Phase 2: Temporal Dead Zone (TDZ)';
                tdzStatusBadge.className = 'tag-badge tag-no';
            }
            if (tdzCodePreview) {
                tdzCodePreview.textContent = 
`// 2. TDZ Window: Accessing 'b' before its declaration line:
console.log(a); // ✅ Returns undefined (hoisted & initialized)
console.log(b); // ❌ Uncaught ReferenceError: Cannot access 'b' before initialization!

// The TDZ ends when execution reaches the next line:`;
            }
        } else if (step === 3) {
            if (tdzCardStep3) tdzCardStep3.classList.add('active-step');
            if (tdzStatusBadge) {
                tdzStatusBadge.textContent = 'Phase 3: Execution Complete';
                tdzStatusBadge.className = 'tag-badge tag-yes';
            }
            if (tdzCodePreview) {
                tdzCodePreview.textContent = 
`// 3. Execution reaches declaration:
let b = "Modern Frontend"; // TDZ ends here! 'b' is now initialized.

console.log(b); // ✅ "Modern Frontend" (Safe to access!)`;
            }
        }
    }

    if (btnTdzStep1) btnTdzStep1.addEventListener('click', () => setTdzStep(1));
    if (btnTdzStep2) btnTdzStep2.addEventListener('click', () => setTdzStep(2));
    if (btnTdzStep3) btnTdzStep3.addEventListener('click', () => setTdzStep(3));


    /* ==========================================================================
       4. LAB 4: DYNAMIC TYPING & TYPEOF LABORATORY
       ========================================================================== */
    const typeButtons = document.querySelectorAll('.btn-type-pick');
    const inspVal = document.querySelector('#insp-val');
    const inspTypeof = document.querySelector('#insp-typeof');
    const inspMemory = document.querySelector('#insp-memory');
    const inspPass = document.querySelector('#insp-pass');
    const inspQuirk = document.querySelector('#insp-quirk');

    const typeMetadata = {
        number: {
            val: '42',
            type: 'number',
            memory: 'Primitive (Call Stack)',
            pass: 'Passed by Value',
            quirk: 'Double-precision 64-bit IEEE 754 float'
        },
        string: {
            val: '"Hello Frontend!"',
            type: 'string',
            memory: 'Primitive (Call Stack / String Pool)',
            pass: 'Passed by Value (Immutable sequence)',
            quirk: 'Strings are immutable in JS; methods return new strings'
        },
        boolean: {
            val: 'true',
            type: 'boolean',
            memory: 'Primitive (Call Stack)',
            pass: 'Passed by Value',
            quirk: 'Truthy/Falsy coercion in if conditions'
        },
        array: {
            val: '[10, 20, 30]',
            type: 'object',
            memory: 'Reference (Memory Heap, pointer on Stack)',
            pass: 'Passed by Reference Pointer',
            quirk: 'typeof [] is "object"! Check arrays using Array.isArray()'
        },
        object: {
            val: '{ id: 1, name: "Harish" }',
            type: 'object',
            memory: 'Reference (Memory Heap)',
            pass: 'Passed by Reference Pointer',
            quirk: 'Comparing two identical objects { } === { } evaluates to FALSE'
        },
        null: {
            val: 'null',
            type: 'object',
            memory: 'Primitive (Intentional absence of object value)',
            pass: 'Passed by Value',
            quirk: '🚨 FAMOUS JS BUG: typeof null returns "object" (legacy 1995 engine artifact)'
        },
        undefined: {
            val: 'undefined',
            type: 'undefined',
            memory: 'Primitive (Uninitialized variable default)',
            pass: 'Passed by Value',
            quirk: 'null == undefined is true, but null === undefined is false'
        },
        bigint: {
            val: '9007199254740991n',
            type: 'bigint',
            memory: 'Primitive (Arbitrary precision integer)',
            pass: 'Passed by Value',
            quirk: 'Cannot mix BigInt with standard Number in mathematical operations without casting'
        },
        symbol: {
            val: "Symbol('id')",
            type: 'symbol',
            memory: 'Primitive (Unique & immutable token)',
            pass: 'Passed by Value',
            quirk: 'Every Symbol() is globally unique: Symbol("id") !== Symbol("id")'
        }
    };

    typeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            typeButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');

            const key = btn.dataset.type;
            const meta = typeMetadata[key];
            if (!meta) return;

            if (inspVal) inspVal.textContent = meta.val;
            if (inspTypeof) inspTypeof.textContent = meta.type;
            if (inspMemory) inspMemory.textContent = meta.memory;
            if (inspPass) inspPass.textContent = meta.pass;
            if (inspQuirk) inspQuirk.textContent = meta.quirk;
        });
    });


    /* ==========================================================================
       5. LAB 5: CONST MUTATION STUDIO (Binding vs Value)
       ========================================================================== */
    const btnMutateProp = document.querySelector('#btn-mutate-prop');
    const btnPushArray = document.querySelector('#btn-push-array');
    const btnReassignConst = document.querySelector('#btn-reassign-const');
    const btnResetMutation = document.querySelector('#btn-reset-mutation');

    const mutationObjectDisplay = document.querySelector('#mutation-object-display');
    const mutationTerminal = document.querySelector('#mutation-terminal');
    const mutationLogBadge = document.querySelector('#mutation-log-badge');

    const defaultUserState = {
        name: "Harish",
        role: "Frontend Developer",
        skills: ["HTML", "CSS", "JavaScript"]
    };

    let liveUser = JSON.parse(JSON.stringify(defaultUserState));

    function renderMutationState() {
        if (mutationObjectDisplay) {
            mutationObjectDisplay.textContent = `// Live JSON State of const user (Reference: 0x4F2A):\n` + 
                JSON.stringify(liveUser, null, 2);
        }
    }

    function logMutation(msg, type = 't-dim') {
        if (!mutationTerminal) return;
        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;
        line.innerHTML = `<span class="t-prompt">&gt;</span> <span>${msg}</span>`;
        mutationTerminal.appendChild(line);
        mutationTerminal.scrollTop = mutationTerminal.scrollHeight;
    }

    if (btnMutateProp) {
        btnMutateProp.addEventListener('click', () => {
            liveUser.role = "Senior Frontend Architect (Promoted!)";
            liveUser.year = 2026;
            renderMutationState();

            logMutation('user.role = "Senior Frontend Architect"; user.year = 2026;', 't-dim');
            logMutation('✅ SUCCESS: Object property mutated! const only locks the variable binding, NOT internal properties.', 't-success');
            if (mutationLogBadge) {
                mutationLogBadge.textContent = 'MUTATION ALLOWED';
                mutationLogBadge.className = 'tag-badge tag-yes';
            }
        });
    }

    if (btnPushArray) {
        btnPushArray.addEventListener('click', () => {
            const nextSkills = ["TypeScript", "React", "Next.js", "TailwindCSS", "Node.js"];
            const added = nextSkills.find(s => !liveUser.skills.includes(s)) || `Tool-${liveUser.skills.length + 1}`;
            liveUser.skills.push(added);
            renderMutationState();

            logMutation(`user.skills.push("${added}");`, 't-dim');
            logMutation(`✅ SUCCESS: Array element added! The heap array expanded in place.`, 't-success');
            if (mutationLogBadge) {
                mutationLogBadge.textContent = 'ARRAY MUTATION OK';
                mutationLogBadge.className = 'tag-badge tag-yes';
            }
        });
    }

    if (btnReassignConst) {
        btnReassignConst.addEventListener('click', () => {
            logMutation('user = { name: "Someone Else" };', 't-dim');
            logMutation('❌ Uncaught TypeError: Assignment to constant variable.', 't-error');
            logMutation('🛡️ BLOCKED: Attempting to point "user" to a new memory address is forbidden by JavaScript engine.', 't-warn');
            if (mutationLogBadge) {
                mutationLogBadge.textContent = 'TYPE ERROR: REASSIGNMENT BLOCKED';
                mutationLogBadge.className = 'tag-badge tag-no';
            }
        });
    }

    if (btnResetMutation) {
        btnResetMutation.addEventListener('click', () => {
            liveUser = JSON.parse(JSON.stringify(defaultUserState));
            renderMutationState();
            logMutation('User object reset to initial state.', 't-info');
            if (mutationLogBadge) {
                mutationLogBadge.textContent = 'READY';
                mutationLogBadge.className = 'tag-badge tag-info';
            }
        });
    }


    /* ==========================================================================
       6. LAB 6: VARIABLE NAME SYNTAX & RULE VALIDATOR
       ========================================================================== */
    const identifierInput = document.querySelector('#identifier-input');
    const btnCheckIdent = document.querySelector('#btn-check-ident');
    const validatorFeedback = document.querySelector('#validator-feedback');
    const validatorIcon = document.querySelector('#validator-icon');
    const validatorMessage = document.querySelector('#validator-message');
    const presetNameBtns = document.querySelectorAll('.btn-preset-name');

    const reservedKeywords = new Set([
        'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger',
        'default', 'delete', 'do', 'else', 'export', 'extends', 'finally',
        'for', 'function', 'if', 'import', 'in', 'instanceof', 'new',
        'return', 'super', 'switch', 'this', 'throw', 'try', 'typeof',
        'var', 'void', 'while', 'with', 'yield', 'let', 'static', 'enum',
        'await', 'true', 'false', 'null'
    ]);

    function validateIdentifier(name) {
        name = (name || '').trim();

        if (!name) {
            return {
                valid: false,
                icon: '⚠️',
                cssClass: 'validator-warn',
                msg: '<strong>Empty Input!</strong> Please enter a variable name to validate.'
            };
        }

        // Check reserved keyword
        if (reservedKeywords.has(name.toLowerCase())) {
            return {
                valid: false,
                icon: '❌',
                cssClass: 'validator-invalid',
                msg: `<strong>Reserved Keyword!</strong> <code>${name}</code> is a reserved language keyword in JavaScript and cannot be used as an identifier.`
            };
        }

        // Check if starts with a number
        if (/^[0-9]/.test(name)) {
            return {
                valid: false,
                icon: '❌',
                cssClass: 'validator-invalid',
                msg: `<strong>Syntax Error:</strong> Variable names cannot start with a digit (<code>${name[0]}</code>). Identifiers must begin with a letter, <code>$</code>, or <code>_</code>.`
            };
        }

        // Check contains invalid characters like hyphens, spaces, special chars
        if (/[^a-zA-Z0-9_$]/.test(name)) {
            const badChars = name.match(/[^a-zA-Z0-9_$]/g) || [];
            return {
                valid: false,
                icon: '❌',
                cssClass: 'validator-invalid',
                msg: `<strong>Syntax Error:</strong> Variable name contains illegal character(s): <code>${[...new Set(badChars)].join(' ')}</code>. In JavaScript, hyphens <code>-</code> and spaces are not allowed!`
            };
        }

        // Valid! Check naming conventions:
        if (/^[A-Z0-9_]+$/.test(name) && name.length > 2) {
            return {
                valid: true,
                icon: '✅',
                cssClass: 'validator-valid',
                msg: `<strong>Valid Identifier!</strong> <code>${name}</code> uses <strong>SCREAMING_SNAKE_CASE</strong>. This convention is standard for compile-time constants (e.g., <code>const API_URL</code>).`
            };
        }

        if (name.startsWith('$')) {
            return {
                valid: true,
                icon: '✅',
                cssClass: 'validator-valid',
                msg: `<strong>Valid Identifier!</strong> <code>${name}</code> starts with <code>$</code>. Often used by frontend developers to signify DOM element selections (e.g., <code>$submitBtn</code>).`
            };
        }

        if (name.startsWith('_')) {
            return {
                valid: true,
                icon: '✅',
                cssClass: 'validator-valid',
                msg: `<strong>Valid Identifier!</strong> <code>${name}</code> starts with an underscore <code>_</code>. Traditionally used to indicate internal or private variables.`
            };
        }

        return {
            valid: true,
            icon: '✅',
            cssClass: 'validator-valid',
            msg: `<strong>Valid Identifier!</strong> <code>${name}</code> is syntactically correct and conforms to modern JavaScript's standard <strong>lowerCamelCase</strong> convention.`
        };
    }

    function runValidation() {
        if (!identifierInput || !validatorFeedback || !validatorIcon || !validatorMessage) return;
        const val = identifierInput.value;
        const res = validateIdentifier(val);

        validatorFeedback.className = `validator-result ${res.cssClass}`;
        validatorIcon.textContent = res.icon;
        validatorMessage.innerHTML = res.msg;
    }

    if (identifierInput) {
        identifierInput.addEventListener('input', runValidation);
    }
    if (btnCheckIdent) {
        btnCheckIdent.addEventListener('click', runValidation);
    }

    presetNameBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.dataset.name;
            if (identifierInput) {
                identifierInput.value = name;
                runValidation();
            }
        });
    });

    // Run initial validation
    runValidation();

});
