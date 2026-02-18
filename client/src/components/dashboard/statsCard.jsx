// src/components/dashboard/StatsCard.jsx
import { Box, Text, Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react'

export default function StatsCard({ title, value, change, icon, color = 'royal' }) {
  return (
    <Box
      p={5}
      borderLeft="4px solid"
      borderColor={`${color}.500`}
      bg={`${color}.50`}
      borderRadius="md"
      boxShadow="sm"
    >
      <Stat>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <StatLabel color="gray.700" fontSize="sm">{title}</StatLabel>
            <StatNumber fontSize="2xl" color="black">{value}</StatNumber>
            <StatHelpText color={change >= 0 ? 'success' : 'danger'}>
              {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% from last month
            </StatHelpText>
          </Box>
          <Text fontSize="2xl">{icon}</Text>
        </Box>
      </Stat>
    </Box>
  )
}