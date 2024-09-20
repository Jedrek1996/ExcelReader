import csvParser from 'csv-parser';
import { PassThrough } from 'stream';

// Parse CSV
export const parseCSV = (buffer: Buffer): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const results: any[] = [];
    const stream = new PassThrough(); 
    stream.end(buffer); 

    stream.pipe(csvParser())
      .on('data', (data: any) => results.push(data)) 
      .on('end', () => resolve(results))
      .on('error', (error: any) => reject(error));
  });
};
