import { useEffect, useState } from 'react';
import LogDisplay from './comps/LogDisplay'
import LogForm from './comps/LogForm'
import './App.css';

function App() {
  const [view, toggleView] = useState(true);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState('');

  const logCreateDates = (log) => 
  ({
    ...log, 
    startAt: new Date(log.startAt), 
    endAt: new Date(log.endAt)
  })

  const logFormatDates = (log) =>
  ({
    ...log, 
    startAt: log.startAt.toLocaleString(), 
    endAt: log.endAt.toLocaleString()
  })
  const editDiffObjById = (a, b, func) => {
    let diff = a.filter(x => !b.some(y => x.id === y.id));
    const edited = diff.length ? b.concat(func(diff)) : a;
    return(edited);
  }
  
  useEffect(() => {
    console.log(logs);
    const getLogs = async () => {
        setLoading('...');
        fetch(`/logs`, { headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }}
        )
        .then(res => res.json())        
        .then(json => json
        .map(log => logCreateDates(log))
        .sort((a, b) => b.startAt - a.startAt)
        .map(log => logFormatDates(log)))
        .then(update => {
          console.log(update.length);
          setLoading(
          <cite>
            Up to date
            <br/>
            {update.length - logs.length !== 0 ?  
            <span>New entries: <font color="#AFB">[{update.length - logs.length}]</font>!</span> 
            : 
            <font color="#AAA">No new entries</font>}</cite>)
          const isNew = editDiffObjById(update, logs, (x) => x.map(y => ({...y, new: true})));
          return(isNew);
        })
        .then(logs => setLogs(logs));
    }
    getLogs();
    // eslint-disable-next-line
  }, [view]);

  return (
    <div className="App">
      <div className="container">
        {view && 
        <div className="loading">
          {loading}
        </div>}
        {view ?
          <>
            <ul className="showLogs head">
              <li>
                <b>Description</b><br />
                <data className='dates' style={{minHeight: "max-content"}}>Start Date<br/>End Date</data>
              </li>
            </ul>
            <LogDisplay logs={logs}/>
          </>
           :
          <LogForm/>
        }
        <button className="clickable" onClick={() => toggleView((view) => view = !view)}>{view ? 'CREATE' : "VIEW"}</button>
      </div>
    </div>
  );
}
export default App;
