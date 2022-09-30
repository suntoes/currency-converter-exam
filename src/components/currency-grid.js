import { 
    SimpleGrid, 
    Stat, 
    StatLabel, 
    StatNumber, 
    StatHelpText, 
    StatArrow 
} from "@chakra-ui/react"

const CurrencyGrid = ({data, input, cardColor, formatCurrency}) =>
<SimpleGrid columns={{base: 2, md: 4, xl: 5}} spacing={3}>
  {
    data?.map(({from, to, rate}, i) =>
      <Stat key={`exchange-${i+1}`} borderRadius="2xl" bg={cardColor} p={5} width="100%">
        <StatLabel>
          {`${input === 1 ? "" : input || 0} ${from.currency} TO ${to.currency}`}
        </StatLabel>
        <StatNumber>
          {formatCurrency(Math.round(input * rate * 100)/100, to?.symbol)}
        </StatNumber>
        <StatHelpText>
          <StatArrow type={rate < 1 ? 'decrease' : rate > 1 ? 'increase' : undefined} />
          {Math.round(Math.abs(rate-1) * 100000)/100000}%
        </StatHelpText>
      </Stat>
    )
  }
</SimpleGrid>

export default CurrencyGrid