// ===== VARIABLES GLOBALES =====
let currentQuestionIndex = 0;
let quizScore = 0;
let selectedAnswers = [];
let currentFlashcardIndex = 0;
let selectedMaterials = [];
let draggedElement = null;

// ===== 100 PREGUNTAS PARA EL QUIZ =====
const quizQuestions = [
    // SECCIÓN A: CONCEPTUAL (Preguntas 1-20)
    {
        question: "¿Cuál es la principal diferencia entre alotropía y polimorfismo?",
        options: [
            "La alotropía solo ocurre en elementos puros, mientras que el polimorfismo ocurre en compuestos",
            "La alotropía es más estable que el polimorfismo",
            "El polimorfismo solo ocurre a temperaturas bajas",
            "No hay diferencia, son sinónimos"
        ],
        correct: "La alotropía solo ocurre en elementos puros, mientras que el polimorfismo ocurre en compuestos",
        explanation: "La alotropía es la capacidad de un ELEMENTO PURO para existir en múltiples formas cristalinas (ej: C → Grafito/Diamante). El polimorfismo es la capacidad de un COMPUESTO para cristalizar en diferentes estructuras (ej: ZrO₂ → Monoclínica/Tetragonal/Cúbica)."
    },
    {
        question: "¿Qué caracteriza a un material anisotrópico?",
        options: [
            "Sus propiedades son iguales en todas las direcciones",
            "Sus propiedades varían según la dirección cristalográfica",
            "Es siempre más duro que los materiales isótropos",
            "Solo los polímeros pueden ser anisotrópicos"
        ],
        correct: "Sus propiedades varían según la dirección cristalográfica",
        explanation: "La anisotropía significa que las propiedades (dureza, conductividad, etc.) dependen de la dirección. Ejemplo: la madera es más fácil de romper a favor de la veta que en contra. Los monocristales son anisotrópicos; los policristales suelen ser isótropos."
    },
    {
        question: "¿Cuál es la relación entre estructura cristalina y propiedades mecánicas?",
        options: [
            "No existe relación directa",
            "La estructura determina cómo se distribuyen los átomos, lo que afecta directamente las propiedades",
            "Solo afecta la densidad, no las propiedades mecánicas",
            "La estructura solo afecta el color del material"
        ],
        correct: "La estructura determina cómo se distribuyen los átomos, lo que afecta directamente las propiedades",
        explanation: "La estructura cristalina define las distancias interatómicas y los enlaces. Esto determina la resistencia, ductilidad, dureza, etc. Ejemplo: el hierro BCC es más duro que el FCC, aunque ambos son hierro."
    },
    {
        question: "¿Qué es un monómero en el contexto de los polímeros?",
        options: [
            "Una cadena larga de átomos",
            "La unidad molecular pequeña que se repite para formar un polímero",
            "Un polímero muy corto",
            "Un material que no puede polimerizarse"
        ],
        correct: "La unidad molecular pequeña que se repite para formar un polímero",
        explanation: "Un monómero es la unidad básica. Ejemplo: el etileno (C₂H₄) es el monómero del polietileno. Cuando muchos monómeros se unen mediante enlaces covalentes, forman un polímero (macromolécula)."
    },
    {
        question: "¿Cuál es la diferencia principal entre un termoplástico y un termoestable?",
        options: [
            "Los termoplásticos son más baratos",
            "Los termoplásticos se funden al calentarse; los termoestables se queman sin fundirse",
            "Los termoestables son siempre más duros",
            "No hay diferencia, son lo mismo"
        ],
        correct: "Los termoplásticos se funden al calentarse; los termoestables se queman sin fundirse",
        explanation: "TERMOPLÁSTICOS: cadenas lineales/ramificadas sin entrecruzamiento → se funden al calentar (enlaces secundarios débiles). TERMOESTABLES: red 3D con entrecruzamiento covalente → se queman sin fundirse (enlaces primarios fuertes)."
    },
    {
        question: "¿Qué es la temperatura de transición vítrea (Tg) en polímeros?",
        options: [
            "La temperatura a la que el polímero se funde completamente",
            "La temperatura a la que el polímero pasa de estado vítreo (rígido) a gomoso (flexible)",
            "La temperatura a la que el polímero se cristaliza",
            "La temperatura máxima que puede soportar un polímero"
        ],
        correct: "La temperatura a la que el polímero pasa de estado vítreo (rígido) a gomoso (flexible)",
        explanation: "Por debajo de Tg: cadenas congeladas, material rígido y frágil. Por encima de Tg: cadenas adquieren movilidad, material flexible. Nota: Tg ≠ Tm (punto de fusión). Ejemplo: PVC tiene Tg ≈ 80°C."
    },
    {
        question: "¿Cuál es la característica principal de los cerámicos?",
        options: [
            "Son siempre transparentes",
            "Son muy dúctiles y fáciles de deformar",
            "Son muy duros pero frágiles, con alta resistencia a compresión",
            "Son excelentes conductores de electricidad"
        ],
        correct: "Son muy duros pero frágiles, con alta resistencia a compresión",
        explanation: "Los cerámicos tienen enlaces iónicos/covalentes muy rígidos. Esto los hace: DUROS (resisten rayado), FRÁGILES (se rompen sin previo aviso), RESISTENTES A COMPRESIÓN (soportan fuerzas de aplastamiento). Pero tienen BAJA DUCTILIDAD."
    },
    {
        question: "¿Por qué los cerámicos son frágiles?",
        options: [
            "Porque tienen baja densidad",
            "Porque sus enlaces rígidos impiden el movimiento de dislocaciones, causando fractura repentina",
            "Porque siempre contienen defectos",
            "Porque absorben mucha agua"
        ],
        correct: "Porque sus enlaces rígidos impiden el movimiento de dislocaciones, causando fractura repentina",
        explanation: "En metales: dislocaciones fluyen → deformación plástica → aviso antes de rotura. En cerámicos: dislocaciones bloqueadas → no hay deformación → fractura frágil repentina. La energía se gasta en romper, no en deformar."
    },
    {
        question: "¿Qué es un material compuesto?",
        options: [
            "Un material hecho de un solo elemento",
            "Una combinación de dos o más materiales con propiedades diferentes para obtener mejores propiedades",
            "Un material que solo puede usarse en una aplicación",
            "Un material que es siempre más caro"
        ],
        correct: "Una combinación de dos o más materiales con propiedades diferentes para obtener mejores propiedades",
        explanation: "Compuesto = Matriz + Refuerzo. Ejemplo: Fibra de carbono (refuerzo) + Epoxi (matriz) = Compuesto con alta resistencia/peso. Objetivo: combinar ventajas de ambos materiales."
    },
    {
        question: "¿Cuál es el papel de la interfase en un material compuesto?",
        options: [
            "Es solo un límite sin función importante",
            "Es crítica para la transferencia de carga desde la matriz hacia el refuerzo",
            "Solo afecta el costo del material",
            "No tiene ningún efecto en las propiedades"
        ],
        correct: "Es crítica para la transferencia de carga desde la matriz hacia el refuerzo",
        explanation: "La interfase es donde ocurre la transferencia de esfuerzos. Buena adherencia → carga se transfiere eficientemente → material fuerte. Mala adherencia → fibra se desliza → material débil (fiber pull-out)."
    },
    {
        question: "¿Qué es el dopaje en semiconductores?",
        options: [
            "Un proceso de contaminación del material",
            "La introducción controlada de impurezas para modificar la conductividad eléctrica",
            "Un defecto que reduce la calidad",
            "Un proceso que solo se usa en silicio"
        ],
        correct: "La introducción controlada de impurezas para modificar la conductividad eléctrica",
        explanation: "Dopaje tipo N: agregar donantes (P, As) → electrones libres. Dopaje tipo P: agregar aceptores (B, Ga) → huecos positivos. Esto permite controlar la conducción y crear dispositivos como diodos y transistores."
    },
    {
        question: "¿Cuál es la diferencia entre dopaje tipo N y tipo P?",
        options: [
            "No hay diferencia, son sinónimos",
            "Tipo N: donantes (electrones); Tipo P: aceptores (huecos)",
            "Tipo N es más caro que tipo P",
            "Tipo P solo se usa en germanio"
        ],
        correct: "Tipo N: donantes (electrones); Tipo P: aceptores (huecos)",
        explanation: "TIPO N (Negativo): Fósforo/Arsénico aportan electrones → portadores mayoritarios = electrones. TIPO P (Positivo): Boro/Galio crean huecos → portadores mayoritarios = huecos. Ambos aumentan conductividad."
    },
    {
        question: "¿Qué es una unión P-N?",
        options: [
            "Un defecto en el semiconductor",
            "La interfaz entre regiones dopadas tipo P y tipo N que forma la base de diodos y transistores",
            "Un tipo de soldadura",
            "Un proceso de fabricación"
        ],
        correct: "La interfaz entre regiones dopadas tipo P y tipo N que forma la base de diodos y transistores",
        explanation: "La unión P-N crea una región de agotamiento con un campo eléctrico interno. Esto permite: rectificación (diodos), amplificación (transistores), conversión de luz (celdas solares)."
    },
    {
        question: "¿Cuál es la brecha de energía (Eg) en un semiconductor?",
        options: [
            "La diferencia entre el precio de dos semiconductores",
            "La diferencia de energía entre la banda de conducción y la banda de valencia",
            "Un defecto en la estructura",
            "La energía necesaria para fabricar el semiconductor"
        ],
        correct: "La diferencia de energía entre la banda de conducción y la banda de valencia",
        explanation: "Eg determina qué energía necesita un electrón para pasar de la banda de valencia (ligado) a la banda de conducción (libre). Eg pequeña → conductor; Eg grande → aislante. Semiconductores: Eg intermedia."
    },
    {
        question: "¿Cuál es la relación entre cristalinidad y propiedades en polímeros?",
        options: [
            "No existe relación",
            "Mayor cristalinidad → Mayor rigidez y resistencia, pero menor ductilidad",
            "Mayor cristalinidad → Mayor flexibilidad",
            "La cristalinidad solo afecta el color"
        ],
        correct: "Mayor cristalinidad → Mayor rigidez y resistencia, pero menor ductilidad",
        explanation: "Zonas cristalinas: cadenas ordenadas, empacadas → rígidas. Zonas amorfas: cadenas desordenadas → flexibles. Polímero muy cristalino = rígido pero frágil. Polímero muy amorfo = flexible pero débil."
    },
    {
        question: "¿Qué es un refractario?",
        options: [
            "Un material que refleja luz",
            "Un cerámica diseñado para mantener propiedades a temperaturas muy elevadas (>1500°C)",
            "Un material que es fácil de refractar",
            "Un tipo de vidrio"
        ],
        correct: "Un cerámica diseñado para mantener propiedades a temperaturas muy elevadas (>1500°C)",
        explanation: "Refractarios: alta temperatura de fusión, resistencia al choque térmico, estabilidad química. Usos: revestimiento de hornos, crisoles, convertidores de acero. Ejemplos: alúmina, magnesia, zirconia."
    },
    {
        question: "¿Cuál es la diferencia entre un metal y un semiconductor en términos de conductividad?",
        options: [
            "Los metales no conducen, los semiconductores sí",
            "Los metales conducen bien a cualquier temperatura; los semiconductores aumentan conductividad con temperatura",
            "No hay diferencia",
            "Los semiconductores siempre conducen mejor"
        ],
        correct: "Los metales conducen bien a cualquier temperatura; los semiconductores aumentan conductividad con temperatura",
        explanation: "METALES: electrones libres a cualquier T → conductividad casi constante. SEMICONDUCTORES: electrones ligados a baja T, se liberan al aumentar T → conductividad aumenta con temperatura."
    },
    {
        question: "¿Qué es la anisotropía en materiales compuestos reforzados con fibras?",
        options: [
            "Un defecto que debe evitarse",
            "La dependencia de las propiedades de la orientación de las fibras",
            "Un tipo de fibra especial",
            "Un proceso de fabricación"
        ],
        correct: "La dependencia de las propiedades de la orientación de las fibras",
        explanation: "Fibras alineadas en dirección X → máxima resistencia en X, mínima en Y. Esto es ANISOTROPÍA CONTROLADA, que es una VENTAJA en ingeniería. Ejemplo: ala de avión con fibras alineadas según dirección de carga."
    },
    {
        question: "¿Cuál es el concepto clave de la relación estructura-propiedad-desempeño?",
        options: [
            "La estructura no afecta las propiedades",
            "La estructura determina las propiedades, que a su vez determinan el desempeño en la aplicación",
            "El desempeño solo depende del costo",
            "La propiedad y el desempeño son lo mismo"
        ],
        correct: "La estructura determina las propiedades, que a su vez determinan el desempeño en la aplicación",
        explanation: "ESTRUCTURA (arreglo atómico) → PROPIEDADES (dureza, conductividad, etc.) → DESEMPEÑO (funciona bien en la aplicación). Cambiar estructura → cambiar propiedades → cambiar desempeño."
    },

    // SECCIÓN B: ANÁLISIS ESTRUCTURAL (Preguntas 21-50)
    {
        question: "¿Cómo afecta el tratamiento térmico (temple) a la microestructura del acero?",
        options: [
            "No tiene efecto",
            "Convierte austenita (FCC) en martensita (tetragonal distorsionada) mediante enfriamiento rápido",
            "Aumenta el tamaño de grano",
            "Reduce la densidad"
        ],
        correct: "Convierte austenita (FCC) en martensita (tetragonal distorsionada) mediante enfriamiento rápido",
        explanation: "Temple: Calentar a 900°C (austenita FCC) → Enfriar rápido → Martensita (tetragonal). Resultado: dureza muy alta (58-62 HRC), resistencia elevada, pero baja ductilidad. Mecanismo: los átomos no tienen tiempo de reorganizarse."
    },
    {
        question: "¿Qué ocurre con la cristalinidad de un polímero durante el moldeo por inyección?",
        options: [
            "Siempre alcanza 100% cristalinidad",
            "Depende de la velocidad de enfriamiento: enfriamiento rápido → baja cristalinidad; enfriamiento lento → alta cristalinidad",
            "No se forma ninguna cristalinidad",
            "La cristalinidad es independiente del proceso"
        ],
        correct: "Depende de la velocidad de enfriamiento: enfriamiento rápido → baja cristalinidad; enfriamiento lento → alta cristalinidad",
        explanation: "Enfriamiento rápido: cadenas no tienen tiempo de ordenarse → amorfo (transparente, flexible). Enfriamiento lento: cadenas se ordenan → cristalino (opaco, rígido). Ejemplo: PET rápido = amorfo; PET lento = semicristalino."
    },
    {
        question: "¿Cómo influye la orientación de las fibras en las propiedades de un compuesto?",
        options: [
            "No tiene influencia",
            "Fibras alineadas en dirección de carga → máxima resistencia en esa dirección; fibras al azar → propiedades más isótropas",
            "Las fibras siempre tienen el mismo efecto",
            "Solo afecta el color"
        ],
        correct: "Fibras alineadas en dirección de carga → máxima resistencia en esa dirección; fibras al azar → propiedades más isótropas",
        explanation: "UNIDIRECCIONAL: R/ρ muy alta en dirección de fibras, baja en perpendicular (anisotropía). TEJIDO/CRUZADO: propiedades más equilibradas en dos direcciones. AL AZAR: isotropía, pero menor resistencia que unidireccional."
    },
    {
        question: "¿Qué cambios microestructurales ocurren al aumentar la cristalinidad en un polímero?",
        options: [
            "Disminuye la densidad",
            "Aumentan las zonas ordenadas (cristalinas) a expensas de zonas desordenadas (amorfas)",
            "Se forman nuevos elementos químicos",
            "Disminuye la temperatura de fusión"
        ],
        correct: "Aumentan las zonas ordenadas (cristalinas) a expensas de zonas desordenadas (amorfas)",
        explanation: "Mayor cristalinidad = más cadenas plegadas ordenadamente = mayor densidad, rigidez, resistencia, pero menor ductilidad y transparencia. Ejemplo: PET 30% cristalino = flexible; PET 70% cristalino = rígido."
    },
    {
        question: "¿Cómo afecta el dopaje a la estructura de bandas de un semiconductor?",
        options: [
            "No tiene efecto",
            "Crea niveles de energía dentro de la brecha de energía, facilitando la conducción",
            "Aumenta la brecha de energía",
            "Elimina la brecha de energía"
        ],
        correct: "Crea niveles de energía dentro de la brecha de energía, facilitando la conducción",
        explanation: "Dopaje tipo N: donantes crean nivel cercano a banda de conducción → electrones se liberan fácilmente. Dopaje tipo P: aceptores crean nivel cercano a banda de valencia → huecos se crean fácilmente. Ambos: conductividad aumenta."
    },
    {
        question: "¿Cuál es el mecanismo de desviación de grietas en compuestos reforzados?",
        options: [
            "No existe tal mecanismo",
            "Las fibras obligan a la grieta a rodearlas, consumiendo energía y aumentando tenacidad",
            "Las grietas no se forman en compuestos",
            "Solo ocurre en metales"
        ],
        correct: "Las fibras obligan a la grieta a rodearlas, consumiendo energía y aumentando tenacidad",
        explanation: "Cerámica pura: grieta viaja en línea recta → fractura frágil. Compuesto: grieta encuentra fibra → se desvía → ramificación → consume energía → mayor tenacidad. Esto es por qué los compuestos son más tenaces que cerámicos puros."
    },
    {
        question: "¿Cómo cambia la conductividad eléctrica de un semiconductor con la temperatura?",
        options: [
            "Disminuye con la temperatura",
            "Aumenta con la temperatura (más energía térmica libera portadores)",
            "No cambia",
            "Solo cambia en semiconductores tipo N"
        ],
        correct: "Aumenta con la temperatura (más energía térmica libera portadores)",
        explanation: "A mayor T: más energía térmica → más electrones se liberan de la banda de valencia → conducción aumenta. Esto es opuesto a metales (conductividad disminuye con T). Esto es una característica distintiva de semiconductores."
    },
    {
        question: "¿Qué ocurre en la interfase matriz-refuerzo en un compuesto bien adherido?",
        options: [
            "No ocurre nada importante",
            "Hay transferencia eficiente de carga desde la matriz hacia el refuerzo mediante fuerzas de adhesión",
            "La matriz y el refuerzo se separan",
            "Se forma un nuevo material"
        ],
        correct: "Hay transferencia eficiente de carga desde la matriz hacia el refuerzo mediante fuerzas de adhesión",
        explanation: "Buena interfase: carga se transfiere → fibra soporta carga → material fuerte. Mala interfase: fibra se desliza (fiber pull-out) → material débil. La interfase es tan importante como los materiales individuales."
    },
    {
        question: "¿Cómo afecta la sinterización a la densidad de un cerámica?",
        options: [
            "La densidad disminuye",
            "La densidad aumenta porque las partículas se unen, reduciendo porosidad",
            "No hay cambio en densidad",
            "Solo afecta el color"
        ],
        correct: "La densidad aumenta porque las partículas se unen, reduciendo porosidad",
        explanation: "Sinterización: calentamiento sin llegar a fusión → partículas se unen → porosidad disminuye → densidad aumenta → propiedades mecánicas mejoran. Temperatura típica: 80-90% del punto de fusión."
    },
    {
        question: "¿Cuál es el efecto de la presencia de defectos puntuales en la conductividad de semiconductores?",
        options: [
            "No tienen efecto",
            "Pueden actuar como centros de recombinación, reduciendo conductividad",
            "Siempre aumentan la conductividad",
            "Solo afectan el color"
        ],
        correct: "Pueden actuar como centros de recombinación, reduciendo conductividad",
        explanation: "Defectos puntuales (vacancias, intersticios): electrones y huecos se recombinan → desaparecen portadores → conductividad disminuye. Por eso la pureza es crítica en semiconductores. Defectos no deseados vs. dopaje controlado."
    },
    {
        question: "¿Cómo influye la velocidad de enfriamiento en la formación de martensita en aceros?",
        options: [
            "La velocidad no importa",
            "Enfriamiento rápido → martensita; enfriamiento lento → perlita/ferrita",
            "Enfriamiento lento → martensita",
            "Solo afecta el color"
        ],
        correct: "Enfriamiento rápido → martensita; enfriamiento lento → perlita/ferrita",
        explanation: "Enfriamiento rápido (agua): austenita no tiene tiempo de transformarse → martensita (dura). Enfriamiento lento (aire): austenita se transforma en perlita (ferrita + cementita, más blanda). Velocidad crítica: ~30°C/s."
    },
    {
        question: "¿Qué cambios en la interfase P-N ocurren cuando se aplica polarización directa?",
        options: [
            "No hay cambios",
            "La región de agotamiento se reduce, permitiendo el flujo de corriente",
            "La región de agotamiento se expande",
            "Se forma una nueva región"
        ],
        correct: "La región de agotamiento se reduce, permitiendo el flujo de corriente",
        explanation: "Polarización directa: voltaje positivo en P, negativo en N → campo eléctrico externo reduce el campo interno → región de agotamiento se reduce → portadores pueden cruzar → corriente fluye. Esto es la base de la rectificación."
    },
    {
        question: "¿Cómo afecta el revenido después del temple a la microestructura del acero?",
        options: [
            "No tiene efecto",
            "Reduce la dureza pero aumenta la tenacidad al transformar martensita en una microestructura más estable",
            "Aumenta la dureza",
            "Convierte el acero en cerámico"
        ],
        correct: "Reduce la dureza pero aumenta la tenacidad al transformar martensita en una microestructura más estable",
        explanation: "Revenido: calentamiento moderado (200-600°C) después del temple → martensita se descompone parcialmente → precipitación de carburos → estructura más estable → menor dureza pero mayor tenacidad. Balance entre dureza y ductilidad."
    },
    {
        question: "¿Cuál es el efecto de la orientación cristalográfica en la ductilidad de un metal?",
        options: [
            "No tiene efecto",
            "Ciertos planos cristalográficos facilitan el deslizamiento de dislocaciones → mayor ductilidad en esas direcciones",
            "Todos los planos tienen igual ductilidad",
            "Solo afecta el color"
        ],
        correct: "Ciertos planos cristalográficos facilitan el deslizamiento de dislocaciones → mayor ductilidad en esas direcciones",
        explanation: "En FCC: 12 sistemas de deslizamiento → alta ductilidad. En BCC: 12 sistemas pero menos activos → ductilidad moderada. En HCP: 3 sistemas → baja ductilidad. Anisotropía en propiedades mecánicas."
    },
    {
        question: "¿Cómo afecta la concentración de dopante a la conductividad de un semiconductor?",
        options: [
            "No tiene efecto",
            "Mayor concentración de dopante → mayor conductividad (más portadores libres)",
            "Mayor concentración → menor conductividad",
            "Solo afecta el color"
        ],
        correct: "Mayor concentración de dopante → mayor conductividad (más portadores libres)",
        explanation: "Dopaje ligero: pocos portadores → baja conductividad. Dopaje fuerte: muchos portadores → alta conductividad. Pero hay límite: muy alto dopaje → scattering aumenta → conductividad se satura."
    },
    {
        question: "¿Qué ocurre en la región de agotamiento de una unión P-N en equilibrio?",
        options: [
            "No ocurre nada",
            "Se forma un campo eléctrico interno debido a la difusión de portadores y la falta de portadores en esa región",
            "Los portadores se multiplican",
            "Se forma un nuevo material"
        ],
        correct: "Se forma un campo eléctrico interno debido a la difusión de portadores y la falta de portadores en esa región",
        explanation: "Región de agotamiento: iones positivos (P dopado) + iones negativos (N dopado) → campo eléctrico interno que se opone a la difusión. En equilibrio: difusión = drift → corriente neta = 0."
    },
    {
        question: "¿Cómo influye el tamaño de grano en la resistencia de un metal?",
        options: [
            "No tiene influencia",
            "Granos más pequeños → mayor resistencia (fronteras de grano actúan como barreras a dislocaciones)",
            "Granos más grandes → mayor resistencia",
            "Solo afecta el color"
        ],
        correct: "Granos más pequeños → mayor resistencia (fronteras de grano actúan como barreras a dislocaciones)",
        explanation: "Frontera de grano: discontinuidad en la orientación cristalina → barrera al movimiento de dislocaciones. Más fronteras (granos pequeños) → más barreras → mayor resistencia. Relación de Hall-Petch: σ = σ₀ + k·d^(-1/2)."
    },
    {
        question: "¿Cuál es el mecanismo de conducción en un semiconductor tipo N a temperatura ambiente?",
        options: [
            "Solo conducción por huecos",
            "Conducción por electrones (portadores mayoritarios) liberados del dopante",
            "No hay conducción",
            "Conducción iónica"
        ],
        correct: "Conducción por electrones (portadores mayoritarios) liberados del dopante",
        explanation: "Tipo N: donantes (P, As) ceden electrones → electrones = portadores mayoritarios. A temperatura ambiente: energía térmica suficiente para liberar electrones → conducción. Huecos existen pero son minoría."
    },
    {
        question: "¿Cómo afecta la presencia de una interfase débil en un compuesto a su resistencia?",
        options: [
            "No tiene efecto",
            "Reduce significativamente la resistencia porque la carga no se transfiere eficientemente al refuerzo",
            "Aumenta la resistencia",
            "Solo afecta el color"
        ],
        correct: "Reduce significativamente la resistencia porque la carga no se transfiere eficientemente al refuerzo",
        explanation: "Interfase débil: fibra se desliza (fiber pull-out) → carga no se transfiere → material se comporta como si tuviera solo matriz → resistencia muy baja. Interfase es tan crítica como los materiales."
    },

    // SECCIÓN C: APLICACIÓN ASHBY (Preguntas 51-70)
    {
        question: "Para diseñar un ala de avión, ¿cuál es el índice de desempeño más importante?",
        options: [
            "Densidad (ρ)",
            "Módulo de Young (E)",
            "Relación E/ρ (rigidez específica)",
            "Costo"
        ],
        correct: "Relación E/ρ (rigidez específica)",
        explanation: "Ala de avión: debe ser rígida (E alta) pero ligera (ρ baja). Índice: E/ρ. Materiales candidatos: Fibra de carbono/epoxi (E/ρ ≈ 144 GPa/(g/cm³)), Titanio (E/ρ ≈ 23), Acero (E/ρ ≈ 27). Compuesto gana."
    },
    {
        question: "¿Por qué se elige fibra de carbono en lugar de acero para estructuras aeroespaciales?",
        options: [
            "Porque es más barato",
            "Porque tiene mayor relación resistencia/peso (R/ρ) y rigidez/peso (E/ρ)",
            "Porque es más fácil de fabricar",
            "Porque es más resistente al calor"
        ],
        correct: "Porque tiene mayor relación resistencia/peso (R/ρ) y rigidez/peso (E/ρ)",
        explanation: "Fibra de carbono: ρ = 1.6 g/cm³, R ≈ 1500 MPa, E ≈ 230 GPa → R/ρ ≈ 937, E/ρ ≈ 144. Acero: ρ = 7.85 g/cm³, R ≈ 250 MPa, E ≈ 210 GPa → R/ρ ≈ 32, E/ρ ≈ 27. Compuesto es 30x mejor en relación R/ρ."
    },
    {
        question: "Para un implante biomédico (cadera), ¿cuáles son las restricciones de diseño?",
        options: [
            "Solo costo",
            "Solo resistencia mecánica",
            "Biocompatibilidad, resistencia a corrosión, módulo similar a hueso, no tóxico",
            "Solo densidad"
        ],
        correct: "Biocompatibilidad, resistencia a corrosión, módulo similar a hueso, no tóxico",
        explanation: "Implante cadera: debe integrase con hueso (E similar), no corroerse en fluidos corporales, no ser tóxico. Candidatos: Titanio (E = 103 GPa, hueso = 20 GPa → muy rígido), Compuesto Ti/cerámica (E ≈ 30 GPa, mejor match)."
    },
    {
        question: "¿Por qué se usa aluminio en lugar de acero en la carrocería de automóviles modernos?",
        options: [
            "Porque es más barato",
            "Porque es más resistente",
            "Porque tiene menor densidad (2.7 vs 7.85 g/cm³) → menor peso → menor consumo de combustible",
            "Porque es más fácil de reciclar"
        ],
        correct: "Porque tiene menor densidad (2.7 vs 7.85 g/cm³) → menor peso → menor consumo de combustible",
        explanation: "Trade-off: Al tiene menor E (70 vs 210 GPa) pero la reducción de peso compensa. Reducción de peso → menor consumo combustible → menor costo operacional. Índice: E/ρ: Al = 26, Acero = 27 (similar), pero Al es 3x más ligero."
    },
    {
        question: "Para una herramienta de corte de alta velocidad, ¿cuál es la propiedad crítica?",
        options: [
            "Bajo costo",
            "Alta dureza a temperatura elevada (resistencia al ablandamiento térmico)",
            "Alta ductilidad",
            "Baja densidad"
        ],
        correct: "Alta dureza a temperatura elevada (resistencia al ablandamiento térmico)",
        explanation: "Herramienta corte: fricción → calor → T puede alcanzar 800-1000°C. Material debe mantener dureza. Candidatos: Acero rápido (W, Mo, V), Carburo de tungsteno (WC), Cerámica (Al₂O₃). Cerámica gana en dureza a alta T."
    },
    {
        question: "¿Por qué se elige zirconia estabilizada para implantes dentales en lugar de alúmina?",
        options: [
            "Porque es más barata",
            "Porque tiene mayor tenacidad (resistencia al choque térmico y mecánico) aunque menor dureza",
            "Porque es más fácil de fabricar",
            "Porque es más resistente a la corrosión"
        ],
        correct: "Porque tiene mayor tenacidad (resistencia al choque térmico y mecánico) aunque menor dureza",
        explanation: "Alúmina: dureza alta pero frágil (K_IC ≈ 4 MPa√m). Zirconia estabilizada: tenacidad mayor (K_IC ≈ 8 MPa√m) → resiste mejor masticación. Trade-off: menor dureza pero mejor confiabilidad clínica."
    },
    {
        question: "Para una tubería de agua a presión, ¿cuál es el material más apropiado?",
        options: [
            "Acero (solo)",
            "Polímero (PVC o PE)",
            "Cerámica",
            "Compuesto"
        ],
        correct: "Polímero (PVC o PE)",
        explanation: "Restricciones: resistencia a presión, resistencia a corrosión, bajo costo, bajo peso. PVC: E = 2.7 GPa, resistencia = 50 MPa, resistencia química excelente, costo bajo, peso bajo. Acero: más caro, más pesado, requiere anticorrosivos."
    },
    {
        question: "¿Por qué se usa vidrio (SiO₂ amorfo) en ventanas en lugar de cerámica cristalina?",
        options: [
            "Porque es más barato",
            "Porque es transparente (amorfo) vs opaco (cristalino), aunque ambos son cerámicos",
            "Porque es más resistente",
            "Porque es más denso"
        ],
        correct: "Porque es transparente (amorfo) vs opaco (cristalino), aunque ambos son cerámicos",
        explanation: "Vidrio: SiO₂ amorfo → sin orden de largo alcance → luz pasa (transparente). Cerámica cristalina: orden periódico → dispersión de luz → opaco. Ambos son cerámicos, pero propiedades ópticas diferentes."
    },
    {
        question: "Para una pala de turbina eólica, ¿cuál es el material óptimo y por qué?",
        options: [
            "Acero (máxima resistencia)",
            "Fibra de vidrio/poliéster (buena relación R/ρ, bajo costo)",
            "Fibra de carbono/epoxi (mejor R/ρ pero más caro)",
            "Aluminio (bajo peso)"
        ],
        correct: "Fibra de vidrio/poliéster (buena relación R/ρ, bajo costo)",
        explanation: "Trade-off: Fibra carbono tiene mejor R/ρ pero costo es 8x mayor. Fibra vidrio: R/ρ = 243, E/ρ = 22, costo = $3/kg. Carbono: R/ρ = 937, E/ρ = 144, costo = $25/kg. Para palas grandes, vidrio es más económico."
    },
    {
        question: "¿Cuál es el criterio de selección de materiales para un contenedor de almacenamiento de hidrógeno a alta presión?",
        options: [
            "Solo resistencia mecánica",
            "Resistencia a presión, permeabilidad baja a H₂, resistencia a fatiga",
            "Solo bajo costo",
            "Solo bajo peso"
        ],
        correct: "Resistencia a presión, permeabilidad baja a H₂, resistencia a fatiga",
        explanation: "Contenedor H₂: presión 350-700 bar → necesita alta resistencia. Pero H₂ es pequeño → permeabilidad debe ser baja. Ciclos presión → fatiga. Candidatos: Acero de alta resistencia, Compuesto fibra/resina con barrera."
    },
    {
        question: "Para una prótesis de rodilla, ¿cuál es el material ideal para el componente de carga?",
        options: [
            "Polímero puro",
            "Acero inoxidable (resistencia, biocompatibilidad, durabilidad)",
            "Cerámica pura",
            "Aluminio"
        ],
        correct: "Acero inoxidable (resistencia, biocompatibilidad, durabilidad)",
        explanation: "Prótesis rodilla: soporta carga cíclica (fatiga) en ambiente corrosivo (fluidos corporales). Acero inoxidable 316: E = 193 GPa, R = 515 MPa, resistencia corrosión excelente, biocompatible, durabilidad 15+ años."
    },
    {
        question: "¿Por qué se elige silicio dopado en lugar de metal puro para dispositivos semiconductores?",
        options: [
            "Porque es más barato",
            "Porque permite control preciso de conductividad mediante dopaje, creando uniones P-N",
            "Porque es más resistente",
            "Porque es más denso"
        ],
        correct: "Porque permite control preciso de conductividad mediante dopaje, creando uniones P-N",
        explanation: "Metal puro: conductividad fija, no se puede controlar. Silicio dopado: conductividad se controla con concentración de dopante → se pueden crear diodos, transistores, circuitos. Flexibilidad de diseño es la clave."
    },
    {
        question: "Para un blindaje balístico, ¿cuál es la combinación de materiales más efectiva?",
        options: [
            "Solo acero",
            "Solo cerámica",
            "Compuesto: cerámica (dureza, fragmentación) + respaldo de polímero (absorción energía)",
            "Solo polímero"
        ],
        correct: "Compuesto: cerámica (dureza, fragmentación) + respaldo de polímero (absorción energía)",
        explanation: "Blindaje: cerámica (Al₂O₃, SiC) fragmenta proyectil, polímero (Kevlar) absorbe energía residual. Solo cerámica: frágil, se quiebra. Solo polímero: no detiene proyectil. Combinación: sinergia."
    },
    {
        question: "¿Por qué se usa GaAs en lugar de silicio para celdas solares en satélites?",
        options: [
            "Porque es más barato",
            "Porque tiene mayor eficiencia de conversión y mejor resistencia a radiación en el espacio",
            "Porque es más fácil de fabricar",
            "Porque es más denso"
        ],
        correct: "Porque tiene mayor eficiencia de conversión y mejor resistencia a radiación en el espacio",
        explanation: "Silicio: eficiencia ≈ 15%, radiación daña estructura. GaAs: eficiencia ≈ 26%, mayor Eg → menos daño por radiación. Trade-off: GaAs es más caro, pero en satélites el costo de lanzamiento justifica mejor eficiencia."
    },
    {
        question: "Para un componente de motor de combustión interna, ¿cuál es la restricción de diseño más crítica?",
        options: [
            "Bajo costo",
            "Alta resistencia a fatiga térmica (ciclos T 300-800°C) y resistencia a corrosión",
            "Alta ductilidad",
            "Baja densidad"
        ],
        correct: "Alta resistencia a fatiga térmica (ciclos T 300-800°C) y resistencia a corrosión",
        explanation: "Motor: ciclos térmicos rápidos → fatiga térmica. Combustión → gases corrosivos. Candidatos: Acero aleado (Mo, V), Aleación de níquel (Inconel). Inconel: resiste 1000°C, excelente fatiga térmica."
    },
    {
        question: "¿Cuál es el trade-off principal en la selección de materiales para un contenedor de bebidas?",
        options: [
            "Resistencia vs costo",
            "Peso vs costo vs impacto ambiental",
            "Dureza vs ductilidad",
            "Conductividad vs resistencia"
        ],
        correct: "Peso vs costo vs impacto ambiental",
        explanation: "Aluminio: ligero, reciclable, costo moderado. Plástico: muy ligero, bajo costo, impacto ambiental alto. Vidrio: pesado, costo bajo, reciclable, impacto ambiental bajo. Decisión depende de prioridades."
    },
    {
        question: "Para un cable de transmisión eléctrica de larga distancia, ¿cuál es el material ideal?",
        options: [
            "Oro puro",
            "Cobre (excelente conductividad, costo razonable, reciclable)",
            "Aluminio (menor conductividad pero más ligero)",
            "Plata pura"
        ],
        correct: "Cobre (excelente conductividad, costo razonable, reciclable)",
        explanation: "Cable: debe conducir bien (cobre: σ = 59.6 MS/m vs aluminio: 37.7 MS/m) pero costo debe ser razonable. Cobre es el balance óptimo. Pérdidas por resistencia: I²R → cobre reduce pérdidas."
    },

    // SECCIÓN D: CASO INTEGRADOR (Preguntas 71-100)
    {
        question: "En un diodo semiconductor para aplicación aeroespacial, ¿cuál es el efecto de la radiación cósmica?",
        options: [
            "No tiene efecto",
            "Crea defectos puntuales (desplazamientos atómicos) que actúan como centros de recombinación",
            "Aumenta la conductividad",
            "Cambia el color"
        ],
        correct: "Crea defectos puntuales (desplazamientos atómicos) que actúan como centros de recombinación",
        explanation: "Radiación: fotones/partículas desplazan átomos → vacancias + intersticios → centros de recombinación → portadores desaparecen → conductividad disminuye → diodo falla. GaAs es más resistente que Si."
    },
    {
        question: "¿Por qué GaAs es mejor que silicio para celdas solares en satélites?",
        options: [
            "Porque es más barato",
            "Porque Eg mayor (1.4 vs 1.1 eV) → menos daño por radiación; eficiencia mayor (26% vs 15%)",
            "Porque es más fácil de fabricar",
            "Porque es más denso"
        ],
        correct: "Porque Eg mayor (1.4 vs 1.1 eV) → menos daño por radiación; eficiencia mayor (26% vs 15%)",
        explanation: "Brecha de energía mayor: radiación necesita más energía para crear defectos → menos daño. Eficiencia mayor: absorbe más luz útil. Trade-off: GaAs cuesta 10x más, pero en satélites vale la pena."
    },
    {
        question: "Para una turbina de gas a 1400°C, ¿cuál es el material más apropiado?",
        options: [
            "Acero (se funde a 1500°C)",
            "Cerámica pura (frágil a choque térmico)",
            "Aleación de níquel (Inconel) con recubrimiento cerámico (barrera térmica)",
            "Polímero"
        ],
        correct: "Aleación de níquel (Inconel) con recubrimiento cerámico (barrera térmica)",
        explanation: "Turbina 1400°C: acero funde. Cerámica pura: frágil. Solución: Inconel (resiste 1000°C) + recubrimiento cerámico (barrera térmica, aísla hasta 1200°C). Estructura: metal (resistencia) + cerámica (aislamiento)."
    },
    {
        question: "¿Cómo se optimiza la interfase en un compuesto fibra de carbono/epoxi?",
        options: [
            "No es importante",
            "Usando agentes de acoplamiento (silanos) que crean puentes químicos entre fibra y matriz",
            "Aumentando la porosidad",
            "Reduciendo la densidad"
        ],
        correct: "Usando agentes de acoplamiento (silanos) que crean puentes químicos entre fibra y matriz",
        explanation: "Sin tratamiento: adhesión débil → fiber pull-out. Con silanos: enlaces químicos C-O-Si-O-C → transferencia de carga eficiente → resistencia aumenta 20-30%. Interfase es tan importante como los materiales."
    },
    {
        question: "¿Cuál es el mecanismo de falla de un acero bajo fatiga térmica (ciclos T)?",
        options: [
            "Fusión",
            "Grietas por expansión térmica diferencial (ciclos T crean tensiones residuales)",
            "Corrosión",
            "Cambio de fase"
        ],
        correct: "Grietas por expansión térmica diferencial (ciclos T crean tensiones residuales)",
        explanation: "Ciclo T: expansión → contracción → tensiones residuales → grietas. Cada ciclo: ΔT → Δε = α·ΔT → σ = E·Δε. Después de N ciclos: grietas se propagan → falla. Resistencia a fatiga térmica: bajo α, alto E, alta conductividad."
    },
    {
        question: "¿Por qué los refractarios básicos (MgO) se usan en hornos de acero en lugar de ácidos (SiO₂)?",
        options: [
            "Porque son más baratos",
            "Porque la escoria del acero es básica → MgO resiste; SiO₂ se disolvería",
            "Porque son más duros",
            "Porque son más ligeros"
        ],
        correct: "Porque la escoria del acero es básica → MgO resiste; SiO₂ se disolvería",
        explanation: "Regla de oro: Ácido resiste a ácido, Básico resiste a básico. Escoria acero: básica (CaO, MgO) → MgO refractario resiste. SiO₂ (ácido) se disolvería en escoria básica. Selección por química."
    },
    {
        question: "¿Cómo se logra la anisotropía controlada en un compuesto laminado?",
        options: [
            "No es posible",
            "Orientando las fibras en direcciones específicas ([0°], [90°], [±45°]) según cargas esperadas",
            "Aumentando la densidad",
            "Cambiando el color"
        ],
        correct: "Orientando las fibras en direcciones específicas ([0°], [90°], [±45°]) según cargas esperadas",
        explanation: "Laminado: cada capa tiene orientación diferente. [0°]: resistencia en X. [90°]: resistencia en Y. [±45°]: resistencia a torsión. Ingeniero diseña la secuencia de capas para optimizar propiedades según cargas."
    },
    {
        question: "¿Cuál es el efecto del dopaje en la temperatura de transición de un semiconductor?",
        options: [
            "No tiene efecto",
            "Dopaje no afecta Tg (que es de polímeros), pero sí afecta la temperatura de operación máxima",
            "Aumenta Tg",
            "Disminuye Tg"
        ],
        correct: "Dopaje no afecta Tg (que es de polímeros), pero sí afecta la temperatura de operación máxima",
        explanation: "Nota: Tg es de polímeros. Para semiconductores: temperatura máxima de operación depende de la estabilidad térmica de la unión P-N. Dopaje no cambia esto directamente, pero concentración de dopante sí afecta la resistencia térmica."
    },
    {
        question: "¿Por qué se usa un compuesto de matriz metálica (MMC) en lugar de metal puro en componentes de motor?",
        options: [
            "Porque es más barato",
            "Porque combina la ductilidad del metal con la dureza/rigidez del refuerzo cerámico",
            "Porque es más fácil de fabricar",
            "Porque es más ligero"
        ],
        correct: "Porque combina la ductilidad del metal con la dureza/rigidez del refuerzo cerámico",
        explanation: "MMC: Al + partículas SiC. Ventajas: E aumenta (Al = 70 GPa → Al/SiC = 100+ GPa), mantiene ductilidad (no es frágil como cerámica pura), resistencia térmica mejorada. Trade-off: más caro, más complejo de fabricar."
    },
    {
        question: "¿Cuál es la razón principal por la que los semiconductores se usan en lugar de metales para dispositivos electrónicos?",
        options: [
            "Porque son más baratos",
            "Porque la conductividad se puede controlar mediante dopaje, permitiendo crear dispositivos como diodos y transistores",
            "Porque son más resistentes",
            "Porque son más ligeros"
        ],
        correct: "Porque la conductividad se puede controlar mediante dopaje, permitiendo crear dispositivos como diodos y transistores",
        explanation: "Metal: conductividad fija, no se puede controlar. Semiconductor: conductividad se ajusta con dopaje → se crean uniones P-N → rectificación, amplificación, conmutación. Flexibilidad de diseño es revolucionaria."
    },
    {
        question: "¿Cómo se optimiza la relación resistencia/peso en un compuesto para aviación?",
        options: [
            "Usando solo fibra de carbono",
            "Orientando fibras en dirección de máxima carga, minimizando fibras en otras direcciones",
            "Aumentando la densidad",
            "Usando matriz de mayor densidad"
        ],
        correct: "Orientando fibras en dirección de máxima carga, minimizando fibras en otras direcciones",
        explanation: "Ala: carga principal = flexión (vertical) → 80% fibras en [0°] (longitudinal). Carga secundaria = torsión → 20% fibras en [±45°]. Resultado: R/ρ optimizado, peso minimizado. Diseño inteligente > material más caro."
    },
    {
        question: "¿Por qué la zirconia estabilizada con itria (YSZ) es mejor que alúmina pura para implantes dentales?",
        options: [
            "Porque es más barata",
            "Porque tiene mayor tenacidad (resiste masticación) aunque menor dureza",
            "Porque es más fácil de fabricar",
            "Porque es más transparente"
        ],
        correct: "Porque tiene mayor tenacidad (resiste masticación) aunque menor dureza",
        explanation: "Alúmina: dureza = 9 Mohs, K_IC = 4 MPa√m (frágil). YSZ: dureza = 8 Mohs, K_IC = 8 MPa√m (tenaz). Masticación: carga cíclica → YSZ resiste mejor. Trade-off: menor dureza pero mejor confiabilidad clínica."
    },
    {
        question: "¿Cuál es el principal desafío en la selección de materiales para un reactor nuclear?",
        options: [
            "Solo costo",
            "Resistencia a radiación, resistencia a corrosión en agua caliente, estabilidad térmica",
            "Solo bajo peso",
            "Solo alta conductividad"
        ],
        correct: "Resistencia a radiación, resistencia a corrosión en agua caliente, estabilidad térmica",
        explanation: "Reactor: radiación crea defectos → fragilización. Agua 300°C → corrosión. T variable → fatiga térmica. Candidatos: Acero inoxidable 316, Aleaciones Ni (Inconel). Múltiples restricciones simultáneamente."
    },
    {
        question: "¿Cómo se mejora la resistencia al choque térmico de un cerámica?",
        options: [
            "Aumentando la dureza",
            "Aumentando la tenacidad (K_IC) y reduciendo el módulo de Young (E)",
            "Aumentando la densidad",
            "Cambiando el color"
        ],
        correct: "Aumentando la tenacidad (K_IC) y reduciendo el módulo de Young (E)",
        explanation: "Choque térmico: ΔT → tensión térmica σ = E·α·ΔT. Para resistir: E bajo (menos tensión) y K_IC alto (grietas no se propagan). Zirconia: E = 200 GPa, K_IC = 8 MPa√m. Alúmina: E = 380 GPa, K_IC = 4 MPa√m. Zirconia gana."
    },
    {
        question: "¿Por qué se usa nitruro de silicio (Si₃N₄) en cojinetes de alta velocidad en lugar de acero?",
        options: [
            "Porque es más barato",
            "Porque tiene menor densidad (3.2 vs 7.85 g/cm³) → menor inercia → menos fricción, mayor velocidad",
            "Porque es más fácil de fabricar",
            "Porque es más dúctil"
        ],
        correct: "Porque tiene menor densidad (3.2 vs 7.85 g/cm³) → menor inercia → menos fricción, mayor velocidad",
        explanation: "Cojinete alta velocidad: inercia → fricción → calor → falla. Si₃N₄: ρ = 3.2 g/cm³, E = 310 GPa, dureza alta. Acero: ρ = 7.85 g/cm³. Reducción peso 60% → velocidad máxima aumenta 2x."
    },
    {
        question: "¿Cuál es la estrategia de selección de materiales para un componente que debe resistir corrosión y carga mecánica simultáneamente?",
        options: [
            "Elegir el material más resistente a corrosión",
            "Elegir el material más resistente mecánicamente",
            "Usar una matriz de decisión multicriterio considerando ambas restricciones",
            "Elegir el más barato"
        ],
        correct: "Usar una matriz de decisión multicriterio considerando ambas restricciones",
        explanation: "Trade-off: Acero inoxidable = buena corrosión pero E moderado. Titanio = excelente corrosión, E moderado, caro. Aluminio anodizado = buena corrosión, E bajo. Decisión: matriz de decisión con pesos (importancia relativa)."
    },
    {
        question: "¿Por qué los compuestos de fibra de vidrio son más económicos que los de fibra de carbono para aplicaciones no críticas?",
        options: [
            "Porque la fibra de vidrio es más resistente",
            "Porque el costo de fibra de vidrio es 10x menor ($1 vs $10/kg) y la relación R/ρ es suficiente para muchas aplicaciones",
            "Porque es más fácil de reciclar",
            "Porque es más ligero"
        ],
        correct: "Porque el costo de fibra de vidrio es 10x menor ($1 vs $10/kg) y la relación R/ρ es suficiente para muchas aplicaciones",
        explanation: "Fibra vidrio: R/ρ = 243, costo = $1/kg. Fibra carbono: R/ρ = 937, costo = $10/kg. Para palas eólicas, barcos, tuberías: vidrio es óptimo (costo/desempeño). Para aviación: carbono justifica costo."
    },
    {
        question: "¿Cómo se optimiza un semiconductor para máxima eficiencia en una celda solar?",
        options: [
            "Aumentando el dopaje",
            "Eligiendo Eg que coincida con pico de espectro solar (≈ 1.4 eV) y minimizando recombinación",
            "Aumentando la densidad",
            "Cambiando el color"
        ],
        correct: "Eligiendo Eg que coincida con pico de espectro solar (≈ 1.4 eV) y minimizando recombinación",
        explanation: "Eficiencia solar: depende de Eg. Si: Eg = 1.1 eV (eficiencia ≈ 15%). GaAs: Eg = 1.4 eV (eficiencia ≈ 26%). Multiunión: múltiples Eg → eficiencia > 40%. Recombinación: defectos reducen eficiencia → pureza crítica."
    }
];

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

// ===== DATOS DE MATERIALES PARA CLASIFICADOR (35 MATERIALES) =====
const materialsData = [
    // Metales (10)
    { name: "Acero", category: "Metales" },
    { name: "Aluminio", category: "Metales" },
    { name: "Cobre", category: "Metales" },
    { name: "Titanio", category: "Metales" },
    { name: "Níquel", category: "Metales" },
    { name: "Magnesio", category: "Metales" },
    { name: "Zinc", category: "Metales" },
    { name: "Plomo", category: "Metales" },
    { name: "Tungsteno", category: "Metales" },
    { name: "Molibdeno", category: "Metales" },
    
    // Polímeros (10)
    { name: "Polietileno", category: "Polímeros" },
    { name: "Poliestireno", category: "Polímeros" },
    { name: "PVC", category: "Polímeros" },
    { name: "Nylon", category: "Polímeros" },
    { name: "Policarbonato", category: "Polímeros" },
    { name: "Acrílico", category: "Polímeros" },
    { name: "PET", category: "Polímeros" },
    { name: "PTFE (Teflón)", category: "Polímeros" },
    { name: "ABS", category: "Polímeros" },
    { name: "Poliuretano", category: "Polímeros" },
    
    // Cerámicos (8)
    { name: "Alúmina", category: "Cerámicos" },
    { name: "Sílice", category: "Cerámicos" },
    { name: "Zirconia", category: "Cerámicos" },
    { name: "Carburo de Silicio", category: "Cerámicos" },
    { name: "Vidrio", category: "Cerámicos" },
    { name: "Nitruro de Silicio", category: "Cerámicos" },
    { name: "Magnesia", category: "Cerámicos" },
    { name: "Porcelana", category: "Cerámicos" },
    
    // Compuestos (7)
    { name: "Fibra de Carbono/Epoxi", category: "Compuestos" },
    { name: "Fibra de Vidrio/Poliéster", category: "Compuestos" },
    { name: "Kevlar/Epoxi", category: "Compuestos" },
    { name: "Carbono/Carbono", category: "Compuestos" },
    { name: "Metal/Cerámica", category: "Compuestos" },
    { name: "Madera", category: "Compuestos" },
    { name: "Hormigón", category: "Compuestos" }
];

// ===== DATOS DE MATERIALES PARA COMPARADOR (35+ MATERIALES) =====
const materialsComparator = [
    { name: "Acero Dulce", properties: { "Densidad (g/cm³)": 7.85, "Módulo Young (GPa)": 210, "Resistencia Tensil (MPa)": 250, "Elongación (%)": 25, "Costo (USD/kg)": 0.5, "Conductividad Térmica (W/m·K)": 50 } },
    { name: "Aluminio", properties: { "Densidad (g/cm³)": 2.70, "Módulo Young (GPa)": 70, "Resistencia Tensil (MPa)": 90, "Elongación (%)": 40, "Costo (USD/kg)": 2.0, "Conductividad Térmica (W/m·K)": 237 } },
    { name: "Titanio", properties: { "Densidad (g/cm³)": 4.51, "Módulo Young (GPa)": 103, "Resistencia Tensil (MPa)": 1160, "Elongación (%)": 10, "Costo (USD/kg)": 15.0, "Conductividad Térmica (W/m·K)": 22 } },
    { name: "Polietileno", properties: { "Densidad (g/cm³)": 0.95, "Módulo Young (GPa)": 0.8, "Resistencia Tensil (MPa)": 20, "Elongación (%)": 500, "Costo (USD/kg)": 1.5, "Conductividad Térmica (W/m·K)": 0.5 } },
    { name: "Poliestireno", properties: { "Densidad (g/cm³)": 1.05, "Módulo Young (GPa)": 3.0, "Resistencia Tensil (MPa)": 50, "Elongación (%)": 2, "Costo (USD/kg)": 1.2, "Conductividad Térmica (W/m·K)": 0.1 } },
    { name: "Nylon 6", properties: { "Densidad (g/cm³)": 1.14, "Módulo Young (GPa)": 3.0, "Resistencia Tensil (MPa)": 80, "Elongación (%)": 300, "Costo (USD/kg)": 2.5, "Conductividad Térmica (W/m·K)": 0.25 } },
    { name: "Alúmina (Al₂O₃)", properties: { "Densidad (g/cm³)": 3.97, "Módulo Young (GPa)": 380, "Resistencia Tensil (MPa)": 400, "Elongación (%)": 0, "Costo (USD/kg)": 5.0, "Conductividad Térmica (W/m·K)": 30 } },
    { name: "Zirconia (ZrO₂)", properties: { "Densidad (g/cm³)": 6.10, "Módulo Young (GPa)": 200, "Resistencia Tensil (MPa)": 1200, "Elongación (%)": 0, "Costo (USD/kg)": 20.0, "Conductividad Térmica (W/m·K)": 2.5 } },
    { name: "Vidrio", properties: { "Densidad (g/cm³)": 2.50, "Módulo Young (GPa)": 70, "Resistencia Tensil (MPa)": 50, "Elongación (%)": 0, "Costo (USD/kg)": 0.3, "Conductividad Térmica (W/m·K)": 1.0 } },
    { name: "Fibra de Carbono/Epoxi", properties: { "Densidad (g/cm³)": 1.60, "Módulo Young (GPa)": 230, "Resistencia Tensil (MPa)": 1500, "Elongación (%)": 1, "Costo (USD/kg)": 25.0, "Conductividad Térmica (W/m·K)": 5.0 } },
    { name: "Fibra de Vidrio/Poliéster", properties: { "Densidad (g/cm³)": 1.85, "Módulo Young (GPa)": 40, "Resistencia Tensil (MPa)": 450, "Elongación (%)": 3, "Costo (USD/kg)": 3.0, "Conductividad Térmica (W/m·K)": 0.3 } },
    { name: "Kevlar/Epoxi", properties: { "Densidad (g/cm³)": 1.45, "Módulo Young (GPa)": 130, "Resistencia Tensil (MPa)": 1400, "Elongación (%)": 2, "Costo (USD/kg)": 30.0, "Conductividad Térmica (W/m·K)": 0.5 } },
    { name: "Cobre", properties: { "Densidad (g/cm³)": 8.96, "Módulo Young (GPa)": 130, "Resistencia Tensil (MPa)": 220, "Elongación (%)": 45, "Costo (USD/kg)": 8.0, "Conductividad Térmica (W/m·K)": 401 } },
    { name: "Magnesio", properties: { "Densidad (g/cm³)": 1.81, "Módulo Young (GPa)": 45, "Resistencia Tensil (MPa)": 170, "Elongación (%)": 3, "Costo (USD/kg)": 3.0, "Conductividad Térmica (W/m·K)": 156 } },
    { name: "Níquel", properties: { "Densidad (g/cm³)": 8.90, "Módulo Young (GPa)": 200, "Resistencia Tensil (MPa)": 460, "Elongación (%)": 30, "Costo (USD/kg)": 10.0, "Conductividad Térmica (W/m·K)": 91 } },
    { name: "Acero Inoxidable 316", properties: { "Densidad (g/cm³)": 8.00, "Módulo Young (GPa)": 193, "Resistencia Tensil (MPa)": 515, "Elongación (%)": 30, "Costo (USD/kg)": 3.5, "Conductividad Térmica (W/m·K)": 16 } },
    { name: "Carburo de Silicio", properties: { "Densidad (g/cm³)": 3.21, "Módulo Young (GPa)": 410, "Resistencia Tensil (MPa)": 550, "Elongación (%)": 0, "Costo (USD/kg)": 10.0, "Conductividad Térmica (W/m·K)": 120 } },
    { name: "Nitruro de Silicio", properties: { "Densidad (g/cm³)": 3.44, "Módulo Young (GPa)": 310, "Resistencia Tensil (MPa)": 1000, "Elongación (%)": 0, "Costo (USD/kg)": 15.0, "Conductividad Térmica (W/m·K)": 30 } },
    { name: "Policarbonato", properties: { "Densidad (g/cm³)": 1.20, "Módulo Young (GPa)": 2.3, "Resistencia Tensil (MPa)": 65, "Elongación (%)": 100, "Costo (USD/kg)": 3.0, "Conductividad Térmica (W/m·K)": 0.2 } },
    { name: "Acrílico", properties: { "Densidad (g/cm³)": 1.19, "Módulo Young (GPa)": 3.2, "Resistencia Tensil (MPa)": 72, "Elongación (%)": 5, "Costo (USD/kg)": 2.0, "Conductividad Térmica (W/m·K)": 0.2 } },
    { name: "PVC", properties: { "Densidad (g/cm³)": 1.38, "Módulo Young (GPa)": 2.7, "Resistencia Tensil (MPa)": 50, "Elongación (%)": 40, "Costo (USD/kg)": 1.0, "Conductividad Térmica (W/m·K)": 0.16 } },
    { name: "Silicio", properties: { "Densidad (g/cm³)": 2.33, "Módulo Young (GPa)": 130, "Resistencia Tensil (MPa)": 100, "Elongación (%)": 0, "Costo (USD/kg)": 5.0, "Conductividad Térmica (W/m·K)": 150 } },
    { name: "Germanio", properties: { "Densidad (g/cm³)": 5.32, "Módulo Young (GPa)": 103, "Resistencia Tensil (MPa)": 80, "Elongación (%)": 0, "Costo (USD/kg)": 50.0, "Conductividad Térmica (W/m·K)": 60 } },
    { name: "GaAs", properties: { "Densidad (g/cm³)": 5.32, "Módulo Young (GPa)": 85, "Resistencia Tensil (MPa)": 90, "Elongación (%)": 0, "Costo (USD/kg)": 100.0, "Conductividad Térmica (W/m·K)": 55 } },
    { name: "Tungsteno", properties: { "Densidad (g/cm³)": 19.25, "Módulo Young (GPa)": 411, "Resistencia Tensil (MPa)": 1510, "Elongación (%)": 0, "Costo (USD/kg)": 20.0, "Conductividad Térmica (W/m·K)": 174 } },
    { name: "Molibdeno", properties: { "Densidad (g/cm³)": 10.22, "Módulo Young (GPa)": 329, "Resistencia Tensil (MPa)": 655, "Elongación (%)": 0, "Costo (USD/kg)": 12.0, "Conductividad Térmica (W/m·K)": 138 } },
    { name: "Inconel 718", properties: { "Densidad (g/cm³)": 8.19, "Módulo Young (GPa)": 200, "Resistencia Tensil (MPa)": 1380, "Elongación (%)": 12, "Costo (USD/kg)": 50.0, "Conductividad Térmica (W/m·K)": 11.4 } },
    { name: "Titanio Grado 5", properties: { "Densidad (g/cm³)": 4.43, "Módulo Young (GPa)": 103, "Resistencia Tensil (MPa)": 1160, "Elongación (%)": 10, "Costo (USD/kg)": 18.0, "Conductividad Térmica (W/m·K)": 7.4 } },
    { name: "PET", properties: { "Densidad (g/cm³)": 1.38, "Módulo Young (GPa)": 2.7, "Resistencia Tensil (MPa)": 55, "Elongación (%)": 50, "Costo (USD/kg)": 1.8, "Conductividad Térmica (W/m·K)": 0.24 } },
    { name: "PTFE (Teflón)", properties: { "Densidad (g/cm³)": 2.15, "Módulo Young (GPa)": 0.5, "Resistencia Tensil (MPa)": 20, "Elongación (%)": 300, "Costo (USD/kg)": 20.0, "Conductividad Térmica (W/m·K)": 0.25 } },
    { name: "Magnesia (MgO)", properties: { "Densidad (g/cm³)": 3.58, "Módulo Young (GPa)": 250, "Resistencia Tensil (MPa)": 200, "Elongación (%)": 0, "Costo (USD/kg)": 3.0, "Conductividad Térmica (W/m·K)": 40 } },
    { name: "Carbono/Carbono", properties: { "Densidad (g/cm³)": 1.60, "Módulo Young (GPa)": 200, "Resistencia Tensil (MPa)": 400, "Elongación (%)": 0, "Costo (USD/kg)": 50.0, "Conductividad Térmica (W/m·K)": 100 } },
    { name: "Hormigón", properties: { "Densidad (g/cm³)": 2.40, "Módulo Young (GPa)": 30, "Resistencia Tensil (MPa)": 30, "Elongación (%)": 0, "Costo (USD/kg)": 0.1, "Conductividad Térmica (W/m·K)": 1.4 } },
    { name: "Madera (Roble)", properties: { "Densidad (g/cm³)": 0.75, "Módulo Young (GPa)": 11, "Resistencia Tensil (MPa)": 60, "Elongación (%)": 5, "Costo (USD/kg)": 0.5, "Conductividad Térmica (W/m·K)": 0.17 } },
    { name: "Plomo", properties: { "Densidad (g/cm³)": 11.34, "Módulo Young (GPa)": 16, "Resistencia Tensil (MPa)": 17, "Elongación (%)": 50, "Costo (USD/kg)": 2.0, "Conductividad Térmica (W/m·K)": 35 } }
];

// ===== DATOS PARA SIMULADOR PSPD (15 EJEMPLOS) =====
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
    },
    {
        name: "Aleación de Aluminio",
        proceso: "Adición de Cu, Mg, Si + Tratamiento térmico (envejecimiento)",
        estructura: "Precipitados duros (CuAl₂) dispersos en matriz Al",
        propiedad: "Resistencia aumenta 3x, mantiene bajo peso, buena ductilidad",
        desempeño: "Fuselajes de aviones, estructuras aeroespaciales, componentes de precisión"
    },
    {
        name: "Acero Inoxidable",
        proceso: "Adición de Cr (>12%) + Cr₂O₃ pasivante en superficie",
        estructura: "Capa pasiva de óxido que protege del ataque químico",
        propiedad: "Excelente resistencia a corrosión, resistencia moderada, biocompatible",
        desempeño: "Implantes médicos, tuberías químicas, utensilios de cocina, equipos hospitalarios"
    },
    {
        name: "Compuesto Laminado",
        proceso: "Capas alternas [0°/90°/±45°] de fibra de carbono + epoxi",
        estructura: "Anisotropía controlada: cada capa optimizada para dirección de carga",
        propiedad: "Resistencia/peso optimizada, rigidez en múltiples direcciones",
        desempeño: "Carrocerías de autos deportivos, marcos de bicicletas, estructuras de drones"
    },
    {
        name: "Cerámica Refractaria",
        proceso: "Sinterización de alúmina (Al₂O₃) a 1800°C",
        estructura: "Granos de Al₂O₃ densamente empacados, baja porosidad",
        propiedad: "Punto de fusión 2072°C, resistencia química, baja conductividad térmica",
        desempeño: "Revestimiento de hornos de acería, crisoles, tubos de combustión"
    },
    {
        name: "Polímero Termoestable",
        proceso: "Entrecruzamiento químico (curado) con agente de enlace",
        estructura: "Red 3D de enlaces covalentes, sin fusión posible",
        propiedad: "Rigidez extrema, resistencia térmica hasta 300°C, no reciclable",
        desempeño: "Circuitos impresos, aislamiento eléctrico, estructuras de alta temperatura"
    },
    {
        name: "Titanio Puro",
        proceso: "Reducción de TiO₂ + Purificación (esponja de titanio)",
        estructura: "Estructura HCP a temperatura ambiente, alotrópico",
        propiedad: "Excelente relación resistencia/peso, biocompatible, resistencia a corrosión",
        desempeño: "Implantes óseos, turbinas de motores, equipos químicos, estructuras aeroespaciales"
    },
    {
        name: "Vidrio Templado",
        proceso: "Calentamiento a 700°C + Enfriamiento rápido con aire",
        estructura: "Tensiones residuales compresivas en superficie, amorfo",
        propiedad: "Resistencia a impacto 5x mayor, se quiebra en pequeños fragmentos",
        desempeño: "Ventanas de seguridad, pantallas de dispositivos, puertas de edificios"
    },
    {
        name: "Compuesto Metal-Cerámica",
        proceso: "Infiltración de metal fundido en matriz cerámica",
        estructura: "Partículas cerámicas en matriz metálica, interfase fuerte",
        propiedad: "Rigidez de cerámica + ductilidad de metal, resistencia térmica",
        desempeño: "Componentes de motores, discos de freno, herramientas de corte"
    },
    {
        name: "Polímero Elastómero",
        proceso: "Vulcanización: entrecruzamiento con azufre",
        estructura: "Red 3D flexible con entrecruzamiento moderado",
        propiedad: "Elasticidad extrema, recuperación rápida, resistencia a desgarre",
        desempeño: "Neumáticos, sellos, amortiguadores, bandas elásticas"
    },
    {
        name: "Silicio Dopado (Semiconductor)",
        proceso: "Dopaje tipo N con Fósforo (5 átomos/cm³) + Difusión térmica",
        estructura: "Donantes crean niveles de energía cerca de banda de conducción",
        propiedad: "Conductividad controlada, portadores = electrones, temperatura operación 150°C",
        desempeño: "Chips de computadora, sensores, diodos, transistores, celdas solares"
    }
];

// ===== FUNCIONES PRINCIPALES =====
function openTab(tabName) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => tab.classList.add('hidden'));
    document.getElementById(tabName).classList.remove('hidden');
    
    if (tabName === 'quiz') initQuiz();
    if (tabName === 'flashcards') initFlashcards();
    if (tabName === 'classifier') initClassifier();
    if (tabName === 'comparator') initComparator();
    if (tabName === 'pspd') initPSPD();
}

// ===== QUIZ =====
function initQuiz() {
    currentQuestionIndex = 0;
    quizScore = 0;
    selectedAnswers = [];
    loadQuestion();
}

function loadQuestion() {
    const quizContent = document.getElementById('quiz-content');
    const quizResult = document.getElementById('quiz-result');
    
    if (currentQuestionIndex >= quizQuestions.length) {
        quizContent.classList.add('hidden');
        quizResult.classList.remove('hidden');
        document.getElementById('final-score').textContent = quizScore;
        document.getElementById('total-questions').textContent = quizQuestions.length;
        document.getElementById('percentage').textContent = Math.round((quizScore / quizQuestions.length) * 100);
        return;
    }
    
    quizContent.classList.remove('hidden');
    quizResult.classList.add('hidden');
    
    const question = quizQuestions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    
    document.getElementById('quiz-progress').style.width = progress + '%';
    document.getElementById('quiz-current').textContent = currentQuestionIndex + 1;
    document.getElementById('quiz-total').textContent = quizQuestions.length;
    document.getElementById('question-text').textContent = question.question;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => selectAnswer(option, question.correct, question.explanation);
        optionsContainer.appendChild(button);
    });
}

function selectAnswer(selected, correct, explanation) {
    if (selected === correct) {
        quizScore++;
    }
    
    selectedAnswers.push({ selected, correct });
    
    const explanationDiv = document.getElementById('explanation');
    explanationDiv.innerHTML = `<strong>Explicación:</strong> ${explanation}`;
    explanationDiv.classList.remove('hidden');
    
    document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);
    
    setTimeout(() => {
        currentQuestionIndex++;
        loadQuestion();
        document.getElementById('explanation').classList.add('hidden');
    }, 3000);
}

function restartQuiz() {
    initQuiz();
}

// ===== FLASHCARDS =====
function initFlashcards() {
    currentFlashcardIndex = 0;
    displayFlashcard();
}

function displayFlashcard() {
    const card = flashcards[currentFlashcardIndex];
    document.getElementById('flashcard-front').textContent = card.front;
    document.getElementById('flashcard-back').textContent = card.back;
    document.getElementById('flashcard-back').style.display = 'none';
    document.getElementById('flashcard-counter').textContent = `${currentFlashcardIndex + 1} / ${flashcards.length}`;
    document.getElementById('flashcard').style.transform = 'rotateY(0deg)';
}

function flipCard() {
    const back = document.getElementById('flashcard-back');
    const card = document.getElementById('flashcard');
    if (back.style.display === 'none') {
        back.style.display = 'block';
        card.style.transform = 'rotateY(180deg)';
    } else {
        back.style.display = 'none';
        card.style.transform = 'rotateY(0deg)';
    }
}

function nextFlashcard() {
    if (currentFlashcardIndex < flashcards.length - 1) {
        currentFlashcardIndex++;
        displayFlashcard();
    }
}

function prevFlashcard() {
    if (currentFlashcardIndex > 0) {
        currentFlashcardIndex--;
        displayFlashcard();
    }
}

// ===== CLASIFICADOR =====
function initClassifier() {
    const container = document.getElementById('classifier-container');
    container.innerHTML = '';
    
    const materialsShuffled = [...materialsData].sort(() => Math.random() - 0.5);
    
    materialsShuffled.forEach(material => {
        const div = document.createElement('div');
        div.className = 'material-item';
        div.draggable = true;
        div.textContent = material.name;
        div.dataset.category = material.category;
        div.ondragstart = (e) => {
            draggedElement = e.target;
            e.target.style.opacity = '0.5';
        };
        div.ondragend = (e) => {
            e.target.style.opacity = '1';
        };
        container.appendChild(div);
    });
    
    const categories = ['Metales', 'Polímeros', 'Cerámicos', 'Compuestos'];
    const dropsContainer = document.getElementById('drops-container');
    dropsContainer.innerHTML = '';
    
    categories.forEach(cat => {
        const drop = document.createElement('div');
        drop.className = 'drop-zone';
        drop.dataset.category = cat;
        drop.innerHTML = `<h3>${cat}</h3>`;
        drop.ondragover = (e) => e.preventDefault();
        drop.ondrop = (e) => {
            e.preventDefault();
            if (draggedElement && draggedElement.dataset.category === cat) {
                drop.appendChild(draggedElement);
                draggedElement.draggable = false;
                draggedElement.style.cursor = 'default';
            }
        };
        dropsContainer.appendChild(drop);
    });
}

// ===== COMPARADOR =====
function initComparator() {
    const select = document.getElementById('material-select');
    select.innerHTML = '<option value="">Selecciona un material...</option>';
    materialsComparator.forEach((mat, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = mat.name;
        select.appendChild(option);
    });
}

function compareMaterials() {
    const select = document.getElementById('material-select');
    const index = select.value;
    if (index === '') return;
    
    const material = materialsComparator[index];
    const table = document.getElementById('comparison-table');
    table.innerHTML = '<tr><th>Propiedad</th><th>Valor</th></tr>';
    
    for (const [prop, value] of Object.entries(material.properties)) {
        const row = table.insertRow();
        row.insertCell(0).textContent = prop;
        row.insertCell(1).textContent = value;
    }
}

// ===== SIMULADOR PSPD =====
function initPSPD() {
    const select = document.getElementById('pspd-select');
    select.innerHTML = '';
    pspdExamples.forEach((ex, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = ex.name;
        select.appendChild(option);
    });
}

function showPSPDExample() {
    const select = document.getElementById('pspd-select');
    const index = select.value;
    if (index === '') return;
    
    const example = pspdExamples[index];
    const details = document.getElementById('pspd-details');
    details.innerHTML = `
        <div class="pspd-card">
            <h3>Proceso</h3>
            <p>${example.proceso}</p>
        </div>
        <div class="pspd-card">
            <h3>Estructura</h3>
            <p>${example.estructura}</p>
        </div>
        <div class="pspd-card">
            <h3>Propiedades</h3>
            <p>${example.propiedad}</p>
        </div>
        <div class="pspd-card">
            <h3>Desempeño</h3>
            <p>${example.desempeño}</p>
        </div>
    `;
}

// Inicializar en carga
document.addEventListener('DOMContentLoaded', () => {
    openTab('quiz');
});
