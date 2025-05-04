// components/DateRangeModal.js
import { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

interface DateRangeModalProps {
  visible: boolean;
  onClose: () => void;
  onDateSelect: (dates: { startDate: string; endDate: string }) => void;
}

const DateRangeModal: React.FC<DateRangeModalProps> = ({ visible, onClose, onDateSelect }) => {
  const [startYear, setStartYear] = useState(2020);
  const [startMonth, setStartMonth] = useState(1);
  const [endYear, setEndYear] = useState(2024);
  const [endMonth, setEndMonth] = useState(12);

  const years = Array.from({ length: 5 }, (_, i) => 2020 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const handleConfirm = () => {
    const format = (year: number, month: number): string => `${year}/${month.toString().padStart(2, '0')}`;
    onDateSelect({
      startDate: format(startYear, startMonth),
      endDate: format(endYear, endMonth),
    });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Escolha o intervalo face a noticia</Text>
          <View style={styles.dateContainer}>
            <View style={styles.dateSection}>
              <Text style={styles.sectionTitle}>Data de Inicio</Text>
              <ScrollView style={styles.pickerContainer} showsVerticalScrollIndicator={false}>
                <Text style={styles.pickerLabel}>Ano Inicial:</Text>
                {years.map(year => (
                  <TouchableOpacity
                    key={`start-${year}`}
                    style={[styles.option, startYear === year && styles.selectedOption]}
                    onPress={() => setStartYear(year)}
                  >
                    <Text style={styles.optionText}>{year}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <ScrollView style={styles.pickerContainer} showsVerticalScrollIndicator={false}>
                <Text style={styles.pickerLabel}>Mês Incial:</Text>
                {months.map(month => (
                  <TouchableOpacity
                    key={`start-${month}`}
                    style={[styles.option, startMonth === month && styles.selectedOption]}
                    onPress={() => setStartMonth(month)}
                  >
                    <Text style={styles.optionText}>{month.toString().padStart(2, '0')}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.dateSection}>
              <Text style={styles.sectionTitle}>Data de Fim</Text>
              <ScrollView style={styles.pickerContainer} showsVerticalScrollIndicator={false}>
                <Text style={styles.pickerLabel}>Ano Final:</Text>
                {years.map(year => (
                  <TouchableOpacity
                    key={`end-${year}`}
                    style={[styles.option, endYear === year && styles.selectedOption]}
                    onPress={() => setEndYear(year)}
                  >
                    <Text style={styles.optionText}>{year}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <ScrollView style={styles.pickerContainer} showsVerticalScrollIndicator={false}>
                <Text style={styles.pickerLabel}>Mês Final:</Text>
                {months.map(month => (
                  <TouchableOpacity
                    key={`end-${month}`}
                    style={[styles.option, endMonth === month && styles.selectedOption]}
                    onPress={() => setEndMonth(month)}
                  >
                    <Text style={styles.optionText}>{month.toString().padStart(2, '0')}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContent: {
    margin: 20,
    backgroundColor: '#1e1e2d',
    borderRadius: 12,
    padding: 20,
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: '#2d2d3a',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#ffffff',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateSection: {
    flex: 1,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
    color: '#ffffff',
  },
  pickerContainer: {
    maxHeight: 150,
    marginBottom: 15,
  },
  pickerLabel: {
    fontWeight: '500',
    marginBottom: 5,
    color: '#a0a0a0',
  },
  option: {
    padding: 10,
    marginVertical: 2,
    borderRadius: 6,
    backgroundColor: '#2d2d3a',
  },
  selectedOption: {
    backgroundColor: '#13ed8c',
  },
  optionText: {
    textAlign: 'center',
    color: '#ffffff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#2d2d3a',
    padding: 12,
    borderRadius: 6,
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#3d3d4a',
  },
  confirmButton: {
    backgroundColor: '#13ed8c',
    padding: 12,
    borderRadius: 6,
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default DateRangeModal;