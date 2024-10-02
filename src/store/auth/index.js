import StoreModule from '../module';

class AuthState extends StoreModule {
  initState() {
    return {
      user: {},
      profile: {},
      email: '',
      error: '',
      isAuth: false,
    };
  }

  async login(data) {
    try {
      const res = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (res.ok) {
        this.setState({
          ...this.getState(),
          user: json.result.user,
          isAuth: true,
          error: '',
        });
        localStorage.setItem('token', json.result.token);
      } else
        this.setState({
          ...this.getState(),
          error: json.error.message,
        });
    } catch (error) {
      this.setState({
        ...this.getState(),
        error: error.message,
      });
    }
  }

  async logout() {
    try {
      const res = await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'X-Token': localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        this.setState({
          ...this.getState(),
          isAuth: false,
        });
        localStorage.removeItem('token');
      }
    } catch (error) {
      this.setState({
        ...this.getState(),
        error: error.message,
      });
    }
  }

  async getProfile(token) {
    try {
      const res = await fetch('/api/v1/users/self/?fields=*', {
        method: 'GET',
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
      });
      const json = await res.json();

      if (res.ok) {
        this.setState({
          ...this.getState(),
          email: json.result.email,
          profile: json.result.profile,
        });
      }
    } catch (error) {
      this.setState({
        ...this.getState(),
        error: error.message,
      });
    }
  }

  checkAuth() {
    if (localStorage.getItem('token'))
      this.setState({
        ...this.getState(),
        isAuth: true,
      });
  }
}

export default AuthState;
