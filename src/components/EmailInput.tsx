import { Theme } from '@/contexts'
import { colors } from '@/utils/style'
import { useState } from 'react'
import styled from 'styled-components'
// import { Component, ReactNode } from 'react'

const InputWrapper = styled.div`
  color: ${({ theme }) => (theme === 'light' ? colors.dark : 'white')};
  display: flex;
  flex-direction: column;
`

const StyledLabel = styled.label`
  color: ${({ theme }) => (theme === 'light' ? colors.dark : 'white')};
`

const StyledInput = styled.input`
  border: none;
  color: ${({ theme }) => (theme === 'light' ? colors.dark : 'white')};
  background-color: transparent;
  border-bottom: 1px solid
    ${({ theme }) => (theme === 'light' ? colors.dark : 'white')};
  margin-top: 5px;
  margin-bottom: 15px;
`

type EmailInputProps = {
  theme: Theme
}

// type EmailInputState = {
//   inputValue: string
// }

// export class EmailInput extends Component<EmailInputProps, EmailInputState> {
//   constructor(props: EmailInputProps) {
//     super(props)
//     this.state = {
//       inputValue: ''
//     }
//   }

//   updateInputValue = (value: string) => {
//     this.setState({ inputValue: value })
//   }

//   render(): ReactNode {
//     // const { theme } = this.props
//     return (
//       <div>
//         {this.state.inputValue}
//         <input
//           type="text"
//           onChange={(e) => this.updateInputValue(e.target.value)}
//         />
//       </div>
//     )
//   }
// }

// eslint-disable-next-line react/prop-types
export const EmailInput: React.FC<EmailInputProps> = ({ theme }) => {
  const [inputValue, setInputValue] = useState<string>('')

  return (
    <InputWrapper theme={theme}>
      <StyledLabel theme={theme}>Adresse email</StyledLabel>
      <StyledInput
        theme={theme}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {inputValue}
    </InputWrapper>
  )
}
