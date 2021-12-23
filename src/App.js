import React , {useState , useEffect} from 'react';
import List from './List';
import Alert from './Alert';

const App = () => {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name) {
      showAlert(true , 'danger' , 'Please enter Value');
    } else if (name && isEditing) {
      
    } else {
      showAlert(true , 'success' , 'Item added to the list');
      const newItem = {id: new Date().getTime().toString() , title: name};
      setList([...list, newItem]);
      setName('');
    }
  };

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true,'danger','Empty list');
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true , 'danger' , 'Item removed');
    setList(list.filter((item)=> item.id !== id));
  };
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
        <h3>Grocery Bud</h3>
        <div className='form-control'>
          <input
            type="text"
            className="grocery"
            placeholder='e.g. EGG'
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
          <button type='submit' className="submit-btn">
            {isEditing? 'Edit' : 'Submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem}/>
          <button className="clear-btn" onClick={clearList}>
            Clear Items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;