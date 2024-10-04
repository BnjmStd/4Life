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
    A[Inicio] --> B[Formulario de inicio de sesión]
    B --> C[Usuario ingresa credenciales]
    C --> D[Enviar credenciales a API]
    D --> E[Desencriptar datos]
    E --> F[Validar usuario en base de datos]
    F -->|Usuario válido| G[Verificar tipo de usuario]
    G -->|Paciente| H[Redirigir a plataforma de pacientes]
    G -->|Médico| I[Redirigir a plataforma de médicos]
    F -->|Usuario inválido| J[Mostrar mensaje de error]

    J --> B


:::

<h1 style="color:pink; text-align:center; font-weight:bold;">Ingreso de Datos Médicos</h1>
<h3 style="color:pink; text-align:start;">Carga manual de exámenes (indicar qué examen están disponibles?)</h3>
<h3 style="color:pink; text-align:start;">Evaluación y edición de exámenes (preguntar qué tipo de examen es)</h3>

<h3 style="color:pink; text-align:start;">Carga automática desde archivos (PDF, imágenes)</h3>

<h3 style="color:pink; text-align:start;">Escaneo y reconocimiento de texto (OCR)</h3>

<h3 style="color:pink; text-align:start;">Almacenar y analizar prescripciones médicas para hacer recordatorios</h3>

<h3 style="color:pink; text-align:start;">implementar la base de datos</h3>


<h1 style="color:pink; text-align:center;">Visualización de Resultados</h1>
<h3 style="color:pink; text-align:start;">Comparación de resultados históricos</h3>
<h3 style="color:pink; text-align:start;">Gráficos de evolución</h3>
<h3 style="color:pink; text-align:start;">Resumen con valores alterados</h3>

<h1 style="color:pink; text-align:center;">Búsqueda Avanzada</h1>
<h3 style="color:pink; text-align:start;">Búsqueda por fecha, tipo de examen, palabras clave</h3>
<h3 style="color:pink; text-align:start;">Filtrado por parámetros específicos</h3>

<h1 style="color:pink; text-align:center;">Alertas y Notificaciones</h1>
<h3 style="color:pink; text-align:start;">Alertas para valores fuera del rango normal</h3>
<h3 style="color:pink; text-align:start;">Recordatorios para exámenes</h3>

<h1 style="color:pink; text-align:center;">Resumen de Salud</h1>
<h3 style="color:pink; text-align:start;">Dashboard con indicadores clave</h3>
<h3 style="color:pink; text-align:start;">Análisis de tendencias</h3>

<h1 style="color:pink; text-align:center;">Integración con IA</h1>
<h3 style="color:pink; text-align:start;">Predicción de patrones de salud</h3>
<h3 style="color:pink; text-align:start;">Recomendaciones personalizadas</h3>

<h1 style="color:pink; text-align:center;">Seguridad y Privacidad</h1>
<h3 style="color:pink; text-align:start;">Cifrado de datos (en reposo y en tránsito)</h3>
<h3 style="color:pink; text-align:start;">Control de acceso y permisos</h3>
<h3 style="color:pink; text-align:start;">Cumplimiento de normativas (GDPR, HIPAA)</h3>

<h1 style="color:pink; text-align:center;">Compartir Datos con Profesionales de la Salud</h1>
<h3 style="color:pink; text-align:start;">Envío de registros mediante enlaces seguros</h3>
<h3 style="color:pink; text-align:start;">Gestión de permisos de acceso</h3>

<h1 style="color:pink; text-align:center;">Compatibilidad y Sincronización</h1>
<h3 style="color:pink; text-align:start;">Sincronización con dispositivos médicos</h3>
<h3 style="color:pink; text-align:start;">Exportación de datos (PDF, CSV)</h3>

<h1 style="color:pink; text-align:center;">Multiplataforma</h1>
<h3 style="color:pink; text-align:start;">Disponible en dispositivos móviles y versión web</h3>

<h1 style="color:pink; text-align:center;">Historial y Registro de Actividades</h1>
<h3 style="color:pink; text-align:start;">Historial de cambios y actualizaciones</h3>
<h3 style="color:pink; text-align:start;">Auditoría de acceso</h3>

<h1 style="color:pink; text-align:center;">Soporte e Información Adicional</h1>
<h3 style="color:pink; text-align:start;">Explicación de valores de cada examen</h3>
<h3 style="color:pink; text-align:start;">Soporte técnico para usuarios</h3>
