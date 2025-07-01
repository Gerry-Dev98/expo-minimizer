import { NativeModule, requireNativeModule } from 'expo';

import { ExpoMinimizerModuleEvents, RunningApp, AppState } from './ExpoMinimizer.types';

declare class ExpoMinimizerModule extends NativeModule<ExpoMinimizerModuleEvents> {
  // Synchronous minimize function
  goBack(): void;
  
  // Async minimize with Promise
  goBackAsync(): Promise<boolean>;
  
  // Minimize with delay
  goBackWithDelay(delayMs: number): Promise<boolean>;
  
  // 🆕 New functions
  canMinimize(): Promise<boolean>;
  goBackToApp(packageNameOrBundleId: string): Promise<boolean>;
  isAppInBackground(): boolean;
  getRunningApps(): Promise<RunningApp[]>; // Android only
  getAppState(): Promise<AppState>; // iOS only
  minimizeToHome(): Promise<boolean>;
  forceFinish(): Promise<boolean>; // Android only
  openAppSettings(): Promise<boolean>; // iOS only
  canOpenURL(url: string): Promise<boolean>; // iOS only
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoMinimizerModule>('ExpoMinimizer');