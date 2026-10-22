import ProjectsHeader from "../components/projects/ProjectsHeader";
import ProjectsToolBar from "../components/projects/ProjectsToolBar";
import ProjectsContext from "../context/ProjectsContext";
import { useContext, useState } from "react";
import styles from "./Projects.module.css";
import ProjectListCard from "../components/projects/ProjectListCard";
import EmptyState from "../components/dashboard/EmptyState";
import { categories } from "../constants/categories";
import { Search } from "lucide-react";

const Projects = () => {
     const { projectList, addProject, togglePin } = useContext(ProjectsContext);
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

    if (!hasProjects) return <EmptyState onCreateProject={addProject} />;

    return (
         <div className={styles.outerContainer}>
            <ProjectsHeader onCreateProject={addProject} />
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
                    <ProjectListCard key={project.id} project={project} onTogglePin={() => togglePin(project.id)} />
                    ))}
                </div>
            )}
         </div>
    );

}
export default Projects;