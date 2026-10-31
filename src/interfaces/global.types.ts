// Fields ending in "Zh" are the Chinese version of the field before them.
// Items with an `id` already exist on the server; items without one are new.

export type ProjectItem = {
    id?: number;
    projectName: string;
    projectNameZh: string;
    projectType: string; // e.g. "E-commerce Experience"
    projectTypeZh: string;
    projectDesc: string;
    projectDescZh: string;
    techStack: string; // comma separated
    linkURL: string;
    isAvailable: boolean; // is the live link still working?
    projectShown: boolean; // show on the portfolio site
    companyId: string;
};

export type ExperienceItem = {
    id?: number;
    role: string;
    roleZh: string;
    company: string; // company id while editing (see api/content.ts)
    period: string; // e.g. "Oct 2024 — Present"
    description: string; // one bullet per line
    descriptionZh: string; // same bullets, same order
};

export type GroupItem = {
    id?: number;
    groupTitle: string;
    groupTitleZh: string;
    groupDesc: string; // comma separated skills
    groupIcon: string; // code, database, cloud or checked
};

export type LinkItem = {
    label: string;
    url: string;
};

export type TerminalLine = {
    command: string;
    en: string;
    zh: string;
};

// Hero, About and Contact texts (name, nameZh, position, bio, tagline, ...)
export type ContentData = Record<string, string>;

export type Company = {
    id: number;
    name: string;
};

export type SiteData = {
    content: ContentData;
    projects: ProjectItem[];
    experience: ExperienceItem[];
    skills: GroupItem[];
    links: LinkItem[];
    terminalLines: TerminalLine[];
    companies: Company[];
};

export type ActivityLog = {
    action: string;
    details: Record<string, unknown> | null;
    created_at: string;
};

export type VisitStats = {
    total: number;
    today: number;
    last7: { date: string; count: number }[];
};
