import { 
    Container, 
    Stack, 
    Menu, 
    MenuButton, 
    Button, 
    Image, 
    MenuList, 
    MenuItem, 
    NumberInput, 
    NumberInputField, 
    NumberInputStepper, 
    NumberIncrementStepper,
    NumberDecrementStepper 
} from "@chakra-ui/react"

import { ChevronDownIcon } from "@chakra-ui/icons"

import { currencyList, formatCurrency, parseCurrency } from "../utils/currency"

const CurrencyInput = ({selectedCurrency, input, onInputChange, onDropdownChange}) => (
    <Container maxW="full" centerContent>
      <Stack direction="row">
        <Menu>
          <MenuButton as={Button} minWidth="111px" width="111px" leftIcon={<Image src={selectedCurrency?.emoji}/>} rightIcon={<ChevronDownIcon />}>
            {selectedCurrency?.currency}
          </MenuButton>
          <MenuList width="111px" minWidth="111px">
            {
                currencyList.map(({currency, symbol, emoji}, i) =>
                <MenuItem 
                  key={`menu-selection-${i+1}`}
                  onClick={() => onDropdownChange({currency, symbol, emoji})}
                  icon={<Image src={emoji} />}
                  width="111px"
                  minWidth="111px"
                  isDisabled={currency === selectedCurrency?.currency}>
                  {currency}
                </MenuItem>
              )
            }
          </MenuList>
        </Menu>
        <NumberInput
          value={formatCurrency(input, selectedCurrency?.symbol)} 
          onChange={(valStr) => onInputChange(parseCurrency(valStr, selectedCurrency?.symbol))}
          minW={{base: 0, md: 300}}
          min={0} 
          max={100000000000}>
          <NumberInputField fontSize={18}/>
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Stack>
    </Container>
)

export default CurrencyInput
