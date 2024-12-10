import { CauseLevelDto } from '@/dtos/cause-level.dto'
import { filterBySection, transformToScores } from '@/utils'
import {
  Body,
  Container,
  Column,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Row,
  Section,
  Text,
  Font,
  Tailwind
} from '@react-email/components'
import dayjs from 'dayjs'
import * as React from 'react'

interface CivicScaleResultProps {
  causeLevel: CauseLevelDto
  userName: string
}

const CivicScaleResult = (props: CivicScaleResultProps) => {
  const scores = transformToScores(props.causeLevel.scale)
  const getAdvices = filterBySection(props.causeLevel.advices)

  return (
    <Html>
      <Head />
      <Head>
        <Font
          fontFamily="Noto Sans"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/notosans/v36/o-0bIpQlx3QUlC5A4PNB6Ryti20_6n1iPHjc5a7duw.woff2',
            format: 'woff2'
          }}
          fontStyle="normal"
        />
      </Head>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                dark: '#101010',
                light: '#FFFFFF1F'
              }
            }
          }
        }}
      >
        <Body className="bg-black my-auto mx-auto font-sans px-2">
          <Container className="my-6 bg-dark mx-auto p-4 max-w-lg">
            <Section>
              <Row>
                <Column align="right">
                  <Img
                    src={`https://impresario-cdn-public.s3.ap-south-1.amazonaws.com/cause-i/cause-i-yellow.png`}
                    width="24"
                    height="24"
                    alt="Cause-i"
                    className="my-0 ml-7"
                  />
                </Column>
                <Column>
                  <Text className="text-[#FAAE29] text-lg font-bold pl-2">
                    Cause-i
                  </Text>
                </Column>
              </Row>
            </Section>
            <Section className="text-[#FAAE29] text-xs text-center -mt-2">
              K.A.R.M.A Score Result
            </Section>
            <Hr className="border border-solid border-[#eaeaea0a] my-6 mx-0 w-full" />

            <Section className="bg-light p-2 rounded-lg">
              <Row>
                <Column>
                  <Text className="my-0 text-white/50 text-xs">
                    Survey Taker
                  </Text>
                  <Text className="my-0 text-gray-50 font-medium text-sm">
                    {props.userName}
                  </Text>
                </Column>
                <Column>
                  <Text className="my-0 text-white/50 text-xs">
                    Survey Date
                  </Text>
                  <Text className="my-0 text-gray-50 font-medium text-sm">
                    {dayjs(props.causeLevel.scale.updatedAt).format(
                      'DD-MM-YYYY'
                    )}
                  </Text>
                </Column>
                <Column>
                  <Text className="my-0 text-white/50 text-xs">
                    Survey version
                  </Text>
                  <Text className="my-0 text-gray-50 font-medium text-sm">
                    1.0.1
                  </Text>
                </Column>
              </Row>
            </Section>
            <Section
              className="p-2 pt-32 mt-3 rounded-t-lg bg-no-repeat bg-cover bg-center "
              style={{
                background: `url("${props.causeLevel.imgUrl}")`
              }}
            >
              <Row>
                <Column>
                  <Text className="my-0 text-white/80 text-xs font-light">
                    {props.userName} is a
                  </Text>
                  <Text className="my-0 text-white font-medium text-xl">
                    {props.causeLevel.name}
                  </Text>
                </Column>
              </Row>
            </Section>
            <Section className="bg-light p-2 rounded-b-lg">
              <Row>
                <Column>
                  <Text className="my-0 text-white/50 text-xs">
                    K.A.R.M.A. Score
                  </Text>
                  <Text className="my-0 text-gray-50 font-medium text-sm">
                    {props.causeLevel.meanScore} / 5
                  </Text>
                </Column>
                <Column>
                  <Text className="my-0 text-white/50 text-xs">
                    Strongest Attribute
                  </Text>
                  <Text className="my-0 text-[#F7ED56] font-medium text-sm capitalize">
                    {props.causeLevel.highestAttribute}
                  </Text>
                </Column>
                <Column>
                  <Text className="my-0 text-white/50 text-xs">
                    Weakest Attribute
                  </Text>
                  <Text className="my-0 text-[#90D1BD] font-medium text-sm capitalize">
                    {props.causeLevel.lowestAttribute}
                  </Text>
                </Column>
              </Row>
            </Section>
            <Section className="bg-light p-2 rounded-lg mt-3">
              <BarChart scores={scores} />
            </Section>

            <Section className="my-3 p-3 bg-light rounded-lg">
              <Text className="text-white/90 my-0 text-xs font-light">
                {props.causeLevel.description}
              </Text>
            </Section>
            <Hr className="border border-solid border-[#eaeaea0a] my-6 mx-0 w-full" />

            <Text className="text-white my-0 font-medium text-lg">
              Your characteristics
            </Text>
            {props.causeLevel.characteristics.map((characteristic) => {
              return (
                <Section
                  key={characteristic.trait}
                  className="my-3 p-2 bg-light rounded-lg"
                >
                  <Row>
                    <Column className="w-8 h-8">
                      <Img
                        src={characteristic.imgUrl}
                        alt={characteristic.trait}
                        className="my-0 w-8 h-8"
                      />
                    </Column>
                    <Column>
                      <Text className="text-white my-0 font-semibold">
                        <span className="pl-2">{characteristic.trait}</span>
                      </Text>
                    </Column>
                  </Row>

                  <Text className="text-white/60 my-0 mt-3 text-xs font-light">
                    {characteristic.description}
                  </Text>
                </Section>
              )
            })}

            <Hr className="border border-solid border-[#eaeaea0a] my-6 mx-0 w-full" />

            <Section>
              <Text className="text-white my-0 font-medium text-lg">
                {getAdvices.matchingObjects[0].section}
              </Text>
              <Text className="text-white/80 my-0 text-xs font-light">
                {getAdvices.matchingObjects[0].content}
              </Text>
            </Section>

            {getAdvices.nonMatchingObjects.map((advice) => (
              <Section
                className="my-3 p-2 rounded-lg bg-no-repeat bg-cover bg-center"
                style={{
                  background: `url("${advice.imgUrl}")`
                }}
              >
                <Text className="text-white my-0 font-medium">
                  {advice.section}
                </Text>
                <Text className="text-white/80 my-0 text-xs font-light">
                  {advice.content}
                </Text>
              </Section>
            ))}
            <Link href="https://cause-i.ai">
              <Section className="my-6">
                <Row>
                  <Column align="right">
                    <Text className="m-0 text-white/40 text-xs pr-2">
                      Powered by
                    </Text>
                  </Column>
                  <Column align="left">
                    <Img
                      src={`https://impresario-cdn-public.s3.ap-south-1.amazonaws.com/cause-i/cause-i-white-small-opaque.png`}
                      alt="Cause-i"
                      className="my-0"
                    />
                  </Column>
                </Row>
              </Section>
            </Link>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default CivicScaleResult

const BarChart = ({ scores }) => {
  const maxScore = 35

  return (
    <div className="max-w-lg w-full">
      {scores.map((score) => (
        <div key={score.attribute} className="ml-[5px] mr-5 mt-6">
          <div
            className="rounded-md px-2 mb-6"
            style={{
              backgroundColor: score.color,
              width: `${(score.value / maxScore) * 100}%`,
              height: '24px',
              color: 'white',
              textAlign: 'right',
              paddingRight: '0px'
            }}
          >
            <Row>
              <Column align="left">
                <Text className="text-xs m-0 text-dark font-bold mt-1">
                  {score.attribute}
                </Text>
              </Column>
              <Column align="right">
                <Text className="text-xs m-0 text-dark font-bold mt-1">
                  {score.value}
                </Text>
              </Column>
            </Row>
          </div>
        </div>
      ))}
    </div>
  )
}
