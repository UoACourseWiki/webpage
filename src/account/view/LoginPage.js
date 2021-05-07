import {
  Button,
  TextField,
  FormControlLabel,
  Grid,
  Container,
  Box,
  Typography,
  CssBaseline,
  Checkbox,
  Link,
} from "@material-ui/core";
import { Copyright } from "../../utils/ViewComponent";
import styles from "./LoginPage.module.css";
import { signupPath, resetPassword } from "../../utils/URLPath";

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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => updateInfo({ pd: e.target.value })}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={submit}
            disabled={isWaiting}
          >
            Log in
          </Button>
          <Grid className={styles.grid} container>
            <Grid item xs>
              <Link href={resetPassword} variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href={signupPath} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
