// src/screens/RegisterScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import theme from '../styles/theme';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function onRegisterPress() {
    setError('');

    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!mobile.trim()) {
      setError('Please enter mobile number');
      return;
    }
    if (mobile.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!password || password.length < 4) {
      setError('Password must be at least 4 characters');
      return;
    }
    if (password !== cpassword) {
      setError('Passwords do not match');
      return;
    }

    // simulate register
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace('Main'); // enter app
    }, 700);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.inner}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Register to start using BookBill</Text>

          <View style={styles.form}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Your full name"
              placeholderTextColor={theme.colors.muted}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              returnKeyType="next"
            />

            <Text style={[styles.label, { marginTop: theme.spacing.sm }]}>
              Mobile Number
            </Text>
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

            <Text style={[styles.label, { marginTop: theme.spacing.sm }]}>
              Password
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Choose password"
              placeholderTextColor={theme.colors.muted}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              returnKeyType="next"
            />

            <Text style={[styles.label, { marginTop: theme.spacing.sm }]}>
              Confirm Password
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Re-enter password"
              placeholderTextColor={theme.colors.muted}
              secureTextEntry
              value={cpassword}
              onChangeText={setCPassword}
              returnKeyType="done"
              onSubmitEditing={onRegisterPress}
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={onRegisterPress}
              activeOpacity={0.85}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Creating...' : 'Register'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => navigation.replace('Login')}
              activeOpacity={0.85}
            >
              <Text style={styles.secondaryButtonText}>Back to Login</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footerNote}>
            By registering, you agree to our terms.
          </Text>
        </ScrollView>
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
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.muted,
    marginBottom: theme.spacing.lg,
  },
  form: {
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
    borderRadius: theme.radius.sm,
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
  footerNote: {
    marginTop: theme.spacing.md,
    textAlign: 'center',
    color: theme.colors.muted,
  },
});
