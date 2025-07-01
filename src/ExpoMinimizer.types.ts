export type ExpoMinimizerModuleEvents = {
  onAppStateChange: (params: AppStateChangeEvent) => void;
};

export type AppStateChangeEvent = {
  state: 'active' | 'background' | 'inactive';
  timestamp: number;
};

export type RunningApp = {
  processName: string;
  pid: number;
  importance: number;
  isForeground: boolean;
};

export type AppState = {
  state: string;
  isActive: boolean;
  isBackground: boolean;
  isInactive: boolean;
};

export type MinimizerResult = {
  success: boolean;
  error?: string;
};

// Remove WebView related types since we don't need them for minimizer
export type ExpoMinimizerViewProps = {
  style?: any; // Keep minimal for compatibility
};