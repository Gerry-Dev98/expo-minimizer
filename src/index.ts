import ExpoMinimizerModule from './ExpoMinimizerModule';
import { EventSubscription } from 'expo-modules-core';
import { AppStateChangeEvent, RunningApp, AppState } from './ExpoMinimizer.types';

// Main minimizer functions
export function goBack(): void {
  return ExpoMinimizerModule.goBack();
}

export async function goBackAsync(): Promise<boolean> {
  return await ExpoMinimizerModule.goBackAsync();
}

export async function goBackWithDelay(delayMs: number): Promise<boolean> {
  return await ExpoMinimizerModule.goBackWithDelay(delayMs);
}

// 🆕 NEW FUNCTIONS

// Check capabilities
export async function canMinimize(): Promise<boolean> {
  return await ExpoMinimizerModule.canMinimize();
}

export function isAppInBackground(): boolean {
  return ExpoMinimizerModule.isAppInBackground();
}

// App switching
export async function goBackToApp(packageNameOrBundleId: string): Promise<boolean> {
  return await ExpoMinimizerModule.goBackToApp(packageNameOrBundleId);
}

export async function minimizeToHome(): Promise<boolean> {
  return await ExpoMinimizerModule.minimizeToHome();
}

// Platform specific functions
export async function getRunningApps(): Promise<RunningApp[]> {
  try {
    return await ExpoMinimizerModule.getRunningApps();
  } catch {
    return []; // Return empty array for iOS
  }
}

export async function getAppState(): Promise<AppState | null> {
  try {
    return await ExpoMinimizerModule.getAppState();
  } catch {
    return null; // Return null for Android
  }
}

export async function forceFinish(): Promise<boolean> {
  try {
    return await ExpoMinimizerModule.forceFinish();
  } catch {
    return false; // Not available on iOS
  }
}

export async function openAppSettings(): Promise<boolean> {
  try {
    return await ExpoMinimizerModule.openAppSettings();
  } catch {
    return false; // Not available on Android
  }
}

export async function canOpenURL(url: string): Promise<boolean> {
  try {
    return await ExpoMinimizerModule.canOpenURL(url);
  } catch {
    return false; // Not available on Android
  }
}

// Event subscription
export function addAppStateListener(
  listener: (event: AppStateChangeEvent) => void
): EventSubscription {
  return ExpoMinimizerModule.addListener('onAppStateChange', listener);
}

// Utility functions
export async function smartGoBack(fallbackPackage?: string): Promise<boolean> {
  if (!(await canMinimize())) {
    return false;
  }

  if (fallbackPackage) {
    const success = await goBackToApp(fallbackPackage);
    if (success) return true;
  }

  await goBackAsync();
  return true;
}

export async function goBackWithFallback(
  primaryPackage: string,
  fallbackToHome: boolean = true
): Promise<boolean> {
  // Try to open specific app first
  const success = await goBackToApp(primaryPackage);
  if (success) return true;

  // Fallback to home screen or regular minimize
  if (fallbackToHome) {
    return await minimizeToHome();
  } else {
    return await goBackAsync();
  }
}

// Re-export types
export * from './ExpoMinimizer.types';

// Export module for advanced usage
export { default as ExpoMinimizerModule } from './ExpoMinimizerModule';