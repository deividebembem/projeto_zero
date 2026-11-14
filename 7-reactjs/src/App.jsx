import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'

function App() {

  return (
    <>
      <Header />
      <main className="main-content">
        <section className="content-card" aria-labelledby="project-title">
          <h2 id="project-title">Meu Projeto</h2>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt dolorum ratione minus velit soluta nesciunt hic iste recusandae harum veniam, iusto aperiam, accusamus optio, nemo provident voluptas! Illo, fugit mollitia!</p>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App
