// src/components/auth/LoginForm.jsx

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
  Card,
  CardBody,
  InputGroup,
  InputRightElement,
  useToast,
  FormHelperText
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../../context/authContext";


export default function LoginForm() {
  const [role, setRole] = useState('supervisor')
  const [showPassword, setShowPassword] = useState(false)
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const toast = useToast()
  const navigate = useNavigate()
  const { login, loading } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!phone || !password) {
      toast({
        title: 'Please fill all fields',
        status: 'warning',
        position: 'top-right'
      })
      return
    }

    const result = await login({
      phone,
      password,
      role
    })

    if (result.success) {
      toast({
        title: 'Login successful',
        status: 'success',
        position: 'top-right'
      })

      if (role === 'contractor') {
        navigate('/dashboard/contractor')
      } else {
        navigate('/dashboard/supervisor')
      }
    } else {
      toast({
        title: result.message || 'Invalid credentials',
        status: 'error',
        position: 'top-right'
      })
    }
  }

  return (
    <Card
      maxW="md"
      mx="auto"
      mt={16}
      bg="gray.800"
      border="1px solid"
      borderColor="gray.700"
    >
      <CardBody p={8}>
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <Box textAlign="center">
            <Heading size="xl" color="brand.400">
              BUNIYAAD
            </Heading>
            <Text color="gray.400" mt={2} fontSize="sm">
              Construction Management Platform
            </Text>
          </Box>

          {/* Form */}
          <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing={5}>
              {/* Role */}
              <FormControl>
                <FormLabel color="gray.300">Role</FormLabel>
                <Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  bg="gray.700"
                  borderColor="gray.600"
                  color="gray.100"
                  _hover={{ borderColor: 'brand.400' }}
                  _focus={{
                    borderColor: 'brand.400',
                    boxShadow: 'subtle-glow'
                  }}
                >
                  <option value="contractor">Contractor (Admin)</option>
                  <option value="supervisor">Supervisor (Site Manager)</option>
                </Select>
              </FormControl>

              {/* Phone */}
              <FormControl>
                <FormLabel color="gray.300">Phone Number</FormLabel>
                <Input
                  type="tel"
                  placeholder="XXXXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  bg="gray.700"
                  borderColor="gray.600"
                  color="gray.100"
                  _placeholder={{ color: 'gray.600' }}
                  _hover={{ borderColor: 'brand.400' }}
                  _focus={{
                    borderColor: 'brand.400',
                    boxShadow: 'subtle-glow'
                  }}
                />
              </FormControl>

              {/* Password */}
              <FormControl>
                <FormLabel color="gray.300">Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    bg="gray.700"
                    borderColor="gray.600"
                    color="gray.100"
                    _placeholder={{ color: 'gray.600' }}
                    _hover={{ borderColor: 'brand.400' }}
                    _focus={{
                      borderColor: 'brand.400',
                      boxShadow: 'subtle-glow'
                    }}
                  />
                  <InputRightElement>
                    <Button
                      variant="ghost"
                      size="md"
                      onClick={() => setShowPassword(!showPassword)}
                      color="gray.400"
                      _hover={{ color: 'brand.400', bg: 'transparent' }}
                      px={3}
                    >
                      {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText color="gray.500">
                  Password must be at least 6 characters.
                </FormHelperText>
              </FormControl>

              {/* Forgot password */}
              <Text
                fontSize="sm"
                color="gray.400"
                textAlign="right"
                cursor="pointer"
                _hover={{ color: 'brand.400' }}
              >
                Forgot Password?
              </Text>

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                width="full"
                bg="orange.500"
                color="white"
                isLoading={loading}
                _hover={{ bg: 'orange.600' }}
                _active={{ bg: 'orange.700' }}
              >
                Access Dashboard
              </Button>
            </VStack>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  )
}
