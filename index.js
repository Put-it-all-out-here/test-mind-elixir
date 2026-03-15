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
const downloadBtn = document.getElementById('downloadBtn');
const uploadBtn = document.getElementById('uploadBtn');
const clearBtn = document.getElementById('clearBtn');
const jsonArea = document.getElementById('jsonArea');
const fileInput = document.getElementById('fileInput');

exportBtn.addEventListener('click', () => {
  const data = mind.getData();
  const jsonText = JSON.stringify(data, null, 2);
  jsonArea.value = jsonText;
});

loadBtn.addEventListener('click', () => {
  try {
    const jsonText = jsonArea.value.trim();
    if (!jsonText) {
      alert('JSONが空です');
      return;
    }

    const data = JSON.parse(jsonText);
    mind.refresh(data);
    alert('JSONを読み込みました');
  } catch (error) {
    alert('JSONの形式が正しくありません');
    console.error(error);
  }
});

downloadBtn.addEventListener('click', () => {
  try {
    const data = mind.getData();
    const jsonText = JSON.stringify(data, null, 2);

    const blob = new Blob([jsonText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'mindmap.json';
    document.body.appendChild(a);
    a.click();
    a.remove();

    URL.revokeObjectURL(url);
  } catch (error) {
    alert('JSONのダウンロードに失敗しました');
    console.error(error);
  }
});

uploadBtn.addEventListener('click', () => {
  fileInput.value = '';
  fileInput.click();
});

fileInput.addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  try {
    const text = await file.text();
    const data = JSON.parse(text);

    jsonArea.value = text;
    mind.refresh(data);

    alert('JSONファイルを読み込みました');
  } catch (error) {
    alert('JSONファイルの読み込みに失敗しました');
    console.error(error);
  }
});

clearBtn.addEventListener('click', () => {
  jsonArea.value = '';
});
