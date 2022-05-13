import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { fontSize } from '../../theme';
import borders from '../../theme/borders';
import colors from '../../theme/colors';

interface Props extends TouchableOpacityProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'alternative';
}

const MainButton = ({ text, variant = 'primary', ...rest }: Props) => {
  const variantStyle = styles[variant];
  const textVariantStyle = styles[`${variant}Text`];

  return (
    <TouchableOpacity style={[styles.button, variantStyle]} {...rest}>
      <Text style={[styles.buttonText, textVariantStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 5,
    borderRadius: borders.normalRadius,
    width: 250,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: fontSize.large,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  alternative: {
    backgroundColor: colors.white,
  },

  primaryText: {
    color: colors.white,
  },

  secondaryText: {
    color: colors.white,
  },

  alternativeText: {
    color: colors.primary,
  },
});
