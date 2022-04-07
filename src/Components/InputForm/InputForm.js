import React from "react";
import './InputForm.css';

const InputForm = ({onInputChange, onButtonSubmit}) => {
    return(
        <div>
            <p className="f3 yellow">
                {'This smart app will detect Faces in your pictures, try it out!'}
            </p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                    <input className="f4 pa2 center w-70" type='text' placeholder='Enter your image url' onChange={onInputChange}/>
                    <button 
                    className="w-30 link pv2 ph3 grow f4 dib white bg-light-purple"
                    onClick={onButtonSubmit}
                    >Detect</button>
                </div>
            </div>
        </div>
    )
}

export default InputForm;