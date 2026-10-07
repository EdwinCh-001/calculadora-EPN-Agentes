import { useEffect, useState } from 'react';
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import type { Subject } from '@/domain/subject';
import { formatSubjectNote } from '@/domain/subject';
import {
    GRADE_ERROR,
    SUBJECT_NAME_ERROR,
    isDuplicateSubjectName,
    parseAndValidateGrade,
    validateSubjectName,
} from '@/domain/subject-validation';
import { loadSubjects, saveSubjects } from '@/storage/subjects-storage';

export default function MateriasScreen() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [nameError, setNameError] = useState('');
  const [noteError, setNoteError] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    loadSubjects().then((storedSubjects) => {
      if (isMounted) {
        setSubjects(storedSubjects);
        setIsLoaded(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    void saveSubjects(subjects);
  }, [isLoaded, subjects]);

  const handleAddSubject = () => {
    setNameError('');
    setNoteError('');

    const nameValidation = validateSubjectName(name);
    if (!nameValidation.valid) {
      setNameError(SUBJECT_NAME_ERROR);
      return;
    }

    if (isDuplicateSubjectName(subjects, name)) {
      setNameError('Ya tienes una materia con ese nombre.');
      return;
    }

    const noteValidation = parseAndValidateGrade(note);
    if (!noteValidation.valid) {
      setNoteError(GRADE_ERROR);
      return;
    }

    const nextSubject: Subject = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      name: name.trim(),
      noteInHundredths: noteValidation.valueInHundredths,
    };

    setSubjects((currentSubjects) => [nextSubject, ...currentSubjects]);
    setName('');
    setNote('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Materias</Text>

        <View style={styles.formCard}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Ej: Matemáticas"
            autoCapitalize="words"
            style={[styles.input, nameError ? styles.inputError : null]}
            placeholderTextColor="#8a8f98"
          />
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

          <Text style={styles.label}>Nota</Text>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="0.00"
            keyboardType="decimal-pad"
            style={[styles.input, noteError ? styles.inputError : null]}
            placeholderTextColor="#8a8f98"
          />
          {noteError ? <Text style={styles.errorText}>{noteError}</Text> : null}

          <Pressable onPress={handleAddSubject} style={styles.button}>
            <Text style={styles.buttonText}>Guardar</Text>
          </Pressable>
        </View>

        <View style={styles.listSection}>
          <Text style={styles.sectionTitle}>Lista</Text>
          {subjects.length === 0 ? (
            <Text style={styles.emptyState}>Aún no hay materias registradas.</Text>
          ) : (
            subjects.map((subject) => (
              <View key={subject.id} style={styles.subjectRow}>
                <Text style={styles.subjectName}>{subject.name}</Text>
                <Text style={styles.subjectNote}>{formatSubjectNote(subject.noteInHundredths)}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f6fb',
  },
  scrollContent: {
    padding: 20,
    gap: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1d2433',
    marginBottom: 4,
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  label: {
    color: '#263148',
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d9e1ef',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#f9fbff',
    color: '#1d2433',
  },
  inputError: {
    borderColor: '#d94d4d',
  },
  errorText: {
    color: '#d94d4d',
    fontSize: 12,
    marginTop: 6,
    marginBottom: 4,
  },
  button: {
    marginTop: 16,
    backgroundColor: '#2a6ef7',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
  listSection: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1d2433',
    marginBottom: 10,
  },
  emptyState: {
    color: '#6b7280',
    fontSize: 14,
  },
  subjectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#edf1f7',
  },
  subjectName: {
    color: '#1d2433',
    fontSize: 16,
    fontWeight: '600',
  },
  subjectNote: {
    color: '#2a6ef7',
    fontSize: 16,
    fontWeight: '700',
  },
});
