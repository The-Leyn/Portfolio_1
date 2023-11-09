// Chargement des liens des projets dans la nav (Au chargement de la page)
document.addEventListener("DOMContentLoaded", function () {
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
            return response.json(); // Convertir la réponse en JSON
        })
        .then(data => {
            // Maintenant, vous avez accès à vos données JSON dans la variable 'data'
            data.forEach(project => {
                const navLienProjet = document.createElement("a");
                navLienProjet.textContent = project.name;

                projectNav.appendChild(navLienProjet);

                // Changement du contenue au clique du lien
                navLienProjet.addEventListener('click', function () {
                    if (titleProject.textContent === project.name) {
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
    
                        // Création de l'image
                        const imageProject = document.createElement('img');
                        imageProject.setAttribute('src', 'images/' + project.image);
                        imageProject.setAttribute('alt', 'test');
    
                        // Création de la div description
        
                        const descriptionProject = document.createElement('div');
                        descriptionProject.classList.add('description-project');
    
                        // Création du paragraphe
                        const paragrapheProject = document.createElement('p');
                        paragrapheProject.textContent = project.description
    
                        // Création de la div qui contient les liens du projets
                        const projectLinks = document.createElement('div');
                        projectLinks.classList.add('project-links');
    
                        // Création des liens du projets
    
                        const viewSiteLink = document.createElement('a')
                        viewSiteLink.textContent = 'View site';
                        viewSiteLink.setAttribute('href', project.linkProject);
    
                        const githubLink = document.createElement('a')
                        githubLink.textContent = 'GitHub';
                        githubLink.setAttribute('href', project.linkGithub);
    
                        projectLinks.appendChild(viewSiteLink);
                        projectLinks.appendChild(githubLink);
    
                        descriptionProject.appendChild(paragrapheProject);
    
                        descriptionProject.appendChild(projectLinks)
    
                        mainProject.appendChild(imageProject);
                        mainProject.appendChild(descriptionProject)
    
    
                        mainDescription.innerHTML = '';
                        mainDescription.appendChild(mainProject);
                        

                    }

                });
            });
        })
        .catch(error => console.error(error)); // Gérer les erreurs de chargement
});

// 