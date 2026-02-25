// ===== VARIABLES GLOBALES =====
let currentQuestionIndex = 0;
let quizScore = 0;
let selectedAnswers = [];
let currentFlashcardIndex = 0;
let flashcards = [];
let draggedElement = null;

// ===== 100 PREGUNTAS PARA EL QUIZ =====
const quizQuestions = [
    {question: "¿Cuál es la principal diferencia entre alotropía y polimorfismo?", options: ["La alotropía solo ocurre en elementos puros", "La alotropía es más estable", "El polimorfismo solo a bajas temperaturas", "No hay diferencia"], correct: 0, explanation: "La alotropía es para elementos puros (C→Grafito/Diamante), polimorfismo para compuestos (ZrO₂→Monoclínica/Tetragonal)."},
    {question: "¿Qué caracteriza a un material anisotrópico?", options: ["Propiedades iguales en todas direcciones", "Propiedades varían según dirección", "Siempre más duro", "Solo polímeros"], correct: 1, explanation: "Anisotropía = propiedades dependen de la dirección. Ejemplo: madera más fácil de romper a favor de la veta."},
    {question: "¿Cuál es la relación entre estructura cristalina y propiedades?", options: ["No existe relación", "La estructura determina las propiedades", "Solo afecta densidad", "Solo afecta color"], correct: 1, explanation: "La estructura define distancias interatómicas y enlaces, determinando resistencia, ductilidad, dureza, etc."},
    {question: "¿Qué es un monómero?", options: ["Una cadena larga", "Unidad molecular que se repite", "Polímero muy corto", "Átomo individual"], correct: 1, explanation: "Monómero = unidad pequeña que se repite. Ejemplo: etileno (C2H4) es el monómero del polietileno."},
    {question: "¿Qué tipo de enlace predomina en los polímeros?", options: ["Iónico", "Covalente en cadena principal", "Metálico", "Van der Waals"], correct: 1, explanation: "Enlace covalente fuerte en la cadena principal. Fuerzas Van der Waals débiles entre cadenas."},
    {question: "¿Qué es la Tg en polímeros?", options: ["Temperatura de fusión", "Temperatura de transición vítrea", "Temperatura de degradación", "Temperatura de cristalización"], correct: 1, explanation: "Tg = temperatura donde el polímero pasa de vítreo (rígido) a gomoso (flexible), sin fundirse."},
    {question: "¿Cuál es la característica principal de los cerámicos?", options: ["Alta ductilidad", "Alta dureza y fragilidad", "Excelente conductividad", "Bajo punto de fusión"], correct: 1, explanation: "Cerámicos: duros, frágiles, aislantes, estables térmicamente. Fractura sin deformación plástica."},
    {question: "¿Qué enlace predomina en los cerámicos?", options: ["Covalente puro", "Iónico y covalente", "Metálico", "Van der Waals"], correct: 1, explanation: "Enlaces iónico-covalentes muy fuertes crean rigidez extrema, causando fragilidad."},
    {question: "¿Qué es un refractario?", options: ["Material frágil", "Cerámico de alta temperatura", "Polímero resistente", "Metal puro"], correct: 1, explanation: "Refractario = cerámico diseñado para resistir T>1500°C. Usado en hornos, crisoles, reactores."},
    {question: "¿Cuál es la ventaja principal de los materiales compuestos?", options: ["Bajo costo", "Alta relación resistencia/peso", "Fácil procesamiento", "Reciclaje simple"], correct: 1, explanation: "Compuestos = refuerzo + matriz. Combinan fortalezas de ambos: resistencia del refuerzo + ductilidad de matriz."},
    {question: "¿Qué es la interfase en un compuesto?", options: ["El refuerzo", "La matriz", "La unión entre refuerzo y matriz", "El aire entre componentes"], correct: 2, explanation: "Interfase = frontera crítica donde se transfiere carga. Mala adherencia = falla del compuesto."},
    {question: "¿Qué determina la tenacidad en compuestos?", options: ["Solo el refuerzo", "Solo la matriz", "La desviación de grietas en la interfase", "El color"], correct: 2, explanation: "Interfase desvia grietas, evitando fractura catastrófica. Aumenta tenacidad respecto a cerámicos puros."},
    {question: "¿Cuál es la banda de energía prohibida en semiconductores?", options: ["Energía de fusión", "Rango de energía sin estados electrónicos", "Energía de ionización", "Energía térmica"], correct: 1, explanation: "Brecha de energía (Eg) = diferencia entre banda de conducción y valencia. Define si es semiconductor, aislante o conductor."},
    {question: "¿Qué es el dopaje tipo N?", options: ["Agregar átomos aceptores", "Agregar átomos donantes", "Calentar el material", "Aplicar presión"], correct: 1, explanation: "Dopaje N = agregar donantes (P, As en Si). Electrones libres = portadores mayoritarios. Conducción por electrones."},
    {question: "¿Qué es el dopaje tipo P?", options: ["Agregar átomos donantes", "Agregar átomos aceptores", "Enfriar el material", "Aplicar campo eléctrico"], correct: 1, explanation: "Dopaje P = agregar aceptores (B, Ga en Si). Huecos = portadores mayoritarios. Conducción por huecos."},
    {question: "¿Qué es una unión P-N?", options: ["Dos semiconductores puros", "Interfase entre dopaje P y N", "Conexión de dos cables", "Región de aislante"], correct: 1, explanation: "Unión P-N = frontera entre dopaje P y N. Crea región de agotamiento y potencial de barrera. Base de diodos."},
    {question: "¿Cuál es la función de un diodo semiconductor?", options: ["Amplificar señales", "Rectificar corriente", "Generar luz", "Almacenar carga"], correct: 1, explanation: "Diodo = permite flujo en una dirección (polarización directa), bloquea en otra (inversa). Rectificador."},
    {question: "¿Qué es un transistor BJT?", options: ["Diodo doble", "Tres terminales: base, colector, emisor", "Resistencia variable", "Capacitor especial"], correct: 1, explanation: "BJT = transistor bipolar. Pequeña corriente en base controla gran corriente colector-emisor. Amplificador."},
    {question: "¿Qué es el procesamiento de materiales?", options: ["Solo fundición", "Transformación de materia prima en producto final", "Reciclaje", "Almacenamiento"], correct: 1, explanation: "Procesamiento = conjunto de operaciones (fundición, moldeo, tratamiento térmico) que modifican estructura y propiedades."},
    {question: "¿Cuál es el objetivo del tratamiento térmico en aceros?", options: ["Cambiar color", "Modificar microestructura para mejorar propiedades", "Aumentar peso", "Reducir costo"], correct: 1, explanation: "Tratamiento térmico = temple, recocido, revenido. Modifica fases, tamaño de grano, dureza, ductilidad."},
    {question: "¿Qué es la cristalinidad en polímeros?", options: ["Transparencia", "Grado de orden molecular", "Dureza absoluta", "Punto de fusión"], correct: 1, explanation: "Cristalinidad = % de zonas ordenadas vs amorfas. Mayor cristalinidad = mayor rigidez pero menor ductilidad."},
    {question: "¿Cuál es la relación entre densidad y propiedades?", options: ["No existe relación", "Mayor densidad siempre = mejor", "Densidad afecta rigidez, conductividad, resistencia", "Solo afecta apariencia"], correct: 2, explanation: "Densidad = masa/volumen. Afecta todas las propiedades. Compuestos: baja densidad + alta resistencia."},
    {question: "¿Qué es un material policristalino?", options: ["Un cristal perfecto", "Múltiples granos cristalinos con orientaciones aleatorias", "Material amorfo", "Polímero cristalino"], correct: 1, explanation: "Policristalino = muchos granos pequeños. Frontera de grano = defecto. Mayoría de metales y cerámicos."},
    {question: "¿Qué es una dislocación?", options: ["Fractura", "Defecto lineal en la estructura", "Cambio de fase", "Deformación plástica"], correct: 1, explanation: "Dislocación = defecto lineal. Movimiento de dislocaciones = deformación plástica. Metales: móviles. Cerámicos: bloqueadas."},
    {question: "¿Cuál es la diferencia entre deformación elástica y plástica?", options: ["No hay diferencia", "Elástica es reversible, plástica es permanente", "Plástica es más fuerte", "Elástica solo en metales"], correct: 1, explanation: "Elástica: material vuelve a forma original al quitar carga. Plástica: deformación permanente. Dislocaciones se mueven."},
    {question: "¿Qué es el módulo de Young?", options: ["Densidad", "Rigidez = esfuerzo/deformación elástica", "Resistencia a tensión", "Ductilidad"], correct: 1, explanation: "E = σ/ε. Mide rigidez. Acero ~200 GPa, Aluminio ~70 GPa, Polímeros ~1-10 GPa."},
    {question: "¿Qué es la resistencia a tensión?", options: ["Rigidez", "Máximo esfuerzo antes de fractura", "Deformación permanente", "Punto de fluencia"], correct: 1, explanation: "Resistencia = máximo esfuerzo que soporta. Acero ~400 MPa, Aluminio ~300 MPa, Cerámicos ~100-500 MPa."},
    {question: "¿Qué es la ductilidad?", options: ["Dureza", "Capacidad de deformarse plásticamente sin romper", "Resistencia al calor", "Conductividad"], correct: 1, explanation: "Ductilidad = % elongación antes de fractura. Metales: altos (10-50%). Cerámicos: bajos (<1%)."},
    {question: "¿Qué es la tenacidad?", options: ["Dureza", "Capacidad de absorber energía antes de fractura", "Resistencia al calor", "Elasticidad"], correct: 1, explanation: "Tenacidad = área bajo curva esfuerzo-deformación. Metales: altos. Cerámicos: bajos. Compuestos: intermedios-altos."},
    {question: "¿Cuál es la diferencia entre dureza y fragilidad?", options: ["No hay diferencia", "Dureza=resistencia a rayado, fragilidad=fractura sin deformación", "Fragilidad es más fuerte", "Dureza solo en metales"], correct: 1, explanation: "Dureza = resistencia a penetración/rayado. Fragilidad = fractura sin deformación plástica. Cerámicos: duros y frágiles."},
    {question: "¿Qué es la conductividad térmica?", options: ["Capacidad de cambiar temperatura", "Capacidad de transferir calor", "Resistencia al calor", "Punto de fusión"], correct: 1, explanation: "κ = calor/(tiempo×área×ΔT). Metales: altos (~100 W/m·K). Polímeros: bajos (~0.1-1). Cerámicos: intermedios."},
    {question: "¿Qué es la conductividad eléctrica?", options: ["Resistencia", "Capacidad de conducir corriente", "Aislamiento", "Carga acumulada"], correct: 1, explanation: "σ = corriente/(voltaje×área). Metales: ~10^6 S/m. Semiconductores: ~10^-3 a 10^3. Aislantes: <10^-10."},
    {question: "¿Cuál es la diferencia entre conductor, semiconductor y aislante?", options: ["No hay diferencia", "Diferencia en brecha de energía y portadores", "Solo en color", "Solo en densidad"], correct: 1, explanation: "Conductor: Eg~0, muchos portadores libres. Semiconductor: Eg~1-3 eV, portadores por dopaje. Aislante: Eg>5 eV, sin portadores."},
    {question: "¿Qué es la resistencia a la corrosión?", options: ["Dureza", "Capacidad de resistir ataque químico", "Rigidez", "Conductividad"], correct: 1, explanation: "Corrosión = reacción química con ambiente. Acero inoxidable: resistente (Cr protege). Aluminio: óxido protege naturalmente."},
    {question: "¿Qué es la resistencia al desgaste?", options: ["Dureza", "Capacidad de resistir fricción y abrasión", "Elasticidad", "Conductividad"], correct: 1, explanation: "Desgaste = pérdida de material por fricción. Depende de dureza, rugosidad, lubricación. Cerámicos: excelentes."},
    {question: "¿Qué es la fatiga en materiales?", options: ["Cansancio del material", "Fractura por esfuerzo cíclico repetido", "Envejecimiento", "Oxidación"], correct: 1, explanation: "Fatiga = fractura bajo esfuerzo cíclico <resistencia estática. Causa: propagación lenta de grietas. Metales: crítico."},
    {question: "¿Qué es la creep o fluencia?", options: ["Fractura rápida", "Deformación lenta bajo esfuerzo constante a alta T", "Cambio de fase", "Oxidación"], correct: 1, explanation: "Creep = deformación permanente lenta a T elevada. Crítico en turbinas, reactores nucleares. Polímeros: a T ambiente."},
    {question: "¿Cuál es la relación entre temperatura y propiedades?", options: ["No existe relación", "Temperatura afecta todas las propiedades", "Solo afecta color", "Solo afecta densidad"], correct: 1, explanation: "T aumenta: movimiento atómico ↑, rigidez ↓, ductilidad ↑, resistencia ↓. Crítico en diseño de componentes."},
    {question: "¿Qué es el coeficiente de expansión térmica?", options: ["Cambio de color", "Cambio de tamaño por cambio de temperatura", "Conductividad térmica", "Resistencia al calor"], correct: 1, explanation: "α = ΔL/(L₀×ΔT). Metales: ~10-20×10^-6/K. Polímeros: ~50-100×10^-6/K. Cerámicos: ~5-10×10^-6/K."},
    {question: "¿Qué es el esfuerzo (stress)?", options: ["Deformación", "Fuerza aplicada por unidad de área", "Cambio de forma", "Energía interna"], correct: 1, explanation: "σ = F/A. Unidades: Pa, MPa, GPa. Esfuerzo de tensión, compresión, corte."},
    {question: "¿Qué es la deformación (strain)?", options: ["Esfuerzo", "Cambio relativo de dimensión", "Fuerza aplicada", "Energía"], correct: 1, explanation: "ε = ΔL/L₀. Adimensional. Deformación de tensión, compresión, corte."},
    {question: "¿Cuál es la ley de Hooke?", options: ["Esfuerzo = densidad", "Esfuerzo = E × deformación (elástico)", "Deformación = temperatura", "No existe ley"], correct: 1, explanation: "σ = E×ε. Válida en región elástica. Límite elástico = máximo esfuerzo antes de deformación plástica."},
    {question: "¿Qué es el límite elástico?", options: ["Máxima deformación", "Máximo esfuerzo sin deformación permanente", "Punto de fractura", "Inicio de fusión"], correct: 1, explanation: "Límite elástico = esfuerzo donde comienza deformación plástica. Superarlo = dislocaciones se mueven permanentemente."},
    {question: "¿Qué es el punto de fluencia?", options: ["Inicio de fusión", "Esfuerzo donde comienza deformación plástica significativa", "Máxima resistencia", "Fractura"], correct: 1, explanation: "Punto de fluencia = transición elástico-plástico. En metales: bien definido. En polímeros: gradual."},
    {question: "¿Cuál es la diferencia entre resistencia de fluencia y resistencia a tensión?", options: ["No hay diferencia", "Fluencia: inicio plástico, Tensión: máximo antes de fractura", "Tensión es más baja", "Solo en polímeros"], correct: 1, explanation: "Fy = esfuerzo de fluencia. Fu = máximo esfuerzo. Fu > Fy siempre. Diferencia = endurecimiento por deformación."},
    {question: "¿Qué es el endurecimiento por deformación?", options: ["Fractura", "Aumento de resistencia por deformación plástica", "Cambio de fase", "Oxidación"], correct: 1, explanation: "Deformación plástica = dislocaciones se multiplican y bloquean. Resultado: material se endurece. Usado en forja, trefilado."},
    {question: "¿Qué es el recocido?", options: ["Enfriamiento rápido", "Calentamiento y enfriamiento lento para ablandar", "Tratamiento a baja T", "Oxidación controlada"], correct: 1, explanation: "Recocido = calentar a T alta, enfriar lentamente. Elimina dislocaciones, reduce dureza, aumenta ductilidad."},
    {question: "¿Qué es el temple?", options: ["Calentamiento lento", "Enfriamiento rápido desde T alta", "Recocido", "Oxidación"], correct: 1, explanation: "Temple = enfriamiento rápido. Congela estructura de alta T. Aumenta dureza, reduce ductilidad. Aceros: crítico."},
    {question: "¿Qué es el revenido?", options: ["Enfriamiento rápido", "Calentamiento moderado después de temple", "Recocido completo", "Oxidación"], correct: 1, explanation: "Revenido = calentar templado a T moderada. Reduce fragilidad del temple, equilibra dureza-ductilidad."},
    {question: "¿Cuál es la diferencia entre cristalización y solidificación?", options: ["No hay diferencia", "Solidificación: transición L→S, Cristalización: formación de estructura ordenada", "Solo en polímeros", "Solo en metales"], correct: 1, explanation: "Solidificación = cambio de fase L→S. Cristalización = formación de estructura cristalina ordenada. Pueden ocurrir juntas."},
    {question: "¿Qué es la nucleación?", options: ["Fusión", "Inicio de formación de nuevas fases", "Crecimiento de cristales", "Cambio de color"], correct: 1, explanation: "Nucleación = formación de pequeños cristales (núcleos). Requiere energía de activación. Homogénea vs heterogénea."},
    {question: "¿Qué es el crecimiento de cristales?", options: ["Nucleación", "Expansión de núcleos existentes", "Fusión", "Oxidación"], correct: 1, explanation: "Crecimiento = átomos se adhieren a núcleos. Velocidad depende de T, composición, agitación. Tamaño de grano resultante."},
    {question: "¿Qué es el tamaño de grano?", options: ["Densidad", "Tamaño promedio de cristales individuales", "Dureza", "Conductividad"], correct: 1, explanation: "Grano = cristal individual. Tamaño ↓ = dureza ↑, ductilidad ↓ (Hall-Petch). Frontera de grano = defecto."},
    {question: "¿Cuál es la relación entre tamaño de grano y propiedades?", options: ["No existe relación", "Grano fino = más duro, menos dúctil", "Grano grande = mejor", "Solo afecta color"], correct: 1, explanation: "Grano fino: más fronteras = más obstáculos a dislocaciones = dureza ↑. Pero ductilidad ↓ (menos movimiento)."},
    {question: "¿Qué es una fase en materiales?", options: ["Etapa de procesamiento", "Región con estructura y composición uniformes", "Cambio de temperatura", "Oxidación"], correct: 1, explanation: "Fase = región homogénea. Ejemplo: acero = ferrita (α) + cementita (Fe₃C). Diagrama de fases: composición vs T."},
    {question: "¿Qué es un diagrama de fases?", options: ["Gráfico de temperatura", "Mapa de fases estables vs composición y temperatura", "Curva de enfriamiento", "Tabla de propiedades"], correct: 1, explanation: "Diagrama de fases = T vs composición. Muestra regiones de estabilidad de fases. Ejemplo: Fe-C para aceros."},
    {question: "¿Qué es la solubilidad sólida?", options: ["Capacidad de disolver en agua", "Capacidad de un elemento disolver otro en estado sólido", "Fusión", "Oxidación"], correct: 1, explanation: "Solubilidad sólida = máximo % de soluto en solvente sólido. Limitada por tamaño atómico, electronegatividad. Ejemplo: C en Fe."},
    {question: "¿Qué es una solución sólida?", options: ["Mezcla física", "Aleación donde un elemento disuelve otro", "Compuesto químico", "Mezcla de gases"], correct: 1, explanation: "Solución sólida = aleación homogénea de una fase. Ejemplo: latón (Cu+Zn). Propiedades intermedias a componentes."},
    {question: "¿Qué es un compuesto intermetálico?", options: ["Metal puro", "Compuesto químico de dos o más metales", "Aleación física", "Cerámico"], correct: 1, explanation: "Intermetálico = compuesto definido (ej: Fe₃Al). Estructura ordenada. Propiedades únicas, a menudo frágil."},
    {question: "¿Cuál es la diferencia entre una aleación y un compuesto?", options: ["No hay diferencia", "Aleación: mezcla física, Compuesto: unión química", "Aleación es más fuerte", "Solo en metales"], correct: 1, explanation: "Aleación = mezcla de metales (solución sólida). Compuesto = unión química con estequiometría fija. Propiedades diferentes."},
    {question: "¿Qué es el carburo de tungsteno?", options: ["Aleación", "Compuesto cerámico WC", "Polímero", "Semiconductor"], correct: 1, explanation: "WC = cerámico duro (dureza ~9 Mohs). Usado en herramientas de corte. Baja tenacidad pero excelente dureza."},
    {question: "¿Qué es la sinterización?", options: ["Fusión", "Compactación de polvos a T elevada sin fusión", "Oxidación", "Cristalización"], correct: 1, explanation: "Sinterización = calentar polvo compactado a T<Tm. Difusión atómica une partículas. Usado en cerámicos, polvos metálicos."},
    {question: "¿Cuál es la ventaja de la sinterización?", options: ["Bajo costo", "Permite formas complejas, menos desperdicio, propiedades controladas", "Mayor resistencia", "Mejor conductividad"], correct: 1, explanation: "Sinterización = flexible en forma, composición controlada, menos maquinado. Ideal para cerámicos, carburos, polvos."},
    {question: "¿Qué es la densificación en sinterización?", options: ["Aumento de temperatura", "Reducción de porosidad por difusión atómica", "Cambio de fase", "Oxidación"], correct: 1, explanation: "Densificación = poros desaparecen, densidad ↑. Resultado: material más fuerte, menos permeable."},
    {question: "¿Qué es el moldeo por inyección?", options: ["Fundición", "Inyección de polímero fundido en molde", "Extrusión", "Compresión"], correct: 1, explanation: "Moldeo por inyección = polímero fundido → molde → enfriamiento → pieza. Rápido, preciso, económico para producción masiva."},
    {question: "¿Qué es la extrusión?", options: ["Moldeo", "Forzar material a través de matriz", "Inyección", "Compresión"], correct: 1, explanation: "Extrusión = material fundido/plástico forzado por matriz. Produce perfiles, tubos, láminas. Continuo, económico."},
    {question: "¿Qué es la laminación?", options: ["Moldeo", "Pasar material entre rodillos para reducir espesor", "Extrusión", "Forja"], correct: 1, explanation: "Laminación = rodillos reducen espesor, crean textura. Produce láminas, placas. Alinea granos = anisotropía."},
    {question: "¿Qué es la forja?", options: ["Fundición", "Deformación plástica controlada con golpes/presión", "Moldeo", "Extrusión"], correct: 1, explanation: "Forja = golpes/presión deforman metal caliente. Refina grano, mejora propiedades. Usado en herramientas, piezas críticas."},
    {question: "¿Cuál es la diferencia entre forja en caliente y en frío?", options: ["No hay diferencia", "Caliente: T>Tm, Frío: T ambiente", "Caliente: T>recristalización, Frío: T ambiente", "Solo en acero"], correct: 2, explanation: "Forja caliente: T alta, baja resistencia, evita endurecimiento. Forja fría: T ambiente, endurece, requiere más fuerza."},
    {question: "¿Qué es la fundición?", options: ["Forja", "Vertido de metal fundido en molde", "Extrusión", "Laminación"], correct: 1, explanation: "Fundición = metal fundido → molde → solidificación → pieza. Permite formas complejas, pero grano grueso, porosidad."},
    {question: "¿Cuál es la diferencia entre fundición de arena y molde permanente?", options: ["No hay diferencia", "Arena: molde desechable, Permanente: molde reutilizable", "Arena es más fuerte", "Solo en acero"], correct: 1, explanation: "Arena: molde de arena, económico, formas complejas. Permanente: molde metálico, mejor acabado, más caro."},
    {question: "¿Qué es la soldadura?", options: ["Unión mecánica", "Unión metalúrgica de dos piezas", "Pegamento", "Remachado"], correct: 1, explanation: "Soldadura = fusión de dos metales, crean unión. Tipos: arco, TIG, MIG. Requiere control de microestructura."},
    {question: "¿Qué es la difusión atómica?", options: ["Movimiento aleatorio", "Movimiento de átomos de alta a baja concentración", "Cambio de fase", "Oxidación"], correct: 1, explanation: "Difusión = movimiento atómico aleatorio. Neto: alta C → baja C. Velocidad ∝ T. Crítica en sinterización, tratamiento térmico."},
    {question: "¿Cuál es la ley de Fick?", options: ["Esfuerzo = densidad", "Flujo de difusión ∝ gradiente de concentración", "Ley de fases", "Ley de Hooke"], correct: 1, explanation: "J = -D×(dC/dx). Flujo = coeficiente difusión × gradiente. Base de fenómenos de difusión en materiales."},
    {question: "¿Qué es la energía de activación?", options: ["Energía térmica", "Energía mínima para iniciar un proceso", "Energía de fusión", "Energía de enlace"], correct: 1, explanation: "Ea = energía para romper enlace, permitir movimiento. Mayor Ea = proceso más lento. Aumenta exponencialmente con T."},
    {question: "¿Cuál es la relación entre temperatura y velocidad de difusión?", options: ["No existe relación", "T ↑ → difusión ↑ exponencialmente", "T ↑ → difusión ↓", "Solo en polímeros"], correct: 1, explanation: "Difusión ∝ exp(-Ea/kT). Pequeño aumento T = gran aumento difusión. Crítico en procesamiento a alta T."},
    {question: "¿Qué es la recristalización?", options: ["Solidificación", "Formación de nuevos granos sin cambio de fase", "Cambio de fase", "Oxidación"], correct: 1, explanation: "Recristalización = nuevos granos nuclean y crecen, reemplazan granos deformados. Ocurre a T > 0.4Tm. Elimina endurecimiento."},
    {question: "¿Cuál es la temperatura de recristalización?", options: ["Punto de fusión", "~0.4 Tm (temperatura absoluta)", "Temperatura ambiente", "Temperatura de Debye"], correct: 1, explanation: "Trec ≈ 0.4 Tm (K). Acero: ~400°C. Aluminio: ~150°C. Depende de pureza, deformación previa."},
    {question: "¿Qué es el crecimiento anormal de grano?", options: ["Nucleación", "Algunos granos crecen mucho más que otros", "Recristalización", "Solidificación"], correct: 1, explanation: "Crecimiento anormal = granos grandes consumen pequeños. Resultado: microestructura heterogénea, propiedades variables."},
    {question: "¿Qué es la textura cristalográfica?", options: ["Rugosidad superficial", "Orientación preferente de granos", "Tamaño de grano", "Porosidad"], correct: 1, explanation: "Textura = granos orientados preferencialmente (ej: laminación). Resultado: anisotropía de propiedades."},
    {question: "¿Cuál es la diferencia entre defecto puntual y lineal?", options: ["No hay diferencia", "Puntual: vacancia/intersticio, Lineal: dislocación", "Lineal es más pequeño", "Solo en metales"], correct: 1, explanation: "Puntual: afecta 1 sitio atómico. Lineal (dislocación): afecta línea de átomos. Lineal = más importante en deformación."},
    {question: "¿Qué es una vacancia?", options: ["Intersticio", "Sitio atómico vacío en la red", "Dislocación", "Frontera de grano"], correct: 1, explanation: "Vacancia = átomo falta en su sitio. Defecto puntual. Facilita difusión. Concentración ↑ con T."},
    {question: "¿Qué es un intersticio?", options: ["Vacancia", "Átomo en posición no equilibrio entre sitios", "Dislocación", "Frontera de grano"], correct: 1, explanation: "Intersticio = átomo en posición entre sitios normales. Defecto puntual. Causa distorsión local de red."},
    {question: "¿Qué es una frontera de grano?", options: ["Superficie del material", "Interfase entre dos granos con orientaciones diferentes", "Defecto puntual", "Dislocación"], correct: 1, explanation: "Frontera de grano = interfase entre granos. Defecto planar. Obstaculiza dislocaciones (Hall-Petch)."},
    {question: "¿Qué es una macla?", options: ["Defecto puntual", "Región con estructura espejo de grano adyacente", "Dislocación", "Vacancia"], correct: 1, explanation: "Macla = región con estructura reflejada. Defecto planar. Ocurre en deformación, recocido. Afecta propiedades."},
    {question: "¿Qué es un precipitado?", options: ["Fase líquida", "Fase sólida que forma dentro de matriz", "Defecto puntual", "Vacancia"], correct: 1, explanation: "Precipitado = partícula de nueva fase dentro de matriz. Endurece por obstaculizar dislocaciones (endurecimiento por precipitación)."},
    {question: "¿Cuál es la diferencia entre endurecimiento por solución sólida y por precipitación?", options: ["No hay diferencia", "Solución: átomos disueltos, Precipitación: partículas de nueva fase", "Solución es más fuerte", "Solo en acero"], correct: 1, explanation: "Solución sólida: átomos disueltos distorsionan red. Precipitación: partículas duras obstaculizan dislocaciones. Precipitación > fuerte."},
    {question: "¿Qué es el envejecimiento en aleaciones?", options: ["Oxidación", "Cambio de propiedades con tiempo a T ambiente o moderada", "Corrosión", "Fatiga"], correct: 1, explanation: "Envejecimiento = precipitación lenta a T baja. Ejemplo: Al-Cu endurecido por envejecimiento. Aumenta dureza con tiempo."},
    {question: "¿Qué es la acritud?", options: ["Fragilidad", "Endurecimiento por deformación en frío", "Ductilidad", "Elasticidad"], correct: 1, explanation: "Acritud = dureza ganada por deformación plástica. Dislocaciones se multiplican y bloquean. Reversible por recocido."},
    {question: "¿Cuál es la diferencia entre material dúctil y frágil?", options: ["No hay diferencia", "Dúctil: deformación plástica antes de fractura, Frágil: fractura sin deformación", "Frágil es más fuerte", "Solo en metales"], correct: 1, explanation: "Dúctil: aviso antes de falla (deformación). Frágil: falla repentina sin aviso. Cerámicos: frágiles. Metales: dúctiles."},
    {question: "¿Qué es la transición dúctil-frágil?", options: ["Cambio de fase", "Cambio de comportamiento con T", "Cambio de composición", "Oxidación"], correct: 1, explanation: "T baja → frágil. T alta → dúctil. Temperatura de transición = donde cambia comportamiento. Aceros: crítico en bajas T."},
    {question: "¿Qué es la tenacidad a la fractura (Kic)?", options: ["Dureza", "Resistencia a propagación de grieta", "Ductilidad", "Elasticidad"], correct: 1, explanation: "Kic = resistencia a fractura en presencia de grieta. Unidades: MPa√m. Metales: altos. Cerámicos: bajos. Compuestos: intermedios."},
    {question: "¿Qué es la mecánica de fractura?", options: ["Estudio de fracturas", "Estudio de propagación de grietas y falla", "Estudio de deformación", "Estudio de difusión"], correct: 1, explanation: "Mecánica de fractura = análisis de grietas, propagación, Kic. Predice falla. Crítica en diseño de estructuras."},
    {question: "¿Qué es una grieta crítica?", options: ["Grieta pequeña", "Tamaño mínimo de grieta que propaga", "Grieta superficial", "Grieta interna"], correct: 1, explanation: "Grieta crítica = tamaño donde K ≥ Kic. Propaga sin aumento de carga. Depende de material, esfuerzo, geometría."},
    {question: "¿Cuál es la relación entre tamaño de grieta y resistencia?", options: ["No existe relación", "Grieta grande → resistencia baja", "Grieta grande → resistencia alta", "Solo en cerámicos"], correct: 1, explanation: "Resistencia ∝ 1/√(tamaño grieta). Grieta pequeña = resistencia alta. Grieta grande = resistencia baja. Crítico en diseño."}
];

// ===== FLASHCARDS (70+ CONCEPTOS) =====
const flashcardsData = [
    {front: "¿Qué es la alotropía?", back: "Capacidad de un elemento puro para existir en múltiples formas cristalinas bajo diferentes condiciones de T y P."},
    {front: "¿Qué es el polimorfismo?", back: "Capacidad de un compuesto para cristalizar en diferentes estructuras cristalinas con la misma composición química."},
    {front: "¿Qué es la isotropía?", back: "Propiedad de un material cuyas propiedades son iguales en todas las direcciones."},
    {front: "¿Qué es la anisotropía?", back: "Propiedad de un material cuyas propiedades varían según la dirección cristalográfica."},
    {front: "¿Qué es un monómero?", back: "Unidad molecular pequeña que se repite para formar un polímero."},
    {front: "¿Qué es un polímero?", back: "Macromolécula formada por repetición de monómeros unidos por enlaces covalentes."},
    {front: "¿Qué es la cristalinidad?", back: "Grado de orden molecular en un polímero. Mayor cristalinidad = mayor rigidez pero menor ductilidad."},
    {front: "¿Qué es la Tg (Temperatura de Transición Vítrea)?", back: "Temperatura donde un polímero pasa de estado vítreo (rígido) a gomoso (flexible), sin fundirse."},
    {front: "¿Qué es un cerámico?", back: "Material inorgánico no metálico formado por combinación de elementos metálicos y no metálicos, con enlaces iónico-covalentes."},
    {front: "¿Qué es un refractario?", back: "Cerámico diseñado para resistir temperaturas extremadamente altas (>1500°C) sin perder propiedades."},
    {front: "¿Qué es un material compuesto?", back: "Material formado por combinación de dos o más fases: refuerzo + matriz."},
    {front: "¿Qué es la interfase en compuestos?", back: "Frontera crítica entre refuerzo y matriz donde se transfiere carga."},
    {front: "¿Qué es la tenacidad?", back: "Capacidad de un material para absorber energía antes de fracturar."},
    {front: "¿Qué es la ductilidad?", back: "Capacidad de un material para deformarse plásticamente sin romper."},
    {front: "¿Qué es la fragilidad?", back: "Tendencia de un material a fracturar sin deformación plástica previa."},
    {front: "¿Qué es la dureza?", back: "Resistencia de un material a la penetración, rayado o deformación superficial."},
    {front: "¿Qué es el esfuerzo (stress)?", back: "Fuerza aplicada por unidad de área. Unidades: Pa, MPa, GPa."},
    {front: "¿Qué es la deformación (strain)?", back: "Cambio relativo de dimensión. Adimensional: ε = ΔL/L₀."},
    {front: "¿Qué es el módulo de Young (E)?", back: "Medida de rigidez. E = esfuerzo/deformación elástica."},
    {front: "¿Qué es la resistencia a tensión?", back: "Máximo esfuerzo que soporta un material antes de fracturar."},
    {front: "¿Qué es el límite elástico?", back: "Máximo esfuerzo sin deformación permanente. Superarlo = comienza deformación plástica."},
    {front: "¿Qué es el punto de fluencia?", back: "Esfuerzo donde comienza deformación plástica significativa."},
    {front: "¿Qué es la ley de Hooke?", back: "σ = E×ε. Válida en región elástica. Relación lineal entre esfuerzo y deformación."},
    {front: "¿Qué es el endurecimiento por deformación?", back: "Aumento de resistencia por deformación plástica. Dislocaciones se multiplican y bloquean."},
    {front: "¿Qué es el recocido?", back: "Calentamiento y enfriamiento lento para ablandar. Elimina dislocaciones, reduce dureza, aumenta ductilidad."},
    {front: "¿Qué es el temple?", back: "Enfriamiento rápido desde temperatura alta. Aumenta dureza, reduce ductilidad."},
    {front: "¿Qué es el revenido?", back: "Calentamiento moderado después de temple. Reduce fragilidad, equilibra dureza-ductilidad."},
    {front: "¿Qué es la conducción térmica?", back: "Transferencia de calor a través de un material. κ = calor/(tiempo×área×ΔT)."},
    {front: "¿Qué es la conducción eléctrica?", back: "Capacidad de un material para conducir corriente eléctrica. σ = corriente/(voltaje×área)."},
    {front: "¿Qué es un conductor?", back: "Material con brecha de energía ~0 y muchos portadores libres. Ejemplo: cobre, aluminio."},
    {front: "¿Qué es un semiconductor?", back: "Material con brecha de energía 1-3 eV. Portadores por dopaje. Ejemplo: silicio, germanio."},
    {front: "¿Qué es un aislante?", back: "Material con brecha de energía >5 eV. Sin portadores libres. Ejemplo: vidrio, cerámica."},
    {front: "¿Qué es el dopaje tipo N?", back: "Agregar átomos donantes (P, As en Si). Electrones libres = portadores mayoritarios."},
    {front: "¿Qué es el dopaje tipo P?", back: "Agregar átomos aceptores (B, Ga en Si). Huecos = portadores mayoritarios."},
    {front: "¿Qué es una unión P-N?", back: "Interfase entre dopaje P y N. Crea región de agotamiento y potencial de barrera. Base de diodos."},
    {front: "¿Qué es un diodo?", back: "Dispositivo semiconductor que permite flujo de corriente en una dirección (polarización directa)."},
    {front: "¿Qué es un transistor BJT?", back: "Transistor bipolar con tres terminales: base, colector, emisor. Amplificador de corriente."},
    {front: "¿Qué es un transistor FET?", back: "Transistor de efecto de campo. Controlado por voltaje, no corriente. Menor consumo."},
    {front: "¿Qué es la densidad?", back: "Masa por unidad de volumen. ρ = m/V. Unidades: g/cm³, kg/m³."},
    {front: "¿Qué es la porosidad?", back: "Fracción de volumen de poros en un material. Afecta densidad, resistencia, permeabilidad."},
    {front: "¿Qué es la nucleación?", back: "Inicio de formación de nuevas fases. Requiere energía de activación. Homogénea vs heterogénea."},
    {front: "¿Qué es el crecimiento de cristales?", back: "Expansión de núcleos existentes. Velocidad depende de T, composición, agitación."},
    {front: "¿Qué es el tamaño de grano?", back: "Tamaño promedio de cristales individuales. Grano fino = más duro, menos dúctil."},
    {front: "¿Qué es una dislocación?", back: "Defecto lineal en la estructura cristalina. Movimiento = deformación plástica."},
    {front: "¿Qué es una vacancia?", back: "Sitio atómico vacío en la red. Defecto puntual. Facilita difusión."},
    {front: "¿Qué es un intersticio?", back: "Átomo en posición entre sitios normales. Defecto puntual. Causa distorsión local."},
    {front: "¿Qué es una frontera de grano?", back: "Interfase entre dos granos con orientaciones diferentes. Defecto planar. Obstaculiza dislocaciones."},
    {front: "¿Qué es una macla?", back: "Región con estructura espejo de grano adyacente. Defecto planar. Afecta propiedades."},
    {front: "¿Qué es un precipitado?", back: "Fase sólida que forma dentro de matriz. Endurece por obstaculizar dislocaciones."},
    {front: "¿Qué es la difusión?", back: "Movimiento de átomos de alta a baja concentración. Velocidad ∝ T."},
    {front: "¿Qué es la ley de Fick?", back: "J = -D×(dC/dx). Flujo de difusión proporcional al gradiente de concentración."},
    {front: "¿Qué es la energía de activación?", back: "Energía mínima para iniciar un proceso. Mayor Ea = proceso más lento."},
    {front: "¿Qué es la recristalización?", back: "Formación de nuevos granos sin cambio de fase. Ocurre a T > 0.4Tm."},
    {front: "¿Qué es la sinterización?", back: "Compactación de polvos a T elevada sin fusión. Difusión atómica une partículas."},
    {front: "¿Qué es el moldeo por inyección?", back: "Inyección de polímero fundido en molde. Rápido, preciso, económico para producción masiva."},
    {front: "¿Qué es la extrusión?", back: "Forzar material a través de matriz. Produce perfiles, tubos, láminas. Continuo, económico."},
    {front: "¿Qué es la laminación?", back: "Pasar material entre rodillos. Reduce espesor, crea textura, alinea granos."},
    {front: "¿Qué es la forja?", back: "Deformación plástica controlada con golpes/presión. Refina grano, mejora propiedades."},
    {front: "¿Qué es la fundición?", back: "Vertido de metal fundido en molde. Permite formas complejas, pero grano grueso."},
    {front: "¿Qué es la soldadura?", back: "Unión metalúrgica de dos piezas. Requiere control de microestructura."},
    {front: "¿Qué es la corrosión?", back: "Reacción química de material con ambiente. Pérdida de material, cambio de propiedades."},
    {front: "¿Qué es el desgaste?", back: "Pérdida de material por fricción y abrasión. Depende de dureza, rugosidad, lubricación."},
    {front: "¿Qué es la fatiga?", back: "Fractura por esfuerzo cíclico repetido. Causa: propagación lenta de grietas."},
    {front: "¿Qué es la creep o fluencia?", back: "Deformación lenta bajo esfuerzo constante a alta T. Crítico en turbinas, reactores."},
    {front: "¿Qué es la tenacidad a la fractura (Kic)?", back: "Resistencia a propagación de grieta. Unidades: MPa√m. Metales: altos, Cerámicos: bajos."},
    {front: "¿Qué es la mecánica de fractura?", back: "Estudio de propagación de grietas y falla. Predice falla en presencia de defectos."},
    {front: "¿Qué es la matriz de Ashby?", back: "Gráfico log-log de propiedades vs densidad. Herramienta para selección de materiales."},
    {front: "¿Qué es un índice de desempeño?", back: "Relación de propiedades que optimiza función. Ejemplo: R/ρ (resistencia/peso)."}
];

// ===== MATERIALES PARA CLASIFICADOR (35 MATERIALES) =====
const materialsClassifier = [
    {name: "Hierro", category: "Metales"},
    {name: "Cobre", category: "Metales"},
    {name: "Aluminio", category: "Metales"},
    {name: "Titanio", category: "Metales"},
    {name: "Níquel", category: "Metales"},
    {name: "Magnesio", category: "Metales"},
    {name: "Acero", category: "Metales"},
    {name: "Latón", category: "Metales"},
    {name: "Polietileno (PE)", category: "Polímeros"},
    {name: "PVC", category: "Polímeros"},
    {name: "Poliestireno (PS)", category: "Polímeros"},
    {name: "Nylon", category: "Polímeros"},
    {name: "Teflón (PTFE)", category: "Polímeros"},
    {name: "Policarbonato", category: "Polímeros"},
    {name: "Alúmina (Al₂O₃)", category: "Cerámicos"},
    {name: "Sílice (SiO₂)", category: "Cerámicos"},
    {name: "Zirconia (ZrO₂)", category: "Cerámicos"},
    {name: "Carburo de Silicio (SiC)", category: "Cerámicos"},
    {name: "Nitruro de Silicio (Si₃N₄)", category: "Cerámicos"},
    {name: "Vidrio", category: "Cerámicos"},
    {name: "Fibra de Carbono", category: "Compuestos"},
    {name: "Fibra de Vidrio", category: "Compuestos"},
    {name: "Aramida (Kevlar)", category: "Compuestos"},
    {name: "Matriz Epóxica", category: "Compuestos"},
    {name: "Silicio (Si)", category: "Semiconductores"},
    {name: "Germanio (Ge)", category: "Semiconductores"},
    {name: "Arseniuro de Galio (GaAs)", category: "Semiconductores"},
    {name: "Nitruro de Galio (GaN)", category: "Semiconductores"},
    {name: "Teluro de Cadmio (CdTe)", category: "Semiconductores"},
    {name: "Fosfuro de Indio (InP)", category: "Semiconductores"},
    {name: "Óxido de Zinc (ZnO)", category: "Semiconductores"},
    {name: "Óxido de Estaño (SnO₂)", category: "Semiconductores"},
    {name: "ITO (Óxido Indio-Estaño)", category: "Semiconductores"},
    {name: "Bronce", category: "Metales"},
    {name: "Carburo de Tungsteno (WC)", category: "Cerámicos"}
];

// ===== MATERIALES PARA COMPARADOR (25+ MATERIALES) =====
const materialsComparator = [
    {name: "Acero", E: 200, σ: 400, ρ: 7850, κ: 50, α: 12, Tm: 1500},
    {name: "Aluminio", E: 70, σ: 300, ρ: 2700, κ: 237, α: 23, Tm: 933},
    {name: "Cobre", E: 110, σ: 220, ρ: 8960, κ: 385, α: 17, Tm: 1358},
    {name: "Titanio", E: 103, σ: 880, ρ: 4500, κ: 22, α: 8.6, Tm: 1941},
    {name: "Polietileno (PE)", E: 1, σ: 30, ρ: 920, κ: 0.5, α: 80, Tm: 408},
    {name: "PVC", E: 3, σ: 50, ρ: 1380, κ: 0.16, α: 70, Tm: 523},
    {name: "Poliestireno (PS)", E: 3.5, σ: 60, ρ: 1050, κ: 0.13, α: 70, Tm: 513},
    {name: "Nylon", E: 5, σ: 80, ρ: 1140, κ: 0.25, α: 80, Tm: 533},
    {name: "Alúmina (Al₂O₃)", E: 380, σ: 300, ρ: 3960, κ: 30, α: 8, Tm: 2327},
    {name: "Zirconia (ZrO₂)", E: 200, σ: 1200, ρ: 6000, κ: 2, α: 10, Tm: 2973},
    {name: "Carburo de Silicio", E: 410, σ: 3500, ρ: 3210, κ: 120, α: 4.3, Tm: 2700},
    {name: "Fibra de Carbono", E: 230, σ: 3500, ρ: 1600, κ: 150, α: -0.5, Tm: 3650},
    {name: "Fibra de Vidrio", E: 85, σ: 2400, ρ: 2600, κ: 1.4, α: 5, Tm: 1973},
    {name: "Silicio (Si)", E: 130, σ: 100, ρ: 2330, κ: 150, α: 2.6, Tm: 1687},
    {name: "Germanio (Ge)", E: 103, σ: 80, ρ: 5323, κ: 60, α: 5.75, Tm: 1211},
    {name: "GaAs", E: 85, σ: 90, ρ: 5316, κ: 55, α: 5.73, Tm: 1511},
    {name: "Vidrio", E: 70, σ: 100, ρ: 2500, κ: 1, α: 9, Tm: 1973},
    {name: "Magnesio", E: 45, σ: 280, ρ: 1738, κ: 156, α: 26, Tm: 923},
    {name: "Níquel", E: 200, σ: 400, ρ: 8908, κ: 91, α: 13, Tm: 1728},
    {name: "Teflón (PTFE)", E: 0.5, σ: 25, ρ: 2150, κ: 0.25, α: 100, Tm: 600},
    {name: "Policarbonato", E: 2.3, σ: 65, ρ: 1200, κ: 0.2, α: 65, Tm: 563},
    {name: "Aramida (Kevlar)", E: 130, σ: 3600, ρ: 1450, κ: 0.04, α: -2, Tm: 560},
    {name: "Nitruro de Silicio", E: 310, σ: 1000, ρ: 3200, κ: 30, α: 3, Tm: 2173},
    {name: "Óxido de Zinc (ZnO)", E: 140, σ: 200, ρ: 5610, κ: 25, α: 6, Tm: 1975},
    {name: "Latón (Cu-Zn)", E: 100, σ: 350, ρ: 8500, κ: 120, α: 20, Tm: 1200}
];

// ===== EJEMPLOS SIMULADOR PSPD (14 EJEMPLOS) =====
const pspdExamples = [
    {name: "Acero al Carbono (Tratamiento Térmico)", process: "Temple y revenido", structure: "Ferrita + Cementita (Fe₃C) con tamaño de grano controlado", properties: "Dureza 50-60 HRC, Resistencia 1000-1500 MPa", performance: "Herramientas de corte, matrices, componentes estructurales"},
    {name: "Polietileno (Cristalinidad)", process: "Enfriamiento controlado durante moldeo", structure: "Zonas cristalinas + amorfas. Mayor cristalinidad = mayor rigidez", properties: "Rigidez E=0.5-2 GPa, Ductilidad variable", performance: "Películas, tuberías, contenedores"},
    {name: "Alúmina (Sinterización)", process: "Compactación de polvo + sinterización a 1600°C", structure: "Granos de Al₂O₃ unidos por difusión, porosidad controlada", properties: "Dureza 9 Mohs, Resistencia 300-500 MPa", performance: "Refractarios, herramientas de corte, aislantes"},
    {name: "Fibra de Carbono (Orientación)", process: "Alineación de fibras en matriz epóxica", structure: "Fibras paralelas en dirección de carga", properties: "Resistencia 3500 MPa (paralelo), 50 MPa (perpendicular)", performance: "Alas de avión, palas de turbina, estructuras ligeras"},
    {name: "Silicio Dopado (Dopaje tipo N)", process: "Dopaje con fósforo, crecimiento epitaxial", structure: "Red de Si con átomos de P sustitucionales, electrones libres", properties: "Conductividad σ~10^-3 S/m, Brecha Eg=1.1 eV", performance: "Diodos, transistores, celdas solares"},
    {name: "Titanio (Forja en Caliente)", process: "Deformación plástica a 900-1000°C", structure: "Grano fino, dislocaciones controladas", properties: "Resistencia 880 MPa, Ductilidad 15-20%", performance: "Componentes aeroespaciales, implantes médicos"},
    {name: "Nylon 6 (Inyección)", process: "Moldeo por inyección a 250-300°C", structure: "Cadenas parcialmente cristalinas, orientación en flujo", properties: "Rigidez E=5-10 GPa, Resistencia 80-120 MPa", performance: "Engranajes, rodamientos, componentes automotrices"},
    {name: "Vidrio (Temple Térmico)", process: "Calentamiento a 600°C + enfriamiento rápido", structure: "Red amorfa de SiO₂ con tensiones compresivas superficiales", properties: "Dureza 5.5 Mohs, Resistencia a compresión 1000 MPa", performance: "Ventanas de seguridad, pantallas, botellas"},
    {name: "Compuesto de Matriz Epóxica (Orientación)", process: "Laminación con fibras a 0°, 90°, 45°", structure: "Capas cruzadas, distribución de carga multidireccional", properties: "Resistencia 1000-2000 MPa, Rigidez E=50-150 GPa", performance: "Fuselajes de aviones, carrocerías de autos, estructuras"},
    {name: "Germanio (Purificación y Dopaje)", process: "Crecimiento Czochralski + dopaje tipo P", structure: "Red de Ge con átomos de Ga, huecos como portadores", properties: "Conductividad σ~10^-2 S/m, Brecha Eg=0.67 eV", performance: "Detectores IR, transistores de alta frecuencia"},
    {name: "Cobre (Recocido y Endurecimiento)", process: "Deformación en frío + recocido a 400°C", structure: "Grano fino, dislocaciones aniquiladas", properties: "Conductividad σ~5.96×10^7 S/m, Ductilidad 40-50%", performance: "Cables eléctricos, tuberías, componentes electrónicos"},
    {name: "PVC (Plastificación)", process: "Adición de plastificantes (DOP) + moldeo", structure: "Cadenas con plastificantes intercalados, reduce Tg", properties: "Flexibilidad controlada, Resistencia 50-80 MPa", performance: "Tuberías, recubrimientos, películas flexibles"},
    {name: "Zirconia (Estabilización con Itria)", process: "Adición de Y₂O₃ + sinterización", structure: "Fase cúbica estabilizada a temperatura ambiente", properties: "Tenacidad 10-15 MPa√m, Resistencia 1200 MPa", performance: "Implantes dentales, cojinetes, componentes de turbinas"},
    {name: "Arseniuro de Galio (Crecimiento Epitaxial)", process: "Crecimiento epitaxial por MOCVD", structure: "Red de GaAs con dopaje tipo N o P, heterouniones", properties: "Brecha Eg=1.42 eV, Movilidad de electrones alta", performance: "Diodos láser, LEDs de alta eficiencia, celdas solares"}
];

// ===== INICIALIZACIÓN =====
document.addEventListener("DOMContentLoaded", function() {
    initializeQuiz();
    initializeFlashcards();
    initializeClassifier();
    initializeComparator();
    initializeSimulator();
    setupTabButtons();
});

// ===== FUNCIONES DEL QUIZ =====
function initializeQuiz() {
    currentQuestionIndex = 0;
    quizScore = 0;
    selectedAnswers = [];
    displayQuestion();
}

function displayQuestion() {
    if (currentQuestionIndex >= quizQuestions.length) {
        showResults();
        return;
    }

    const question = quizQuestions[currentQuestionIndex];
    document.getElementById("questionText").textContent = `${currentQuestionIndex + 1}. ${question.question}`;
    
    const optionsContainer = document.getElementById("optionsContainer");
    optionsContainer.innerHTML = "";
    
    question.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.textContent = option;
        btn.onclick = () => selectAnswer(index, option);
        optionsContainer.appendChild(btn);
    });

    updateProgress();
}

function selectAnswer(index, option) {
    const question = quizQuestions[currentQuestionIndex];
    const isCorrect = index === question.correct;
    
    selectedAnswers[currentQuestionIndex] = {selected: option, correct: isCorrect};
    
    if (isCorrect) {
        quizScore++;
    }

    showFeedback(isCorrect, question.explanation);
    disableOptions();
}

function showFeedback(isCorrect, explanation) {
    const feedbackContainer = document.getElementById("feedbackContainer");
    feedbackContainer.className = "feedback-container show " + (isCorrect ? "correct" : "incorrect");
    feedbackContainer.innerHTML = `<strong>${isCorrect ? "✓ Correcto" : "✗ Incorrecto"}</strong><p>${explanation}</p>`;
}

function disableOptions() {
    document.querySelectorAll(".option-btn").forEach(btn => btn.disabled = true);
}

function nextQuestion() {
    currentQuestionIndex++;
    displayQuestion();
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

function updateProgress() {
    const percentage = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    document.getElementById("progressFill").style.width = percentage + "%";
    document.getElementById("progressText").textContent = `Pregunta ${currentQuestionIndex + 1} de ${quizQuestions.length}`;
}

function showResults() {
    document.getElementById("quizContent").style.display = "none";
    document.getElementById("quizResults").style.display = "block";
    const percentage = (quizScore / quizQuestions.length) * 100;
    document.getElementById("finalScore").textContent = `Puntuación: ${quizScore}/${quizQuestions.length}`;
    document.getElementById("scorePercentage").textContent = `${percentage.toFixed(1)}%`;
}

function restartQuiz() {
    document.getElementById("quizContent").style.display = "block";
    document.getElementById("quizResults").style.display = "none";
    initializeQuiz();
}

// ===== FUNCIONES DE FLASHCARDS =====
function initializeFlashcards() {
    flashcards = [...flashcardsData];
    currentFlashcardIndex = 0;
    displayFlashcard();
}

function displayFlashcard() {
    if (flashcards.length === 0) return;
    const card = flashcards[currentFlashcardIndex];
    document.getElementById("cardFront").textContent = card.front;
    document.getElementById("cardBack").textContent = card.back;
    document.getElementById("cardCounter").textContent = `Tarjeta ${currentFlashcardIndex + 1} de ${flashcards.length}`;
    document.getElementById("flashcard").classList.remove("flipped");
}

function flipCard() {
    document.getElementById("flashcard").classList.toggle("flipped");
}

function nextCard() {
    currentFlashcardIndex = (currentFlashcardIndex + 1) % flashcards.length;
    displayFlashcard();
}

function previousCard() {
    currentFlashcardIndex = (currentFlashcardIndex - 1 + flashcards.length) % flashcards.length;
    displayFlashcard();
}

function shuffleCards() {
    for (let i = flashcards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [flashcards[i], flashcards[j]] = [flashcards[j], flashcards[i]];
    }
    currentFlashcardIndex = 0;
    displayFlashcard();
}

// ===== FUNCIONES DEL CLASIFICADOR =====
function initializeClassifier() {
    const container = document.getElementById("materialsContainer");
    container.innerHTML = "";
    materialsClassifier.forEach(material => {
        const div = document.createElement("div");
        div.className = "material-item";
        div.draggable = true;
        div.textContent = material.name;
        div.dataset.category = material.category;
        div.addEventListener("dragstart", dragStart);
        div.addEventListener("dragend", dragEnd);
        container.appendChild(div);
    });

    document.querySelectorAll(".drop-zone").forEach(zone => {
        zone.addEventListener("dragover", dragOver);
        zone.addEventListener("drop", drop);
        zone.addEventListener("dragleave", dragLeave);
    });
}

function dragStart(e) {
    draggedElement = e.target;
    e.target.classList.add("dragging");
}

function dragEnd(e) {
    e.target.classList.remove("dragging");
}

function dragOver(e) {
    e.preventDefault();
    e.target.closest(".drop-zone").classList.add("drag-over");
}

function dragLeave(e) {
    e.target.closest(".drop-zone").classList.remove("drag-over");
}

function drop(e) {
    e.preventDefault();
    e.target.closest(".drop-zone").classList.remove("drag-over");
    const zone = e.target.closest(".drop-zone");
    if (draggedElement) {
        zone.appendChild(draggedElement);
    }
}

function resetClassifier() {
    initializeClassifier();
    document.getElementById("classifierResult").innerHTML = "";
}

function checkClassifier() {
    let correct = 0;
    document.querySelectorAll(".drop-zone").forEach(zone => {
        const category = zone.closest(".category").dataset.category;
        zone.querySelectorAll(".material-item").forEach(item => {
            if (item.dataset.category === category) {
                correct++;
                item.style.backgroundColor = "#dcfce7";
            } else {
                item.style.backgroundColor = "#fee2e2";
            }
        });
    });
    const result = document.getElementById("classifierResult");
    result.innerHTML = `<p style="color: green; font-weight: bold;">Correctos: ${correct}/${materialsClassifier.length}</p>`;
}

// ===== FUNCIONES DEL COMPARADOR =====
function initializeComparator() {
    const select1 = document.getElementById("material1Select");
    const select2 = document.getElementById("material2Select");
    
    materialsComparator.forEach(material => {
        const option1 = document.createElement("option");
        option1.value = material.name;
        option1.textContent = material.name;
        select1.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = material.name;
        option2.textContent = material.name;
        select2.appendChild(option2);
    });
}

function updateComparison() {
    const mat1Name = document.getElementById("material1Select").value;
    const mat2Name = document.getElementById("material2Select").value;

    if (!mat1Name || !mat2Name) return;

    const mat1 = materialsComparator.find(m => m.name === mat1Name);
    const mat2 = materialsComparator.find(m => m.name === mat2Name);

    const html = `
        <table>
            <tr><th>Propiedad</th><th>${mat1.name}</th><th>${mat2.name}</th></tr>
            <tr><td>Módulo de Young (GPa)</td><td>${mat1.E}</td><td>${mat2.E}</td></tr>
            <tr><td>Resistencia (MPa)</td><td>${mat1.σ}</td><td>${mat2.σ}</td></tr>
            <tr><td>Densidad (kg/m³)</td><td>${mat1.ρ}</td><td>${mat2.ρ}</td></tr>
            <tr><td>Conductividad Térmica (W/m·K)</td><td>${mat1.κ}</td><td>${mat2.κ}</td></tr>
            <tr><td>Coef. Expansión (×10⁻⁶/K)</td><td>${mat1.α}</td><td>${mat2.α}</td></tr>
            <tr><td>Punto de Fusión (K)</td><td>${mat1.Tm}</td><td>${mat2.Tm}</td></tr>
        </table>
    `;
    document.getElementById("comparisonTable").innerHTML = html;
}

// ===== FUNCIONES DEL SIMULADOR =====
function initializeSimulator() {
    const select = document.getElementById("exampleSelect");
    pspdExamples.forEach(example => {
        const option = document.createElement("option");
        option.value = example.name;
        option.textContent = example.name;
        select.appendChild(option);
    });
}

function updateSimulator() {
    const selectedName = document.getElementById("exampleSelect").value;
    if (!selectedName) return;

    const example = pspdExamples.find(e => e.name === selectedName);
    const html = `
        <div class="pspd-diagram">
            <div class="pspd-box">
                <h4>PROCESO</h4>
                <p>${example.process}</p>
            </div>
            <div class="pspd-box">
                <h4>ESTRUCTURA</h4>
                <p>${example.structure}</p>
            </div>
            <div class="pspd-box">
                <h4>PROPIEDADES</h4>
                <p>${example.properties}</p>
            </div>
            <div class="pspd-box">
                <h4>DESEMPEÑO</h4>
                <p>${example.performance}</p>
            </div>
        </div>
    `;
    document.getElementById("simulatorContent").innerHTML = html;
}

// ===== FUNCIONES DE NAVEGACIÓN =====
function setupTabButtons() {
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            const tabName = this.dataset.tab;
            switchTab(tabName);
        });
    });
}

function switchTab(tabName) {
    document.querySelectorAll(".tab-content").forEach(tab => {
        tab.classList.remove("active");
    });
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    document.getElementById(tabName).classList.add("active");
    document.querySelector(`[data-tab="${tabName}"]`).classList.add("active");
}
