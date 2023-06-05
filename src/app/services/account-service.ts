import { Injectable, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  getDownloadURL,
  Storage,
  uploadString,
} from '@angular/fire/storage';
import { getStorage, ref } from "firebase/storage";

import { Photo } from '@capacitor/camera';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public imageUrl: string;

  constructor(private auth: Auth, private storage: Storage) {
    storage = getStorage();
  }


  async getUserProfile() {
    const user = this.auth.currentUser;
    const path = `images/${user.uid}/profile.png`;
    const storageRef = ref(this.storage, path);
    try {
      getDownloadURL(storageRef).then((url) => {
        this.imageUrl = url;
      });
      return true;
    } catch (e) {
      return null;
    }
  }

  async uploadImage(cameraFile: Photo) {
    const user = this.auth.currentUser;
    const path = `images/${user.uid}/profile.png`;
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, cameraFile.base64String, 'base64').then((snapshot) => {
        console.log('Uploaded a base64 string!');
      });
      getDownloadURL(storageRef).then((url) => {
        this.imageUrl = url;
      });

      return true;
    } catch (e) {
      return null;
    }
  }
}