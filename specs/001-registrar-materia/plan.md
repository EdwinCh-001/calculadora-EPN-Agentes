# Plan HU-001 — Registrar una materia

## 1. Archivos que se crean o modifican y responsabilidad

- src/domain/subject.ts
  - Define el modelo mínimo de una materia: nombre normalizado y nota almacenada como centésimas enteras.
  - RF cubierto: RF-06, RF-07, RF-09, RF-10.

- src/domain/subject-validation.ts
  - Contiene la lógica pura de validación del nombre y la nota, sin React ni AsyncStorage.
  - RF cubierto: RF-01, RF-02, RF-03, RF-04, RF-05, RF-08, RF-11.

- src/storage/subjects-storage.ts
  - Carga y guarda la lista de materias en almacenamiento local persistente.
  - RF cubierto: RF-06, RF-07.

- app/(pantalla de materias)
  - Presenta el formulario y la lista de materias, y conecta la validación con la interfaz.
  - RF cubierto: RF-01 a RF-11.

- __tests__/subject-validation.test.ts
  - Prueba la validación pura y los casos límite numéricos.
  - RF cubierto: RF-01 a RF-05, RF-08, RF-10, RF-11.

- __tests__/subjects-storage.test.ts
  - Prueba la persistencia básica de la lista y la conservación entre sesiones.
  - RF cubierto: RF-06, RF-07.

## 2. Funciones puras de lógica

- normalizeSubjectName(value: string): string
  - Recorta espacios y normaliza mayúsculas/minúsculas para comparar materias equivalentes.
  - Es la base del duplicado y del guardado consistente.

- validateSubjectName(value: string): { valid: boolean; error?: string }
  - Rechaza nombre vacío tras recorte de espacios y devuelve el mensaje literal de la spec.

- parseAndValidateGrade(value: string): { valid: boolean; valueInHundredths?: number; error?: string }
  - Recorta espacios del inicio/final.
  - Rechaza coma decimal, vacíos y valores fuera de 0 a 20.
  - Acepta solo hasta dos decimales.
  - Devuelve la nota como número entero en centésimas para evitar problemas de precisión numérica.

- isDuplicateSubjectName(list: Subject[], candidateName: string): boolean
  - Compara nombres usando la misma normalización para evitar duplicados por formato.

- addSubject(list: Subject[], name: string, rawNote: string): Subject[] | error
  - Aplica validaciones en orden: nombre, duplicado, nota y guardado final.

## 3. Persistencia

- Almacenamiento persistente local con AsyncStorage.
- Estructura recomendada: un arreglo de materias serializado JSON.
- Se guarda la nota como entero en centésimas (por ejemplo, 15.12 -> 1512).
- Al recuperar, se convierte a la representación visible del usuario para mostrar el valor con punto decimal al leer la nota.
- Las decisiones técnicas relevantes son:
  - Decisión 1: rango y formato de la nota.
  - Decisión 2: comparación de nombres normalizados para duplicado.
  - Decisión 5: conservación entre sesiones.
  - Decisión 7: ignorar espacios al inicio/final de la nota.
  - Decisión 8: rechazar coma decimal.
  - Decisión 9: normalizar nombres para comparación.
  - Decisión 10: no convertir automáticamente la coma.
  - Decisión 11: prioridad del error del nombre.

Alternativa descartada: convertir la coma en punto o permitir un rango más flexible. Se descarta porque la spec exige un formato estricto y se quiere evitar correcciones silenciosas que oculten errores de entrada.

## 4. Algoritmo en pseudocódigo

1. Leer el valor del nombre y la nota del formulario.
2. Recortar espacios del nombre y de la nota.
3. Si el nombre queda vacío, devolver el error literal "Escribe el nombre de la materia.".
4. Normalizar el nombre para comparación.
5. Si ya existe una materia con el mismo nombre normalizado, devolver el error literal "Ya tienes una materia con ese nombre.".
6. Si la nota está vacía, devolver "Escribe una nota entre 0 y 20 con hasta dos decimales.".
7. Si la nota contiene coma, devolver el mismo mensaje literal porque se rechaza.
8. Si el valor no está en [0, 20] o tiene más de dos decimales, devolver el mismo mensaje literal.
9. Convertir la nota a centésimas enteras.
10. Guardar la materia en la lista persistente.
11. Mostrar la materia en la lista con el valor visible según la regla del formulario.

## 5. Cómo se pinta en la interfaz

- La pantalla de materias tiene un formulario simple y una sola pestaña llamada "Materias".
- En orientación vertical, el formulario va primero y la lista de materias debajo.
- En orientación horizontal, el formulario y la lista se muestran en columnas para aprovechar el espacio sin duplicar contenido.
- Los errores aparecen junto al campo correspondiente:
  - nombre vacío y duplicado junto al campo del nombre,
  - nota inválida junto al campo de la nota.
- Al guardar una materia válida, la lista se actualiza inmediatamente y la materia queda disponible al volver a abrir la app.

## 6. Estrategia de pruebas con Jest

- Pruebas unitarias para la validación pura:
  - nombre vacío,
  - nombre con espacios finales,
  - nota vacía,
  - nota fuera de rango,
  - nota con coma,
  - nota con dos decimales válidas,
  - nota 0.00 y 20.00,
  - nota 15.123 como inválida,
  - comparación sin redondeo entre 15.12 y 15.123,
  - materia duplicada con mayúsculas y espacios diferenciados.

- Pruebas de persistencia:
  - guardar una materia válida,
  - conservar la lista al recargar,
  - no guardar una materia si falla la validación.

- Requisito de la estrategia: las pruebas deben verificar los mensajes literales exactos de la spec, no solo el tipo de error.

## 7. Cobertura RF por parte

- RF-01: validación del nombre vacío y mensaje literal.
- RF-02: validación de la nota vacía o fuera de rango.
- RF-03: normalización de espacios alrededor de la nota.
- RF-04: rechazo de coma decimal.
- RF-05: detección de materia duplicada por nombre normalizado.
- RF-06: almacenamiento válido y visibilidad inmediata.
- RF-07: persistencia entre sesiones.
- RF-08: prioridad del error del nombre.
- RF-09: comparación normalizada de nombres para duplicado.
- RF-10: rechazo de coma decimal sin conversión automática.
- RF-11: error del nombre con prioridad sobre la nota.

## 8. Riesgos y decisiones de implementación

- Riesgo principal: comparación de nombres por forma textual sin normalización. Se evita con normalizeSubjectName.
- Riesgo principal: inconsistencia numérica en la nota. Se evita con almacenamiento en centésimas enteras y validación estricta.
- Riesgo principal: mensajes ambiguos para cada campo. Se evita con validación por campo y mensajes literales exactos.
