import './styles.css'

export default function Footer () {
    return(
        <footer className="site-footer">
            <p>&copy; {new Date().getFullYear()} - Todos os direitos reservados</p>
            <p>SENAI - BAHIA</p>
        </footer>
    )

}