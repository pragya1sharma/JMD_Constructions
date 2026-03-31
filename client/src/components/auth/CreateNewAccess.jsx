import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Select,
  Heading,
  Text,
  InputGroup,
  InputRightElement,
  useToast,
  FormHelperText,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import AuthPageLayout from "./AuthPageLayout";

const inputStyles = {
  bg: "gray.50",
  borderColor: "gray.200",
  _hover: { borderColor: "gray.300" },
  _focus: {
    borderColor: "orange.400",
    boxShadow: "orange-focus",
  },
};

export default function CreateNewSup() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Supervisor");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();
  const { signup, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //both to be handled in BE
    //upon submitting - 1.I need to create this user in the BE, his creds are to be stored there for his access later.
    //I want to notify this person on phone number that he has been given the superviosr access to the application with the following credentials to start with.

    if (!name.trim() || !phone || !password) {
      toast({
        title: "Please fill all required fields",
        status: "warning",
        position: "top-right",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password must be at least 6 characters",
        status: "warning",
        position: "top-right",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        status: "warning",
        position: "top-right",
      });
      return;
    }

    const result = await signup({
      name: name.trim(),
      phone,
      password,
      role,
    });

    if (result.success) {
      toast({
        title: "Account created",
        description: "Welcome to Buniyaad.",
        status: "success",
        position: "top-right",
      });
      const path =
        role === "Contractor" ? "/dashboard/contractor" : "/dashboard/supervisor";
      navigate(path);
    } else {
      toast({
        title: result.message || "Could not create account",
        status: "error",
        position: "top-right",
      });
    }
  
  };

  return (
    <AuthPageLayout tagline="Create your Buniyaad account to manage sites, tenders, and teams in one place.">
      <Box
        bg="white"
        rounded="lg"
        shadow="elevated"
        borderWidth="1px"
        borderColor="gray.100"
        p={{ base: 8, md: 10 }}
      >
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading size="xl" letterSpacing="tight">
              Join{" "}
              <Text as="span" color="orange.500">
                Buniyaad
              </Text>
            </Heading>
            <Text color="gray.600" mt={2} fontSize="sm">
              Construction management for JMD teams
            </Text>
          </Box>

          <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing={5}>
              <FormControl isRequired>
                <FormLabel color="gray.700" fontWeight="medium">
                  Full name
                </FormLabel>
                <Input
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  {...inputStyles}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel color="gray.700" fontWeight="medium">
                  Phone number
                </FormLabel>
                <Input
                  type="tel"
                  placeholder="10-digit mobile"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  {...inputStyles}
                />
                <FormHelperText color="gray.500">
                  Same number the new contractor/supervisor will use to sign in
                </FormHelperText>
              </FormControl>

              <FormControl isRequired>
                <FormLabel color="gray.700" fontWeight="medium">
                  Role
                </FormLabel>
                <Select value={role} onChange={(e) => setRole(e.target.value)} {...inputStyles}>
                  <option value="Supervisor">Supervisor (Site Manager)</option>
                  <option value="Contractor">Contractor (Admin)</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel color="gray.700" fontWeight="medium">
                  Password
                </FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    {...inputStyles}
                  />
                  <InputRightElement h="full">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      color="gray.500"
                      _hover={{ color: "orange.500", bg: "transparent" }}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel color="gray.700" fontWeight="medium">
                  Confirm password
                </FormLabel>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  {...inputStyles}
                />
              </FormControl>

              <Button
                type="submit"
                size="lg"
                width="full"
                colorScheme="orange"
                rounded="sm"
                fontWeight="medium"
                isLoading={loading}
                onClick={handleSubmit}
              >
                Create account
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </AuthPageLayout>
  );
}
