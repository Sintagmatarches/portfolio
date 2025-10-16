document.addEventListener('DOMContentLoaded', () => {
    const photoInput = document.getElementById('photo-input');
    const fileInput = document.getElementById('file-input');
    const gallery = document.getElementById('gallery');
    const fileList = document.getElementById('file-list');
    const urls = [];

    // Elements for drag-and-drop and empty state hint
    const photoDropzone = document.getElementById('photo-dropzone');
    const fileDropzone = document.getElementById('file-dropzone');
    const emptyHint = document.getElementById('empty-hint');

    /**
     * Toggle visibility of the empty hint. If there are any photos or files
     * displayed, hide the hint; otherwise, show it. This provides feedback
     * when the gallery and file list are empty.
     */
    const updateEmptyHint = () => {
        // count only actual media elements (figures for photos, list items for files)
        const photoCount = gallery ? gallery.querySelectorAll('figure').length : 0;
        const fileCount = fileList ? fileList.querySelectorAll('li').length : 0;
        if (emptyHint) {
            emptyHint.style.display = (photoCount + fileCount > 0) ? 'none' : 'block';
        }
    };

    // Immediately update hint on load
    updateEmptyHint();

    const registerUrl = (url) => {
        urls.push(url);
        return url;
    };

    const addPhoto = (file) => {
        if (!file.type.startsWith('image/')) {
            return;
        }

        const figure = document.createElement('figure');
        const image = document.createElement('img');
        const caption = document.createElement('figcaption');
        const url = registerUrl(URL.createObjectURL(file));

        image.src = url;
        image.alt = file.name;
        caption.textContent = file.name;

        figure.append(image, caption);
        gallery.append(figure);

        // Recalculate empty state
        updateEmptyHint();
    };

    const addFile = (file) => {
        const item = document.createElement('li');
        const name = document.createElement('span');
        const link = document.createElement('a');
        const url = registerUrl(URL.createObjectURL(file));

        name.textContent = file.name;
        link.href = url;
        link.download = file.name;
        link.textContent = '↓';
        link.setAttribute('aria-label', `Скачать ${file.name}`);

        item.append(name, link);
        fileList.append(item);

        // Recalculate empty state
        updateEmptyHint();
    };

    photoInput?.addEventListener('change', (event) => {
        Array.from(event.target.files || []).forEach(addPhoto);
        event.target.value = '';
    });

    fileInput?.addEventListener('change', (event) => {
        Array.from(event.target.files || []).forEach(addFile);
        event.target.value = '';
    });

    // -------- Drag & Drop functionality --------
    /**
     * Add visual highlight when dragging over a dropzone and allow dropping by
     * preventing the default dragover action.
     */
    const handleDragOver = (event) => {
        event.preventDefault();
        event.currentTarget.classList.add('dragover');
    };

    /**
     * Remove visual highlight when leaving a dropzone.
     */
    const handleDragLeave = (event) => {
        event.currentTarget.classList.remove('dragover');
    };

    /**
     * Handle dropping files onto a dropzone. Determines whether the dropzone
     * accepts photos or general files, filters accordingly, and adds each file
     * to the appropriate list.
     *
     * @param {DragEvent} event - The drop event
     * @param {string} type - Either 'photo' or 'file'
     */
    const handleDrop = (event, type) => {
        event.preventDefault();
        event.currentTarget.classList.remove('dragover');
        const droppedFiles = Array.from(event.dataTransfer.files || []);
        if (type === 'photo') {
            droppedFiles.filter((f) => f.type.startsWith('image/')).forEach(addPhoto);
        } else {
            droppedFiles.forEach(addFile);
        }
    };

    // Attach drag & drop events if the dropzones exist
    if (photoDropzone) {
        photoDropzone.addEventListener('dragover', handleDragOver);
        photoDropzone.addEventListener('dragleave', handleDragLeave);
        photoDropzone.addEventListener('drop', (e) => handleDrop(e, 'photo'));
    }
    if (fileDropzone) {
        fileDropzone.addEventListener('dragover', handleDragOver);
        fileDropzone.addEventListener('dragleave', handleDragLeave);
        fileDropzone.addEventListener('drop', (e) => handleDrop(e, 'file'));
    }

    window.addEventListener('beforeunload', () => {
        urls.forEach((url) => URL.revokeObjectURL(url));
    });
});
