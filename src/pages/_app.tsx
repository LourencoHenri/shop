import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import igniteLogo from "../assets/igniteLogo.svg"
import { Container, Header } from '../styles/pages/app'
import Image from 'next/image'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>

      <Header>
        <Image src={igniteLogo.src} width={129.74} height={52} alt="Ignite Logo" />
      </Header>

      <Component {...pageProps} />

    </Container>
  )
}

