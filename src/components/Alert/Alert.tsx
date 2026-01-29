import { useState, type FC } from "react";
import { AlertCTA, type AlertCTAProps } from "./AlertCTA";
import styles from "./Alert.module.css";

export type AlertProps = {
  heading: string;
  copy: string;
  cta?: AlertCTAProps;
  onAlertClose?: () => void;
};

const Alert: FC<AlertProps> = ({ heading, copy, cta, onAlertClose }) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    onAlertClose?.();
  };

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.alert} role="alert">
      <div className={styles.alert__heading}>
        <img
          src="/pr-alert/check-circle.svg"
          alt=""
          width={16}
          height={16}
          aria-hidden
        />
        <h3 className={styles["alert__heading-text"]}>{heading}</h3>
      </div>
      <p className={styles.alert__copy}>{copy}</p>
      {cta && <AlertCTA ctaCopy={cta.ctaCopy} ctaAction={cta.ctaAction} href={cta.href} />}
      <button
        type="button"
        className={styles.alert__close}
        onClick={handleClose}
        aria-label="Close alert"
      >
        <img
          src="/pr-alert/x.svg"
          alt=""
          width={12}
          height={12}
          aria-hidden
        />
      </button>
    </div>
  );
}

export { Alert };
