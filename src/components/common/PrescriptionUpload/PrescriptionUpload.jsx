import React, { useState } from 'react';
import styles from './PrescriptionUpload.module.css';

const PrescriptionUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Real-time validation
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
        setUploadStatus('Validation Failed: File size exceeds 5MB.');
        setFile(null);
        setProgress(0);
        return;
      }
      if (!['image/jpeg', 'image/png', 'application/pdf'].includes(selectedFile.type)) {
        setUploadStatus('Validation Failed: Only JPEG, PNG, and PDF formats are supported.');
        setFile(null);
        setProgress(0);
        return;
      }

      setFile(selectedFile);
      setUploadStatus('');
    }
  };

  const handleUpload = () => {
    if (!file) {
      setUploadStatus('Please select a file first.');
      return;
    }

    setUploadStatus('Uploading...');
    setProgress(10);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            setUploadStatus('✅ Prescription uploaded and submitted for verification!');
            setProgress(100);
          }, 500);
          return 100;
        }
        return prev + 20;
      });
    }, 300);
  };
  
  // Drag and Drop handlers
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e) => {
    e.preventDefault();
    handleFileChange({ target: { files: e.dataTransfer.files } });
  };


  return (
    <div className={styles.uploadContainer}>
      <div 
        className={styles.dropZone} 
        onDragOver={handleDragOver} 
        onDrop={handleDrop}
      >
        <p>Drag & Drop your prescription here, or click to select.</p>
        <input 
          type="file" 
          accept="image/jpeg,image/png,application/pdf" 
          onChange={handleFileChange} 
          className={styles.fileInput}
          id="prescription-file"
        />
        <label htmlFor="prescription-file" className="btn-outline">Select File</label>
      </div>

      {file && (
        <div className={styles.filePreview}>
          <p>Selected File: <strong>{file.name}</strong> ({Math.round(file.size / 1024)} KB)</p>
          {file.type.startsWith('image/') && (
            <div className={styles.imagePlaceholder}>[Image Preview of Prescription]</div>
          )}
        </div>
      )}

      <button 
        onClick={handleUpload} 
        className="btn-primary" 
        disabled={!file || progress === 100 || progress > 0}
      >
        {progress > 0 && progress < 100 ? `Uploading (${progress}%)` : 'Submit Prescription'}
      </button>

      {uploadStatus && (
        <div className={`${styles.status} ${uploadStatus.startsWith('✅') ? styles.success : styles.error}`}>
          {uploadStatus}
        </div>
      )}
      
      {progress > 0 && progress < 100 && (
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
        </div>
      )}
    </div>
  );
};

export default PrescriptionUpload;