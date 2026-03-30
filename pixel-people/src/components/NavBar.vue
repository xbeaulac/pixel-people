<template>
  <nav class="nav">
    <div class="nav-container container">
      <div class="logo">
        <router-link :to="{ name: 'Home' }">
          <img src="@/assets/logo.png" alt="Logo" class="logo-img" />
        </router-link>
        <div class="title-container">
          <router-link :to="{ name: 'Home' }" class="logo-name"
            >Pixel People.</router-link
          >
          <!-- <p class="text testnet">Testnet</p> -->
        </div>
      </div>
      <div class="nav-links">
        <router-link class="nav-link" :to="{name: 'Mint'}">Mint</router-link>
        <!-- <router-link class="nav-link" :to="{ name: 'Gallery' }"
          >Gallery</router-link
        > -->
        <router-link class="nav-link" :to="{ name: 'Roadmap' }"
          >Roadmap</router-link
        >
        <div class="nav-btn-container">
          <button
            class="nav-btn"
            @click="isActivated ? disconnectAndLogout() : open()"
            :disabled="status === 'connecting'"
          >
            <!-- <span class="material-icons icon">account_balance_wallet</span> -->
            {{
              status === "connected" //? `${shortenAddress(address)}`
                ? "Disconnect"
                : status === "connecting"
                ? "Connecting..."
                : "Connect"
            }}
          </button>
          <p class="nav-text" v-if="user && status === 'connected'">
            {{ displayAddress }}
          </p>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import getUser from "@/composables/getUser";
import useLogin from "@/composables/useLogin";
import useLogout from "@/composables/useLogout";
import useCollection from "@/composables/useCollection";
import { func, db } from "@/firebase/config";
import { useBoard, useEthers, useWallet, shortenAddress } from "vue-dapp";
import { ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
import { httpsCallable } from "@firebase/functions";
import { doc, getDoc } from "firebase/firestore";
export default {
  setup() {
    const { open } = useBoard();
    const { status, disconnect, connect, walletName } = useWallet();
    const { address, isActivated } = useEthers();
    const { user } = getUser();
    const { logout, error: logoutError } = useLogout();
    const { login, error: loginError } = useLogin();
    const { addDoc, error: colError } = useCollection("users");
    const customToken = ref(null);
    const displayAddress = ref("");

    onMounted(async () => {
      if (user.value) {
        const userDoc = await getDoc(doc(db, "users", user.value.uid));
        if (userDoc.exists()) {
          connect(userDoc.data().walletName);
        }
      }
    });

    watch(address, () => {
      if (status.value === "connected" && address.value) {
        console.log("Connected.");
        displayAddress.value = shortenAddress(address.value);
        const tokenFromAddress = httpsCallable(func, "tokenFromAddress");
        tokenFromAddress({ address: address.value })
          .then((result) => {
            customToken.value = result.data;
          })
          .catch((error) => {
            console.log("Function failed:", error);
          });
      }
    });

    watch(customToken, async () => {
      if (customToken.value) {
        await login(customToken.value);
        if (!loginError.value) {
          console.log("Successfully logged in.");
        }
        if (user.value) {
          const userDoc = await getDoc(doc(db, "users", user.value.uid));
          if (!userDoc.exists()) {
            await addDoc(
              {
                address: user.value.uid,
                choices: {},
                walletName: walletName.value,
              },
              user.value.uid
            );
            console.log("Created User Document");
          }
        }
      }
    });

    const handleLogout = async () => {
      await logout();
      if (!logoutError.value) {
        console.log("Successfully logged out.");
      }
    };

    const disconnectAndLogout = () => {
      disconnect();
      console.log("Disconnected.");
      handleLogout();
    };

    return {
      user,
      handleLogout,
      open,
      status,
      disconnect,
      address,
      isActivated,
      shortenAddress,
      disconnectAndLogout,
      displayAddress,
    };
  },
};
</script>

<style scoped>
.nav {
  width: 100vw;
  position: fixed;
  z-index: 9999;
  background-color: rgba(26, 25, 50, 0.95);
  backdrop-filter: blur(0.6rem);
  /* box-shadow: 0 0.2rem 1.6rem 0 rgba(0, 0, 0, 0.18); */
}
.nav-container {
  height: 6.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  max-width: 100vw;
  margin: 0 auto;
  padding: 0 3.2rem;
}
.nav-links {
  display: flex;
  align-items: center;
}

.logo-img {
  height: 4rem;
  width: auto;
}
.title-container {
  display: flex;
  margin-bottom: 0.2rem;
}
.logo-name {
  align-self: center;
}
.nav-wallet {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.nav-btn-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.8rem 0 0.8rem 1.6rem;
}

.nav-btn,
.nav-link:link,
.nav-link:visited {
  color: #ffffff;
  text-decoration: none;
  font-size: 1.8rem;
  margin: 0.8rem 1.6rem;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.4px;
  transition: all 0.25s;
}
.nav-link.router-link-active {
  color: #ffc825;
}
.nav-link.router-link-active:hover {
  color: #cc9900;
}

.nav-btn:hover,
.nav-btn:active,
.nav-link:hover,
.nav-link:active {
  color: #92a1b9;
}

.nav-btn {
  margin: 0;
}
.nav-link:last-child {
  margin-right: 0;
}

.nav-text {
  color: #92a1b9;
  font-weight: 400;
  font-size: 1.2rem;
  padding-top: 0.4rem;
}
</style>
