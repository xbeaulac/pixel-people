<template>
  <section class="connect">
    <div class="container">
      <p class="heading-mini">Minting</p>
      <h2 class="h2">Please connect your wallet.</h2>
      <div class="connect-btn-container">
        <button class="connect-btn">MetaMask</button>
        <button class="connect-btn">Coinbase Wallet</button>
        <button class="connect-btn">WalletConnect</button>
      </div>
      <p class="text">Then, click the arrow on the right to continue.</p>
    </div>
  </section>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {};
</script>

<style scoped>
/* -------------------- */
/* CONNECT WALLET SECTION */
/* -------------------- */
.connect {
  background-color: #ffc825;
  color: #1a1932;
  padding: 3.2rem 0;
}
.connect .text {
  color: #1a1932;
}
.connect-btn-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 6.4rem;
}
.connect-btn {
  background-color: #ffffff;
  width: 33%;
  font-size: 2.4rem;
  font-weight: 500;
  padding: 2.4rem 0;
  margin: 1.2rem 0;
  border-radius: 4px;
  box-shadow: 0 0.8rem 1.2rem 0 rgba(33, 37, 41, 0.12);
  transition: all 0.25s;
}
.connect-btn:first-child {
  margin-top: 0;
}
.connect-btn:hover {
  background-color: #e9ecef;
}
.connect-icon {
  font-size: 4.8rem;
  background-color: #ffffff;
  padding: 1.6rem;
  border-radius: 4px;
  margin-bottom: 4.8rem;
  align-self: center;
  box-shadow: 0 0.8rem 1.2rem rgba(33, 37, 41, 0.12);
}
</style>
