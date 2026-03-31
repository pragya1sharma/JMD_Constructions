import { Routes, Route } from "react-router-dom";
import { Box, Container, Heading, Text, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import LandingPage from "./pages/landing";
import LoginForm from "./components/auth/loginForm.jsx";


function DashboardPlaceholder({ title }) {
  return (
    <Box minH="100vh" bg="gray.50" py={16}>
      <Container maxW="lg" textAlign="center">
        <Heading size="lg" mb={4}>
          {title}
        </Heading>
        <Text color="gray.600" mb={8}>
          Dashboard UI will live here. Use the navigation below to go back or sign out from the
          home page when auth persistence is added.
        </Text>
        <Button as={RouterLink} to="/" colorScheme="orange" rounded="sm">
          Back to home
        </Button>
      </Container>
    </Box>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route
        path="/dashboard/contractor"
        element={<DashboardPlaceholder title="Contractor dashboard" />}
      />
      <Route
        path="/dashboard/supervisor"
        element={<DashboardPlaceholder title="Supervisor dashboard" />}
      />
    </Routes>
  );
}

export default App;
