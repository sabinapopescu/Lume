import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface PhotoUploadProps {
  onUpload: (url: string) => void;
  currentImage?: string;
  label?: string;
  multiple?: boolean;
}

const PhotoUpload = ({ onUpload, currentImage, label = "Upload Photo", multiple = false }: PhotoUploadProps) => {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Since we don't have a backend, we'll simulate file upload with a placeholder URL
  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      // In a real app, this would upload to a file storage service
      // For now, we'll just use a placeholder URL
      const mockUrl = `/placeholder-${Date.now()}.jpg`;
      onUpload(mockUrl);
      setUploading(false);
    }, 1000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(e.target.files);
  };

  const removeImage = () => {
    onUpload("");
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      
      {currentImage ? (
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="relative">
              <img 
                src={currentImage} 
                alt="Uploaded" 
                className="w-full h-40 object-cover rounded-lg"
              />
              <Button
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={removeImage}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card 
          className={`shadow-soft transition-colors ${
            dragOver ? "border-primary bg-primary/5" : "border-dashed"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                {uploading ? (
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-muted-foreground" />
                )}
              </div>
              
              <div>
                <p className="text-sm font-medium">
                  {uploading ? "Uploading..." : "Drop image here or click to upload"}
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, JPEG up to 5MB
                </p>
              </div>
              
              <input
                type="file"
                accept="image/*"
                multiple={multiple}
                onChange={handleFileSelect}
                className="hidden"
                id={`file-upload-${label.replace(/\s+/g, '-')}`}
                disabled={uploading}
              />
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById(`file-upload-${label.replace(/\s+/g, '-')}`)?.click()}
                disabled={uploading}
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PhotoUpload;