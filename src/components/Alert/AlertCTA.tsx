import type { FC } from "react";
import styles from "./Alert.module.css";

export type AlertCTAProps = {
  ctaCopy: string;
  ctaAction?: () => void;
  href?: string;
};
const AlertCTA: FC<AlertCTAProps> = ({ ctaCopy, ctaAction, href }) => {
  const content = (
    <>
      <span className={styles["alert__cta-icon"]} aria-hidden>
        <img
          src="/pr-alert/eye.svg"
          alt=""
          width={12}
          height={12}
          aria-hidden
        />
      </span>
      {ctaCopy}
    </>
  );

  if (href !== undefined) {
    return (
      <a href={href} className={styles.alert__cta}>
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={styles.alert__cta}
      onClick={ctaAction}
    >
      {content}
    </button>
  );
};

export { AlertCTA };
