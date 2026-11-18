import './styles.css'

export default function Rodape() {
    return (
        <footer className="site-footer">
            <a className="footer-brand" href="#inicio" aria-label="Bemtempo, início do painel">bemtempo</a>
            <p>Uma agenda simples para cuidar bem dos seus clientes.</p>
            <span>&copy; {new Date().getFullYear()} Bemtempo</span>
        </footer>
    )
}