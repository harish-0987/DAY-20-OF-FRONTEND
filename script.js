/**
 * ==============================================================================
 * Day 18 of Frontend: What is JavaScript in Frontend?
 * Author: Harish (harish-0987)
 * Repository: https://github.com/harish-0987/DAY-18-OF-FRONTEND
 * Description: Clean, beginner-friendly frontend JavaScript demonstrations:
 *              - HTML + CSS + JS Trio Simulator
 *              - Live DOM Text Binding
 *              - State & Click Counter
 *              - ClassList Style & Glow Toggler
 *              - Real-time Browser Event Stream
 * ==============================================================================
 */

// Run when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------------------------
       1. HTML + CSS + JS Trio Simulator
       Demonstrates how a component transforms when CSS and JS layers are toggled.
       -------------------------------------------------------------------------- */
    const toggleCss = document.querySelector('#toggle-css');
    const toggleJs = document.querySelector('#toggle-js');
    const stageComponent = document.querySelector('#demo-component');
    const demoActionBtn = document.querySelector('#demo-action-btn');
    const compFeedback = document.querySelector('#comp-feedback');
    const stageExplanation = document.querySelector('#stage-explanation');
    const compTitle = document.querySelector('#comp-title');

    let trioClickCount = 0;

    function updateTrioState() {
        const isCssActive = toggleCss ? toggleCss.checked : true;
        const isJsActive = toggleJs ? toggleJs.checked : true;

        // Toggle CSS styling class
        if (stageComponent) {
            if (isCssActive) {
                stageComponent.classList.remove('raw-html-only');
            } else {
                stageComponent.classList.add('raw-html-only');
            }
        }

        // Update feedback text & explanation
        if (stageExplanation) {
            if (!isCssActive && !isJsActive) {
                stageExplanation.innerHTML = '<strong>State: HTML Only</strong> — Raw, unstyled browser default elements. Clicking does nothing!';
            } else if (isCssActive && !isJsActive) {
                stageExplanation.innerHTML = '<strong>State: HTML + CSS</strong> — Styled visually with colors and spacing, but the button has no JavaScript brain. Clicking does nothing!';
            } else if (!isCssActive && isJsActive) {
                stageExplanation.innerHTML = '<strong>State: HTML + JS (No CSS)</strong> — Raw unstyled appearance, but JavaScript functions! Clicking will trigger behavior.';
            } else {
                stageExplanation.innerHTML = '<strong>State: HTML + CSS + JS</strong> — The full modern web experience! Beautifully styled and fully responsive to interactions.';
            }
        }

        if (compFeedback && !isJsActive) {
            compFeedback.innerHTML = '<span class="feedback-status warning">⚠️ JavaScript is OFF. Clicks are ignored.</span>';
        } else if (compFeedback && isJsActive && trioClickCount === 0) {
            compFeedback.innerHTML = '<span class="feedback-status">Waiting for click...</span>';
        }
    }

    if (toggleCss) {
        toggleCss.addEventListener('change', updateTrioState);
    }
    if (toggleJs) {
        toggleJs.addEventListener('change', updateTrioState);
    }

    if (demoActionBtn) {
        demoActionBtn.addEventListener('click', () => {
            const isJsActive = toggleJs ? toggleJs.checked : true;

            if (!isJsActive) {
                // When JS is disabled in simulation, do nothing
                return;
            }

            trioClickCount += 1;
            if (compFeedback) {
                compFeedback.innerHTML = `<span class="feedback-status active">⚡ JavaScript Event! Click #${trioClickCount} registered.</span>`;
            }
            if (compTitle) {
                compTitle.textContent = `Active Explorer (Clicks: ${trioClickCount})`;
            }

            // Quick micro-animation
            demoActionBtn.classList.add('clicked-anim');
            setTimeout(() => demoActionBtn.classList.remove('clicked-anim'), 300);
        });
    }

    // Initialize Trio simulator
    updateTrioState();


    /* --------------------------------------------------------------------------
       2. Lab 1: Real-time Live DOM Text Binding
       Listens for typing ('input' event) and updates output (.textContent).
       -------------------------------------------------------------------------- */
    const textInput = document.querySelector('#text-sync-input');
    const textOutput = document.querySelector('#text-sync-output');

    if (textInput && textOutput) {
        textInput.addEventListener('input', (event) => {
            const enteredText = event.target.value.trim();
            if (enteredText.length === 0) {
                textOutput.textContent = 'Please type something above!';
                textOutput.style.opacity = '0.6';
            } else {
                textOutput.textContent = `Hello, ${enteredText}! Welcome to Day 18.`;
                textOutput.style.opacity = '1';
            }
        });
    }


    /* --------------------------------------------------------------------------
       3. Lab 2: Interactive Counter (State, Math, and DOM Updates)
       -------------------------------------------------------------------------- */
    let counterValue = 0;
    const counterDisplay = document.querySelector('#counter-val');
    const counterStatus = document.querySelector('#counter-status');
    const btnIncrement = document.querySelector('#btn-increment');
    const btnDecrement = document.querySelector('#btn-decrement');
    const btnReset = document.querySelector('#btn-reset');

    function updateCounterDisplay() {
        if (!counterDisplay) return;

        counterDisplay.textContent = counterValue;

        // Change color based on value
        if (counterValue > 0) {
            counterDisplay.style.color = 'var(--accent-emerald)';
            if (counterStatus) counterStatus.textContent = 'Positive value (+)';
        } else if (counterValue < 0) {
            counterDisplay.style.color = 'var(--accent-rose)';
            if (counterStatus) counterStatus.textContent = 'Negative value (-)';
        } else {
            counterDisplay.style.color = 'var(--accent-js)';
            if (counterStatus) counterStatus.textContent = 'Zero (Reset)';
        }
    }

    if (btnIncrement) {
        btnIncrement.addEventListener('click', () => {
            counterValue += 1;
            updateCounterDisplay();
        });
    }

    if (btnDecrement) {
        btnDecrement.addEventListener('click', () => {
            counterValue -= 1;
            updateCounterDisplay();
        });
    }

    if (btnReset) {
        btnReset.addEventListener('click', () => {
            counterValue = 0;
            updateCounterDisplay();
        });
    }


    /* --------------------------------------------------------------------------
       4. Lab 3: ClassList & Style Toggler
       Uses element.classList.toggle() to alter visual presentation on the fly.
       -------------------------------------------------------------------------- */
    const themePreviewBox = document.querySelector('#theme-preview-box');
    const previewBadge = document.querySelector('#preview-badge');
    const btnToggleGlow = document.querySelector('#btn-toggle-glow');
    const btnToggleDark = document.querySelector('#btn-toggle-dark');

    if (btnToggleGlow && themePreviewBox) {
        btnToggleGlow.addEventListener('click', () => {
            themePreviewBox.classList.toggle('glow-mode');
            const hasGlow = themePreviewBox.classList.contains('glow-mode');
            btnToggleGlow.textContent = hasGlow ? '✨ Remove Glow' : '✨ Toggle Glow';
            if (previewBadge) {
                previewBadge.textContent = hasGlow ? 'Glow Activated!' : 'Normal Mode';
            }
        });
    }

    if (btnToggleDark && themePreviewBox) {
        btnToggleDark.addEventListener('click', () => {
            themePreviewBox.classList.toggle('dark-mode');
            const isDark = themePreviewBox.classList.contains('dark-mode');
            btnToggleDark.textContent = isDark ? '☀️ Light Card' : '🌙 Toggle Dark Card';
        });
    }


    /* --------------------------------------------------------------------------
       5. Lab 4: Real-time Event Stream Inspector
       Captures real mouse and keyboard events and displays them in a live feed.
       -------------------------------------------------------------------------- */
    const eventTargetBox = document.querySelector('#event-target-box');
    const eventLogList = document.querySelector('#event-log-list');
    const btnClearLogs = document.querySelector('#btn-clear-logs');

    let logCounter = 0;

    function addLogEntry(eventName, detail) {
        if (!eventLogList) return;

        // Remove initial placeholder if present
        if (logCounter === 0) {
            eventLogList.innerHTML = '';
        }

        logCounter += 1;
        const entry = document.createElement('div');
        entry.className = 'log-entry new-log';

        const time = new Date().toLocaleTimeString();
        entry.innerHTML = `
            <span class="log-event-tag">${eventName}</span>
            <span class="log-detail">${detail}</span>
            <span class="log-time">${time}</span>
        `;

        eventLogList.prepend(entry);

        // Keep maximum 6 items for clean view
        if (eventLogList.children.length > 6) {
            eventLogList.removeChild(eventLogList.lastChild);
        }
    }

    if (eventTargetBox) {
        eventTargetBox.addEventListener('click', (e) => {
            addLogEntry('click', `Clicked at X: ${e.offsetX}px, Y: ${e.offsetY}px`);
        });

        eventTargetBox.addEventListener('dblclick', () => {
            addLogEntry('dblclick', 'Double-click event detected!');
        });

        eventTargetBox.addEventListener('mouseenter', () => {
            addLogEntry('mouseenter', 'Cursor entered target zone');
        });

        eventTargetBox.addEventListener('mouseleave', () => {
            addLogEntry('mouseleave', 'Cursor left target zone');
        });
    }

    if (btnClearLogs && eventLogList) {
        btnClearLogs.addEventListener('click', () => {
            logCounter = 0;
            eventLogList.innerHTML = '<div class="log-entry">Waiting for user interaction...</div>';
        });
    }

});
