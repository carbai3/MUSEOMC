document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal-imagen');
    const closeModal = document.querySelector('.close-modal');
    const imageContainer = document.querySelector('.contenedor-imagenes-adicionales');
    



    document.addEventListener('DOMContentLoaded', function() {
        let currentPage = 1;
        const itemsPerPage = 10; // Número de elementos por página
    
        const loadPage = async (page) => {
            try {
                const response = await fetch(`/results?page=${page}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
    
                // Limpiar las tarjetas existentes
                const grid = document.querySelector('.grid');
                grid.innerHTML = '';
    
                // Agregar nuevas tarjetas
                data.objects.forEach(object => {
                    const card = document.createElement('div');
                    card.className = 'card';
                    card.innerHTML = `
                        <img src="${object.primaryImage || '/ruta/a/imagen-predeterminada.jpg'}" alt="${object.title || 'Sin título'}">
                        <div class="date">Fecha: ${object.objectDate || 'Desconocida'}</div>
                        <h3>${object.title || 'Sin título'}</h3>
                        <p>Cultura: ${object.culture || 'Desconocida'}</p>
                        <p>Dinastía: ${object.dynasty || 'Desconocida'}</p>
                        <a class="ver-mas" href="#" data-object-id="${object.objectID}">Ver más</a>
                    `;
                    grid.appendChild(card);
                });
    
                // Actualizar el estado del botón de paginación
                document.getElementById('prev-page').disabled = page === 1;
                document.getElementById('next-page').disabled = data.isLastPage;
    
            } catch (error) {
                console.error('Error al cargar la página:', error);
            }
        };
    
        // Cargar la primera página al inicio
        loadPage(currentPage);
    
        // Manejar clics en los botones de paginación
        document.getElementById('next-page').addEventListener('click', () => {
            currentPage++;
            loadPage(currentPage);
        });
    
        document.getElementById('prev-page').addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                loadPage(currentPage);
            }
        });
    });

     // Cambio de imágenes--------------
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

 // Función para abrir el modal y mostrar las imágenes adicionales
    document.querySelectorAll('.ver-mas').forEach(button => {
        button.addEventListener('click', async function(event) {
            event.preventDefault(); 
            const objectId = this.getAttribute('data-object-id');// Obtengo el ID del objeto
            
            try {
                const response = await fetch(`/object/${objectId}/additional-images`);
                const additionalImages = await response.json();

                imageContainer.innerHTML = '';  


                if (additionalImages.length === 0) {
                    const noImageMessage = document.createElement('p');
                    noImageMessage.textContent = "No hay imágenes adicionales disponibles.";
                    imageContainer.appendChild(noImageMessage);
                } else {
                    // Agregar las nuevas imágenes al contenedor
                    additionalImages.forEach(imageUrl => {
                        const imgElement = document.createElement('img');
                        imgElement.src = imageUrl;
                        imgElement.alt = "Imagen adicional";
                        imgElement.onerror = () => {
                            imgElement.style.display = 'none'; // Si no se carga la imagen, la ocultamos
                        };
                        imageContainer.appendChild(imgElement);
                    });
                }

                // Mostrar el modal
                modal.style.display = 'block';
            } catch (error) {
                console.error('Error al cargar las imágenes adicionales:', error);
            }
        });
    });

  
    // Cerrar el modal al hacer clic en el botón "Cerrar"
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Cerrar el modal si se hace clic fuera del contenido
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

