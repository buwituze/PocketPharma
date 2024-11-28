import { Box, Card, Typography, Grid, Container } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import ResponsiveDrawer from "./ResponsiveDrawer";
import AppNavbar from "./AppBarP";

const stats = [
  { title: "Total Sales", value: "400,000 RWF" },
  { title: "Total Orders", value: "320" },
  { title: "New Customers", value: "45" },
];

const salesData = [
  { name: "Jan", sales: 400 },
  { name: "Feb", sales: 300 },
  { name: "Mar", sales: 200 },
  { name: "Apr", sales: 278 },
  { name: "May", sales: 189 },
  { name: "Jun", sales: 239 },
  { name: "Jul", sales: 349 },
];

export default function Report() {
  return (
    <>
      <ResponsiveDrawer />
      <AppNavbar />

      <Box sx={{ marginLeft: "18rem", mt: 7, padding: "3rem" }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{ marginBottom: "2rem", fontWeight: "bold" }}
        >
          Pharmacy Report
        </Typography>

        <Grid container spacing={4}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ padding: "1.5rem", textAlign: "center" }}>
                <Typography variant="h6" color="textSecondary">
                  {stat.title}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ marginTop: "1rem", fontWeight: "bold" }}
                >
                  {stat.value}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Container sx={{ marginTop: "3rem" }}>
          <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
            Sales Trends
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Container>

        <Container sx={{ marginTop: "3rem" }}>
          <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
            Stock Overview
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Container>
      </Box>
    </>
  );
}
