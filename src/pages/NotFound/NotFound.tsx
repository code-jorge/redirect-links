import css from './NotFound.module.css';

const NotFound = ()=> (
  <div className={css.container}>
  <div className={css.content}>
    <main className={css.main}>
      <p className={css.errorCode}>404</p>
      <div className={css.messageContainer}>
        <h1 className={css.title}>Link not found</h1>
        <p className={css.description}>
          Please check the URL and try again.
        </p>
      </div>
    </main>
  </div>
</div>
);

export default NotFound;