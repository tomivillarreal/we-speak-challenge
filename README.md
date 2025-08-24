# WeSpeak Challenge
<p align="center">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpik9jVT0ODhe_Q2kXXVcdpP-DbKlZRuf_Bg&s" alt="We Speak Logo"/>
</p>

Este codigo forma parte del challenge de WeSpeak.
## Consigna
Creación de un contador con persistencia en base de datos

El objetivo de este desafío es desarrollar una aplicación web sencilla utilizando Next.js que implemente un contador cuyos valores se persistan en una base de datos relacional. La aplicación deberá tener las siguientes funcionalidades básicas:

**Contador con Persistencia:** Crear un contador que muestre su valor actual en pantalla. El valor del contador debe estar almacenado en una base de datos relacional y persistir entre sesiones. Proveer dos botones: uno para incrementar y otro para disminuir el valor del contador.

**Persistencia de Datos:** Al hacer clic en los botones de incrementar o disminuir, el valor actualizado del contador debe guardarse inmediatamente en la base de datos (puede ser una db online o una offline como sqlite o un archivo json)

Pasados los 20 minutos del último cambio al contador, este se tiene que reiniciar a 0 de manera global y aunque la página esté cerrada.

**Requisitos Técnicos**

 - Framework: Next.js. 15. Para el manejo del backend usar server actions
 - Base de Datos: usar Supabase (postgresql)
 - Lenguaje: JavaScript o TypeScript.
 - ORM: puede ser Prisma o Drizzle para manejar las consultas con la base de datos.
 - Usar en su mayoría server components
 - Tener en cuenta experiencia de usuario (estados de carga, etc)
 - Deployarlo en Vercel

## ¿Como Ejecutar?
 1. Setear las variables de entorno (Obtenidas de Supabase)

| Variable    | Descripción | Ejemplo
|------|-----------|-----------|
|     `NEXT_PUBLIC_SUPABASE_URL`   | URL pública de tu proyecto Supabase    |  `https://xxxxx.supabase.co`       | 
|     `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`| API Key pública para conexión desde el frontend   |`eyJhbGciOiJIUzI1NiIsInR...`         |
|     `DATABASE_URL` | Conexión principal a tu base de datos (PostgreSQL)     |`postgresql://user:pass@host:5432/db`|
|     `DIRECT_URL`  | Conexión directa (usada en migraciones, Prisma, etc.)    | `postgresql://user:pass@host:5432/db`|

 2. Migrar la base de datos con el comando `npx prisma db push`
 3. Configurar políticas RLS para permitir el uso de la tabla "**counter**"
 4. Habilitar el Realtime de supabase para el proyecto y la tabla "**counter**".
 5. Ejecutar `npm i` para instalar todas las dependencias.
 6. Ejecutar en modo desarrollo `npm run dev`
 7. Construir la aplicacion `npm run build` y ejecutarla `npm run start`
 
 ### Adicionales
Para lograr ***"Pasados los 20 minutos del último cambio al contador, este se tiene que reiniciar a 0 de manera global y aunque la página esté cerrada."*** se debera configurar un cron job dentro de Supabase, este tiene como finalidad evaluar si han pasado 20 minutos luego de la ultima actualizacion a la base de datos y setear a 0 el contador en caso que corresponda.
Primero creamos una funcion para resetear el valor **reset_counter()**

    create or replace function public.reset_counter() 
    returns void language plpgsql as 
    $$BEGIN
	    UPDATE counter
	    SET value = 0
	    WHERE now() - "updated_at" > interval '20 minutes' AND value != 0;
    END;
    $$;


Luego generamos el cron job:

    select cron.schedule(
    'counter_reset_every_minute',
    '* * * * *',
    $$public.reset_counter();$$
    );

De esta manera se ejecutara la tarea cada un minuto, si es que han pasado 20 minutos de la ultima actualización esta se efectúa.
