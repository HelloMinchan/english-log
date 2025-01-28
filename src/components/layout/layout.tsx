import { Header } from './header'

interface LayoutProps {
  children?: React.ReactElement
}

export const Layout: React.FC = ({ children }: LayoutProps) => {
  return (
    <>
      <Header children={children} />
    </>
  )
}
