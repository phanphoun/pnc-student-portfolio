import '../styles/globals.css'
import { SettingsProvider } from '../components/SettingsProvider'

export default function App({ Component, pageProps }) {
  return (
    <SettingsProvider>
      <Component {...pageProps} />
    </SettingsProvider>
  )
}
