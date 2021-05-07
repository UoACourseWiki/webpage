import {
  Button,
  TextField,
  Container,
  Box,
  Typography,
  CssBaseline,
} from "@material-ui/core";
import { Copyright } from "../../utils/ViewComponent";
import styles from "./ResetPage.module.css";

export default function LoginPage({ updateInfo, isWaiting, submit }) {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={styles.paper}>
        <Typography component="h1" variant="h5">
          Log in to CourseWiki
        </Typography>

        <form className={styles.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => updateInfo({ em: e.target.value })}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={submit}
            disabled={isWaiting}
          >
            Send password reset email
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
