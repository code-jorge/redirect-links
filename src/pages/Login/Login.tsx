import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'lucide-react';
import { useEffect } from 'react';
import css from './Login.module.css';

const Login = ()=> {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { auth, login } = useAuth();
  const navigate = useNavigate();

  useEffect(()=> {
    if (auth) navigate('/admin');
  }, [auth, navigate]);

  const handleSubmit = async (e: React.FormEvent)=> {
    e.preventDefault();
    setError('');
    try {
      await login(password);
      navigate('/admin');
    } catch (err) {
      console.log(err);
      setError('Invalid email or password');
    }
  }

  return (
    <div className={css.container}>
      <div className={css.content}>
        <div className={css.intro}>
          <div className={css.iconContainer}>
            <Link className={css.icon} />
          </div>
          <h2 className={css.title}>
            Acceso admin
          </h2>
        </div>
        <form className={css.form} onSubmit={handleSubmit}>
          {error && (
            <div className={css.errorContainer}>
              <div className={css.error}>{error}</div>
            </div>
          )}
          <div className={css.fields}>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={css.password}
                placeholder="Contraseña"
              />
            </div>
          </div>
          <div className={css.submitContainer}>
            <button type="submit" className={css.submit}>
              Acceder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;