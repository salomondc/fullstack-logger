const LogDisplay = ({ logs }) => {


  return (
    <ul className="showLogs">
      <p className="logNumber">- {logs.length} -</p>
      {logs && logs[0] ? logs.map((l, i)=> 
        <li className={l.new === true ? 'new' : ''} key={`log_entry_${i}`}>
          <b className="description">{l.description}</b>
          <data className="dates">S: {l.startAt}<br />E: {l.endAt}</data>
        </li>):
        <center>
        <p>
          <code>No entries yet...</code>
        </p>
        </center>
      }
    </ul>
  )
}

export default LogDisplay;