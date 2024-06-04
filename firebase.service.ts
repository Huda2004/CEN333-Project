import { Injectable } from '@angular/core';
import { getDatabase, ref, set, get, update, remove, push, child, onValue } from 'firebase/database';
import { initializeApp } from "firebase/app";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService { 
 db: any;

    constructor() {
      this.setupFirebase();  
      this.db = getDatabase();    
      }
      setupFirebase(){
        const firebaseConfig = {
          apiKey: "AIzaSyDbqKetKXcG5AXEZqrmy8DZZfENmk6hSf4",
          authDomain: "cen333-22939.firebaseapp.com",
          databaseURL: "https://cen333-22939-default-rtdb.firebasedatabase.com",
          projectId: "cen333-22939",
          storageBucket: "cen333-22939.appspot.com",
          messagingSenderId: "1030901333870",
          appId: "1:1030901333870:web:d8cc675a4ba76899020b7f",
          measurementId: "G-FBMJVT1VZ9"
        };
        
        initializeApp(firebaseConfig);
      }
      createObject(path: string, data: any) {
        return set(ref(this.db, path), data);
      }
      async readObject(path: string, key: string): Promise<string>{
        return get(child(ref(this.db), `${path}/${key}`)).then((snapshot) => {
          if (snapshot.exists()) return snapshot.val();
        })      
       }
      updateObject(path: string, key: string, data: any) {
        update(ref(this.db, `${path}/${key}`), data);
      }
      deleteObject(path: string, key: string){
        remove(ref(this.db, `${path}/${key}`));
      }

      async readList(path: string): Promise<any[]> {
        const snapshot = await get(ref(this.db, path));
        const list: any[] = [];
        snapshot.forEach(childSnapshot => {
          list.push(childSnapshot.val());
        });
        return list;
      }
    
      addToList(path: string, data: any){
        return push(ref(this.db, path), data).key;
      }

      updateList(path: string, key: string, data: any){     
        update(ref(this.db, `${path}/${key}`),data);
       }
    
      removeFromList(path: string, key: string){
        remove(ref(this.db, `${path}/${key}`));
      }

     getDataContinuosly(field: string): Observable<[]>{
      return new Observable((observer) => {
        onValue(ref(this.db, field), (data) => {
          if(data.valueOf()!= null)
            observer.next(data.val());
        });
      });
     }
     
     reset(){
        remove(ref(this.db, '/'));
     }

}