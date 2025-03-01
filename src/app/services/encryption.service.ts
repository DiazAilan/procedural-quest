import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { PlayerStateModel } from '../store/player/player.state';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  private secretKey = 'your-secret-key'; // Use a secure key

  encrypt(data: PlayerStateModel): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey).toString();
  }

  decrypt(cipherText: string): PlayerStateModel {
    const bytes = CryptoJS.AES.decrypt(cipherText, this.secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
  }
}