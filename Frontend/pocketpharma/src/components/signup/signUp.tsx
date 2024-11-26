import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../graphql/mutations";
import { GoogleIcon, FacebookIcon } from "./CustomIcons";
import { useNavigate } from "react-router-dom";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "135vh",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
  },
}));

export default function SignUp() {
  const navigate = useNavigate();
  const [registerUser, { loading, error }] = useMutation(REGISTER_USER);
  const [formErrors, setFormErrors] = React.useState({
    emailError: false,
    emailErrorMessage: "",
    passwordError: false,
    passwordErrorMessage: "",
    firstNameError: false,
    firstNameErrorMessage: "",
    lastNameError: false,
    lastNameErrorMessage: "",
    usernameError: false,
    usernameErrorMessage: "",
    phoneNumberError: false,
    phoneNumberErrorMessage: "",
  });

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const firstName = document.getElementById("firstName") as HTMLInputElement;
    const lastName = document.getElementById("lastName") as HTMLInputElement;
    const username = document.getElementById("username") as HTMLInputElement;
    const phoneNumber = document.getElementById(
      "phoneNumber"
    ) as HTMLInputElement;

    let isValid = true;
    const newErrors = {
      emailError: false,
      emailErrorMessage: "",
      passwordError: false,
      passwordErrorMessage: "",
      firstNameError: false,
      firstNameErrorMessage: "",
      lastNameError: false,
      lastNameErrorMessage: "",
      usernameError: false,
      usernameErrorMessage: "",
      phoneNumberError: false,
      phoneNumberErrorMessage: "",
    };

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      newErrors.emailError = true;
      newErrors.emailErrorMessage = "Please enter a valid email address.";
      isValid = false;
    }

    if (!password.value || password.value.length < 6) {
      newErrors.passwordError = true;
      newErrors.passwordErrorMessage =
        "Password must be at least 6 characters long.";
      isValid = false;
    }

    if (!firstName.value) {
      newErrors.firstNameError = true;
      newErrors.firstNameErrorMessage = "First name is required.";
      isValid = false;
    }

    if (!lastName.value) {
      newErrors.lastNameError = true;
      newErrors.lastNameErrorMessage = "Last name is required.";
      isValid = false;
    }

    if (!username.value) {
      newErrors.usernameError = true;
      newErrors.usernameErrorMessage = "Username is required.";
      isValid = false;
    }

    if (!phoneNumber.value || !/^\d+$/.test(phoneNumber.value)) {
      newErrors.phoneNumberError = true;
      newErrors.phoneNumberErrorMessage = "Please enter a valid phone number.";
      isValid = false;
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateInputs()) {
      const data = new FormData(event.currentTarget);

      try {
        await registerUser({
          variables: {
            firstName: data.get("firstName") as string,
            lastName: data.get("lastName") as string,
            username: data.get("username") as string,
            email: data.get("email") as string,
            password: data.get("password") as string,
            phoneNumber: data.get("phoneNumber") as string,
            role: "PATIENT",
          },
        });
        navigate("/signIn"); // Redirect to sign-in page
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <CssBaseline />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <img
            src="/pocketpharmalogo2-removebg-preview.png"
            alt=""
            style={{
              width: "150px",
              height: "auto",
              margin: "0",
              display: "block",
            }}
          />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="firstName">First Name</FormLabel>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    id="firstName"
                    placeholder="Jon"
                    error={formErrors.firstNameError}
                    helperText={formErrors.firstNameErrorMessage}
                    color={formErrors.firstNameError ? "error" : "primary"}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="lastName">Last Name</FormLabel>
                  <TextField
                    autoComplete="family-name"
                    name="lastName"
                    required
                    id="lastName"
                    placeholder="Snow"
                    error={formErrors.lastNameError}
                    helperText={formErrors.lastNameErrorMessage}
                    color={formErrors.lastNameError ? "error" : "primary"}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <TextField
                    required
                    id="username"
                    placeholder="jonsnow"
                    name="username"
                    error={formErrors.usernameError}
                    helperText={formErrors.usernameErrorMessage}
                    color={formErrors.usernameError ? "error" : "primary"}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                  <TextField
                    required
                    id="phoneNumber"
                    placeholder="1234567890"
                    name="phoneNumber"
                    error={formErrors.phoneNumberError}
                    helperText={formErrors.phoneNumberErrorMessage}
                    color={formErrors.phoneNumberError ? "error" : "primary"}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <TextField
                    required
                    id="email"
                    placeholder="your@email.com"
                    name="email"
                    autoComplete="email"
                    error={formErrors.emailError}
                    helperText={formErrors.emailErrorMessage}
                    color={formErrors.emailError ? "error" : "primary"}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <TextField
                    required
                    name="password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    error={formErrors.passwordError}
                    helperText={formErrors.passwordErrorMessage}
                    color={formErrors.passwordError ? "error" : "primary"}
                  />
                </FormControl>
              </Grid>
            </Grid>

            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive updates via email."
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
            >
              Sign up
            </Button>

            {error && <Typography color="error">{error.message}</Typography>}

            <Typography sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <Link href="/sign-in" variant="body2">
                Sign in
              </Link>
            </Typography>
          </Box>

          <Divider>
            <Typography sx={{ color: "text.secondary" }}>or</Typography>
          </Divider>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign up with Google")}
              startIcon={<GoogleIcon />}
            >
              Sign up with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert("Sign up with Facebook")}
              startIcon={<FacebookIcon />}
            >
              Sign up with Facebook
            </Button>
          </Box>
        </Card>
      </SignUpContainer>
    </>
  );
}
