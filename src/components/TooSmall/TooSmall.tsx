import css from './TooSmall.module.css';

const TooSmall = ()=> (
  <div className={css.container}>
  <div className={css.content}>
    <main className={css.main}>
      <p className={css.errorCode}>Wow</p>
      <div className={css.messageContainer}>
        <h1 className={css.title}>Poca pantalla</h1>
        <p className={css.description}>
          Prueba a cargar esta página en un dispositivo más grande.
        </p>
      </div>
    </main>
  </div>
</div>
);

export default TooSmall;