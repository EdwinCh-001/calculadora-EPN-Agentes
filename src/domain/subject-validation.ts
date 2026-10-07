import type { Subject } from './subject';

export const SUBJECT_NAME_ERROR = 'Escribe el nombre de la materia.';
export const GRADE_ERROR = 'Escribe una nota entre 0 y 20 con hasta dos decimales.';

export function normalizeSubjectName(value: string): string {
  return value.trim().toLowerCase();
}

export function validateSubjectName(value: string): { valid: true } | { valid: false; error: string } {
  const trimmed = value.trim();

  if (!trimmed) {
    return { valid: false, error: SUBJECT_NAME_ERROR };
  }

  return { valid: true };
}

export function isDuplicateSubjectName(subjects: Subject[], candidateName: string): boolean {
  const normalizedCandidate = normalizeSubjectName(candidateName)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  return subjects.some((subject) => {
    const normalizedSubject = normalizeSubjectName(subject.name)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    return normalizedSubject === normalizedCandidate;
  });
}

export function parseAndValidateGrade(value: string): { valid: true; valueInHundredths: number } | { valid: false; error: string } {
  const trimmed = value.trim();

  if (!trimmed) {
    return { valid: false, error: GRADE_ERROR };
  }

  if (trimmed.includes(',')) {
    return { valid: false, error: GRADE_ERROR };
  }

  if (!/^(?:\d+|\d+\.\d{1,2})$/.test(trimmed)) {
    return { valid: false, error: GRADE_ERROR };
  }

  const numericValue = Number(trimmed);

  if (!Number.isFinite(numericValue) || numericValue < 0 || numericValue > 20) {
    return { valid: false, error: GRADE_ERROR };
  }

  return {
    valid: true,
    valueInHundredths: Math.round((numericValue + Number.EPSILON) * 100),
  };
}
