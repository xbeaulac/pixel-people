<template>
  <section class="login">
    <form class="login-grid" @submit.prevent="handleSubmit">
      <div class="title-container">
        <h2 class="h2">Login</h2>
        <p class="text testnet">Testnet</p>
      </div>

      <div class="email">
        <label class="h3">Email</label>
        <input
          class="input"
          type="email"
          name="email"
          v-model="email"
          placeholder="Email"
        />
      </div>
      <div class="password">
        <label class="h3">Password</label>
        <input
          class="input"
          type="password"
          name="password"
          v-model="password"
          placeholder="Password"
        />
      </div>

      <button class="btn-primary submit">Login</button>
      <p class="error">{{ error }}</p>
    </form>
  </section>
</template>

<script>
import { ref } from "@vue/reactivity";
import useLogin from "@/composables/useLogin";
import { useRouter } from "vue-router";
export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const { login, error } = useLogin();
    const router = useRouter();

    const handleSubmit = async () => {
      await login(email.value, password.value);
      if (!error.value) {
        router.push({ name: "Home" });
      }
    };

    return { email, password, error, handleSubmit };
  },
};
</script>

<style scoped>
.login {
  height: calc(100vh - 5rem - 6.4rem);
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-4.8rem);
}
.login-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.4rem;
}
.title-container {
  display: flex;
  margin-bottom: 1.2rem;
}
.testnet {
  color: #ffc825;
  margin-left: 0.4rem;
  letter-spacing: 1px;
}
label {
  display: block;
  margin-bottom: 1.6rem;
}
.input {
  border: none;
  padding: 1.2rem;
  width: 24rem;
  border-radius: 4px;
}
.input:focus {
  outline: none;
  box-shadow: inset 0 0 0 0.2rem #ffc825;
}
.input::placeholder {
  font-family: "Suisse", "Helvetica Neue", "Inter", "Open Sans", Roboto,
    sans-serif;
}
.email,
.password {
  grid-row: 2;
}
.submit {
  grid-column: 1 / -1;
  grid-row: 3;
  margin-top: 2.4rem;
  padding: 0;
  height: 4rem;
}
</style>
