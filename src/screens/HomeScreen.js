// src/screens/HomeScreen.js
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import theme from '../styles/theme';

export default function HomeScreen({ navigation }) {
    // placeholder user; later will come from AuthContext / backend
    const user = { name: 'Demo User' };

    function go(screen) {
        // for now navigate if screen exists; else alert
        navigation.navigate(screen);
    }

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Welcome back,</Text>
                        <Text style={styles.username}>{user.name}</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={() => navigation.replace('Login')}
                    >
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>

                    <View style={styles.grid}>
                        <TouchableOpacity style={styles.card} onPress={() => go('BuildingSelect')}>
                            <Text style={styles.cardTitle}>Select Building</Text>
                            <Text style={styles.cardMeta}>Choose building → customers</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.card} onPress={() => go('CustomerSelect')}>
                            <Text style={styles.cardTitle}>Customers</Text>
                            <Text style={styles.cardMeta}>Search / add customer</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.card} onPress={() => go('ProductSelect')}>
                            <Text style={styles.cardTitle}>Products</Text>
                            <Text style={styles.cardMeta}>Add tea / coffee</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.card} onPress={() => go('OrderSummary')}>
                            <Text style={styles.cardTitle}>Orders / Cart</Text>
                            <Text style={styles.cardMeta}>Review & finalize</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.card} onPress={() => go('Reports')}>
                            <Text style={styles.cardTitle}>Reports</Text>
                            <Text style={styles.cardMeta}>(coming soon)</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Today's summary</Text>
                    <View style={[styles.summaryCard, theme.shadow]}>
                        <Text style={styles.summaryText}>Orders: 0</Text>
                        <Text style={styles.summaryText}>Pending: 0</Text>
                        <Text style={styles.summaryText}>Amount: ₹0.00</Text>
                    </View>
                </View>

                <View style={{ height: 32 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    container: {
        padding: theme.spacing.lg,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    greeting: {
        color: theme.colors.muted,
        fontSize: 14,
    },
    username: {
        color: theme.colors.text,
        fontSize: 20,
        fontWeight: '700',
    },
    logoutButton: {
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: theme.radius.sm,
        borderWidth: 1,
        borderColor: '#EEE',
    },
    logoutText: {
        color: theme.colors.primary,
        fontWeight: '600',
    },
    section: {
        marginTop: theme.spacing.lg,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: theme.colors.text,
        marginBottom: theme.spacing.sm,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        backgroundColor: theme.colors.card,
        padding: theme.spacing.md,
        borderRadius: theme.radius.md,
        marginBottom: theme.spacing.sm,
        ...theme.shadow,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: theme.colors.text,
    },
    cardMeta: {
        color: theme.colors.muted,
        marginTop: 6,
        fontSize: 12,
    },
    summaryCard: {
        backgroundColor: theme.colors.card,
        padding: theme.spacing.md,
        borderRadius: theme.radius.md,
        ...theme.shadow,
    },
    summaryText: {
        color: theme.colors.text,
        fontWeight: '600',
        marginBottom: 6,
    },
});
