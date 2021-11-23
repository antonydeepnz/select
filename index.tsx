import React, { useState } from 'react';
import { render } from 'react-dom';
import { Select } from './select';
import './style.css';

interface AppProps {}
interface AppState {
  name: string;
}

// https://storage.yandexcloud.net/alfaleasing/components/plus-icon.svg

const arr = [
  {
    id: '3',
    name: '3 series',
    items: [
      { id: '315', name: '315' },
      { id: '318', name: '318' },
      { id: '320', name: '320' },
    ],
  },
  { id: '4', name: '4 series' },
  { id: '5', name: '5 series' },
  { id: '6', name: '6 series' },
  {
    id: '7',
    name: '7 series',
    items: [
      { id: '715', name: '715' },
      { id: '718', name: '718' },
      { id: '720', name: '720' },
    ],
  },
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
        value={null}
        options={arr}
        showSelected
        popularOptions={popular}
        clearAll
        groupSeparators
        onChange={setValue}
      />
    </div>
  );
};

render(<App />, document.getElementById('root'));
