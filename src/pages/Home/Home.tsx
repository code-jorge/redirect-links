import css from './Home.module.css';

const Home = ()=> (
  <div className={css.container}>
  <div className={css.content}>
    <main className={css.main}>
      <p className={css.errorCode}>👋</p>
      <div className={css.messageContainer}>
        <h1 className={css.title}>Jorgenlaces</h1>
        <p className={css.description}>
          Not sure what to do? Check out{' '}
          <a className={css.link} href="https://jorge.aguirre.sexy">
            my website
          </a>
        </p>
      </div>
    </main>
  </div>
</div>
);

export default Home;