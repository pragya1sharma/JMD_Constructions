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

export default function LoginForm() {
  const [role, setRole] = useState("supervisor");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const toast = useToast();
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone || !password) {
      toast({
        title: "Please fill all fields",
        status: "warning",
        position: "top-right",
      });
      return;
    }

    const result = await login({
      phone,
      password,
      role,
    });

    if (result.success) {
      toast({
        title: "Login successful",
        status: "success",
        position: "top-right",
      });

      if (role === "contractor") {
        navigate("/dashboard/contractor");
      } else {
        navigate("/dashboard/supervisor");
      }
    } else {
      toast({
        title: result.message || "Invalid credentials",
        status: "error",
        position: "top-right",
      });
    }
  };

  return (
    <AuthPageLayout>
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
              Welcome back to{" "}
              <Text as="span" color="orange.500">
                Buniyaad
              </Text>
            </Heading>
            <Text color="gray.600" mt={2} fontSize="sm">
              Login to your JMD Constructions workspace
            </Text>
          </Box>

          <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing={5}>
              <FormControl>
                <FormLabel color="gray.700" fontWeight="medium">
                  Role
                </FormLabel>
                <Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  {...inputStyles}
                >
                  <option value="contractor">Contractor (Admin)</option>
                  <option value="supervisor">Supervisor (Site Manager)</option>
                </Select>
              </FormControl>

              <FormControl>
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
              </FormControl>

              <FormControl>
                <FormLabel color="gray.700" fontWeight="medium">
                  Password
                </FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="**********"
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
                <FormHelperText color="gray.500">
                  Password must be at least 6 characters.
                </FormHelperText>
              </FormControl>

              <Text
                fontSize="sm"
                color="gray.500"
                textAlign="right"
                w="full"
                cursor="pointer"
                _hover={{ color: "orange.500" }}
              >
                Forgot password?
              </Text>

              <Button
                type="submit"
                size="lg"
                width="full"
                colorScheme="orange"
                rounded="sm"
                fontWeight="medium"
                isLoading={loading}
              >
                Access dashboard
              </Button>
            </VStack>
          </Box>
          {/* Not providing the signUp functionality as the creation and deletion or management of accesses and roles is done by the contractors only.
          A contractor can create contractor and can create or delete supervisors. */}
          {/* <Text textAlign="center" fontSize="sm" color="gray.600">
            New to Buniyaad?{" "}
            <RouterLink to="/signup">
              <Text as="span" color="orange.500" fontWeight="semibold">
                Create an account
              </Text>
            </RouterLink>
          </Text> */}
        </VStack>
      </Box>
    </AuthPageLayout>
  );
}
