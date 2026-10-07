export interface Subject {
  id: string;
  name: string;
  noteInHundredths: number;
}

export function formatSubjectNote(valueInHundredths: number): string {
  return (valueInHundredths / 100).toFixed(2);
}
