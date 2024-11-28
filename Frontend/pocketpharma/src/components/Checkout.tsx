import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ResponsiveDrawer from "./DrawerResponsiveness";
import AppBar from "./AppBar";

export default function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<
    { quantity: number; amount: number; name: string; image: string }[]
  >([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
  }, []);

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.amount,
    0
  );

  const handlePlaceOrder = (method: string) => {
    setPaymentMethod(method);

    // Store checked-out items in local storage
    const checkedOutItems = JSON.parse(
      localStorage.getItem("checkedOutItems") || "[]"
    );

    const newOrders = cartItems.map((item) => ({
      ...item,
      paymentMethod: method,
      pharmacy: "Belle Vie Pharmacy LTD", // Hardcoded name
      status: "Pending", // Default status
    }));

    localStorage.setItem(
      "checkedOutItems",
      JSON.stringify([...checkedOutItems, ...newOrders])
    );

    localStorage.removeItem("cart"); // Clear cart after checkout
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    navigate("/InProgress"); // Redirect to InProgress page after checkout
  };

  return (
    <Box>
      <AppBar />
      <ResponsiveDrawer />
      <Box display="flex" sx={{ height: "100vh", ml: "18rem" }}>
        {/* Left Part */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#00072d",
            color: "#fff",
            padding: "10rem 3rem 10rem 8rem",
          }}
        >
          <Typography variant="h4" mb={4}>
            Checkout
          </Typography>
          <Typography variant="body1">
            Total Quantity: {totalQuantity}
          </Typography>
          <Typography variant="body1" mb={4}>
            Total Amount: {totalAmount} RWF
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/cart")}
            sx={{ mt: 4, backgroundColor: "#fff", color: "#00072d" }}
          >
            Go Back
          </Button>
        </Box>

        {/* Right Part */}
        <Box flex={2} p={4} sx={{ mt: "3rem" }}>
          <Typography variant="h5" mb={2.5}>
            Payment Methods
          </Typography>
          {/* Credit Card Payment */}
          <Box mb={3}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              Credit Card
            </Typography>
            <TextField label="Card Number" fullWidth sx={{ mb: 1 }} />
            <TextField label="Expiration Date" fullWidth sx={{ mb: 1.5 }} />
            <TextField label="CVV" fullWidth sx={{ mb: 2 }} />
            <Button
              variant="contained"
              onClick={() => handlePlaceOrder("Credit Card")}
              sx={{ backgroundColor: "#00072d" }}
            >
              Check Out
            </Button>
          </Box>
          <Box sx={{ display: "flex", gap: 10 }}>
            {/* Mobile Money */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Mobile Money
              </Typography>
              <Typography>Phone Number: +250-123-456</Typography>
              <Button
                variant="contained"
                onClick={() => handlePlaceOrder("Mobile Money")}
                sx={{ mt: 2, backgroundColor: "#00072d" }}
              >
                Check Out
              </Button>
            </Box>
            {/* Cash on Delivery */}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Cash on Delivery
              </Typography>
              <Button
                variant="contained"
                onClick={() => handlePlaceOrder("Cash on Delivery")}
                sx={{ mt: 2, backgroundColor: "#00072d" }}
              >
                Check Out
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Order Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={closeDialog}>
        <DialogTitle>Order Placed</DialogTitle>
        <DialogContent>
          <Typography>
            Your medicine order was placed successfully. We have notified the
            pharmacy, and they will reach out to you soon.
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Payment Method: {paymentMethod}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={closeDialog}
            sx={{ backgroundColor: "#00072d", color: "#fff" }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
