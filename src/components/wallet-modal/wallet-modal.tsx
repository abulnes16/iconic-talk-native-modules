import React from 'react';
import Modal from 'react-native-modal';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Wallet } from '../../modules/IconicModule';

interface WalletModalProps {
  wallet?: Wallet;
  visible: boolean;
  onDismiss: () => void;
}

const WalletModal: React.FC<WalletModalProps> = ({
  wallet,
  visible,
  onDismiss,
}) => {
  return (
    <Modal isVisible={visible}>
      <TouchableWithoutFeedback onPress={onDismiss}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modal}>
        <Text style={styles.walletTitle}>Created wallet</Text>
        <Text style={styles.boldText}>Private Key</Text>
        <Text>{wallet?.privateKey}</Text>
        <Text style={styles.boldText}>Address</Text>
        <Text>{wallet?.address}</Text>
        <Text style={styles.boldText}>Phrase</Text>
        <Text>{wallet?.phrase}</Text>
      </View>
    </Modal>
  );
};

export default WalletModal;

const styles = StyleSheet.create({
  walletTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },

  boldText: {
    fontWeight: 'bold',
    marginVertical: 10,
  },

  modal: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
});
