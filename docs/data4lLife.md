<h1 style="color:pink; text-align:center; font-weight:bold;">Registro de Usuarios Seguro</h1>
<h3 style="color:pink; text-align:start;">Creación de cuentas y autenticación segura</h3>


::: mermaid
flowchart TD
    classDef myNodeStyle fill:#f9f,stroke:#333,stroke-width:2px, color:#333, border-radius: 16px;
    classDef errorStyle fill:#f99,stroke:#900,stroke-width:2px, color:#333, border-radius: 16px;

    A[Inicio]:::myNodeStyle --> B[Formulario de registro]:::myNodeStyle
    B --> C[Usuario ingresa sus datos]:::myNodeStyle
    C --> D[Validar información]:::myNodeStyle
    D -->|Datos válidos| E[Encriptar contraseña con bcrypt]:::myNodeStyle
    E --> F[Almacenar datos en la base de datos]:::myNodeStyle
    D -->|Datos inválidos| G[Mostrar mensaje de error]:::errorStyle
    F --> H[Enviar correo de verificación]:::myNodeStyle
    H --> I[Verificar cuenta por correo]:::myNodeStyle
    I --> J[Cuenta creada exitosamente]:::myNodeStyle
    G --> B

    J --> K[Formulario de inicio de sesión]:::myNodeStyle
    K --> L[Usuario ingresa credenciales]:::myNodeStyle
    L --> M[Validar credenciales]:::myNodeStyle
    M -->|Credenciales válidas| N[Encriptar token JWT]:::myNodeStyle
    N --> O[Crear cookie de sesión segura]:::myNodeStyle
    O --> P[Almacenar cookie en el navegador]:::myNodeStyle
    P --> Q[Acceso concedido y usuario autenticado]:::myNodeStyle
    M -->| Credenciales inválidas | R[Mostrar mensaje de error]:::errorStyle
    R --> K

    Q --> S[Petición al servidor]:::myNodeStyle
    S --> T[Verificar validez de cookie]:::myNodeStyle
    T -->|Cookie válida| U[Desencriptar token JWT]:::myNodeStyle
    U --> V[Acceso a recursos privados]:::myNodeStyle
    T -->|Cookie inválida| W[Redirigir a inicio de sesión]:::errorStyle

    V --> X[Usuario cierra sesión]:::myNodeStyle
    X --> Y[Eliminar cookie en el navegador]:::myNodeStyle
    Y --> Z[Redirigir a inicio de sesión]:::myNodeStyle
    W --> K



:::


<h3 style="color:pink; text-align:start;">Diferenciación de tipos de usuario (paciente/médico)</h3>

::: mermaid

flowchart TD
    classDef myNodeStyle fill:#f9f,stroke:#333,stroke-width:2px, color:#333, border-radius: 16px;
    classDef errorStyle fill:#f99,stroke:#900,stroke-width:2px, color:#333, border-radius: 16px;
    A[Inicio]:::myNodeStyle --> B[Formulario de inicio de sesión]:::myNodeStyle
    B --> C[Usuario ingresa credenciales]:::myNodeStyle
    C --> D[Enviar credenciales a API]:::myNodeStyle
    D --> E[Desencriptar datos]:::myNodeStyle
    E --> F[Validar usuario en base de datos]:::myNodeStyle
    F -->|Usuario válido| G[Verificar tipo de usuario]:::myNodeStyle
    G -->|Paciente| H[Redirigir a plataforma de pacientes]:::myNodeStyle
    G -->|Médico| I[Redirigir a plataforma de médicos]:::myNodeStyle
    F -->|Usuario inválido| J[Mostrar mensaje de error]:::errorStyle

    J --> B


:::

<h1 style="color:pink; text-align:center; font-weight:bold;">Ingreso de Datos Médicos</h1>

- OCR, o Reconocimiento Óptico de Caracteres (por sus siglas en inglés, Optical Character Recognition)

::: mermaid
%%{init: {'theme': 'dark'}}%%
sequenceDiagram
    participant user as Usuario
    participant backend as Servidor
    participant db as Base de Datos

    Note over user,backend: El usuario solicita ingresar datos médicos (exámenes)

    user->>+backend: Ingreso de datos médicos
    backend->>user: Pregunta qué tipo de examen es
    user->>backend: Proporciona información del examen
    backend->>db: Guarda información en la base de datos

    backend->>user: Muestra lista actualizada de exámenes disponibles
    backend->>db: Solicita lista de exámenes

    user->>+backend: Subir archivo (PDF, imagen)
    backend->>db: Procesa archivos automáticamente

    alt Dudas de la estructura 
        backend->>user: Pregunta qué tipo de examen es
        user->>backend: Proporciona información del examen
   else Sin dudas
        backend->>user: Continúa procesamiento
    end

    backend->>+backend: Aplica OCR a archivos
    backend->>db: Extrae datos médicos

    backend->>db: Almacena análisis de datos
    backend->>user: Genera recordatorios a partir de resultados (ej. glucosa alta)
    user->>backend: Genera recordatorios personalizados

:::

<h3 style="color:pink; text-align:start;">Carga manual de exámenes (indicar qué examen están disponibles?)</h3>

::: mermaid

flowchart TD
    A[Iniciar sesión]:::myNodeStyle -->|Usuario tipo Usuario| B{Mostrar exámenes disponibles}:::rombo
    B -->|Exámenes existentes| C[Panel de exámenes]:::myNodeStyle
    C -->|Subir nuevo examen| D[Solicitar tipo de examen]:::myNodeStyle
    D -->|Tipo de examen proporcionado| E{¿Examen reconocido?}:::rombo
    E -->|Sí| F[Guardar examen en la base de datos]:::myNodeStyle
    E -->|No| H[Examen no reconocido, no se puede subir]:::errorStyle
    F --> I[Confirmar carga de examen]:::myNodeStyle
    I -->|Cargar más exámenes?| B


    classDef myNodeStyle fill:#f9f,stroke:#333,stroke-width:2px, color:#333, border-radius: 16px;
    classDef errorStyle fill:#f99,stroke:#900,stroke-width:2px, color:#333, border-radius: 16px;
    classDef rombo fill:#09f, stroke:#09f, stroke-width:2px, color:#fff;

:::

<h3 style="color:pink; text-align:start;">Evaluación y edición de exámenes (preguntar qué tipo de examen es)</h3>

::: mermaid

flowchart TD
    %% Inicio del proceso
    A[Usuario ingresa un examen] --> B{¿Qué tipo de examen es?}
    B -->|Tipo de examen proporcionado| C[Almacenar examen en la base de datos]
    C --> D[Confirmación de almacenamiento]

    %% Edición de examen
    D --> E[Usuario edita información del examen]
    E --> F[Editar título y descripción]
    F --> G[Actualizar en la base de datos]
    G --> H[Confirmación de actualización]

    %% Definición de estilos
    classDef myNodeStyle fill:#f9f,stroke:#333,stroke-width:2px, color:#333, border-radius: 16px;

    %% Aplicar estilos a los nodos
    class A,B,C,D,E,F,G,H myNodeStyle;


:::

<h3 style="color:pink; text-align:start;">Carga automática desde archivos (PDF, imágenes)</h3>


::: mermaid


sequenceDiagram
    participant User as Usuario
    participant UI as Interfaz
    participant Backend as Servidor
    participant DB as Base de Datos

    %% Proceso de carga de archivos
    User->>+UI: Selecciona archivo (PDF/Imagen)
    UI->>+Backend: Envía archivo para carga
    Backend->>Backend: Procesa archivo
    Backend->>+DB: Inscribe y guarda en la base de datos
    DB-->>-Backend: Confirmación de almacenamiento
    Backend-->>-UI: Confirmación de carga exitosa
    UI-->>-User: Muestra mensaje de éxito


:::

<h3 style="color:pink; text-align:start;">Escaneo y reconocimiento de texto (OCR)</h3>

::: mermaid

sequenceDiagram
    participant User as Usuario
    participant UI as Interfaz
    participant OCR as Sistema OCR
    participant DB as Base de Datos

    User->>+UI: Selecciona archivo para escaneo (PDF/Imagen)
    UI->>+OCR: Envía archivo para OCR
    OCR->>OCR: Realiza escaneo y reconocimiento de texto
    OCR->>+DB: Guarda texto reconocido en la base de datos
    DB-->>-OCR: Confirmación de almacenamiento
    OCR-->>-UI: Devuelve texto reconocido
    UI-->>-User: Muestra resultados del OCR

:::

<h3 style="color:pink; text-align:start;">Almacenar y analizar prescripciones médicas para hacer recordatorios</h3>


::: mermaid

sequenceDiagram
    participant User as Usuario
    participant UI as Interfaz
    participant Backend as Servidor
    participant DB as Base de Datos
    participant Analysis as Analizador

    %% Proceso de almacenamiento y análisis de prescripciones médicas
    User->>+UI: Envía prescripción médica
    UI->>+Backend: Transmite prescripción al servidor
    Backend->>+DB: Almacena prescripción en la base de datos
    DB-->>-Backend: Confirmación de almacenamiento
    Backend->>+Analysis: Solicita análisis de prescripciones
    Analysis->>Analysis: Analiza datos de prescripciones
    Analysis-->>-Backend: Devuelve análisis
    Backend-->>-UI: Envía recordatorios generados
    UI-->>-User: Muestra recordatorios al usuario

:::



<h3 style="color:pink; text-align:start;">implementar la base de datos</h3>

::: mermaid

sequenceDiagram
    participant DevFront as Frontend de Desarrollo
    participant TestFront as Frontend de Testeo
    participant Backend as Servidor
    participant Migration as Migraciones
    participant DB as Base de Datos (PostgreSQL)


    %% Proceso de implementación de la base de datos
    DevFront->>+Backend: Envía cambios de implementación
    Backend->>+Migration: Realiza migraciones
    Migration->>+DB: Actualiza la base de datos
    DB-->>-Migration: Confirmación de actualización
    Migration-->>-Backend: Confirma que las migraciones se realizaron
    Backend-->>-DevFront: Confirma implementación exitosa

    %% Proceso de testeo
    TestFront->>+Backend: Envía solicitudes de testeo
    Backend->>+DB: Consulta la base de datos
    DB-->>-Backend: Devuelve resultados
    Backend-->>-TestFront: Muestra resultados de testeo
:::

<h1 style="color:pink; text-align:center;">Visualización de Resultados</h1>

* <p style="color:pink; text-align:start">Comparación de resultados históricos</p>
* <p style="color:pink; text-align:start">Gráficos de evolución</p>
* <p style="color:pink; text-align:start">Resumen con valores alterados</p>

::: mermaid

sequenceDiagram
    participant user as Usuario
    participant backend as "Backend"
    participant db as "Base de Datos"

    user->>backend: Acceder a la sección "Estadísticas"
    backend->>db: Consultar resultados históricos del usuario
    db-->>backend: Devolver resultados históricos

    backend->>backend: Analizar y generar resumen de valores alterados
    backend->>user: Mostrar resumen de valores alterados

    backend->>db: Consultar datos para gráficos de evolución
    db-->>backend: Devolver datos de evolución

    backend->>user: Mostrar gráficos de evolución (mismos exámenes diferentes meses)
:::

<h1 style="color:pink; text-align:center;">Búsqueda Avanzada</h1>

* <p style="color:pink; text-align:start">Búsqueda por fecha, tipo de examen, palabras clave</p>
* <p style="color:pink; text-align:start">Filtrado por parámetros específicos</p>

::: mermaid
sequenceDiagram
    participant user as Usuario
    participant backend as "Backend"
    participant db as "Base de Datos"

    user->>backend: Ingresar criterios de búsqueda (fecha, tipo de examen, palabras clave)
    
    alt Generar debounce
        backend->>backend: Esperar hasta que el usuario deje de escribir
    else No se genera debounce
        backend->>db: Consultar datos según criterios de búsqueda
    end

    db-->>backend: Devolver resultados de búsqueda
    backend->>user: Mostrar resultados filtrados
    user->>backend: Solicitar filtrado adicional (parámetros específicos)
    
    alt Generar debounce
        backend->>backend: Esperar hasta que el usuario deje de escribir
    else No se genera debounce
        backend->>db: Consultar datos con parámetros adicionales
    end

    db-->>backend: Devolver resultados filtrados
    backend->>user: Mostrar resultados filtrados actualizados

:::

<h1 style="color:pink; text-align:center;">Alertas y Notificaciones</h1>

* <p style="color:pink; text-align:start;">Alertas para valores fuera del rango normal</p>
* <p style="color:pink; text-align:start;">Recordatorios para exámenes</p>

::: mermaid 

sequenceDiagram
    participant user as Usuario
    participant backend as Backend
    participant db as Base de Datos

    user->>backend: Revisar exámen
    backend->>db: Consultar lista de exámenes del usuario
    db-->>backend: Devolver exámenes

    backend->>db: Consultar valores de los exámenes
    db-->>backend: Devolver valores de exámenes

    backend->>backend: Verificar valores fuera del rango normal
    
    alt Valores fuera de rango
        backend->>user: Alerta: Valores fuera del rango normal
    else Valores en rango
        backend->>user: Todos los valores están dentro del rango normal
    end

    alt SMS O EMAIL
        backend->>user: Informe de revisión
    end
    
    backend->>user: Recordatorio de próximos exámenes

:::

<h1 style="color:pink; text-align:center;">Resumen de Salud</h1>

* <p style="color:pink; text-align:start;">Dashboard con indicadores clave</p>
* <p style="color:pink; text-align:start;">Análisis de tendencias</p>

::: mermaid

sequenceDiagram
    participant user as Usuario
    participant backend as "Backend"
    participant db as "Base de Datos"

    user->>backend: Acceder al Dashboard de Salud
    backend->>db: Consultar indicadores clave
    db-->>backend: Devolver indicadores clave

    backend->>user: Mostrar indicadores clave en el Dashboard

    user->>backend: Solicitar análisis de tendencias
    backend->>db: Consultar datos históricos
    db-->>backend: Devolver datos históricos

    backend->>backend: Realizar análisis de tendencias
    backend->>user: Mostrar análisis de tendencias

:::



<h1 style="color:pink; text-align:center;">Integración con IA</h1>

* <p style="color:pink; text-align:start;">Predicción de patrones de salud</p>
* <p style="color:pink; text-align:start;">Recomendaciones personalizadas</p>

::: mermaid

sequenceDiagram
    participant user as Usuario
    participant backend as "Backend"
    participant ai as "IA"
    participant db as "Base de Datos"

    user->>backend: Ingresar nuevo examen
    backend->>user: Preguntar tipo de examen
    user->>backend: Proporcionar tipo de examen

    backend->>db: Guardar examen en la base de datos
    db-->>backend: Confirmar guardado

    backend->>ai: Analizar examen y predecir patrones de salud
    ai-->>backend: Devolver patrones de salud

    backend->>ai: Generar recomendaciones personalizadas
    ai-->>backend: Devolver recomendaciones

    backend->>user: Mostrar patrones de salud y recomendaciones personalizadas

:::


<h1 style="color:pink; text-align:center;">Seguridad y Privacidad</h1>

* GDPR (Reglamento General de Protección de Datos): Es una normativa de la Unión Europea que protege la privacidad de los datos de los ciudadanos europeos. Establece directrices sobre la recopilación y el tratamiento de datos personales.

* HIPAA (Ley de Portabilidad y Responsabilidad del Seguro de Salud): Es una ley de EE. UU. que establece normas para la protección de la información de salud de las personas. Asegura que la información médica sea manejada de manera confidencial y segura.

* <p style="color:pink; text-align:start;">Cifrado de datos (en reposo y en tránsito)</p>
* <p style="color:pink; text-align:start;">Control de acceso y permisos</p>
* <p style="color:pink; text-align:start;">Cumplimiento de normativas (GDPR, HIPAA)</p>

::: mermaid 

sequenceDiagram
    participant user as Usuario
    participant backend as "Backend"
    participant db as "Base de Datos"
    participant security as "Módulo de Seguridad"

    user->>backend: Solicitar acceso a datos sensibles
    backend->>security: Verificar permisos de acceso
    security-->>backend: Confirmar permisos

    backend->>db: Consultar datos sensibles
    db-->>backend: Devolver datos sensibles

    alt Datos en tránsito
        backend->>security: Cifrar datos en tránsito
        security-->>backend: Datos cifrados
    end

    alt Datos en reposo
        backend->>security: Cifrar datos en reposo
        security-->>backend: Datos cifrados
    end

    backend->>user: Mostrar datos cifrados

    backend->>security: Verificar cumplimiento normativas (GDPR, HIPAA)
    security-->>backend: Confirmar cumplimiento

    backend->>user: Proporcionar información sobre seguridad y privacidad

:::

<h1 style="color:pink; text-align:center;">Compartir Datos con Profesionales de la Salud</h1>

* <p style="color:pink; text-align:start;">Envío de registros mediante enlaces seguros</p>
* <p style="color:pink; text-align:start;">Gestión de permisos de acceso</p>

::: mermaid

sequenceDiagram
    participant user as Usuario
    participant backend as "Backend"
    participant healthPro as "Profesional de la Salud"
    participant security as "Módulo de Seguridad"

    user->>backend: Solicitar compartir datos
    backend->>security: Verificar permisos de acceso
    security-->>backend: Confirmar permisos

    alt Permisos confirmados
        backend->>user: Generar enlace seguro para compartir
        backend->>healthPro: Enviar enlace seguro
    else Permisos denegados
        backend->>user: Acceso denegado
    end

    alt Enlace enviado
        healthPro->>backend: Acceder a datos mediante enlace
        backend->>security: Verificar acceso del profesional
        security-->>backend: Confirmar acceso

        backend->>db: Consultar registros del usuario
        db-->>backend: Devolver registros

        backend->>healthPro: Mostrar registros de salud
    end
:::

<h1 style="color:pink; text-align:center;">Compatibilidad y Sincronización</h1>

* <p style="color:pink; text-align:center;">Sincronización con dispositivos médicos</p>
* <p style="color:pink; text-align:center;">Exportación de datos (PDF, CSV)</p>


::: mermaid

sequenceDiagram
    participant user as Usuario
    participant backend as "Backend"
    participant medicalDevice as "Dispositivo Médico"
    participant healthPro as "Profesional de la Salud"
    
    user->>backend: Sincronizar con dispositivos médicos
    backend->>medicalDevice: Solicitar datos de salud
    medicalDevice-->>backend: Enviar datos de salud
    backend->>user: Confirmar sincronización de datos

    user->>backend: Solicitar enlace seguro para compartir datos
    backend->>healthPro: Generar enlace seguro para compartir
    backend->>healthPro: Mostrar enlace seguro
    healthPro->>backend: Solicitar exportación de datos (PDF/CSV)
    
    alt Formato PDF
        backend->>backend: Generar archivo PDF
    else Formato CSV
        backend->>backend: Generar archivo CSV
    end
    
    backend-->>healthPro: Enviar archivo exportado

:::


<h1 style="color:pink; text-align:center;">Multiplataforma</h1>
<h3 style="color:pink; text-align:start;">Disponible en dispositivos móviles y versión web</h3>


::: mermaid

flowchart TD
    A[Servidor/API]:::myNodeStyle --> B{Acceso a dispositivos}:::rombo
    B -->|Teléfono| C[Dispositivo Móvil]:::myNodeStyle
    B -->|Tablet| D[Dispositivo Tablet]:::myNodeStyle
    B -->|Computadora| E[Computadora]:::myNodeStyle
    B -->|Servicio API| F[Servicio API]:::myNodeStyle

    subgraph API_Key_Auth
        G[Verificar API Key]:::myNodeStyle
        H[Acceso Permitido]:::myNodeStyle
        I[Acceso Denegado]:::myNodeStyle
    end

    F --> G
    G -->|Clave válida| H
    G -->|Clave no válida| I

    classDef myNodeStyle fill:#f9f,stroke:#333,stroke-width:2px, color:#333, border-radius: 16px;
    classDef rombo fill:#09f, stroke:#09f, stroke-width:2px, color:#fff;

:::

<h1 style="color:pink; text-align:center;">Historial y Registro de Actividades</h1>

* <p style="color:pink; text-align:start;">Historial de cambios y actualizaciones</p>
* <p style="color:pink; text-align:start;">Auditoría de acceso</p>


::: mermaid

flowchart TD
    A[Inicio]:::myNodeStyle --> B[Registrar Actividad]:::myNodeStyle
    B --> C{Tipo de Actividad}:::rombo

    C -->|Cambios/Actualizaciones| D[Registrar Cambios]:::myNodeStyle
    C -->|Acceso| E[Registrar Acceso]:::myNodeStyle

    D --> F[Almacenar en Historial]:::myNodeStyle
    E --> F

    F --> G[Generar Informe de Auditoría]:::myNodeStyle
    G --> H{Tipo de Informe}:::rombo

    H -->|Resumen| I[Mostrar Resumen de Auditoría]:::myNodeStyle
    H -->|Detalles| J[Mostrar Detalles de Auditoría]:::myNodeStyle

    J --> K[Enviar Informe por Email]:::myNodeStyle
    I --> L[Fin]:::myNodeStyle
    K --> L

    classDef myNodeStyle fill:#f9f,stroke:#333,stroke-width:2px, color:#333, border-radius: 16px;
    classDef rombo fill:#09f, stroke:#09f, stroke-width:2px, color:#fff;

:::

<h1 style="color:pink; text-align:center;">Soporte e Información Adicional</h1>

* <p style="color:pink; text-align:start;">Explicación de valores de cada examen</p>
* <p style="color:pink; text-align:start;">Soporte técnico para usuarios</p>

::: mermaid

sequenceDiagram
    participant user as Usuario
    participant backend as "Backend"
    participant support as "Soporte (Médico/Administrador)"
    
    user->>backend: Seleccionar opción de soporte o explicación de valores
    backend->>user: Mostrar opciones de soporte (valores de exámenes / soporte técnico)
    
    alt Solicitar explicación de valores
        user->>backend: Pedir explicación de valores de examen
        backend->>support: Solicitar explicación de valores
        support-->>backend: Proporcionar explicación de valores
        backend->>user: Mostrar explicación de valores
    else Solicitar soporte técnico
        user->>backend: Pedir soporte técnico
        backend->>support: Solicitar soporte técnico
        support-->>backend: Proporcionar soporte técnico
        backend->>user: Mostrar soporte técnico
    end

:::



<h1 style="color:#09f">

Diagrama Correo

</h1>


::: mermaid 
flowchart TD
    %% Parte 1: Preprocessing Data
    A[Image or PDF] --> B{Image JPEG or PDF}
    B -->|Yes| C[Quality Improvement]
    C --> D[Convert to PDF]
    B -->|No| E[PDF to Analyze]
    D --> E

    %% Parte 2: API OpenAI
    F[Inicio: API OpenAI] --> G[Patient and Healthcare Provider Data Detection]
    F --> H[Medical Exam Type]
    F --> I[Medical Exam Results Detection]

    %% Unir las salidas
    G --> J[Data Extraction]
    H --> J
    I --> J

    %% Parte 3: Data Extraction
    J --> K[Database Feed]

    %% Definición de estilos
    classDef myNodeStyle fill:#f9f,stroke:#333,stroke-width:2px, color:#333, border-radius: 16px;
    classDef rombo fill:#09f, stroke:#09f, stroke-width:2px, color:#fff;

    %% Aplicar estilos a los nodos
    class A,B,C,D,E,F,G,H,I,J,K myNodeStyle;
    class B rombo;

::: 