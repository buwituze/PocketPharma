import * as React from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  Snackbar,
  InputAdornment,
} from "@mui/material";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USERS } from "./graphql/queries";
import { REGISTER_USER } from "./graphql/mutations";
import { Visibility, Search } from "@mui/icons-material";
import { SelectChangeEvent } from "@mui/material";
import AppNavAdmin from "./AppBarAdmin";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  nationalId: string;
  licenseNumber: string;
  role: string;
};

export default function Dashboard() {
  const { data } = useQuery(GET_USERS, {
    fetchPolicy: "network-only",
  });

  const [search, setSearch] = React.useState("");
  const [viewUser, setViewUser] = React.useState<User | null>(null);
  const [addUserOpen, setAddUserOpen] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({ open: false, message: "" });
  const [newUser, setNewUser] = React.useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    nationalId: "",
    licenseNumber: "",
    phoneNumber: "",
    role: "PATIENT",
  });

  const handleSnackbarClose = () => setSnackbar({ open: false, message: "" });
  const handleAddUserOpen = () => setAddUserOpen(true);
  const handleAddUserClose = () => setAddUserOpen(false);

  // Adjust the mutation to update the cache directly
  const [registerUser] = useMutation(REGISTER_USER, {
    update(cache, { data: { registerUser } }) {
      // Safely read from cache, accounting for null values
      const existingUsers = cache.readQuery<{ getUsers: User[] }>({
        query: GET_USERS,
      });

      if (existingUsers?.getUsers) {
        // Write the updated list with the new user included
        cache.writeQuery({
          query: GET_USERS,
          data: {
            getUsers: [...existingUsers.getUsers, registerUser],
          },
        });
      }
    },
  });

  const handleAddUser = async () => {
    try {
      await registerUser({ variables: newUser });
      setSnackbar({ open: true, message: "User added successfully" });
      setAddUserOpen(false);
    } catch (error) {
      setSnackbar({ open: true, message: "User already exists, please login" });
    }
  };

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const filteredUsers = data?.getUsers.filter((user: User) =>
    [user.firstName, user.lastName, user.email, user.role]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const formatRole = (role: string) => {
    return role.charAt(0) + role.slice(1).toLowerCase();
  };

  return (
    <Box sx={{ p: 3 }}>
      <AppNavAdmin />
      <Typography
        variant="h5"
        gutterBottom
        sx={{ mt: 10, textAlign: "center", mb: 6 }}
      >
        Admin User Management
      </Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Button variant="contained" onClick={handleAddUserOpen}>
          Add User
        </Button>
        <TextField
          placeholder="Search users..."
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ width: 300 }}
        />
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Role</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers?.map((user: User) => (
              <TableRow key={user.id}>
                <TableCell>{formatRole(user.role)}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>
                  <IconButton onClick={() => setViewUser(user)}>
                    <Visibility />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View More Dialog */}
      <Dialog open={Boolean(viewUser)} onClose={() => setViewUser(null)}>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          <Typography>National ID: {viewUser?.nationalId}</Typography>
          <Typography>License Number: {viewUser?.licenseNumber}</Typography>
          <Typography>Role: {formatRole(viewUser?.role || "")}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewUser(null)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={addUserOpen} onClose={handleAddUserClose}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            name="firstName"
            fullWidth
            margin="dense"
            onChange={handleTextFieldChange}
          />
          <TextField
            label="Last Name"
            name="lastName"
            fullWidth
            margin="dense"
            onChange={handleTextFieldChange}
          />
          <TextField
            label="Username"
            name="username"
            fullWidth
            margin="dense"
            onChange={handleTextFieldChange}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="dense"
            onChange={handleTextFieldChange}
          />
          <TextField
            label="Password"
            name="password"
            fullWidth
            margin="dense"
            type="password"
            onChange={handleTextFieldChange}
          />
          <TextField
            label="National ID"
            name="nationalId"
            fullWidth
            margin="dense"
            onChange={handleTextFieldChange}
          />
          <TextField
            label="License Number"
            name="licenseNumber"
            fullWidth
            margin="dense"
            onChange={handleTextFieldChange}
          />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            fullWidth
            margin="dense"
            onChange={handleTextFieldChange}
          />
          <Select
            name="role"
            fullWidth
            margin="dense"
            value={newUser.role}
            onChange={handleSelectChange}
          >
            <MenuItem value="PATIENT">Patient</MenuItem>
            <MenuItem value="PHARMACY">Pharmacy</MenuItem>
            <MenuItem value="ADMIN">Admin</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddUserClose}>Cancel</Button>
          <Button onClick={handleAddUser} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbar.message}
      />
    </Box>
  );
}
