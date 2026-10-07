import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Subject } from '../domain/subject';

const SUBJECTS_STORAGE_KEY = 'subjects:v1';

export async function loadSubjects(): Promise<Subject[]> {
  try {
    const rawValue = await AsyncStorage.getItem(SUBJECTS_STORAGE_KEY);

    if (!rawValue) {
      return [];
    }

    const parsed = JSON.parse(rawValue) as Subject[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

export async function saveSubjects(subjects: Subject[]): Promise<void> {
  await AsyncStorage.setItem(SUBJECTS_STORAGE_KEY, JSON.stringify(subjects));
}
