import { useState } from 'react';
import './App.css'

function App() {

  const [title, setTitle] = useState(['가자 코트 추천', '다자 코드 추천', '나맛집 추천']);
  const [titleLike, setTitleLike] = useState([0, 0, 0]);
  const [modalState, setModalState] = useState(false);
  const [modalTitleIndex, setModalTitleIndex] = useState(0);
  
  const [inputValue, setInputValue] = useState('');

  const fnLike = (index) => {
    const copyLike = [...titleLike];
    copyLike[index] += 1;
    setTitleLike(copyLike);
  };

  const fnModal = (index) => {
    setModalTitleIndex(index);
    setModalState(!modalState);
  };

  const fnRemove = (index) => {
    const copyData = [...title];
    copyData.splice(index, 1);
    setTitle(copyData);
  };
  

  return (
    <div className='App'>
      <div className='black-nav'>
        <h4>React Blog!</h4>
      </div>
      
      <button onClick={() => {
        let copyData = [...title];
        copyData[0] = '코트 추천';
        setTitle(copyData);
      }}>수정</button>

      <button onClick={() => {
        setTitle([...title].sort());
      }}>정렬</button>
      
      {
        title.map((item, index) => <ListRow key={index} 
                                            title={item} 
                                            like={titleLike[index]} 
                                            date={`2월 ${17 + index}일 발행`} 
                                            func={() => fnLike(index)}
                                            md={() => fnModal(index)} 
                                            removeItem={() => fnRemove(index)}
                                    />)
      }

      {
        modalState === true ? <Modal title={title[modalTitleIndex]} date={`2월 ${17 + modalTitleIndex}일 발행`} detail={`이 글은 ${modalTitleIndex+1} 번째 글 입니다.`} /> : null
      }

      <input type="text" onChange={e => setInputValue(e.target.value)} value={inputValue} /><button onClick={() => {
        const copyTitle = [inputValue, ...title];
        setTitle(copyTitle);
        setInputValue('');
      }}>등록</button>
      
    </div>
  )
}

const ListRow = ({key, title, like, date, func, md, removeItem}) => {
  
  return (
    <div className="list">
      <h4><span onClick={md}>{title}</span><span onClick={func}>😊</span>{like}</h4><span onClick={removeItem}>✂️</span>
      <p>{date}</p>
    </div>
  );
}

function Modal(props) {
  return (
    <div className='modal'>
      <h4>{props.title}</h4>
      <p>{props.date}</p>
      <p>{props.detail}</p>
    </div>
  ); 
}

export default App
