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
                        mainProject.classList.add('main-project');
                        mainProject.classList.add('fade');

                        // Création de l'image
                        const imageProject = document.createElement('img');
                        imageProject.setAttribute('src', 'images/' + project.image);
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
                            projectLinks.classList.add('project-links');
    
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


                        mainProject.appendChild(imageProject);
                        mainProject.appendChild(descriptionProject)


                        mainDescription.innerHTML = '';
                        mainDescription.appendChild(mainProject);


                        let imgProject = document.querySelector('.main-project img');
                        console.log(imgProject);

                        // Carousel pour les images
                        imgProject.addEventListener('click', () => {
                            console.log('click image');
                            const backgroundCarousel = document.createElement('div');
                            backgroundCarousel.classList.add('bg-carousel')
                            
                            // Croix pour quitter le carousel
                            const quitCarousel = document.createElement('div')
                            quitCarousel.classList.add('quit-carousel')
                            for (let i = 0; i < 2; i++) {
                                const quitCross = document.createElement('span');
                                quitCarousel.appendChild(quitCross)
                            }
                            backgroundCarousel.appendChild(quitCarousel)
                            // img Carousel
                            const imageCarousel =  document.createElement('img')
                            imageCarousel.setAttribute('src', `images/${project.image}`)
                            backgroundCarousel.appendChild(imageCarousel)

                            document.body.appendChild(backgroundCarousel);

                            quitCarousel.addEventListener('click', () => {
                                document.body.removeChild(backgroundCarousel);
                            })
                            // Navigation carousel
                            for (let i = 0; i < 2; i++) {
                                const toggleCarousel = document.createElement('div')
                                toggleCarousel.classList.add('toggle-carousel')

                                for (let i = 0; i < 2; i++) {
                                    const buttonCarousel = document.createElement('span');
                                    toggleCarousel.appendChild(buttonCarousel)
                                }
                                backgroundCarousel.appendChild(toggleCarousel)
                            }

                        })
                    }
                });
                

            });
        })
        .catch(error => console.error(error)); // Gérer les erreurs de chargement
});