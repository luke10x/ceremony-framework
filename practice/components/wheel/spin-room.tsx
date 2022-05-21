import React, { FC, FunctionComponent, useEffect, useReducer, useRef, useState } from "react";

import styles from "./wheel.module.css";

const myfunction = () => {
  var min = 1024;
  var max = 9999;
  var deg = Math.floor(Math.random() * (max - min)) + min;
  // document.getElementById('box').style.transform = "rotate("+deg+"deg)";
}

type SpinRoomProps = {}
const SpinRoom: FC<SpinRoomProps> = function ({}) {
  return (<div>
    <div id="mainbox" className={styles.mainbox}>
      <div id="box" className={styles.box}>
        <div className={styles.box1}>
          <span className={`${styles.span} ${styles.span1}`}><b>Java</b></span>
          <span className={`${styles.span} ${styles.span1}`}><b>Java</b></span>
          {/* <span className={`${styles.span} ${styles.span2}`}><b>Javascript</b></span>
          <span className={`${styles.span} ${styles.span3}`}><b>Dart</b></span>
          <span className={`${styles.span} ${styles.span4}`}><b>Python</b></span> */}
        </div>
        {/* <div className={styles.box2}>
          <span className={`${styles.span} ${styles.span5}`}><b>Typescript</b></span>
          <span className={`${styles.span} ${styles.span6}`}><b>Ruby</b></span>
          <span className={`${styles.span} ${styles.span7}`}><b>Rust</b></span>
          <span className={`${styles.span} ${styles.span8}`}><b>C++</b></span>
        </div> */}
      </div> 
      <button className="spin" onClick={() => myfunction()}>Spin!</button>
    </div>  
  </div>)
}
export default SpinRoom;