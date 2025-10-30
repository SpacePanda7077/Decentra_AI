import { ConnectButton, darkTheme } from "thirdweb/react";
import {
  amoyTestnet,
  amoyTestnetConfig,
  titanAITestnet,
  titanAITestnetConfig,
  torusMainnet,
  torusMainnetConfig,
  hederaTestnetConfig,
  hederaTestnet,
} from "@/utils/chains";
import { client } from "@/lib/thirdweb";

export function ConnectWalletButton() {
  return (
    <ConnectButton
      chain={hederaTestnet}
      client={client}
      theme={darkTheme({
        colors: {
          primaryButtonBg: "black",
          primaryButtonText: "white",
        },
      })}
      connectButton={{
        label: "Sign in with Wallet",
      }}
      supportedTokens={{
        [titanAITestnet.id]: [
          {
            address: titanAITestnetConfig.custom.tokens.UnrealToken.address,
            name: titanAITestnetConfig.custom.tokens.UnrealToken.name,
            symbol: titanAITestnetConfig.custom.tokens.UnrealToken.symbol,
          },
        ],
        [torusMainnet.id]: [
          {
            address: torusMainnetConfig.custom.tokens.UnrealToken.address,
            name: torusMainnetConfig.custom.tokens.UnrealToken.name,
            symbol: torusMainnetConfig.custom.tokens.UnrealToken.symbol,
          },
        ],
        [amoyTestnet.id]: [
          {
            address: amoyTestnetConfig.custom.tokens.UnrealToken.address,
            name: amoyTestnetConfig.custom.tokens.UnrealToken.name,
            symbol: amoyTestnetConfig.custom.tokens.UnrealToken.symbol,
          },
        ],
      }}
    />
  );
}
