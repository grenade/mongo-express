import { Parser } from '@json2csv/plainjs';
import flat from 'flat';

const handleObject = function (data) {
  for (const x in data) {
    if (data[x]) {
      if (data[x].constructor.name === 'ObjectId') {
        data[x] = `ObjectId("${data[x]}")`;
      } else if (data[x].constructor.name === 'Object') {
        handleObject(data[x]);
      }
    }
  }
};

export default function (data) {
  for (let i = 0, ii = data.length; i < ii; i++) {
    const current = data[i];
    handleObject(current);
    data[i] = flat(current, { safe: true });
  }
  const parser = new Parser({ eol: '\n' });
  return parser.parse(data);
}
