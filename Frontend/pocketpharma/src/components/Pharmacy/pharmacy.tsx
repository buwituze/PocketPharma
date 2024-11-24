// import { useState } from "react";
// import ResponsiveDrawer from "../DrawerResponsiveness";
// import AppNavbar from "../AppBar";
// import "../../index.css";
// import {
//   Container,
//   Box,
//   Button,
//   InputAdornment,
//   MenuItem,
//   Card,
// } from "@mui/material";
// import {
//   FormControl,
//   TextField,
//   InputLabel,
//   Select,
//   Typography,
//   CardContent,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";

// export default function Pharmacy() {
//   const handleChange = (value: string | null | undefined) => {
//     console.log(value);
//   };

//   const [filter, setFilter] = useState<string>("");

//   return (
//     <>
//       <ResponsiveDrawer />
//       <AppNavbar />

//       <Box>
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             gap: "16px",
//             margin: "8rem 0rem 3rem 21rem",
//           }}
//         >
//           <Typography variant="h5" component="h6" sx={{}}>
//             Pharmacies List
//           </Typography>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "right",
//               gap: "16px",
//               mr: 5,
//               // margin: "8rem 0rem 0 0rem",
//             }}
//           >
//             <Box sx={{ display: "flex", gap: "16px" }}>
//               <TextField
//                 variant="outlined"
//                 placeholder="Search Pharmacies..."
//                 size="small"
//                 sx={{
//                   width: "300px",
//                   height: "43px",
//                   paddingTop: "4px",
//                   ml: 5,
//                   backgroundColor: "white",
//                   borderRadius: "100px",
//                   "& .MuiOutlinedInput-root": {
//                     "& input": { color: "black" },
//                     "& input::placeholder": { color: "#A0AEC0" },
//                     "& fieldset": {
//                       borderColor: "#A0AEC0",
//                       borderRadius: "100px",
//                     },
//                   },
//                 }}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <SearchIcon sx={{ color: "black" }} />
//                     </InputAdornment>
//                   ),
//                 }}
//                 // value={searchQuery}
//                 // onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </Box>

//             <Box>
//               <FormControl
//                 sx={{ m: 1, minWidth: 130, backgroundColor: "white" }}
//               >
//                 <InputLabel
//                   id="filter-label"
//                   sx={{
//                     marginTop: "-0.3rem",
//                   }}
//                 >
//                   Filter
//                 </InputLabel>
//                 <Select
//                   labelId="filter-label"
//                   id="filter"
//                   value={filter}
//                   label="Filter"
//                   sx={{
//                     height: "45px",
//                     borderRadius: "10px",
//                   }}
//                   onChange={(event) => setFilter(event.target.value)}
//                 >
//                   <MenuItem value="ALL">ALL</MenuItem>
//                   <MenuItem value="Over-The-Counter Medicine">Nearby</MenuItem>
//                   <MenuItem value="Prescription Medicine">
//                     Insurance Aligned
//                   </MenuItem>
//                 </Select>
//               </FormControl>
//             </Box>
//           </Box>
//         </Box>

//         <Box>
//           <FormControl sx={{ m: 1, minWidth: 130, backgroundColor: "white" }}>
//             <InputLabel
//               id="demo-simple-select-label"
//               sx={{
//                 marginTop: "-0.3rem",
//               }}
//             >
//               Filter
//             </InputLabel>
//             <Select
//               labelId="demo-simple-select-label"
//               id="demo-simple-select"
//               value={filter}
//               label="Filter"
//               sx={{
//                 height: "45px",
//                 borderRadius: "10px",
//               }}
//               onChange={(event) => setFilter(event.target.value)}
//             >
//               <MenuItem value={10}>ALL</MenuItem>
//               <MenuItem value={20}>Nearby</MenuItem>
//               <MenuItem value={30}>My Insurance</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>
//       </Box>

//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           // gap: "2rem",
//           marginLeft: "15rem",
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             gap: "2rem",
//             // marginLeft: "21rem",
//           }}
//         >
//           <Box sx={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
//             <Card sx={{ width: "300px" }}>
//               <CardContent>breh</CardContent>
//               <Button size="small">Order</Button>
//               <Button size="small">Learn More</Button>
//             </Card>
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// }

import { useState } from "react";
import ResponsiveDrawer from "../DrawerResponsiveness";
import AppNavbar from "../AppBar";
import "../../index.css";
import {
  Container,
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Card,
  Typography,
  CardContent,
  FormControl,
  TextField,
  InputLabel,
  Select,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function Pharmacy() {
  const [filter, setFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Sample pharmacy data
  const pharmacyData = [
    {
      id: 1,
      name: "City Pharmacy",
      location: "123 Main St, City Center",
      image: "https://example.com/city_pharmacy.jpg",
      description: "Open 24 hours, accepts major insurances.",
      distance: "2 miles",
    },
    {
      id: 2,
      name: "Health Plus Pharmacy",
      location: "456 Oak St, Downtown",
      image: "https://example.com/health_plus.jpg",
      description: "Specializes in prescriptions for chronic conditions.",
      distance: "5 miles",
    },
    {
      id: 3,
      name: "Neighborhood Pharmacy",
      location: "789 Pine St, Suburbs",
      image: "https://example.com/neighborhood_pharmacy.jpg",
      description: "Accepts most insurance plans.",
      distance: "1 mile",
    },
    // Add more pharmacies here
  ];

  // Filter and search pharmacies
  const filteredPharmacies = pharmacyData.filter((pharmacy) => {
    const matchesFilter =
      filter === "ALL" ||
      (filter === "Nearby" && parseFloat(pharmacy.distance) <= 5) || // Example logic for nearby
      (filter === "Insurance Aligned" &&
        pharmacy.description.includes("insurances")); // Example logic for insurance alignment

    const matchesSearch =
      pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pharmacy.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <ResponsiveDrawer />
      <AppNavbar />

      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            margin: "8rem 0rem 3rem 21rem",
          }}
        >
          <Typography variant="h5" component="h6">
            Pharmacies List
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "right",
              gap: "16px",
              mr: 5,
            }}
          >
            <Box sx={{ display: "flex", gap: "16px" }}>
              <TextField
                variant="outlined"
                placeholder="Search Pharmacies..."
                size="small"
                sx={{
                  width: "300px",
                  height: "43px",
                  paddingTop: "4px",
                  ml: 5,
                  backgroundColor: "white",
                  borderRadius: "100px",
                  "& .MuiOutlinedInput-root": {
                    "& input": { color: "black" },
                    "& input::placeholder": { color: "#A0AEC0" },
                    "& fieldset": {
                      borderColor: "#A0AEC0",
                      borderRadius: "100px",
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "black" }} />
                    </InputAdornment>
                  ),
                }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Box>

            <Box>
              <FormControl
                sx={{ m: 1, minWidth: 130, backgroundColor: "white" }}
              >
                <InputLabel
                  id="filter-label"
                  sx={{
                    marginTop: "-0.3rem",
                  }}
                >
                  Filter
                </InputLabel>
                <Select
                  labelId="filter-label"
                  id="filter"
                  value={filter}
                  label="Filter"
                  sx={{
                    height: "45px",
                    borderRadius: "10px",
                  }}
                  onChange={(event) => setFilter(event.target.value)}
                >
                  <MenuItem value="ALL">ALL</MenuItem>
                  <MenuItem value="Nearby">Nearby</MenuItem>
                  <MenuItem value="Insurance Aligned">
                    Insurance Aligned
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "15rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2rem",
            }}
          >
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
              {filteredPharmacies.map((pharmacy) => (
                <Card key={pharmacy.id} sx={{ width: "300px" }}>
                  <Box
                    component="img"
                    src={pharmacy.image}
                    alt={pharmacy.name}
                    sx={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      borderTopLeftRadius: "4px",
                      borderTopRightRadius: "4px",
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6">{pharmacy.name}</Typography>
                    <Typography variant="body2" sx={{ color: "gray" }}>
                      {pharmacy.location}
                    </Typography>
                    <Typography variant="body2">
                      {pharmacy.description}
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      p: 2,
                    }}
                  >
                    <Button size="small" variant="contained" color="primary">
                      Order
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        window.open(
                          `https://www.google.com/maps?q=${pharmacy.location}`,
                          "_blank"
                        );
                      }}
                    >
                      Learn More
                    </Button>
                  </Box>
                </Card>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
