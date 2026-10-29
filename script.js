/* ==========================================
   CIRCUITVERSE AI — Upgraded JavaScript Logic
   ========================================== */

// Global Application State & Storage
let appState = {
    completedModules: JSON.parse(localStorage.getItem('circuitverse_completed_modules')) || {},
    quizBestScore: parseInt(localStorage.getItem('circuitverse_quiz_best')) || 0,
    challengeScore: parseInt(localStorage.getItem('circuitverse_challenge_score')) || 0,
    currentQuizIndex: 0,
    quizScore: 0,
    currentChallengeIndex: 0
};

// Data Store: Learning Hub Modules
const learningModulesData = [
    {
        id: 'digital-elec',
        title: 'Digital Electronics & Boolean Logic',
        icon: 'bi-cpu',
        summary: 'Master binary number systems, logic gates, and Boolean algebra simplifications.',
        content: 'Digital systems operate on discrete binary states (0 and 1, representing Low/HIGH voltage levels). Boolean algebra forms the mathematical foundation for designing combinational and sequential digital circuits.',
        formula: 'De Morgan Laws: \\(\\overline{A \\cdot B} = \\bar{A} + \\bar{B}\\)',
        practical: 'Used extensively in microprocessor arithmetic logic units (ALUs), memory registers, and FPGA prototyping.'
    },
    {
        id: 'logic-gates',
        title: 'Logic Gate & Adders Architecture',
        icon: 'bi-gear-wide-connected',
        summary: 'Explore AND, OR, NOT, NAND, NOR, XOR, XNOR gates, and Arithmetic Adders.',
        content: 'Logic gates are physical electronic circuits built from transistors that perform logical operations. Adders combine gates to perform binary arithmetic (Half and Full Adders).',
        formula: 'Half Adder Sum = \\(A \\oplus B\\), Carry = \\(A \\cdot B\\)',
        practical: 'Fundamental building blocks for all digital processing units and arithmetic ALU chips.'
    },
    {
        id: 'comm-systems',
        title: 'Communication Systems',
        icon: 'bi-broadcast',
        summary: 'Study Analog Modulation (AM/FM), Digital Modulation (ASK, FSK, PSK), and RF propagation.',
        content: 'Communication systems transmit information across channels by modulating baseband signals onto high-frequency carrier waveforms, enabling efficient antenna radiation.',
        formula: 'Modulation Index: \\( \\mu = \\frac{A_m}{A_c} \\)',
        practical: 'Essential for 5G cellular networks, Wi-Fi routers, satellite communication, and IoT transceivers.'
    },
    {
        id: 'sensors-iot',
        title: 'Sensors & IoT Ecosystems',
        icon: 'bi-router',
        summary: 'Interface transducers with microcontrollers and transmit telemetry via MQTT/HTTP.',
        content: 'Sensors convert physical parameters (temperature, light, pressure, motion) into electrical signals. Microcontrollers process these signals and transmit them to cloud platforms.',
        formula: '\\( V_{out} = \\frac{V_{cc} \\times \\text{ADC}_{val}}{1023} \\)',
        practical: 'Deployed in smart homes, industrial automation (Industry 4.0), smart grids, and wearable health monitors.'
    },
    {
        id: 'microcontrollers',
        title: 'Microcontrollers & Embedded C',
        icon: 'bi-motherboard',
        summary: 'Program GPIOs, timers, ADCs, and communication interfaces on AVR/ARM chips.',
        content: 'Microcontrollers integrate a CPU, memory, and programmable input/output peripherals on a single integrated circuit, optimized for embedded real-time control.',
        formula: 'PWM Duty Cycle \\( = \\frac{T_{on}}{T_{on} + T_{off}} \\times 100\\% \\)',
        practical: 'Powering automated robotics, medical devices, automotive electronic control units (ECUs), and IoT edge nodes.'
    },
    {
        id: 'signal-processing',
        title: 'Digital Signal Processing (DSP)',
        icon: 'bi-activity',
        summary: 'Analyze Fourier Transforms, sampling rates, digital filters, and noise reduction.',
        content: 'Digital signal processing manipulates continuous-time signals converted into digital streams. The Nyquist theorem governs accurate analog-to-digital conversion without aliasing.',
        formula: 'Nyquist Criterion: \\( f_s \\geq 2f_{max} \\)',
        practical: 'Critical for audio engineering, radar telemetry, biomedical ECG/EEG monitors, and image processing.'
    }
];

// Data Store: Expanded Quiz Questions (15 Questions)
const quizData = [
    {
        question: "According to Ohm's Law, if resistance is doubled while voltage remains constant, what happens to the current?",
        options: ["Halved", "Doubled", "Quadrupled", "Remains Unchanged"],
        answer: 0,
        explanation: "Since I = V / R, doubling R cuts the current I in half."
    },
    {
        question: "Which logic gate produces a HIGH output only when all its inputs are HIGH?",
        options: ["OR gate", "NOR gate", "AND gate", "XOR gate"],
        answer: 2,
        explanation: "An AND gate outputs 1 only if every input is 1."
    },
    {
        question: "What is the primary purpose of modulation in communication systems?",
        options: ["To reduce power consumption", "To shift baseband signals to higher RF carrier frequencies for efficient antenna radiation", "To convert digital signals to analog", "To encrypt voice data"],
        answer: 1,
        explanation: "Modulation shifts low-frequency info to high carrier frequencies so antenna sizes remain practical."
    },
    {
        question: "Which sensor is commonly used for measuring ambient light levels in smart home systems?",
        options: ["LM35", "LDR (Light Dependent Resistor)", "DHT11", "MPU6050"],
        answer: 1,
        explanation: "An LDR changes its electrical resistance inversely with incident light intensity."
    },
    {
        question: "What does the Nyquist-Shannon sampling theorem state about sampling frequency (fs)?",
        options: ["fs must equal max signal frequency", "fs must be at least twice the maximum signal frequency", "fs must be half the signal frequency", "fs is independent of signal frequency"],
        answer: 1,
        explanation: "To prevent aliasing, sampling rate must exceed 2 times the highest frequency component."
    },
    {
        question: "Which of the following is considered a universal logic gate?",
        options: ["AND", "OR", "NAND", "XOR"],
        answer: 2,
        explanation: "NAND and NOR gates can be combined to construct any Boolean logic function."
    },
    {
        question: "In a DC circuit, what formula correctly calculates electrical power (P)?",
        options: ["P = V / R", "P = V * I", "P = I^2 / V", "P = R / I^2"],
        answer: 1,
        explanation: "Electrical power equals voltage multiplied by current (P = VI = I^2R = V^2/R)."
    },
    {
        question: "What communication protocol is lightweight and widely used for IoT pub/sub messaging?",
        options: ["HTTP", "MQTT", "FTP", "SMTP"],
        answer: 1,
        explanation: "MQTT is designed for low-bandwidth, high-latency, or unreliable remote IoT networks."
    },
    {
        question: "What is the binary equivalent of decimal number 13?",
        options: ["1011", "1101", "1110", "1001"],
        answer: 1,
        explanation: "13 in decimal = 8 + 4 + 1 = 1101 in binary."
    },
    {
        question: "Which filter type passes frequencies below a cutoff frequency and attenuates higher frequencies?",
        options: ["High-pass filter", "Band-pass filter", "Low-pass filter", "Band-stop filter"],
        answer: 2,
        explanation: "A low-pass filter allows signals with a frequency lower than the cutoff frequency to pass."
    },
    {
        question: "What does PWM stand for in microcontroller programming?",
        options: ["Pulse Width Modulation", "Phase Wave Multiplexing", "Power Watt Meter", "Peripheral Wire Module"],
        answer: 0,
        explanation: "PWM encodes analog levels through varying the duty cycle of digital pulse trains."
    },
    {
        question: "An XOR gate outputs HIGH (1) when:",
        options: ["Both inputs are 1", "Both inputs are 0", "Inputs are different", "Inputs are identical"],
        answer: 2,
        explanation: "Exclusive-OR outputs 1 only when inputs mismatch (one 0, one 1)."
    },
    {
        question: "Which component stores electrical energy electrostatically in an electric field?",
        options: ["Resistor", "Inductor", "Capacitor", "Transistor"],
        answer: 2,
        explanation: "Capacitors store energy in an electrostatic field between two conductive plates."
    },
    {
        question: "What is the main function of an Analog-to-Digital Converter (ADC)?",
        options: ["Amplifies audio signals", "Converts continuous analog sensor voltages into discrete digital numbers", "Boosts RF transmission power", "Regulates DC voltage supply"],
        answer: 1,
        explanation: "ADCs sample analog voltages so microprocessors can process them mathematically."
    },
    {
        question: "In wireless transmission, what does FM stand for?",
        options: ["Frequency Modulation", "Fast Multiplexing", "Fiber Medium", "Fourier Measurement"],
        answer: 0,
        explanation: "Frequency Modulation encodes information by varying carrier wave frequency."
    }
];

// Data Store: Coding & Logic Challenges
const challengeData = [
    {
        id: 1,
        title: "Logic Gate Truth Table Evaluation",
        category: "Digital Logic",
        description: "Determine the exact output of a 3-input circuit where A=1, B=0, and C=1 passing through an AND gate followed by an OR gate with input D=0.",
        options: ["0", "1", "High Impedance", "Undefined"],
        correct: 1,
        explanation: "(A AND B) = (1 AND 0) = 0. Then (0 OR C OR D) = (0 OR 1 OR 0) = 1."
    },
    {
        id: 2,
        title: "Ohm's Law Power Calculation",
        category: "Basic Electronics",
        description: "Calculate the power dissipated by a 50 Ω resistor when a current of 0.5 A flows through it (Formula: P = I^2 × R).",
        options: ["12.5 W", "25.0 W", "6.25 W", "50.0 W"],
        correct: 0,
        explanation: "P = (0.5)^2 × 50 = 0.25 × 50 = 12.5 Watts."
    },
    {
        id: 3,
        title: "IoT Sensor Automation Threshold",
        category: "Smart IoT",
        description: "An automated ventilation fan triggers when (Temperature > 30°C OR Humidity > 80%). Current sensor readings: Temp = 28°C, Humidity = 85%. What is the fan state?",
        options: ["ON", "OFF", "Error State", "Standby"],
        correct: 0,
        explanation: "Since Humidity (85%) > 80%, the OR condition is satisfied, turning the fan ON."
    }
];

// Virtual Lab State
let labState = {
    digitalMode: 'gate', // 'gate', 'halfadder', 'fulladder'
    activeGate: 'AND',
    inputA: 0,
    inputB: 0,
    inputC: 0, // Carry in for full adder
    analogMode: 'ohm', // 'ohm', 'resistors'
    waveType: 'sine',
    frequency: 2,
    amplitude: 50
};

// IoT Lab State
let iotState = {
    temperature: 28,
    light: 400,
    motion: false,
    securityArmed: true,
    faultModeActive: false,
    faultResolved: false
};

// ==========================================
// Initialization & Navigation
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    updateDashboardStats();
    renderLearningModules();
    initDigitalLab();
    updateOhmLaw();
    initWaveformCanvas();
    updateIoT();
    renderQuiz();
    renderChallenge();
    updateProgressUI();
});

function switchSection(sectionId) {
    document.querySelectorAll('.app-section').forEach(sec => sec.classList.add('d-none'));
    const target = document.getElementById(`app-${sectionId}`);
    if (target) {
        target.classList.remove('d-none');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-target') === sectionId) {
            link.classList.add('active');
        }
    });

    if (sectionId === 'progress') {
        updateProgressUI();
    }
}

// ==========================================
// Dashboard Stats
// ==========================================
function updateDashboardStats() {
    const completedCount = Object.keys(appState.completedModules).length;
    const modEl = document.getElementById('stat-modules');
    const quizEl = document.getElementById('stat-quiz');
    const chalEl = document.getElementById('stat-challenges');

    if (modEl) modEl.textContent = `${completedCount} / ${learningModulesData.length}`;
    if (quizEl) quizEl.textContent = `${appState.quizBestScore}%`;
    if (chalEl) chalEl.textContent = `${appState.challengeScore} pts`;
}

// ==========================================
// Learning Hub Logic
// ==========================================
function renderLearningModules() {
    const container = document.getElementById('module-list-container');
    if (!container) return;

    container.innerHTML = '';
    learningModulesData.forEach((mod, index) => {
        const isDone = appState.completedModules[mod.id];
        const item = document.createElement('a');
        item.href = '#';
        item.className = `list-group-item list-group-item-action bg-dark text-light border border-secondary border-opacity-25 rounded-3 p-3 d-flex align-items-center justify-content-between ${index === 0 ? 'active-module border-cyan' : ''}`;
        item.onclick = (e) => {
            e.preventDefault();
            document.querySelectorAll('#module-list-container .list-group-item').forEach(el => el.classList.remove('border-cyan'));
            item.classList.add('border-cyan');
            selectModule(mod.id);
        };
        item.innerHTML = `
            <div class="d-flex align-items-center gap-3">
                <div class="rounded-3 bg-secondary bg-opacity-20 p-2 text-cyan">
                    <i class="bi ${mod.icon} fs-5"></i>
                </div>
                <div>
                    <h6 class="mb-0 fw-bold text-white fs-sm">${mod.title}</h6>
                    <small class="text-secondary">${mod.summary.substring(0, 45)}...</small>
                </div>
            </div>
            ${isDone ? '<i class="bi bi-check-circle-fill text-success fs-5"></i>' : '<i class="bi bi-chevron-right text-muted"></i>'}
        `;
        container.appendChild(item);
    });

    selectModule(learningModulesData[0].id);
}

function selectModule(modId) {
    const mod = learningModulesData.find(m => m.id === modId);
    const pane = document.getElementById('module-content-pane');
    if (!mod || !pane) return;

    const isDone = appState.completedModules[mod.id];
    pane.innerHTML = `
        <div>
            <div class="d-flex justify-content-between align-items-center border-bottom border-secondary border-opacity-25 pb-3 mb-4">
                <div>
                    <span class="text-cyan text-xs uppercase fw-bold tracking-wider">Module Guide</span>
                    <h3 class="fw-black text-white mb-0">${mod.title}</h3>
                </div>
                <button class="btn btn-sm ${isDone ? 'btn-success' : 'btn-outline-cyan'} rounded-pill px-3 fw-bold text-xs" onclick="toggleModuleCompletion('${mod.id}')">
                    <i class="bi ${isDone ? 'bi-check-circle-fill' : 'bi-circle'} me-1"></i> ${isDone ? 'Completed' : 'Mark as Completed'}
                </button>
            </div>
            <div class="mb-4">
                <h6 class="text-secondary text-xs uppercase tracking-wider mb-2">Concept Overview</h6>
                <p class="text-light fs-sm leading-relaxed">${mod.content}</p>
            </div>
            <div class="mb-4">
                <h6 class="text-secondary text-xs uppercase tracking-wider mb-2">Key Formula / Principles</h6>
                <div class="p-3 rounded-3 bg-black bg-opacity-60 border border-secondary border-opacity-25 font-monospace text-cyan text-xs">
                    ${mod.formula}
                </div>
            </div>
            <div class="mb-3">
                <h6 class="text-secondary text-xs uppercase tracking-wider mb-2">Real-World Engineering Application</h6>
                <div class="p-3 rounded-3 bg-dark bg-opacity-70 border border-secondary border-opacity-10 text-secondary text-xs">
                    ${mod.practical}
                </div>
            </div>
        </div>
    `;
}

function toggleModuleCompletion(modId) {
    if (appState.completedModules[modId]) {
        delete appState.completedModules[modId];
    } else {
        appState.completedModules[modId] = true;
    }
    localStorage.setItem('circuitverse_completed_modules', JSON.stringify(appState.completedModules));
    renderLearningModules();
    updateDashboardStats();
    updateProgressUI();
}

// ==========================================
// Virtual Lab: Digital Logic, Analog, Waveform
// ==========================================
function switchLabTab(tabName) {
    ['logic', 'analog', 'signal'].forEach(t => {
        document.getElementById(`lab-tab-${t}`).classList.add('d-none');
        document.getElementById(`btn-tab-${t}`).classList.remove('active', 'text-white');
        document.getElementById(`btn-tab-${t}`).classList.add('text-secondary');
    });
    document.getElementById(`lab-tab-${tabName}`).classList.remove('d-none');
    document.getElementById(`btn-tab-${tabName}`).classList.add('active', 'text-white');
    document.getElementById(`btn-tab-${tabName}`).classList.remove('text-secondary');

    if (tabName === 'signal') {
        setTimeout(updateWaveform, 50);
    }
}

const logicGatesList = ['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR', 'XNOR'];

function setDigitalMode(mode) {
    labState.digitalMode = mode;
    document.getElementById('mode-gate-btn').className = `btn btn-sm ${mode === 'gate' ? 'btn-cyan fw-bold' : 'btn-outline-secondary text-light'} rounded-3 py-2`;
    document.getElementById('mode-ha-btn').className = `btn btn-sm ${mode === 'halfadder' ? 'btn-cyan fw-bold' : 'btn-outline-secondary text-light'} rounded-3 py-2`;
    document.getElementById('mode-fa-btn').className = `btn btn-sm ${mode === 'fulladder' ? 'btn-cyan fw-bold' : 'btn-outline-secondary text-light'} rounded-3 py-2`;

    const gateCont = document.getElementById('gate-selector-container');
    const cCont = document.getElementById('input-c-container');

    if (mode === 'gate') {
        gateCont.style.display = 'block';
        cCont.style.setProperty('display', 'none', 'important');
    } else if (mode === 'halfadder') {
        gateCont.style.display = 'none';
        cCont.style.setProperty('display', 'none', 'important');
    } else if (mode === 'fulladder') {
        gateCont.style.display = 'none';
        cCont.style.setProperty('display', 'flex', 'important');
    }
    initDigitalLab();
}

function initDigitalLab() {
    const gateContainer = document.getElementById('logic-gate-buttons');
    if (gateContainer && labState.digitalMode === 'gate') {
        gateContainer.innerHTML = '';
        logicGatesList.forEach(gate => {
            const col = document.createElement('div');
            col.className = 'col-6';
            const btn = document.createElement('button');
            btn.className = `btn btn-sm w-100 ${labState.activeGate === gate ? 'btn-cyan fw-bold' : 'btn-outline-secondary text-light'} rounded-2 py-1 text-xs`;
            btn.textContent = gate;
            btn.onclick = () => {
                labState.activeGate = gate;
                initDigitalLab();
                updateDigitalSimulation();
            };
            col.appendChild(btn);
            gateContainer.appendChild(col);
        });
    }
    updateDigitalSimulation();
}

function toggleInput(inputName) {
    if (inputName === 'A') {
        labState.inputA = labState.inputA === 0 ? 1 : 0;
        document.getElementById('input-a-btn').textContent = labState.inputA;
    } else if (inputName === 'B') {
        labState.inputB = labState.inputB === 0 ? 1 : 0;
        document.getElementById('input-b-btn').textContent = labState.inputB;
    } else if (inputName === 'C') {
        labState.inputC = labState.inputC === 0 ? 1 : 0;
        document.getElementById('input-c-btn').textContent = labState.inputC;
    }
    updateDigitalSimulation();
}

function updateDigitalSimulation() {
    const a = labState.inputA === 1;
    const b = labState.inputB === 1;
    const c = labState.inputC === 1;
    const displayBox = document.getElementById('digital-display-box');
    const titleEl = document.getElementById('active-digital-title');
    const descEl = document.getElementById('digital-description');

    const bCont = document.getElementById('input-b-container');
    if (bCont) bCont.style.display = 'flex';

    if (labState.digitalMode === 'gate') {
        let out = 0;
        if (labState.activeGate === 'NOT') {
            if (bCont) bCont.style.display = 'none';
            out = !a ? 1 : 0;
        } else {
            switch (labState.activeGate) {
                case 'AND': out = (a && b) ? 1 : 0; break;
                case 'OR': out = (a || b) ? 1 : 0; break;
                case 'NAND': out = !(a && b) ? 1 : 0; break;
                case 'NOR': out = !(a || b) ? 1 : 0; break;
                case 'XOR': out = (a !== b) ? 1 : 0; break;
                case 'XNOR': out = (a === b) ? 1 : 0; break;
            }
        }
        titleEl.textContent = `${labState.activeGate} Gate Simulation`;
        displayBox.innerHTML = `
            <div class="col">
                <span class="text-muted d-block text-xs uppercase">Input A</span>
                <h2 class="fw-black text-cyan mb-0">${labState.inputA}</h2>
            </div>
            ${labState.activeGate !== 'NOT' ? `
            <div class="col">
                <span class="text-muted d-block text-xs uppercase">Input B</span>
                <h2 class="fw-black text-cyan mb-0">${labState.inputB}</h2>
            </div>` : ''}
            <div class="col">
                <span class="text-muted d-block text-xs uppercase">Output</span>
                <h2 class="fw-black text-success mb-0 p-2 rounded-3 d-inline-block px-4 bg-success bg-opacity-10 border border-success border-opacity-25 shadow-neon">${out}</h2>
            </div>
        `;
        const descMap = {
            'AND': 'Outputs 1 only if all inputs are 1. Otherwise outputs 0.',
            'OR': 'Outputs 1 if at least one input is 1.',
            'NOT': 'Inverts the input state (complement).',
            'NAND': 'Complement of AND. Outputs 0 only if all inputs are 1.',
            'NOR': 'Complement of OR. Outputs 1 only if all inputs are 0.',
            'XOR': 'Outputs 1 if inputs are different (exclusive).',
            'XNOR': 'Outputs 1 if inputs are identical.'
        };
        descEl.textContent = descMap[labState.activeGate];
    } else if (labState.digitalMode === 'halfadder') {
        // Half Adder: Sum = A XOR B, Carry = A AND B
        const sum = (a !== b) ? 1 : 0;
        const carry = (a && b) ? 1 : 0;

        titleEl.textContent = 'Half Adder Arithmetic Circuit';
        displayBox.innerHTML = `
            <div class="col">
                <span class="text-muted d-block text-xs uppercase">A</span>
                <h3 class="fw-black text-cyan mb-0">${labState.inputA}</h3>
            </div>
            <div class="col">
                <span class="text-muted d-block text-xs uppercase">B</span>
                <h3 class="fw-black text-cyan mb-0">${labState.inputB}</h3>
            </div>
            <div class="col">
                <span class="text-muted d-block text-xs uppercase">Sum (S)</span>
                <h3 class="fw-black text-success mb-0">${sum}</h3>
            </div>
            <div class="col">
                <span class="text-muted d-block text-xs uppercase">Carry (C)</span>
                <h3 class="fw-black text-warning mb-0">${carry}</h3>
            </div>
        `;
        descEl.textContent = 'A Half Adder adds two 1-bit binary numbers. Sum is computed via XOR (A ⊕ B) and Carry via AND (A · B).';
    } else if (labState.digitalMode === 'fulladder') {
        // Full Adder: Sum = A XOR B XOR Cin, Carryout = (A AND B) OR (Cin AND (A XOR B))
        const sum = (a !== b !== c) ? 1 : 0;
        const carryOut = ((a && b) || (c && (a !== b))) ? 1 : 0;

        titleEl.textContent = 'Full Adder Arithmetic Circuit';
        displayBox.innerHTML = `
            <div class="col">
                <span class="text-muted d-block text-xs uppercase">A</span>
                <h4 class="fw-black text-cyan mb-0">${labState.inputA}</h4>
            </div>
            <div class="col">
                <span class="text-muted d-block text-xs uppercase">B</span>
                <h4 class="fw-black text-cyan mb-0">${labState.inputB}</h4>
            </div>
            <div class="col">
                <span class="text-muted d-block text-xs uppercase">Cin</span>
                <h4 class="fw-black text-cyan mb-0">${labState.inputC}</h4>
            </div>
            <div class="col">
                <span class="text-muted d-block text-xs uppercase">Sum</span>
                <h4 class="fw-black text-success mb-0">${sum}</h4>
            </div>
            <div class="col">
                <span class="text-muted d-block text-xs uppercase">Cout</span>
                <h4 class="fw-black text-warning mb-0">${carryOut}</h4>
            </div>
        `;
        descEl.textContent = 'A Full Adder adds three 1-bit inputs (A, B, and Carry-in), outputting a Sum and Carry-out for multi-bit binary addition.';
    }
}

// Analog Lab Mode Switcher
function setAnalogMode(mode) {
    labState.analogMode = mode;
    const ohmControls = document.getElementById('analog-controls-ohm');
    const resControls = document.getElementById('analog-controls-resistors');

    if (mode === 'ohm') {
        ohmControls.classList.remove('d-none');
        resControls.classList.add('d-none');
        updateOhmLaw();
    } else {
        ohmControls.classList.add('d-none');
        resControls.classList.remove('d-none');
        updateResistorCalc();
    }
}

function updateOhmLaw() {
    const v = parseFloat(document.getElementById('range-voltage').value);
    const r = parseFloat(document.getElementById('range-resistance').value);

    document.getElementById('val-voltage').textContent = `${v} V`;
    document.getElementById('val-resistance').textContent = `${r} Ω`;

    const safeR = r <= 0 ? 0.1 : r;
    const current = (v / safeR).toFixed(3);
    const power = (v * current).toFixed(3);

    document.getElementById('analog-output-title').innerHTML = 'Ohm\'s Law Analysis (<span class="font-monospace text-cyan">V = I × R</span>)';
    document.getElementById('analog-results-box').innerHTML = `
        <div class="col-md-4">
            <div class="p-4 rounded-4 bg-black bg-opacity-50 border border-secondary border-opacity-20 text-center">
                <span class="text-muted d-block text-xs uppercase mb-1">Current (I)</span>
                <h3 class="fw-black text-cyan font-monospace mb-0">${current} A</h3>
            </div>
        </div>
        <div class="col-md-4">
            <div class="p-4 rounded-4 bg-black bg-opacity-50 border border-secondary border-opacity-20 text-center">
                <span class="text-muted d-block text-xs uppercase mb-1">Voltage (V)</span>
                <h3 class="fw-black text-white font-monospace mb-0">${v.toFixed(1)} V</h3>
            </div>
        </div>
        <div class="col-md-4">
            <div class="p-4 rounded-4 bg-black bg-opacity-50 border border-secondary border-opacity-20 text-center">
                <span class="text-muted d-block text-xs uppercase mb-1">Power (P = VI)</span>
                <h3 class="fw-black text-violet font-monospace mb-0">${power} W</h3>
            </div>
        </div>
    `;
    document.getElementById('analog-principle-text').textContent = 'Current is inversely proportional to resistance. Power dissipation scales quadratically with current or voltage changes.';
}

function updateResistorCalc() {
    const r1 = parseFloat(document.getElementById('res-1').value) || 0;
    const r2 = parseFloat(document.getElementById('res-2').value) || 0;

    const series = r1 + r2;
    const parallel = (r1 + r2) === 0 ? 0 : (r1 * r2) / (r1 + r2);

    document.getElementById('analog-output-title').innerHTML = 'Series & Parallel Resistor Combinations';
    document.getElementById('analog-results-box').innerHTML = `
        <div class="col-md-6">
            <div class="p-4 rounded-4 bg-black bg-opacity-50 border border-secondary border-opacity-20 text-center">
                <span class="text-muted d-block text-xs uppercase mb-1">Series ($R_{series} = R_1 + R_2$)</span>
                <h3 class="fw-black text-cyan font-monospace mb-0">${series.toFixed(2)} Ω</h3>
            </div>
        </div>
        <div class="col-md-6">
            <div class="p-4 rounded-4 bg-black bg-opacity-50 border border-secondary border-opacity-20 text-center">
                <span class="text-muted d-block text-xs uppercase mb-1">Parallel ($R_{par} = \\frac{R_1 R_2}{R_1 + R_2}$)</span>
                <h3 class="fw-black text-violet font-monospace mb-0">${parallel.toFixed(2)} Ω</h3>
            </div>
        </div>
    `;
    document.getElementById('analog-principle-text').textContent = 'Resistors in series add directly, whereas parallel resistors result in an equivalent resistance smaller than the smallest individual resistor.';
}

// Waveform Visualizer
function setWaveType(type) {
    labState.waveType = type;
    updateWaveform();
}

function updateWaveform() {
    labState.frequency = parseFloat(document.getElementById('range-freq').value);
    labState.amplitude = parseFloat(document.getElementById('range-amp').value);

    document.getElementById('val-freq').textContent = `${labState.frequency} Hz`;
    document.getElementById('val-amp').textContent = `${labState.amplitude} V`;

    const canvas = document.getElementById('waveformCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Draw Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 30) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = 0; y < height; y += 30) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }

    // Draw Center Axis
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.beginPath(); ctx.moveTo(0, height / 2); ctx.lineTo(width, height / 2); ctx.stroke();

    // Draw Wave
    ctx.strokeStyle = '#00E5FF';
    ctx.lineWidth = 3;
    ctx.beginPath();

    const midY = height / 2;
    for (let x = 0; x < width; x++) {
        let y = 0;
        if (labState.waveType === 'sine') {
            y = midY - labState.amplitude * Math.sin((x / width) * Math.PI * 2 * labState.frequency);
        } else {
            const val = Math.sin((x / width) * Math.PI * 2 * labState.frequency);
            y = val >= 0 ? midY - labState.amplitude : midY + labState.amplitude;
        }
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();
}

function initWaveformCanvas() {
    const canvas = document.getElementById('waveformCanvas');
    if (canvas) {
        canvas.width = canvas.parentElement.clientWidth || 600;
        canvas.height = 220;
        updateWaveform();
    }
}

// ==========================================
// Smart Home IoT Lab
// ==========================================
function updateIoT() {
    iotState.temperature = parseFloat(document.getElementById('iot-range-temp').value);
    iotState.light = parseFloat(document.getElementById('iot-range-light').value);

    document.getElementById('iot-val-temp').textContent = `${iotState.temperature} °C`;
    document.getElementById('iot-val-light').textContent = `${iotState.light} lux`;

    let fanOn = iotState.temperature > 30;
    if (iotState.faultModeActive && !iotState.faultResolved) {
        fanOn = false; // Simulated fault
    }

    const lightOn = iotState.light < 200;
    const alarmOn = iotState.securityArmed && iotState.motion;

    const fanCard = document.getElementById('card-actuator-fan');
    const fanStatus = document.getElementById('status-fan');
    if (fanOn) {
        fanCard.classList.add('border-cyan', 'bg-cyan', 'bg-opacity-10');
        fanStatus.textContent = 'RUNNING (ON)';
        fanStatus.className = 'fw-bold text-cyan mb-0';
    } else {
        fanCard.classList.remove('border-cyan', 'bg-cyan', 'bg-opacity-10');
        fanStatus.textContent = iotState.faultModeActive && !iotState.faultResolved ? 'STUCK OFF (FAULT)' : 'OFF';
        fanStatus.className = 'fw-bold text-secondary mb-0';
    }

    const lightCard = document.getElementById('card-actuator-light');
    const lightStatus = document.getElementById('status-light');
    if (lightOn) {
        lightCard.classList.add('border-warning', 'bg-warning', 'bg-opacity-10');
        lightStatus.textContent = 'ACTIVE (ON)';
        lightStatus.className = 'fw-bold text-warning mb-0';
    } else {
        lightCard.classList.remove('border-warning', 'bg-warning', 'bg-opacity-10');
        lightStatus.textContent = 'OFF';
        lightStatus.className = 'fw-bold text-secondary mb-0';
    }

    const alarmCard = document.getElementById('card-actuator-alarm');
    const alarmStatus = document.getElementById('status-alarm');
    if (alarmOn) {
        alarmCard.classList.add('border-danger', 'bg-danger', 'bg-opacity-20');
        alarmStatus.textContent = 'ALARM TRIGGERED';
        alarmStatus.className = 'fw-bold text-danger mb-0';
    } else {
        alarmCard.classList.remove('border-danger', 'bg-danger', 'bg-opacity-20');
        alarmStatus.textContent = 'SECURE';
        alarmStatus.className = 'fw-bold text-secondary mb-0';
    }

    document.getElementById('iot-event-log').innerHTML = `
        [SYSTEM] Temp: ${iotState.temperature}°C → Fan: ${fanOn ? 'ON' : 'OFF'} | Light: ${iotState.light} lux → Smart Bulb: ${lightOn ? 'ON' : 'OFF'}<br>
        [SECURITY] Motion: ${iotState.motion ? 'DETECTED' : 'CLEAR'} | Status: ${alarmOn ? 'ALERT' : 'NORMAL'}
    `;
}

function toggleMotion() {
    iotState.motion = !iotState.motion;
    const btn = document.getElementById('iot-motion-btn');
    if (iotState.motion) {
        btn.textContent = 'DETECTED';
        btn.className = 'btn btn-sm btn-danger fw-bold px-3';
    } else {
        btn.textContent = 'CLEAR';
        btn.className = 'btn btn-sm btn-outline-secondary fw-bold px-3';
    }
    updateIoT();
}

function toggleSecurity() {
    iotState.securityArmed = !iotState.securityArmed;
    const btn = document.getElementById('iot-security-btn');
    if (iotState.securityArmed) {
        btn.textContent = 'ARMED';
        btn.className = 'btn btn-sm btn-success fw-bold px-3';
    } else {
        btn.textContent = 'DISARMED';
        btn.className = 'btn btn-sm btn-outline-secondary fw-bold px-3';
    }
    updateIoT();
}

function toggleFaultMode() {
    iotState.faultModeActive = !iotState.faultModeActive;
    const banner = document.getElementById('fault-banner');
    const btn = document.getElementById('fault-mode-btn');

    if (iotState.faultModeActive) {
        banner.classList.remove('d-none');
        btn.innerHTML = '<i class="bi bi-shield-check me-1"></i> Disable Fault Mode';
        document.getElementById('iot-range-temp').value = 35;
    } else {
        banner.classList.add('d-none');
        btn.innerHTML = '<i class="bi bi-shield-exclamation me-1"></i> Enable Fault Diagnosis Mode';
        iotState.faultResolved = false;
        document.getElementById('fault-feedback').innerHTML = '';
    }
    updateIoT();
}

function checkFaultAnswer(isCorrect) {
    const fb = document.getElementById('fault-feedback');
    if (isCorrect) {
        iotState.faultResolved = true;
        fb.innerHTML = '<span class="text-success"><i class="bi bi-check-circle-fill me-1"></i> Correct! MOSFET switch gate driver hardware failure identified. Fan circuit restored.</span>';
        updateIoT();
    } else {
        fb.innerHTML = '<span class="text-danger"><i class="bi bi-x-circle-fill me-1"></i> Incorrect. Re-examine actuator transistor switching and GPIO pin states.</span>';
    }
}

// ==========================================
// Quiz Arena Logic
// ==========================================
function renderQuiz() {
    const container = document.getElementById('quiz-card-container');
    if (!container) return;

    if (appState.currentQuizIndex >= quizData.length) {
        const percentage = Math.round((appState.quizScore / quizData.length) * 100);
        if (percentage > appState.quizBestScore) {
            appState.quizBestScore = percentage;
            localStorage.setItem('circuitverse_quiz_best', appState.quizBestScore);
            updateDashboardStats();
        }

        container.innerHTML = `
            <div class="text-center py-4">
                <i class="bi bi-award text-warning display-3 mb-3 d-block"></i>
                <h3 class="fw-black text-white mb-2">Quiz Completed!</h3>
                <h1 class="display-4 fw-black text-cyan font-monospace mb-3">${percentage}%</h1>
                <p class="text-secondary mb-4">You answered ${appState.quizScore} out of ${quizData.length} questions correctly.</p>
                <button class="btn btn-cyan px-5 py-3 rounded-pill fw-bold shadow-neon" onclick="restartQuiz()">
                    <i class="bi bi-arrow-counterclockwise me-2"></i> Retake Quiz
                </button>
            </div>
        `;
        return;
    }

    const q = quizData[appState.currentQuizIndex];
    container.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4 border-bottom border-secondary border-opacity-25 pb-3">
            <span class="text-cyan text-xs uppercase fw-bold">Question ${appState.currentQuizIndex + 1} of ${quizData.length}</span>
            <span class="badge bg-secondary bg-opacity-20 text-light border border-secondary border-opacity-25">ENTC Arena</span>
        </div>
        <h4 class="fw-bold text-white mb-4">${q.question}</h4>
        <div class="d-grid gap-3 mb-4" id="quiz-options-list">
            ${q.options.map((opt, idx) => `
                <button class="btn btn-outline-secondary text-start text-light p-3 rounded-4 border border-secondary border-opacity-25 glass-card" onclick="answerQuiz(${idx})">
                    <span class="fw-bold text-cyan me-2">${String.fromCharCode(65 + idx)}.</span> ${opt}
                </button>
            `).join('')}
        </div>
        <div id="quiz-explanation" class="d-none p-3 rounded-3 bg-dark bg-opacity-80 border border-secondary border-opacity-20 text-secondary fs-xs mb-3"></div>
        <div class="text-end d-none" id="quiz-next-container">
            <button class="btn btn-cyan px-4 py-2 rounded-pill fw-bold text-xs" onclick="nextQuizQuestion()">Next Question <i class="bi bi-arrow-right"></i></button>
        </div>
    `;
}

function answerQuiz(selectedIndex) {
    const q = quizData[appState.currentQuizIndex];
    const buttons = document.querySelectorAll('#quiz-options-list button');
    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === q.answer) {
            btn.classList.remove('btn-outline-secondary', 'text-light');
            btn.classList.add('btn-success', 'fw-bold');
        } else if (idx === selectedIndex) {
            btn.classList.remove('btn-outline-secondary', 'text-light');
            btn.classList.add('btn-danger', 'fw-bold');
        }
    });

    if (selectedIndex === q.answer) {
        appState.quizScore++;
    }

    const expDiv = document.getElementById('quiz-explanation');
    expDiv.innerHTML = `<strong>Explanation:</strong> ${q.explanation}`;
    expDiv.classList.remove('d-none');
    document.getElementById('quiz-next-container').classList.remove('d-none');
}

function nextQuizQuestion() {
    appState.currentQuizIndex++;
    renderQuiz();
}

function restartQuiz() {
    appState.currentQuizIndex = 0;
    appState.quizScore = 0;
    renderQuiz();
}

// ==========================================
// Coding & Logic Challenges Logic
// ==========================================
function renderChallenge() {
    const container = document.getElementById('challenge-card-container');
    if (!container) return;

    if (appState.currentChallengeIndex >= challengeData.length) {
        container.innerHTML = `
            <div class="text-center py-4">
                <i class="bi bi-terminal text-violet display-3 mb-3 d-block"></i>
                <h3 class="fw-black text-white mb-2">Challenges Completed!</h3>
                <h2 class="fw-bold text-cyan font-monospace mb-3">${appState.challengeScore} Points Earned</h2>
                <p class="text-secondary mb-4">You successfully solved all logic and circuit calculation challenges.</p>
                <button class="btn btn-cyan px-5 py-3 rounded-pill fw-bold shadow-neon" onclick="restartChallenges()">
                    <i class="bi bi-arrow-counterclockwise me-2"></i> Restart Challenges
                </button>
            </div>
        `;
        return;
    }

    const c = challengeData[appState.currentChallengeIndex];
    container.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4 border-bottom border-secondary border-opacity-25 pb-3">
            <div>
                <span class="text-violet text-xs uppercase fw-bold">Challenge ${appState.currentChallengeIndex + 1} of ${challengeData.length}</span>
                <h4 class="fw-bold text-white mb-0">${c.title}</h4>
            </div>
            <span class="badge bg-secondary bg-opacity-20 text-light border border-secondary border-opacity-25">${c.category}</span>
        </div>
        <p class="text-light fs-sm mb-4 leading-relaxed">${c.description}</p>
        <div class="d-grid gap-3 mb-4" id="challenge-options-list">
            ${c.options.map((opt, idx) => `
                <button class="btn btn-outline-secondary text-start text-light p-3 rounded-4 border border-secondary border-opacity-25 glass-card" onclick="checkChallengeAnswer(${idx})">
                    <span class="fw-bold text-violet me-2">${String.fromCharCode(65 + idx)}.</span> ${opt}
                </button>
            `).join('')}
        </div>
        <div id="challenge-explanation" class="d-none p-3 rounded-3 bg-dark bg-opacity-80 border border-secondary border-opacity-20 text-secondary fs-xs mb-3"></div>
        <div class="text-end d-none" id="challenge-next-container">
            <button class="btn btn-violet px-4 py-2 rounded-pill fw-bold text-xs" onclick="nextChallenge()">Next Challenge <i class="bi bi-arrow-right"></i></button>
        </div>
    `;
}

function checkChallengeAnswer(selectedIndex) {
    const c = challengeData[appState.currentChallengeIndex];
    const buttons = document.querySelectorAll('#challenge-options-list button');
    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === c.correct) {
            btn.classList.remove('btn-outline-secondary', 'text-light');
            btn.classList.add('btn-success', 'fw-bold');
        } else if (idx === selectedIndex) {
            btn.classList.remove('btn-outline-secondary', 'text-light');
            btn.classList.add('btn-danger', 'fw-bold');
        }
    });

    if (selectedIndex === c.correct) {
        appState.challengeScore += 10;
        localStorage.setItem('circuitverse_challenge_score', appState.challengeScore);
        updateDashboardStats();
    }

    const expDiv = document.getElementById('challenge-explanation');
    expDiv.innerHTML = `<strong>Solution Explanation:</strong> ${c.explanation}`;
    expDiv.classList.remove('d-none');
    document.getElementById('challenge-next-container').classList.remove('d-none');
}

function nextChallenge() {
    appState.currentChallengeIndex++;
    renderChallenge();
}

function restartChallenges() {
    appState.currentChallengeIndex = 0;
    renderChallenge();
}

// ==========================================
// AI Tutor Assistant Logic
// ==========================================
const aiKnowledgeBase = [
    {
        keywords: ['ohm', 'law', 'voltage', 'current', 'resistance'],
        response: "Ohm's Law states that voltage (V) equals current (I) multiplied by resistance (R). Formula: V = I × R. It is the core principle governing electrical circuits."
    },
    {
        keywords: ['gate', 'and', 'or', 'xor', 'logic', 'adder'],
        response: "Logic gates implement Boolean functions. Adders combine gates to perform binary arithmetic: Half Adders use XOR and AND, while Full Adders incorporate a Carry-in ($C_{in}$) for multi-bit summation."
    },
    {
        keywords: ['sensor', 'temperature', 'ldr', 'light'],
        response: "Sensors convert physical parameters into electrical signals. Temperature sensors (like LM35) output linear voltage, while Light Dependent Resistors (LDRs) change resistance according to lux levels."
    },
    {
        keywords: ['iot', 'internet', 'smart', 'mqtt'],
        response: "IoT (Internet of Things) connects embedded microcontroller sensor nodes to cloud dashboards via lightweight protocols like MQTT or HTTP for real-time actuation."
    },
    {
        keywords: ['nyquist', 'sampling', 'dsp', 'signal'],
        response: "The Nyquist-Shannon sampling theorem states that to accurately reconstruct a signal without aliasing, the sampling frequency must be strictly greater than twice the highest signal frequency (fs ≥ 2fmax)."
    }
];

function sendPrompt(text) {
    document.getElementById('chat-input-field').value = text;
}

function handleChatSubmit(e) {
    e.preventDefault();
    const inputField = document.getElementById('chat-input-field');
    const query = inputField.value.trim();
    if (!query) return;

    const container = document.getElementById('chat-messages-container');

    // Append User Message
    container.innerHTML += `
        <div class="d-flex align-items-start gap-3 justify-content-end">
            <div class="p-3 rounded-4 bg-violet bg-opacity-20 border border-violet border-opacity-30 text-white fs-sm max-w-75">
                ${escapeHtml(query)}
            </div>
            <div class="rounded-circle bg-violet text-dark d-flex align-items-center justify-content-center p-2 flex-shrink-0" style="width: 35px; height: 35px;">
                <i class="bi bi-person-fill"></i>
            </div>
        </div>
    `;
    inputField.value = '';
    container.scrollTop = container.scrollHeight;

    // Simulate AI Response lookup
    setTimeout(() => {
        const lower = query.toLowerCase();
        let reply = "That is an insightful ENTC query! Modern electronics engineering relies on precise signal conditioning, robust logic design, and reliable power distribution. Check out our Virtual Lab or Learning Hub for further exploration.";

        for (const item of aiKnowledgeBase) {
            if (item.keywords.some(kw => lower.includes(kw))) {
                reply = item.response;
                break;
            }
        }

        container.innerHTML += `
            <div class="d-flex align-items-start gap-3">
                <div class="rounded-circle bg-cyan bg-opacity-10 text-cyan d-flex align-items-center justify-content-center p-2 flex-shrink-0" style="width: 35px; height: 35px;">
                    <i class="bi bi-robot"></i>
                </div>
                <div class="p-3 rounded-4 bg-dark bg-opacity-70 border border-secondary border-opacity-20 text-secondary fs-sm max-w-75">
                    ${reply}
                </div>
            </div>
        `;
        container.scrollTop = container.scrollHeight;
    }, 500);
}

function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// ==========================================
// Progress Tracker Logic
// ==========================================
function updateProgressUI() {
    const completedCount = Object.keys(appState.completedModules).length;
    const totalModules = learningModulesData.length;
    const percentage = Math.round((completedCount / totalModules) * 100);

    const bar = document.getElementById('progress-bar-fill');
    const text = document.getElementById('progress-percentage-text');
    const quizScoreEl = document.getElementById('progress-quiz-score');
    const chalScoreEl = document.getElementById('progress-challenge-score');

    if (bar) bar.style.width = `${percentage}%`;
    if (text) text.textContent = `${percentage}%`;
    if (quizScoreEl) quizScoreEl.textContent = `${appState.quizBestScore}%`;
    if (chalScoreEl) chalScoreEl.textContent = `${appState.challengeScore} pts`;
}

function resetProgressData() {
    if (confirm('Are you sure you want to reset all learning progress, quiz scores, and challenge points?')) {
        localStorage.clear();
        appState.completedModules = {};
        appState.quizBestScore = 0;
        appState.challengeScore = 0;
        updateDashboardStats();
        renderLearningModules();
        updateProgressUI();
        alert('Progress successfully reset.');
    }
}