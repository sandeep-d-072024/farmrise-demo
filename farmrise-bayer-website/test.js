const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Directory containing your images
const inputDir = path.join(__dirname, 'src', 'assets'); // Path to your original assets folder
const outputDir = path.join(__dirname, 'src', 'assets', 'webp'); // Output directory for WebP images

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, { recursive: true });
}

// Function to convert images
const convertImagesToWebP = (inputDir, outputDir) => {
    fs.readdir(inputDir, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }
        
        files.forEach(file => {
            const ext = path.extname(file).toLowerCase();
            if (ext === '.png' || ext === '.jpeg' || ext === '.jpg') {
                const inputFilePath = path.join(inputDir, file);
                const outputFilePath = path.join(outputDir, path.basename(file, ext) + '.webp');

                // Check if the WebP file already exists
                if (!fs.existsSync(outputFilePath)) {
                    sharp(inputFilePath)
                        .webp()
                        .toFile(outputFilePath, (err, info) => {
                            if (err) {
                                console.error('Error converting image:', err);
                            } else {
                                console.log(`Converted ${file} to WebP format.`);
                            }
                        });
                } else {
                    console.log(`WebP file already exists: ${outputFilePath}`);
                }
            } else {
                console.log(`Skipping non-image file: ${file}`);
            }
        });
    });
};

// Convert images
convertImagesToWebP(inputDir, outputDir);
