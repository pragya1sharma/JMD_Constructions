// src/components/layout/Navbar.jsx
import {
  Box,
  Flex,
  Button,
  Text,
  HStack,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

export default function Navbar({ userRole = 'contractor', userName = 'John Contractor' }) {
  return (
    <Box 
      bg="black" 
      color="white" 
      px={6} 
      py={4}
      borderBottom="3px solid"
      borderColor="neon.500"
    >
      <Flex justifyContent="space-between" alignItems="center">
        {/* Logo */}
        <HStack spacing={3}>
          <Text fontSize="xl" fontWeight="bold" color="white">
            Site<span style={{ color: '#ffff00' }}>Manager</span>
          </Text>
          <Badge 
            colorScheme={userRole === 'contractor' ? 'royal' : 'neon'}
            color={userRole === 'contractor' ? 'white' : 'black'}
            bg={userRole === 'contractor' ? 'royal.500' : 'neon.500'}
          >
            {userRole === 'contractor' ? 'CONTRACTOR' : 'SUPERVISOR'}
          </Badge>
        </HStack>

        {/* User Menu */}
        <Menu>
          <MenuButton 
            as={Button} 
            rightIcon={<ChevronDownIcon />}
            variant="ghost"
            color="white"
            _hover={{ bg: 'gray.800' }}
          >
            <HStack spacing={3}>
              <Avatar size="sm" name={userName} bg="royal.500" />
              <Text>{userName}</Text>
            </HStack>
          </MenuButton>
          <MenuList bg="gray.800" borderColor="gray.700">
            <MenuItem 
              _hover={{ bg: 'gray.700' }} 
              _focus={{ bg: 'gray.700' }}
            >
              Profile Settings
            </MenuItem>
            <MenuItem 
              _hover={{ bg: 'gray.700' }} 
              _focus={{ bg: 'gray.700' }}
            >
              Switch Role
            </MenuItem>
            <MenuItem 
              color="red.300"
              _hover={{ bg: 'gray.700' }} 
              _focus={{ bg: 'gray.700' }}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  )
}