# Decisiones — Spec 001

1. Pregunta: ¿Qué regla exacta debe usar la app para la nota del primer bimestre cuando falta, sale fuera de rango o usa un formato no válido?
   Respuesta: Aceptar solo números de 0 a 20 con hasta dos decimales, usando punto decimal; rechazar vacíos, coma y valores fuera de rango con avisos claros.
   Motivo: La historia exige validación visible y consistente en los bordes de la regla para que el estudiante sepa exactamente qué dato necesita corregir.

2. Pregunta: ¿Cómo debe decidir la app si una materia ya existe cuando el nombre se escribe con diferencias de mayúsculas o espacios extra?
   Respuesta: Tratar nombres equivalentes si se ignoran espacios al inicio/final y mayúsculas/minúsculas; por ejemplo, "Matemáticas" y " matematicas " son la misma materia.
   Motivo: Evita duplicados por formato y mantiene la regla de negocio coherente con la intención del usuario.

3. Pregunta: ¿Dónde deben verse los mensajes de validación cuando el nombre está vacío, la nota es inválida o ya existe una materia con ese nombre?
   Respuesta: Junto al campo correspondiente: nombre vacío y duplicado junto al nombre; nota inválida junto a la nota.
   Motivo: La corrección debe ser inmediata y localizada, sin ocultar la causa en un aviso general.

4. Pregunta: Si el nombre está vacío y la nota también es inválida al mismo tiempo, ¿qué error debe mostrarse primero?
   Respuesta: El error del nombre primero.
   Motivo: El nombre es el dato principal del formulario y el usuario suele corregirlo antes de seguir con la nota.

5. Pregunta: ¿La materia guardada debe seguir existiendo cuando el usuario cierre y vuelva a abrir la aplicación?
   Respuesta: Sí, la materia debe conservarse entre sesiones y aparecer en la lista al volver.
   Motivo: La historia incluye explícitamente el escenario de conservar los datos.

6. Pregunta: ¿Cuando el nombre tiene espacios al inicio o al final, debe aceptarse tras recortarlos o rechazarse como inválido?
   Respuesta: Se recorta antes de validar; si después queda vacío, se considera nombre vacío y se avisa.
   Motivo: Permite una entrada más tolerante sin perder la regla de que el nombre requerido no puede quedar en blanco.

7. Pregunta: ¿La nota debe ignorar espacios al inicio y al final antes de validar?
   Respuesta: Sí, los espacios al inicio y al final se ignoran antes de evaluar la nota.
   Motivo: Hace la entrada más amigable sin cambiar el formato válido ni la lógica de validación.

8. Pregunta: ¿La coma decimal debe aceptarse como válido o debe rechazarse como nota inválida?
   Respuesta: La coma se rechaza y se muestra el mismo mensaje de nota inválida; no se corrige automáticamente.
   Motivo: La historia define un formato claro con punto decimal y evita suposiciones ocultas que cambien la entrada del usuario.

9. Pregunta: ¿La app debe ignorar mayúsculas y espacios extras al comparar nombres para detectar una materia duplicada?
   Respuesta: Sí, la app normaliza el nombre para comparar mayúsculas y espacios en los extremos, y considera duplicada la materia si el nombre normalizado ya existe.
   Motivo: Esto evita copias por formato y mantiene la intención del usuario: no duplicar una misma materia por pequeñas diferencias de escritura.

10. Pregunta: ¿La nota debe rechazar automáticamente la coma decimal o debe convertirse a punto antes de validar?
   Respuesta: La coma se rechaza y se muestra el mismo mensaje de nota inválida; no se convierte automáticamente.
   Motivo: La validación debe ser explícita y consistente con el formato permitido, evitando conversiones ocultas que confundan al usuario.

11. Pregunta: ¿Debe mostrarse el error del nombre antes que el de la nota si ambos están vacíos o inválidos a la vez?
   Respuesta: Sí, el error del nombre tiene prioridad y se muestra primero.
   Motivo: El nombre es el dato principal del formulario y es más natural corregirlo antes que la nota cuando ambos faltan o son inválidos.

12. Pregunta: ¿Qué textos exactos deben mostrar los avisos de validación?
   Respuesta: El nombre vacío debe decir "Escribe el nombre de la materia."; la nota vacía o inválida debe decir "Escribe una nota entre 0 y 20 con hasta dos decimales."; la materia duplicada debe decir "Ya tienes una materia con ese nombre.".
   Motivo: Los mensajes deben ser claros, consistentes y directamente útiles para que el estudiante corrija el dato correcto.

13. Pregunta: ¿Dónde aparece el aviso de materia duplicada?
   Respuesta: Junto al campo del nombre, igual que el aviso de nombre vacío.
   Motivo: La corrección debe ocurrir en el elemento asociado al dato y no en un bloque genérico del formulario.

14. Pregunta: ¿Cómo se manejan los espacios en la nota y la coma decimal?
   Respuesta: Se ignoran los espacios al inicio y al final de la nota; la coma se rechaza con el mismo mensaje de nota inválida.
   Motivo: Esto establece una regla clara para la entrada del estudiante y evita aceptar formatos ambiguos.
