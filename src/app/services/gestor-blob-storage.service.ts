import { Injectable } from '@angular/core';
import { BlobServiceClient } from '@azure/storage-blob';

@Injectable({
  providedIn: 'root'
})
export class GestorBlobStorage {
  account: string = "tecguia";
  // NOTE: This SAS token expires on June 30, 2024
  sas: string = "?sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2024-06-30T08:24:54Z&st=2024-05-17T00:24:54Z&spr=https,http&sig=NtCZSGycmnH3EC0dSSRENFO4%2FW7RFZ6kHG9G1B%2FGZWs%3D";
  blobServiceClient: BlobServiceClient = new BlobServiceClient(`https://${this.account}.blob.core.windows.net${this.sas}`);

  constructor() {}

  uploadFile(containerName: string, fileName: string, file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const containerClient = this.blobServiceClient.getContainerClient(containerName);
      const blockBlobClient = containerClient.getBlockBlobClient(fileName);

      blockBlobClient.uploadData(file).then(() => {
        resolve(this.getFileUrl(containerName, fileName));
      }).catch((error) => {
        reject(error);
      });
    });
  }

  getFileUrl(containerName: string, fileName: string): string {
    return `https://${this.account}.blob.core.windows.net/${containerName}/${fileName}${this.sas}`;
  }

  deleteFile(containerName: string, fileName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const containerClient = this.blobServiceClient.getContainerClient(containerName);
      const blockBlobClient = containerClient.getBlockBlobClient(fileName);

      blockBlobClient.delete().then(() => {
        resolve();
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
