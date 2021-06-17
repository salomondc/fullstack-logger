import { useState } from 'react';

const LogForm = () => {
  const [loading, setLoading] = useState('');
  const [log, setLog] = useState({
    description: '',
    startAt: null,
    endAt: null,
  })

  const handleSubmit = (e) => {
    e.preventDefault();
      setLoading('...');
      fetch(`http://localhost:${process.env.PORT || 4000}/log/create`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(log)
      })
      .then(r => r.json())
      .then(r => r.error ? 
      setLoading(
        <em>
          There was a problem uploading your data | code: {r.code}
          <br/>
          "{r.routine}"
        </em>) 
      : 
      setLoading(
        <>
          '{r.description.slice(0, 20)}...' 
          Was uploaded <font color="#AFB">succesfully!</font>
        </>));
  }

  return (
    <>
      <div className="loading">
        {loading}
      </div>
      <form onSubmit={handleSubmit} id="logEntry" action="POST">
        <label>Log Description</label>
        <textarea onChange={(e) => setLog(data => ({...data, description: e.target.value}))} rows="1" placeholder="Put your description here..."/>

        <label>Start Date</label>
        <input onChange={(e) => setLog(data => ({...data, startAt: e.target.value}))} type="datetime-local"/>

        <label>End Date</label>
        <input onChange={(e) => setLog(data => ({...data, endAt: e.target.value}))} min={log.startAt} type="datetime-local"/>
        
        <input className="clickable" type="submit" value="SUBMIT"/>
      </form>
    </>
  );
}
 
export default LogForm;