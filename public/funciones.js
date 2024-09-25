document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal-imagen');
    const closeModal = document.querySelector('.close-modal');
    const imageContainer = document.querySelector('.contenedor-imagenes-adicionales');

    closeModal.addEventListener('click', function() {
        modal.style.opacity = '0';
        setTimeout(() => modal.style.display = 'none', 300); // Asegúrate de que el tiempo coincide con la duración de la transición
    });

     // Cambio de imágenes
    let currentImageIndex = 1;
    const totalImages = 10; // Total de imágenes disponibles

    const changeBackgroundImage = () => {
        const backgroundImage = document.getElementById('backgroundImage'); // Selecciona la imagen de fondo por ID
        if (backgroundImage) {
            currentImageIndex = (currentImageIndex % totalImages) + 1; // Incrementa el índice y reinicia después de la última imagen
            console.log(`Cambiando a la imagen: pictures/imagen${currentImageIndex}.jpg`);
            backgroundImage.src = `/pictures/imagen${currentImageIndex}.jpg`; // Cambia la imagen de fondo
        }
    };

    // Cambia la imagen cada 5 segundos
    setInterval(changeBackgroundImage, 5000);

    document.querySelectorAll('.ver-mas').forEach(button => {
        button.addEventListener('click', async function(event) {
            event.preventDefault(); 
            const objectId = this.getAttribute('data-object-id');
            
            try {
                const response = await fetch(`/object/${objectId}/additional-images`);
                const additionalImages = await response.json();

                imageContainer.innerHTML = '';  


                additionalImages.forEach(imageUrl => {
                    const imgElement = document.createElement('img');
                    imgElement.src = imageUrl;
                    imgElement.alt = "Imagen adicional";

                    imgElement.onerror = () => {
                        imgElement.style.display = 'none';  
                    };
                    imageContainer.appendChild(imgElement);
                });

                modal.style.display = 'block'; 
            } catch (error) {
                console.error('Error al cargar las imágenes adicionales:', error);
            }
        });
    });
});
