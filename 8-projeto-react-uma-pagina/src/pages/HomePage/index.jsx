import { useMemo, useState } from 'react'
import './styles.css'

const DAY_IN_MS = 24 * 60 * 60 * 1000

function dateOffset(days) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return toDateInputValue(date)
}

function toDateInputValue(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function getDaysUntil(dateValue) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const visitDate = new Date(`${dateValue}T00:00:00`)
  return Math.round((visitDate.getTime() - today.getTime()) / DAY_IN_MS)
}

function formatDate(dateValue) {
  return new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short' })
    .format(new Date(`${dateValue}T12:00:00`))
}

function getVisitStatus(dateValue) {
  const daysUntil = getDaysUntil(dateValue)

  if (daysUntil < 0) return { key: 'overdue', label: `Atrasado há ${Math.abs(daysUntil)} ${Math.abs(daysUntil) === 1 ? 'dia' : 'dias'}` }
  if (daysUntil === 0) return { key: 'today', label: 'Visita hoje' }
  if (daysUntil === 1) return { key: 'upcoming', label: 'Amanhã' }
  return { key: 'upcoming', label: `Em ${daysUntil} dias` }
}

function createInitialClients() {
  return [
    { id: 1, name: 'Mariana Costa', service: 'Revisão hidráulica', address: 'Vila Mariana', visitDate: dateOffset(-2), visitTime: '14:00', lastVisit: 'Há 3 meses' },
    { id: 2, name: 'João Almeida', service: 'Manutenção do chuveiro', address: 'Pinheiros', visitDate: dateOffset(0), visitTime: '09:00', lastVisit: 'Há 6 meses' },
    { id: 3, name: 'Ana Paula Ribeiro', service: 'Revisão elétrica', address: 'Moema', visitDate: dateOffset(0), visitTime: '11:00', lastVisit: 'Há 1 ano' },
    { id: 4, name: 'Roberto Lima', service: 'Limpeza da caixa d’água', address: 'Perdizes', visitDate: dateOffset(2), visitTime: '10:00', lastVisit: 'Há 5 meses' },
    { id: 5, name: 'Cláudia Mendes', service: 'Revisão do encanamento', address: 'Aclimação', visitDate: dateOffset(5), visitTime: '15:00', lastVisit: 'Há 4 meses' },
  ]
}

const filters = [
  { key: 'all', label: 'Todos' },
  { key: 'overdue', label: 'Atrasados' },
  { key: 'today', label: 'Hoje' },
  { key: 'upcoming', label: 'Próximos' },
]

function HomePage() {
  const [clients, setClients] = useState(createInitialClients)
  const [activeFilter, setActiveFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [notice, setNotice] = useState('')

  const counts = useMemo(() => {
    const result = { all: clients.length, overdue: 0, today: 0, upcoming: 0 }
    clients.forEach((client) => {
      const { key } = getVisitStatus(client.visitDate)
      result[key] += 1
    })
    return result
  }, [clients])

  const visibleClients = useMemo(() => clients
    .filter((client) => {
      const matchesFilter = activeFilter === 'all' || getVisitStatus(client.visitDate).key === activeFilter
      const searchText = `${client.name} ${client.service} ${client.address}`.toLocaleLowerCase('pt-BR')
      return matchesFilter && searchText.includes(search.trim().toLocaleLowerCase('pt-BR'))
    })
    .sort((first, second) => first.visitDate.localeCompare(second.visitDate)),
  [activeFilter, clients, search])

  const todaysClients = clients
    .filter((client) => getVisitStatus(client.visitDate).key === 'today')
    .sort((first, second) => (first.visitTime || '').localeCompare(second.visitTime || ''))

  function markVisitComplete(client) {
    setClients((currentClients) => currentClients.map((currentClient) => (
      currentClient.id === client.id
        ? { ...currentClient, lastVisit: 'Visitado hoje', visitDate: dateOffset(90) }
        : currentClient
    )))
    setNotice(`Visita de ${client.name} concluída. Próxima revisão em 90 dias.`)
  }

  function addClient(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const client = {
      id: Date.now(),
      name: formData.get('name').trim(),
      service: formData.get('service').trim(),
      address: formData.get('address').trim(),
      visitDate: formData.get('visitDate'),
      visitTime: formData.get('visitTime'),
      lastVisit: 'Novo cliente',
    }

    setClients((currentClients) => [...currentClients, client])
    setActiveFilter('all')
    setSearch('')
    setNotice(`${client.name} foi adicionado à sua lista de visitas.`)
    event.currentTarget.reset()
  }

  return (
    <div className="provider-dashboard">
      <section className="dashboard-overview" id="inicio" aria-labelledby="dashboard-title">
        <div className="dashboard-topline">
          <div>
            <span className="eyebrow"><span className="eyebrow-dot" /> PAINEL DO PRESTADOR</span>
            <h1 id="dashboard-title">Olá, Carlos <span aria-hidden="true">👋</span></h1>
            <p className="dashboard-subtitle">Veja quem está esperando sua visita e organize sua semana.</p>
          </div>
          <div className="today-date">
            <span>HOJE</span>
            <strong>{new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())}</strong>
          </div>
        </div>

        <div className="summary-grid" aria-label="Resumo das visitas">
          <article className="summary-card summary-overdue">
            <span className="summary-icon" aria-hidden="true">!</span>
            <div><span>Precisam de atenção</span><strong>{counts.overdue}</strong></div>
            <small>visitas atrasadas</small>
          </article>
          <article className="summary-card summary-today">
            <span className="summary-icon" aria-hidden="true">◷</span>
            <div><span>Na sua agenda</span><strong>{counts.today}</strong></div>
            <small>visitas para hoje</small>
          </article>
          <article className="summary-card summary-total">
            <span className="summary-icon" aria-hidden="true">⌂</span>
            <div><span>Seus clientes</span><strong>{counts.all}</strong></div>
            <small>clientes acompanhados</small>
          </article>
        </div>
      </section>

      <div className="dashboard-content">
        <section className="client-panel" id="lista-clientes" aria-labelledby="clients-title">
          <div className="client-panel-heading">
            <div>
              <span className="eyebrow">ACOMPANHAMENTO</span>
              <h2 id="clients-title">Clientes para visitar</h2>
              <p>Não deixe nenhuma revisão passar batida.</p>
            </div>
            <label className="client-search">
              <span className="search-icon" aria-hidden="true">⌕</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar cliente"
                aria-label="Buscar cliente, serviço ou bairro"
              />
            </label>
          </div>

          <div className="filter-tabs" role="group" aria-label="Filtrar clientes por data">
            {filters.map((filter) => (
              <button
                className={activeFilter === filter.key ? 'filter-tab active' : 'filter-tab'}
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                type="button"
                aria-pressed={activeFilter === filter.key}
              >
                {filter.label}<span>{counts[filter.key]}</span>
              </button>
            ))}
          </div>

          {notice && <p className="dashboard-notice" role="status">{notice}</p>}

          <div className="client-list">
            {visibleClients.map((client) => {
              const status = getVisitStatus(client.visitDate)
              const initials = client.name.split(' ').slice(0, 2).map((part) => part[0]).join('')
              return (
                <article className="client-row" key={client.id}>
                  <div className={`client-avatar avatar-${client.id % 5}`}>{initials}</div>
                  <div className="client-details">
                    <div className="client-name-line">
                      <h3>{client.name}</h3>
                      <span className={`visit-status status-${status.key}`}>{status.label}</span>
                    </div>
                    <p>{client.service}</p>
                    <span className="client-location"><span aria-hidden="true">⌖</span> {client.address}</span>
                  </div>
                  <div className="visit-date">
                    <span>VISITAR ATÉ</span>
                    <strong>{formatDate(client.visitDate)}</strong>
                    <small>Última: {client.lastVisit}</small>
                  </div>
                  <button
                    className="complete-visit"
                    onClick={() => markVisitComplete(client)}
                    type="button"
                    aria-label={`Marcar visita de ${client.name} como concluída`}
                  >
                    <span aria-hidden="true">✓</span> Visitei
                  </button>
                </article>
              )
            })}
            {visibleClients.length === 0 && (
              <p className="empty-state">Nenhum cliente encontrado. Tente outro filtro ou busca.</p>
            )}
          </div>
        </section>

        <aside className="dashboard-sidebar">
          <section className="today-route" id="agenda" aria-labelledby="route-title">
            <div className="sidebar-heading">
              <span className="route-icon" aria-hidden="true">◷</span>
              <div><span className="eyebrow">SUA AGENDA</span><h2 id="route-title">Hoje</h2></div>
            </div>
            {todaysClients.length > 0 ? (
              <ol className="route-list">
                {todaysClients.map((client, index) => (
                  <li key={client.id}>
                    <span className="route-time">{client.visitTime || `${String(index + 1).padStart(2, '0')}.`}</span>
                    <div><strong>{client.name}</strong><span>{client.service}</span><small>{client.address}</small></div>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="route-empty">Tudo certo por hoje. Aproveite para planejar as próximas visitas.</p>
            )}
            <a className="route-link" href="#lista-clientes">Ver lista de clientes <span aria-hidden="true">→</span></a>
          </section>

          <section className="tip-card">
            <span className="tip-sparkle" aria-hidden="true">✦</span>
            <h3>Uma dica pra você</h3>
            <p>Marque a visita como concluída depois do atendimento. Assim você sabe quando voltar.</p>
          </section>
        </aside>
      </div>

      <section className="add-client-panel" id="novo-cliente" aria-labelledby="add-client-title">
        <div className="add-client-heading">
          <span className="add-client-icon" aria-hidden="true">+</span>
          <div>
            <span className="eyebrow">MAIS UM CLIENTE</span>
            <h2 id="add-client-title">Adicionar à sua lista</h2>
            <p>Guarde os dados e defina quando é hora de voltar.</p>
          </div>
        </div>
        <form className="add-client-form" onSubmit={addClient}>
          <label>Nome do cliente<input name="name" placeholder="Ex.: Pedro Santos" required /></label>
          <label>Serviço realizado<input name="service" placeholder="Ex.: Revisão hidráulica" required /></label>
          <label>Bairro ou endereço<input name="address" placeholder="Ex.: Centro" required /></label>
          <label>Próxima visita<input name="visitDate" type="date" required /></label>
          <label>Horário (opcional)<input name="visitTime" type="time" /></label>
          <button type="submit">Adicionar cliente <span aria-hidden="true">→</span></button>
        </form>
        <p className="demo-note">Painel de demonstração: os dados são mantidos apenas enquanto esta página estiver aberta.</p>
      </section>
    </div>
  )
}

export default HomePage
