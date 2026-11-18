import './styles.css'

function Cabecalho() {
    return (
        <header className="site-header">
            <a className="brand" href="#inicio" aria-label="Bemtempo, início do painel">
                <span className="brand-mark" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                        <path d="M12 20s-7.5-4.4-7.5-10a4.2 4.2 0 0 1 7.5-2.6A4.2 4.2 0 0 1 19.5 10c0 5.6-7.5 10-7.5 10Z" />
                        <path d="M8.5 12h2l1.2-2.2 1.6 4.2 1.1-2h1.1" />
                    </svg>
                </span>
                <span>bemtempo</span>
            </a>
            <nav className="header-nav" aria-label="Navegação principal">
                <a href="#lista-clientes">Clientes</a>
                <a href="#agenda">Agenda</a>
            </nav>
            <a className="header-cta" href="#novo-cliente"><span aria-hidden="true">+</span> Novo cliente</a>
        </header>
    )
}

export default Cabecalho