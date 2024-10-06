import StoreModule from '../module';

class ProfileState extends StoreModule {
  initState() {
    return {
      profile: {},
      email: '',
      waiting: false,
    };
  }

  async getProfile() {
    const token = localStorage.getItem('token');

    this.setState(
      {
        ...this.getState(),
        waiting: true,
      },
      'Установлены состояния аутентификации',
    );

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
          waiting: false,
        });
      }
    } catch (error) {
      this.setState({
        ...this.getState(),
        error: error.message,
      });
    }
  }
}

export default ProfileState;
