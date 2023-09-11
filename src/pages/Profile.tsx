import { ThemeContext } from '@/contexts/ThemeContext'
import { Loader, colors } from '@/utils/style'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Component, useContext, useEffect, useState } from 'react'
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 90px 0;
  margin: 0 90px;
  background-color: ${({ theme }) =>
    theme === 'light' ? colors.backgroundLight : colors.backgroundDark};
`

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  color: ${({ theme }) => (theme === 'light' ? colors.dark : 'white')};
`

const Picture = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 75px;
`

const Title = styled.h1`
  font-size: 25px;
  margin: 0;
  font-weight: 500;
`

const JobTitle = styled.h2`
  padding-top: 10px;
  font-size: 20px;
  margin: 0;
  font-weight: 500;
`

const Location = styled.span`
  margin-left: 15px;
  color: ${colors.secondary};
`

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Price = styled.span`
  padding-top: 10px;
  font-weight: 500;
  font-size: 20px;
`

const SkillsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 0;
`

const Skill = styled.span`
  border-radius: 5px;
  padding: 5px;
  margin-right: 5px;
  border: 1px solid
    ${({ theme }) => (theme === 'light' ? colors.dark : 'white')};
`

const Availability = styled.span<{ available: boolean }>`
  &:before {
    position: absolute;
    left: 0;
    top: 4px;
    height: 10px;
    width: 10px;
    border-radius: 5px;
    background-color: ${({ available }) => (available ? 'green' : 'red')};
    content: '';
  }
  padding-left: 20px;
  position: relative;
`

interface IProfile {
  available: boolean
  id: string
  job: string
  location: string
  name: string
  picture: string
  skills: string[]
  tjm: number
}

type Props = { id: string; navigate: NavigateFunction }

type State = { profileData: IProfile | null; isLoading: boolean }

class ErrorNotFound extends Error {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Profile extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      profileData: null,
      isLoading: true
    }
  }

  componentDidMount(): void {
    const { id } = this.props

    fetch(`http://localhost:8000/freelance?id=${id}`)
      .then((res) => {
        if (!res.ok) throw new ErrorNotFound(res.statusText)

        return res.json()
      })
      .then((jsonRes) => {
        const { freelanceData } = jsonRes

        if (!freelanceData) throw new Error('not found profile')

        this.setState({ profileData: freelanceData as IProfile })
      })
      .catch((err) => {
        if (err instanceof ErrorNotFound) {
          this.props.navigate('/404')
        }
      })
      .finally(() => {
        this.setState({ isLoading: false })
      })
  }

  render() {
    const { isLoading, profileData } = this.state

    return (
      <ThemeContext.Consumer>
        {(value) => (
          <ProfileWrapper theme={value?.theme}>
            {isLoading ? (
              <Loader />
            ) : !profileData ? (
              <ProfileDetails>
                <Title>Not found profile</Title>
              </ProfileDetails>
            ) : (
              <>
                <Picture
                  src={profileData.picture}
                  alt={profileData.name}
                  height={150}
                  width={150}
                />
                <ProfileDetails theme={value?.theme}>
                  <TitleWrapper>
                    <Title>{profileData.name}</Title>
                    <Location>{profileData.location}</Location>
                  </TitleWrapper>
                  <JobTitle>{profileData.job}</JobTitle>
                  <SkillsWrapper>
                    {profileData.skills &&
                      profileData.skills.map((skill) => (
                        <Skill
                          key={`skill-${skill}-${profileData.id}`}
                          theme={value?.theme}
                        >
                          {skill}
                        </Skill>
                      ))}
                  </SkillsWrapper>
                  <Availability available={profileData.available}>
                    {profileData.available
                      ? 'Disponible maintenant'
                      : 'Indisponible'}
                  </Availability>
                  <Price>{profileData.tjm} € / jour</Price>
                </ProfileDetails>
              </>
            )}
          </ProfileWrapper>
        )}
      </ThemeContext.Consumer>
    )
  }
}

export const ProfileContainer = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  if (!id) throw new Error('not found profile')

  // return <ProfileFunction id={id} navigate={navigate} />
  return <Profile id={id} navigate={navigate} />
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ProfileFunction(props: Props) {
  const { id, navigate } = props
  const [profileData, setProfileData] = useState<IProfile | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8000/freelance?id=${id}`)
        if (!res.ok) {
          throw new ErrorNotFound('Not found profile')
        }

        const jsonRes = await res.json()
        const { freelanceData } = jsonRes

        if (!freelanceData) {
          throw new ErrorNotFound('Not found profile')
        }

        setProfileData(freelanceData as IProfile)
      } catch (err) {
        if (err instanceof ErrorNotFound) {
          navigate('/404')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id, navigate])

  return (
    <ThemeContext.Consumer>
      {(value) => (
        <ProfileWrapper theme={value?.theme}>
          {isLoading ? (
            <Loader />
          ) : !profileData ? (
            <ProfileDetails>
              <Title>Not found profile</Title>
            </ProfileDetails>
          ) : (
            <>
              <Picture
                src={profileData.picture}
                alt={profileData.name}
                height={150}
                width={150}
              />
              <ProfileDetails theme={value?.theme}>
                <TitleWrapper>
                  <Title>{profileData.name}</Title>
                  <Location>{profileData.location}</Location>
                </TitleWrapper>
                <JobTitle>{profileData.job}</JobTitle>
                <SkillsWrapper>
                  {profileData.skills &&
                    profileData.skills.map((skill) => (
                      <Skill
                        key={`skill-${skill}-${profileData.id}`}
                        theme={value?.theme}
                      >
                        {skill}
                      </Skill>
                    ))}
                </SkillsWrapper>
                <Availability available={profileData.available}>
                  {profileData.available
                    ? 'Disponible maintenant'
                    : 'Indisponible'}
                </Availability>
                <Price>{profileData.tjm} € / jour</Price>
              </ProfileDetails>
            </>
          )}
        </ProfileWrapper>
      )}
    </ThemeContext.Consumer>
  )
}
