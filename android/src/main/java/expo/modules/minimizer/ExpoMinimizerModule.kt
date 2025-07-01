package expo.modules.minimizer

import android.app.Activity
import android.app.ActivityManager
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.Promise

class ExpoMinimizerModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoMinimizer")

    // Synchronous function to minimize app immediately
    Function("goBack") {
      minimizeApp()
    }

    // Async function with Promise for error handling
    AsyncFunction("goBackAsync") { promise: Promise ->
      try {
        minimizeApp()
        promise.resolve(true)
      } catch (e: Exception) {
        promise.reject("MINIMIZE_ERROR", "Failed to minimize app: ${e.message}", e)
      }
    }

    // Function with delay option
    AsyncFunction("goBackWithDelay") { delayMs: Int, promise: Promise ->
      try {
        val handler = android.os.Handler(android.os.Looper.getMainLooper())
        handler.postDelayed({
          try {
            minimizeApp()
            promise.resolve(true)
          } catch (e: Exception) {
            promise.reject("MINIMIZE_ERROR", "Failed to minimize app: ${e.message}", e)
          }
        }, delayMs.toLong())
      } catch (e: Exception) {
        promise.reject("DELAY_ERROR", "Failed to schedule minimize: ${e.message}", e)
      }
    }

    // 🆕 NEW FEATURES
    
    // Check if minimizing is possible
    AsyncFunction("canMinimize") { promise: Promise ->
      try {
        val activity = appContext.activityProvider?.currentActivity
        val canMinimize = activity != null && !isAppInBackground()
        promise.resolve(canMinimize)
      } catch (e: Exception) {
        promise.reject("CHECK_ERROR", "Failed to check minimize capability: ${e.message}", e)
      }
    }

    // Try to open specific app
    AsyncFunction("goBackToApp") { packageName: String, promise: Promise ->
      try {
        val success = openSpecificApp(packageName)
        promise.resolve(success)
      } catch (e: Exception) {
        promise.reject("OPEN_APP_ERROR", "Failed to open app: ${e.message}", e)
      }
    }

    // Check if app is in background
    Function("isAppInBackground") {
      isAppInBackground()
    }

    // Get list of running apps
    AsyncFunction("getRunningApps") { promise: Promise ->
      try {
        val apps = getRunningApps()
        promise.resolve(apps)
      } catch (e: Exception) {
        promise.reject("RUNNING_APPS_ERROR", "Failed to get running apps: ${e.message}", e)
      }
    }

    // Minimize to home screen specifically
    AsyncFunction("minimizeToHome") { promise: Promise ->
      try {
        minimizeToHomeScreen()
        promise.resolve(true)
      } catch (e: Exception) {
        promise.reject("HOME_ERROR", "Failed to minimize to home: ${e.message}", e)
      }
    }

    // Force finish current activity
    AsyncFunction("forceFinish") { promise: Promise ->
      try {
        forceFinishActivity()
        promise.resolve(true)
      } catch (e: Exception) {
        promise.reject("FINISH_ERROR", "Failed to finish activity: ${e.message}", e)
      }
    }

    // Events
    Events("onAppStateChange")
  }

  private fun minimizeApp() {
    val activity = appContext.activityProvider?.currentActivity
    if (activity != null) {
      // Move task to background - this is the key MetaMask approach
      activity.moveTaskToBack(true)
    } else {
      throw Exception("No current activity available")
    }
  }

  private fun openSpecificApp(packageName: String): Boolean {
    return try {
      val activity = appContext.activityProvider?.currentActivity
      val packageManager = activity?.packageManager
      
      if (activity != null && packageManager != null) {
        val intent = packageManager.getLaunchIntentForPackage(packageName)
        if (intent != null) {
          intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TOP)
          activity.startActivity(intent)
          true
        } else {
          // Try to open app store if app not installed
          val marketIntent = Intent(Intent.ACTION_VIEW, Uri.parse("market://details?id=$packageName"))
          marketIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
          activity.startActivity(marketIntent)
          false
        }
      } else {
        false
      }
    } catch (e: Exception) {
      false
    }
  }

  private fun isAppInBackground(): Boolean {
    return try {
      val activity = appContext.activityProvider?.currentActivity
      if (activity != null) {
        val activityManager = activity.getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
        val runningAppProcesses = activityManager.runningAppProcesses
        
        runningAppProcesses?.find { 
          it.processName == activity.packageName 
        }?.importance != ActivityManager.RunningAppProcessInfo.IMPORTANCE_FOREGROUND
      } else {
        true
      }
    } catch (e: Exception) {
      true
    }
  }

  private fun getRunningApps(): List<Map<String, Any>> {
    return try {
      val activity = appContext.activityProvider?.currentActivity
      if (activity != null) {
        val activityManager = activity.getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
        val runningApps = activityManager.runningAppProcesses
        
        runningApps?.map { processInfo ->
          mapOf(
            "processName" to processInfo.processName,
            "pid" to processInfo.pid,
            "importance" to processInfo.importance,
            "isForeground" to (processInfo.importance == ActivityManager.RunningAppProcessInfo.IMPORTANCE_FOREGROUND)
          )
        } ?: emptyList()
      } else {
        emptyList()
      }
    } catch (e: Exception) {
      emptyList()
    }
  }

  private fun minimizeToHomeScreen() {
    val activity = appContext.activityProvider?.currentActivity
    if (activity != null) {
      val homeIntent = Intent(Intent.ACTION_MAIN).apply {
        addCategory(Intent.CATEGORY_HOME)
        flags = Intent.FLAG_ACTIVITY_NEW_TASK
      }
      activity.startActivity(homeIntent)
    } else {
      throw Exception("No current activity available")
    }
  }

  private fun forceFinishActivity() {
    val activity = appContext.activityProvider?.currentActivity
    if (activity != null) {
      activity.finishAffinity()
    } else {
      throw Exception("No current activity available")
    }
  }
}