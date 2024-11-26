// import * as React from "react";
// import {
//   Box,
//   Button,
//   Checkbox,
//   CssBaseline,
//   FormControl,
//   FormControlLabel,
//   FormLabel,
//   Link,
//   TextField,
//   Typography,
//   Stack,
//   Divider,
//   Card as MuiCard,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import ForgotPassword from "./ForgotPassword";
// import { GoogleIcon, FacebookIcon } from "./CustomIcon";

// // Styled components
// const Card = styled(MuiCard)(({ theme }) => ({
//   display: "flex",
//   flexDirection: "column",
//   alignSelf: "center",
//   padding: theme.spacing(4),
//   gap: theme.spacing(2),
//   maxWidth: 450,
//   boxShadow:
//     "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
//   ...theme.applyStyles("dark", {
//     boxShadow:
//       "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
//   }),
// }));

// const SignInContainer = styled(Stack)(({ theme }) => ({
//   minHeight: "100vh",
//   padding: theme.spacing(2),
//   backgroundImage:
//     "radial-gradient(ellipse at center, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
//   ...theme.applyStyles("dark", {
//     backgroundImage:
//       "radial-gradient(at center, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
//   }),
// }));

// export default function SignIn() {
//   const [open, setOpen] = React.useState(false);
//   const [formErrors, setFormErrors] = React.useState({
//     email: "",
//     password: "",
//   });

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     const email = data.get("email") as string;
//     const password = data.get("password") as string;

//     let errors = { email: "", password: "" };
//     if (!email || !/\S+@\S+\.\S+/.test(email)) {
//       errors.email = "Please enter a valid email address.";
//     }
//     if (!password || password.length < 6) {
//       errors.password = "Password must be at least 6 characters.";
//     }
//     setFormErrors(errors);

//     if (!errors.email && !errors.password) {
//       console.log({ email, password });
//     }
//   };

//   return (
//     <>
//       <CssBaseline />
//       <SignInContainer direction="column" justifyContent="center">
//         <Card variant="outlined">
//           <img
//             src="/pocketpharmalogo2-removebg-preview.png"
//             alt="Logo"
//             style={{ width: "150px", alignSelf: "center" }}
//           />
//           <Typography
//             component="h1"
//             variant="h4"
//             align="center"
//             sx={{ fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
//           >
//             Sign in
//           </Typography>
//           <Box component="form" onSubmit={handleSubmit} sx={{ gap: 2 }}>
//             <FormControl fullWidth margin="normal">
//               <FormLabel>Email</FormLabel>
//               <TextField
//                 name="email"
//                 placeholder="your@email.com"
//                 error={!!formErrors.email}
//                 helperText={formErrors.email}
//                 variant="outlined"
//               />
//             </FormControl>
//             <FormControl fullWidth margin="normal">
//               <FormLabel>Password</FormLabel>
//               <TextField
//                 name="password"
//                 type="password"
//                 placeholder="••••••"
//                 error={!!formErrors.password}
//                 helperText={formErrors.password}
//                 variant="outlined"
//               />
//               <Link
//                 component="button"
//                 onClick={() => setOpen(true)}
//                 variant="body2"
//                 sx={{ mt: 1, textAlign: "right", display: "block" }}
//               >
//                 Forgot your password?
//               </Link>
//             </FormControl>
//             <FormControlLabel
//               control={<Checkbox color="primary" />}
//               label="Remember me"
//             />
//             <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
//               Sign in
//             </Button>
//             <Typography align="center" variant="body2" sx={{ mt: 1 }}>
//               Don&apos;t have an account?{" "}
//               <Link href="/signUp" variant="body2">
//                 Sign up
//               </Link>
//             </Typography>
//           </Box>
//           <Divider sx={{ my: 2 }}>or</Divider>
//           <Stack spacing={2}>
//             <Button
//               fullWidth
//               variant="outlined"
//               startIcon={<GoogleIcon />}
//               onClick={() => alert("Sign in with Google")}
//             >
//               Sign in with Google
//             </Button>
//             <Button
//               fullWidth
//               variant="outlined"
//               startIcon={<FacebookIcon />}
//               onClick={() => alert("Sign in with Facebook")}
//             >
//               Sign in with Facebook
//             </Button>
//           </Stack>
//           <ForgotPassword open={open} handleClose={() => setOpen(false)} />
//         </Card>
//       </SignInContainer>
//     </>
//   );
// }

import * as React from "react";
import { gql, useQuery } from "@apollo/client";
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormLabel,
  Link,
  TextField,
  Typography,
  Stack,
  Divider,
  Card as MuiCard,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import ForgotPassword from "./ForgotPassword";
import { GoogleIcon, FacebookIcon } from "./CustomIcon";

// Define the GetUsers query
const GET_USERS = gql`
  query GetUsers {
    getUsers {
      email
      password
      role
      id
      firstName
      lastName
    }
  }
`;

// Styled components
const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  maxWidth: 450,
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(2),
  backgroundImage:
    "radial-gradient(ellipse at center, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  ...theme.applyStyles("dark", {
    backgroundImage:
      "radial-gradient(at center, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
  }),
}));

export default function SignIn() {
  const { data } = useQuery(GET_USERS);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [formErrors, setFormErrors] = React.useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Input validation
    let errors = { email: "", password: "" };
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!password || password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }
    setFormErrors(errors);

    if (!errors.email && !errors.password) {
      // Check if user exists and validate credentials
      const user = data?.getUsers.find(
        (user: { email: string; password: string }) =>
          user.email === email && user.password === password
      );

      if (user) {
        // Role-based redirection
        switch (user.role) {
          case "PATIENT":
            navigate("/pharmacy");
            break;
          case "PHARMACY":
            navigate("/report");
            break;
          case "ADMIN":
            navigate("/dashboard");
            break;
          default:
            console.error("Unknown role:", user.role);
        }
      } else {
        setFormErrors({ ...formErrors, password: "Invalid credentials" });
      }
    }
  };

  return (
    <>
      <CssBaseline />
      <SignInContainer direction="column" justifyContent="center">
        <Card variant="outlined">
          <img
            src="/pocketpharmalogo2-removebg-preview.png"
            alt="Logo"
            style={{ width: "150px", alignSelf: "center" }}
          />
          <Typography
            component="h1"
            variant="h4"
            align="center"
            sx={{ fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ gap: 2 }}>
            <FormControl fullWidth margin="normal">
              <FormLabel>Email</FormLabel>
              <TextField
                name="email"
                placeholder="your@email.com"
                error={!!formErrors.email}
                helperText={formErrors.email}
                variant="outlined"
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <FormLabel>Password</FormLabel>
              <TextField
                name="password"
                type="password"
                placeholder="••••••"
                error={!!formErrors.password}
                helperText={formErrors.password}
                variant="outlined"
              />
              <Link
                component="button"
                onClick={() => setOpen(true)}
                variant="body2"
                sx={{ mt: 1, textAlign: "right", display: "block" }}
              >
                Forgot your password?
              </Link>
            </FormControl>
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Remember me"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              Sign in
            </Button>
            <Typography align="center" variant="body2" sx={{ mt: 1 }}>
              Don&apos;t have an account?{" "}
              <Link href="/signUp" variant="body2">
                Sign up
              </Link>
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }}>or</Divider>
          <Stack spacing={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={() => alert("Sign in with Google")}
            >
              Sign in with Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FacebookIcon />}
              onClick={() => alert("Sign in with Facebook")}
            >
              Sign in with Facebook
            </Button>
          </Stack>
          <ForgotPassword open={open} handleClose={() => setOpen(false)} />
        </Card>
      </SignInContainer>
    </>
  );
}
