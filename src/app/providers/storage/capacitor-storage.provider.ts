import { Observable, from, of } from 'rxjs';
import { AsyncStorageEngine } from '@ngxs-labs/async-storage-plugin';
import { Injectable } from '@angular/core';
import { pluck } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class StorageProvider implements AsyncStorageEngine {
    length(): Observable<number> {
        return of(localStorage.length);
    }

    getItem(key: any): Observable<any> {
        return of(localStorage.getItem(key));
    }

    setItem(key: any, val: any): Observable<any> {
        return of(localStorage.setItem(key, val));
    }

    removeItem(key: any): Observable<any> {
        return of(localStorage.removeItem(key));
    }

    clear(): Observable<void> {
        return of(localStorage.clear());
    }

    key(val: number): Observable<string> {
        throw new Error('Method not implemented.');
    }
}
