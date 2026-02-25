// ============================================
// DATOS DE PREGUNTAS DEL EXAMEN (50% de las preguntas)
// ============================================

const quizQuestions = [
    // SECCIÓN A: Conceptual (Preguntas 1-8)
    {
        id: 1,
        type: "multiple",
        question: "¿Cuál es la diferencia fundamental entre alotropía y polimorfismo?",
        options: [
            "La alotropía ocurre solo en elementos puros, mientras que el polimorfismo ocurre en compuestos",
            "La alotropía es reversible y el polimorfismo es irreversible",
            "No hay diferencia, son sinónimos",
            "La alotropía depende de la temperatura y el polimorfismo de la presión"
        ],
        correct: 0,
        explanation: "La alotropía se refiere exclusivamente a elementos puros (Fe, C, Sn), mientras que el polimorfismo describe la capacidad de compuestos químicos para existir en múltiples formas cristalinas."
    },
    {
        id: 2,
        type: "multiple",
        question: "En la estructura BCC del hierro α, ¿cuántos átomos de hierro rodean a un átomo central?",
        options: [
            "6 átomos",
            "8 átomos",
            "12 átomos",
            "4 átomos"
        ],
        correct: 1,
        explanation: "En la estructura BCC (Body-Centered Cubic), cada átomo central está rodeado por 8 átomos en los vértices de un cubo."
    },
    {
        id: 3,
        type: "multiple",
        question: "¿Por qué el diamante es más duro que el grafito si ambos son alótropos del carbono?",
        options: [
            "El diamante tiene mayor densidad",
            "El diamante tiene una red 3D con enlaces covalentes fuertes en todas direcciones, mientras que el grafito tiene capas débilmente unidas",
            "El diamante tiene más electrones",
            "El grafito se degrada más fácilmente con el tiempo"
        ],
        correct: 1,
        explanation: "La dureza del diamante proviene de su estructura 3D con enlaces covalentes fuertes en todas direcciones. El grafito tiene capas que pueden deslizar fácilmente entre sí debido a fuerzas de Van der Waals débiles."
    },
    {
        id: 4,
        type: "multiple",
        question: "¿Qué es la cristalinidad en polímeros?",
        options: [
            "El grado de transparencia del polímero",
            "El grado de orden en la disposición de las cadenas poliméricas",
            "La temperatura de fusión del polímero",
            "La resistencia a la tracción del material"
        ],
        correct: 1,
        explanation: "La cristalinidad es el grado de orden en la disposición de las cadenas poliméricas. Mayor cristalinidad implica mayor rigidez y resistencia, pero menor ductilidad."
    },
    {
        id: 5,
        type: "multiple",
        question: "¿Cuál es la relación entre la Temperatura de Transición Vítrea (Tg) y el comportamiento mecánico de un polímero?",
        options: [
            "Por debajo de Tg, el polímero es gomoso; por encima, es vítreo",
            "Por debajo de Tg, el polímero es vítreo y frágil; por encima, es gomoso y flexible",
            "Tg es la temperatura de fusión del polímero",
            "Tg no afecta el comportamiento mecánico"
        ],
        correct: 1,
        explanation: "Por debajo de Tg, las cadenas están 'congeladas' y el polímero es rígido y frágil (estado vítreo). Por encima de Tg, adquieren movilidad y el material es flexible (estado gomoso)."
    },
    {
        id: 6,
        type: "multiple",
        question: "¿Qué caracteriza a los materiales cerámicos en términos de enlaces atómicos?",
        options: [
            "Enlaces metálicos débiles",
            "Enlaces iónicos y covalentes muy fuertes",
            "Enlaces de Van der Waals",
            "Enlaces de hidrógeno"
        ],
        correct: 1,
        explanation: "Los cerámicos tienen enlaces iónicos y covalentes muy fuertes, lo que explica su dureza, fragilidad y alta resistencia térmica."
    },
    {
        id: 7,
        type: "multiple",
        question: "¿Por qué los cerámicos son frágiles a pesar de ser muy duros?",
        options: [
            "Porque tienen baja densidad",
            "Porque sus enlaces rígidos no permiten deformación plástica; la energía se libera en fractura súbita",
            "Porque absorben agua fácilmente",
            "Porque tienen baja conductividad térmica"
        ],
        correct: 1,
        explanation: "La fragilidad de los cerámicos es consecuencia directa de la rigidez de sus enlaces. No pueden deformarse plásticamente, por lo que la energía se libera en una fractura repentina y catastrófica."
    },
    {
        id: 8,
        type: "multiple",
        question: "¿Cuál es el rol de la interfase en un material compuesto?",
        options: [
            "Decorativa",
            "Transferir esfuerzos entre la matriz y el refuerzo, permitiendo desviar grietas",
            "Aumentar el peso del material",
            "Reducir la conductividad térmica"
        ],
        correct: 1,
        explanation: "La interfase es crítica para transferir esfuerzos desde la matriz hacia el refuerzo. Una buena adherencia permite desviar grietas y aumentar la tenacidad del compuesto."
    },

    // SECCIÓN B: Análisis Estructural (Preguntas 9-11)
    {
        id: 9,
        type: "multiple",
        question: "¿Cómo afecta el tratamiento térmico a la microestructura del acero?",
        options: [
            "No tiene efecto",
            "Modifica la proporción de fases (austenita, ferrita, cementita) y el tamaño de grano, alterando propiedades mecánicas",
            "Solo cambia el color",
            "Aumenta la densidad permanentemente"
        ],
        correct: 1,
        explanation: "El tratamiento térmico modifica la microestructura al cambiar la proporción de fases presentes y el tamaño de grano. Esto permite ajustar propiedades como dureza, ductilidad y resistencia."
    },
    {
        id: 10,
        type: "multiple",
        question: "¿Qué sucede cuando se calienta un polímero semicristalino por encima de su Tg?",
        options: [
            "Se funde completamente",
            "Las zonas amorfas adquieren movilidad, pero las zonas cristalinas permanecen ordenadas",
            "Se vuelve más duro",
            "Se disuelve en agua"
        ],
        correct: 1,
        explanation: "Cuando se supera Tg, las zonas amorfas se ablandan y adquieren movilidad, pero las zonas cristalinas mantienen su orden. El material se vuelve flexible pero no se funde (eso ocurre en Tm)."
    },
    {
        id: 11,
        type: "multiple",
        question: "¿Cómo influye el dopaje en la conductividad de un semiconductor?",
        options: [
            "No tiene efecto",
            "Aumenta la concentración de portadores de carga (electrones o huecos), incrementando la conductividad",
            "Reduce la conductividad",
            "Solo afecta el color del material"
        ],
        correct: 1,
        explanation: "El dopaje introduce impurezas que generan portadores de carga adicionales. El dopaje tipo N añade electrones; el tipo P añade huecos. Ambos aumentan significativamente la conductividad."
    },

    // SECCIÓN C: Aplicación Ashby (Preguntas 12-13)
    {
        id: 12,
        type: "multiple",
        question: "En el diseño de un ala de avión, ¿cuál es el índice de desempeño más importante?",
        options: [
            "Resistencia/Densidad (R/ρ) para maximizar rigidez con mínimo peso",
            "Conductividad térmica",
            "Dureza absoluta",
            "Costo por kg"
        ],
        correct: 0,
        explanation: "Para aplicaciones aeroespaciales, la relación resistencia/peso (R/ρ) es crítica. Materiales como la fibra de carbono y aleaciones de aluminio son preferidos por su alto índice R/ρ."
    },
    {
        id: 13,
        type: "multiple",
        question: "¿Por qué se prefieren los polímeros reforzados con fibra de carbono sobre el acero en la industria aeroespacial?",
        options: [
            "Son más baratos",
            "Tienen mayor índice resistencia/peso, reduciendo combustible necesario y aumentando carga útil",
            "Son más fáciles de fabricar",
            "Tienen mejor conductividad térmica"
        ],
        correct: 1,
        explanation: "Los compuestos de fibra de carbono ofrecen un índice R/ρ superior al acero, lo que permite reducir peso, consumo de combustible y aumentar la carga útil del avión."
    },

    // SECCIÓN D: Caso Integrador (Preguntas 14-16)
    {
        id: 14,
        type: "multiple",
        question: "En un diodo semiconductor para aplicaciones espaciales, ¿cuál es el principal desafío de la radiación?",
        options: [
            "Aumenta la conductividad",
            "Genera defectos que atrapan portadores de carga, reduciendo eficiencia",
            "Cambia el color del material",
            "Aumenta la temperatura de fusión"
        ],
        correct: 1,
        explanation: "La radiación cósmica en el espacio crea defectos en la red cristalina que actúan como trampas para portadores de carga, reduciendo la eficiencia del diodo. Por eso se usan materiales más resistentes como GaAs."
    },
    {
        id: 15,
        type: "multiple",
        question: "¿Por qué el GaAs es preferido sobre Si para celdas solares en satélites?",
        options: [
            "Es más barato",
            "Tiene mayor brecha de energía (Eg ≈ 1.42 eV), mejor eficiencia bajo radiación y mayor resistencia a defectos",
            "Es más fácil de fabricar",
            "Tiene menor densidad"
        ],
        correct: 1,
        explanation: "GaAs tiene una brecha de energía más grande que Si, lo que lo hace más resistente a la radiación. Además, su estructura cristalina es más robusta frente a defectos generados por radiación."
    },
    {
        id: 16,
        type: "multiple",
        question: "¿Cuál es la relación entre estructura cristalina, dopaje y desempeño en un diodo semiconductor?",
        options: [
            "No hay relación",
            "La estructura define la brecha de energía; el dopaje controla portadores; juntos determinan eficiencia y voltaje de operación",
            "Solo la estructura importa",
            "Solo el dopaje importa"
        ],
        correct: 1,
        explanation: "La estructura cristalina (Si, GaAs, etc.) define la brecha de energía Eg. El dopaje (tipo N o P) controla la concentración de portadores. Ambos factores determinan el voltaje de circuito abierto (Voc) y la eficiencia del diodo."
    }
];

// ============================================
// FLASHCARDS DATA
// ============================================

const flashcardsData = [
    { front: "Alotropía", back: "Capacidad de un elemento puro para existir en múltiples formas cristalinas bajo diferentes condiciones de temperatura y presión." },
    { front: "Polimorfismo", back: "Capacidad de un compuesto químico para cristalizar en más de una estructura cristalina con la misma composición química." },
    { front: "Estructura BCC", back: "Body-Centered Cubic. Estructura cúbica con un átomo en el centro y 8 en los vértices. Ejemplo: Hierro α." },
    { front: "Estructura FCC", back: "Face-Centered Cubic. Estructura cúbica con átomos en los vértices y en el centro de cada cara. Ejemplo: Hierro γ, Aluminio." },
    { front: "Cristalinidad", back: "Grado de orden en la disposición de las cadenas poliméricas. Mayor cristalinidad = mayor rigidez y resistencia, menor ductilidad." },
    { front: "Temperatura de Transición Vítrea (Tg)", back: "Temperatura a la que un polímero pasa de estado vítreo (rígido) a estado gomoso (flexible). Las cadenas adquieren movilidad." },
    { front: "Enlace Iónico", back: "Enlace entre átomos con diferente electronegatividad, donde se transfieren electrones. Presente en cerámicos como NaCl." },
    { front: "Enlace Covalente", back: "Enlace donde átomos comparten electrones. Muy fuerte y direccional. Presente en diamante, Si, GaAs." },
    { front: "Interfase", back: "Región de contacto entre la matriz y el refuerzo en un compuesto. Crítica para transferir esfuerzos y desviar grietas." },
    { front: "Índice R/ρ", back: "Relación resistencia/densidad. Parámetro clave en diseño de estructuras ligeras. Mayor R/ρ = mejor para aplicaciones aeroespaciales." },
    { front: "Dopaje Tipo N", back: "Adición de impurezas donadoras (P, As) a un semiconductor. Genera electrones como portadores mayoritarios." },
    { front: "Dopaje Tipo P", back: "Adición de impurezas aceptoras (B, Ga) a un semiconductor. Genera huecos como portadores mayoritarios." },
    { front: "Unión P-N", back: "Interfase entre regiones dopadas tipo P y tipo N. Base de diodos, transistores y celdas solares." },
    { front: "Brecha de Energía (Eg)", back: "Diferencia de energía entre banda de conducción y banda de valencia. Define si un material es conductor, semiconductor o aislante." },
    { front: "Fractura Frágil", back: "Rotura repentina sin deformación plástica previa. Característica de cerámicos y vidrios debido a enlaces rígidos." }
];

// ============================================
// CLASSIFIER DATA
// ============================================

const classifierMaterials = [
    { name: "Hierro", category: "Metales" },
    { name: "Polietileno", category: "Polímeros" },
    { name: "Alúmina (Al₂O₃)", category: "Cerámicos" },
    { name: "Fibra de Carbono/Resina", category: "Compuestos" },
    { name: "Cobre", category: "Metales" },
    { name: "Poliestireno", category: "Polímeros" },
    { name: "Zirconia (ZrO₂)", category: "Cerámicos" },
    { name: "Vidrio Reforzado", category: "Compuestos" },
    { name: "Aluminio", category: "Metales" },
    { name: "Nylon", category: "Polímeros" },
    { name: "Carburo de Silicio (SiC)", category: "Cerámicos" },
    { name: "Kevlar/Resina", category: "Compuestos" }
];

// ============================================
// COMPARATOR DATA
// ============================================

const materialsComparison = {
    "Acero": {
        Densidad: "7.85 g/cm³",
        ResistenciaTensil: "250-400 MPa",
        Modulo: "200 GPa",
        Ductilidad: "Alta",
        ConductividadTermica: "50 W/m·K",
        Costo: "Bajo-Medio"
    },
    "Aluminio": {
        Densidad: "2.70 g/cm³",
        ResistenciaTensil: "70-500 MPa",
        Modulo: "70 GPa",
        Ductilidad: "Alta",
        ConductividadTermica: "160 W/m·K",
        Costo: "Medio"
    },
    "Fibra de Carbono": {
        Densidad: "1.55 g/cm³",
        ResistenciaTensil: "3500 MPa",
        Modulo: "230 GPa",
        Ductilidad: "Baja",
        ConductividadTermica: "5 W/m·K",
        Costo: "Alto"
    },
    "Cerámica (Al₂O₃)": {
        Densidad: "3.95 g/cm³",
        ResistenciaTensil: "300-400 MPa",
        Modulo: "300 GPa",
        Ductilidad: "Muy Baja",
        ConductividadTermica: "30 W/m·K",
        Costo: "Medio"
    },
    "Polímero (PE)": {
        Densidad: "0.92 g/cm³",
        ResistenciaTensil: "20-40 MPa",
        Modulo: "1 GPa",
        Ductilidad: "Alta",
        ConductividadTermica: "0.5 W/m·K",
        Costo: "Bajo"
    }
};

// ============================================
// VARIABLES GLOBALES
// ============================================

let currentQuizIndex = 0;
let quizScore = 0;
let currentFlashcardIndex = 0;
let flashcardFlipped = false;
let classifierScore = 0;
let selectedMaterials = [];

// ============================================
// FUNCIONES PRINCIPALES
// ============================================

function switchResource(resource) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.resource-section');
    sections.forEach(section => section.classList.remove('active'));

    // Mostrar la sección seleccionada
    const selectedSection = document.getElementById(resource);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }

    // Actualizar botones de tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Inicializar el recurso
    switch(resource) {
        case 'quiz':
            initializeQuiz();
            break;
        case 'flashcards':
            initializeFlashcards();
            break;
        case 'classifier':
            initializeClassifier();
            break;
        case 'comparator':
            initializeComparator();
            break;
        case 'pspd':
            initializePSPD();
            break;
    }
}

// ============================================
// QUIZ FUNCTIONS
// ============================================

function initializeQuiz() {
    currentQuizIndex = 0;
    quizScore = 0;
    displayQuizQuestion();
}

function displayQuizQuestion() {
    const quizContent = document.getElementById('quiz-content');
    
    if (currentQuizIndex >= quizQuestions.length) {
        displayQuizResults();
        return;
    }

    const question = quizQuestions[currentQuizIndex];
    const progress = ((currentQuizIndex + 1) / quizQuestions.length) * 100;

    let html = `
        <div class="quiz-progress">
            <div>Pregunta ${currentQuizIndex + 1} de ${quizQuestions.length}</div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
        </div>

        <div class="question-card">
            <div class="question-number">Pregunta ${currentQuizIndex + 1}</div>
            <div class="question-text">${question.question}</div>
            <div class="options">
    `;

    question.options.forEach((option, index) => {
        html += `
            <button class="option" onclick="selectAnswer(${index})">${option}</button>
        `;
    });

    html += `
            </div>
        </div>
    `;

    quizContent.innerHTML = html;
}

function selectAnswer(index) {
    const question = quizQuestions[currentQuizIndex];
    const quizContent = document.getElementById('quiz-content');
    const options = quizContent.querySelectorAll('.option');

    // Desabilitar todos los botones
    options.forEach(opt => opt.disabled = true);

    if (index === question.correct) {
        quizScore++;
        options[index].classList.add('correct');
        quizContent.innerHTML += `
            <div class="feedback correct">
                ✓ ¡Correcto! ${question.explanation}
            </div>
        `;
    } else {
        options[index].classList.add('incorrect');
        options[question.correct].classList.add('correct');
        quizContent.innerHTML += `
            <div class="feedback incorrect">
                ✗ Incorrecto. La respuesta correcta es: ${question.options[question.correct]}<br><br>
                ${question.explanation}
            </div>
        `;
    }

    quizContent.innerHTML += `
        <div class="quiz-controls">
            <button class="btn btn-secondary" onclick="nextQuestion()">Siguiente Pregunta</button>
        </div>
    `;
}

function nextQuestion() {
    currentQuizIndex++;
    displayQuizQuestion();
}

function displayQuizResults() {
    const quizContent = document.getElementById('quiz-content');
    const percentage = (quizScore / quizQuestions.length) * 100;
    const rating = percentage >= 80 ? "¡Excelente!" : percentage >= 60 ? "Bien" : "Necesitas estudiar más";

    quizContent.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <h3 style="font-size: 2rem; margin-bottom: 20px;">Quiz Completado</h3>
            <div style="font-size: 3rem; color: var(--secondary-color); margin-bottom: 20px; font-weight: bold;">
                ${quizScore}/${quizQuestions.length}
            </div>
            <div style="font-size: 1.5rem; margin-bottom: 10px;">
                ${percentage.toFixed(1)}%
            </div>
            <div style="font-size: 1.2rem; color: var(--primary-color); margin-bottom: 30px;">
                ${rating}
            </div>
            <button class="btn btn-secondary" onclick="initializeQuiz()">Reintentar Quiz</button>
        </div>
    `;
}

// ============================================
// FLASHCARDS FUNCTIONS
// ============================================

function initializeFlashcards() {
    currentFlashcardIndex = 0;
    flashcardFlipped = false;
    displayFlashcard();
}

function displayFlashcard() {
    const flashcardsContent = document.getElementById('flashcards-content');
    
    if (currentFlashcardIndex >= flashcardsData.length) {
        flashcardsContent.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <h3>¡Completaste todas las flashcards!</h3>
                <button class="btn btn-secondary" onclick="initializeFlashcards()">Comenzar de Nuevo</button>
            </div>
        `;
        return;
    }

    const card = flashcardsData[currentFlashcardIndex];
    const progress = ((currentFlashcardIndex + 1) / flashcardsData.length) * 100;

    flashcardsContent.innerHTML = `
        <div style="margin-bottom: 20px;">
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
            <div style="text-align: center; margin-top: 10px; color: var(--text-light);">
                ${currentFlashcardIndex + 1} de ${flashcardsData.length}
            </div>
        </div>

        <div class="flashcard ${flashcardFlipped ? 'flipped' : ''}" onclick="toggleFlashcard()">
            <div class="flashcard-label">${flashcardFlipped ? 'Respuesta' : 'Pregunta'}</div>
            <div class="flashcard-content">
                ${flashcardFlipped ? card.back : card.front}
            </div>
        </div>

        <div class="flashcards-controls">
            <button class="btn btn-secondary btn-small" onclick="previousFlashcard()" ${currentFlashcardIndex === 0 ? 'disabled' : ''}>← Anterior</button>
            <button class="btn btn-primary btn-small" onclick="nextFlashcard()">Siguiente →</button>
        </div>
    `;
}

function toggleFlashcard() {
    flashcardFlipped = !flashcardFlipped;
    displayFlashcard();
}

function previousFlashcard() {
    if (currentFlashcardIndex > 0) {
        currentFlashcardIndex--;
        flashcardFlipped = false;
        displayFlashcard();
    }
}

function nextFlashcard() {
    if (currentFlashcardIndex < flashcardsData.length - 1) {
        currentFlashcardIndex++;
        flashcardFlipped = false;
        displayFlashcard();
    }
}

// ============================================
// CLASSIFIER FUNCTIONS
// ============================================

function initializeClassifier() {
    const classifierContent = document.getElementById('classifier-content');
    
    let html = `
        <div style="margin-bottom: 20px;">
            <p style="color: var(--text-light); margin-bottom: 15px;">Arrastra los materiales a su categoría correspondiente.</p>
            <div class="materials-list" id="materials-list">
    `;

    classifierMaterials.forEach((material, index) => {
        html += `
            <div class="material-item" draggable="true" 
                 ondragstart="dragStart(event, '${material.name}')"
                 ondragend="dragEnd(event)">
                ${material.name}
            </div>
        `;
    });

    html += `
            </div>
        </div>

        <div class="categories">
    `;

    const categories = ["Metales", "Polímeros", "Cerámicos", "Compuestos"];
    categories.forEach(category => {
        html += `
            <div class="category-drop" 
                 ondragover="dragOver(event)" 
                 ondrop="drop(event, '${category}')"
                 ondragleave="dragLeave(event)"
                 id="category-${category}">
                <div class="category-title">${category}</div>
                <div class="dropped-items" id="items-${category}"></div>
            </div>
        `;
    });

    html += `
        </div>

        <div class="quiz-controls" style="margin-top: 30px;">
            <button class="btn btn-secondary" onclick="checkClassifierAnswers()">Verificar Respuestas</button>
            <button class="btn btn-primary" onclick="initializeClassifier()">Reiniciar</button>
        </div>
    `;

    classifierContent.innerHTML = html;
}

let draggedMaterial = null;

function dragStart(event, material) {
    draggedMaterial = material;
    event.dataTransfer.effectAllowed = "move";
}

function dragEnd(event) {
    draggedMaterial = null;
}

function dragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    event.target.closest('.category-drop').classList.add('drag-over');
}

function dragLeave(event) {
    event.target.closest('.category-drop').classList.remove('drag-over');
}

function drop(event, category) {
    event.preventDefault();
    event.target.closest('.category-drop').classList.remove('drag-over');
    
    if (draggedMaterial) {
        const itemsContainer = document.getElementById(`items-${category}`);
        const droppedItem = document.createElement('div');
        droppedItem.className = 'dropped-item';
        droppedItem.textContent = draggedMaterial;
        itemsContainer.appendChild(droppedItem);
    }
}

function checkClassifierAnswers() {
    let correct = 0;
    const categories = ["Metales", "Polímeros", "Cerámicos", "Compuestos"];
    
    categories.forEach(category => {
        const itemsContainer = document.getElementById(`items-${category}`);
        const items = itemsContainer.querySelectorAll('.dropped-item');
        
        items.forEach(item => {
            const material = classifierMaterials.find(m => m.name === item.textContent);
            if (material && material.category === category) {
                item.style.background = '#d4edda';
                item.style.borderLeftColor = '#27AE60';
                correct++;
            } else {
                item.style.background = '#f8d7da';
                item.style.borderLeftColor = '#E74C3C';
            }
        });
    });

    alert(`¡Correcto: ${correct}/${classifierMaterials.length}!`);
}

// ============================================
// COMPARATOR FUNCTIONS
// ============================================

function initializeComparator() {
    const comparatorContent = document.getElementById('comparator-content');
    
    let html = `
        <p style="color: var(--text-light); margin-bottom: 20px;">Selecciona materiales para compararlos:</p>
        <div class="material-selector">
    `;

    Object.keys(materialsComparison).forEach(material => {
        html += `
            <button class="material-option" onclick="toggleMaterial('${material}')" id="mat-${material}">
                ${material}
            </button>
        `;
    });

    html += `
        </div>

        <div id="comparison-table-container"></div>
    `;

    comparatorContent.innerHTML = html;
    selectedMaterials = [];
}

function toggleMaterial(material) {
    const button = document.getElementById(`mat-${material}`);
    
    if (selectedMaterials.includes(material)) {
        selectedMaterials = selectedMaterials.filter(m => m !== material);
        button.classList.remove('selected');
    } else {
        selectedMaterials.push(material);
        button.classList.add('selected');
    }

    displayComparisonTable();
}

function displayComparisonTable() {
    const container = document.getElementById('comparison-table-container');
    
    if (selectedMaterials.length === 0) {
        container.innerHTML = '';
        return;
    }

    const properties = Object.keys(materialsComparison[selectedMaterials[0]]);
    
    let html = `
        <table class="comparison-table">
            <thead>
                <tr>
                    <th>Propiedad</th>
    `;

    selectedMaterials.forEach(material => {
        html += `<th>${material}</th>`;
    });

    html += `
                </tr>
            </thead>
            <tbody>
    `;

    properties.forEach(property => {
        html += `<tr><td><strong>${property}</strong></td>`;
        selectedMaterials.forEach(material => {
            html += `<td>${materialsComparison[material][property]}</td>`;
        });
        html += `</tr>`;
    });

    html += `
            </tbody>
        </table>
    `;

    container.innerHTML = html;
}

// ============================================
// PSPD FUNCTIONS
// ============================================

function initializePSPD() {
    const pspdContent = document.getElementById('pspd-content');
    
    pspdContent.innerHTML = `
        <p style="color: var(--text-light); margin-bottom: 20px;">Explora la relación Proceso-Estructura-Propiedad-Desempeño:</p>
        
        <div class="pspd-flow">
            <div class="pspd-box proceso">
                <div class="pspd-title">PROCESO</div>
                <div class="pspd-content">
                    Tratamiento térmico, laminado, dopaje, moldeo
                </div>
            </div>

            <div style="display: flex; align-items: center; justify-content: center;">→</div>

            <div class="pspd-box estructura">
                <div class="pspd-title">ESTRUCTURA</div>
                <div class="pspd-content">
                    Fases, tamaño de grano, cristalinidad, defectos
                </div>
            </div>

            <div style="display: flex; align-items: center; justify-content: center;">→</div>

            <div class="pspd-box propiedad">
                <div class="pspd-title">PROPIEDAD</div>
                <div class="pspd-content">
                    Dureza, resistencia, ductilidad, conductividad
                </div>
            </div>

            <div style="display: flex; align-items: center; justify-content: center;">→</div>

            <div class="pspd-box desempeño">
                <div class="pspd-title">DESEMPEÑO</div>
                <div class="pspd-content">
                    Aplicación final, vida útil, confiabilidad
                </div>
            </div>
        </div>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: var(--primary-color); margin-bottom: 10px;">Ejemplo: Acero para herramientas</h4>
            <p><strong>Proceso:</strong> Temple a alta temperatura + enfriamiento rápido</p>
            <p><strong>Estructura:</strong> Martensita (fase dura) + carburos</p>
            <p><strong>Propiedad:</strong> Dureza muy alta (60-65 HRC)</p>
            <p><strong>Desempeño:</strong> Excelente para cortar otros materiales</p>
        </div>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
            <h4 style="color: var(--primary-color); margin-bottom: 10px;">Ejemplo: Polímero semicristalino</h4>
            <p><strong>Proceso:</strong> Enfriamiento controlado después del moldeo</p>
            <p><strong>Estructura:</strong> Zonas cristalinas + amorfas (cristalinidad ~60%)</p>
            <p><strong>Propiedad:</strong> Rigidez moderada, buena ductilidad</p>
            <p><strong>Desempeño:</strong> Ideal para envases que necesitan flexibilidad</p>
        </div>
    `;
}

// ============================================
// INICIALIZACIÓN AL CARGAR
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
});
