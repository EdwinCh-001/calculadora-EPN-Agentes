jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

import AsyncStorage from '@react-native-async-storage/async-storage';

import { loadSubjects, saveSubjects } from '../src/storage/subjects-storage';

describe('subjects storage', () => {
  beforeEach(async () => {
    await AsyncStorage.clear();
  });

  it('persists and loads subjects from storage', async () => {
    const subjects = [
      { id: '1', name: 'Matemáticas', noteInHundredths: 1500 },
      { id: '2', name: 'Historia', noteInHundredths: 1800 },
    ];

    await saveSubjects(subjects);
    await expect(loadSubjects()).resolves.toEqual(subjects);
  });

  it('returns an empty list when the storage is empty', async () => {
    await expect(loadSubjects()).resolves.toEqual([]);
  });
});
