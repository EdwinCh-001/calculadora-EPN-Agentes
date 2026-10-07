- [x] **T1. Preparar el dominio y las pruebas de validación.** RF-01, RF-02, RF-03, RF-04, RF-08, RF-10, RF-11
  - Hecho cuando: la suite de Jest cubre nombre vacío, nota vacía, coma decimal, espacios finales, prioridad del nombre y mensajes literales exactos.

- [x] **T2. Implementar la normalización y detección de duplicados.** RF-05, RF-09
  - Hecho cuando: dos nombres equivalentes al normalizar mayúsculas, acentos y espacios extra se consideran la misma materia y se rechazan con el mensaje literal esperado.

- [ ] **T3. Validar la nota con rango y precisión exacta.** RF-02, RF-03, RF-04, RF-10
  - Hecho cuando: 0.00 y 20.00 son aceptados, 15.123 es rechazado, la coma falla con el mismo error y los espacios iniciales/finales no cambian la validación.

- [ ] **T4. Definir el modelo de materia y cómo se guarda la nota.** RF-06, RF-07
  - Hecho cuando: el dominio de la materia almacena la nota como centésimas enteras y permite representar la misma información sin pérdida ni redondeo.

- [ ] **T5. Implementar la persistencia local.** RF-06, RF-07
  - Hecho cuando: al guardar una materia válida, la lista queda persistida en almacenamiento local y sigue visible tras reiniciar la app.

- [ ] **T6. Construir el formulario y la conexión con la validación.** RF-01, RF-02, RF-05, RF-08, RF-11
  - Hecho cuando: el formulario muestra el error correspondiente junto al campo, y al intentar guardar con datos inválidos no se guarda nada.

- [ ] **T7. Renderizar la lista y el flujo de éxito.** RF-06, RF-07
  - Hecho cuando: una materia válida aparece inmediatamente en la lista y permanece al volver a abrir la app.

- [ ] **T8. Verificación final de la historia.** RF-01 a RF-11
  - Hecho cuando: la lista de verificación confirma cada RF de la spec, incluidos mensajes literales, validación de borde y persistencia de datos.
