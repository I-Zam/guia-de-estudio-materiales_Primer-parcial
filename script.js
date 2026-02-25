// ===== VARIABLES GLOBALES =====
let currentQuestionIndex = 0;
let quizScore = 0;
let selectedAnswers = [];
let currentFlashcardIndex = 0;
let selectedMaterials = [];
let draggedElement = null;

// ===== DATOS DE FLASHCARDS =====
const flashcards = [
    { front: "Enlace Metálico", back: "Nube de electrones móviles que permite conducción eléctrica y térmica." },
    { front: "Enlace Iónico", back: "Transferencia de electrones entre átomos, formando cationes y aniones." },
    { front: "Enlace Covalente", back: "Compartición de electrones entre átomos para alcanzar estabilidad." },
    { front: "Alotropía", back: "Capacidad de un elemento puro para existir en múltiples formas cristalinas." },
    { front: "Polimorfismo", back: "Capacidad de un compuesto para cristalizar en más de una estructura." },
    { front: "Isotropía", back: "Propiedades iguales en todas las direcciones del material." },
    { front: "Anisotropía", back: "Propiedades que varían según la dirección del material." },
    { front: "Monómero", back: "Unidad molecular pequeña que se repite para formar un polímero." },
    { front: "Polímero", back: "Macromolécula formada por la repetición de monómeros unidos por enlaces covalentes." },
    { front: "Termoplástico", back: "Polímero que se funde al calentarse y se solidifica al enfriar." },
    { front: "Termoestable", back: "Polímero que no se funde, se quema antes de cambiar de estado." },
    { front: "Elastómero", back: "Polímero con gran elasticidad y capacidad de recuperar su forma." },
    { front: "Cristalinidad", back: "Grado de orden en la estructura molecular de un polímero." },
    { front: "Temperatura de Transición Vítrea (Tg)", back: "Temperatura a la que un polímero pasa de estado vítreo a gomoso." },
    { front: "Punto de Fusión (Tm)", back: "Temperatura a la que un material sólido se convierte en líquido." },
    { front: "Dureza", back: "Resistencia de un material a la deformación o rayado." },
    { front: "Ductilidad", back: "Capacidad de un material para deformarse sin romperse." },
    { front: "Fragilidad", back: "Tendencia de un material a romperse sin deformación previa." },
    { front: "Tenacidad", back: "Capacidad de un material para absorber energía antes de fracturarse." },
    { front: "Resistencia a la Compresión", back: "Capacidad de un material para soportar fuerzas de compresión." },
    { front: "Módulo de Young", back: "Medida de la rigidez de un material bajo esfuerzo de tracción." },
    { front: "Cerámica", back: "Material inorgánico no metálico formado por combinación de elementos metálicos y no metálicos." },
    { front: "Refractario", back: "Cerámica diseñada para mantener propiedades a temperaturas muy elevadas (>1500°C)." },
    { front: "Vidrio", back: "Cerámica amorfa formada por enfriamiento rápido de un líquido fundido." },
    { front: "Material Compuesto", back: "Combinación de dos o más materiales con propiedades diferentes." },
    { front: "Matriz", back: "Material continuo que rodea y soporta al refuerzo en un compuesto." },
    { front: "Refuerzo", back: "Fase dispersa que proporciona resistencia al compuesto." },
    { front: "Interfase", back: "Límite entre la matriz y el refuerzo donde ocurre la transferencia de carga." },
    { front: "Fibra de Carbono", back: "Refuerzo de alta resistencia y bajo peso usado en compuestos avanzados." },
    { front: "Laminado", back: "Compuesto formado por capas de material reforzado." },
    { front: "Semiconductor", back: "Material con conductividad eléctrica intermedia entre conductores y aislantes." },
    { front: "Dopaje", back: "Introducción de impurezas en un semiconductor para modificar su conductividad." },
    { front: "Dopaje Tipo N", back: "Adición de átomos donantes (P, As) que aportan electrones libres." },
    { front: "Dopaje Tipo P", back: "Adición de átomos aceptores (B, Ga) que crean huecos positivos." },
    { front: "Unión P-N", back: "Interfaz entre regiones dopadas tipo p y tipo n que forma un diodo." },
    { front: "Brecha de Energía (Eg)", back: "Diferencia de energía entre la banda de conducción y la de valencia." },
    { front: "Banda de Valencia", back: "Banda de energía más externa con electrones débilmente ligados." },
    { front: "Banda de Conducción", back: "Banda de energía donde los electrones pueden moverse libremente." },
    { front: "Diodo", back: "Dispositivo semiconductor que permite el flujo de corriente en una dirección." },
    { front: "Transistor", back: "Dispositivo semiconductor que amplifica o conmuta señales eléctricas." },
    { front: "Circuito Integrado", back: "Dispositivo que contiene miles o millones de transistores en un chip." },
    { front: "LED", back: "Diodo emisor de luz que emite fotones al conducir corriente." },
    { front: "Celda Solar", back: "Dispositivo que convierte luz en electricidad mediante el efecto fotovoltaico." },
    { front: "Estructura Cristalina", back: "Arreglo periódico tridimensional de átomos en un material." },
    { front: "Grano", back: "Región de un material policristalino con orientación cristalina única." },
    { front: "Frontera de Grano", back: "Interfaz entre granos con diferentes orientaciones cristalinas." },
    { front: "Defecto Puntual", back: "Defecto cristalino localizado en un punto (vacancia, intersticio)." },
    { front: "Dislocación", back: "Defecto lineal que permite el movimiento de átomos bajo esfuerzo." },
    { front: "Tratamiento Térmico", back: "Proceso de calentamiento y enfriamiento controlado para modificar propiedades." },
    { front: "Temple", back: "Enfriamiento rápido para congelar una estructura de alta temperatura." },
    { front: "Recocido", back: "Calentamiento seguido de enfriamiento lento para aliviar tensiones." },
    { front: "Revenido", back: "Calentamiento moderado después del temple para mejorar tenacidad." },
    { front: "Austenita", back: "Fase FCC del hierro estable entre 912°C y 1394°C, soluble en carbono." },
    { front: "Ferrita", back: "Fase BCC del hierro estable a temperatura ambiente, magnética." },
    { front: "Cementita", back: "Compuesto Fe₃C muy duro formado en aceros." },
    { front: "Perlita", back: "Microestructura laminada de ferrita y cementita en aceros." },
    { front: "Martensita", back: "Fase metaestable dura formada por temple rápido de austenita." },
    { front: "Acero", back: "Aleación de hierro y carbono (0.02-2% C) con excelente combinación de propiedades." },
    { front: "Hierro Fundido", back: "Aleación de Fe-C (2-4% C) con buena fundibilidad pero frágil." },
    { front: "Aleación", back: "Combinación de dos o más elementos metálicos para mejorar propiedades." },
    { front: "Solución Sólida", back: "Fase única donde un elemento está disuelto en otro." },
    { front: "Procesamiento de Materiales", back: "Conjunto de operaciones para transformar materias primas en productos útiles." },
    { front: "Sinterización", back: "Proceso de calentamiento que une partículas sin llegar a la fusión." },
    { front: "Moldeo por Inyección", back: "Proceso de inyectar material fundido en un molde bajo presión." },
    { front: "Extrusión", back: "Proceso de forzar material a través de un orificio para crear formas." },
    { front: "Laminado", back: "Proceso de reducir espesor pasando material entre rodillos." },
    { front: "Forjado", back: "Proceso de deformación plástica bajo calor y presión." },
    { front: "Índice de Desempeño", back: "Relación matemática que relaciona propiedades para optimizar diseño." },
    { front: "Relación R/ρ", back: "Índice de resistencia específica (resistencia/densidad)." },
    { front: "Relación E/ρ", back: "Índice de rigidez específica (módulo/densidad)." },
    { front: "Matriz de Decisión", back: "Herramienta para comparar múltiples opciones bajo varios criterios." },
    { front: "Trade-off", back: "Compromiso entre dos propiedades que no pueden optimizarse simultáneamente." },
    { front: "Selección de Materiales", back: "Proceso de elegir el material óptimo para una aplicación específica." },
    { front: "Restricción de Diseño", back: "Límite que debe cumplirse obligatoriamente en el diseño." },
    { front: "Objetivo de Diseño", back: "Meta que se busca optimizar (minimizar o maximizar)." },
    { front: "Función del Componente", back: "Rol específico que debe cumplir un material en una aplicación." }
];

// ===== DATOS DE MATERIALES PARA CLASIFICADOR =====
const materialsData = [
    { name: "Acero", category: "Metales" },
    { name: "Aluminio", category: "Metales" },
    { name: "Cobre", category: "Metales" },
    { name: "Titanio", category: "Metales" },
    { name: "Níquel", category: "Metales" },
    { name: "Polietileno", category: "Polímeros" },
    { name: "Poliestireno", category: "Polímeros" },
    { name: "PVC", category: "Polímeros" },
    { name: "Nylon", category: "Polímeros" },
    { name: "Policarbonato", category: "Polímeros" },
    { name: "Alúmina", category: "Cerámicos" },
    { name: "Sílice", category: "Cerámicos" },
    { name: "Zirconia", category: "Cerámicos" },
    { name: "Carburo de Silicio", category: "Cerámicos" },
    { name: "Vidrio", category: "Cerámicos" },
    { name: "Fibra de Carbono/Epoxi", category: "Compuestos" },
    { name: "Fibra de Vidrio/Poliéster", category: "Compuestos" },
    { name: "Kevlar/Epoxi", category: "Compuestos" },
    { name: "Carbono/Carbono", category: "Compuestos" },
    { name: "Metal/Cerámica", category: "Compuestos" },
    { name: "Silicio", category: "Metales" },
    { name: "Magnesio", category: "Metales" },
    { name: "Zinc", category: "Metales" },
    { name: "Plomo", category: "Metales" },
    { name: "Acrílico", category: "Polímeros" }
];

// ===== DATOS DE MATERIALES PARA COMPARADOR =====
const materialsComparator = [
    {
        name: "Acero Dulce",
        properties: {
            "Densidad (g/cm³)": 7.85,
            "Módulo Young (GPa)": 210,
            "Resistencia Tensil (MPa)": 250,
            "Elongación (%)": 25,
            "Costo (USD/kg)": 0.5,
            "Conductividad Térmica (W/m·K)": 50
        }
    },
    {
        name: "Aluminio",
        properties: {
            "Densidad (g/cm³)": 2.70,
            "Módulo Young (GPa)": 70,
            "Resistencia Tensil (MPa)": 90,
            "Elongación (%)": 40,
            "Costo (USD/kg)": 2.0,
            "Conductividad Térmica (W/m·K)": 237
        }
    },
    {
        name: "Titanio",
        properties: {
            "Densidad (g/cm³)": 4.51,
            "Módulo Young (GPa)": 103,
            "Resistencia Tensil (MPa)": 1160,
            "Elongación (%)": 10,
            "Costo (USD/kg)": 15.0,
            "Conductividad Térmica (W/m·K)": 22
        }
    },
    {
        name: "Polietileno",
        properties: {
            "Densidad (g/cm³)": 0.95,
            "Módulo Young (GPa)": 0.8,
            "Resistencia Tensil (MPa)": 20,
            "Elongación (%)": 500,
            "Costo (USD/kg)": 1.5,
            "Conductividad Térmica (W/m·K)": 0.5
        }
    },
    {
        name: "Poliestireno",
        properties: {
            "Densidad (g/cm³)": 1.05,
            "Módulo Young (GPa)": 3.0,
            "Resistencia Tensil (MPa)": 50,
            "Elongación (%)": 2,
            "Costo (USD/kg)": 1.2,
            "Conductividad Térmica (W/m·K)": 0.1
        }
    },
    {
        name: "Nylon 6",
        properties: {
            "Densidad (g/cm³)": 1.14,
            "Módulo Young (GPa)": 3.0,
            "Resistencia Tensil (MPa)": 80,
            "Elongación (%)": 300,
            "Costo (USD/kg)": 2.5,
            "Conductividad Térmica (W/m·K)": 0.25
        }
    },
    {
        name: "Alúmina (Al₂O₃)",
        properties: {
            "Densidad (g/cm³)": 3.97,
            "Módulo Young (GPa)": 380,
            "Resistencia Tensil (MPa)": 400,
            "Elongación (%)": 0,
            "Costo (USD/kg)": 5.0,
            "Conductividad Térmica (W/m·K)": 30
        }
    },
    {
        name: "Zirconia (ZrO₂)",
        properties: {
            "Densidad (g/cm³)": 6.10,
            "Módulo Young (GPa)": 200,
            "Resistencia Tensil (MPa)": 1200,
            "Elongación (%)": 0,
            "Costo (USD/kg)": 20.0,
            "Conductividad Térmica (W/m·K)": 2.5
        }
    },
    {
        name: "Vidrio",
        properties: {
            "Densidad (g/cm³)": 2.50,
            "Módulo Young (GPa)": 70,
            "Resistencia Tensil (MPa)": 50,
            "Elongación (%)": 0,
            "Costo (USD/kg)": 0.3,
            "Conductividad Térmica (W/m·K)": 1.0
        }
    },
    {
        name: "Fibra de Carbono/Epoxi",
        properties: {
            "Densidad (g/cm³)": 1.60,
            "Módulo Young (GPa)": 230,
            "Resistencia Tensil (MPa)": 1500,
            "Elongación (%)": 1,
            "Costo (USD/kg)": 25.0,
            "Conductividad Térmica (W/m·K)": 5.0
        }
    },
    {
        name: "Fibra de Vidrio/Poliéster",
        properties: {
            "Densidad (g/cm³)": 1.85,
            "Módulo Young (GPa)": 40,
            "Resistencia Tensil (MPa)": 450,
            "Elongación (%)": 3,
            "Costo (USD/kg)": 3.0,
            "Conductividad Térmica (W/m·K)": 0.3
        }
    },
    {
        name: "Kevlar/Epoxi",
        properties: {
            "Densidad (g/cm³)": 1.45,
            "Módulo Young (GPa)": 130,
            "Resistencia Tensil (MPa)": 1400,
            "Elongación (%)": 2,
            "Costo (USD/kg)": 30.0,
            "Conductividad Térmica (W/m·K)": 0.5
        }
    },
    {
        name: "Cobre",
        properties: {
            "Densidad (g/cm³)": 8.96,
            "Módulo Young (GPa)": 130,
            "Resistencia Tensil (MPa)": 220,
            "Elongación (%)": 45,
            "Costo (USD/kg)": 8.0,
            "Conductividad Térmica (W/m·K)": 401
        }
    },
    {
        name: "Magnesio",
        properties: {
            "Densidad (g/cm³)": 1.81,
            "Módulo Young (GPa)": 45,
            "Resistencia Tensil (MPa)": 170,
            "Elongación (%)": 3,
            "Costo (USD/kg)": 3.0,
            "Conductividad Térmica (W/m·K)": 156
        }
    },
    {
        name: "Níquel",
        properties: {
            "Densidad (g/cm³)": 8.90,
            "Módulo Young (GPa)": 200,
            "Resistencia Tensil (MPa)": 460,
            "Elongación (%)": 30,
            "Costo (USD/kg)": 10.0,
            "Conductividad Térmica (W/m·K)": 91
        }
    },
    {
        name: "Acero Inoxidable 316",
        properties: {
            "Densidad (g/cm³)": 8.00,
            "Módulo Young (GPa)": 193,
            "Resistencia Tensil (MPa)": 515,
            "Elongación (%)": 30,
            "Costo (USD/kg)": 3.5,
            "Conductividad Térmica (W/m·K)": 16
        }
    },
    {
        name: "Carburo de Silicio",
        properties: {
            "Densidad (g/cm³)": 3.21,
            "Módulo Young (GPa)": 410,
            "Resistencia Tensil (MPa)": 550,
            "Elongación (%)": 0,
            "Costo (USD/kg)": 10.0,
            "Conductividad Térmica (W/m·K)": 120
        }
    },
    {
        name: "Nitruro de Silicio",
        properties: {
            "Densidad (g/cm³)": 3.44,
            "Módulo Young (GPa)": 310,
            "Resistencia Tensil (MPa)": 1000,
            "Elongación (%)": 0,
            "Costo (USD/kg)": 15.0,
            "Conductividad Térmica (W/m·K)": 30
        }
    },
    {
        name: "Policarbonato",
        properties: {
            "Densidad (g/cm³)": 1.20,
            "Módulo Young (GPa)": 2.3,
            "Resistencia Tensil (MPa)": 65,
            "Elongación (%)": 100,
            "Costo (USD/kg)": 3.0,
            "Conductividad Térmica (W/m·K)": 0.2
        }
    },
    {
        name: "Acrílico",
        properties: {
            "Densidad (g/cm³)": 1.19,
            "Módulo Young (GPa)": 3.2,
            "Resistencia Tensil (MPa)": 72,
            "Elongación (%)": 5,
            "Costo (USD/kg)": 2.0,
            "Conductividad Térmica (W/m·K)": 0.2
        }
    },
    {
        name: "PVC",
        properties: {
            "Densidad (g/cm³)": 1.38,
            "Módulo Young (GPa)": 2.7,
            "Resistencia Tensil (MPa)": 50,
            "Elongación (%)": 40,
            "Costo (USD/kg)": 1.0,
            "Conductividad Térmica (W/m·K)": 0.16
        }
    },
    {
        name: "Silicio",
        properties: {
            "Densidad (g/cm³)": 2.33,
            "Módulo Young (GPa)": 130,
            "Resistencia Tensil (MPa)": 100,
            "Elongación (%)": 0,
            "Costo (USD/kg)": 5.0,
            "Conductividad Térmica (W/m·K)": 150
        }
    }
];

// ===== DATOS PARA SIMULADOR PSPD =====
const pspdExamples = [
    {
        name: "Acero Templado",
        proceso: "Calentamiento a 900°C + Enfriamiento rápido en agua",
        estructura: "Martensita: estructura tetragonal distorsionada con alta densidad de dislocaciones",
        propiedad: "Dureza muy alta (58-62 HRC), resistencia elevada, baja ductilidad",
        desempeño: "Excelente para herramientas de corte, cuchillas, muelles de precisión"
    },
    {
        name: "Polímero Cristalino",
        proceso: "Moldeo por inyección + Enfriamiento controlado",
        estructura: "Semicristalinidad 50-80%: zonas cristalinas ordenadas + zonas amorfas",
        propiedad: "Rigidez moderada, resistencia química, baja densidad, transparencia",
        desempeño: "Ideal para envases, tuberías, componentes automotrices, lentes"
    },
    {
        name: "Compuesto Unidireccional",
        proceso: "Alineación de fibras + Impregnación con matriz epoxi",
        estructura: "Fibras paralelas en matriz polimérica, interfase matriz-fibra crítica",
        propiedad: "Resistencia/peso muy alta en dirección de fibras, anisotropía pronunciada",
        desempeño: "Alas de aviones, palas de turbinas eólicas, estructuras aeroespaciales"
    },
    {
        name: "Zirconia Estabilizada",
        proceso: "Dopaje con óxido de itrio (Y₂O₃) + Sinterización a 1600°C",
        estructura: "Fase cúbica metaestable a temperatura ambiente, baja expansión térmica",
        propiedad: "Resistencia al choque térmico, tenacidad mejorada, refractariedad",
        desempeño: "Implantes dentales, revestimientos de turbinas, crucibles refractarios"
    },
    {
        name: "Semiconductor Dopado",
        proceso: "Dopaje con fósforo (tipo N) o boro (tipo P) + Difusión térmica",
        estructura: "Unión P-N con región de agotamiento, portadores mayoritarios controlados",
        propiedad: "Conductividad controlada, rectificación de corriente, emisión de luz (LED)",
        desempeño: "Diodos, transistores, circuitos integrados, celdas solares, LEDs"
    }
];

// ===== FUNCIONES DE NAVEGACIÓN =====
function switchTab(tabName) {
    // Ocultar todos los tabs
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));

    // Desactivar todos los botones
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Mostrar tab seleccionado
    document.getElementById(tabName).classList.add('active');

    // Activar botón seleccionado
    event.target.classList.add('active');

    // Inicializar contenido si es necesario
    if (tabName === 'quiz') {
        initQuiz();
    } else if (tabName === 'flashcards') {
        initFlashcards();
    } else if (tabName === 'classifier') {
        initClassifier();
    } else if (tabName === 'comparator') {
        initComparator();
    } else if (tabName === 'pspd') {
        initPSPD();
    }
}

// ===== QUIZ FUNCTIONS =====
function initQuiz() {
    if (currentQuestionIndex === 0) {
        currentQuestionIndex = 0;
        quizScore = 0;
        selectedAnswers = [];
        loadQuestion();
    }
}

function loadQuestion() {
    const quizContent = document.getElementById('quiz-content');
    const quizResult = document.getElementById('quiz-result');

    if (currentQuestionIndex >= quizQuestions.length) {
        quizContent.classList.add('hidden');
        quizResult.classList.remove('hidden');
        document.getElementById('final-score').textContent = quizScore;
        return;
    }

    const question = quizQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;

    document.getElementById('quiz-progress').style.width = progress + '%';
    document.getElementById('quiz-current').textContent = currentQuestionIndex + 1;
    document.getElementById('quiz-total').textContent = quizQuestions.length;

    let html = `
        <div class="question-block">
            <h3>${question.question}</h3>
            <div class="options">
    `;

    question.options.forEach((option, index) => {
        html += `
            <button class="option" onclick="selectAnswer(${index}, '${question.correct}')">${option}</button>
        `;
    });

    html += `
            </div>
        </div>
    `;

    quizContent.innerHTML = html;
}

function selectAnswer(index, correct) {
    const options = document.querySelectorAll('.option');
    const selectedOption = options[index];
    const correctIndex = quizQuestions[currentQuestionIndex].options.indexOf(
        quizQuestions[currentQuestionIndex].options[quizQuestions[currentQuestionIndex].options.findIndex(opt => opt === correct)]
    );

    if (index === correctIndex) {
        selectedOption.classList.add('correct');
        quizScore += 1;
    } else {
        selectedOption.classList.add('incorrect');
        options[correctIndex].classList.add('correct');
    }

    options.forEach(opt => opt.disabled = true);

    const explanation = document.createElement('div');
    explanation.className = 'explanation';
    explanation.innerHTML = `<strong>Explicación:</strong> ${quizQuestions[currentQuestionIndex].explanation}`;
    document.querySelector('.question-block').appendChild(explanation);

    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
    }, 3000);

    document.getElementById('quiz-score').textContent = quizScore;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    quizScore = 0;
    selectedAnswers = [];
    document.getElementById('quiz-content').classList.remove('hidden');
    document.getElementById('quiz-result').classList.add('hidden');
    loadQuestion();
}

// ===== FLASHCARDS FUNCTIONS =====
function initFlashcards() {
    currentFlashcardIndex = 0;
    displayFlashcard();
    setupFlashcardControls();
}

function displayFlashcard() {
    const card = flashcards[currentFlashcardIndex];
    document.getElementById('card-front').textContent = card.front;
    document.getElementById('card-back').textContent = card.back;
    document.getElementById('card-counter').textContent = `${currentFlashcardIndex + 1} / ${flashcards.length}`;
    document.getElementById('flashcard').classList.remove('flipped');
}

function toggleFlashcard() {
    document.getElementById('flashcard').classList.toggle('flipped');
}

function setupFlashcardControls() {
    document.getElementById('prev-card').onclick = () => {
        if (currentFlashcardIndex > 0) {
            currentFlashcardIndex--;
            displayFlashcard();
        }
    };

    document.getElementById('next-card').onclick = () => {
        if (currentFlashcardIndex < flashcards.length - 1) {
            currentFlashcardIndex++;
            displayFlashcard();
        }
    };
}

// ===== CLASSIFIER FUNCTIONS =====
function initClassifier() {
    const pool = document.getElementById('materials-pool');
    pool.innerHTML = '';

    materialsData.forEach((material, index) => {
        const div = document.createElement('div');
        div.className = 'material-item';
        div.draggable = true;
        div.textContent = material.name;
        div.dataset.category = material.category;
        div.dataset.index = index;

        div.addEventListener('dragstart', (e) => {
            draggedElement = div;
            div.classList.add('dragging');
        });

        div.addEventListener('dragend', () => {
            div.classList.remove('dragging');
        });

        pool.appendChild(div);
    });

    setupDropZones();
}

function setupDropZones() {
    document.querySelectorAll('.drop-zone').forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.parentElement.classList.add('drag-over');
        });

        zone.addEventListener('dragleave', () => {
            zone.parentElement.classList.remove('drag-over');
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.parentElement.classList.remove('drag-over');

            if (draggedElement) {
                const clone = draggedElement.cloneNode(true);
                clone.className = 'material-in-zone';
                clone.draggable = false;
                zone.appendChild(clone);
                draggedElement.remove();
            }
        });
    });
}

function checkClassifier() {
    const zones = document.querySelectorAll('.drop-zone');
    let correct = 0;
    let total = 0;

    zones.forEach(zone => {
        const items = zone.querySelectorAll('.material-in-zone');
        const category = zone.id.replace('zone-', '');

        items.forEach(item => {
            total++;
            const material = materialsData.find(m => m.name === item.textContent);
            if (material && material.category === category) {
                correct++;
            }
        });
    });

    const result = document.getElementById('classifier-result');
    if (correct === total && total > 0) {
        result.textContent = `¡Excelente! ${correct}/${total} clasificaciones correctas.`;
        result.classList.add('success');
        result.classList.remove('error');
    } else {
        result.textContent = `${correct}/${total} clasificaciones correctas. Intenta de nuevo.`;
        result.classList.add('error');
        result.classList.remove('success');
    }
}

function resetClassifier() {
    initClassifier();
    document.getElementById('classifier-result').textContent = '';
}

// ===== COMPARATOR FUNCTIONS =====
function initComparator() {
    const select = document.getElementById('material-select');
    select.innerHTML = '<option value="">Selecciona un material...</option>';

    materialsComparator.forEach((material, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = material.name;
        select.appendChild(option);
    });

    selectedMaterials = [];
    document.getElementById('comparison-table').innerHTML = '';
}

function addMaterialToComparison() {
    const select = document.getElementById('material-select');
    const index = select.value;

    if (index === '' || selectedMaterials.includes(parseInt(index))) return;

    selectedMaterials.push(parseInt(index));
    updateComparisonTable();
}

function updateComparisonTable() {
    const table = document.getElementById('comparison-table');

    if (selectedMaterials.length === 0) {
        table.innerHTML = '<p>Selecciona materiales para comparar.</p>';
        return;
    }

    let html = '<table><tr><th>Propiedad</th>';

    selectedMaterials.forEach(index => {
        html += `<th>${materialsComparator[index].name}</th>`;
    });

    html += '</tr>';

    const properties = Object.keys(materialsComparator[selectedMaterials[0]].properties);

    properties.forEach(prop => {
        html += `<tr><td><strong>${prop}</strong></td>`;
        selectedMaterials.forEach(index => {
            const value = materialsComparator[index].properties[prop];
            html += `<td>${typeof value === 'number' ? value.toFixed(2) : value}</td>`;
        });
        html += '</tr>';
    });

    html += '</table>';
    table.innerHTML = html;
}

function clearComparison() {
    selectedMaterials = [];
    document.getElementById('comparison-table').innerHTML = '';
}

// ===== PSPD SIMULATOR FUNCTIONS =====
function initPSPD() {
    const select = document.getElementById('pspd-example');
    select.addEventListener('change', (e) => {
        const index = e.target.value;
        if (index !== '') {
            displayPSPDExample(parseInt(index));
        }
    });
}

function displayPSPDExample(index) {
    const example = pspdExamples[index];

    document.getElementById('pspd-proceso').textContent = example.proceso;
    document.getElementById('pspd-estructura').textContent = example.estructura;
    document.getElementById('pspd-propiedad').textContent = example.propiedad;
    document.getElementById('pspd-desempeño').textContent = example.desempeño;
    document.getElementById('pspd-imagen-desc').textContent = `Ejemplo: ${example.name}`;
}

// ===== INICIALIZACIÓN AL CARGAR LA PÁGINA =====
document.addEventListener('DOMContentLoaded', () => {
    // Configurar botones de tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tabName = e.target.dataset.tab;
            switchTab(tabName);
        });
    });
});
