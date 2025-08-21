Este codigo forma parte del challenge de WeSpeak.

Creación de un contador con persistencia en base de datos

El objetivo de este desafío es desarrollar una aplicación web sencilla utilizando Next.js que implemente un contador cuyos valores se persistan en una base de datos relacional. La aplicación deberá tener las siguientes funcionalidades básicas: 

Contador con Persistencia: Crear un contador que muestre su valor actual en pantalla. El valor del contador debe estar almacenado en una base de datos relacional y persistir entre sesiones. Proveer dos botones: uno para incrementar y otro para disminuir el valor del contador.
Persistencia de Datos: Al hacer clic en los botones de incrementar o disminuir, el valor actualizado del contador debe guardarse inmediatamente en la base de datos (puede ser una db online o una offline como sqlite o un archivo json)
Pasados los 20 minutos del último cambio al contador, este se tiene que reiniciar a 0 de manera global y aunque la página esté cerrada. 
Requisitos Técnicos

Framework: Next.js. 15. Para el manejo del backend usar server actions
Base de Datos: usar Supabase (postgresql)
Lenguaje: JavaScript o TypeScript.
ORM: puede ser Prisma o Drizzle para manejar las consultas con la base de datos. 
Usar en su mayoría server components
Tener en cuenta experiencia de usuario (estados de carga, etc) 
Deployarlo en Vercel 