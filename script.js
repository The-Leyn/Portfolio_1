document.addEventListener("DOMContentLoaded", function () {
    // Changement de la favicon en fonction du theme de l'utilisateur.
    if (globalThis.matchMedia?.('(prefers-color-scheme:dark)').matches ?? false) {
        document.getElementById('favicon').href = './images/faviconWhite.png';
    }

    const mainInfo = document.querySelector('.main-info');
    let mainDescription = document.querySelector('.main-description');
    let titleProject = document.querySelector('.main-info h2');
    let projectNav = document.querySelector('.project-nav nav');

    let index = mainInfo.innerHTML;

    fetch("projects.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur de chargement du JSON : " + response.status);
            }
            return response.json(); // Convertis la réponse en JSON
        })
        .then(data => {
            // Maintenant, vous avez accès à vos données JSON dans la variable 'data'
            data.forEach(project => {
                const navLienProjet = document.createElement("a");
                navLienProjet.textContent = project.name;
                navLienProjet.setAttribute('href', project.linkProject)
                navLienProjet.setAttribute('target', "_blank")

                projectNav.appendChild(navLienProjet);

                // Changement du contenue au clique du lien
                navLienProjet.addEventListener('click', function (event) {
                    // Retire le comportement par défault des liens
                    event.preventDefault();
                    // Retire a tous les liens de la nav la class .nav-active
                    const allNavLinks = document.querySelectorAll('.project-nav nav a');
                    allNavLinks.forEach(link => {
                        link.classList.remove('nav-active');
                    });

                    // Ajouter la classe .nav-active au lien sur lequel on a cliqué
                    navLienProjet.classList.add('nav-active');
                    if (titleProject.textContent === project.name) {
                        navLienProjet.classList.remove('nav-active');
                        mainInfo.innerHTML = index;

                        mainDescription = document.querySelector('.main-description');
                        titleProject = document.querySelector('.main-info h2');
                        projectNav = document.querySelector('.project-nav nav');
                    } else {

                        // Changement du titre
                        titleProject.textContent = project.name;

                        // Création de la div main-project
                        const mainProject = document.createElement('div');
                        mainProject.className = 'main-project fade'
                        

                        // Conteneur image
                        const imageContainer = document.createElement('div')
                        imageContainer.className = 'img-container'
                        const infoImage = document.createElement('div')
                        infoImage.className = 'info-img'
                        if (project.images.length < 2) {
                            infoImage.innerHTML = '<i class="bi bi-images"></i>'
                        }else {
                            infoImage.innerHTML = '<i class="bi bi-images"></i>' + project.images.length

                        }
                        imageContainer.appendChild(infoImage)

                        // Création de l'image
                        const imageProject = document.createElement('img');
                        imageProject.setAttribute('src', 'images/' + project.images[0]);
                        imageProject.setAttribute('alt', 'project');

                        // Création de la div description

                        const descriptionProject = document.createElement('div');
                        descriptionProject.classList.add('description-project');

                        // Création des paragraphes

                        project.description.forEach(element => {
                            // console.log(element);
                            const paragraphe = document.createElement('p');
                            paragraphe.textContent = element;
                            descriptionProject.appendChild(paragraphe)
                        });

                        if (project.linkProject || project.linkGithub) {

                            // Création de la div qui contient les liens du projets
                            const projectLinks = document.createElement('div');
                            projectLinks.className = 'project-links'

                            // Création des liens du projets

                            if (project.linkProject) {
                                const viewSiteLink = document.createElement('a')
                                viewSiteLink.textContent = 'View site';
                                viewSiteLink.setAttribute('href', project.linkProject);

                                projectLinks.appendChild(viewSiteLink);
                            }

                            if (project.linkGithub) {
                                const githubLink = document.createElement('a')
                                githubLink.textContent = 'GitHub';
                                githubLink.setAttribute('href', project.linkGithub);

                                projectLinks.appendChild(githubLink);
                            }

                            descriptionProject.appendChild(projectLinks)
                        }


                        // descriptionProject.appendChild(paragrapheProject);

                        imageContainer.appendChild(imageProject)
                        mainProject.appendChild(imageContainer);


                        // mainProject.appendChild(imageProject);
                        mainProject.appendChild(descriptionProject)


                        mainDescription.innerHTML = '';
                        mainDescription.appendChild(mainProject);


                        let imgProject = document.querySelector('.main-project img');
                        console.log(imgProject);

                        // Carousel pour les images
                        imgProject.addEventListener('click', () => {
                            const backgroundCarousel = document.createElement('div');
                            backgroundCarousel.className = 'bg-carousel'

                            // Croix pour quitter le carousel
                            const quitCarousel = document.createElement('div')
                            quitCarousel.classList.add('quit-carousel')
                            quitCarousel.className = 'quit-carousel'
                            const quitCross = document.createElement('i');
                            quitCross.className = 'bi bi-x'
                            quitCarousel.appendChild(quitCross)
                            
                            backgroundCarousel.appendChild(quitCarousel)
                            // img Carousel
                            const baseImageCarousel = document.createElement('img')
                            baseImageCarousel.setAttribute('src', `images/${project.images[0]}`)
                            backgroundCarousel.appendChild(baseImageCarousel)

                            document.body.appendChild(backgroundCarousel);

                            quitCarousel.addEventListener('click', () => {
                                document.body.removeChild(backgroundCarousel);
                            })
                            // Navigation carousel
                            if (project.images.length > 1) {
                                for (let i = 0; i < 2; i++) {
                                    const toggleCarousel = document.createElement('div')
                                    toggleCarousel.classList.add('toggle-carousel')
    
                                    // for (let i = 0; i < 2; i++) {
                                        if (i === 0) {
                                            const buttonCarousel = document.createElement('i');
                                            buttonCarousel.className = 'bi bi-chevron-left'
                                            toggleCarousel.appendChild(buttonCarousel)
                                            
                                        }else if(i === 1){
                                            const buttonCarousel = document.createElement('i');
                                            buttonCarousel.className = 'bi bi-chevron-right'
                                            toggleCarousel.appendChild(buttonCarousel)
                                        }
                                    // }
                                    backgroundCarousel.appendChild(toggleCarousel)
                                }
                                const navIndicator = document.createElement('div')
                                navIndicator.className = 'nav-indicator'
                                
                                for (let i = 0; i < project.images.length; i++) {
                                    const dots = document.createElement('span')
                                    if (i === 0) {
                                        dots.classList.add('active')
                                    }
                                    navIndicator.appendChild(dots)
                                }
                                backgroundCarousel.appendChild(navIndicator)

                            }

                            
                            let indexImage = 0;

                            function updateImageSlider(direction) {
                                const lengthImagesProject = project.images.length;
                                const imgCarousel = document.querySelector('.bg-carousel img');
                                const allDots = document.querySelectorAll('.nav-indicator span');

                                allDots.forEach(dot => dot.classList.remove('active'));

                                if (direction === 'next') {
                                    indexImage = (indexImage + 1) % lengthImagesProject;
                                } else if (direction === 'prev') {
                                    indexImage = (indexImage - 1 + lengthImagesProject) % lengthImagesProject;
                                }

                                imgCarousel.setAttribute('src', `images/${project.images[indexImage]}`);

                                const activeDot = document.querySelector(`.nav-indicator span:nth-of-type(${indexImage + 1})`);
                                activeDot.classList.add('active');
                            }


                            const slideNext = document.querySelector('.toggle-carousel:nth-of-type(3)');
                            slideNext.addEventListener('click', () => {
                                updateImageSlider('next');
                            });

                            const slidePrev = document.querySelector('.toggle-carousel:nth-of-type(2)');
                            slidePrev.addEventListener('click', () => {
                                updateImageSlider('prev');
                            });
                        })
                    }
                });


            });
        })
        .catch(error => console.error(error)); // Gérer les erreurs de chargement
});