import React from 'react';

function PageNumber(){
  return(
    <div className="pagenumber">
      <div className="preno" title="Previous">
        <svg alt="Previous" width="64" height="64" viewBox="0 0 192 384" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path d="M192 333l-150 -141l150 -141l-21 -19l-171 160l171 160z" transform="matrix(1,0,0,-1,0,384)"/>
        </svg>
      </div>
      <div className="curno" title="Current">1</div>
      <div className="nexno" title="Next">
        <svg alt="Next" width="64" height="64" viewBox="0 0 192 384" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 333l21 19l171 -160l-171 -160l-21 19l150 141z" transform="matrix(1,0,0,-1,0,384)"/>
        </svg>
      </div>
    </div>
  );
}

export default PageNumber;