// src/screens/LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Image,
} from 'react-native';
import theme from '../styles/theme';

export default function LoginScreen({ navigation }) {
  const [mobile, setMobile] = useState(''); // mobile only
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function onLoginPress() {
    setError('');
    // basic validation for now
    if (!mobile.trim()) {
      setError('Please enter mobile number');
      return;
    }
    if (mobile.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!password) {
      setError('Please enter password');
      return;
    }

    // simulate loading and navigate to main tabbed app (actual auth with backend later)
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // TODO: replace with real auth flow (Laravel) later
      navigation.replace('Main');
    }, 650);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: null })}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.brandWrap}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>BookBill POS</Text>
            <Text style={styles.subtitle}>Quick orders — Tea, Coffee & more</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
              style={styles.input}
              placeholder="9123456780"
              placeholderTextColor={theme.colors.muted}
              value={mobile}
              onChangeText={(t) => setMobile(t.replace(/[^0-9]/g, ''))}
              keyboardType="number-pad"
              maxLength={10}
              returnKeyType="next"
            />

            <Text style={[styles.label, { marginTop: theme.spacing.sm }]}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              placeholderTextColor={theme.colors.muted}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              returnKeyType="done"
              onSubmitEditing={onLoginPress}
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={onLoginPress}
              activeOpacity={0.85}
              disabled={loading}
            >
              <Text style={styles.buttonText}>{loading ? 'Signing in...' : 'Sign In'}</Text>
            </TouchableOpacity>

            {/* Register as a full-width button below Sign In */}
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => navigation.navigate('Register')}
              activeOpacity={0.85}
            >
              <Text style={styles.secondaryButtonText}>Create an account</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.skipLink}
              onPress={() => navigation.replace('Main')}
            >
              <Text style={styles.skipText}>Skip for now (demo)</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Powered by BookBill — Theme #53629E</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  inner: {
    flex: 1,
    padding: theme.spacing.lg,
    justifyContent: 'space-between',
  },
  brandWrap: {
    alignItems: 'center',
    marginTop: theme.spacing.xl,
  },
  logo: {
    width: 96,
    height: 96,
    marginBottom: theme.spacing.sm,
    tintColor: theme.colors.primary,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.colors.text,
  },
  subtitle: {
    color: theme.colors.muted,
    marginTop: 6,
  },
  form: {
    marginTop: theme.spacing.lg,
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    ...theme.shadow,
  },
  label: {
    fontSize: 13,
    color: theme.colors.muted,
    marginBottom: 6,
  },
  input: {
    height: theme.sizes.inputHeight,
    borderWidth: 1,
    borderColor: '#E7E7F3',
    borderRadius: theme.radius.sm, // small square-like radius from theme
    paddingHorizontal: theme.spacing.md,
    backgroundColor: '#fff',
    color: theme.colors.text,
  },
  button: {
    height: 48,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.md,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  secondaryButton: {
    height: 44,
    borderRadius: theme.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.sm,
    borderWidth: 1,
    borderColor: '#E7E7F3',
    backgroundColor: '#fff',
  },
  secondaryButtonText: {
    color: theme.colors.primary,
    fontWeight: '700',
  },
  errorText: {
    color: theme.colors.danger,
    marginTop: theme.spacing.sm,
  },
  skipLink: {
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  skipText: {
    color: theme.colors.muted,
    textDecorationLine: 'underline',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  footerText: {
    color: theme.colors.muted,
    fontSize: 12,
  },
});
