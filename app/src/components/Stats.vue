<template>
  <section>
    <h4>Count:</h4>
    <p>You have {{stats.count}} goals total</p>

    <h4>Shortest to Complete:</h4>
    <p>{{stats.shortest}}</p>

    <h4>Longest to Complete:</h4>
    <p>{{stats.longest}}</p>

    <h4>Average Completion Time:</h4>
    <p>{{stats.average}}</p>
  </section>
</template>

<script>

import api from '../services/api';

export default {
  data() {
    return {
      stats: {}
    };
  },
  created() {
    api.getStats()
      .then(stats => {
        stats.average = Math.round(stats.average);
        this.stats = stats;
      });
  }
};
</script>

<style>

</style>
