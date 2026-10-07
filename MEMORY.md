# MEMORY.md — Calculadora de Supletorio
Estado del trabajo entre sesiones. Máximo ~50 líneas. 

## Estado actual
- T1 de la spec 001 completada: la validación del nombre y la nota quedó implementada y probada.
- T2 de la spec 001 completada: la normalización ignora mayúsculas, acentos y espacios extra y se rechazan duplicados con el mensaje solicitado.
- Las pruebas cubren nombre vacío, nota vacía, coma decimal, espacios alrededor, rango y mensajes literales exactos.

## Próximos pasos
- Revisar la siguiente tarea pendiente en tasks.md: T3, validación exacta del rango y la precisión de la nota.
- Mantener el orden de dependencia definido en tasks.md y parar tras verificar la tarea actual.