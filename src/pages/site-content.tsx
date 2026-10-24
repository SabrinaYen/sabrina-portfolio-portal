import { useEffect, useState, type ReactNode } from "react";
import { api, API_URL } from "../api";
import Selection, { type SelectionOption } from "../components/selection";
import type { ContentData, ExperienceItem, GroupItem, ProjectItem } from "../interfaces/global.types";

const createExperienceItem = (): ExperienceItem => ({
    role: "",
    company: "",
    years: "",
    description: "",
});

const createSkillItem = (): GroupItem => ({
    groupTitle: "",
    groupDesc: "",
});

const createProjectItem = (): ProjectItem => ({
    projectName: "",
    projectDesc: "",
    techStack: "",
    linkURL: "",
    projectShown: true,
    companyName: "",
});

function SectionCard({ title, children }: { title: string; children: ReactNode }) {
    return (
        <div className="w-full my-5 flex flex-col border border-[#e2e8f2] rounded-lg bg-white">
            <div className="border-b border-b-[#e2e8f2] p-3 text-[13px] text-[#1b2b47] font-medium">{title}</div>
            {children}
        </div>
    );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
    return (
        <div className="flex flex-col w-full">
            <label className="pb-1 text-[11px] font-semibold tracking-wide uppercase text-[#5a6b87]">{label}</label>
            {children}
        </div>
    );
}

function SiteContent() {
    const pageTitle = "Site content";
    const [companyList, setCompanyList] = useState<SelectionOption[]>([]);
    const [contentData, setContentData] = useState<ContentData>({
        headline: "",
        subhead: "",
        name: "",
        position: "",
        bio: "",
        email: "",
        location: "",
    });
    const [prjData, setPrjData] = useState<ProjectItem[]>([]);
    const [experienceData, setExperienceData] = useState<ExperienceItem[]>([]);
    const [groupData, setGroupData] = useState<GroupItem[]>([]);

    const updateContent = (field: keyof ContentData, value: string) => {
        setContentData((prev) => ({ ...prev, [field]: value }));
    };

    const fetchAPI = async () => {
        const result = await api.post(API_URL.GetParam, { paramType: "contents" });
        const companyResult = await api.get(API_URL.GetCompanyList);

        const nextContentData = { ...(result.data ?? {}) } as Record<string, string>;
        if (!nextContentData.position && nextContentData.current_position) {
            nextContentData.position = nextContentData.current_position;
        }

        setContentData((prev) => ({ ...prev, ...nextContentData }));
        setCompanyList(Array.isArray(companyResult.data) ? companyResult.data : []);
    };

    const updateExperience = (index: number, field: keyof ExperienceItem, value: string) => {
        setExperienceData((prev) => prev.map((experience, i) =>
            i === index ? { ...experience, [field]: value } : experience
        ));
    };

    const updateSkill = (index: number, field: keyof GroupItem, value: string) => {
        setGroupData((prev) => prev.map((group, i) =>
            i === index ? { ...group, [field]: value } : group
        ));
    };

    const updateProject = (index: number, field: keyof ProjectItem, value: string | boolean) => {
        setPrjData((prev) => prev.map((project, i) =>
            i === index ? { ...project, [field]: value } : project
        ));
    };

    const handleAdd = (value: "experience" | "skill" | "project") => {
        if (value === "experience") {
            setExperienceData((prev) => [...prev, createExperienceItem()]);
            return;
        }

        if (value === "skill") {
            setGroupData((prev) => [...prev, createSkillItem()]);
            return;
        }

        setPrjData((prev) => [...prev, createProjectItem()]);
    };

    const handleDelete = (value: "experience" | "skill" | "project", index: number) => {
        if (value === "experience") {
            setExperienceData((prev) => prev.filter((_, i) => i !== index));
            return;
        }

        if (value === "skill") {
            setGroupData((prev) => prev.filter((_, i) => i !== index));
            return;
        }

        setPrjData((prev) => prev.filter((_, i) => i !== index));
    };

    const renderExperienceItem = (item: ExperienceItem, index: number) => (
        <div key={`experience-${index}`} className="flex w-full flex-col gap-3 p-5">
            <div className="flex w-full flex-row gap-3">
                <input
                    className="min-w-[300px] border border-[#e2e8f2] p-2 text-[#1b2b47] rounded-lg"
                    type="text"
                    placeholder="Role"
                    value={item.role}
                    onChange={(event) => updateExperience(index, "role", event.target.value)}
                />
                <Selection
                    className="min-w-[200px]"
                    list={companyList}
                    value={item.company}
                    onChange={(company: string) => updateExperience(index, "company", company)}
                    isRefresh={fetchAPI}
                />
                <input
                    className="min-w-[300px] border border-[#e2e8f2] p-2 text-[#1b2b47] rounded-lg"
                    type="text"
                    placeholder="2022 - now"
                    value={item.years}
                    onChange={(event) => updateExperience(index, "years", event.target.value)}
                />
            </div>
            <div className="flex items-start gap-2">
                <textarea
                    className="w-full rounded-lg border border-[#e2e8f2] p-2 text-[#1b2b47]"
                    value={item.description}
                    onChange={(event) => updateExperience(index, "description", event.target.value)}
                />
                <button
                    type="button"
                    className="h-[28px] w-[28px] cursor-pointer rounded-sm border border-[#e2e8f2] text-[13px] text-[#dc2626]"
                    onClick={() => handleDelete("experience", index)}
                >
                    X
                </button>
            </div>
        </div>
    );

    const renderSkillItem = (item: GroupItem, index: number) => (
        <div key={`skill-${index}`} className="flex w-full flex-col gap-3 p-5">
            <input
                className="w-full border border-[#e2e8f2] p-2 text-[13px] text-[#1b2b47] rounded-lg"
                type="text"
                placeholder="Group"
                value={item.groupTitle}
                onChange={(event) => updateSkill(index, "groupTitle", event.target.value)}
            />
            <div className="flex items-start gap-2">
                <input
                    className="w-full border border-[#e2e8f2] p-2 text-[13px] text-[#1b2b47] rounded-lg"
                    type="text"
                    placeholder="Comma separated (eg: HTML, CSS, Figma)"
                    value={item.groupDesc}
                    onChange={(event) => updateSkill(index, "groupDesc", event.target.value)}
                />
                <button
                    type="button"
                    className="h-[28px] w-[28px] cursor-pointer rounded-sm border border-[#e2e8f2] text-[13px] text-[#dc2626]"
                    onClick={() => handleDelete("skill", index)}
                >
                    X
                </button>
            </div>
        </div>
    );

    const renderProjectItem = (item: ProjectItem, index: number) => (
        <div key={`project-${index}`} className="flex w-full flex-col gap-3 p-5">
            <div className="flex w-full justify-between gap-3">
                <Field label="Project Name">
                    <input
                        className="rounded-lg border border-[#e2e8f2] p-2 text-[#1b2b47]"
                        type="text"
                        value={item.projectName}
                        onChange={(event) => updateProject(index, "projectName", event.target.value)}
                    />
                </Field>
                <Field label="Project Description">
                    <textarea
                        className="rounded-lg border border-[#e2e8f2] p-2 text-[#1b2b47]"
                        value={item.projectDesc}
                        onChange={(event) => updateProject(index, "projectDesc", event.target.value)}
                    />
                </Field>
            </div>
            <div className="flex w-full justify-between gap-3">
                <Field label="Tech Stacks">
                    <input
                        className="rounded-lg border border-[#e2e8f2] p-2 text-[#1b2b47]"
                        type="text"
                        value={item.techStack}
                        onChange={(event) => updateProject(index, "techStack", event.target.value)}
                    />
                </Field>
                <Field label="URL">
                    <input
                        className="rounded-lg border border-[#e2e8f2] p-2 text-[#1b2b47]"
                        type="text"
                        value={item.linkURL}
                        onChange={(event) => updateProject(index, "linkURL", event.target.value)}
                    />
                </Field>
            </div>
            <div className="flex w-full justify-between gap-3">
                <Field label="Company Name">
                    <Selection
                        className="min-w-[200px]"
                        list={companyList}
                        value={item.companyName}
                        onChange={(company: string) => updateProject(index, "companyName", company)}
                    />
                </Field>
                <Field label="Projects Shown">
                    <input
                        className="h-4 w-4 accent-[#2563eb]"
                        type="checkbox"
                        checked={Boolean(item.projectShown)}
                        onChange={(event) => updateProject(index, "projectShown", event.target.checked)}
                    />
                </Field>
            </div>
            <div className="flex justify-end">
                <button
                    type="button"
                    className="h-[28px] w-[28px] cursor-pointer rounded-sm border border-[#e2e8f2] text-[13px] text-[#dc2626]"
                    onClick={() => handleDelete("project", index)}
                >
                    X
                </button>
            </div>
        </div>
    );

    useEffect(() => {
        fetchAPI();
    }, []);

    return (
        <>
            <header className="sticky top-0 flex w-full items-center justify-between border-b border-b-[#e2e8f2] bg-white p-3">
                <label className="text-[13px] font-semibold text-[#5a6b87]">{pageTitle}</label>
                <button type="button" className="h-full rounded-lg bg-[#2563eb] px-[16px] py-[9px] text-[13px] text-white">
                    Save changes
                </button>
            </header>

            <div className="bg-[#f4f6fb] p-[26px] pt-[60px]">
                <h1 className="text-[27px] font-bold">{pageTitle}</h1>
                <h2 className="text-[13.5px] text-[#5a6b87]">Every block below maps to a section of your portfolio page.</h2>

                <SectionCard title="Hero">
                    <div className="flex flex-col p-5">
                        <Field label="Headline">
                            <input
                                type="text"
                                className="rounded-lg border border-[#e2e8f2] p-2 text-[#1b2b47]"
                                value={contentData.headline ?? ""}
                                onChange={(event) => updateContent("headline", event.target.value)}
                            />
                        </Field>
                    </div>
                    <div className="flex flex-col p-5">
                        <Field label="Subhead">
                            <textarea
                                className="rounded-lg border border-[#e2e8f2] p-2 text-[#1b2b47]"
                                value={contentData.subhead ?? ""}
                                onChange={(event) => updateContent("subhead", event.target.value)}
                            />
                        </Field>
                    </div>
                    <div className="flex w-full justify-between gap-3 p-5">
                        <Field label="Name">
                            <input
                                className="rounded-lg border border-[#e2e8f2] p-2 text-[#1b2b47]"
                                type="text"
                                value={contentData.name ?? ""}
                                onChange={(event) => updateContent("name", event.target.value)}
                            />
                        </Field>
                        <Field label="Position">
                            <input
                                className="rounded-lg border border-[#e2e8f2] p-2 text-[#1b2b47]"
                                type="text"
                                value={contentData.position ?? ""}
                                onChange={(event) => updateContent("position", event.target.value)}
                            />
                        </Field>
                    </div>
                </SectionCard>

                <SectionCard title="About">
                    <div className="flex flex-col p-5">
                        <Field label="Bio">
                            <textarea
                                className="rounded-lg border border-[#e2e8f2] p-2 text-[#1b2b47]"
                                value={contentData.bio ?? ""}
                                onChange={(event) => updateContent("bio", event.target.value)}
                            />
                        </Field>
                    </div>
                </SectionCard>

                <SectionCard title="Projects">
                    {prjData.map((item, index) => renderProjectItem(item, index))}
                    <div className="flex flex-col p-5">
                        <button
                            type="button"
                            className="cursor-pointer border border-dashed border-[#e2e8f2] p-2 text-sm text-[#5a6b87]"
                            onClick={() => handleAdd("project")}
                        >
                            + Add Project
                        </button>
                    </div>
                </SectionCard>

                <SectionCard title="Experience">
                    {experienceData.map((item, index) => renderExperienceItem(item, index))}
                    <div className="flex flex-col p-5">
                        <button
                            type="button"
                            className="cursor-pointer border border-dashed border-[#e2e8f2] p-2 text-sm text-[#5a6b87]"
                            onClick={() => handleAdd("experience")}
                        >
                            + Add Role
                        </button>
                    </div>
                </SectionCard>

                <SectionCard title="Skills">
                    {groupData.map((item, index) => renderSkillItem(item, index))}
                    <div className="flex flex-col p-5">
                        <button
                            type="button"
                            className="cursor-pointer border border-dashed border-[#e2e8f2] p-2 text-sm text-[#5a6b87]"
                            onClick={() => handleAdd("skill")}
                        >
                            + Add Skill
                        </button>
                    </div>
                </SectionCard>

                <SectionCard title="Résumé & contact">
                    <div className="m-5 flex items-center justify-between rounded-lg border border-[#e2e8f2] px-[12px] py-[14px]">
                        <div className="mx-5 flex flex-row gap-3">
                            <div className="w-[38px] rounded-sm bg-[#eaf1fe] p-2 text-center text-[11px] font-bold text-[#2563eb]">PDF</div>
                            <div className="leading-tight">
                                <div className="text-[13px]">filename</div>
                                <div className="text-[13px] text-[#5a6b87]">date</div>
                            </div>
                        </div>
                        <button type="button" className="cursor-pointer rounded-lg border border-[#e2e8f2] px-[14px] py-[8px] text-[13px] font-semibold text-[#1b2b47]">
                            Replace
                        </button>
                    </div>

                    <div className="flex w-full justify-between gap-3 px-5 py-5">
                        <Field label="Email">
                            <input
                                className="rounded-lg border border-[#e2e8f2] p-2 text-[#1b2b47]"
                                type="text"
                                value={contentData.email ?? ""}
                                onChange={(event) => updateContent("email", event.target.value)}
                            />
                        </Field>
                        <Field label="Location">
                            <input
                                className="rounded-lg border border-[#e2e8f2] p-2 text-[#1b2b47]"
                                type="text"
                                value={contentData.location ?? ""}
                                onChange={(event) => updateContent("location", event.target.value)}
                            />
                        </Field>
                    </div>

                    <div className="flex flex-col p-5">
                        <button type="button" className="cursor-pointer border border-dashed border-[#e2e8f2] p-2 text-sm text-[#5a6b87]">
                            + Add Link
                        </button>
                    </div>
                </SectionCard>
            </div>
        </>
    );
}

export default SiteContent;
