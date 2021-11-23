import React, { useState } from 'react';
import { render } from 'react-dom';
import { Select } from './select';
import './style.css';

interface AppProps {}
interface AppState {
  name: string;
}

const arr = [
  { id: '3', name: '3 series' },
  { id: '4', name: '4 series' },
  { id: '5', name: '5 series' },
  { id: '6', name: '6 series' },
  { id: '7', name: '7 series' },
];

const popular = [
  { id: '3', name: '3 series' },
  { id: '4', name: '4 series' },
];

const App = () => {
  const [value, setValue] = useState(null);
  return (
    <div>
      <Select
        caption="Марка"
        value={value}
        options={arr}
        showSelected
        popularOptions={popular}
        onClear={() => {}}
      />
    </div>
  );
};

render(<App />, document.getElementById('root'));
