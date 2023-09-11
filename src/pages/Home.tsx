/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line prettier/prettier
import {useState, Component } from 'react'
import { LinkComponent } from '@/components'
import homeIllustration from '@/assets/home-illustration.svg'
import styled from 'styled-components'
import { colors } from '@/utils/style'
import { Theme, useThemeContext } from '@/contexts'

const HomeWrapper = styled.div`
  margin: 30px;
`

const StyledHeader = styled.div`
  background-color: ${({ theme }) =>
    theme === Theme.LIGHT ? colors.backgroundLight : colors.backgroundDark};
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 50px;
  border-radius: 18px;
  height: 600px;

  h1 {
    line-height: 2em;
    color: ${({ theme }) => (theme === 'light' ? '#000000' : '#ffffff')};
  }

  img {
    height: 100%;
  }

  div:first-child {
    min-width: 350px;
    width: 350px;

    a {
      display: block;
      text-align: center;
    }
  }
`

export function sum(a: number, b: number): number {
  return a + b
}

export const Home: React.FC = () => {
  const { theme } = useThemeContext()
  // const [display, setDisplay] = useState(true)

  return (
    <HomeWrapper>
      <StyledHeader theme={theme}>
        <div>
          {/* {display && <MyComponent />}
          <button
            onClick={() => setDisplay((prev) => !prev)}
            style={{ width: '100%' }}
          >
            {display ? 'Cacher' : 'Afficher'} mon composant
          </button> */}
          <h1>
            Repérez vos besoins, on s’occupe du reste, avec les meilleurs
            talents
          </h1>
          <LinkComponent to="survey" $isFullLink>
            Faire le test
          </LinkComponent>
        </div>
        <img src={homeIllustration} alt="illustration" />
      </StyledHeader>
    </HomeWrapper>
  )
}

class MyComponent extends Component {
  componentDidMount(): void {
    console.log('=== componentDidMount ===') // Après le premier rendu
    this.setState({ test: '' })
  }

  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    console.log('=== componentDidUpdate ===') // Après une mis à jour du state ou props
  }

  componentWillUnmount(): void {
    console.log('=== componentWillUnmount ===') // Intervient quznd le composant est retiré du DOM
  }

  render(): React.ReactNode {
    console.log('=== RENDER ===')
    return (
      <div style={{ backgroundColor: 'red', textAlign: 'center' }}>
        <p>Mon composant !</p>
      </div>
    )
  }
}
