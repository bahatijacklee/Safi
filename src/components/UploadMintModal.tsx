import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UploadMintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UploadMintModal({ isOpen, onClose }: UploadMintModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (selectedFile.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please select a file smaller than 100MB",
        variant: "destructive"
      });
      return;
    }
    setFile(selectedFile);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const handleSubmit = () => {
    if (!title || !description || !file) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields and upload a file",
        variant: "destructive"
      });
      return;
    }

    // TODO: Implement actual upload and minting logic
    toast({
      title: "Content uploaded!",
      description: "Your content has been uploaded and is being minted.",
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setFile(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Upload & Mint Content</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* File Upload Area */}
          <div>
            <Label className="text-base font-semibold mb-3 block">Upload Your Content</Label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragging ? 'border-primary bg-primary/5' : 'border-border'
              }`}
            >
              {file ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <Upload className="h-6 w-6 text-primary" />
                    <p className="font-medium">{file.name}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setFile(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <Upload className="h-6 w-6 text-muted-foreground" />
                    </div>
                  </div>
                  <p className="text-base mb-2">
                    Drop your file here, or{' '}
                    <label className="text-primary cursor-pointer hover:underline">
                      browse
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*,audio/*,video/*"
                        onChange={handleFileInput}
                      />
                    </label>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports images, audio, and video files up to 100MB
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Title Input */}
          <div>
            <Label htmlFor="title" className="text-base font-semibold mb-2 block">
              Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              placeholder="Enter a compelling title for your work"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-12"
            />
          </div>

          {/* Description Input */}
          <div>
            <Label htmlFor="description" className="text-base font-semibold mb-2 block">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Describe your creative work, inspiration, and story..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 safi-hero-gradient"
            >
              Upload & Mint
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
