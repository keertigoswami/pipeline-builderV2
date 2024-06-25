
import React from 'react';
import PipelineBuilder from './components/PipelineBuilder';
import Header from './components/PipelineBuilder/Header';
// import QueryFilter from './components/QueryFilterBuilder';

const App = () => (
  <div >
    {/* <h1 class="font-extrabold m-2 text-5xl italic">Pipeline Builder</h1> */}
    <Header/>
    <PipelineBuilder/>
    {/* <h1>Query Filter Builder</h1>
    <QueryFilter /> */}
  </div>
);

export default App;

