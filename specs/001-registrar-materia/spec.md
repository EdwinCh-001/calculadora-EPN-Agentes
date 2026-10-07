# Spec 001 — Registrar una materia

Estado: aprobada
HU de origen: docs/historias/HU-001.md

## Contexto y objetivo
El estudiante necesita registrar una materia con la nota del primer bimestre para conservarla en su lista y completarla cuando obtenga la del segundo bimestre.

## Usuarios
- Estudiante que desea guardar una materia con una nota inicial y mantenerla registrada.

## Historias de usuario
- Guardar una materia nueva con su nota del primer bimestre.
- Recibir un aviso claro cuando falta información o la nota es inválida.
- Evitar duplicados de una materia ya registrada.
- Conservar la materia tras cerrar y volver a abrir la aplicación.

## Definiciones
- Materia: asignatura con nombre y nota del primer bimestre.
- Nombre válido: texto no vacío después de recortar espacios en los extremos.
- Nota válida: valor numérico comprendido entre 0 y 20 inclusive, con hasta dos decimales, usando punto decimal.

## Requisitos funcionales
RF-01: CUANDO el estudiante intenta guardar una materia con un nombre vacío, EL SISTEMA muestra el mensaje "Escribe el nombre de la materia." junto al campo del nombre y no guarda la materia. Origen: HU-001, escenario "Datos incompletos o inválidos"; decisión 1 y decisión 3 de decisiones.md.

RF-02: SI la nota está vacía o no cumple el rango permitido, ENTONCES EL SISTEMA muestra el mensaje "Escribe una nota entre 0 y 20 con hasta dos decimales." junto al campo de la nota y no guarda la materia. Origen: HU-001, escenario "Datos incompletos o inválidos"; decisión 1 y decisión 3 de decisiones.md.

RF-03: CUANDO la nota incluye espacios al inicio o al final, EL SISTEMA ignora esos espacios antes de validar y continúa con la comprobación del valor numérico. Origen: decisión 7 de decisiones.md.

RF-04: SI la nota usa coma como separador decimal, ENTONCES EL SISTEMA rechaza la entrada con el mensaje "Escribe una nota entre 0 y 20 con hasta dos decimales." y no guarda la materia. Origen: decisión 8 de decisiones.md.

RF-05: CUANDO ya existe una materia con el mismo nombre, ignorando mayúsculas y espacios al inicio o final, EL SISTEMA muestra el mensaje "Ya tienes una materia con ese nombre." junto al campo del nombre y no duplica la materia. Origen: HU-001, escenario "Materia repetida"; decisión 2 y decisión 3 de decisiones.md.

RF-06: CUANDO el estudiante ingresa un nombre y una nota válidos, EL SISTEMA guarda la materia y la muestra en la lista. Origen: HU-001, escenario "Guardar una materia".

RF-07: CUANDO el estudiante cierra y vuelve a abrir la aplicación después de guardar una materia válida, EL SISTEMA conserva la materia con su nota registrada para que siga visible en la lista. Origen: HU-001, escenario "Conservar mis datos"; decisión 5 de decisiones.md.

RF-08: SI el nombre y la nota son inválidos al mismo tiempo, ENTONCES EL SISTEMA prioriza el aviso del nombre y muestra el mensaje del nombre vacío antes de continuar con la validación de la nota. Origen: decisión 4 de decisiones.md.

RF-09: SI el nombre se escribe con diferencias de mayúsculas o con espacios al inicio o final, ENTONCES EL SISTEMA trata la materia como duplicada si ya existe el mismo nombre normalizado y no la guarda de nuevo. Origen: decisión 9 de decisiones.md.

RF-10: SI la nota se escribe con coma decimal, ENTONCES EL SISTEMA rechaza la entrada sin convertirla automáticamente y muestra el mensaje "Escribe una nota entre 0 y 20 con hasta dos decimales.". Origen: decisión 10 de decisiones.md.

RF-11: SI el nombre y la nota están incompletos a la vez, ENTONCES EL SISTEMA muestra primero el error del nombre y deja el aviso de la nota para corregir después. Origen: decisión 11 de decisiones.md.

## Requisitos no funcionales
- Las validaciones de nombre y nota deben ser visibles junto al campo correspondiente.
- La lógica de validación debe ser coherente y predecible para cada intento de guardar una materia.
- La información registrada por el estudiante debe conservarse entre sesiones.

## Casos límite
- Nombre con espacios al inicio o al final, que luego debe validarse sin esos espacios.
- Nombre vacío después de recortar espacios.
- Nota con espacios alrededor antes de validar, por ejemplo " 8.5 ".
- Nota 0 o 20 exactamente, ambas válidas.
- Nota con dos decimales válidos, por ejemplo 7.50.
- Nota fuera de rango, como 21 o -1.
- Nota con formato no permitido, como 7,50.
- Materia repetida con mayúsculas distintas o espacios adicionales.

## Fuera de alcance
- Registrar más de una nota por materia.
- Editar una materia ya guardada.
- El cálculo de promedios, estado académico o supletorio.
- Sincronizar información con un backend externo.

## Criterios de finalización
- El estudiante puede guardar una materia con nombre y nota válidos.
- El sistema informa claramente qué dato debe corregirse cuando el nombre está vacío, la nota es inválida o la materia ya existe.
- El sistema evita duplicar materias equivalentes por variaciones de formato.
- La materia persistente sigue siendo visible tras cerrar y volver a abrir la aplicación.


