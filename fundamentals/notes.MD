# Node Fundamentals

# Class 2

**NodeJS es un entorno de ejecución de JavaScript fuera del navegador**. Se crea en 2009, orientado a servidores. Es muy importante que esté fuera del navegador debido a que ya no es necesario un navegador web para ejecutar código JavaScript.

Características principales de JavaScript:

- **Concurrencia**: Es monohilo, con entradas y salidas asíncronas.
- **Motor V8**: Creado por Google en 2008 para Chrome. Escrito en C++. Convierte JS en código máquina en lugar de interpretarlo en tiempo real.
- Todo funciona en base a **Módulos**, que son piezas de código muy pequeñas que modularizan nuestros sistemas y ayudan a entender mejor el código.
- **Orientación a Eventos**, existe un bucle de eventos que se ejecuta constantemente. Lo que nos permite programar de forma reactiva, lo que quiere decir que podemos programar con la lógica de “Cuando sucede algo, se ejecuta esta parte de mi código y eso a su vez dispara otra parte”.

# Class 3

**Event Queue:** Contiene todos los eventos que se generan por nuestro código (Funciones, peticiones, etc.), estos eventos quedan en una cola que van pasando uno a uno al Event Loop.

**Event Loop:** Se encarga de resolver los eventos ultra rápidos que llegan desde el Event Queue. En caso de no poder resolverse rápido, enviá el evento al Thread Pool.

**Thread Pool:** Se encarga de gestionar los eventos de forma asíncrona. Una vez terminado lo devuelve al Event Loop. El Event Loop vera si lo pasa a Event Queue o no.

# Class 6

**DesarrolloNodemon.** Demons en linux, puedes tener procesos que ves ejecutandosenodemon + archivo al que quiero acceder detecta cambios, y ejecuta automaticamente el código.

sudo npm install -g nodemon

- [Nodemon](https://nodemon.io/)

**Producción**

sudo npm install -g pm2

**PM2** Es un demonio administrador de procesos que me puede ayudar a administrar y mantener mi aplicación 24/7.

- Voy a poner monitorizar el código para saber si algo se rompe.
- Me permite ver dashboards de mi código, puedo ver que está corriendo.
- Puedo ver el rendimiento de mi cpu
- Con: pm2 stop + id —> me detiene el proceso que está en ejecución con ese ID.

# Class 16

El módulo de procesos secundarios de Node.js (**child_process**) tiene dos funciones **spawn** y **exec**, mediante las cuales podemos iniciar un proceso secundario para ejecutar otros programas en el sistema.

La diferencia más significativa entre child_process.spawn y child_process.exec está en lo que spawn devuelve un stream y exec devuelve un buffer.

- Usa **spawn** cuando quieras que el proceso hijo devuelva datos binarios enormes a Node.
- Usa **exec** cuando quieras que el proceso hijo devuelva mensajes de estado simples.
- Usa **spawn** cuando quieras recibir datos desde que el proceso arranca.
- Usa **exec** cuando solo quieras recibir datos al final de la ejecución.

# Class 18

El modulo de OS, Operative System, nos permite ejecutar acciones de más bajo nivel en nuestro sistema, permitiéndonos conocer una gran variedad de detalles del mismo.

Como la memoria disponible que tiene, el total de la memoria, la interfaz de red, etc.

Esto nos será de gran ayuda a la hora de ejecutar o crear proyectos que necesiten información de una maquina para ejecutar una operación.

# Class 19

## Process

El objecto process es una instancia de `EventEmitter`; podemos suscribirnos a el para escuchar eventos de node.

- **beforeExit** → Es para enviar algo antes que pare un proceso.
- **uncaughtException** → Permite capturar cualquier error que no fue caputurado previamente.
- **uncaughtRejection** → Permite capturar cualquier error de promesas que se han rechazado.
- **UncaughtException**: Permite capturar cualquier error que no fue caputurado previamente. Esto evita que Node cierre todos los hijos al encontrar un error no manejado.
    
    ```
    process.on('uncaughtException', (err, origin) => console.log(err, origin));
    
    ```
    
- **exit**: Se ejecuta cuando node detiene el `eventloop` y cierra su proceso principal.
    
    ```
    process.on('exit', () => console.log('bye'));
    ```
    

# Class 20

**npm** (Node Package Manager) es un administrador de paquetes que permiten ejecutar funciones ya realizadas y validadas y de esta manera acelerar y asegurar la calidad de neustro proceso de desarrollo.

Podemos buscar modulos para casi todo en:

[npm](https://www.npmjs.com/)

# Class 21

En Node tenemos una forma de importar módulos la cual es con el método require, el cual es la forma por defecto de importar módulos, ya sean nuestros propios módulos como los de otras personas en nuestros proyectos JS, pero suele haber mucha confusión debido al import.

Import es la forma de importar módulos en Ecmascript, el cual es un estándar de JavaScript para la web, esta forma de importar en teoría Node no la acepta oficialmente, a no ser que usemos su modo de .mjs.

Pero gracias a compiladores como Babel, nosotros podremos utilizar estas normas de Ecmascript en nuestro código para cuando se ejecute se transforme en código que sea aceptable por Node.

Se recomienda en la mayoría de veces la importación con require.

# Class 24

## Buffer

---

Un buffer es un espacio de memoria (en la memoria ram), en el que se almacenan datos de manera temporal.

Es la forma mas cruda en la que se pueden almacenar los datos. (Se guardan en **bytes** y no se especifica el tipo de dato)

En la consola, **los datos se muestran en formato hexadecimal**.

---

Creacion de un bufer básico:

Para crear un buffer, con 4 espacios por ejemplo, podemos hacerlo con la siguiente sintaxis.

```
let buffer = Buffer.alloc(4);
console.log(buffer);
// Output:
//<Buffer 00 00 00 00>

```

Otras formas de crear un buffer:

Datos en un arreglo

```
let buffer2 = Buffer.from([1,2,3]);
console.log(buffer2);

```

Datos de tipo string:

```
let buffer3 = Buffer.from('Hola');
console.log(buffer3);
console.log(buffer3.toString());

```

Guardar el abecedario en un buffer:

```
let abc =  Buffer.alloc(26);
console.log(abc);

for (let i = 0; i< abc.length; i++){
  abc[i] = i + 97;
}

console.log(abc);
console.log(abc.toString())
```

# Class 25

Stream:

Podría decirse que un Stream es el proceso de ir consumiendo datos al tiempo en que se reciben. Por ejemplo, cuando vemos un video en Youtube estamos consumiendo datos por medio de streaming (readable stream, porque solo podemos ver los videos mas no editarlos) ya que lo vemos al mismo tiempo en que este se está descargando. de lo contrario habría que esperar a que se descargue el video por completo para poder verlo.

**buffer**Si en el caso anterior, mientras vemos el video, fallara el internet, así sea por un segundo, la reproducción se pararía instantáneamente. Pero sabemos que en realidad no es así, el video continúa reproduciéndose por un tiempo mas. Esto es gracias a la implementación de un buffer el cuál es un espacio en memoria ram en donde la información proveniente del servidor llega por fragmentos (chunks), para luego ser consumido, y como ese almacenamiento de datos en el buffer se hace a bajo nivel, de forma binaria, el proceso es mucho mas rápido de lo que se consume. Es por eso que cuando reproducimos un video en Youtube vemos que este se carga mas rápido. (dependiendo del ancho de banda claro está)

# Class 28

Un patrón que se sigue siempre en cualquier lenguaje y programa de devs es **Error First Callbacks**, esto quiere decir que siempre que tengamos un callback el primer parámetro debería ser el error.


Otro patrón típico es tener el callback es tener en el callback como la última función que se pasa. Aunque depende del caso.

# Class 29

Web scraping es una técnica utilizada mediante programas de software para extraer información de sitios web. Usualmente, estos programas simulan la navegación de un humano en la World Wide Web ya sea utilizando el protocolo HTTP manualmente, o incrustando un navegador en una aplicación.

# Class 30

Es una herramienta de construcción en JavaScript construida sobre flujos de nodos . Estos flujos facilitan la conexión de operaciones de archivos a través de canalizaciones . Gulp lee el sistema de archivos y canaliza los datos disponibles de un complemento de un solo propósito a otro a través del .pipe()operador, haciendo una tarea a la vez. Los archivos originales no se ven afectados hasta que se procesan todos los complementos. Se puede configurar para modificar los archivos originales o para crear nuevos. Esto otorga la capacidad de realizar tareas complejas mediante la vinculación de sus numerosos complementos. Los usuarios también pueden escribir sus propios complementos para definir sus propias tareas.

# Class N
