document.addEventListener('DOMContentLoaded', () => {
    const photoInput = document.getElementById('photo-input');
    const fileInput = document.getElementById('file-input');
    const gallery = document.getElementById('gallery');
    const fileList = document.getElementById('file-list');
    const urls = [];

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
    };

    photoInput?.addEventListener('change', (event) => {
        Array.from(event.target.files || []).forEach(addPhoto);
        event.target.value = '';
    });

    fileInput?.addEventListener('change', (event) => {
        Array.from(event.target.files || []).forEach(addFile);
        event.target.value = '';
    });

    window.addEventListener('beforeunload', () => {
        urls.forEach((url) => URL.revokeObjectURL(url));
    });
});
