let token = '';

export default {
  setToken(t) {
    token = t;
  },

  signUp(user) {
    return fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        if(response.ok) {
          return response.json();
        }

        return response.json()
          .then(error => {
            return Promise.reject(error);
          });
      });
  },

  signIn(user) {
    return fetch('/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        if(response.ok) {
          return response.json();
        }

        return response.json()
          .then(error => {
            return Promise.reject(error);
          });
      });
  },

  getGoals() {
    return fetch(`/goals/${token}`)
      .then(response => response.json());
  },

  addGoal(goal) {
    goal.userId = token;
    return fetch(`/goals/${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(goal)
    })
      .then(response => response.json());
  },

  getStats() {
    return fetch(`stats/${token}`)
      .then(response => response.json());
  },

  markComplete(id, compDate) {
    return fetch(`goals/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ enDate: compDate })
    });
  }
};