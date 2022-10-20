import React, {useState, useEffect} from 'react';
import { Button, Col, List, Row, Typography, Input } from 'antd';
import { db } from './firebase.js';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import './App.css';

const q = query(collection(db,'messages'), orderBy('time','desc'));
function App() {
  const [messages,setMessages]=useState([]);
  const [input, setInput] = useState('');
  const [sender, setSender] = useState('');
  useEffect(() => {
    onSnapshot(q, (snapshot)=>{
      setMessages(snapshot.docs.map(doc=>({
      id: doc.id,
      item: doc.data()
    })))
    })
  },[input]);

const addMessages = (e) => {
  e.preventDefault();
  addDoc(collection(db,'messages'), {
    message:input,
    sender: sender,
    time: serverTimestamp()
  });
  setInput('');
  setSender('');
};
  return (
    <div className='container'>
      <Row justify="center" align='center' style={{gap: '1rem', paddingTop: '10vh'}}>
        <Col span={24}>
          <Typography.Title style={{textAlign: 'center'}}>A very simple chat application</Typography.Title>
        </Col>
        <Col xs={24} lg={15}>
          <Input placeholder='Message' value={input} onChange={ e => setInput(e.target.value) } />
        </Col> 
        <Col xs={24} lg={8}>
          <Input placeholder='Sender' value={sender} onChange={ e => setSender(e.target.value) } />
        </Col>
        <Col span={24}>
          <Button type="primary" block onClick={addMessages}>Add</Button>
        </Col>
        <Col span={24}>
          <List
            id='msgList'
            bordered
            dataSource={messages}
            renderItem={x => (
              <List.Item>
                <Typography.Text >{x.item.message}</Typography.Text>
                <Typography.Text type='secondary'>{x.item.sender}</Typography.Text>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
}

export default App;
