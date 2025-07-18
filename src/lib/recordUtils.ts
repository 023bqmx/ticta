// Utils for managing saved records in localStorage
export interface SavedRecord {
  id: string;
  type: 'student' | 'employee' | 'general';
  typeName: string;
  fullName: string;
  savedDate: string;
  savedTime: string;
  data: any;
}

const STORAGE_KEY = 'saved_records';

export const saveRecord = (record: Omit<SavedRecord, 'id'>): void => {
  const existingRecords = getSavedRecords();
  const newRecord: SavedRecord = {
    ...record,
    id: Date.now().toString(),
  };
  
  const updatedRecords = [newRecord, ...existingRecords];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords));
};

export const getSavedRecords = (): SavedRecord[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading saved records:', error);
    return [];
  }
};

export const deleteRecord = (id: string): void => {
  const existingRecords = getSavedRecords();
  const updatedRecords = existingRecords.filter(record => record.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords));
};

export const getRecordById = (id: string): SavedRecord | undefined => {
  const records = getSavedRecords();
  return records.find(record => record.id === id);
};

export const updateRecord = (id: string, updatedData: any): void => {
  const existingRecords = getSavedRecords();
  const updatedRecords = existingRecords.map(record => 
    record.id === id 
      ? { ...record, data: updatedData, savedDate: new Date().toISOString().split('T')[0], savedTime: new Date().toTimeString().split(' ')[0].substring(0, 5) }
      : record
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords));
};