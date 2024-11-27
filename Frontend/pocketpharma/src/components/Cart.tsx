import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Divider,
  Link,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import AppBar from "./AppBar";
import ResponsiveDrawer from "./DrawerResponsiveness";
import { useBackgroundQuery } from "@apollo/client";

interface Medicine {
  id: string;
  name: string;
  amount: number;
  picture: string | null;
  quantity: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<Medicine[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(
      storedCart.map((item: Medicine) => ({
        ...item,
        quantity: item.quantity || 1,
      }))
    ); // Default to quantity 1 if not set
  }, []);

  const updateQuantity = (id: string, increment: boolean) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: Math.max(item.quantity + (increment ? 1 : -1), 1),
          }
        : item
    );

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.amount,
    0
  );

  return (
    <Box>
      <AppBar />
      <ResponsiveDrawer />
      <Box sx={{ ml: "21rem" }}>
        <Typography
          variant="h4"
          component="h3"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            mb: 3,
            mt: 13,
            color: "#00072d",
          }}
        >
          My Cart
        </Typography>
        {cartItems.length > 0 ? (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
                borderRadius: "8px",
                backgroundColor: "#fff",
                boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
                mb: 2,
                mr: 10,
              }}
            >
              <Typography variant="h6">
                Total Quantity: <strong>{totalQuantity}</strong>
              </Typography>
              <Typography variant="h6">
                Total Amount: <strong>{totalAmount} RWF</strong>
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: "3rem",
                flexWrap: "wrap",
              }}
            >
              {cartItems.map((medicine) => (
                <Card
                  key={medicine.id}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem",
                    borderRadius: "10px",
                    boxShadow: "none",
                    border: "1px solid #E9EAEC",
                    marginBottom: "1rem",
                    width: "400px",
                    height: "100px",
                  }}
                >
                  <Box
                    component="img"
                    src={medicine.picture || "https://via.placeholder.com/100"}
                    alt={medicine.name}
                    sx={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "8px",
                    }}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6">{medicine.name}</Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: "bold", mt: 1 }}
                    >
                      Amount: {medicine.amount} RWF
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 2,
                        gap: "0.5rem",
                      }}
                    >
                      <IconButton
                        color="primary"
                        onClick={() => updateQuantity(medicine.id, false)}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Box
                        sx={{
                          border: "1px solid #E9EAEC",
                          borderRadius: "4px",
                          padding: "0.5rem 1rem",
                          minWidth: "40px",
                          textAlign: "center",
                        }}
                      >
                        {medicine.quantity}
                      </Box>
                      <IconButton
                        color="primary"
                        onClick={() => updateQuantity(medicine.id, true)}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </>
        ) : (
          <Typography
            variant="body1"
            component="p"
            sx={{ textAlign: "center", marginTop: "3rem" }}
          >
            Your medicine for order will appear here.
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          ml: "21rem",
          mb: "5rem",
          mt: "3rem",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Link href="/CheckOut">
          <Button
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#00072d",
              height: "40px",
              borderRadius: "5px",
            }}
          >
            Place Order
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
