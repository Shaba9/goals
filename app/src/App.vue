<template>
  <div class="app">
    <header>
      <span v-if="user">Hello {{user.username}}</span>
      <nav>
        <RouterLink v-if="user" to="/">Home</RouterLink>
        <RouterLink v-if="user" to="/goals">Goals</RouterLink>
        <RouterLink v-if="user" to="/stats">Stats</RouterLink>
        <RouterLink v-if="!user" to="/sign">SignIn/Up</RouterLink>
        <button v-if="user" @click="() => this.user = null">Logout</button>
      </nav>

      <main>
        <Sign v-if="!user"
        :onSignIn="handleSignIn"
        :onSignUp="handleSignUp"/>
        <RouterView v-else></RouterView>
      </main>
    </header>


  </div>
</template>

<script>

import Sign from './components/Sign';
import api from './services/api';

export default {

  data() {
    return {
      user: null
    };
  },
  components: {
    Sign
  },
  methods: {
    handleSignIn(user) {
      api.signIn(user)
        .then(signedUser => {
          this.user = signedUser;
          api.setToken(signedUser.id);
        });
    },
    handleSignUp(user) {
      api.signUp(user)
        .then(addedUser => {
          this.user = addedUser;
          api.setToken(addedUser.id);
        });
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
