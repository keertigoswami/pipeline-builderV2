// import React from 'react';
// import './Node.css';

// const Node = ({ data }) => (
//   <div className={`node ${data.type}`}>
//     {data.label}
//   </div>
// );

// export default Node;

import React from 'react';

const Node = ({ data }) => {
  return (
    <div className={`${data.type}-node`}>
      {data.label}
    </div>
  );
};

export default Node;
