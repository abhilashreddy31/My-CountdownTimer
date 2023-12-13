import React, { useState, useRef } from 'react';
import { FaPlay, FaUndo, FaEdit, FaStop } from 'react-icons/fa';
import './App.css'; 

const CountdownTimer = () => {
  const [time, setTime] = useState(0);
  const [inputTime, setInputTime] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [showStart, setShowStart] = useState(true);
  const [hideButtons, setHideButtons] = useState(false);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (intervalRef.current !== null) return;
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setShowStart(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    setShowStart(false);
  };




  const stopTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setShowStart(true);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTime(0);
    setInputTime('');
    setShowStart(true);
    setShowInput(false);
    setHideButtons(false);
  };

  const handleInputChange = (e) => {
    const newInputTime = e.target.value;
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTime(0);
    setInputTime(newInputTime);
  };

  const handleEdit = () => {
    setShowInput(true);
    setShowStart(false);
    setHideButtons(true);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const handleEditDone = () => {
    setShowInput(false);
    setShowStart(true);
    setTime(parseInt(inputTime) * 60);
    setInputTime('');
    setHideButtons(false);
  };

  return (
    <div>
      <div className={`timer-display ${hideButtons ? 'hide' : ''}`}>
        <h1>



          {Math.floor(time / 60)}:{(time % 60).toLocaleString('en-US', { minimumIntegerDigits: 2 })}
        </h1>
      </div>
      <div className={`button-container ${hideButtons ? 'hide' : ''}`}>



        {!showInput ? (
          <button onClick={handleEdit} className="edit-button">
            <span><FaEdit style={{ verticalAlign: 'middle', marginRight: '5px',marginBottom:"5px", fontSize: '15px' }} /> Edit</span>
          </button>
        ) : null}




        <button onClick={resetTimer} className="reset-button">
          <span><FaUndo style={{ verticalAlign: 'middle', marginRight: '5px',marginBottom:"5px", fontSize: '15px' }} /> Reset</span>
        </button>




        {showStart ? (
          <button onClick={startTimer} className="start-button">
            <span><FaPlay style={{ verticalAlign: 'middle', marginRight: '5px',marginBottom:"5px", fontSize: '15px' }} /> Start</span>
          </button>

          
        ) : (
          <button className="stop-button" onClick={stopTimer}>
            <span><FaStop style={{ verticalAlign: 'middle', marginRight: '5px',marginBottom:"5px", fontSize: '15px' }} /> Stop</span>
          </button>
        )}
      </div>




      {showInput && (
        <div className="input-card">
          <div className='div-h1'><p>Edit Timer</p></div>
          <div className='box-1'>


            <input
           type="number"
              value={inputTime}
          onChange={handleInputChange}
              placeholder="Enter time in minutes"
            />
            <button className='start-btn' onClick={handleEditDone}>Start</button>
          </div>
        </div>







      )}
    </div>
  );
};

export default CountdownTimer;
