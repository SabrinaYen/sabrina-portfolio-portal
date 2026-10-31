import { useEffect, useState } from "react";
import { getCompanies, errorMessage, loadSiteData, saveSiteData } from "../api/content";
import { AddButton, BiField, Field, SectionCard } from "../components/fields";
import { biProps, inputClass } from "../components/field-helpers";
import ExperienceCard from "../components/site-content/experience-card";
import LinkRow from "../components/site-content/link-row";
import ProjectCard from "../components/site-content/project-card";
import SkillCard from "../components/site-content/skill-card";
import TerminalCard from "../components/site-content/terminal-card";
import type { ContentData, SiteData } from "../interfaces/global.types";

const emptyData: SiteData = {
    content: {},
    projects: [],
    experience: [],
    skills: [],
    links: [],
    terminalLines: [],
    companies: [],
};

// change one item of a list, or remove one, without touching the others
const setItem = <T,>(list: T[], index: number, changes: Partial<T>) =>
    list.map((item, i) => (i === index ? { ...item, ...changes } : item));
const removeItem = <T,>(list: T[], index: number) => list.filter((_, i) => i !== index);

function SiteContent() {
    const pageTitle = "Site content";
    const [data, setData] = useState<SiteData>(emptyData);
    const [message, setMessage] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const { content, projects, experience, skills, links, terminalLines, companies } = data;

    // replace one section of the page data
    const update = <K extends keyof SiteData>(key: K, value: SiteData[K]) =>
        setData((prev) => ({ ...prev, [key]: value }));

    // texts for Hero, About and Contact; `bi("name")` gives the English + Chinese inputs
    const changeContent = (changes: Partial<ContentData>) => update("content", { ...content, ...changes } as ContentData);
    const bi = (key: string) => biProps(content, key, changeContent);

    const load = async () => {
        try {
            setData(await loadSiteData());
        } catch (error) {
            setMessage(`Could not load: ${errorMessage(error)}`);
        }
    };

    // only reload the company dropdown, so unsaved edits are kept
    const refreshCompanies = async () => update("companies", await getCompanies());

    const save = async () => {
        setIsSaving(true);
        setMessage("");
        try {
            await saveSiteData(data);
            await load(); // reload so new items get their ids
            setMessage("Saved");
        } catch (error) {
            setMessage(`Could not save: ${errorMessage(error)}`);
        } finally {
            setIsSaving(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <>
            <header className="sticky top-0 z-10 flex w-full items-center justify-between border-b border-b-[#e2e8f2] bg-white p-3">
                <label className="text-[13px] font-semibold text-[#5a6b87]">{pageTitle}</label>
                <div className="flex items-center gap-3">
                    {message && <span className="text-[13px] text-[#5a6b87]">{message}</span>}
                    <button
                        type="button"
                        disabled={isSaving}
                        className="h-full rounded-lg bg-[#2563eb] px-[16px] py-[9px] text-[13px] text-white disabled:opacity-60"
                        onClick={save}
                    >
                        {isSaving ? "Saving..." : "Save changes"}
                    </button>
                </div>
            </header>

            <div className="bg-[#f4f6fb] p-[26px] pt-[60px]">
                <h1 className="text-[27px] font-bold">{pageTitle}</h1>
                <h2 className="text-[13.5px] text-[#5a6b87]">Every block below maps to a section of your portfolio page. Fill in English and Chinese.</h2>

                <SectionCard title="Hero">
                    <div className="flex flex-col gap-3 p-5">
                        <BiField label="Name" {...bi("name")} />
                        <BiField label="Position" {...bi("position")} />
                        <BiField label="Tagline" multiline {...bi("tagline")} hint="The two short lines under your position." />
                        <BiField label="Bio" multiline {...bi("bio")} />
                    </div>
                </SectionCard>

                <SectionCard title="About">
                    <div className="flex flex-col gap-3 p-5">
                        <BiField label="Heading" {...bi("aboutHeading")} />
                        <BiField label="Description" multiline {...bi("aboutHeadingDesc")} />
                    </div>
                </SectionCard>

                <SectionCard title="Skills">
                    {skills.map((item, index) => (
                        <SkillCard key={item.id ?? `new-${index}`} item={item}
                            onChange={(changes) => update("skills", setItem(skills, index, changes))}
                            onDelete={() => update("skills", removeItem(skills, index))} />
                    ))}
                    <AddButton label="+ Add Skill" onClick={() => update("skills", [...skills, {
                        groupTitle: "", groupTitleZh: "", groupDesc: "", groupIcon: "code",
                    }])} />
                </SectionCard>

                <SectionCard title="Projects">
                    {projects.map((item, index) => (
                        <ProjectCard key={item.id ?? `new-${index}`} item={item} companies={companies}
                            refreshCompanies={refreshCompanies}
                            onChange={(changes) => update("projects", setItem(projects, index, changes))}
                            onDelete={() => update("projects", removeItem(projects, index))} />
                    ))}
                    <AddButton label="+ Add Project" onClick={() => update("projects", [...projects, {
                        projectName: "", projectNameZh: "", projectType: "", projectTypeZh: "",
                        projectDesc: "", projectDescZh: "", techStack: "", linkURL: "",
                        isAvailable: true, projectShown: true, companyId: "",
                    }])} />
                </SectionCard>

                <SectionCard title="Experience">
                    {experience.map((item, index) => (
                        <ExperienceCard key={item.id ?? `new-${index}`} item={item} companies={companies}
                            refreshCompanies={refreshCompanies}
                            onChange={(changes) => update("experience", setItem(experience, index, changes))}
                            onDelete={() => update("experience", removeItem(experience, index))} />
                    ))}
                    <AddButton label="+ Add Role" onClick={() => update("experience", [...experience, {
                        role: "", roleZh: "", company: "", period: "", description: "", descriptionZh: "",
                    }])} />
                </SectionCard>

                <SectionCard title="Terminal lines (hero box)">
                    {terminalLines.map((item, index) => (
                        <TerminalCard key={index} item={item}
                            onChange={(changes) => update("terminalLines", setItem(terminalLines, index, changes))}
                            onDelete={() => update("terminalLines", removeItem(terminalLines, index))} />
                    ))}
                    <AddButton label="+ Add Line" onClick={() => update("terminalLines", [...terminalLines, { command: "", en: "", zh: "" }])} />
                </SectionCard>

                <SectionCard title="Contact">
                    <div className="flex flex-col gap-3 p-5">
                        <BiField label="Heading" {...bi("contactHeading")} />
                        <BiField label="Text" multiline {...bi("contactBody")} />
                        <Field label="Email">
                            <input type="text" className={inputClass} value={content.email ?? ""}
                                onChange={(e) => changeContent({ email: e.target.value })} />
                        </Field>
                        <BiField label="Location" {...bi("location")} />
                    </div>

                    {links.map((item, index) => (
                        <LinkRow key={index} item={item}
                            onChange={(changes) => update("links", setItem(links, index, changes))}
                            onDelete={() => update("links", removeItem(links, index))} />
                    ))}
                    <AddButton label="+ Add Link" onClick={() => update("links", [...links, { label: "", url: "" }])} />
                    <p className="px-5 pb-5 text-[11px] text-[#94a3b8]">The site shows the links labelled "GitHub" and "LinkedIn".</p>
                </SectionCard>
            </div>
        </>
    );
}

export default SiteContent;
