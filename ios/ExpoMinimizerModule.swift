import ExpoModulesCore
import UIKit

public class ExpoMinimizerModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoMinimizer")

    // Synchronous function to minimize app immediately
    Function("goBack") {
      minimizeApp()
    }

    // Async function with Promise
    AsyncFunction("goBackAsync") { (promise: Promise) in
      DispatchQueue.main.async {
        self.minimizeApp()
        promise.resolve(true)
      }
    }

    // Function with delay option
    AsyncFunction("goBackWithDelay") { (delayMs: Int, promise: Promise) in
      DispatchQueue.main.asyncAfter(deadline: .now() + .milliseconds(delayMs)) {
        self.minimizeApp()
        promise.resolve(true)
      }
    }

    // 🆕 NEW FEATURES
    
    // Check if minimizing is possible
    AsyncFunction("canMinimize") { (promise: Promise) in
      let canMinimize = UIApplication.shared.applicationState == .active
      promise.resolve(canMinimize)
    }

    // Try to open specific app
    AsyncFunction("goBackToApp") { (bundleId: String, promise: Promise) in
      DispatchQueue.main.async {
        let success = self.openSpecificApp(bundleId: bundleId)
        promise.resolve(success)
      }
    }

    // Check if app is in background
    Function("isAppInBackground") { () -> Bool in
      return UIApplication.shared.applicationState != .active
    }

    // Get app state info
    AsyncFunction("getAppState") { (promise: Promise) in
      let state = self.getApplicationState()
      promise.resolve(state)
    }

    // Minimize to home screen specifically
    AsyncFunction("minimizeToHome") { (promise: Promise) in
      DispatchQueue.main.async {
        self.minimizeToHomeScreen()
        promise.resolve(true)
      }
    }

    // Open app settings
    AsyncFunction("openAppSettings") { (promise: Promise) in
      DispatchQueue.main.async {
        let success = self.openAppSettings()
        promise.resolve(success)
      }
    }

    // Check if URL scheme is available
    AsyncFunction("canOpenURL") { (urlString: String, promise: Promise) in
      DispatchQueue.main.async {
        guard let url = URL(string: urlString) else {
          promise.resolve(false)
          return
        }
        let canOpen = UIApplication.shared.canOpenURL(url)
        promise.resolve(canOpen)
      }
    }

    // Events
    Events("onAppStateChange")
  }

  private func minimizeApp() {
    DispatchQueue.main.async {
      // Use UIApplication suspend method
      UIApplication.shared.perform(#selector(NSXPCConnection.suspend))
    }
  }

  private func openSpecificApp(bundleId: String) -> Bool {
    // Try different URL schemes
    let schemes = [
      "\(bundleId)://",
      "https://apps.apple.com/app/id\(bundleId)",
      "itms-apps://itunes.apple.com/app/id\(bundleId)"
    ]
    
    for scheme in schemes {
      if let url = URL(string: scheme) {
        if UIApplication.shared.canOpenURL(url) {
          UIApplication.shared.open(url, options: [:], completionHandler: nil)
          return true
        }
      }
    }
    return false
  }

  private func getApplicationState() -> [String: Any] {
    let state = UIApplication.shared.applicationState
    let stateString: String
    
    switch state {
    case .active:
      stateString = "active"
    case .background:
      stateString = "background"
    case .inactive:
      stateString = "inactive"
    @unknown default:
      stateString = "unknown"
    }
    
    return [
      "state": stateString,
      "isActive": state == .active,
      "isBackground": state == .background,
      "isInactive": state == .inactive
    ]
  }

  private func minimizeToHomeScreen() {
    // Same as minimizeApp for iOS
    UIApplication.shared.perform(#selector(NSXPCConnection.suspend))
  }

  private func openAppSettings() -> Bool {
    if let settingsUrl = URL(string: UIApplication.openSettingsURLString) {
      if UIApplication.shared.canOpenURL(settingsUrl) {
        UIApplication.shared.open(settingsUrl, completionHandler: nil)
        return true
      }
    }
    return false
  }
}