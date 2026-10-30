import ProjectsHeader from "../components/projects/ProjectsHeader";
import ProjectsToolBar from "../components/projects/ProjectsToolBar";
import ProjectsContext from "../context/ProjectsContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Projects.module.css";
import ProjectListCard from "../components/projects/ProjectListCard";
import EmptyState from "../components/dashboard/EmptyState";
import NewProjectModal from "../components/projects/NewProjectModal";
import ConfirmDialog from "../components/shared/ConfirmDialog";
import { categories } from "../constants/categories";
import { Search } from "lucide-react";

const Projects = () => {
    const { projectList, addProject, togglePin, updateProject, deleteProject } = useContext(ProjectsContext);
    const [isNewOpen, setIsNewOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
     const [category, setCategory] = useState("All");

     const hasProjects = projectList.length > 0;
     
    const trimmedSearch = searchText.trim();
    const normalizedSearch = trimmedSearch.toLowerCase();
    const isFiltering = trimmedSearch !== "" || category !== "All";
     const visibleProjects = projectList.filter((project) =>
         project.name.toLowerCase().includes(normalizedSearch) &&
         (category === "All" || project.category === category)
    );

    const handleClearFilters = () => {
        setSearchText("");
        setCategory("All");
    };

    const handleCreateProject = (projectData) => {
        const projectId = addProject(projectData);
        navigate(`/projects/${projectId}`);
    };
    const handleEditProject = (project) => {
        setSelectedProject(project);
        setIsEditOpen(true);
    };
    const handleDeleteProject = (project) => {
        setSelectedProject(project);
        setIsDeleteOpen(true);
    };
    const handleCloseProjectDialog = () => {
        setIsEditOpen(false);
        setIsDeleteOpen(false);
        setSelectedProject(null);
    };
    const handleConfirmDelete = () => {
        if (!selectedProject) return;
        deleteProject(selectedProject.id);
        handleCloseProjectDialog();
    };
    const newProjectModal = isNewOpen && (
        <NewProjectModal onSave={handleCreateProject} onClose={() => setIsNewOpen(false)} />
    );
    const projectActionDialogs = (
        <>
            {isEditOpen && selectedProject && (
                <NewProjectModal
                    initial={selectedProject}
                    onSave={(data) => updateProject(selectedProject.id, data)}
                    onClose={handleCloseProjectDialog}
                />
            )}
            {isDeleteOpen && selectedProject && (
                <ConfirmDialog
                    title="Delete project?"
                    message={`Are you sure you want to delete “${selectedProject.name}”? This cannot be undone.`}
                    confirmLabel="Delete project"
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCloseProjectDialog}
                />
            )}
        </>
    );

    if (!hasProjects) {
        return (
     <>
       <EmptyState onCreateProject={() => setIsNewOpen(true)} />
       {newProjectModal}
             {projectActionDialogs}
     </>
   );
    }

    return (
        <>
         <div className={styles.outerContainer}>
            <ProjectsHeader onCreateProject={() => setIsNewOpen(true)} />
            <ProjectsToolBar
                searchText={searchText}
                onSearchChange={setSearchText}
                category={category}
                onCategoryChange={setCategory}
                categories={categories}
                isFiltering={isFiltering}
                onClearFilters={handleClearFilters}
                resultCount={
                    isFiltering
                        ? `${visibleProjects.length} of ${projectList.length} projects`
                        : `${projectList.length} ${projectList.length === 1 ? "project" : "projects"}`
                }
            />
             {visibleProjects.length === 0 ? (
                <div className={styles.noMatches}>
                    <Search size={24} aria-hidden="true" />
                    <h2>No projects match your search.</h2>
                    <p>Try a different name or category.</p>
                    <button type="button" onClick={handleClearFilters}>
                        Clear filters
                    </button>
                </div>
            ) : (
                <div className={styles.grid}>
                    {visibleProjects.map((project) => (
                    <ProjectListCard
                        key={project.id}
                        project={project}
                        onTogglePin={() => togglePin(project.id)}
                        onEditProject={handleEditProject}
                        onDeleteProject={handleDeleteProject}
                    />
                    ))}
                </div>
            )}
         </div>
            {newProjectModal}
            {projectActionDialogs}
           </>
    );

}
export default Projects;