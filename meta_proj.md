# Tóm tắt chức năng của proj
_Exported on 7/1/2025 at 09:06:22 GMT+7 from Cursor (1.1.6)_

---

**User**

đầu tiên hãy tọc qua proj và tóm tắt chức năng

---

**Cursor**

Tôi sẽ đọc qua dự án để hiểu chức năng và tóm tắt cho bạn. Hãy bắt đầu với việc xem các file cấu hình chính và documentation.

Dựa trên việc phân tích cấu trúc dự án và các file quan trọng, đây là **tóm tắt chức năng của MetaMask Mobile**:

## 🚀 **Tổng quan dự án**

**MetaMask Mobile** là ứng dụng ví cryptocurrency di động chính thức của MetaMask, được phát triển bằng **React Native** để hỗ trợ cả iOS và Android. Đây là một ví phi tập trung (non-custodial wallet) cho phép người dùng tương tác với blockchain Ethereum và các mạng tương thích.

## 🔧 **Chức năng chính**

### **1. Quản lý Ví & Tài khoản**
- **Tạo/Import ví** từ Secret Recovery Phrase (SRP) hoặc private key
- **Quản lý nhiều tài khoản** trong cùng một ví
- **Backup và khôi phục ví** an toàn
- **Hardware wallet support** (Ledger, Keystone/QR-based wallets)
- **Snap Keyring** để mở rộng loại tài khoản hỗ trợ

### **2. Giao dịch & Token**
- **Gửi/nhận ETH và ERC-20 tokens**
- **Token detection** và quản lý tự động
- **NFT support** (ERC-721, ERC-1155)
- **Smart transactions** để tối ưu gas fees
- **Transaction history** với chi tiết đầy đủ
- **Gas fee estimation** và tùy chỉnh

### **3. DeFi & Web3**
- **Token swaps** thông qua Swaps aggregator
- **Bridge** tokens giữa các networks
- **Staking** và **Earn** features
- **DeFi protocol integration**
- **DApp browser** tích hợp để tương tác với Web3 apps

### **4. Multi-chain Support**
- **Ethereum mainnet** và các testnets
- **Layer 2 solutions** (Arbitrum, Optimism, Polygon, etc.)
- **Custom networks** có thể thêm thủ công
- **Network switching** cho từng DApp riêng biệt

### **5. Bảo mật & Privacy**
- **Biometric authentication** (FaceID, TouchID, Fingerprint)
- **App lock** với timeout tự động
- **Phishing protection**
- **Security alerts** từ PPOM (Personal Protection Object Manager)
- **Transaction simulation** để preview kết quả

### **6. WalletConnect & SDK**
- **WalletConnect v1 & v2** support
- **MetaMask SDK** integration
- **Deep linking** support
- **QR code** scanning cho connections

### **7. Portfolio & Analytics**
- **Portfolio tracking** với giá trị fiat
- **Token price updates** real-time
- **Historical price data**
- **Analytics integration** (Segment, MetaMetrics)

### **8. Advanced Features**
- **Snaps** - Extension system cho third-party integrations
- **Multi-language support** (23+ languages)
- **Dark/Light theme**
- **Notifications** system
- **Profile sync** across devices

## 🏗️ **Kiến trúc kỹ thuật**

### **Core Technologies:**
- **React Native** - Cross-platform mobile development
- **TypeScript** - Type-safe JavaScript
- **Redux** - State management
- **Detox/WDIO** - E2E testing
- **Metro** - JavaScript bundler

### **Blockchain Integration:**
- **@metamask/controllers** - Core blockchain controllers
- **ethers.js/@ethersproject** - Ethereum interaction
- **@metamask/keyring-controller** - Private key management
- **@metamask/transaction-controller** - Transaction handling

### **Key Components:**
- **Engine.ts** - Core blockchain engine quản lý tất cả controllers
- **Controllers** - Modular architecture cho từng chức năng
- **Background Bridge** - Communication với DApps
- **RPC Methods** - Ethereum JSON-RPC implementation

## 🎯 **Mục tiêu người dùng**

MetaMask Mobile phục vụ cho:
- **Người dùng crypto mới** với UI thân thiện và onboarding dễ dàng
- **Trader/Investor** với portfolio tracking và swaps
- **DeFi users** với DApp browser và protocol integrations  
- **NFT collectors** với full NFT support
- **Developers** với SDK và extensive customization options

Đây là một ứng dụng ví cryptocurrency rất hoàn chỉnh và tiên tiến, được phát triển bởi đội ngũ MetaMask với focus mạnh vào bảo mật, UX và khả năng mở rộng cho hệ sinh thái Web3.

---

**User**

hãy check phân walletconnect

---

**Cursor**

Tôi sẽ kiểm tra phần WalletConnect trong dự án MetaMask Mobile để hiểu cách nó được implement.

Tôi đã phân tích chi tiết phần WalletConnect trong MetaMask Mobile. Dưới đây là tóm tắt đầy đủ:

## 🔗 **WalletConnect Implementation trong MetaMask Mobile**

### **📋 Tổng quan Kiến trúc**

MetaMask Mobile hỗ trợ đầy đủ **WalletConnect v1** và **WalletConnect v2** với kiến trúc được thiết kế rất chuyên nghiệp:

### **🏗️ Core Components**

#### **1. WalletConnect v1 (`WalletConnect.js`)**
```javascript
class WalletConnect {
  redirectUrl = null;
  autosign = false;
  backgroundBridge = null;
  url = { current: null };
  title = { current: null };
  icon = { current: null };
  dappScheme = { current: null };
  requestsToRedirect = {};
  hostname = null;
  requestOriginatedFrom = null;
}
```

**Chức năng chính:**
- **Session Management**: Quản lý kết nối và session với DApps
- **Request Handling**: Xử lý các RPC requests từ DApps
- **Background Bridge**: Tạo cầu nối với engine để xử lý blockchain operations
- **Auto-redirect**: Tự động redirect về DApp sau khi xử lý requests

#### **2. WalletConnect v2 (`WalletConnectV2.ts`)**
```typescript
export class WC2Manager {
  private static instance: WC2Manager;
  private navigation?: NavigationContainerRef;
  private web3Wallet: IWalletKit;
  private sessions: { [topic: string]: WalletConnect2Session };
  private deeplinkSessions: {
    [pairingTopic: string]: { redirectUrl?: string; origin: string };
  } = {};
}
```

**Cải tiến v2:**
- **Singleton Pattern**: Quản lý centralized cho tất cả sessions
- **Better Session Persistence**: Session được lưu trữ persistent
- **Enhanced Security**: Cải thiện bảo mật với relay protocol
- **Multi-chain Support**: Hỗ trợ multiple chains trong một session

#### **3. Session Management (`WalletConnect2Session.ts`)**
```typescript
class WalletConnect2Session {
  private backgroundBridge: BackgroundBridge;
  private web3Wallet: IWalletKit;
  private deeplink: boolean;
  private requestsToRedirect: { [request: string]: boolean } = {};
  private topicByRequestId: { [requestId: string]: string } = {};
  private requestByRequestId: {
    [requestId: string]: WalletKitTypes.SessionRequest;
  } = {};
}
```

### **🔧 Chức năng chính**

#### **1. Connection Flow**
```javascript
// QR Code hoặc URI scanning
public async connect({
  wcUri,
  redirectUrl,
  origin,
}: {
  wcUri: string;
  redirectUrl?: string;
  origin: string; // deeplink or qrcode
})
```

**Flow kết nối:**
1. **Parse URI**: Phân tích WalletConnect URI (v1 hoặc v2)
2. **Version Detection**: Tự động detect version và route appropriately  
3. **Session Proposal**: DApp gửi session proposal
4. **User Approval**: User approve/reject connection
5. **Session Start**: Establish session và lưu persistent

#### **2. Supported RPC Methods**
```typescript
const allEIP155Methods = [
  // Standard methods
  'eth_sendTransaction',
  'eth_sign',
  'eth_signTransaction', 
  'eth_signTypedData',
  'eth_signTypedData_v3',
  'eth_signTypedData_v4',
  'personal_sign',
  'eth_accounts',
  'eth_chainId',
  
  // Wallet methods
  'wallet_addEthereumChain',
  'wallet_switchEthereumChain',
  'wallet_watchAsset',
  'wallet_requestPermissions',
];
```

#### **3. Methods Requiring Redirect**
```typescript
const METHODS_TO_REDIRECT = {
  eth_requestAccounts: true,
  eth_sendTransaction: true,
  eth_signTransaction: true,
  personal_sign: true,
  eth_signTypedData: true,
  eth_signTypedData_v3: true,
  eth_signTypedData_v4: true,
  wallet_watchAsset: true,
  wallet_addEthereumChain: true,
  wallet_switchEthereumChain: true,
};
```

#### **4. Background Bridge Integration**
```javascript
this.backgroundBridge = new BackgroundBridge({
  webview: null,
  url: this.url.current,
  isWalletConnect: true,
  wcWalletConnector: this.walletConnector,
  wcRequestActions: {
    approveRequest: this.approveRequest,
    rejectRequest: this.rejectRequest,
    updateSession: this.updateSession,
  },
  // RPC Middleware cho WalletConnect
  getRpcMethodMiddleware: ({ hostname, getProviderState }) =>
    getRpcMethodMiddleware({
      hostname: WALLET_CONNECT_ORIGIN + this.hostname,
      getProviderState,
      isWalletConnect: true,
    }),
});
```

### **🔐 Security Features**

#### **1. Permission Management**
- **Per-origin permissions**: Mỗi DApp có permissions riêng
- **Chain-specific permissions**: Kiểm soát access theo chain
- **Account filtering**: Chỉ expose authorized accounts

#### **2. Request Validation**
```typescript
// Kiểm tra permissions trước khi xử lý request
const checkWCPermissions = async ({
  origin,
  caip2ChainId,
  allowSwitchingToNewChain = false,
}: { 
  origin: string; 
  caip2ChainId: CaipChainId; 
  allowSwitchingToNewChain?: boolean 
})
```

#### **3. Chain Switching Security**
- **Network validation**: Verify chain ID trước khi switch
- **User confirmation**: Require user approval cho new chains
- **Automatic updates**: Sync account/chain changes với sessions

### **📱 UI Components**

#### **1. Session Management Screen**
```javascript
export default class WalletConnectSessions extends PureComponent {
  state = {
    sessions: [],     // v1 sessions
    sessionsV2: [],   // v2 sessions  
  };
}
```

**Features:**
- **Active Sessions List**: Hiển thị tất cả active connections
- **Session Details**: Show DApp info, URL, connection time
- **Bulk Management**: Kill individual hoặc all sessions
- **Version Support**: Unified UI cho cả v1 và v2

#### **2. Connection Approval Modal**
- **DApp Metadata Display**: Logo, name, URL, description
- **Permission Preview**: Show requested accounts và chains
- **Security Warnings**: Alert về potential risks
- **User Actions**: Approve/Reject với clear options

### **⚙️ Configuration**

#### **1. Project Setup**
```javascript
const { PROJECT_ID } = AppConstants.WALLET_CONNECT;
export const isWC2Enabled = 
  typeof PROJECT_ID === 'string' && PROJECT_ID?.length > 0;
```

#### **2. Client Options**
```javascript
export const CLIENT_OPTIONS = {
  clientMeta: {
    description: 'MetaMask Mobile app',
    url: 'https://metamask.io',
    icons: [],
    name: 'MetaMask',
    ssl: true,
  },
};
```

### **🔄 Session Lifecycle**

#### **1. Session Persistence**
```javascript
const persistSessions = async () => {
  const sessions = connectors
    .filter((connector) => connector?.walletConnector?.connected)
    .map((connector) => ({
      ...connector.walletConnector.session,
      autosign: connector.autosign,
      redirectUrl: connector.redirectUrl,
      lastTimeConnected: new Date(),
    }));
  
  await StorageWrapper.setItem(WALLETCONNECT_SESSIONS, JSON.stringify(sessions));
};
```

#### **2. Auto-reconnection**
- **Resume sessions**: Tự động restore sessions khi app restart
- **Health checks**: Monitor session status và cleanup expired ones
- **Background sync**: Keep sessions synced với latest state

### **🎯 Advanced Features**

#### **1. Deep Linking Support**
```typescript
this.deeplinkSessions[paired.topic] = {
  redirectUrl,
  origin,
};
```

#### **2. Multi-Chain Operations**
- **Chain-aware requests**: Handle requests theo specific chains
- **Cross-chain session management**: Manage sessions across multiple networks
- **CAIP-compliant**: Support CAIP standards cho multi-chain

#### **3. Transaction Handling**
```typescript
private async handleSendTransaction(
  caip2ChainId: CaipChainId,
  requestEvent: WalletKitTypes.SessionRequest,
  methodParams: any,
  origin: string
)
```

### **📊 Monitoring & Analytics**

- **Connection Analytics**: Track connection success rates
- **Usage Metrics**: Monitor which DApps connect most frequently  
- **Error Reporting**: Log và report connection failures
- **Performance Monitoring**: Track response times cho requests

### **🚀 Key Strengths**

1. **Dual Version Support**: Seamless support cho cả v1 và v2
2. **Robust Architecture**: Well-structured với clear separation of concerns
3. **Security-First**: Comprehensive permission và validation system
4. **User Experience**: Smooth connection flow với good UX
5. **Extensibility**: Easy to extend với new features
6. **Performance**: Optimized session management và background processing

WalletConnect implementation trong MetaMask Mobile là một trong những implementation tốt nhất trong ecosystem, với architecture hoàn chỉnh và security features mạnh mẽ.

```javascript
class WalletConnect {
  redirectUrl = null;
  autosign = false;
  backgroundBridge = null;
  url = { current: null };
  title = { current: null };
  icon = { current: null };
  dappScheme = { current: null };
  requestsToRedirect = {};
  hostname = null;
  requestOriginatedFrom = null;
}
```

```typescript
export class WC2Manager {
  private static instance: WC2Manager;
  private navigation?: NavigationContainerRef;
  private web3Wallet: IWalletKit;
  private sessions: { [topic: string]: WalletConnect2Session };
  private deeplinkSessions: {
    [pairingTopic: string]: { redirectUrl?: string; origin: string };
  } = {};
}
```

```typescript
class WalletConnect2Session {
  private backgroundBridge: BackgroundBridge;
  private web3Wallet: IWalletKit;
  private deeplink: boolean;
  private requestsToRedirect: { [request: string]: boolean } = {};
  private topicByRequestId: { [requestId: string]: string } = {};
  private requestByRequestId: {
    [requestId: string]: WalletKitTypes.SessionRequest;
  } = {};
}
```

```javascript
// QR Code hoặc URI scanning
public async connect({
  wcUri,
  redirectUrl,
  origin,
}: {
  wcUri: string;
  redirectUrl?: string;
  origin: string; // deeplink or qrcode
})
```

```typescript
const allEIP155Methods = [
  // Standard methods
  'eth_sendTransaction',
  'eth_sign',
  'eth_signTransaction', 
  'eth_signTypedData',
  'eth_signTypedData_v3',
  'eth_signTypedData_v4',
  'personal_sign',
  'eth_accounts',
  'eth_chainId',
  
  // Wallet methods
  'wallet_addEthereumChain',
  'wallet_switchEthereumChain',
  'wallet_watchAsset',
  'wallet_requestPermissions',
];
```

```typescript
const METHODS_TO_REDIRECT = {
  eth_requestAccounts: true,
  eth_sendTransaction: true,
  eth_signTransaction: true,
  personal_sign: true,
  eth_signTypedData: true,
  eth_signTypedData_v3: true,
  eth_signTypedData_v4: true,
  wallet_watchAsset: true,
  wallet_addEthereumChain: true,
  wallet_switchEthereumChain: true,
};
```

```javascript
this.backgroundBridge = new BackgroundBridge({
  webview: null,
  url: this.url.current,
  isWalletConnect: true,
  wcWalletConnector: this.walletConnector,
  wcRequestActions: {
    approveRequest: this.approveRequest,
    rejectRequest: this.rejectRequest,
    updateSession: this.updateSession,
  },
  // RPC Middleware cho WalletConnect
  getRpcMethodMiddleware: ({ hostname, getProviderState }) =>
    getRpcMethodMiddleware({
      hostname: WALLET_CONNECT_ORIGIN + this.hostname,
      getProviderState,
      isWalletConnect: true,
    }),
});
```

```typescript
// Kiểm tra permissions trước khi xử lý request
const checkWCPermissions = async ({
  origin,
  caip2ChainId,
  allowSwitchingToNewChain = false,
}: { 
  origin: string; 
  caip2ChainId: CaipChainId; 
  allowSwitchingToNewChain?: boolean 
})
```

```javascript
export default class WalletConnectSessions extends PureComponent {
  state = {
    sessions: [],     // v1 sessions
    sessionsV2: [],   // v2 sessions  
  };
}
```

```javascript
const { PROJECT_ID } = AppConstants.WALLET_CONNECT;
export const isWC2Enabled = 
  typeof PROJECT_ID === 'string' && PROJECT_ID?.length > 0;
```

```javascript
export const CLIENT_OPTIONS = {
  clientMeta: {
    description: 'MetaMask Mobile app',
    url: 'https://metamask.io',
    icons: [],
    name: 'MetaMask',
    ssl: true,
  },
};
```

```javascript
const persistSessions = async () => {
  const sessions = connectors
    .filter((connector) => connector?.walletConnector?.connected)
    .map((connector) => ({
      ...connector.walletConnector.session,
      autosign: connector.autosign,
      redirectUrl: connector.redirectUrl,
      lastTimeConnected: new Date(),
    }));
  
  await StorageWrapper.setItem(WALLETCONNECT_SESSIONS, JSON.stringify(sessions));
};
```

```typescript
this.deeplinkSessions[paired.topic] = {
  redirectUrl,
  origin,
};
```

```typescript
private async handleSendTransaction(
  caip2ChainId: CaipChainId,
  requestEvent: WalletKitTypes.SessionRequest,
  methodParams: any,
  origin: string
)
```

---

**User**

cách handle deeplink và redirect về lại dapp

---

**Cursor**

Tôi sẽ phân tích cách MetaMask Mobile handle deeplink và redirect về lại DApp. Hãy tìm hiểu các component liên quan đến deeplink và redirect mechanism.

Dựa trên phân tích codebase, đây là cách **MetaMask Mobile handle deeplink và redirect về lại DApp**:

## 🔗 **Deeplink & Redirect Mechanism Overview**

### **📱 Kiến trúc tổng quan**

```
DApp → Deeplink/URI → MetaMask → Processing → Redirect back to DApp
```

## **🚀 1. Deeplink Entry Points**

### **A. Supported Protocols**
```typescript
const PROTOCOLS = {
  HTTP: 'http',
  HTTPS: 'https',
  WC: 'wc',           // WalletConnect
  ETHEREUM: 'ethereum',
  DAPP: 'dapp',
  METAMASK: 'metamask',
};
```

### **B. Deeplink Sources**
```typescript
const DEEPLINKS = {
  ORIGIN_DEEPLINK: 'deeplink',        // App-to-app deeplink
  ORIGIN_QR_CODE: 'qr-code',          // QR code scanning
  ORIGIN_NOTIFICATION: 'notifications', // Push notifications
};
```

## **🔄 2. Processing Flow**

### **A. DeeplinkManager Parsing**
```typescript
// app/core/DeeplinkManager/ParseManager/parseDeeplink.ts
async function parseDeeplink({
  deeplinkManager: instance,
  url,
  origin,
  browserCallBack,
  onHandled,
}) {
  const { urlObj, params } = extractURLParams(url);
  
  switch (urlObj.protocol.replace(':', '')) {
    case PROTOCOLS.WC:
      connectWithWC({ handled, wcURL, origin, params });
      break;
    case PROTOCOLS.ETHEREUM:
      instance._handleEthereumUrl(url, origin);
      break;
    case PROTOCOLS.METAMASK:
      handleMetaMaskDeeplink({ instance, handled, wcURL, origin, params, url });
      break;
  }
}
```

### **B. WalletConnect Specific Processing**
```typescript
// WalletConnect URI parsing và connection
export function connectWithWC({
  handled,
  wcURL,
  origin,
  params,
}) {
  handled();
  
  WC2Manager.getInstance()
    .then((instance) =>
      instance.connect({
        wcUri: wcURL,
        origin,
        redirectUrl: params?.redirect,  // DApp's redirect URL
      }),
    );
}
```

## **⬅️ 3. Redirect Mechanisms**

### **A. WalletConnect v1 Redirect**
```javascript
// app/core/WalletConnect/WalletConnect.js
class WalletConnect {
  redirect = () => {
    // Skip redirect if originated from QR code
    if (this.requestOriginatedFrom === AppConstants.DEEPLINKS.ORIGIN_QR_CODE)
      return;

    setTimeout(() => {
      if (this.dappScheme.current || this.redirectUrl) {
        // Use DApp's custom scheme or redirect URL
        Linking.openURL(
          this.dappScheme.current
            ? `${this.dappScheme.current}://`
            : this.redirectUrl,
        );
      } else {
        // Fallback: minimize app to show previous app
        Minimizer.goBack();
      }
    }, 300);
  };
}
```

### **B. WalletConnect v2 Enhanced Redirect**
```typescript
// app/core/WalletConnect/WalletConnect2Session.ts
redirect = (context?: string) => {
  if (!this.deeplink) return;  // Only redirect for deeplink connections

  const showReturnModal = () => {
    navigation?.navigate(Routes.MODAL.ROOT_MODAL_FLOW, {
      screen: Routes.SHEET.RETURN_TO_DAPP_MODAL,
    });
  };

  setTimeout(() => {
    if (Device.isIos() && parseInt(Platform.Version as string) >= 17) {
      // iOS 17+ - Try to use DApp's redirect link
      const redirect = this.session.peer.metadata.redirect;
      const peerLink = redirect?.native || redirect?.universal;
      
      if (peerLink) {
        Linking.openURL(peerLink).catch((error) => {
          // Fallback to return modal if redirect fails
          showReturnModal();
        });
      } else {
        showReturnModal();
      }
    } else {
      // Older iOS versions or Android - use system minimize
      Minimizer.goBack();
    }
  }, 100);
};
```

### **C. SDK Deeplink Protocol Redirect**
```typescript
// app/core/SDKConnect/SDKDeeplinkProtocol/DeeplinkProtocolService.ts
public async openDeeplink({
  message,
  dappScheme,
  clientId,
}: {
  message: unknown;
  dappScheme: string;
  clientId: string;
}) {
  const base64Message = btoa(JSON.stringify(message));
  const deeplink = `${dappScheme}://mmsdk?message=${base64Message}`;
  
  await Linking.openURL(deeplink);
}
```

## **🎯 4. Redirect Triggers**

### **A. Methods Requiring Redirect**
```typescript
const METHODS_TO_REDIRECT = {
  eth_requestAccounts: true,
  eth_sendTransaction: true,
  eth_signTransaction: true,
  personal_sign: true,
  eth_signTypedData: true,
  eth_signTypedData_v3: true,
  eth_signTypedData_v4: true,
  wallet_watchAsset: true,
  wallet_addEthereumChain: true,
  wallet_switchEthereumChain: true,
};
```

### **B. Conditional Redirect Logic**
```typescript
needsRedirect = (id: string) => {
  if (this.requestsToRedirect[id]) {
    delete this.requestsToRedirect[id];
    this.redirect(`needsRedirect_${id}`);
  }
};

// Called after approve/reject
approveRequest = ({ id, result }) => {
  this.walletConnector.approveRequest({ id, result });
  this.needsRedirect(id);  // Trigger redirect if needed
};

rejectRequest = ({ id, error }) => {
  this.walletConnector.rejectRequest({ id, error });
  this.needsRedirect(id);  // Trigger redirect if needed
};
```

## **📱 5. Return to DApp Modal**

### **A. Modal Component**
```tsx
// app/components/Views/ReturnToAppModal/ReturnToAppModal.tsx
const ReturnToAppModal = () => {
  return (
    <BottomSheet>
      <SheetHeader title={strings('sdk_return_to_app_modal.title')} />
      <Text style={styles.description}>
        {strings('sdk_return_to_app_modal.description')}
      </Text>
    </BottomSheet>
  );
};
```

### **B. When Return Modal is Shown**
- **iOS 17+**: When direct app redirect fails
- **Universal links không available**: Fallback option
- **User choice**: Allow user to manually return to DApp

## **⚙️ 6. Platform-Specific Behaviors**

### **A. iOS Behaviors**
```typescript
if (Device.isIos() && parseInt(Platform.Version as string) >= 17) {
  // iOS 17+ uses direct app redirection
  const peerLink = redirect?.native || redirect?.universal;
  if (peerLink) {
    Linking.openURL(peerLink);
  } else {
    showReturnModal();
  }
} else {
  // Older iOS - use system minimize
  Minimizer.goBack();
}
```

### **B. Android Behaviors**
```typescript
// Android primarily uses Minimizer.goBack()
// This minimizes MetaMask and shows the previous app
Minimizer.goBack();
```

## **🔄 7. SDK Connection Redirect Flow**

### **A. SDK Message Handling**
```typescript
// app/core/SDKConnect/handlers/handleSendMessage.ts
const canRedirect = connection.rpcQueueManager.canRedirect({ method });

if (connection.origin === AppConstants.DEEPLINKS.ORIGIN_QR_CODE) {
  // Skip redirect for QR code connections
  return;
}

if (!canRedirect) {
  // Skip redirect for certain methods
  return;
}

if (connection.trigger !== 'deeplink') {
  // Only redirect for deeplink-originated connections
  return;
}

// Show return to DApp modal
connection.navigation?.navigate(Routes.MODAL.ROOT_MODAL_FLOW, {
  screen: Routes.SHEET.RETURN_TO_DAPP_MODAL,
});
```

### **B. Batch RPC Handling**
```typescript
// Only redirect after ALL requests in batch are completed
const isLastRpcOrError = await handleBatchRpcResponse({
  chainRpcs: chainRPCs,
  msg,
  batchRPCManager: connection.batchRPCManager,
});

if (!isLastRpcOrError) {
  // Don't redirect until batch is complete
  return;
}
```

## **🛡️ 8. Security & Edge Cases**

### **A. QR Code Exception**
```typescript
// Never auto-redirect for QR code scanned connections
if (this.requestOriginatedFrom === AppConstants.DEEPLINKS.ORIGIN_QR_CODE)
  return;
```

### **B. Pending Requests Check**
```typescript
// Don't redirect if there are pending sign requests
const requests = this.web3Wallet.getPendingSessionRequests() || [];
const hasPendingSignRequest = 
  requests[0]?.params?.request?.method === 'personal_sign';

if (!hasPendingSignRequest) {
  this.needsRedirect(id);
}
```

### **C. Connection Validation**
```typescript
// Validate deeplink before processing
const validatedUrl = new URL(url);
const isValidWCURI = parseWalletConnectUri(uri);
```

## **📊 9. Analytics & Monitoring**

### **A. Redirect Analytics**
```typescript
if (isAnalyticsTrackedRpcMethod(method)) {
  if (msg?.data?.error) {
    analytics.track('wallet_action_user_rejected', { anon_id: anonId });
  } else {
    analytics.track('wallet_action_user_approved', { anon_id: anonId });
  }
}
```

### **B. Error Handling**
```typescript
Linking.openURL(deeplink).catch((error) => {
  DevLogger.log(`Error opening deeplink: ${error}`);
  showReturnModal();  // Fallback to manual return
});
```

## **🎯 Key Features**

1. **Multi-Protocol Support**: HTTP(S), WalletConnect, Ethereum, MetaMask schemes
2. **Platform Optimization**: Different strategies cho iOS vs Android
3. **Graceful Degradation**: Fallback mechanisms khi direct redirect fails
4. **User Choice**: Return modal as backup option
5. **Security First**: Validation và proper origin tracking
6. **Batch Handling**: Smart redirect timing cho multiple requests
7. **Session Persistence**: Deeplink session tracking across app lifecycle

Mechanism này được thiết kế rất sophisticated để handle tất cả edge cases và provide smooth UX cho users khi interact với DApps qua WalletConnect hoặc deeplinks.

```plaintext
DApp → Deeplink/URI → MetaMask → Processing → Redirect back to DApp
```

```typescript
const PROTOCOLS = {
  HTTP: 'http',
  HTTPS: 'https',
  WC: 'wc',           // WalletConnect
  ETHEREUM: 'ethereum',
  DAPP: 'dapp',
  METAMASK: 'metamask',
};
```

```typescript
const DEEPLINKS = {
  ORIGIN_DEEPLINK: 'deeplink',        // App-to-app deeplink
  ORIGIN_QR_CODE: 'qr-code',          // QR code scanning
  ORIGIN_NOTIFICATION: 'notifications', // Push notifications
};
```

```typescript
// app/core/DeeplinkManager/ParseManager/parseDeeplink.ts
async function parseDeeplink({
  deeplinkManager: instance,
  url,
  origin,
  browserCallBack,
  onHandled,
}) {
  const { urlObj, params } = extractURLParams(url);
  
  switch (urlObj.protocol.replace(':', '')) {
    case PROTOCOLS.WC:
      connectWithWC({ handled, wcURL, origin, params });
      break;
    case PROTOCOLS.ETHEREUM:
      instance._handleEthereumUrl(url, origin);
      break;
    case PROTOCOLS.METAMASK:
      handleMetaMaskDeeplink({ instance, handled, wcURL, origin, params, url });
      break;
  }
}
```

```typescript
// WalletConnect URI parsing và connection
export function connectWithWC({
  handled,
  wcURL,
  origin,
  params,
}) {
  handled();
  
  WC2Manager.getInstance()
    .then((instance) =>
      instance.connect({
        wcUri: wcURL,
        origin,
        redirectUrl: params?.redirect,  // DApp's redirect URL
      }),
    );
}
```

```javascript
// app/core/WalletConnect/WalletConnect.js
class WalletConnect {
  redirect = () => {
    // Skip redirect if originated from QR code
    if (this.requestOriginatedFrom === AppConstants.DEEPLINKS.ORIGIN_QR_CODE)
      return;

    setTimeout(() => {
      if (this.dappScheme.current || this.redirectUrl) {
        // Use DApp's custom scheme or redirect URL
        Linking.openURL(
          this.dappScheme.current
            ? `${this.dappScheme.current}://`
            : this.redirectUrl,
        );
      } else {
        // Fallback: minimize app to show previous app
        Minimizer.goBack();
      }
    }, 300);
  };
}
```

```typescript
// app/core/WalletConnect/WalletConnect2Session.ts
redirect = (context?: string) => {
  if (!this.deeplink) return;  // Only redirect for deeplink connections

  const showReturnModal = () => {
    navigation?.navigate(Routes.MODAL.ROOT_MODAL_FLOW, {
      screen: Routes.SHEET.RETURN_TO_DAPP_MODAL,
    });
  };

  setTimeout(() => {
    if (Device.isIos() && parseInt(Platform.Version as string) >= 17) {
      // iOS 17+ - Try to use DApp's redirect link
      const redirect = this.session.peer.metadata.redirect;
      const peerLink = redirect?.native || redirect?.universal;
      
      if (peerLink) {
        Linking.openURL(peerLink).catch((error) => {
          // Fallback to return modal if redirect fails
          showReturnModal();
        });
      } else {
        showReturnModal();
      }
    } else {
      // Older iOS versions or Android - use system minimize
      Minimizer.goBack();
    }
  }, 100);
};
```

```typescript
// app/core/SDKConnect/SDKDeeplinkProtocol/DeeplinkProtocolService.ts
public async openDeeplink({
  message,
  dappScheme,
  clientId,
}: {
  message: unknown;
  dappScheme: string;
  clientId: string;
}) {
  const base64Message = btoa(JSON.stringify(message));
  const deeplink = `${dappScheme}://mmsdk?message=${base64Message}`;
  
  await Linking.openURL(deeplink);
}
```

```typescript
const METHODS_TO_REDIRECT = {
  eth_requestAccounts: true,
  eth_sendTransaction: true,
  eth_signTransaction: true,
  personal_sign: true,
  eth_signTypedData: true,
  eth_signTypedData_v3: true,
  eth_signTypedData_v4: true,
  wallet_watchAsset: true,
  wallet_addEthereumChain: true,
  wallet_switchEthereumChain: true,
};
```

```typescript
needsRedirect = (id: string) => {
  if (this.requestsToRedirect[id]) {
    delete this.requestsToRedirect[id];
    this.redirect(`needsRedirect_${id}`);
  }
};

// Called after approve/reject
approveRequest = ({ id, result }) => {
  this.walletConnector.approveRequest({ id, result });
  this.needsRedirect(id);  // Trigger redirect if needed
};

rejectRequest = ({ id, error }) => {
  this.walletConnector.rejectRequest({ id, error });
  this.needsRedirect(id);  // Trigger redirect if needed
};
```

```typescriptreact
// app/components/Views/ReturnToAppModal/ReturnToAppModal.tsx
const ReturnToAppModal = () => {
  return (
    <BottomSheet>
      <SheetHeader title={strings('sdk_return_to_app_modal.title')} />
      <Text style={styles.description}>
        {strings('sdk_return_to_app_modal.description')}
      </Text>
    </BottomSheet>
  );
};
```

```typescript
if (Device.isIos() && parseInt(Platform.Version as string) >= 17) {
  // iOS 17+ uses direct app redirection
  const peerLink = redirect?.native || redirect?.universal;
  if (peerLink) {
    Linking.openURL(peerLink);
  } else {
    showReturnModal();
  }
} else {
  // Older iOS - use system minimize
  Minimizer.goBack();
}
```

```typescript
// Android primarily uses Minimizer.goBack()
// This minimizes MetaMask and shows the previous app
Minimizer.goBack();
```

```typescript
// app/core/SDKConnect/handlers/handleSendMessage.ts
const canRedirect = connection.rpcQueueManager.canRedirect({ method });

if (connection.origin === AppConstants.DEEPLINKS.ORIGIN_QR_CODE) {
  // Skip redirect for QR code connections
  return;
}

if (!canRedirect) {
  // Skip redirect for certain methods
  return;
}

if (connection.trigger !== 'deeplink') {
  // Only redirect for deeplink-originated connections
  return;
}

// Show return to DApp modal
connection.navigation?.navigate(Routes.MODAL.ROOT_MODAL_FLOW, {
  screen: Routes.SHEET.RETURN_TO_DAPP_MODAL,
});
```

```typescript
// Only redirect after ALL requests in batch are completed
const isLastRpcOrError = await handleBatchRpcResponse({
  chainRpcs: chainRPCs,
  msg,
  batchRPCManager: connection.batchRPCManager,
});

if (!isLastRpcOrError) {
  // Don't redirect until batch is complete
  return;
}
```

```typescript
// Never auto-redirect for QR code scanned connections
if (this.requestOriginatedFrom === AppConstants.DEEPLINKS.ORIGIN_QR_CODE)
  return;
```

```typescript
// Don't redirect if there are pending sign requests
const requests = this.web3Wallet.getPendingSessionRequests() || [];
const hasPendingSignRequest = 
  requests[0]?.params?.request?.method === 'personal_sign';

if (!hasPendingSignRequest) {
  this.needsRedirect(id);
}
```

```typescript
// Validate deeplink before processing
const validatedUrl = new URL(url);
const isValidWCURI = parseWalletConnectUri(uri);
```

```typescript
if (isAnalyticsTrackedRpcMethod(method)) {
  if (msg?.data?.error) {
    analytics.track('wallet_action_user_rejected', { anon_id: anonId });
  } else {
    analytics.track('wallet_action_user_approved', { anon_id: anonId });
  }
}
```

```typescript
Linking.openURL(deeplink).catch((error) => {
  DevLogger.log(`Error opening deeplink: ${error}`);
  showReturnModal();  // Fallback to manual return
});
```

---

**User**

tôi thấy sau khi handleConnect và show toastRef?.current?.showToast thì app tự trở lại browser dapp

---

**Cursor**

```typescript
await Engine.context.PermissionController.acceptPermissionsRequest(request);
// ... tracking events
toastRef?.current?.showToast({
  variant: ToastVariants.Network,
  labelOptions,
  networkImageSource: faviconSource,
  hasNoTimeout: false,
});
```

Đúng rồi! Sau khi `handleConnect` thành công và hiển thị toast, app sẽ tự động redirect về DApp. Đây là cơ chế hoạt động:

## 🔄 **Flow Redirect sau khi Connect**

### **1. Trigger Point trong AccountConnect**
```typescript
// app/components/Views/AccountConnect/AccountConnect.tsx
const handleConnect = useCallback(async () => {
  try {
    setIsLoading(true);
    
    // ✅ Accept permission request - TRIGGER POINT
    await Engine.context.PermissionController.acceptPermissionsRequest(request);
    
    // Show toast
    toastRef?.current?.showToast({
      variant: ToastVariants.Network,
      labelOptions,
      networkImageSource: faviconSource,
      hasNoTimeout: false,
    });
    
    // 🚀 Redirect sẽ xảy ra ngay sau đây
  } catch (e) {
    // handle error
  } finally {
    setIsLoading(false);
  }
}, [/* dependencies */]);
```

## **🎯 2. Permission Acceptance Chain Reaction**

### **A. PermissionController.acceptPermissionsRequest()**
```typescript
// Khi gọi acceptPermissionsRequest, nó sẽ:
// 1. Update permissions trong state
// 2. Resolve pending permission request
// 3. Trigger registered listeners/callbacks
// 4. Notify connected services (SDK/WalletConnect)
```

### **B. SDK Connection Response**
```typescript
// app/core/SDKConnect/handlers/handleSendMessage.ts
export const handleSendMessage = async ({ msg, connection }) => {
  // After processing response
  const canRedirect = connection.rpcQueueManager.canRedirect({ method });
  
  if (connection.origin === AppConstants.DEEPLINKS.ORIGIN_QR_CODE) {
    return; // Skip redirect for QR connections
  }
  
  if (!canRedirect) {
    return; // Skip for certain methods
  }
  
  if (connection.trigger !== 'deeplink') {
    return; // Only redirect for deeplink connections
  }
  
  // 🚀 REDIRECT HAPPENS HERE
  connection.navigation?.navigate(Routes.MODAL.ROOT_MODAL_FLOW, {
    screen: Routes.SHEET.RETURN_TO_DAPP_MODAL,
  });
};
```

### **C. WalletConnect Session Response**
```typescript
// app/core/WalletConnect/WalletConnect2Session.ts
approveRequest = async ({ id, result }) => {
  // Send approval response
  await this.web3Wallet.respondSessionRequest({
    topic,
    response: { id: parseInt(id), jsonrpc: '2.0', result },
  });
  
  this._isHandlingRequest = false;
  
  // Check for pending requests
  const requests = this.web3Wallet.getPendingSessionRequests() || [];
  const hasPendingSignRequest = 
    requests[0]?.params?.request?.method === 'personal_sign';
  
  if (!hasPendingSignRequest) {
    this.needsRedirect(id); // 🚀 REDIRECT TRIGGER
  }
};

needsRedirect = (id: string) => {
  if (this.requestsToRedirect[id]) {
    delete this.requestsToRedirect[id];
    this.redirect(`needsRedirect_${id}`); // 🚀 ACTUAL REDIRECT
  }
};
```

## **🔄 3. Redirect Implementation Details**

### **A. WalletConnect v2 Redirect Logic**
```typescript
redirect = (context?: string) => {
  if (!this.deeplink) return; // Only for deeplink connections
  
  const showReturnModal = () => {
    navigation?.navigate(Routes.MODAL.ROOT_MODAL_FLOW, {
      screen: Routes.SHEET.RETURN_TO_DAPP_MODAL,
    });
  };
  
  setTimeout(() => {
    if (Device.isIos() && parseInt(Platform.Version as string) >= 17) {
      // iOS 17+ - Direct app redirect
      const redirect = this.session.peer.metadata.redirect;
      const peerLink = redirect?.native || redirect?.universal;
      
      if (peerLink) {
        Linking.openURL(peerLink).catch(() => showReturnModal());
      } else {
        showReturnModal();
      }
    } else {
      // Older iOS/Android - System minimize
      Minimizer.goBack(); // 🚀 APP MINIMIZES, SHOWING DAPP
    }
  }, 100);
};
```

### **B. SDK Deeplink Protocol**
```typescript
// app/core/SDKConnect/SDKDeeplinkProtocol/DeeplinkProtocolService.ts
public async openDeeplink({ message, dappScheme, clientId }) {
  const base64Message = btoa(JSON.stringify(message));
  const deeplink = `${dappScheme}://mmsdk?message=${base64Message}`;
  
  await Linking.openURL(deeplink); // 🚀 OPEN DAPP WITH RESPONSE
}
```

## **⏰ 4. Timing Sequence**

```
1. User clicks "Connect" in AccountConnect
   ↓
2. handleConnect() executes
   ↓
3. acceptPermissionsRequest() called
   ↓
4. Permission request resolved
   ↓
5. Toast displayed to user
   ↓
6. Connected services (SDK/WC) notified
   ↓
7. Response sent back to DApp
   ↓
8. Redirect mechanism triggered:
   - iOS 17+: Direct app redirect via Linking.openURL()
   - Older: Minimizer.goBack() → shows previous app
   - Fallback: Return to DApp modal
```

## **🎛️ 5. Control Factors**

### **A. Connection Type**
```typescript
// Different redirect behavior based on origin:
if (connection.origin === AppConstants.DEEPLINKS.ORIGIN_QR_CODE) {
  return; // No redirect for QR scanned connections
}

if (this.requestOriginatedFrom === AppConstants.DEEPLINKS.ORIGIN_QR_CODE) {
  return; // Skip redirect
}
```

### **B. Platform Differences**
```typescript
// iOS 17+: Direct app switching
if (Device.isIos() && parseInt(Platform.Version as string) >= 17) {
  Linking.openURL(peerLink);
} else {
  // Older versions: System minimize
  Minimizer.goBack();
}
```

### **C. Pending Requests Check**
```typescript
// Don't redirect if there are more pending requests
const hasPendingSignRequest = 
  requests[0]?.params?.request?.method === 'personal_sign';

if (!hasPendingSignRequest) {
  this.needsRedirect(id); // Only redirect when all done
}
```

## **🚀 6. Tóm tắt**

**Tại sao app tự trở lại DApp sau khi connect:**

1. **Permission Acceptance**: `acceptPermissionsRequest()` resolves connection
2. **Response Notification**: Connected services được notify
3. **Auto-redirect Mechanism**: Built-in redirect logic được trigger
4. **Platform-specific Behavior**: 
   - **iOS 17+**: Direct app switch via deep linking
   - **Older**: System minimize showing previous app
   - **Fallback**: Return to DApp modal

**Đây là intended behavior** để tạo seamless UX - user connect trong MetaMask, sau đó tự động trở lại DApp để tiếp tục workflow mà không cần manual switching.

**Disable redirect**: Nếu muốn prevent auto-redirect, cần modify logic trong các redirect methods hoặc connection handling code.

```typescript
// app/components/Views/AccountConnect/AccountConnect.tsx
const handleConnect = useCallback(async () => {
  try {
    setIsLoading(true);
    
    // ✅ Accept permission request - TRIGGER POINT
    await Engine.context.PermissionController.acceptPermissionsRequest(request);
    
    // Show toast
    toastRef?.current?.showToast({
      variant: ToastVariants.Network,
      labelOptions,
      networkImageSource: faviconSource,
      hasNoTimeout: false,
    });
    
    // 🚀 Redirect sẽ xảy ra ngay sau đây
  } catch (e) {
    // handle error
  } finally {
    setIsLoading(false);
  }
}, [/* dependencies */]);
```

```typescript
// Khi gọi acceptPermissionsRequest, nó sẽ:
// 1. Update permissions trong state
// 2. Resolve pending permission request
// 3. Trigger registered listeners/callbacks
// 4. Notify connected services (SDK/WalletConnect)
```

```typescript
// app/core/SDKConnect/handlers/handleSendMessage.ts
export const handleSendMessage = async ({ msg, connection }) => {
  // After processing response
  const canRedirect = connection.rpcQueueManager.canRedirect({ method });
  
  if (connection.origin === AppConstants.DEEPLINKS.ORIGIN_QR_CODE) {
    return; // Skip redirect for QR connections
  }
  
  if (!canRedirect) {
    return; // Skip for certain methods
  }
  
  if (connection.trigger !== 'deeplink') {
    return; // Only redirect for deeplink connections
  }
  
  // 🚀 REDIRECT HAPPENS HERE
  connection.navigation?.navigate(Routes.MODAL.ROOT_MODAL_FLOW, {
    screen: Routes.SHEET.RETURN_TO_DAPP_MODAL,
  });
};
```

```typescript
// app/core/WalletConnect/WalletConnect2Session.ts
approveRequest = async ({ id, result }) => {
  // Send approval response
  await this.web3Wallet.respondSessionRequest({
    topic,
    response: { id: parseInt(id), jsonrpc: '2.0', result },
  });
  
  this._isHandlingRequest = false;
  
  // Check for pending requests
  const requests = this.web3Wallet.getPendingSessionRequests() || [];
  const hasPendingSignRequest = 
    requests[0]?.params?.request?.method === 'personal_sign';
  
  if (!hasPendingSignRequest) {
    this.needsRedirect(id); // 🚀 REDIRECT TRIGGER
  }
};

needsRedirect = (id: string) => {
  if (this.requestsToRedirect[id]) {
    delete this.requestsToRedirect[id];
    this.redirect(`needsRedirect_${id}`); // 🚀 ACTUAL REDIRECT
  }
};
```

```typescript
redirect = (context?: string) => {
  if (!this.deeplink) return; // Only for deeplink connections
  
  const showReturnModal = () => {
    navigation?.navigate(Routes.MODAL.ROOT_MODAL_FLOW, {
      screen: Routes.SHEET.RETURN_TO_DAPP_MODAL,
    });
  };
  
  setTimeout(() => {
    if (Device.isIos() && parseInt(Platform.Version as string) >= 17) {
      // iOS 17+ - Direct app redirect
      const redirect = this.session.peer.metadata.redirect;
      const peerLink = redirect?.native || redirect?.universal;
      
      if (peerLink) {
        Linking.openURL(peerLink).catch(() => showReturnModal());
      } else {
        showReturnModal();
      }
    } else {
      // Older iOS/Android - System minimize
      Minimizer.goBack(); // 🚀 APP MINIMIZES, SHOWING DAPP
    }
  }, 100);
};
```

```typescript
// app/core/SDKConnect/SDKDeeplinkProtocol/DeeplinkProtocolService.ts
public async openDeeplink({ message, dappScheme, clientId }) {
  const base64Message = btoa(JSON.stringify(message));
  const deeplink = `${dappScheme}://mmsdk?message=${base64Message}`;
  
  await Linking.openURL(deeplink); // 🚀 OPEN DAPP WITH RESPONSE
}
```

```plaintext
1. User clicks "Connect" in AccountConnect
   ↓
2. handleConnect() executes
   ↓
3. acceptPermissionsRequest() called
   ↓
4. Permission request resolved
   ↓
5. Toast displayed to user
   ↓
6. Connected services (SDK/WC) notified
   ↓
7. Response sent back to DApp
   ↓
8. Redirect mechanism triggered:
   - iOS 17+: Direct app redirect via Linking.openURL()
   - Older: Minimizer.goBack() → shows previous app
   - Fallback: Return to DApp modal
```

```typescript
// Different redirect behavior based on origin:
if (connection.origin === AppConstants.DEEPLINKS.ORIGIN_QR_CODE) {
  return; // No redirect for QR scanned connections
}

if (this.requestOriginatedFrom === AppConstants.DEEPLINKS.ORIGIN_QR_CODE) {
  return; // Skip redirect
}
```

```typescript
// iOS 17+: Direct app switching
if (Device.isIos() && parseInt(Platform.Version as string) >= 17) {
  Linking.openURL(peerLink);
} else {
  // Older versions: System minimize
  Minimizer.goBack();
}
```

```typescript
// Don't redirect if there are more pending requests
const hasPendingSignRequest = 
  requests[0]?.params?.request?.method === 'personal_sign';

if (!hasPendingSignRequest) {
  this.needsRedirect(id); // Only redirect when all done
}
```

---

**User**

cho tôi thấy cách hoạt động và cách tạo Minimizer

---

**Cursor**

Tôi sẽ tìm hiểu cách hoạt động và implementation của Minimizer module trong MetaMask Mobile.

Dựa trên phân tích source code, đây là cách hoạt động và cách tạo **Minimizer** trong MetaMask Mobile:

## 🔧 **Minimizer Overview**

**Minimizer** là một **React Native Native Module** được tạo để cho phép app **minimize/move to background** và hiển thị app trước đó trong task stack (thường là DApp). 

## 🏗️ **Architecture & Implementation**

### **📱 1. JavaScript Interface Layer**

```typescript
// app/core/NativeModules.ts
import { NativeModules } from 'react-native';

// Minimizer module allows the app to be pushed to the background
const { Minimizer } = NativeModules;

export { Minimizer };
```

**Usage trong code:**
```typescript
// app/core/WalletConnect/WalletConnect2Session.ts
import { Minimizer } from '../NativeModules';

redirect = (context?: string) => {
  setTimeout(() => {
    if (Device.isIos() && parseInt(Platform.Version as string) >= 17) {
      // iOS 17+ specific logic
    } else {
      Minimizer.goBack(); // 🚀 MINIMIZE APP
    }
  }, 100);
};
```

### **🤖 2. Android Implementation**

#### **A. Native Module Class**
```java
// android/app/src/main/java/io/metamask/nativeModules/RCTMinimizer.java
package io.metamask.nativeModules;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class RCTMinimizer extends ReactContextBaseJavaModule {
  private ReactApplicationContext reactContext;
  
  RCTMinimizer(ReactApplicationContext context) {
    super(context);
    this.reactContext = context;
  }

  @Override
  public String getName() {
    return "Minimizer"; // 📌 Tên module accessible từ JS
  }

  @ReactMethod
  public void goBack() {
    android.app.Activity activity = getCurrentActivity();
    if (activity != null) {
      activity.moveTaskToBack(true); // 🚀 MOVE TO BACKGROUND
    }
  }
}
```

#### **B. Package Registration**
```java
// android/app/src/main/java/io/metamask/nativeModules/RCTMinimizerPackage.java
public class RCTMinimizerPackage implements ReactPackage {
  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    List<NativeModule> modules = new ArrayList<>();
    modules.add(new RCTMinimizer(reactContext)); // 📌 Register module
    return modules;
  }
}
```

#### **C. App Integration**
```kotlin
// android/app/src/main/java/io/metamask/MainApplication.kt
import io.metamask.nativeModules.RCTMinimizerPackage

class MainApplication : Application(), ReactApplication {
  override val reactNativeHost: ReactNativeHost = ReactNativeHostWrapper(
    this,
    object : DefaultReactNativeHost(this) {
      override fun getPackages(): List<ReactPackage> {
        val packages = PackageList(this).packages.toMutableList()
        packages.add(RCTMinimizerPackage()) // 🚀 ADD MINIMIZER PACKAGE
        return packages
      }
    }
  )
}
```

### **🍎 3. iOS Implementation**

#### **A. Header Declaration**
```objc
// ios/MetaMask/NativeModules/RCTMinimizer/RCTMinimizer.h
#import <React/RCTBridgeModule.h>

@interface RCTMinimizer : NSObject <RCTBridgeModule>
@end
```

#### **B. Implementation**
```objc
// ios/MetaMask/NativeModules/RCTMinimizer/RCTMinimizer.m
#import "RCTMinimizer.h"
#import <UIKit/UIKit.h>
#import <objc/runtime.h>

@interface UISystemNavigationAction : NSObject
@property(nonatomic, readonly, nonnull) NSArray<NSNumber*>* destinations;
-(BOOL)sendResponseForDestination:(NSUInteger)destination;
@end

@implementation RCTMinimizer

RCT_EXPORT_METHOD(goBack)
{
  // 🚀 ACCESS PRIVATE iOS API để minimize app
  Ivar sysNavIvar = class_getInstanceVariable(UIApplication.class, "_systemNavigationAction");
  UIApplication* app = UIApplication.sharedApplication;
  UISystemNavigationAction* action = object_getIvar(app, sysNavIvar);
  
  if (!action) {
      return;
  }
  
  NSUInteger destination = action.destinations.firstObject.unsignedIntegerValue;
  [action sendResponseForDestination:destination]; // 🚀 NAVIGATE BACK
}

RCT_EXPORT_MODULE(); // 📌 Register với React Native bridge

@end
```

## ⚙️ **4. How It Works**

### **A. Android Mechanism**
```java
activity.moveTaskToBack(true);
```

**Cách hoạt động:**
- `moveTaskToBack(true)` moves current task (MetaMask) to background
- **`true` parameter**: Means non-root activities are also moved to back
- **Result**: Previous app in task stack (DApp) becomes visible
- **System behavior**: Android task switcher shows previous app

### **B. iOS Mechanism** 
```objc
// Access private UISystemNavigationAction
UISystemNavigationAction* action = object_getIvar(app, sysNavIvar);
[action sendResponseForDestination:destination];
```

**Cách hoạt động:**
- **Private API Access**: Uses runtime introspection để access private iOS APIs
- **UISystemNavigationAction**: Handles system-level navigation
- **sendResponseForDestination**: Simulates system back navigation
- **Result**: App switches back to previous app (DApp)

## 🔄 **5. Usage Flow trong App**

### **A. WalletConnect Redirect Flow**
```typescript
// 1. Request completed
approveRequest = async ({ id, result }) => {
  await this.web3Wallet.respondSessionRequest({ topic, response: {...} });
  
  // 2. Check for pending requests
  const hasPendingSignRequest = requests[0]?.params?.request?.method === 'personal_sign';
  
  if (!hasPendingSignRequest) {
    this.needsRedirect(id); // 3. Trigger redirect
  }
};

// 4. Redirect execution
needsRedirect = (id: string) => {
  if (this.requestsToRedirect[id]) {
    this.redirect(`needsRedirect_${id}`); // 5. Call redirect
  }
};

// 6. Platform-specific redirect
redirect = (context?: string) => {
  if (Device.isIos() && parseInt(Platform.Version as string) >= 17) {
    // iOS 17+: Use direct app linking
    Linking.openURL(peerLink);
  } else {
    // Older iOS/Android: Use Minimizer
    Minimizer.goBack(); // 🚀 MINIMIZE TO SHOW DAPP
  }
};
```

### **B. SDK Connection Flow**
```typescript
// app/core/SDKConnect/handlers/handleSendMessage.ts
const canRedirect = connection.rpcQueueManager.canRedirect({ method });

if (connection.trigger === 'deeplink' && canRedirect) {
  // Show return modal instead of direct minimize
  connection.navigation?.navigate(Routes.MODAL.ROOT_MODAL_FLOW, {
    screen: Routes.SHEET.RETURN_TO_DAPP_MODAL,
  });
}
```

## 🎯 **6. Platform Differences**

### **Android:**
- **Simple**: `moveTaskToBack(true)` API
- **Reliable**: Standard Android behavior
- **Backwards Compatible**: Works on all Android versions

### **iOS:**
- **Complex**: Uses private APIs via runtime introspection
- **Version Dependent**: Different behavior on iOS 17+
- **Potential Risk**: Private API usage might break in future iOS versions
- **Alternative**: iOS 17+ uses `Linking.openURL()` with app schemes

## 🚨 **7. Edge Cases & Considerations**

### **A. Android Background Restrictions**
```kotlin
// MainActivity.kt - Handle back button behavior
override fun invokeDefaultOnBackPressed() {
  if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.R) {
    if (!moveTaskToBack(false)) {
      super.invokeDefaultOnBackPressed(); // Fallback
    }
    return;
  }
  super.invokeDefaultOnBackPressed(); // Android S+ default behavior
}
```

### **B. iOS Private API Risks**
- **Apple Review**: Private API usage có thể bị reject
- **iOS Updates**: Có thể break trong future iOS versions
- **Graceful Degradation**: Return to DApp modal as fallback

### **C. Connection Type Handling**
```typescript
// Skip redirect for QR code connections
if (this.requestOriginatedFrom === AppConstants.DEEPLINKS.ORIGIN_QR_CODE) {
  return; // Don't minimize for QR scanned connections
}
```

## 🛠️ **8. Cách tạo Custom Minimizer**

### **A. Create New Native Module**

#### **1. Android Implementation**
```java
// Create new module
public class CustomMinimizer extends ReactContextBaseJavaModule {
  @ReactMethod
  public void minimizeApp() {
    Activity activity = getCurrentActivity();
    if (activity != null) {
      activity.moveTaskToBack(true);
    }
  }
  
  @ReactMethod  
  public void minimizeWithDelay(int delayMs) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.postDelayed(() -> {
      minimizeApp();
    }, delayMs);
  }
}
```

#### **2. iOS Implementation**
```objc
@implementation CustomMinimizer

RCT_EXPORT_METHOD(minimizeApp)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    // Your custom minimize logic
    [[UIApplication sharedApplication] performSelector:@selector(suspend)];
  });
}

RCT_EXPORT_METHOD(minimizeWithDelay:(NSNumber*)delay)
{
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, [delay intValue] * NSEC_PER_MSEC), 
                dispatch_get_main_queue(), ^{
    [self minimizeApp];
  });
}

@end
```

### **B. Register Module**
```java
// Package registration
public class CustomMinimizerPackage implements ReactPackage {
  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    List<NativeModule> modules = new ArrayList<>();
    modules.add(new CustomMinimizer(reactContext));
    return modules;
  }
}
```

### **C. Use in JavaScript**
```typescript
import { NativeModules } from 'react-native';
const { CustomMinimizer } = NativeModules;

// Usage
CustomMinimizer.minimizeApp();
CustomMinimizer.minimizeWithDelay(1000); // Delay 1 second
```

**Minimizer** là một elegant solution để tạo seamless UX cho users khi switch giữa MetaMask và DApps, đặc biệt quan trọng cho WalletConnect và deeplink flows.

```typescript
// app/core/NativeModules.ts
import { NativeModules } from 'react-native';

// Minimizer module allows the app to be pushed to the background
const { Minimizer } = NativeModules;

export { Minimizer };
```

```typescript
// app/core/WalletConnect/WalletConnect2Session.ts
import { Minimizer } from '../NativeModules';

redirect = (context?: string) => {
  setTimeout(() => {
    if (Device.isIos() && parseInt(Platform.Version as string) >= 17) {
      // iOS 17+ specific logic
    } else {
      Minimizer.goBack(); // 🚀 MINIMIZE APP
    }
  }, 100);
};
```

```java
// android/app/src/main/java/io/metamask/nativeModules/RCTMinimizer.java
package io.metamask.nativeModules;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class RCTMinimizer extends ReactContextBaseJavaModule {
  private ReactApplicationContext reactContext;
  
  RCTMinimizer(ReactApplicationContext context) {
    super(context);
    this.reactContext = context;
  }

  @Override
  public String getName() {
    return "Minimizer"; // 📌 Tên module accessible từ JS
  }

  @ReactMethod
  public void goBack() {
    android.app.Activity activity = getCurrentActivity();
    if (activity != null) {
      activity.moveTaskToBack(true); // 🚀 MOVE TO BACKGROUND
    }
  }
}
```

```java
// android/app/src/main/java/io/metamask/nativeModules/RCTMinimizerPackage.java
public class RCTMinimizerPackage implements ReactPackage {
  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    List<NativeModule> modules = new ArrayList<>();
    modules.add(new RCTMinimizer(reactContext)); // 📌 Register module
    return modules;
  }
}
```

```kotlin
// android/app/src/main/java/io/metamask/MainApplication.kt
import io.metamask.nativeModules.RCTMinimizerPackage

class MainApplication : Application(), ReactApplication {
  override val reactNativeHost: ReactNativeHost = ReactNativeHostWrapper(
    this,
    object : DefaultReactNativeHost(this) {
      override fun getPackages(): List<ReactPackage> {
        val packages = PackageList(this).packages.toMutableList()
        packages.add(RCTMinimizerPackage()) // 🚀 ADD MINIMIZER PACKAGE
        return packages
      }
    }
  )
}
```

```plaintext
// ios/MetaMask/NativeModules/RCTMinimizer/RCTMinimizer.h
#import <React/RCTBridgeModule.h>

@interface RCTMinimizer : NSObject <RCTBridgeModule>
@end
```

```plaintext
// ios/MetaMask/NativeModules/RCTMinimizer/RCTMinimizer.m
#import "RCTMinimizer.h"
#import <UIKit/UIKit.h>
#import <objc/runtime.h>

@interface UISystemNavigationAction : NSObject
@property(nonatomic, readonly, nonnull) NSArray<NSNumber*>* destinations;
-(BOOL)sendResponseForDestination:(NSUInteger)destination;
@end

@implementation RCTMinimizer

RCT_EXPORT_METHOD(goBack)
{
  // 🚀 ACCESS PRIVATE iOS API để minimize app
  Ivar sysNavIvar = class_getInstanceVariable(UIApplication.class, "_systemNavigationAction");
  UIApplication* app = UIApplication.sharedApplication;
  UISystemNavigationAction* action = object_getIvar(app, sysNavIvar);
  
  if (!action) {
      return;
  }
  
  NSUInteger destination = action.destinations.firstObject.unsignedIntegerValue;
  [action sendResponseForDestination:destination]; // 🚀 NAVIGATE BACK
}

RCT_EXPORT_MODULE(); // 📌 Register với React Native bridge

@end
```

```java
activity.moveTaskToBack(true);
```

```plaintext
// Access private UISystemNavigationAction
UISystemNavigationAction* action = object_getIvar(app, sysNavIvar);
[action sendResponseForDestination:destination];
```

```typescript
// 1. Request completed
approveRequest = async ({ id, result }) => {
  await this.web3Wallet.respondSessionRequest({ topic, response: {...} });
  
  // 2. Check for pending requests
  const hasPendingSignRequest = requests[0]?.params?.request?.method === 'personal_sign';
  
  if (!hasPendingSignRequest) {
    this.needsRedirect(id); // 3. Trigger redirect
  }
};

// 4. Redirect execution
needsRedirect = (id: string) => {
  if (this.requestsToRedirect[id]) {
    this.redirect(`needsRedirect_${id}`); // 5. Call redirect
  }
};

// 6. Platform-specific redirect
redirect = (context?: string) => {
  if (Device.isIos() && parseInt(Platform.Version as string) >= 17) {
    // iOS 17+: Use direct app linking
    Linking.openURL(peerLink);
  } else {
    // Older iOS/Android: Use Minimizer
    Minimizer.goBack(); // 🚀 MINIMIZE TO SHOW DAPP
  }
};
```

```typescript
// app/core/SDKConnect/handlers/handleSendMessage.ts
const canRedirect = connection.rpcQueueManager.canRedirect({ method });

if (connection.trigger === 'deeplink' && canRedirect) {
  // Show return modal instead of direct minimize
  connection.navigation?.navigate(Routes.MODAL.ROOT_MODAL_FLOW, {
    screen: Routes.SHEET.RETURN_TO_DAPP_MODAL,
  });
}
```

```kotlin
// MainActivity.kt - Handle back button behavior
override fun invokeDefaultOnBackPressed() {
  if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.R) {
    if (!moveTaskToBack(false)) {
      super.invokeDefaultOnBackPressed(); // Fallback
    }
    return;
  }
  super.invokeDefaultOnBackPressed(); // Android S+ default behavior
}
```

```typescript
// Skip redirect for QR code connections
if (this.requestOriginatedFrom === AppConstants.DEEPLINKS.ORIGIN_QR_CODE) {
  return; // Don't minimize for QR scanned connections
}
```

```java
// Create new module
public class CustomMinimizer extends ReactContextBaseJavaModule {
  @ReactMethod
  public void minimizeApp() {
    Activity activity = getCurrentActivity();
    if (activity != null) {
      activity.moveTaskToBack(true);
    }
  }
  
  @ReactMethod  
  public void minimizeWithDelay(int delayMs) {
    Handler handler = new Handler(Looper.getMainLooper());
    handler.postDelayed(() -> {
      minimizeApp();
    }, delayMs);
  }
}
```

```plaintext
@implementation CustomMinimizer

RCT_EXPORT_METHOD(minimizeApp)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    // Your custom minimize logic
    [[UIApplication sharedApplication] performSelector:@selector(suspend)];
  });
}

RCT_EXPORT_METHOD(minimizeWithDelay:(NSNumber*)delay)
{
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, [delay intValue] * NSEC_PER_MSEC), 
                dispatch_get_main_queue(), ^{
    [self minimizeApp];
  });
}

@end
```

```java
// Package registration
public class CustomMinimizerPackage implements ReactPackage {
  @Override
  public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
    List<NativeModule> modules = new ArrayList<>();
    modules.add(new CustomMinimizer(reactContext));
    return modules;
  }
}
```

```typescript
import { NativeModules } from 'react-native';
const { CustomMinimizer } = NativeModules;

// Usage
CustomMinimizer.minimizeApp();
CustomMinimizer.minimizeWithDelay(1000); // Delay 1 second
```

