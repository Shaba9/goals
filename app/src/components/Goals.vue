<template>
  <section>
    <h2>Add a Goal:</h2>
    <form @submit.prevent="onAdd">
      <label>Title:
        <input v-model="goal.title">
      </label>
      <label>Start Date:
        <input type="date" v-model="goal.stDate">
      </label>
      <button>Add</button>
    </form>

    <ul v-if="goals">
      <li v-for="g in goals" :key="g.id">{{g.title}}
        <button @click="onComplete(g.id)">Mark Completed</button>
      </li>
    </ul>
  </section>

</template>

<script>

import api from '../services/api';

export default {
  data() {
    return {
      goal: {},
      goals: null,
    };
  },
  created() {
    api.getGoals()
      .then(goals => this.goals = goals);
  },
  methods: {
    onAdd() {
      api.addGoal(this.goal)
        .then(newGoal => {
          this.goals.push(newGoal);
        });
    },
    onComplete(id) {
      const today = new Date();
      const dd = today.getDate();
      const mm = today.getMonth() + 1;
      const yyyy = today.getFullYear();
      const date = `${yyyy}-${mm}-${dd}`;

      api.markComplete(id, date);
    }
  }
};
</script>

<style>

</style>
