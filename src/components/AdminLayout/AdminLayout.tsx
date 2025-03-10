import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LogOut } from 'lucide-react';
import css from './AdminLayout.module.css';
import TooSmall from '../TooSmall/TooSmall';

const AdminLayout = ()=> {
  const { auth, logout } = useAuth();
  if (!auth) return <Navigate to="/login" />;
  return (
    <>
      <div className={css.layout}>
        <nav className={css.nav}>
          <div className={css.navContent}>
            <div className={css.navInner}>
              <div className={css.brand}>
                <h1 className={css.title}>Jorgenlaces</h1>
              </div>
              <div className={css.userSection}>
                <button onClick={logout} className={css.logoutButton}>
                  <LogOut className={css.logoutIcon} />
                </button>
              </div>
            </div>
          </div>
        </nav>
        <main className={css.main}>
          <Outlet />
        </main>
      </div>
      <TooSmall />
    </>
  );
}

export default AdminLayout;