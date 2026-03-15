import MindElixir from 'https://cdn.jsdelivr.net/npm/mind-elixir/dist/MindElixir.js';

const mind = new MindElixir({
  el: '#map',
  direction: MindElixir.LEFT,
  toolBar: true,
  keypress: true,
  locale: 'en'
});

const initialData = MindElixir.new('中心テーマ');
mind.init(initialData);

const exportBtn = document.getElementById('exportBtn');
const loadBtn = document.getElementById('loadBtn');
const clearBtn = document.getElementById('clearBtn');
const jsonArea = document.getElementById('jsonArea');

exportBtn.addEventListener('click', () => {
  const data = mind.getData();
  const jsonText = JSON.stringify(data, null, 2);
  jsonArea.value = jsonText;
});

loadBtn.addEventListener('click', () => {
  try {
    const jsonText = jsonArea.value;
    const data = JSON.parse(jsonText);
    mind.refresh(data);
    alert('JSONを読み込みました');
  } catch (error) {
    alert('JSONの形式が正しくありません');
    console.error(error);
  }
});

clearBtn.addEventListener('click', () => {
  jsonArea.value = '';
});