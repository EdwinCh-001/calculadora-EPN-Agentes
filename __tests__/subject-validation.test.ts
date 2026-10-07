import {
    isDuplicateSubjectName,
    normalizeSubjectName,
    parseAndValidateGrade,
    validateSubjectName,
} from '../src/domain/subject-validation';

describe('subject validation', () => {
  it('rejects empty subject names', () => {
    expect(validateSubjectName('')).toEqual({
      valid: false,
      error: 'Escribe el nombre de la materia.',
    });

    expect(validateSubjectName('   ')).toEqual({
      valid: false,
      error: 'Escribe el nombre de la materia.',
    });
  });

  it('accepts subject names with surrounding spaces after trimming', () => {
    expect(validateSubjectName('  Matemáticas  ')).toEqual({ valid: true });
  });

  it('normalizes names for comparison and duplicate detection', () => {
    expect(normalizeSubjectName('  Matemáticas  ')).toBe('matemáticas');
    expect(
      isDuplicateSubjectName(
        [{ id: '1', name: 'Matemáticas', noteInHundredths: 1500 }],
        ' matematicas '
      )
    ).toBe(true);
  });

  it('rejects empty or invalid grades with the literal spec message', () => {
    expect(parseAndValidateGrade('')).toEqual({
      valid: false,
      error: 'Escribe una nota entre 0 y 20 con hasta dos decimales.',
    });

    expect(parseAndValidateGrade('  ')).toEqual({
      valid: false,
      error: 'Escribe una nota entre 0 y 20 con hasta dos decimales.',
    });

    expect(parseAndValidateGrade('21')).toEqual({
      valid: false,
      error: 'Escribe una nota entre 0 y 20 con hasta dos decimales.',
    });

    expect(parseAndValidateGrade('15,12')).toEqual({
      valid: false,
      error: 'Escribe una nota entre 0 y 20 con hasta dos decimales.',
    });

    expect(parseAndValidateGrade('15.123')).toEqual({
      valid: false,
      error: 'Escribe una nota entre 0 y 20 con hasta dos decimales.',
    });
  });

  it('accepts valid grades in the allowed range', () => {
    expect(parseAndValidateGrade('0.00')).toEqual({
      valid: true,
      valueInHundredths: 0,
    });

    expect(parseAndValidateGrade('20.00')).toEqual({
      valid: true,
      valueInHundredths: 2000,
    });

    expect(parseAndValidateGrade(' 15.12 ')).toEqual({
      valid: true,
      valueInHundredths: 1512,
    });
  });
});
