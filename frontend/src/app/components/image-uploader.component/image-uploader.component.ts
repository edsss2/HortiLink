import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-uploader',
  imports: [CommonModule],
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.css',
})
export class ImageUploaderComponent {

  public uploadImage: string = "relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-neutral-secondary-medium transition-colors duration-300 ease-in-out hover:bg-neutral-tertiary-medium hover:border-green-primary"
  public uploadImageAdicional : string = "relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-neutral-secondary-medium transition-colors duration-300 ease-in-out hover:bg-neutral-tertiary-medium hover:border-green-primary"

  @Output() mainImageChange = new EventEmitter<File | null>();
  @Output() additionalImagesChange = new EventEmitter<File[]>();

  public mainImagePreview: string | ArrayBuffer | null = null;
  public additionalImagePreviews: (string | ArrayBuffer | null)[] = [null, null, null, null];

  // Armazena os arquivos reais internamente
  private mainImageFile: File | null = null;
  private additionalImageFiles: (File | null)[] = [null, null, null, null];

  /**
   * Chamado pelo (change) do input da imagem principal.
   */
  onImagemPrincipalSelected(event: any): void {
    const file = event.target.files?.[0];

    if (!file) {
      this.mainImageFile = null;
      this.mainImagePreview = null;
      this.mainImageChange.emit(null); 
      return;
    }
    
    this.mainImageFile = file;
    this.generatePreview(file, (result) => {
      this.mainImagePreview = result;
      this.mainImageChange.emit(this.mainImageFile);
    });
  }

  /**
   * Chamado pelo (change) dos inputs de imagens adicionais.
   */
  onImagemAdicionalSelected(event: any, index: number): void {
    const file = event.target.files?.[0];

    if (!file) {
      this.additionalImageFiles[index] = null;
      this.additionalImagePreviews[index] = null;
    } else {
      this.additionalImageFiles[index] = file;
      this.generatePreview(file, (result) => {
        this.additionalImagePreviews[index] = result;
      });
    }
    
    this.emitAdditionalFiles();
  }

  /**
   * Limpa uma imagem adicional (chamado pelo botão "X" no HTML).
   */
  clearAdditionalImage(index: number, event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();

    this.additionalImageFiles[index] = null;
    this.additionalImagePreviews[index] = null;
    this.emitAdditionalFiles();
  }

  clearImagemPrincipal(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();

    this.mainImageFile = null;
    this.mainImagePreview = null;
    this.emitAdditionalFiles();
  }

  /**
   * Emite a lista de arquivos adicionais para o componente pai.
   */
  private emitAdditionalFiles(): void {
    const files = this.additionalImageFiles.filter(f => f !== null) as File[];
    this.additionalImagesChange.emit(files);
  }

  /**
   * Lê um arquivo e gera uma URL base64 para o preview.
   */
  private generatePreview(file: File, callback: (result: string | ArrayBuffer | null) => void): void {
    const reader = new FileReader();
    reader.onload = (e) => callback(e.target?.result || null);
    reader.onerror = () => callback(null);
    reader.readAsDataURL(file);
  }
}
