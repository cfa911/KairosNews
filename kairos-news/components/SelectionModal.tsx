// components/SelectionModal.js
import { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

interface SelectionModalProps {
    visible: boolean;
    onClose: () => void;
    onSelect: (option: string) => void;
    title?: string;
    options?: string[];
  }
  
  const SelectionModal: React.FC<SelectionModalProps> = ({ 
    visible, 
    onClose, 
    onSelect,
    title = "Select an Option",
    options = Array.from({length: 9}, (_, i) => `Option ${i+1}`)
  }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
    const handleSelect = (option: string) => {
      setSelectedOption(option);
      onSelect(option);
      onClose();
    };
  

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>{title}</Text>
          
          <ScrollView contentContainerStyle={styles.optionsContainer}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={`option-${index}`}
                style={[
                  styles.option,
                  selectedOption === option && styles.selectedOption
                ]}
                onPress={() => handleSelect(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
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
    maxHeight: '45%',
    borderWidth: 1,
    borderColor: '#2d2d3a',
    maxWidth: '80%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#ffffff',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  option: {
    backgroundColor: '#2d2d3a',
    borderRadius: 8,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3d3d4a',
  },
  selectedOption: {
    backgroundColor: '#13ed8c',
    borderColor: '#13ed8c',
  },
  optionText: {
    color: '#ffffff',
    textAlign: 'center',
    padding: 10,
  },
  buttonContainer: {
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#2d2d3a',
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#3d3d4a',
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default SelectionModal;