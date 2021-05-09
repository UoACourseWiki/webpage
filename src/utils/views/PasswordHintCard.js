import { Card, CardContent } from "@material-ui/core";
import styles from "./PasswordHintCard.module.css";

export default function PasswordHintCard({ open, miniLength, conditions }) {
  return (
    <Card style={{ marginTop: "4px" }}>
      <CardContent className={open ? styles.hintShow : styles.hintHidden}>
        <p
          id="length"
          className={conditions.length ? styles.pdValid : styles.pdInvalid}
        >
          Minimum <b>{miniLength} characters</b>
        </p>
        <p
          id="letter"
          className={conditions.letter ? styles.pdValid : styles.pdInvalid}
        >
          <b>Lowercase & Capital (Uppercase) </b> letters
        </p>
        <p
          id="symbol"
          className={conditions.symbol ? styles.pdValid : styles.pdInvalid}
        >
          A <b>symbol</b> character
        </p>
        <p
          id="number"
          className={conditions.number ? styles.pdValid : styles.pdInvalid}
        >
          A <b>number</b>
        </p>
      </CardContent>
    </Card>
  );
}
