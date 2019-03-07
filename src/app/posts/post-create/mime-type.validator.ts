import { AbstractControl } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

export const mimeType = (control: AbstractControl): Promise<{[key: string]: any}> | Observable<{[key: string]: any}> => {
  const file = control.value as File;
  const fileReader = new FileReader();
  const frObs = Observable.create((obs: Observer<{[key: string]: any}>) => {
    fileReader.addEventListener('loadend', () => {
      const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
      let header = '';
      for (let i = 0; i < arr.length; i++) {
      // for (const item of arr.) {
        header += arr[i].toString(16);
      }
      let isValid = false;
      switch (header) {
        case '89504e47':
          isValid = true;
          break;
        case 'ffd8ffe0':
        case 'ffd8ffe1':
        case 'ffd8ffe2':
        case 'ffd8ffe3':
        case 'ffd8ffe8':
          isValid = true;
          break;
      }
      console.log(isValid, '>>>>');
      if (isValid) {
        obs.next(null);
      } else {
        obs.next({invalidMimeType: true});
      }
      obs.complete();
    });
    fileReader.readAsArrayBuffer(file);
  });
  return frObs;
};
