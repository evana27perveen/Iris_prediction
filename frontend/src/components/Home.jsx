import React from 'react';
import './Home.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';


import {useState} from 'react';

const Home = () => {
  const [sl, setSL] = useState('');
  const [sw, setSW] = useState('');
  const [pl, setPL] = useState('');
  const [pw, setPW] = useState('');
  const [result, setResult] = useState('');



  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);



  const handleSubmit = () => {
    if((parseFloat(sl)>0.0) && (parseFloat(sw)>0.0) && (parseFloat(pl)>0.0) && (parseFloat(pw)>0.0)){
    setShow(true);
    fetch('http://127.0.0.1:8000/apis/result/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'sepal_length': sl,
        'sepal_width': sw,
        'petal_length': pl,
        'petal_width': pw
      })
    })
  .then(response => response.json())
  .then(response => setResult(response[0]['classification']))
  .catch(err => console.error(err));
    }

  }

  return (
    <div id='home'>
      <div className="form">
        <div className="header">
          <h1>Iris Flower Species Prediction</h1>
          <p>Please provide the information below.</p>
        </div>
        <div className="inputContainer">
          <input type="text" step="0.1" name="sepal_length" placeholder="Sepal Length" value={sl} onChange={e => {
            setSL(e.target.value)
          }} />
          <input type="text" step="0.1" name="sepal_width" placeholder="Sepal Width" value={sw} onChange={e => {
            setSW(e.target.value)
          }} />
          <input type="text" step="0.1" name="petal_length" placeholder="Petal Length" value={pl} onChange={e => {
            setPL(e.target.value)
          }} />
          <input type="text" step="0.1" name="petal_width" placeholder="Petal Width" value={pw} onChange={e => {
            setPW(e.target.value)
          }} />
          
          <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
        {
          result ? 
          <Modal show={show} onHide={handleClose} style={{marginTop: '5%'}}>
        <Modal.Header closeButton>
          <Modal.Title style={{textAlign: 'center', display: 'flex', flex: 1, justifyContent: 'center', color: 'darkslategray', fontWeight: 'bold'}}>{result}</Modal.Title>
        </Modal.Header>
          <Modal.Body style={{textAlign: 'center'}}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: '20%', paddingRight: '20%'}}>
              <div>Sepal Length: {sl}</div>
              <div>Sepal Width: {sw}</div>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: '20%', paddingRight: '20%'}}>
              <div>Petal Length: {pl}</div>
              <div>Petal Width: {pw}</div>
            </div>
            <div>
            {result === 'Iris-setosa'?
              <img src="iris-setosa.jpg" alt="" height="200" width="200"/>:''
            }
            {result === 'Iris-versicolor'?
              <img src="iris-versicolor.jpg" alt="" height="200" width="200"/>:''
            }
            {result === 'Iris-virginica'?
              <img src="iris_virginica.png" alt="" height="200" width="200"/>:''
            }
            </div>
            
          </Modal.Body>
        <Modal.Footer style={{textAlign: 'center', display: 'flex', flex: 1, justifyContent: 'center'}}>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Button variant="" style={{backgroundColor: 'darkslategray'}}>
          <Link to="/db" style={{textDecoration: 'none', color: 'white'}}>View Database</Link>
          </Button>
        </Modal.Footer>
      </Modal>: ''
        }
      </div>


    </div>
  )
}

export default Home

