/* Components */
import { Content } from "./components/Content"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { Sidebar } from "./components/Sidebar"

/* style */
import "./index.css"

function App() {
  return (
    <>
      <div className="container">
        <Header />
        <Content />
        <Sidebar />
        <Footer />
      </div>
    </>
  )
}

export default App