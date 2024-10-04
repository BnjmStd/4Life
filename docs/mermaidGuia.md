
# información inicial

## Nodos y sus formas (Proceso, Decisión, etc.)

### Rectángulo (Proceso): 
- Representa una acción o proceso que se debe ejecutar. Es el paso donde ocurre algo.

En Mermaid, se crea usando corchetes []:

::: mermaid
graph TD;
    A[Iniciar proceso] --> B[Realizar tarea];

:::

- Rombo (Decisión): Representa una decisión o condición que lleva a diferentes caminos. Por ejemplo, una pregunta que da como resultado "Sí" o "No".

En Mermaid, se usa llaves {} para un nodo de decisión:

::: mermaid

graph TD;
    A[Inicio] --> B{Es válido?};
    B -->|Sí| C[Proceder];
    B -->|No| D[Abortar];


:::

El rombo define un punto de bifurcación en el flujo, donde se pueden seguir diferentes rutas según las respuestas.

## Conexiones y flechas

Las flechas indican el flujo de dirección entre nodos:

- -->: Conexión normal (una flecha).
- -.->: Flecha discontinua (para representar procesos opcionales).
- <-->: Flecha bidireccional (cuando el flujo va en ambas direcciones).

::: mermaid

graph TD;
    A[Inicio] --> B{Decisión};
    B -->|Sí| C[Proceder];
    B -->|No| D[Abortar];
    C -.-> D;  
:::

## Subgraph (Agrupación)

Un subgraph se utiliza para agrupar pasos relacionados del proceso dentro de un bloque, para representar que ciertos pasos pertenecen a una misma sección o área.

- Útil cuando quieres organizar mejor el diagrama y separar secciones lógicas o módulos.


::: mermaid

graph TD;
    subgraph Grupo1
        A[Inicio] --> B[Proceso 1];
    end;
    
    subgraph Grupo2
        C[Proceso 2] --> D[Fin];
    end;
    
    A --> C;


:::

Cuándo usarlo:
- Si tienes un proceso complejo con muchas partes, y deseas agrupar pasos relacionados para facilitar la comprensión.
- Si hay varios módulos o etapas en un proceso que pueden separarse claramente.
## Uso adecuado de nodos y subgrafos

- Proceso (rectángulo): Úsalo para cualquier acción o tarea que se ejecute.

    Ejemplo: "Enviar correo", "Procesar datos".
- Decisión (rombo): Úsalo cuando una condición o pregunta requiera diferentes acciones dependiendo del resultado.

    Ejemplo: "¿Usuario autenticado?", "¿Archivo disponible?".

- Subgraph: Úsalo cuando tengas muchas acciones o decisiones que pertenezcan a una misma categoría o área.

    Ejemplo: Una serie de tareas dentro de un proceso de aprobación que tiene varias fases o pasos.

## Flujos alternativos y opcionales

Puedes usar flechas discontinuas o ramificaciones para representar acciones que no siempre ocurren, o decisiones que llevan a otros flujos:

::: mermaid

graph TD;
    A[Inicio] --> B{Decisión principal};
    B -->|Sí| C[Opción 1];
    B -->|No| D[Opción 2];
    C -.-> E[Proceso opcional];

:::

# Iniciar un gráfico básico

## Resumen

- graph TD: Indica que el gráfico es un grafo dirigido (Top Down, de arriba hacia abajo).

- A-->B: Crea una flecha de A hacia B.

::: mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;

:::

# Tipos de dirección de grafos

## Resumen 

- TD: Top Down (de arriba hacia abajo).
- LR: Left to Right (de izquierda a derecha).
- BT: Bottom Top (de abajo hacia arriba).
- RL: Right to Left (de derecha a izquierda).

::: mermaid

graph LR;
    A-->B;
    B-->C;
    C-->D;

:::

#  Nodos y enlaces personalizados

Puedes personalizar los nodos y enlaces usando etiquetas y estilos:

* Etiquetas: Puedes agregar texto personalizado en los enlaces y nodos.

::: mermaid

graph TD;
    A[Inicio] --> B{Decisión};
    B -->|Sí| C[Fin];
    B -->|No| D[Otra opción];

:::

# Nodos en forma de rombo, rectángulo, etc.

- [texto] *dos puntos* Rectángulo.
- {texto}: Rombos (para decisiones).

::: mermaid

graph TD;
    A[Inicio] --> B{Decisión};

:::

# Subgrafos (grupos)

Puedes agrupar nodos relacionados en un subgrafo:

::: mermaid

graph TD;
    subgraph Grupo1
        A-->B;
    end;
    subgraph Grupo2
        C-->D;
    end;
    A-->C;

:::

#  Estilos personalizados

Se pueden agregar estilos para cambiar colores o formas de nodos:

::: mermaid

graph TD;
    A[Inicio] --> B;
    B --> C;
    style A fill:#f9f,stroke:#333,stroke-width:4px;
    style B fill:#bbf;

:::

# Bucles y conexiones múltiples
Mermaid permite bucles y múltiples conexiones entre nodos:


::: mermaid
graph TD;
    A --> B;
    B --> C;
    C --> A;  
:::

- Inicia con graph TD, LR, BT, o RL.
- Usa --> para conexiones dirigidas.
- Personaliza nodos con [texto] para rectángulos o {texto} para decisiones.
- Agrupa nodos con subgraph para estructura visual.
Aplica estilos con style.

# Relaciones bidireccionales
Si quieres que dos nodos estén conectados en ambas direcciones, puedes usar la doble flecha:

::: mermaid
graph TD;
    A<-->B;
:::


# Comentarios
Puedes agregar comentarios en el código Mermaid para mantenerlo claro:
::: mermaid
%% Esto es un comentario
graph TD;
    A-->B;
:::

# Links en nodos

Puedes hacer que un nodo sea clicable añadiendo enlaces:
::: mermaid
graph TD;
    A[Inicio] --> B[Decisión];
    click B "https://ejemplo.com" "Ir a la decisión";

:::

# Etiquetas personalizadas en las flechas

Puedes personalizar los enlaces con etiquetas entre los nodos, indicando condiciones o pasos:

::: mermaid
graph TD;
    A -->|Sí| B;
    A -->|No| C;

:::

# Flechas de diferentes formas
Puedes cambiar el tipo de flechas para indicar flujos o relaciones distintas:

- -->: Flecha normal.
- -.->: Flecha discontinua.
- ===: Flecha gruesa.

::: mermaid
graph TD;
    A-.->B;
    B===>C;
:::

# Estilos avanzados para nodos y enlaces
Para dar más personalización, puedes aplicar estilo CSS a nodos y enlaces, o usar la etiqueta classDef para definir clases reutilizables:

::: mermaid

graph TD;
    A --> B;
    B --> C;
    style A fill:#f96,stroke:#333,stroke-width:2px;
    classDef claseAzul fill:#00f,stroke:#000;
    class B claseAzul;

:::

# Decisiones con múltiples salidas
En diagramas de flujo, puedes tener nodos de decisión con múltiples salidas para representar condiciones diferentes:

::: mermaid

graph TD;
    A[Inicio] --> B{Es válido?};
    B -->|Sí| C[Proceder];
    B -->|No| D[Abortar];
    B -->|Quizás| E[Verificar de nuevo];

:::

# Subgrafos con título

Los subgrafos pueden tener un título o encabezado para clarificar secciones del grafo:

::: mermaid
graph TD;
    subgraph Sección 1
        A-->B;
    end;
    subgraph Sección 2
        C-->D;
    end;

:::

# Líneas de vida (líneas verticales)

Para diagramas de secuencia, puedes usar líneas de vida para visualizar los actores de un proceso:

::: mermaid
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>Bob: Hola, Bob
    Bob-->>Alice: Hola, Alice

:::

#  Diagramas de clase (UML)
Puedes crear diagramas UML para modelar clases de software, con atributos y relaciones entre ellas:
::: mermaid
classDiagram
    class Animal {
        +String nombre
        +String especie
        +void comer()
    }
    class Perro {
        +String raza
    }
    Animal <|-- Perro
:::

## conclusión

- Relaciones complejas: Usa flechas bidireccionales, etiquetas y condiciones.
- Estilos personalizados: Define clases o aplica estilos CSS.
- Links clicables: Haz diagramas interactivos con enlaces.
- Comentarios y subgrafos: Organiza mejor tu código Mermaid.



# ejemplos 

## Diagrama de secuencia: mensaje para sí mismo en bucle

::: mermaid 

sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop HealthCheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts<br/>prevail...
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!


:::

## Diagrama de secuencia: comunicación del servicio de aplicación de blogs

::: mermaid 

sequenceDiagram
    participant web as Web Browser
    participant blog as Blog Service
    participant account as Account Service
    participant mail as Mail Service
    participant db as Storage

    Note over web,db: The user must be logged in to submit blog posts
    web->>+account: Logs in using credentials
    account->>db: Query stored accounts
    db->>account: Respond with query result

    alt Credentials not found
        account->>web: Invalid credentials
    else Credentials found
        account->>-web: Successfully logged in

        Note over web,db: When the user is authenticated, they can now submit new posts
        web->>+blog: Submit new post
        blog->>db: Store post data

        par Notifications
            blog--)mail: Send mail to blog subscribers
            blog--)db: Store in-site notifications
        and Response
            blog-->>-web: Successfully posted
        end
    end



::: 


## Un diagrama de flujo de confirmación.

::: mermaid

gitGraph:
    commit "Ashish"
    branch newbranch
    checkout newbranch
    commit id:"1111"
    commit tag:"test"
    checkout main
    commit type: HIGHLIGHT
    commit
    merge newbranch
    commit
    branch b2
    commit


:::

### otro de branch

::: mermaid

gitGraph:
    commit "Ashish"                       %% Primer commit
    branch newbranch                      %% Creación de una nueva rama
    checkout newbranch                    %% Cambio a la nueva rama
    commit id:"1111"                      %% Commit en la nueva rama con un identificador
    commit tag:"test"                     %% Commit con una etiqueta "test"
    checkout main                         %% Volver a la rama principal
    commit type: HIGHLIGHT                %% Commit destacado en la rama principal
    commit                                %% Otro commit en la rama principal
    merge newbranch                       %% Fusión de "newbranch" en "main"
    commit                                %% Commit después de la fusión
    branch b2                             %% Creación de otra rama "b2"
    commit                                %% Commit en la rama "b2"


:::


## grafico circular basico 

::: mermaid

pie title NETFLIX
         "Time spent looking for movie" : 90
         "Time spent watching it" : 10

:::


::: mermaid

pie title What Voldemort doesn't have?
         "FRIENDS" : 2
         "FAMILY" : 3
         "NOSE" : 45

:::

## diagrama secuencia básica 

::: mermaid


sequenceDiagram
    Alice ->> Bob: Hello Bob, how are you?
    Bob-->>John: How about you John?
    Bob--x Alice: I am good thanks!
    Bob-x John: I am good thanks!
    Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.

    Bob-->Alice: Checking with John...
    Alice->John: Yes... John, how are you?


:::


## diagrama flujo básico 


graph LR
    A[Square Rect] -- Link text --> B((Circle))
    A --> C(Round Rect)
    B --> D{Rhombus}
    C --> D


## diagrama de flujo más grande con algo de estilo 

::: mermaid


graph TB
    sq[Square shape] --> ci((Circle shape))

    subgraph A
        od>Odd shape]-- Two line<br/>edge comment --> ro
        di{Diamond with <br/> line break} -.-> ro(Rounded<br>square<br>shape)
        di==>ro2(Rounded square shape)
    end

    %% Notice that no text in shape are added here instead that is appended further down
    e --> od3>Really long text with linebreak<br>in an Odd shape]

    %% Comments after double percent signs
    e((Inner / circle<br>and some odd <br>special characters)) --> f(,.?!+-*ز)

    cyr[Cyrillic]-->cyr2((Circle shape Начало));

     classDef green fill:#9f6,stroke:#333,stroke-width:2px;
     classDef orange fill:#f96,stroke:#333,stroke-width:4px;
     class sq,e green
     class di orange


:::


## grafico xy

::: mermaid

xychart-beta
    title "Sales Revenue"
    x-axis [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]
    y-axis "Revenue (in $)" 4000 --> 11000
    bar [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]
    line [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]


:::

## linea de tiempo


::: mermaid

timeline
    title History of Social Media Platform
    2002 : LinkedIn
    2004 : Facebook
         : Google
    2005 : Youtube
    2006 : Twitter


:::

# mapas mentales

::: mermaid

mindmap
  root((mindmap))
    Origins
      Long history
      ::icon(fa fa-book)
      Popularisation
        British popular psychology author Tony Buzan
    Research
      On effectiveness<br/>and features
      On Automatic creation
        Uses
            Creative techniques
            Strategic planning
            Argument mapping
    Tools
      Pen and paper
      Mermaid



:::

## diagrama de estados

::: mermaid

stateDiagram
    [*] --> Still
    Still --> [*]

    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]

:::

## text unicode

::: mermaid

flowchart LR
    id["This ❤ Unicode"]


:::

::: mermaid

%%{init: {"flowchart": {"htmlLabels": false}} }%%
flowchart LR
    markdown["`This **is** _Markdown_`"]
    newLines["`Line1
    Line 2
    Line 3`"]
    markdown --> newLines

:::